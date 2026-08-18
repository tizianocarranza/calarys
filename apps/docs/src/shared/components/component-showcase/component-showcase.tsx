import { ReactNode } from "react";
import styles from "./component-showcase.module.css";


type ShowcaseItem = {
    id: string;
    component: ReactNode;
}


type ComponentShowcaseProps = {
    items: ShowcaseItem[];
}


export function ComponentShowcase({ items }: ComponentShowcaseProps) {
  return (
    <section className={styles.showcase}>
      {items.map(({ id, component }) => (
        <div
          key={id}
          className={`${styles.item}`}
        >
          {component}
        </div>
      ))}
    </section>
  );
}