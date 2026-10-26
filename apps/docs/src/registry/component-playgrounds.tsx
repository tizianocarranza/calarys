"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

import type { ComponentId } from "./component-registry";

// Each playground is lazy loaded in its own chunk, so a component page only
// ships the definition and demo of the component it shows instead of the
// whole registry. The import() calls must live in a Client Component: Next
// does not code split Client Components dynamically imported from the server.
const componentPlaygrounds: Record<ComponentId, ComponentType> = {
  "magnetic-button": dynamic(() =>
    import("./magnetic-button/magnetic-button-playground").then(
      (module) => module.MagneticButtonPlayground,
    ),
  ),
  "spotlight-card": dynamic(() =>
    import("./spotlight-card/spotlight-card-playground").then(
      (module) => module.SpotlightCardPlayground,
    ),
  ),
  toggle: dynamic(() =>
    import("./toggle/toggle-playground").then(
      (module) => module.TogglePlayground,
    ),
  ),
};

type ComponentPlaygroundLoaderProps = {
  componentId: ComponentId;
};

export function ComponentPlaygroundLoader({
  componentId,
}: ComponentPlaygroundLoaderProps) {
  const Playground = componentPlaygrounds[componentId];

  return <Playground />;
}
