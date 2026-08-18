import { notFound } from "next/navigation";

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

        <nav
          className={styles.componentTabs}
          aria-label="Component sections"
        >
          <span className={styles.activeTab}>Preview</span>
          <span>Code</span>
          <span>Usage</span>
        </nav>
      </header>

      <ComponentPlayground key={id} componentId={id} />
    </main>
  );
}