import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ComponentTabs } from "./component-tabs";

function renderTabs() {
  return render(
    <ComponentTabs
      preview={<p>Preview panel</p>}
      code={<p>Code panel</p>}
      usage={<p>Usage panel</p>}
    />,
  );
}

describe("ComponentTabs", () => {
  it("shows the preview panel by default", () => {
    renderTabs();

    expect(screen.getByRole("tab", { name: "Preview" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByText("Preview panel")).toBeVisible();
    expect(screen.getByText("Code panel")).not.toBeVisible();
  });

  it("switches panels on click and keeps the others mounted", () => {
    renderTabs();

    fireEvent.click(screen.getByRole("tab", { name: "Usage" }));

    expect(screen.getByText("Usage panel")).toBeVisible();
    expect(screen.getByText("Preview panel")).not.toBeVisible();
    expect(screen.getByText("Preview panel")).toBeInTheDocument();
  });

  it("supports arrow key navigation with wrap-around", () => {
    renderTabs();

    const preview = screen.getByRole("tab", { name: "Preview" });

    fireEvent.keyDown(preview, { key: "ArrowLeft" });

    const usage = screen.getByRole("tab", { name: "Usage" });

    expect(usage).toHaveAttribute("aria-selected", "true");
    expect(usage).toHaveFocus();

    fireEvent.keyDown(usage, { key: "ArrowRight" });

    expect(preview).toHaveAttribute("aria-selected", "true");
  });
});
