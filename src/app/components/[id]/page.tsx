import { notFound } from "next/navigation";

import { ComponentPlayground } from "@/features/playground/components/component-playground";
import {
  componentRegistry,
  getComponentDefinitions,
  isComponentId,
} from "@/registry/component-registry";
import Link from "next/link";

type ComponentPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getComponentDefinitions().map((component) => ({
    id: component.id,
  }));
}

export default async function ComponentPage({ params }: ComponentPageProps) {
  const { id } = await params;

  if (!isComponentId(id)) {
    notFound();
  }

  const definition = componentRegistry[id];

  return (
    <main>
      <header className="component-header">
        <Link href="/components" className="back-link">
          ← Back to components
        </Link>

        <div className="component-heading">
          <div>
            <div className="component-title-row">
              <h1>{definition.name}</h1>

              <span className="version">v{definition.version}</span>
            </div>

            <p>{definition.description}</p>
          </div>
        </div>

        <nav className="component-tabs" aria-label="Component sections">
          <span className="active-tab">Preview</span>
          <span>Code</span>
          <span>Usage</span>
        </nav>
      </header>

      <ComponentPlayground componentId={id} />
    </main>
  );
}
