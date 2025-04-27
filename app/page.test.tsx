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

  // Solutions section has been removed

  it("renders the about section", () => {
    render(<Home />);

    // About section heading
    expect(screen.getByText("About Misty Step")).toBeInTheDocument();

    // About section paragraphs
    expect(screen.getByText(/Founded in 2023, Misty Step is dedicated/)).toBeInTheDocument();
    expect(screen.getByText(/We believe in partnering with our clients/)).toBeInTheDocument();
  });

  // "uses key properties in map functions" test removed - Solutions section has been removed

  it("has sections with correct IDs for navigation", () => {
    render(<Home />);

    // Solutions section has been removed
    const aboutSection = document.getElementById("about");
    expect(aboutSection).toBeInTheDocument();
  });
});
