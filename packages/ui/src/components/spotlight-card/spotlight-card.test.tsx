import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SpotlightCard } from "./spotlight-card";

describe("SpotlightCard", () => {
  it("renders its children", () => {
    render(
      <SpotlightCard>
        <h3>Timeless design</h3>
      </SpotlightCard>,
    );

    expect(
      screen.getByRole("heading", { name: "Timeless design" }),
    ).toBeInTheDocument();
  });

  it("uses defaults for variants", () => {
    const { container } = render(<SpotlightCard>Content</SpotlightCard>);

    const card = container.firstElementChild as HTMLElement;

    expect(card).toHaveAttribute("data-border", "true");
    expect(card).toHaveAttribute("data-shadow", "false");
    expect(card.style.getPropertyValue("--spotlight-radius")).toBe("200px");
  });

  it("maps props to CSS custom properties", () => {
    const { container } = render(
      <SpotlightCard
        radius={120}
        padding={16}
        cornerRadius={8}
        spotlightColor="#fff3c4"
        border={false}
        shadow
      >
        Content
      </SpotlightCard>,
    );

    const card = container.firstElementChild as HTMLElement;

    expect(card).toHaveAttribute("data-border", "false");
    expect(card).toHaveAttribute("data-shadow", "true");
    expect(card.style.getPropertyValue("--spotlight-radius")).toBe("120px");
    expect(card.style.getPropertyValue("--card-padding")).toBe("16px");
    expect(card.style.getPropertyValue("--card-radius")).toBe("8px");
    expect(card.style.getPropertyValue("--spotlight-color")).toBe("#fff3c4");
  });
});
