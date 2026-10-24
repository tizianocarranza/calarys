import type { Metadata } from "next";

import { LightingApp } from "@/features/demo";

export const metadata: Metadata = {
  title: "Noct demo — Calarys",
  description:
    "A home lighting app built with Calarys components under one shared light.",
};

export default function DemoPage() {
  return (
    <main>
      <LightingApp />
    </main>
  );
}
