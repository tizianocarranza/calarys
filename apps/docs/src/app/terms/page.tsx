import type { Metadata } from "next";

import { PageIntro } from "@/shared/components";

export const metadata: Metadata = {
  title: "Terms — Calarys",
  description: "Terms for using the Calarys website and components.",
};

export default function TermsPage() {
  return (
    <PageIntro
      eyebrow="Legal"
      title="Terms"
      description="The ground rules for using the Calarys website and the code it showcases."
    >
      <h2>Using the site</h2>
      <p>
        You are welcome to browse Calarys, experiment in the playground and
        copy the generated code snippets into your own projects.
      </p>

      <h2>No warranty</h2>
      <p>
        Components and code are provided &quot;as is&quot;, without warranty of any
        kind. You are responsible for testing them in your own context.
      </p>

      <h2>Changes</h2>
      <p>
        These terms may be updated as the project evolves. The current version
        is always available on this page.
      </p>

      <h2>Contact</h2>
      <p>
        Reach out through the project&apos;s{" "}
        <a href="https://github.com/tizianocarranza/calarys">GitHub repository</a>.
      </p>
    </PageIntro>
  );
}
