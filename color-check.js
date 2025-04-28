#!/usr/bin/env node

/**
 * Color Contrast Checker for Misty Step Marketing Site
 *
 * This script converts Oklch colors to RGB and calculates contrast ratios
 * according to WCAG 2.1 AA standards for accessibility.
 */

// Browser-based conversion (unused but kept for reference)

/**
 * Convert oklch color to RGB using browser DOM (reference only)
 * @param {number} l - Lightness
 * @param {number} c - Chroma
 * @param {number} h - Hue
 * @returns {Object} RGB color object
 */
function _oklchToRgbBrowser(l, c, h) {
  const div = document.createElement("div");
  div.style.color = `oklch(${l} ${c} ${h})`;
  document.body.appendChild(div);
  const rgbColor = window.getComputedStyle(div).color;
  document.body.removeChild(div);

  const match = rgbColor.match(/rgb\((\d+), (\d+), (\d+)\)/);
  if (!match) return { r: 0, g: 0, b: 0 };

  return {
    r: parseInt(match[1], 10),
    g: parseInt(match[2], 10),
    b: parseInt(match[3], 10),
  };
}

/**
 * Approximate conversion from Oklch to RGB
 * This is a simplified algorithm for demonstration purposes
 * @param {number} l - Lightness
 * @param {number} c - Chroma
 * @param {number} h - Hue
 * @returns {Object} RGB color object
 */
function oklchToRgbApprox(l, c, h) {
  const hRad = (h * Math.PI) / 180;
  const a = c * Math.cos(hRad);
  const b = c * Math.sin(hRad);

  // Simplified conversion to sRGB
  const r = Math.round(255 * (l + 0.4 * a));
  const g = Math.round(255 * (l - 0.2 * a - 0.1 * b));
  const b1 = Math.round(255 * (l - 0.2 * a + 0.3 * b));

  return {
    r: Math.min(255, Math.max(0, r)),
    g: Math.min(255, Math.max(0, g)),
    b: Math.min(255, Math.max(0, b1)),
  };
}

/**
 * Calculate relative luminance as per WCAG 2.1
 * @param {number} r - Red value (0-255)
 * @param {number} g - Green value (0-255)
 * @param {number} b - Blue value (0-255)
 * @returns {number} Relative luminance value
 */
function relativeLuminance(r, g, b) {
  const rsrgb = r / 255;
  const gsrgb = g / 255;
  const bsrgb = b / 255;

  const r1 = rsrgb <= 0.03928 ? rsrgb / 12.92 : Math.pow((rsrgb + 0.055) / 1.055, 2.4);
  const g1 = gsrgb <= 0.03928 ? gsrgb / 12.92 : Math.pow((gsrgb + 0.055) / 1.055, 2.4);
  const b1 = bsrgb <= 0.03928 ? bsrgb / 12.92 : Math.pow((bsrgb + 0.055) / 1.055, 2.4);

  return 0.2126 * r1 + 0.7152 * g1 + 0.0722 * b1;
}

/**
 * Calculate contrast ratio between two colors
 * @param {Object} color1 - First RGB color object
 * @param {Object} color2 - Second RGB color object
 * @returns {number} Contrast ratio
 */
function contrastRatio(color1, color2) {
  const lum1 = relativeLuminance(color1.r, color1.g, color1.b);
  const lum2 = relativeLuminance(color2.r, color2.g, color2.b);

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check if contrast ratio passes WCAG 2.1 AA standards
 * @param {number} ratio - Contrast ratio
 * @returns {Object} Object with pass/fail status for normal and large text
 */
function passesWCAG2AA(ratio) {
  return {
    normalText: ratio >= 4.5,
    largeText: ratio >= 3,
  };
}

// Colors defined in COLOR.md
const colors = {
  light: {
    background: { l: 0.98, c: 0.003, h: 250 },
    foreground: { l: 0.2, c: 0.015, h: 250 },
    primary: { l: 0.55, c: 0.28, h: 265 },
    primaryForeground: { l: 0.98, c: 0.003, h: 250 },
    secondary: { l: 0.9, c: 0.03, h: 265 },
    secondaryForeground: { l: 0.2, c: 0.015, h: 250 },
    muted: { l: 0.95, c: 0.015, h: 265 },
    mutedForeground: { l: 0.4, c: 0.02, h: 265 },
    accent: { l: 0.8, c: 0.15, h: 290 },
    accentForeground: { l: 0.98, c: 0.003, h: 250 },
    destructive: { l: 0.65, c: 0.28, h: 25 },
    destructiveForeground: { l: 0.98, c: 0.003, h: 250 },
    card: { l: 0.99, c: 0.002, h: 250 },
    cardForeground: { l: 0.2, c: 0.015, h: 250 },
    popover: { l: 0.99, c: 0.002, h: 250 },
    popoverForeground: { l: 0.2, c: 0.015, h: 250 },
    sidebar: { l: 0.95, c: 0.005, h: 250 },
    sidebarForeground: { l: 0.2, c: 0.015, h: 250 },
    sidebarPrimary: { l: 0.55, c: 0.28, h: 265 },
    sidebarPrimaryForeground: { l: 0.98, c: 0.003, h: 250 },
    sidebarAccent: { l: 0.9, c: 0.03, h: 265 },
    sidebarAccentForeground: { l: 0.2, c: 0.015, h: 250 },
  },
  dark: {
    background: { l: 0.2, c: 0.015, h: 250 },
    foreground: { l: 0.95, c: 0.005, h: 250 },
    primary: { l: 0.7, c: 0.25, h: 265 },
    primaryForeground: { l: 0.95, c: 0.005, h: 250 },
    secondary: { l: 0.3, c: 0.05, h: 265 },
    secondaryForeground: { l: 0.95, c: 0.005, h: 250 },
    muted: { l: 0.25, c: 0.02, h: 265 },
    mutedForeground: { l: 0.7, c: 0.02, h: 265 },
    accent: { l: 0.5, c: 0.15, h: 290 },
    accentForeground: { l: 0.95, c: 0.005, h: 250 },
    destructive: { l: 0.75, c: 0.22, h: 25 },
    destructiveForeground: { l: 0.95, c: 0.005, h: 250 },
    card: { l: 0.22, c: 0.01, h: 250 },
    cardForeground: { l: 0.95, c: 0.005, h: 250 },
    popover: { l: 0.22, c: 0.01, h: 250 },
    popoverForeground: { l: 0.95, c: 0.005, h: 250 },
    sidebar: { l: 0.22, c: 0.01, h: 250 },
    sidebarForeground: { l: 0.95, c: 0.005, h: 250 },
    sidebarPrimary: { l: 0.7, c: 0.25, h: 265 },
    sidebarPrimaryForeground: { l: 0.95, c: 0.005, h: 250 },
    sidebarAccent: { l: 0.3, c: 0.05, h: 265 },
    sidebarAccentForeground: { l: 0.95, c: 0.005, h: 250 },
  },
};

/**
 * Check a single color pair for contrast
 * @param {string} pairName - Name of the color pair
 * @param {Object} color1 - First color in Oklch
 * @param {Object} color2 - Second color in Oklch
 * @returns {Object} Result object with contrast ratio and compliance information
 */
function checkContrastPair(pairName, color1, color2) {
  const rgb1 = oklchToRgbApprox(color1.l, color1.c, color1.h);
  const rgb2 = oklchToRgbApprox(color2.l, color2.c, color2.h);

  const ratio = contrastRatio(rgb1, rgb2);
  const wcag = passesWCAG2AA(ratio);

  return {
    pair: pairName,
    ratio: ratio.toFixed(2),
    passesNormalText: wcag.normalText,
    passesLargeText: wcag.largeText,
    adjustmentNeeded: !wcag.normalText
      ? "Adjust for normal text (4.5:1)"
      : !wcag.largeText
        ? "Adjust for large text (3:1)"
        : "None",
  };
}

/**
 * Check all color pairs in both light and dark modes
 * @returns {Object} Results object containing light and dark mode contrast check results
 */
function checkAllContrastPairs() {
  const results = {
    light: [],
    dark: [],
  };

  // Light mode pairs
  results.light.push(
    checkContrastPair("foreground/background", colors.light.foreground, colors.light.background)
  );
  results.light.push(
    checkContrastPair(
      "primary-foreground/primary",
      colors.light.primaryForeground,
      colors.light.primary
    )
  );
  results.light.push(
    checkContrastPair(
      "secondary-foreground/secondary",
      colors.light.secondaryForeground,
      colors.light.secondary
    )
  );
  results.light.push(
    checkContrastPair("muted-foreground/muted", colors.light.mutedForeground, colors.light.muted)
  );
  results.light.push(
    checkContrastPair(
      "accent-foreground/accent",
      colors.light.accentForeground,
      colors.light.accent
    )
  );
  results.light.push(
    checkContrastPair(
      "destructive-foreground/destructive",
      colors.light.destructiveForeground,
      colors.light.destructive
    )
  );
  results.light.push(
    checkContrastPair("card-foreground/card", colors.light.cardForeground, colors.light.card)
  );
  results.light.push(
    checkContrastPair(
      "popover-foreground/popover",
      colors.light.popoverForeground,
      colors.light.popover
    )
  );
  results.light.push(
    checkContrastPair(
      "sidebar-foreground/sidebar",
      colors.light.sidebarForeground,
      colors.light.sidebar
    )
  );
  results.light.push(
    checkContrastPair(
      "sidebar-primary-foreground/sidebar-primary",
      colors.light.sidebarPrimaryForeground,
      colors.light.sidebarPrimary
    )
  );
  results.light.push(
    checkContrastPair(
      "sidebar-accent-foreground/sidebar-accent",
      colors.light.sidebarAccentForeground,
      colors.light.sidebarAccent
    )
  );

  // Dark mode pairs
  results.dark.push(
    checkContrastPair("foreground/background", colors.dark.foreground, colors.dark.background)
  );
  results.dark.push(
    checkContrastPair(
      "primary-foreground/primary",
      colors.dark.primaryForeground,
      colors.dark.primary
    )
  );
  results.dark.push(
    checkContrastPair(
      "secondary-foreground/secondary",
      colors.dark.secondaryForeground,
      colors.dark.secondary
    )
  );
  results.dark.push(
    checkContrastPair("muted-foreground/muted", colors.dark.mutedForeground, colors.dark.muted)
  );
  results.dark.push(
    checkContrastPair("accent-foreground/accent", colors.dark.accentForeground, colors.dark.accent)
  );
  results.dark.push(
    checkContrastPair(
      "destructive-foreground/destructive",
      colors.dark.destructiveForeground,
      colors.dark.destructive
    )
  );
  results.dark.push(
    checkContrastPair("card-foreground/card", colors.dark.cardForeground, colors.dark.card)
  );
  results.dark.push(
    checkContrastPair(
      "popover-foreground/popover",
      colors.dark.popoverForeground,
      colors.dark.popover
    )
  );
  results.dark.push(
    checkContrastPair(
      "sidebar-foreground/sidebar",
      colors.dark.sidebarForeground,
      colors.dark.sidebar
    )
  );
  results.dark.push(
    checkContrastPair(
      "sidebar-primary-foreground/sidebar-primary",
      colors.dark.sidebarPrimaryForeground,
      colors.dark.sidebarPrimary
    )
  );
  results.dark.push(
    checkContrastPair(
      "sidebar-accent-foreground/sidebar-accent",
      colors.dark.sidebarAccentForeground,
      colors.dark.sidebarAccent
    )
  );

  return results;
}

// Run the check and output results
const results = checkAllContrastPairs();
process.stdout.write(JSON.stringify(results, null, 2));
