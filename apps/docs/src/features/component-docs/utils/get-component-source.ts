import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

export type SourceFile = {
  name: string;
  code: string;
};

const sourceDirectory = path.join(
  process.cwd(),
  "..",
  "..",
  "packages",
  "ui",
  "src",
);

// Components live in src/components; the systems they share (the light)
// live in src/foundations.
export async function getComponentSource(
  componentId: string,
  folder: "components" | "foundations" = "components",
): Promise<SourceFile[]> {
  const componentDirectory = path.join(sourceDirectory, folder, componentId);

  const fileNames = (await readdir(componentDirectory))
    .filter((fileName) => fileName !== "index.ts")
    .sort((a, b) => Number(a.endsWith(".css")) - Number(b.endsWith(".css")));

  return Promise.all(
    fileNames.map(async (fileName) => ({
      name: fileName,
      code: await readFile(path.join(componentDirectory, fileName), "utf8"),
    })),
  );
}
