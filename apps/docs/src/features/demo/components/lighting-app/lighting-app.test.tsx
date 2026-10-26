import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { LightingApp } from "./lighting-app";

function roomToggle(name: string) {
  return screen.getByRole("checkbox", { name: `${name} lights` });
}

describe("LightingApp", () => {
  it("starts with the Evening scene", () => {
    render(<LightingApp />);

    expect(roomToggle("Living room")).toBeChecked();
    expect(roomToggle("Terrace")).toBeChecked();
    expect(roomToggle("Study")).not.toBeChecked();
    expect(screen.getByText(/15 lamps on/)).toBeInTheDocument();
  });

  it("toggles a single room", () => {
    render(<LightingApp />);

    fireEvent.click(roomToggle("Study"));

    expect(roomToggle("Study")).toBeChecked();
    expect(screen.getByText(/of 6 rooms lit/).previousSibling).toHaveTextContent(
      "4",
    );
  });

  it("applies scenes", () => {
    render(<LightingApp />);

    fireEvent.click(screen.getByRole("button", { name: /focus/i }));

    expect(roomToggle("Study")).toBeChecked();
    expect(roomToggle("Living room")).not.toBeChecked();

    fireEvent.click(screen.getByRole("button", { name: /all off/i }));

    for (const toggle of screen.getAllByRole("checkbox", { name: / lights$/ })) {
      expect(toggle).not.toBeChecked();
    }
  });

  it("switches between the matte and light finishes", () => {
    const { container } = render(<LightingApp />);

    const app = container.querySelector("[data-finish]");
    const finish = screen.getByRole("checkbox", { name: "Matte finish" });

    expect(app).toHaveAttribute("data-finish", "matte");

    fireEvent.click(finish);

    expect(app).toHaveAttribute("data-finish", "light");
  });
});
