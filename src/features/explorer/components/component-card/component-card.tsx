import Link from "next/link";

import type { RegisteredComponent } from "@/registry/component-registry";

import styles from "./component-card.module.css";

type ComponentCardProps = {
  component: RegisteredComponent;
};

export function ComponentCard({
  component,
}: ComponentCardProps) {
  return (
    <Link
      href={`/components/${component.id}`}
      className={styles.card}
    >
      <div className={styles.preview}>
        {component.render(component.defaultConfig)}
      </div>

      <div className={styles.content}>
        <div className={styles.meta}>
          <span>{component.category}</span>
          <span>v{component.version}</span>
        </div>

        <h2>{component.name}</h2>

        <p>{component.description}</p>

        <div className={styles.tags}>
          {component.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
    </Link>
  );
}