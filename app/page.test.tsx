import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import Home from "./page";

// Mock all imported components
vi.mock("@/components/contact", () => ({
  Contact: () => <div data-testid="contact-component">Contact Component</div>,
}));

// Features component has been removed

vi.mock("@/components/hero", () => ({
  Hero: () => <div data-testid="hero-component">Hero Component</div>,
}));

vi.mock("@/components/site-footer", () => ({
  SiteFooter: () => <div data-testid="site-footer-component">SiteFooter Component</div>,
}));

vi.mock("@/components/site-header", () => ({
  SiteHeader: () => <div data-testid="site-header-component">SiteHeader Component</div>,
}));

// Mocking the card components
vi.mock("@/components/ui/card", () => ({
  Card: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
    <div data-testid="card-component" {...props}>
      {children}
    </div>
  ),
  CardHeader: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
    <div data-testid="card-header-component" {...props}>
      {children}
    </div>
  ),
  CardTitle: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
    <div data-testid="card-title-component" {...props}>
      {children}
    </div>
  ),
  CardDescription: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
    <div data-testid="card-description-component" {...props}>
      {children}
    </div>
  ),
  CardContent: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
    <div data-testid="card-content-component" {...props}>
      {children}
    </div>
  ),
}));

describe("Home Page", () => {
  it("renders all main components", () => {
    render(<Home />);

    expect(screen.getByTestId("site-header-component")).toBeInTheDocument();
    expect(screen.getByTestId("hero-component")).toBeInTheDocument();
    // Features component has been removed
    expect(screen.getByTestId("contact-component")).toBeInTheDocument();
    expect(screen.getByTestId("site-footer-component")).toBeInTheDocument();
  });

  it("renders the solutions section", () => {
    render(<Home />);

    // Solutions section heading and description
    expect(screen.getByText("Solutions")).toBeInTheDocument();
    expect(
      screen.getByText("Tailored technology solutions for businesses of all sizes.")
    ).toBeInTheDocument();

    // Solution cards are present
    const cardComponents = screen.getAllByTestId("card-component");
    expect(cardComponents.length).toBeGreaterThanOrEqual(2); // At least 2 solution cards

    // Solution titles
    expect(screen.getByText("Digital Transformation")).toBeInTheDocument();
    expect(screen.getByText("Data Analytics")).toBeInTheDocument();

    // Solution descriptions
    expect(
      screen.getByText(
        "Modernize your business with our comprehensive digital transformation strategies."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Turn your data into actionable insights with our advanced analytics solutions."
      )
    ).toBeInTheDocument();
  });

  it("renders the about section", () => {
    render(<Home />);

    // About section heading
    expect(screen.getByText("About Misty Step")).toBeInTheDocument();

    // About section paragraphs
    expect(screen.getByText(/Founded in 2023, Misty Step is dedicated/)).toBeInTheDocument();
    expect(screen.getByText(/We believe in partnering with our clients/)).toBeInTheDocument();
  });

  it("uses key properties in map functions", () => {
    render(<Home />);

    // Digital Transformation solution points
    expect(screen.getByText("Legacy System Migration")).toBeInTheDocument();
    expect(screen.getByText("Process Automation")).toBeInTheDocument();
    expect(screen.getByText("Cloud Adoption")).toBeInTheDocument();

    // Data Analytics solution points
    expect(screen.getByText("Real-time Dashboards")).toBeInTheDocument();
    expect(screen.getByText("Predictive Analytics")).toBeInTheDocument();
    expect(screen.getByText("Data Visualization")).toBeInTheDocument();
  });

  it("has sections with correct IDs for navigation", () => {
    render(<Home />);

    const solutionsSection = document.getElementById("solutions");
    expect(solutionsSection).toBeInTheDocument();

    const aboutSection = document.getElementById("about");
    expect(aboutSection).toBeInTheDocument();
  });
});
