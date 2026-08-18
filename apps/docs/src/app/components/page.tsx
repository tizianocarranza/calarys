import { getComponentDefinitions } from "../../registry/component-registry";

import styles from "./components-page.module.css";
import { ComponentExplorer } from "../../features/explorer";

export default function ComponentsPage() {
  const components = getComponentDefinitions();

  return (
    <main className={styles.page}>
      <ComponentExplorer components={components} />
    </main>
  );
}