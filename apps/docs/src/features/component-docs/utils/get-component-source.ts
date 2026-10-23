import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

export type SourceFile = {
  name: string;
  code: string;
};

const componentsDirectory = path.join(
  process.cwd(),
  "..",
  "..",
  "packages",
  "ui",
  "src",
  "components",
);

export async function getComponentSource(
  componentId: string,
): Promise<SourceFile[]> {
  const componentDirectory = path.join(componentsDirectory, componentId);

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
