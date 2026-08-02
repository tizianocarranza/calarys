import { getComponentDefinitions } from "@/registry/component-registry";

import styles from "./components-page.module.css";
import { ComponentExplorer } from "@/features/explorer";

export default function ComponentsPage() {
  const components = getComponentDefinitions();

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <span className={styles.eyebrow}>
          Component registry
        </span>

        <h1>Components</h1>

        <p>
          Interactive, customizable components built for modern
          interfaces.
        </p>
      </header>

      <ComponentExplorer components={components} />
    </main>
  );
}