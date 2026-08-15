import { magneticButtonDefinition } from "./magnetic-button";
import { spotlightCardDefinition } from "./spotlight-card";
import { toggleDefinition } from "./toggle";

export const componentRegistry = {
  "magnetic-button": magneticButtonDefinition,
  "spotlight-card": spotlightCardDefinition,
  "toggle": toggleDefinition

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