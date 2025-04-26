import * as React from "react";
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
    const ref = React.createRef<HTMLLabelElement>();
    render(
      <Label ref={ref} htmlFor="test-ref">
        Ref Test
      </Label>
    );
    expect(ref.current).not.toBeNull();
    expect(ref.current).toEqual(screen.getByText("Ref Test"));
  });
});
