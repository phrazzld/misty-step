import { describe, it, expect } from "vitest";

import { render, screen } from "@/test/utils";

import { Textarea } from "./textarea";

describe("Textarea", () => {
  it("renders correctly with default props", () => {
    render(<Textarea placeholder="Enter message" />);
    expect(screen.getByPlaceholderText("Enter message")).toBeInTheDocument();
  });

  it("applies additional className", () => {
    render(<Textarea className="custom-class" placeholder="Test" />);
    expect(screen.getByPlaceholderText("Test")).toHaveClass("custom-class");
  });

  it("applies disabled state", () => {
    render(<Textarea disabled placeholder="Disabled textarea" />);
    const textarea = screen.getByPlaceholderText("Disabled textarea");
    expect(textarea).toBeDisabled();
  });

  it("sets rows attribute correctly", () => {
    render(<Textarea rows={6} placeholder="Test with rows" />);
    expect(screen.getByPlaceholderText("Test with rows")).toHaveAttribute("rows", "6");
  });

  it("passes additional props", () => {
    render(<Textarea data-testid="test-textarea" placeholder="Test" />);
    expect(screen.getByTestId("test-textarea")).toBeInTheDocument();
  });

  it("handles validation attributes", () => {
    render(<Textarea required placeholder="Required textarea" />);
    expect(screen.getByPlaceholderText("Required textarea")).toHaveAttribute("required");
  });
});
