# Marketing Site

[![CI](https://github.com/phrazzld/misty-step/actions/workflows/ci.yml/badge.svg)](https://github.com/phrazzld/misty-step/actions/workflows/ci.yml)
[![Test Coverage](https://img.shields.io/badge/coverage-92%25-brightgreen)](https://github.com/phrazzld/misty-step)

This is the marketing website for Misty Step, a technology consulting firm specializing in custom software development and technical consulting services.

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

This project enforces code quality through:

- TypeScript with strict settings
- ESLint for linting
- Prettier for code formatting
- Husky for pre-commit hooks
- lint-staged for running linters on staged files
- GitHub Actions CI for automated quality checks

## Continuous Integration

A GitHub Actions workflow runs automatically on all pull requests and pushes to main branch. The CI pipeline performs the following checks:

1. Linting with ESLint
2. Type checking with TypeScript
3. Running tests with Vitest
4. Checking test coverage thresholds
5. Security auditing with pnpm audit
6. Building the application

All checks must pass for pull requests to be merged. See the workflow configuration in `.github/workflows/ci.yml`.

## Commands

- `pnpm dev` - Start the development server
- `pnpm build` - Build the site for production
- `pnpm start` - Start the production server
- `pnpm lint` - Lint the code
- `pnpm format` - Format the code
- `pnpm typecheck` - Type-check the code
- `pnpm test` - Run the tests
