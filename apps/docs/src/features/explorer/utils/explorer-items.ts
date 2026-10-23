import type { ComponentDefinitions } from "@/registry/component-registry";

import type { ExplorerItem } from "../types/explorer";

export function toExplorerItems(
  components: ComponentDefinitions,
): ExplorerItem[] {
  return components.map((component) => ({
    id: component.id,
    name: component.name,
    description: component.description,
    category: component.category,
    tags: component.tags,
  }));
}

export function matchesSearch(item: ExplorerItem, search: string) {
  const normalizedSearch = search.trim().toLowerCase();

  if (normalizedSearch.length === 0) return true;

  const searchableContent = [
    item.name,
    item.description,
    item.category,
    ...item.tags,
  ]
    .join(" ")
    .toLowerCase();

  return searchableContent.includes(normalizedSearch);
}
