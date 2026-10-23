import { CodeBlock } from "@/shared/components";

import type { SourceFile } from "../../utils/get-component-source";

import styles from "./component-source.module.css";

type ComponentSourceProps = {
  files: SourceFile[];
};

export function ComponentSource({ files }: ComponentSourceProps) {
  return (
    <section className={styles.source}>
      <p className={styles.intro}>
        The full source of the component, as shipped in{" "}
        <code>@calarys/ui</code>.
      </p>

      {files.map((file) => (
        <CodeBlock key={file.name} title={file.name} code={file.code} />
      ))}
    </section>
  );
}
