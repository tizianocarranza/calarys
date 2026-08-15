"use client";

import { Toggle, type ToggleProps } from "./toggle";

type ToggleDemoProps = Pick<
  ToggleProps,
  "disabled" | "activeColor" | "inactiveColor" | "thumbColor" | "shadow" | "size"
>;

export function ToggleDemo(props: ToggleDemoProps) {
  return <Toggle {...props} />;
};
