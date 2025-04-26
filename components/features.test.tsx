import { describe, it, expect } from "vitest";

import { render, screen } from "@/test/utils";

import { Features } from "./features";

describe("Features", () => {
  it("renders the section title", () => {
    render(<Features />);
    expect(screen.getByText("Our Key Features")).toBeInTheDocument();
  });

  it("renders all feature cards with correct content", () => {
    render(<Features />);

    // Check the Cloud Infrastructure feature
    expect(screen.getByText("Cloud Infrastructure")).toBeInTheDocument();
    expect(
      screen.getByText("Scalable and secure cloud solutions tailored to your business needs.")
    ).toBeInTheDocument();
    expect(screen.getByText("🚀")).toBeInTheDocument();

    // Check the AI Integration feature
    expect(screen.getByText("AI Integration")).toBeInTheDocument();
    expect(
      screen.getByText("Leverage artificial intelligence to automate processes and gain insights.")
    ).toBeInTheDocument();
    expect(screen.getByText("🧠")).toBeInTheDocument();

    // Check the Cyber Security feature
    expect(screen.getByText("Cyber Security")).toBeInTheDocument();
    expect(
      screen.getByText("Protect your business with our advanced security protocols and monitoring.")
    ).toBeInTheDocument();
    expect(screen.getByText("🔒")).toBeInTheDocument();
  });

  it("has the correct section id for navigation", () => {
    render(<Features />);
    const section = document.getElementById("features");
    expect(section).toBeInTheDocument();
  });

  it("uses feature title as the key for each card", () => {
    render(<Features />);

    // Get all cards
    const cards = document.querySelectorAll('[data-slot="card"]');
    expect(cards.length).toBe(3);

    // Extract key attributes if they were set as data attributes
    // This is a bit hacky, but there's no direct way to test React keys in the DOM
    const titles = Array.from(cards).map(
      (card) => card.querySelector('[data-slot="card-title"]')?.textContent
    );

    // Verify we have the expected titles
    expect(titles).toContain("Cloud Infrastructure");
    expect(titles).toContain("AI Integration");
    expect(titles).toContain("Cyber Security");
  });

  it("has the expected layout structure", () => {
    render(<Features />);

    // Check section has the appropriate classes
    const section = document.getElementById("features");
    expect(section).toHaveClass("py-20");
    expect(section).toHaveClass("bg-background");

    // Check for container
    const container = section?.querySelector(".container");
    expect(container).toBeInTheDocument();

    // Check for grid layout
    const grid = container?.querySelector(".grid");
    expect(grid).toBeInTheDocument();
    expect(grid).toHaveClass("grid-cols-1");
    expect(grid).toHaveClass("md:grid-cols-3");
  });
});
