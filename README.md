# Marketing Site

[![CI](https://github.com/phrazzld/misty-step/actions/workflows/ci.yml/badge.svg)](https://github.com/phrazzld/misty-step/actions/workflows/ci.yml)
[![Test Coverage](https://img.shields.io/badge/coverage-92%25-brightgreen)](https://github.com/phrazzld/misty-step)

This is the marketing website for Misty Step, a technology consulting firm specializing in custom software development and technical consulting services.

## Package Manager

This project requires [pnpm](https://pnpm.io) as the package manager. npm and yarn are not supported.

```bash
# Install pnpm if you don't have it already
npm install -g pnpm

# Install dependencies
pnpm install
```

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Site Structure

- **Header** - Navigation to key sections (Services, About, Contact)
- **Hero** - Main banner with company introduction and CTA buttons
- **Services** - Core service offerings with detailed descriptions
- **About** - Company background and mission
- **Contact** - Contact form and information
- **Footer** - Additional navigation and links

## Technology Stack

- Next.js 15.3.1 with React 19
- TypeScript with strict configuration
- Tailwind CSS for styling
- Shadcn UI components
- Storybook for component development and documentation
- Responsive design
- Dark mode support

## Testing

This project uses Vitest for testing. Run the tests with:

```bash
# Run tests once
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage

# Run tests with UI
pnpm test:ui
```

## Code Quality

This project enforces code quality through a comprehensive suite of tools that work together to ensure consistent, maintainable, and type-safe code.

### Overview of Tools

- **TypeScript**: Provides static type checking with strict configuration for enhanced code reliability
- **ESLint**: Enforces code quality rules and best practices
- **Prettier**: Ensures consistent code formatting across the project
- **Husky**: Manages Git hooks for pre-commit and post-commit automation
- **lint-staged**: Runs linters and formatters only on staged files for efficient pre-commit checks
- **GitHub Actions**: Runs automated quality checks on pull requests and pushes

#### Key ESLint Rules

The project enforces strict code quality rules including:

- No use of `any` type in TypeScript
- No unused variables (prefixing with `_` is allowed for intentionally unused variables)
- No non-null assertions (use proper type guards instead)
- No console logging (use the structured logger in `lib/logger.ts` instead)
- No parameter reassignment to enforce immutability
- React-specific rules for hooks, keys, and performance
- File length limits (warning at 500 lines)
- Function complexity limits (cyclomatic complexity warning at 10)

### Code Quality Scripts

The following npm scripts are available for manual code quality checks:

- `pnpm lint` - Run ESLint to check for code quality issues
- `pnpm lint:fix` - Run ESLint with automatic fixing of issues where possible
- `pnpm format` - Run Prettier to format all files
- `pnpm format:check` - Run Prettier in check mode (without modifying files)
- `pnpm typecheck` - Run TypeScript compiler in type-check mode (no emitting)

Example usage:

```bash
# Check code quality before committing
pnpm format:check && pnpm lint && pnpm typecheck

# Fix formatting and auto-fixable lint issues
pnpm format && pnpm lint:fix
```

### Pre-commit Hook Workflow

The project uses Husky to manage Git hooks and lint-staged to optimize the pre-commit process:

1. When you run `git commit`, the pre-commit hook is triggered
2. lint-staged runs Prettier and ESLint only on staged files
3. Prettier formats the files first
4. ESLint checks for issues and fixes auto-fixable problems
5. If there are unfixable issues, the commit is aborted with error messages
6. If all checks pass, the commit proceeds normally

This ensures that all committed code meets the project's quality standards.

### Configuration Files

- `.prettierrc.json` - Prettier configuration
- `eslint.config.mjs` - ESLint flat configuration (ESLint v9+)
- `tsconfig.json` - TypeScript compiler configuration
- `.lintstagedrc.json` - lint-staged configuration
- `.husky/pre-commit` - Husky pre-commit hook script

### Recommended Editor Setup

#### VS Code Extensions

For the best development experience, we recommend the following VS Code extensions:

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [TypeScript Error Translator](https://marketplace.visualstudio.com/items?itemName=mattpocock.ts-error-translator)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

#### Recommended VS Code Settings

Add these to your VS Code settings (either user or workspace) for an optimal experience:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative"
}
```

## Continuous Integration

The project uses two GitHub Actions workflows that run automatically on all pull requests and pushes to the main branch:

### Code Quality Workflow

The code quality workflow (`.github/workflows/code-quality.yml`) focuses on code style and quality:

1. Formatting check with Prettier
2. Linting with ESLint
3. Type checking with TypeScript

### Main CI Workflow

The main CI workflow (`.github/workflows/ci.yml`) performs comprehensive checks:

1. Linting with ESLint
2. Type checking with TypeScript
3. Running tests with Vitest
4. Checking test coverage thresholds
5. Security auditing with pnpm audit
6. Building the application

All checks must pass for pull requests to be merged.

## Documentation

This project follows a structured documentation approach with clearly defined locations for different types of documentation:

### Documentation Structure

- **README.md (Project Root)**: Serves as the primary entry point with project overview, setup instructions, and high-level documentation. This file provides the "big picture" and directs developers to more detailed documentation.

- **docs/CONTRIBUTING.md**: Contains comprehensive guidelines for setting up the development environment, following the development workflow, and contributing to the project. This is the canonical location for contributor-focused documentation.

- **docs/ Directory**: Houses specialized and detailed documentation:
  - **Development Philosophy**: See `docs/DEVELOPMENT_PHILOSOPHY.md` and language-specific appendices for core development principles
  - **Tool-Specific Guides**: See `docs/CONTRIBUTING-STORYBOOK.md` for Storybook contribution guidelines
  - **Automation Tools**: See `docs/GLANCE-COMMAND.md` for information about the automated directory documentation tool

### Key Documentation Files

- **Contributing Guide**: See [`docs/CONTRIBUTING.md`](./docs/CONTRIBUTING.md) for detailed setup instructions and development workflow
- **Development Philosophy**: See `docs/DEVELOPMENT_PHILOSOPHY.md` and language-specific appendices
- **Storybook Contribution**: See `docs/CONTRIBUTING-STORYBOOK.md` for guidelines on creating stories
- **Glance Documentation**: See `docs/GLANCE-COMMAND.md` for information about the automated directory documentation tool

### Developer Tooling Documentation

Developer tooling documentation (ESLint, Prettier, pre-commit hooks, etc.) is primarily located in [`docs/CONTRIBUTING.md`](./docs/CONTRIBUTING.md), with supporting information in this README.md under the [Code Quality](#code-quality) section.

## Storybook

This project uses Storybook for UI component development and documentation. Storybook provides an isolated environment to build, test, and document UI components outside the main application.

- `pnpm storybook` - Start the Storybook development server on port 6006
- `pnpm build-storybook` - Build a static version of Storybook for deployment

Storybook includes the following features:

- Component documentation and interactive examples
- Theme switching (light/dark mode)
- Accessibility testing via addon-a11y
- Responsive testing

For detailed guidelines on creating and maintaining Storybook stories, see [Storybook Contribution Guidelines](./docs/CONTRIBUTING-STORYBOOK.md).

## Commands

### Development Commands

- `pnpm dev` - Start the development server
- `pnpm build` - Build the site for production
- `pnpm start` - Start the production server

### Code Quality Commands

- `pnpm lint` - Lint the code
- `pnpm lint:fix` - Lint the code and fix auto-fixable issues
- `pnpm format` - Format the code
- `pnpm format:check` - Check if code is formatted
- `pnpm typecheck` - Type-check the code

### Testing Commands

- `pnpm test` - Run the tests
- `pnpm test:watch` - Run tests in watch mode
- `pnpm test:coverage` - Run tests with coverage report
- `pnpm test:ui` - Run tests with UI

### Storybook Commands

- `pnpm storybook` - Start the Storybook development server
- `pnpm build-storybook` - Build static Storybook
