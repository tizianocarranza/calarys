import type { ComponentDefinitions } from "@/registry/component-registry";
import { toExplorerItems } from "../../utils/explorer-items";
import { ComponentCard } from "../component-card";
import { ExplorerSearch } from "../explorer-search";

type ComponentExplorerProps = {
  components: ComponentDefinitions;
};

export function ComponentExplorer({ components }: ComponentExplorerProps) {
  const items = toExplorerItems(components);

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
