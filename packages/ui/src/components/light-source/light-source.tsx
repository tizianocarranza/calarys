"use client";

import {
  type CSSProperties,
  type ReactNode,
  type RefObject,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import styles from "./light-source.module.css";

export type LightSourceProps = {
  children: ReactNode;
  color?: string;
  intensity?: number;
  reach?: number;
};

type LightPosition = {
  x: number;
  y: number;
  active: boolean;
};

type LightListener = (light: LightPosition | null, rect: DOMRect) => void;

type LightStore = {
  getReach: () => number;
  setReach: (reach: number) => void;
  move: (x: number, y: number) => void;
  hide: () => void;
  subscribe: (element: HTMLElement, listener: LightListener) => () => void;
  emit: () => void;
};

function createLightStore(): LightStore {
  const subscribers = new Map<HTMLElement, LightListener>();

  // null until the pointer moves for the first time, so lit components keep
  // their CSS fallback (light from above) instead of pointing at 0,0.
  let light: LightPosition | null = null;
  let reach = 480;

  return {
    getReach: () => reach,
    setReach: (nextReach) => {
      reach = nextReach;
    },
    move: (x, y) => {
      light = { x, y, active: true };
    },
    hide: () => {
      if (light) light = { ...light, active: false };
    },
    subscribe: (element, listener) => {
      subscribers.set(element, listener);
      listener(light, element.getBoundingClientRect());

      return () => {
        subscribers.delete(element);
      };
    },
    emit: () => {
      // Read every rect before writing any CSS variable, so a frame costs a
      // single layout no matter how many components are lit.
      const entries = [...subscribers].map(
        ([element, listener]) =>
          [listener, element.getBoundingClientRect()] as const,
      );

      for (const [listener, rect] of entries) {
        listener(light, rect);
      }
    },
  };
}

const LightContext = createContext<LightStore | null>(null);

export function LightSource({
  children,
  color = "#ffffff",
  intensity = 0.6,
  reach = 480,
}: LightSourceProps) {
  const [store] = useState(createLightStore);

  useEffect(() => {
    store.setReach(reach);
    store.emit();
  }, [store, reach]);

  useEffect(() => {
    let frame: number | null = null;

    function scheduleEmit() {
      if (frame !== null) return;

      frame = requestAnimationFrame(() => {
        frame = null;
        store.emit();
      });
    }

    function handlePointerMove(event: PointerEvent) {
      store.move(event.clientX, event.clientY);
      scheduleEmit();
    }

    function handlePointerOut(event: PointerEvent) {
      // relatedTarget is null only when the pointer leaves the window.
      if (event.relatedTarget) return;

      store.hide();
      scheduleEmit();
    }

    function handleBlur() {
      store.hide();
      scheduleEmit();
    }

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    window.addEventListener("pointerout", handlePointerOut);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("scroll", scheduleEmit, {
      passive: true,
      capture: true,
    });
    window.addEventListener("resize", scheduleEmit);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerout", handlePointerOut);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("scroll", scheduleEmit, { capture: true });
      window.removeEventListener("resize", scheduleEmit);

      if (frame !== null) {
        cancelAnimationFrame(frame);
      }
    };
  }, [store]);

  const lightStyle = {
    "--calarys-light-color": color,
    "--calarys-light-intensity": intensity,
  } as CSSProperties;

  return (
    <LightContext.Provider value={store}>
      <div className={styles.root} style={lightStyle}>
        {children}
      </div>
    </LightContext.Provider>
  );
}

/**
 * Lights an element with the nearest LightSource. Writes, on the element:
 * --light-x / --light-y: light position relative to the element (px),
 * --light-nx / --light-ny: unit vector from the element center to the light,
 * --light-proximity: 0–1, 1 when the light is over the element.
 * Also sets data-lit="true" so the CSS only changes when a source exists.
 */
export function useLight(ref: RefObject<HTMLElement | null>) {
  const store = useContext(LightContext);

  useEffect(() => {
    const element = ref.current;

    if (!store || !element) return;

    element.dataset.lit = "true";

    const unsubscribe = store.subscribe(element, (light, rect) => {
      if (!light) {
        element.style.setProperty("--light-proximity", "0");
        return;
      }

      const dx = light.x - (rect.left + rect.width / 2);
      const dy = light.y - (rect.top + rect.height / 2);
      const distance = Math.hypot(dx, dy);

      const edgeX = Math.max(rect.left - light.x, 0, light.x - rect.right);
      const edgeY = Math.max(rect.top - light.y, 0, light.y - rect.bottom);
      const edgeDistance = Math.hypot(edgeX, edgeY);

      const proximity = light.active
        ? Math.max(0, 1 - edgeDistance / store.getReach())
        : 0;

      element.style.setProperty("--light-x", `${light.x - rect.left}px`);
      element.style.setProperty("--light-y", `${light.y - rect.top}px`);
      element.style.setProperty("--light-proximity", `${proximity}`);

      if (distance > 0) {
        element.style.setProperty("--light-nx", `${dx / distance}`);
        element.style.setProperty("--light-ny", `${dy / distance}`);
      }
    });

    return () => {
      unsubscribe();
      delete element.dataset.lit;
    };
  }, [ref, store]);
}
