/**
 * ESLint Configuration for Marketing Site
 *
 * This configuration follows the Development Philosophy (v3) and its appendices,
 * enforcing strict TypeScript rules, React best practices, and code quality standards.
 *
 * The project uses ESLint v9+ with the flat config format (eslint.config.js), which
 * is the modern approach recommended by ESLint. This configuration:
 *
 * - Leverages ESLint's new flat config format for better performance and flexibility
 * - Uses FlatCompat for backward compatibility with traditional config formats
 * - Applies strict TypeScript rules with type-aware checking
 * - Enforces React best practices and hooks rules
 * - Ensures accessibility compliance through jsx-a11y
 * - Maintains proper import organization and prevents common import issues
 * - Integrates with Prettier to avoid formatting conflicts
 * - Provides specific overrides for test and Storybook files
 *
 * @see https://eslint.org/docs/latest/use/configure/configuration-files-new
 * @see docs/DEVELOPMENT_PHILOSOPHY_APPENDIX_TYPESCRIPT.md for TypeScript standards
 * @see docs/DEVELOPMENT_PHILOSOPHY_APPENDIX_FRONTEND.md for React standards
 */

import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * FlatCompat provides backward compatibility with traditional ESLint configs
 * This allows us to use the new flat config format while still supporting:
 * - Traditional config extends (e.g., 'next/core-web-vitals')
 * - Plugin configurations (e.g., 'plugin:@typescript-eslint/recommended')
 *
 * @see https://eslint.org/docs/latest/use/configure/migration-guide#using-eslintrc-configs-in-flat-config
 */
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/**
 * Patterns to exclude from linting
 *
 * This comprehensive list ensures we only lint source code files and
 * exclude build artifacts, configuration files, and generated content.
 *
 * We ignore:
 * - External dependencies and package management files
 * - Build output directories for Next.js, Storybook, etc.
 * - Configuration files for tools that don't need linting
 * - Files that have their own formatters or validation
 */
const ignoredPatterns = [
  // External dependencies
  '**/node_modules/**', // Third-party dependencies

  // Build outputs and artifacts
  '**/.next/**', // Next.js build directory
  '**/dist/**', // Generic build output directory
  '**/storybook-static/**', // Storybook build output
  '**/out/**', // Next.js static export directory
  '**/coverage/**', // Test coverage reports
  '**/build/**', // Generic build directory

  // System and tool directories
  '**/.git/**', // Git internals
  '**/.husky/**', // Husky Git hooks
  '**/.vscode/**', // VS Code settings

  // Config files with their own schema/validator
  'postcss.config.mjs', // PostCSS config
  'tailwind.config.mjs', // Tailwind CSS config
  'commitlint.config.js', // Commit message linting
  'vitest.config.ts', // Vitest test runner config
  'next.config.ts', // Next.js framework config

  // Other file types
  '**/*.log', // Log files
  '**/*.json', // JSON files (have their own syntax requirements)
];

/**
 * ESLint configuration array
 *
 * The flat config format uses an array of configuration objects that are merged together.
 * Each object can target specific files and apply different rules to them.
 * Objects later in the array override earlier ones when there are conflicts.
 */
const eslintConfig = [
  /**
   * Base configuration for all files
   *
   * This includes global settings that apply to the entire codebase,
   * such as file ignore patterns and global linter options.
   */
  {
    ignores: ignoredPatterns,
    linterOptions: {
      // Reports unused eslint-disable comments to prevent unnecessary suppressions
      reportUnusedDisableDirectives: true,
    },
  },

  /**
   * Next.js configuration
   *
   * Includes React and JSX rules tailored for Next.js development
   * Enforces core web vitals standards for performance
   *
   * @see https://nextjs.org/docs/basic-features/eslint
   */
  ...compat.extends('next/core-web-vitals'),

  /**
   * TypeScript-specific rules
   *
   * Enforces type safety and best practices for TypeScript code
   * Uses the recommended configuration from @typescript-eslint
   *
   * @see https://typescript-eslint.io/linting/configs
   */
  ...compat.extends('plugin:@typescript-eslint/recommended'),

  /**
   * Accessibility rules for JSX
   *
   * Ensures components are accessible to users with disabilities
   * Follows WCAG and other accessibility standards
   *
   * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y
   */
  ...compat.extends('plugin:jsx-a11y/recommended'),

  /**
   * Import organization rules
   *
   * Enforces consistent import ordering and prevents common import issues
   * Includes TypeScript-specific import rules
   *
   * @see https://github.com/import-js/eslint-plugin-import
   */
  ...compat.extends('plugin:import/recommended'),
  ...compat.extends('plugin:import/typescript'),

  /**
   * Prettier integration
   *
   * Turns off all ESLint rules that might conflict with Prettier
   * Must be placed LAST in the extends array to properly override other configs
   *
   * @see https://github.com/prettier/eslint-config-prettier
   */
  ...compat.extends('prettier'),

  /**
   * Custom project-specific rules
   *
   * These rules are tailored to our specific project needs and coding standards.
   * They supplement the extended configurations with additional requirements.
   * Organized by category for better maintainability.
   */
  {
    rules: {
      /*** TypeScript Rules ***/

      /**
       * Forbids the use of the 'any' type to ensure proper type safety
       * Forces developers to use proper typing or more specific types like 'unknown'
       * @rationale Improves type safety and prevents type-related bugs
       */
      '@typescript-eslint/no-explicit-any': 'error',

      /**
       * Prevents unused variables but allows intentionally unused variables with underscore prefix
       * @example function calculateTotal(_unused, valueToUse) { return valueToUse * 2; }
       * @rationale Reduces code clutter while allowing for API compatibility
       */
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_', // Allows params prefixed with underscore
          varsIgnorePattern: '^_', // Allows variables prefixed with underscore
        },
      ],

      /**
       * Disallows non-null assertions (the ! postfix operator)
       * @example const name = user!.name; // Not allowed
       * @rationale Encourages proper null checking and prevents runtime errors
       */
      '@typescript-eslint/no-non-null-assertion': 'error',

      /**
       * Enforces using 'interface' for type definitions instead of 'type'
       * @rationale Provides more consistent code style and better supports declaration merging
       */
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],

      /**
       * Prevents variable shadowing (redeclaring a variable in a child scope)
       * @rationale Prevents confusing code and potential bugs from using wrong variable
       */
      '@typescript-eslint/no-shadow': 'error',

      /*** Code Quality Rules ***/

      /**
       * Forbids using console.log and other console methods
       * @rationale Use the structured logger from lib/logger.ts instead for consistent logging
       */
      'no-console': 'error',

      /**
       * Prevents reassigning function parameters
       * @rationale Enforces immutability and functional programming principles
       */
      'no-param-reassign': 'error',

      /*** React Rules ***/

      /**
       * Enforces providing a unique 'key' prop in array iterations
       * @rationale Necessary for React's reconciliation process and performance
       */
      'react/jsx-key': 'error',

      /**
       * Validates the dependencies array in useEffect, useMemo, and useCallback hooks
       * @rationale Prevents stale closures and ensures hooks run when dependencies change
       */
      'react-hooks/exhaustive-deps': 'error',

      /**
       * Restricts binding in JSX attributes to prevent unnecessary re-renders
       * @rationale Improves performance by preventing function recreation on each render
       * @exception Allows arrow functions as they're often needed for passing parameters
       */
      'react/jsx-no-bind': [
        'error',
        {
          allowArrowFunctions: true, // Allow arrow functions in JSX props
          allowFunctions: false, // Don't allow regular function declarations
        },
      ],

      /**
       * Prevents using array indices as React 'key' props
       * @rationale Array indices can lead to incorrect component updates when items are reordered
       */
      'react/no-array-index-key': 'error',

      /**
       * Requires self-closing for components without children
       * @example <div /> instead of <div></div> when empty
       * @rationale Improves code readability and reduces noise
       */
      'react/self-closing-comp': 'error',

      /*** Code Structure Rules ***/

      /**
       * Warns when files exceed 500 lines (excludes blank lines and comments)
       * @rationale Encourages modular code and better file organization
       */
      'max-lines': ['warn', { max: 500, skipBlankLines: true, skipComments: true }],

      /**
       * Warns when functions exceed 75 lines (excludes blank lines and comments)
       * @rationale Encourages smaller, more focused functions
       */
      'max-lines-per-function': ['warn', { max: 75, skipBlankLines: true, skipComments: true }],

      /**
       * Warns when functions exceed a cyclomatic complexity of 10
       * @rationale Discourages overly complex functions that are hard to test and maintain
       */
      complexity: ['warn', 10],

      /*** Import Rules ***/

      /**
       * Enforces consistent import ordering and grouping
       * @rationale Provides consistent codebase and makes imports easier to scan
       */
      'import/order': [
        'error',
        {
          // Group imports in this specific order
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always', // Require newlines between import groups
          alphabetize: { order: 'asc', caseInsensitive: true }, // Sort alphabetically
        },
      ],

      /**
       * Prevents importing the same module multiple times
       * @rationale Reduces redundancy and potential confusion
       */
      'import/no-duplicates': 'error',

      /**
       * Ensures all imports appear at the top of the file
       * @rationale Maintains consistent code organization and prevents hoisting issues
       */
      'import/first': 'error',

      /*** Accessibility Rules ***/

      /**
       * Ensures anchors have valid href attributes
       * @rationale Required for proper accessibility and keyboard navigation
       */
      'jsx-a11y/anchor-is-valid': 'error',

      /**
       * Ensures all images have alt text for screen readers
       * @rationale Critical for accessibility compliance
       */
      'jsx-a11y/alt-text': 'error',

      /*** Error Handling ***/

      /**
       * Ensures only Error objects are thrown
       * @example throw new Error('message') // Correct
       * @example throw 'message' // Incorrect
       * @rationale Enables proper stack traces and error handling
       */
      'no-throw-literal': 'error',
    },
  },

  /**
   * Test files overrides
   *
   * Test files have different requirements than application code.
   * This configuration relaxes certain rules that are often too restrictive for tests.
   *
   * @applies To all test files (*.test.ts, *.test.tsx, etc.) and files in test directories
   */
  {
    files: [
      '**/*.test.ts', // Vitest test files
      '**/*.test.tsx', // React component test files
      '**/*.spec.ts', // Alternative test naming convention
      '**/*.spec.tsx', // Alternative React test naming convention
      '**/test/**/*.ts', // Files in test directories
      '**/test/**/*.tsx', // React files in test directories
    ],
    rules: {
      /**
       * Relaxed to 'warn' for tests to allow for type flexibility in mocks and test data
       * @rationale Test mocks often need flexibility that strict typing would impede
       */
      '@typescript-eslint/no-explicit-any': 'warn',

      /**
       * Disabled for test files as tests often contain large test suites
       * @rationale Long test files are common and don't present the same maintenance challenges
       */
      'max-lines': 'off',

      /**
       * Disabled for test files to allow for comprehensive test cases
       * @rationale Test functions often need to cover multiple scenarios in one test
       */
      'max-lines-per-function': 'off',

      /**
       * Allows multiple exports in test utility files
       * @rationale Test utilities often export multiple related helper functions
       */
      'import/export': 'off',
    },
  },

  /**
   * Storybook stories overrides
   *
   * Story files have special needs different from both application code and tests.
   * These overrides accommodate the unique patterns used in Storybook stories.
   *
   * @applies To all Storybook story files (*.stories.ts, *.stories.tsx)
   * @see https://storybook.js.org/docs/react/api/csf
   */
  {
    files: ['**/*.stories.ts', '**/*.stories.tsx'],
    rules: {
      /**
       * Disabled for story files as they can contain many story variations
       * @rationale Stories often contain multiple variations of a component
       */
      'max-lines': 'off',

      /**
       * Disabled for story files to allow for complex story setups
       * @rationale Story configuration and state management can be verbose
       */
      'max-lines-per-function': 'off',

      /**
       * Disabled for stories which may have complex argument controls or decorators
       * @rationale Stories often need complex setup code for demonstration purposes
       */
      complexity: 'off',

      /**
       * Relaxed to 'warn' for stories to ease development
       * @rationale Stories focus on visual representation, not code quality enforcement
       */
      'react/self-closing-comp': 'warn',

      /**
       * Relaxed to 'warn' for stories to allow for demonstration links
       * @rationale Stories sometimes need placeholder links for demonstration
       */
      'jsx-a11y/anchor-is-valid': 'warn',
    },
  },
];

export default eslintConfig;
