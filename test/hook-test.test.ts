import { describe, it, expect } from "vitest";

describe("Hook Test", () => {
  it("should pass to test the pre-commit hook", () => {
    expect(1).toBe(1); // This will pass
  });
});
