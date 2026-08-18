import type { ComponentDefinitions } from "@/registry/component-registry";
import type { ExplorerItem } from "../../types/explorer";
import { ComponentCard } from "../component-card";
import { ExplorerSearch } from "../explorer-search";

type ComponentExplorerProps = {
  components: ComponentDefinitions;
};

export function ComponentExplorer({ components }: ComponentExplorerProps) {
  const items: ExplorerItem[] = components.map(
    (component) => ({
      id: component.id,
      name: component.name,
      description: component.description,
      category: component.category,
      tags: component.tags,
    }),
  );

  return (
    <ExplorerSearch items={items}>
      {components.map((component) => (
        <ComponentCard
          key={component.id}
          component={component}
        />
      ))}
    </ExplorerSearch>
  );
}