"use client";

import { type CSSProperties, type PointerEvent, useRef } from "react";

import styles from "./magnetic-button.module.css";

export type MagneticButtonProps = {
  children?: string;
  radius?: number;
  strength?: number;
  duration?: number;
  backgroundColor?: string;
  textColor?: string;
};

export function MagneticButton({
  children = "Magnetic Button",
  radius = 140,
  strength = 0.35,
  duration = 250,
  backgroundColor = "#111111",
  textColor = "#ffffff",
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  function setPosition(x: number, y: number) {
    const button = buttonRef.current;

    if (!button) return;

    button.style.setProperty("--magnetic-x", `${x}px`);
    button.style.setProperty("--magnetic-y", `${y}px`);
  }

  function resetPosition() {
    setPosition(0, 0);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const button = buttonRef.current;

    if (!button) return;

    const rect = button.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = event.clientX - centerX;
    const distanceY = event.clientY - centerY;

    const distance = Math.hypot(distanceX, distanceY);

    if (distance > radius) {
      resetPosition();
      return;
    }

    const x = distanceX * strength;
    const y = distanceY * strength;

    setPosition(x, y);
  }

  const buttonStyle = {
    "--magnetic-x": `0px`,
    "--magnetic-y": `0px`,
    "--magnetic-duration": `${duration}ms`,
    "--button-background": backgroundColor,
    "--button-color": textColor,
  } as CSSProperties;

  const magneticAreaStyle = {
    "--magnetic-radius": `${radius}px`,
  } as CSSProperties;

  return (
    <div
      className={styles.magneticArea}
      style={magneticAreaStyle}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPosition}
      onPointerCancel={resetPosition}
    >
      <button
        ref={buttonRef}
        type="button"
        className={styles.button}
        style={buttonStyle}
      >
        <span>{children}</span>
        <span aria-hidden="true">↗</span>
      </button>
    </div>
  );
}
