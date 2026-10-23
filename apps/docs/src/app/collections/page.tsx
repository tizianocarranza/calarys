import type { Metadata } from "next";
import Link from "next/link";

import { PageIntro } from "@/shared/components";

export const metadata: Metadata = {
  title: "Collections — Calarys",
  description: "Curated sets of Calarys components designed to work together.",
};

export default function CollectionsPage() {
  return (
    <PageIntro
      eyebrow="Coming soon"
      title="Collections"
      description="Curated sets of components designed to work together — complete sections you can drop into a page."
    >
      <p>
        Collections are still being crafted. In the meantime, browse the{" "}
        <Link href="/components">component library</Link>.
      </p>
    </PageIntro>
  );
}
