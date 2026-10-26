import type { Metadata } from "next";
import Link from "next/link";

import { PageIntro } from "@/shared/components";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Foundations — Calarys",
  description:
    "The systems every Calarys component shares: one light and materials chosen by role.",
};

const foundations = [
  {
    href: "/foundations/light",
    name: "Light",
    description:
      "One pointer-driven light for the whole page. Every component inside it shades, highlights and casts shadows from the same source.",
  },
  {
    href: "/foundations/materials",
    name: "Materials",
    description:
      "Each part of a component has a role, and the role decides its material. A finish sets the whole system.",
  },
];

export default function FoundationsPage() {
  return (
    <PageIntro
      eyebrow="Foundations"
      title="Foundations"
      description="Components are what you place. Foundations are what they share: the light that falls on all of them and the materials they are made of."
    >
      <ul className={styles.list}>
        {foundations.map((foundation) => (
          <li key={foundation.href}>
            <Link href={foundation.href} className={styles.item}>
              <span className={styles.name}>{foundation.name}</span>

              <span className={styles.description}>
                {foundation.description}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </PageIntro>
  );
}
