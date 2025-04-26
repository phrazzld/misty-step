import { dirname } from "path";
import { fileURLToPath } from "url";

import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Next.js configuration
  ...compat.extends("next/core-web-vitals"),

  // TypeScript configuration
  ...compat.extends("plugin:@typescript-eslint/recommended"),

  // Prettier integration - must be last
  ...compat.extends("prettier"),

  // Additional rules
  {
    rules: {
      // Enforce strict TypeScript rules
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
      "@typescript-eslint/no-shadow": "error",
      // Enforce explicit function return types
      "@typescript-eslint/explicit-function-return-type": [
        "error",
        {
          allowExpressions: true,
          allowTypedFunctionExpressions: true,
        },
      ],

      // Ban console logging in production
      "no-console": ["error", { allow: ["warn", "error"] }],

      // Enforce React best practices
      "react/jsx-key": "error",
      "react-hooks/exhaustive-deps": "error",

      // Enforce file length limits
      // Warn at 500 lines (excluding blanks/comments)
      "max-lines": ["warn", { max: 500, skipBlankLines: true, skipComments: true }],

      // Ensure imports are properly sorted
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
    },
  },
];

export default eslintConfig;
