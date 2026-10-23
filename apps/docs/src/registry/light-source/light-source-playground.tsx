"use client";

import { ComponentPlayground } from "../../features/playground/components/component-playground";

import { lightSourceDefinition } from "./definition";

export function LightSourcePlayground() {
  return <ComponentPlayground definition={lightSourceDefinition} />;
}
