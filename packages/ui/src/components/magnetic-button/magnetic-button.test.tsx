import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { MagneticButton } from "./magnetic-button";

describe("MagneticButton", () => {
  it("renders its label inside a button", () => {
    render(<MagneticButton>Get started</MagneticButton>);

    expect(
      screen.getByRole("button", { name: /get started/i }),
    ).toBeInTheDocument();
  });

  it("maps props to CSS custom properties", () => {
    render(
      <MagneticButton duration={400} backgroundColor="#222222" textColor="#eeeeee" />,
    );

    const button = screen.getByRole("button");

    expect(button.style.getPropertyValue("--magnetic-duration")).toBe("400ms");
    expect(button.style.getPropertyValue("--button-background")).toBe("#222222");
    expect(button.style.getPropertyValue("--button-color")).toBe("#eeeeee");
  });

  it("moves toward the pointer inside the radius and resets on leave", () => {
    render(<MagneticButton radius={100} strength={0.5} />);

    const button = screen.getByRole("button");
    const area = button.parentElement as HTMLElement;

    // jsdom lays everything out at 0,0 so the button center is the origin.
    fireEvent.pointerMove(area, { clientX: 20, clientY: 10 });

    expect(button.style.getPropertyValue("--magnetic-x")).toBe("10px");
    expect(button.style.getPropertyValue("--magnetic-y")).toBe("5px");

    fireEvent.pointerLeave(area);

    expect(button.style.getPropertyValue("--magnetic-x")).toBe("0px");
    expect(button.style.getPropertyValue("--magnetic-y")).toBe("0px");
  });

  it("ignores the pointer outside the radius", () => {
    render(<MagneticButton radius={50} />);

    const button = screen.getByRole("button");
    const area = button.parentElement as HTMLElement;

    fireEvent.pointerMove(area, { clientX: 200, clientY: 0 });

    expect(button.style.getPropertyValue("--magnetic-x")).toBe("0px");
  });
});
