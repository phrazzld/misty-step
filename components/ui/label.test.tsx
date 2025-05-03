import { createRef } from "react";
import { describe, it, expect } from "vitest";

import { render, screen } from "@/test/utils";

import { Label } from "./label";

describe("Label", () => {
  it("renders correctly with default props", () => {
    render(<Label htmlFor="test-input">Test Label</Label>);
    expect(screen.getByText("Test Label")).toBeInTheDocument();
  });

  it("applies the correct htmlFor attribute", () => {
    render(<Label htmlFor="email-input">Email</Label>);
    expect(screen.getByText("Email")).toHaveAttribute("for", "email-input");
  });

  it("applies additional className", () => {
    render(
      <Label className="custom-class" htmlFor="test">
        Test Label
      </Label>
    );
    expect(screen.getByText("Test Label")).toHaveClass("custom-class");
  });

  it("passes additional props", () => {
    render(
      <Label data-testid="test-label" htmlFor="test">
        Test Label
      </Label>
    );
    expect(screen.getByTestId("test-label")).toBeInTheDocument();
  });

  it("renders with children correctly", () => {
    render(
      <Label htmlFor="test">
        <span>Complex</span> Label
      </Label>
    );
    expect(screen.getByText("Complex")).toBeInTheDocument();
    expect(screen.getByText("Label", { exact: false })).toBeInTheDocument();
  });

  it("forwards ref to the label element", () => {
    const ref = createRef<HTMLLabelElement>();
    render(
      <Label ref={ref} htmlFor="test-ref">
        Ref Test
      </Label>
    );
    expect(ref.current).not.toBeNull();
    expect(ref.current).toEqual(screen.getByText("Ref Test"));
  });

  it("displays an asterisk when required prop is true", () => {
    render(
      <Label htmlFor="required-field" required>
        Required Field
      </Label>
    );
    expect(screen.getByText("Required Field")).toBeInTheDocument();
    const asterisk = screen.getByText("*");
    expect(asterisk).toBeInTheDocument();
    expect(asterisk).toHaveClass("text-destructive");
  });

  it("does not display an asterisk when required prop is false or undefined", () => {
    render(<Label htmlFor="optional-field">Optional Field</Label>);
    expect(screen.getByText("Optional Field")).toBeInTheDocument();
    expect(screen.queryByText("*")).not.toBeInTheDocument();

    render(
      <Label htmlFor="explicitly-optional" required={false}>
        Explicitly Optional
      </Label>
    );
    expect(screen.getByText("Explicitly Optional")).toBeInTheDocument();
    expect(screen.queryByText("*")).not.toBeInTheDocument();
  });
});
