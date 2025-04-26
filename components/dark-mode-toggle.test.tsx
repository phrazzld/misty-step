import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";

import { render, screen } from "@/test/utils";

import { DarkModeToggle } from "./dark-mode-toggle";

describe("DarkModeToggle", () => {
  // Reset document class and matchMedia between tests
  beforeEach(() => {
    document.documentElement.classList.remove("dark");

    // Default matchMedia to light mode preference
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false, // Default to not matching (light mode)
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  it("renders correctly in light mode", () => {
    render(<DarkModeToggle />);
    // Should show moon emoji for light mode initial state
    expect(screen.getByText("🌙")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveAttribute("title", "Switch to dark mode");
  });

  it("renders with dark mode when user prefers dark", () => {
    // Mock system preference for dark mode
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: query === "(prefers-color-scheme: dark)", // Match dark mode
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    render(<DarkModeToggle />);

    // Should show sun emoji for dark mode
    expect(screen.getByText("🌞")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveAttribute("title", "Switch to light mode");
  });

  it("toggles between light and dark mode when clicked", async () => {
    const user = userEvent.setup();
    render(<DarkModeToggle />);

    const toggleButton = screen.getByRole("button");

    // Initial state should be light mode
    expect(toggleButton).toHaveTextContent("🌙");
    expect(toggleButton).toHaveAttribute("title", "Switch to dark mode");
    expect(document.documentElement.classList.contains("dark")).toBe(false);

    // Click to toggle to dark mode
    await user.click(toggleButton);

    // Should now be in dark mode
    expect(toggleButton).toHaveTextContent("🌞");
    expect(toggleButton).toHaveAttribute("title", "Switch to light mode");
    expect(document.documentElement.classList.contains("dark")).toBe(true);

    // Click again to toggle back to light mode
    await user.click(toggleButton);

    // Should be back in light mode
    expect(toggleButton).toHaveTextContent("🌙");
    expect(toggleButton).toHaveAttribute("title", "Switch to dark mode");
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("initializes with dark mode when system preference is dark", () => {
    // Mock system preference for dark mode
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: query === "(prefers-color-scheme: dark)", // Match dark mode
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    render(<DarkModeToggle />);

    // Only test that the button shows the correct icon and title
    expect(screen.getByText("🌞")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveAttribute("title", "Switch to light mode");
  });

  it("applies correct styling based on variant and size", () => {
    render(<DarkModeToggle />);
    const button = screen.getByRole("button");

    // Check if the button has the correct variant and size classes
    expect(button).toHaveClass("hover:bg-accent"); // Outline variant
    expect(button).toHaveClass("h-8"); // Size sm
  });
});
