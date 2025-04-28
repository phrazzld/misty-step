/**
 * TypeScript declarations for color-check.js
 */

/**
 * Convert oklch color to RGB using browser DOM
 */
declare function _oklchToRgbBrowser(
  l: number,
  c: number,
  h: number
): {
  r: number;
  g: number;
  b: number;
};

/**
 * Approximate conversion from Oklch to RGB
 */
declare function oklchToRgbApprox(
  l: number,
  c: number,
  h: number
): {
  r: number;
  g: number;
  b: number;
};

/**
 * Calculate relative luminance as per WCAG 2.1
 */
declare function relativeLuminance(r: number, g: number, b: number): number;

/**
 * Calculate contrast ratio between two colors
 */
declare function contrastRatio(
  color1: { r: number; g: number; b: number },
  color2: { r: number; g: number; b: number }
): number;

/**
 * Check if contrast ratio passes WCAG 2.1 AA standards
 */
declare function passesWCAG2AA(ratio: number): {
  normalText: boolean;
  largeText: boolean;
};

/**
 * Check a single color pair for contrast
 */
declare function checkContrastPair(
  pairName: string,
  color1: { l: number; c: number; h: number },
  color2: { l: number; c: number; h: number }
): {
  pair: string;
  ratio: string;
  passesNormalText: boolean;
  passesLargeText: boolean;
  adjustmentNeeded: string;
};

/**
 * Check all color pairs in both light and dark modes
 */
declare function checkAllContrastPairs(): {
  light: Array<{
    pair: string;
    ratio: string;
    passesNormalText: boolean;
    passesLargeText: boolean;
    adjustmentNeeded: string;
  }>;
  dark: Array<{
    pair: string;
    ratio: string;
    passesNormalText: boolean;
    passesLargeText: boolean;
    adjustmentNeeded: string;
  }>;
};
