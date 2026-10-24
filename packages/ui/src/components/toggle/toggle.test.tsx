import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Toggle } from "./toggle";

describe("Toggle", () => {
  it("toggles its own state when uncontrolled", () => {
    const onChange = vi.fn();

    render(<Toggle onChange={onChange} />);

    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("respects defaultChecked", () => {
    render(<Toggle defaultChecked />);

    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("does not change state on its own when controlled", () => {
    const onChange = vi.fn();

    render(<Toggle checked={false} onChange={onChange} />);

    const checkbox = screen.getByRole("checkbox");

    fireEvent.click(checkbox);

    expect(onChange).toHaveBeenCalledWith(true);
    expect(checkbox).not.toBeChecked();
  });

  it("disables the input and exposes variants as data attributes", () => {
    const { container } = render(<Toggle disabled size="lg" shadow />);

    const label = container.querySelector("label");

    expect(screen.getByRole("checkbox")).toBeDisabled();
    expect(label).toHaveAttribute("data-size", "lg");
    expect(label).toHaveAttribute("data-shadow", "true");
    expect(label).toHaveAttribute("data-disabled", "true");
  });

  it("maps colors to CSS custom properties", () => {
    const { container } = render(<Toggle activeColor="#ff0000" />);

    const label = container.querySelector("label");

    expect(label?.style.getPropertyValue("--active-color")).toBe("#ff0000");
  });

  it("names the checkbox with aria-label", () => {
    render(<Toggle aria-label="Kitchen lights" />);

    expect(
      screen.getByRole("checkbox", { name: "Kitchen lights" }),
    ).toBeInTheDocument();
  });
});
