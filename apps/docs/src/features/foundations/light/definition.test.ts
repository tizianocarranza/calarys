import { describe, expect, it } from "vitest";

import { getComponentSource } from "@/features/component-docs/utils/get-component-source";

import { lightSourceDefinition } from "./definition";

describe("light source definition", () => {
  it("only has controls for keys present in defaultConfig", () => {
    for (const control of lightSourceDefinition.controls) {
      expect(lightSourceDefinition.defaultConfig).toHaveProperty(control.key);
    }
  });

  it("generates code for LightSource and adds the finish only when set", () => {
    const plain = lightSourceDefinition.generateCode(
      lightSourceDefinition.defaultConfig,
    );
    const onyx = lightSourceDefinition.generateCode({
      ...lightSourceDefinition.defaultConfig,
      finish: "onyx",
    });

    expect(plain.startsWith("<LightSource")).toBe(true);
    expect(plain).not.toContain("finish");
    expect(onyx).toContain('finish="onyx"');
  });

  it("reads its source from the foundations folder of @calarys/ui", async () => {
    const files = await getComponentSource(lightSourceDefinition.id, "foundations");
    const fileNames = files.map((file) => file.name);

    expect(fileNames).toContain("light-source.tsx");
    expect(fileNames).not.toContain("index.ts");
  });
});
