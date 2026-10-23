import type { Metadata } from "next";

import { PageIntro } from "@/shared/components";

export const metadata: Metadata = {
  title: "Privacy — Calarys",
  description: "How Calarys handles your data.",
};

export default function PrivacyPage() {
  return (
    <PageIntro
      eyebrow="Legal"
      title="Privacy"
      description="Calarys is a showcase of interface components. It is built to be browsed, not to collect data about you."
    >
      <h2>Information we collect</h2>
      <p>
        Calarys does not ask for personal information, does not use accounts
        and does not set tracking or advertising cookies.
      </p>

      <h2>Hosting</h2>
      <p>
        Like any website, the hosting provider may process standard technical
        request data (such as IP address and browser type) to deliver pages
        and keep the service secure.
      </p>

      <h2>Changes</h2>
      <p>
        If this policy changes, the updated version will be published on this
        page.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about privacy can be raised on the project&apos;s{" "}
        <a href="https://github.com/tizianocarranza/calarys">GitHub repository</a>.
      </p>
    </PageIntro>
  );
}
