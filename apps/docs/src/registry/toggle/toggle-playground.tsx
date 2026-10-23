"use client";

import { ComponentPlayground } from "../../features/playground/components/component-playground";

import { toggleDefinition } from "./definition";

export function TogglePlayground() {
  return <ComponentPlayground definition={toggleDefinition} />;
}
