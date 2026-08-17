"use client";

import { useEffect, useState } from "react";

import {
  getComponentDefinition,
  type ComponentId,
} from "@/registry/component-registry";

import type {
  PlaygroundConfig,
  PlaygroundControl,
  PlaygroundValue,
} from "../../types/playground";

import styles from "./component-playground.module.css";

type ComponentPlaygroundProps = {
  componentId: ComponentId;
};

const controlOrder: Record<
  PlaygroundControl<PlaygroundConfig>["type"],
  number
> = {
  range: 0,
  color: 1,
  select: 2,
  toggle: 3,
};

export function ComponentPlayground({ componentId }: ComponentPlaygroundProps) {
  const definition = getComponentDefinition(componentId);

  const [config, setConfig] = useState<PlaygroundConfig>(
    definition.defaultConfig,
  );

  const [copied, setCopied] = useState(false);

  const sortedControls = [...definition.controls].sort(
    (a, b) => controlOrder[a.type] - controlOrder[b.type],
  );

  useEffect(() => {
    setConfig(definition.defaultConfig);
  }, [definition]);

  const generatedCode = definition.generateCodeFromConfig(config);

  function updateConfig(key: string, value: PlaygroundValue) {
    setConfig((currentConfig) => ({
      ...currentConfig,
      [key]: value,
    }));
  }

  function resetConfig() {
    setConfig(definition.defaultConfig);
  }

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(generatedCode);

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className={styles.playground}>
      <section className={styles.preview}>
        <div className={styles.previewGrid}>
          {definition.renderConfig(config)}
        </div>
      </section>

      <section className={styles.configuration}>
        <aside className={styles.controls}>
          <div className={styles.controlsHeader}>
            <span>Customize</span>

            <button type="button" onClick={resetConfig}>
              Reset
            </button>
          </div>

          <div className={styles.fields}>
            {sortedControls.map((control) => (
              <ControlRenderer
                key={control.key}
                control={control as PlaygroundControl<PlaygroundConfig>}
                value={config[control.key]}
                onChange={(value) => {
                  updateConfig(control.key, value);
                }}
              />
            ))}
          </div>
        </aside>

        <section className={styles.code}>
          <div className={styles.codeHeader}>
            <span>Code</span>
          </div>

          <pre>
            <code>{generatedCode}</code>
          </pre>

          <button type="button" onClick={copyCode}>
            {copied ? "Copied" : "Copy code"}
          </button>
        </section>
      </section>
    </div>
  );
}

type ControlRendererProps = {
  control: PlaygroundControl<PlaygroundConfig>;
  value: PlaygroundValue;
  onChange: (value: PlaygroundValue) => void;
};

function ControlRenderer({ control, value, onChange }: ControlRendererProps) {
  switch (control.type) {
    case "range":
      return (
        <label className={styles.field}>
          <span className={styles.fieldHeader}>
            <span>{control.label}</span>

            <output>
              {String(value)}
              {control.suffix}
            </output>
          </span>

          <input
            type="range"
            min={control.min}
            max={control.max}
            step={control.step}
            value={Number(value)}
            onChange={(event) => {
              onChange(Number(event.target.value));
            }}
          />
        </label>
      );

    case "color":
      return (
        <label className={styles.field}>
          <span>{control.label}</span>

          <input
            type="color"
            value={String(value)}
            onChange={(event) => {
              onChange(event.target.value);
            }}
          />
        </label>
      );

    case "select":
      return (
        <label className={styles.field}>
          <span>{control.label}</span>

          <select
            value={String(value)}
            onChange={(event) => {
              onChange(event.target.value);
            }}
          >
            {control.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      );

    case "toggle":
      return (
        <label className={styles.toggleField}>
          <span>{control.label}</span>

          <input
            type="checkbox"
            checked={Boolean(value)}
            onChange={(event) => {
              onChange(event.target.checked);
            }}
          />
        </label>
      );
  }
}
