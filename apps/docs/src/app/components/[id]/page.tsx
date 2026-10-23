import { notFound } from "next/navigation";

import {
  ComponentSource,
  ComponentTabs,
  ComponentUsage,
  getComponentSource,
} from "../../../features/component-docs";
import { ComponentPlayground } from "../../../features/playground/components/component-playground";
import {
  componentRegistry,
  getComponentDefinitions,
  isComponentId,
} from "../../../registry/component-registry";

import styles from "./page.module.css";

type ComponentPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getComponentDefinitions().map((component) => ({
    id: component.id,
  }));
}

export default async function ComponentPage({ params }: ComponentPageProps) {
  const { id } = await params;

  if (!isComponentId(id)) {
    notFound();
  }

  const definition = componentRegistry[id];
  const sourceFiles = await getComponentSource(id);

  return (
    <main className={styles.componentPage}>
      <header className={styles.componentHeader}>
        <div className={styles.componentHeading}>
          <div>
            <div className={styles.componentTitleRow}>
              <h1>{definition.name}</h1>

              <span className={styles.version}>
                v{definition.version}
              </span>
            </div>

            <p>{definition.description}</p>
          </div>
        </div>
      </header>

      <ComponentTabs
        key={id}
        preview={<ComponentPlayground componentId={id} />}
        code={<ComponentSource files={sourceFiles} />}
        usage={<ComponentUsage definition={definition} />}
      />
    </main>
  );
}