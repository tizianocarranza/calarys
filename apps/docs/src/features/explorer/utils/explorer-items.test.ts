import { describe, expect, it } from "vitest";

import type { ExplorerItem } from "../types/explorer";

import { matchesSearch } from "./explorer-items";

const item: ExplorerItem = {
  id: "magnetic-button",
  name: "Magnetic Button",
  description: "A subtle magnetic interaction that follows the cursor.",
  category: "buttons",
  tags: ["interaction", "motion"],
};

describe("matchesSearch", () => {
  it("matches everything for an empty search", () => {
    expect(matchesSearch(item, "")).toBe(true);
    expect(matchesSearch(item, "   ")).toBe(true);
  });

  it("matches name, description, category and tags case-insensitively", () => {
    expect(matchesSearch(item, "MAGNETIC")).toBe(true);
    expect(matchesSearch(item, "cursor")).toBe(true);
    expect(matchesSearch(item, "buttons")).toBe(true);
    expect(matchesSearch(item, "motion")).toBe(true);
  });

  it("trims the search term", () => {
    expect(matchesSearch(item, "  button  ")).toBe(true);
  });

  it("rejects unrelated terms", () => {
    expect(matchesSearch(item, "carousel")).toBe(false);
  });
});
