# Marketing Site

This is the marketing website for Misty Step, a technology consulting firm.

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

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

## Commands

- `pnpm dev` - Start the development server
- `pnpm build` - Build the site for production
- `pnpm start` - Start the production server
- `pnpm lint` - Lint the code
- `pnpm format` - Format the code
- `pnpm typecheck` - Type-check the code
- `pnpm test` - Run the tests
