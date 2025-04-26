import { describe, it, expect, beforeEach, afterEach } from "vitest";

import { render, screen } from "@/test/utils";

import { SiteFooter } from "./site-footer";

// Mock the current year for consistent testing
describe("SiteFooter", () => {
  // Save original Date implementation
  const OriginalDate = global.Date;
  const mockDate = new Date("2024-01-01");

  beforeEach(() => {
    // Mock Date to return fixed date
    global.Date = class extends Date {
      constructor(): Date {
        super();
        return mockDate;
      }
      getFullYear(): number {
        return 2024;
      }
    } as DateConstructor;
  });

  afterEach(() => {
    // Restore original Date
    global.Date = OriginalDate;
  });

  it("renders the site logo", () => {
    render(<SiteFooter />);
    const logo = screen.getByAltText("Misty Step Logo");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "/images/logo.svg");
  });

  it("renders the company name", () => {
    render(<SiteFooter />);
    expect(screen.getByText("Misty Step")).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    render(<SiteFooter />);

    const featuresLink = screen.getByText("Features");
    expect(featuresLink).toBeInTheDocument();
    expect(featuresLink).toHaveAttribute("href", "#features");

    const solutionsLink = screen.getByText("Solutions");
    expect(solutionsLink).toBeInTheDocument();
    expect(solutionsLink).toHaveAttribute("href", "#solutions");

    const aboutLink = screen.getByText("About");
    expect(aboutLink).toBeInTheDocument();
    expect(aboutLink).toHaveAttribute("href", "#about");

    const contactLink = screen.getByText("Contact");
    expect(contactLink).toBeInTheDocument();
    expect(contactLink).toHaveAttribute("href", "#contact");
  });

  it("renders the copyright notice with correct year", () => {
    render(<SiteFooter />);
    expect(screen.getByText("© 2024 Misty Step. All rights reserved.")).toBeInTheDocument();
  });

  it("has the expected layout structure", () => {
    render(<SiteFooter />);

    // Check that the footer has the right classes
    const footer = screen.getByRole("contentinfo");
    expect(footer).toHaveClass("bg-background");
    expect(footer).toHaveClass("border-t");

    // Check for container div
    const container = footer.querySelector(".container");
    expect(container).toBeInTheDocument();

    // Check for layout sections
    const topSection = container?.querySelector(".flex.flex-col.md\\:flex-row");
    expect(topSection).toBeInTheDocument();

    const bottomSection = container?.querySelector(".mt-8.pt-8.border-t");
    expect(bottomSection).toBeInTheDocument();
  });
});
