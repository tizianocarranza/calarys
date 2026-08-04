"use client";

import {
  type CSSProperties,
  type PointerEvent,
  type ReactNode,
  useEffect,
  useRef,
} from "react";

import styles from "./spotlight-card.module.css";

export type SpotlightCardProps = {
  children: ReactNode;
  radius?: number;
  intensity?: number;
  spotlightColor?: string;
  backgroundColor?: string;
  textColor?: string;
  border?: boolean;
  borderColor?: string;
  padding?: number;
  cornerRadius?: number;
};

export function SpotlightCard({
  children,
  radius = 200,
  intensity = 0.65,
  spotlightColor = "#ffffff",
  backgroundColor = "#e9e7e2",
  textColor = "#181714",
  border = true,
  borderColor = "rgba(0, 0, 0, 0.12)",
  padding = 32,
  cornerRadius = 24,
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const frameRef = useRef<number | null>(null);

  function updatePointerPosition(x: number, y: number) {
    const card = cardRef.current;

    if (!card) return;

    card.style.setProperty("--pointer-x", `${x}px`);
    card.style.setProperty("--pointer-y", `${y}px`);
  }

  function handlePointerMove(
    event: PointerEvent<HTMLElement>,
  ) {
    const card = cardRef.current;

    if (!card) return;

    const rect = card.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
    }

    frameRef.current = requestAnimationFrame(() => {
      updatePointerPosition(x, y);
      frameRef.current = null;
    });
  }

  function handlePointerLeave() {
    const card = cardRef.current;

    if (!card) return;

    card.style.setProperty("--pointer-x", "50%");
    card.style.setProperty("--pointer-y", "50%");
  }

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const cardStyle = {
    "--pointer-x": "50%",
    "--pointer-y": "50%",
    "--spotlight-radius": `${radius}px`,
    "--spotlight-intensity": intensity,
    "--spotlight-color": spotlightColor,
    "--card-background": backgroundColor,
    "--card-color": textColor,
    "--card-border-color": borderColor,
    "--card-padding": `${padding}px`,
    "--card-radius": `${cornerRadius}px`,
  } as CSSProperties;

  return (
    <article
      ref={cardRef}
      className={styles.card}
      style={cardStyle}
      data-border={border}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerCancel={handlePointerLeave}
    >
      <div className={styles.content}>{children}</div>
    </article>
  );
}