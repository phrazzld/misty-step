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
    expect(metadata.title).toBe("Misty Step - Teleporting Your Business Into The Future");
    expect(metadata.description).toBe(
      "Expert technology consulting delivering digital transformation, data analytics, and tailored solutions that drive growth and efficiency for businesses of all sizes."
    );
  });
});
