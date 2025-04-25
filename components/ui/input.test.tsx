import { describe, it, expect } from "vitest";

import { render, screen } from "@/test/utils";

import { Input } from "./input";

describe("Input", () => {
  it("renders correctly with default props", () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
  });

  it("applies the correct type attribute", () => {
    render(<Input type="email" placeholder="Email" />);
    expect(screen.getByPlaceholderText("Email")).toHaveAttribute("type", "email");
  });

  it("applies additional className", () => {
    render(<Input className="custom-class" placeholder="Test" />);
    expect(screen.getByPlaceholderText("Test")).toHaveClass("custom-class");
  });

  it("applies disabled state", () => {
    render(<Input disabled placeholder="Disabled input" />);
    const input = screen.getByPlaceholderText("Disabled input");
    expect(input).toBeDisabled();
  });

  it("passes additional props", () => {
    render(<Input data-testid="test-input" placeholder="Test" />);
    expect(screen.getByTestId("test-input")).toBeInTheDocument();
  });

  it("handles validation attributes", () => {
    render(<Input required placeholder="Required input" />);
    expect(screen.getByPlaceholderText("Required input")).toHaveAttribute("required");
  });
});
