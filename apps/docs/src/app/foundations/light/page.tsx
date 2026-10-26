import type { Metadata } from "next";
import Link from "next/link";

import {
  ComponentSource,
  ComponentTabs,
  ComponentUsage,
  getComponentSource,
} from "@/features/component-docs";
import {
  LightSourcePlayground,
  lightSourceDefinition,
} from "@/features/foundations";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Light — Calarys",
  description: lightSourceDefinition.description,
};

export default async function LightPage() {
  const sourceFiles = await getComponentSource("light-source", "foundations");

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/foundations" className={styles.eyebrow}>
          Foundations
        </Link>

        <div className={styles.titleRow}>
          <h1>Light</h1>

          <span className={styles.version}>
            v{lightSourceDefinition.version}
          </span>
        </div>

        <p>{lightSourceDefinition.description}</p>
      </header>

      <ComponentTabs
        preview={<LightSourcePlayground />}
        code={<ComponentSource files={sourceFiles} />}
        usage={<ComponentUsage definition={lightSourceDefinition} />}
      />
    </main>
  );
}
