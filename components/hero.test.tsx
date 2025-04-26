import { describe, it, expect } from "vitest";

import { render, screen } from "@/test/utils";

import { Hero } from "./hero";

describe("Hero", () => {
  it("renders the main heading with highlight", () => {
    render(<Hero />);

    // Main heading contains both regular and highlighted text
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Teleport Your Business Into The Future"
    );

    // Check that the highlight span exists
    const highlight = screen.getByText("Into The Future");
    expect(highlight).toBeInTheDocument();
    expect(highlight).toHaveClass("text-primary");
  });

  it("renders the subheading description text", () => {
    render(<Hero />);

    const description = screen.getByText(
      "Innovative technology solutions that help modern businesses achieve digital transformation quickly and efficiently."
    );
    expect(description).toBeInTheDocument();
  });

  it("renders the primary and secondary CTA buttons", () => {
    render(<Hero />);

    // Get Started button (primary)
    const getStartedButton = screen.getByRole("link", { name: "Get Started" });
    expect(getStartedButton).toBeInTheDocument();
    expect(getStartedButton).toHaveAttribute("href", "#contact");

    // Explore Solutions button (secondary)
    const exploreSolutionsButton = screen.getByRole("link", { name: "Explore Solutions" });
    expect(exploreSolutionsButton).toBeInTheDocument();
    expect(exploreSolutionsButton).toHaveAttribute("href", "#solutions");
  });

  it("has the expected layout structure", () => {
    render(<Hero />);

    // Check section has the appropriate classes
    const section = screen.getByText("Teleport Your Business").closest("section");
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass("flex-grow");
    expect(section).toHaveClass("bg-gradient-to-b");

    // Check for container
    const container = section?.querySelector(".container");
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass("text-center");

    // Check for buttons container with responsive layout
    const buttonsContainer = container?.querySelector("div.flex.flex-col.sm\\:flex-row");
    expect(buttonsContainer).toBeInTheDocument();
  });

  it("uses appropriate button variants and sizes", () => {
    render(<Hero />);

    // Primary button should have default variant (implied)
    const getStartedLink = screen.getByRole("link", { name: "Get Started" });
    const getStartedButton = getStartedLink.closest("a");
    expect(getStartedButton).toHaveClass("h-10"); // size-lg equivalent in the CSS

    // Secondary button should have outline variant
    const exploreSolutionsLink = screen.getByRole("link", { name: "Explore Solutions" });
    const exploreSolutionsButton = exploreSolutionsLink.closest("a");
    expect(exploreSolutionsButton).toHaveClass("border");
    expect(exploreSolutionsButton).toHaveClass("h-10"); // size-lg equivalent in the CSS
  });
});
