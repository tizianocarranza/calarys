"use client";

import {
  type CSSProperties,
  type ChangeEvent,
  useRef,
  useState,
} from "react";

import { useLight } from "../light-source";

import styles from "./toggle.module.css";

export type ToggleProps = {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;

  disabled?: boolean;

  activeColor?: string;
  inactiveColor?: string;
  thumbColor?: string;
  shadow?: boolean;

  size?: "sm" | "md" | "lg";

  "aria-label"?: string;
};

export function Toggle({
  checked,
  defaultChecked = false,
  onChange,
  disabled = false,
  activeColor = "#181714",
  inactiveColor = "#d8d6d1",
  thumbColor = "#ffffff",
  shadow = false,
  size = "md",
  "aria-label": ariaLabel,
}: ToggleProps) {
  const toggleRef = useRef<HTMLLabelElement>(null);

  useLight(toggleRef);

  const [internalChecked, setInternalChecked] =
    useState(defaultChecked);

  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : internalChecked;

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const nextChecked = event.target.checked;

    if (!isControlled) {
      setInternalChecked(nextChecked);
    }

    onChange?.(nextChecked);
  }

  const toggleStyle = {
    "--active-color": activeColor,
    "--inactive-color": inactiveColor,
    "--thumb-color": thumbColor,
  } as CSSProperties;

  return (
    <label
      ref={toggleRef}
      className={styles.toggle}
      data-size={size}
      data-disabled={disabled}
      data-shadow={shadow}
      style={toggleStyle}
    >
      <input
        className={styles.input}
        type="checkbox"
        aria-label={ariaLabel}
        checked={isChecked}
        disabled={disabled}
        onChange={handleChange}
      />

      <span className={styles.track}>
        <span className={styles.thumb} />
      </span>
    </label>
  );
}