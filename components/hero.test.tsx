import { describe, it, expect } from "vitest";

import { render, screen } from "@/test/utils";

import { Hero } from "./hero";

describe("Hero", () => {
  it("renders the main heading with highlight", () => {
    render(<Hero />);

    // Main heading contains both regular and highlighted text
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Expert Technology Services & Consulting"
    );

    // Check that the highlight span exists
    const highlight = screen.getByText("Services & Consulting");
    expect(highlight).toBeInTheDocument();
    expect(highlight).toHaveClass("text-primary");
  });

  it("renders the subheading description text", () => {
    render(<Hero />);

    const description = screen.getByText(
      "Custom software development and technical consulting that transforms your business challenges into effective digital solutions."
    );
    expect(description).toBeInTheDocument();
  });

  it("renders the primary and secondary CTA buttons", () => {
    render(<Hero />);

    // Get Started button (primary)
    const getStartedButton = screen.getByRole("link", { name: "Get Started" });
    expect(getStartedButton).toBeInTheDocument();
    expect(getStartedButton).toHaveAttribute("href", "#contact");

    // Explore Services button (secondary)
    const exploreServicesButton = screen.getByRole("link", { name: "Explore Services" });
    expect(exploreServicesButton).toBeInTheDocument();
    expect(exploreServicesButton).toHaveAttribute("href", "#services");
  });

  it("has the expected layout structure", () => {
    render(<Hero />);

    // Check section has the appropriate classes
    const section = screen.getByText("Expert Technology").closest("section");
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
    const exploreServicesLink = screen.getByRole("link", { name: "Explore Services" });
    const exploreServicesButton = exploreServicesLink.closest("a");
    expect(exploreServicesButton).toHaveClass("border");
    expect(exploreServicesButton).toHaveClass("h-10"); // size-lg equivalent in the CSS
  });
});
