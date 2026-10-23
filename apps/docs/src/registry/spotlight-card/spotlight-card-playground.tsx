"use client";

import { ComponentPlayground } from "../../features/playground/components/component-playground";

import { spotlightCardDefinition } from "./definition";

export function SpotlightCardPlayground() {
  return <ComponentPlayground definition={spotlightCardDefinition} />;
}
