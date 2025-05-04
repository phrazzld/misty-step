/**
 * ESLint Configuration for Marketing Site
 *
 * This configuration follows the Development Philosophy (v3) and its appendices,
 * enforcing strict TypeScript rules, React best practices, and code quality standards.
 *
 * The configuration uses ESLint flat config format and incorporates:
 * - TypeScript rules with type-aware checking
 * - React/Hooks/JSX-A11y rules
 * - Import rules for proper module organization
 * - Prettier integration
 */

import { dirname } from "path";
import { fileURLToPath } from "url";

import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// FlatCompat is needed for compatibility with older ESLint configs
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Define ignored patterns
const ignoredPatterns = [
  "**/node_modules/**",
  "**/.next/**",
  "**/dist/**",
  "**/storybook-static/**",
  "**/coverage/**",
  "**/.git/**",
  "**/.husky/**",
  "**/.vscode/**",
  "**/build/**",
  "postcss.config.mjs",
  "tailwind.config.mjs",
  "commitlint.config.js",
  "vitest.config.ts",
  "next.config.ts",
  "**/*.log",
  "**/*.json",
];

const eslintConfig = [
  // Base configuration
  {
    ignores: ignoredPatterns,
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
  },

  // Next.js configuration - includes React/JSX rules
  ...compat.extends("next/core-web-vitals"),

  // TypeScript configuration
  ...compat.extends("plugin:@typescript-eslint/recommended"),

  // JSX Accessibility rules
  ...compat.extends("plugin:jsx-a11y/recommended"),

  // Import rules for module organization
  ...compat.extends("plugin:import/recommended"),
  ...compat.extends("plugin:import/typescript"),

  // Prettier integration - must be last to disable conflicting rules
  ...compat.extends("prettier"),

  // Additional custom rules
  {
    rules: {
      // Enforce strict TypeScript rules
      "@typescript-eslint/no-explicit-any": "error", // Forbid 'any' type
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-non-null-assertion": "error", // Disallow non-null assertions
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"], // Prefer interfaces over types
      "@typescript-eslint/no-shadow": "error", // No shadowing variables

      // Ban console logging (use structured logger instead)
      "no-console": "error",

      // Enforce immutability (no direct mutation)
      "no-param-reassign": "error",

      // Enforce React best practices
      "react/jsx-key": "error", // Enforce key prop in iterators
      "react-hooks/exhaustive-deps": "error", // Enforce correct dependencies array
      "react/jsx-no-bind": [
        "error",
        {
          allowArrowFunctions: true,
          allowFunctions: false,
        },
      ],
      "react/no-array-index-key": "error", // Discourage using array index as key
      "react/self-closing-comp": "error", // Enforce self-closing for empty elements

      // File length limits - warn at 500 lines (excluding blanks/comments)
      "max-lines": ["warn", { max: 500, skipBlankLines: true, skipComments: true }],

      // Enforce function complexity limits
      "max-lines-per-function": ["warn", { max: 75, skipBlankLines: true, skipComments: true }],
      complexity: ["warn", 10], // Cyclomatic complexity limit

      // Ensure imports are properly sorted
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
      "import/no-duplicates": "error", // Prevent duplicate imports
      "import/first": "error", // Enforce imports at the top

      // Accessibility rules
      "jsx-a11y/anchor-is-valid": "error", // Ensure anchors have valid href
      "jsx-a11y/alt-text": "error", // Ensure images have alt text

      // Error handling
      "no-throw-literal": "error", // Only throw Error objects
    },
  },

  // Specific overrides for test files
  {
    files: [
      "**/*.test.ts",
      "**/*.test.tsx",
      "**/*.spec.ts",
      "**/*.spec.tsx",
      "**/test/**/*.ts",
      "**/test/**/*.tsx",
    ],
    rules: {
      // Relax certain rules for tests
      "@typescript-eslint/no-explicit-any": "warn", // Sometimes needed in test mocks
      "max-lines": "off", // Tests can be longer
      "max-lines-per-function": "off", // Test functions can be longer
      "import/export": "off", // Allow multiple exports for testing utilities
    },
  },

  // Specific overrides for story files
  {
    files: ["**/*.stories.ts", "**/*.stories.tsx"],
    rules: {
      // Relax certain rules for Storybook stories
      "max-lines": "off", // Stories can be longer
      "max-lines-per-function": "off", // Story functions can be longer
      complexity: "off", // Stories can be more complex
      "react/self-closing-comp": "warn", // Only warn about self-closing
      "jsx-a11y/anchor-is-valid": "warn", // Allow demo links without href in stories
    },
  },
];

export default eslintConfig;
