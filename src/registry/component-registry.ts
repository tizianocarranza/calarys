import { magneticButtonDefinition } from "./magnetic-button";
import { spotlightCardDefinition } from "./spotlight-card";

export const componentRegistry = {
  "magnetic-button": magneticButtonDefinition,
  "spotlight-card": spotlightCardDefinition,
} as const;

export type ComponentId = keyof typeof componentRegistry;

export type RegisteredComponent =
  (typeof componentRegistry)[ComponentId];

export function isComponentId(
  value: string,
): value is ComponentId {
  return value in componentRegistry;
}

export function getComponentDefinition(
  componentId: ComponentId,
) {
  return componentRegistry[componentId];
}

export function getComponentDefinitions(): RegisteredComponent[] {
  return Object.values(
    componentRegistry,
  ) as RegisteredComponent[];
}