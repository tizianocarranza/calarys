import type { Metadata } from "next";
import Link from "next/link";

import { PageIntro } from "@/shared/components";

export const metadata: Metadata = {
  title: "Journal — Calarys",
  description: "Notes on craft, motion and interface design.",
};

export default function JournalPage() {
  return (
    <PageIntro
      eyebrow="Coming soon"
      title="Journal"
      description="Notes on craft, motion and interface design — the thinking behind every Calarys component."
    >
      <p>
        The first entries are on their way. Until then, explore the{" "}
        <Link href="/components">components</Link> themselves.
      </p>
    </PageIntro>
  );
}
