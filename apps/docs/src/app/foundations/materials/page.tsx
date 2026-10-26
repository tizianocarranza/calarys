import type { Metadata } from "next";

import { MaterialsShowcase } from "@/features/materials";

export const metadata: Metadata = {
  title: "Materials — Calarys",
  description:
    "How Calarys chooses materials: each part's role decides it, a finish sets the whole system.",
};

export default function MaterialsPage() {
  return (
    <main>
      <MaterialsShowcase />
    </main>
  );
}
