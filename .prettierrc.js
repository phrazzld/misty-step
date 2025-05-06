/**
 * Prettier Configuration
 *
 * This configuration defines the code formatting standards for the project.
 * Prettier is an opinionated code formatter that enforces consistent style
 * by parsing code and reprinting it with its own rules.
 *
 * The primary benefits are:
 * - Consistent code style across the entire codebase
 * - Elimination of style debates in code reviews
 * - Automatic formatting on save (when configured with editor)
 * - Integration with ESLint for cohesive code quality
 *
 * @see https://prettier.io/docs/en/options.html for all available options
 * @see docs/DEVELOPMENT_PHILOSOPHY_APPENDIX_TYPESCRIPT.md for TypeScript standards
 * @see docs/DEVELOPMENT_PHILOSOPHY_APPENDIX_FRONTEND.md for React/Next.js standards
 */

module.exports = {
  /**
   * Whether to add semicolons at the end of statements
   * @default true
   * @rationale Explicit is better than implicit; prevents ASI hazards
   */
  semi: true,

  /**
   * Number of spaces per indentation level
   * @default 2
   * @rationale Industry standard for JavaScript/TypeScript
   */
  tabWidth: 2,

  /**
   * Maximum line length before wrapping
   * @default 100
   * @rationale Balances readability with efficient screen space usage
   */
  printWidth: 100,

  /**
   * Use single quotes instead of double quotes
   * @default true
   * @rationale More compact and requires less shift key usage
   */
  singleQuote: true,

  /**
   * Print trailing commas wherever possible in multi-line
   * @default "all"
   * @rationale Produces cleaner git diffs when adding new items
   */
  trailingComma: 'all',

  /**
   * Print spaces between brackets in object literals
   * @default true
   * @rationale Improves readability of object literals
   */
  bracketSpacing: true,

  /**
   * Line Feed only line endings (Standardize across OSes)
   * @default "lf"
   * @rationale Consistent line endings for cross-platform development
   */
  endOfLine: 'lf',

  /**
   * Always include parentheses around a sole arrow function parameter
   * @default "always"
   * @rationale Consistent arrow function syntax regardless of parameter count
   */
  arrowParens: 'always',

  /**
   * Put the > of a multi-line JSX element at the end of the last line
   * @default false
   * @rationale Improves readability of nested JSX elements
   */
  bracketSameLine: false,

  /**
   * Use single quotes instead of double quotes in JSX
   * @default false
   * @rationale Standard JSX practice follows HTML attribute convention
   */
  jsxSingleQuote: false,

  /**
   * Indent with spaces instead of tabs
   * @default false
   * @rationale More consistent rendering across editors and environments
   */
  useTabs: false,

  /**
   * Format embedded code in files like markdown and html
   * @default "auto"
   * @rationale Ensures consistency across all code snippets
   */
  embeddedLanguageFormatting: 'auto',

  /**
   * Wrap markdown text as-is since markdown represents newlines with 2 trailing spaces
   * @default "preserve"
   * @rationale Respects content author's intended formatting
   */
  proseWrap: 'preserve',
};
