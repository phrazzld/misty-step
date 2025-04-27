import { describe, it, expect, vi } from "vitest";

// Mock the globals.css import to avoid PostCSS loading issues
vi.mock("./globals.css", () => ({}));

// Mock the next/font/google
vi.mock("next/font/google", () => ({
  Geist: () => ({
    variable: "--font-geist-sans",
  }),
  Geist_Mono: () => ({
    variable: "--font-geist-mono",
  }),
}));

import { metadata } from "./layout";

describe("Layout", () => {
  it("has the correct metadata", () => {
    expect(metadata.title).toBe("Misty Step - Professional Technology Consulting Services");
    expect(metadata.description).toBe(
      "Software development and technical consulting services that transform your business challenges into effective digital solutions. Expert guidance when you need it most."
    );
  });
});
