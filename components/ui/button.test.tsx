import { createRef } from "react";
import { describe, it, expect } from "vitest";

import { render, screen } from "@/test/utils";

import { Button } from "./button";

describe("Button", () => {
  it("renders correctly with default props", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: /click me/i })).toBeInTheDocument();
  });

  it("renders with different variants", () => {
    render(
      <>
        <Button variant="default">Default</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </>
    );

    expect(screen.getByRole("button", { name: /default/i })).toHaveClass("bg-primary");
    expect(screen.getByRole("button", { name: /destructive/i })).toHaveClass("bg-destructive");
    expect(screen.getByRole("button", { name: /outline/i })).toHaveClass("bg-background");
    expect(screen.getByRole("button", { name: /secondary/i })).toHaveClass("bg-secondary");
    expect(screen.getByRole("button", { name: /ghost/i })).toHaveClass("hover:bg-accent");
    expect(screen.getByRole("button", { name: /link/i })).toHaveClass("text-primary");
  });

  it("renders with different sizes", () => {
    render(
      <>
        <Button size="default">Default</Button>
        <Button size="sm">Small</Button>
        <Button size="lg">Large</Button>
        <Button size="icon">Icon</Button>
      </>
    );

    expect(screen.getByRole("button", { name: /default/i })).toHaveClass("h-9");
    expect(screen.getByRole("button", { name: /small/i })).toHaveClass("h-8");
    expect(screen.getByRole("button", { name: /large/i })).toHaveClass("h-10");
    expect(screen.getByRole("button", { name: /icon/i })).toHaveClass("size-9");
  });

  it("renders as a different element when asChild is true", () => {
    render(
      <Button asChild>
        <a href="#test">Link Button</a>
      </Button>
    );

    const linkButton = screen.getByRole("link", { name: /link button/i });
    expect(linkButton).toBeInTheDocument();
    expect(linkButton).toHaveAttribute("href", "#test");
    expect(linkButton).toHaveClass("inline-flex");
  });

  it("applies additional className", () => {
    render(<Button className="custom-class">Button</Button>);
    expect(screen.getByRole("button")).toHaveClass("custom-class");
  });

  it("passes additional props", () => {
    render(<Button data-testid="test-button">Button</Button>);
    expect(screen.getByTestId("test-button")).toBeInTheDocument();
  });

  it("forwards ref to the underlying element", () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Ref Button</Button>);

    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe("BUTTON");
    expect(ref.current?.textContent).toBe("Ref Button");
  });

  it("forwards ref when asChild is true", () => {
    const ref = createRef<HTMLAnchorElement>();
    render(
      <Button asChild>
        <a ref={ref} href="#test-ref">
          Link With Ref
        </a>
      </Button>
    );

    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe("A");
    expect(ref.current?.textContent).toBe("Link With Ref");
    expect(ref.current?.getAttribute("href")).toBe("#test-ref");
  });
});
