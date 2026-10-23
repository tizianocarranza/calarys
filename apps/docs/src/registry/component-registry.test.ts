import { describe, expect, it } from "vitest";

import { getComponentSource } from "@/features/component-docs/utils/get-component-source";

import {
  componentRegistry,
  getComponentDefinitions,
  isComponentId,
} from "./component-registry";

const entries = Object.entries(componentRegistry);

describe("component registry", () => {
  it("validates component ids", () => {
    expect(isComponentId("toggle")).toBe(true);
    expect(isComponentId("does-not-exist")).toBe(false);
  });

  it("lists every registered definition", () => {
    expect(getComponentDefinitions()).toHaveLength(entries.length);
  });

  describe.each(entries)("%s", (key, definition) => {
    it("is registered under its own id", () => {
      expect(definition.id).toBe(key);
    });

    it("only has controls for keys present in defaultConfig", () => {
      for (const control of definition.controls) {
        expect(definition.defaultConfig).toHaveProperty(control.key);
      }
    });

    it("generates code for its exported component", () => {
      const code = definition.generateCodeFromConfig(definition.defaultConfig);

      expect(code.startsWith(`<${definition.exportName}`)).toBe(true);
    });

    it("documents its props", () => {
      expect(definition.props.length).toBeGreaterThan(0);

      const names = definition.props.map((prop) => prop.name);

      expect(new Set(names).size).toBe(names.length);
    });

    it("has a matching source folder in @calarys/ui", async () => {
      const files = await getComponentSource(definition.id);
      const fileNames = files.map((file) => file.name);

      expect(fileNames).toContain(`${definition.id}.tsx`);
      expect(fileNames).not.toContain("index.ts");
    });
  });
});
