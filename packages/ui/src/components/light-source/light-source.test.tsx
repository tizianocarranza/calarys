import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { Toggle } from "../toggle";
import { LightSource } from "./light-source";

let frames: FrameRequestCallback[] = [];

function flushFrames() {
  const pending = frames;

  frames = [];
  pending.forEach((callback) => callback(0));
}

describe("LightSource", () => {
  beforeEach(() => {
    frames = [];

    vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => {
      frames.push(callback);
      return frames.length;
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("renders its children", () => {
    render(
      <LightSource>
        <p>Lit content</p>
      </LightSource>,
    );

    expect(screen.getByText("Lit content")).toBeInTheDocument();
  });

  it("maps props to CSS custom properties", () => {
    const { container } = render(
      <LightSource color="#fff3c4" intensity={0.8}>
        Content
      </LightSource>,
    );

    const root = container.firstElementChild as HTMLElement;

    expect(root.style.getPropertyValue("--calarys-light-color")).toBe("#fff3c4");
    expect(root.style.getPropertyValue("--calarys-light-intensity")).toBe("0.8");
  });

  it("lights components inside it", () => {
    const { container } = render(
      <LightSource>
        <Toggle />
      </LightSource>,
    );

    expect(container.querySelector("label")).toHaveAttribute("data-lit", "true");
  });

  it("leaves components outside it unlit", () => {
    const { container } = render(<Toggle />);

    expect(container.querySelector("label")).not.toHaveAttribute("data-lit");
  });

  it("writes the light position, direction and proximity on lit elements", () => {
    const { container } = render(
      <LightSource reach={100}>
        <Toggle />
      </LightSource>,
    );

    const label = container.querySelector("label") as HTMLElement;

    // jsdom lays everything out at 0,0 with no size, so the element is a
    // point at the origin: the light at (30, 40) is 50px away.
    fireEvent.pointerMove(window, { clientX: 30, clientY: 40 });
    flushFrames();

    expect(label.style.getPropertyValue("--light-x")).toBe("30px");
    expect(label.style.getPropertyValue("--light-y")).toBe("40px");
    expect(label.style.getPropertyValue("--light-nx")).toBe("0.6");
    expect(label.style.getPropertyValue("--light-ny")).toBe("0.8");
    expect(label.style.getPropertyValue("--light-proximity")).toBe("0.5");
  });

  it("dims when the pointer leaves the window", () => {
    const { container } = render(
      <LightSource reach={100}>
        <Toggle />
      </LightSource>,
    );

    const label = container.querySelector("label") as HTMLElement;

    fireEvent.pointerMove(window, { clientX: 30, clientY: 40 });
    flushFrames();

    expect(label.style.getPropertyValue("--light-proximity")).toBe("0.5");

    fireEvent.pointerOut(window, { relatedTarget: null });
    flushFrames();

    expect(label.style.getPropertyValue("--light-proximity")).toBe("0");
  });

  it("exposes its finish so components take its materials", () => {
    const { container } = render(<LightSource finish="onyx">Content</LightSource>);

    expect(container.firstElementChild).toHaveAttribute(
      "data-calarys-finish",
      "onyx",
    );
  });
});
