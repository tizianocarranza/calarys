import type { ReactNode } from "react";

import styles from "./page-intro.module.css";

type PageIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
};

export function PageIntro({
  eyebrow,
  title,
  description,
  children,
}: PageIntroProps) {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <span className={styles.eyebrow}>{eyebrow}</span>

        <h1>{title}</h1>

        <p>{description}</p>
      </header>

      {children && <div className={styles.content}>{children}</div>}
    </main>
  );
}
