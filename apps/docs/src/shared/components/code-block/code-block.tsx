"use client";

import { useState } from "react";

import styles from "./code-block.module.css";

type CodeBlockProps = {
  title: string;
  code: string;
};

export function CodeBlock({ title, code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code);

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <figure className={styles.block}>
      <figcaption className={styles.header}>
        <span>{title}</span>

        <button type="button" onClick={copyCode}>
          {copied ? "Copied" : "Copy"}
        </button>
      </figcaption>

      <pre data-lenis-prevent-horizontal>
        <code>{code}</code>
      </pre>
    </figure>
  );
}
