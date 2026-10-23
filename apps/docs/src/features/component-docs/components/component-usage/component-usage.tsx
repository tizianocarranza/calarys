import type { RegisteredComponent } from "@/registry/component-registry";
import { CodeBlock } from "@/shared/components";

import styles from "./component-usage.module.css";

type ComponentUsageProps = {
  definition: RegisteredComponent;
};

export function ComponentUsage({ definition }: ComponentUsageProps) {
  const importCode = `import "@calarys/ui/styles.css";
import { ${definition.exportName} } from "@calarys/ui";`;

  const exampleCode = definition.generateCodeFromConfig(
    definition.defaultConfig,
  );

  return (
    <section className={styles.usage}>
      <div className={styles.section}>
        <h2>Import</h2>

        <p>
          Import the shared tokens once (for example in your root layout), then
          the component.
        </p>

        <CodeBlock title="Import" code={importCode} />
      </div>

      <div className={styles.section}>
        <h2>Example</h2>

        <p>Rendered with its default configuration.</p>

        <CodeBlock title="Example" code={exampleCode} />
      </div>

      <div className={styles.section}>
        <h2>Props</h2>

        <div className={styles.tableWrapper} data-lenis-prevent-horizontal>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">Prop</th>
                <th scope="col">Type</th>
                <th scope="col">Default</th>
                <th scope="col">Description</th>
              </tr>
            </thead>

            <tbody>
              {definition.props.map((prop) => (
                <tr key={prop.name}>
                  <td>
                    <code>{prop.name}</code>
                  </td>
                  <td>
                    <code>{prop.type}</code>
                  </td>
                  <td>
                    <code>{prop.defaultValue ?? "—"}</code>
                  </td>
                  <td>{prop.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
