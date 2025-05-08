# Contributing Guide

This document provides comprehensive instructions for setting up and working with the development tooling in this project. It covers the entire development workflow from initial setup to daily operations and troubleshooting.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Initial Setup](#initial-setup)
3. [Development Workflow](#development-workflow)
4. [Git Workflow and Pre-commit Hooks](#git-workflow-and-pre-commit-hooks)
5. [Editor Integration](#editor-integration)
6. [Troubleshooting](#troubleshooting)
7. [Additional Resources](#additional-resources)

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** - Version 20 or higher

  - [Download from nodejs.org](https://nodejs.org/)
  - Or use a version manager like [nvm](https://github.com/nvm-sh/nvm) or [fnm](https://github.com/Schniz/fnm)

- **pnpm** - Version 10 or higher

  - Install globally: `npm install -g pnpm@latest`
  - Or use [Corepack](https://nodejs.org/api/corepack.html): `corepack enable && corepack prepare pnpm@latest --activate`

- **Git** - Latest version recommended
  - [Download from git-scm.com](https://git-scm.com/downloads)

## Initial Setup

Follow these steps to set up your development environment:

### 1. Clone the Repository

```bash
git clone https://github.com/phrazzld/misty-step.git
cd marketing-site
```

### 2. Install Dependencies

```bash
pnpm install
```

This command will:

- Install all project dependencies
- Automatically set up Husky git hooks (via the `prepare` script in package.json)

### 3. Verify Setup

Run the following commands to verify your setup:

```bash
# Check ESLint
pnpm lint

# Check TypeScript
pnpm typecheck

# Run tests
pnpm test

# Start the development server
pnpm dev
```

If all commands run without errors, your setup is complete.

## Development Workflow

### Daily Development Process

1. **Pull latest changes**

   ```bash
   git pull origin main
   ```

2. **Install dependencies if package.json has changed**

   ```bash
   pnpm install
   ```

3. **Start the development server**

   ```bash
   pnpm dev
   ```

4. **Make your changes** in your preferred editor

5. **Verify your changes**

   ```bash
   # Run tests
   pnpm test

   # Check for linting issues
   pnpm lint

   # Check TypeScript
   pnpm typecheck
   ```

### Code Quality Commands

The following commands are available for maintaining code quality:

- `pnpm lint` - Run ESLint to check for code quality issues
- `pnpm lint:fix` - Run ESLint with automatic fixing of issues where possible
- `pnpm format` - Run Prettier to format all files
- `pnpm format:check` - Check if code is formatted correctly
- `pnpm typecheck` - Run TypeScript compiler in type-check mode (no emitting)

### Testing Commands

- `pnpm test` - Run all tests
- `pnpm test:watch` - Run tests in watch mode (useful during development)
- `pnpm test:coverage` - Run tests with coverage report
- `pnpm test:ui` - Run tests with a visual UI

## Git Workflow and Pre-commit Hooks

This project uses Husky for Git hooks and lint-staged to optimize the pre-commit process.

### Commit Message Format

All commit messages must follow the [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

Example valid commit messages:

- `feat: add dark mode toggle`
- `fix(navigation): correct header link paths`
- `docs: update README with new setup instructions`
- `chore: update dependencies`

### Pre-commit Workflow

When you run `git commit`, the following process occurs automatically:

1. **Pre-commit hook** runs `lint-staged`
2. **lint-staged** processes only your staged files:
   - Formats files with Prettier
   - Lints JavaScript/TypeScript files with ESLint and applies auto-fixes
   - Ensures Husky scripts end with a newline
3. If any unfixable issues are found, the commit is aborted with error messages
4. If all checks pass, the commit message validation runs (commit-msg hook)
5. **commit-msg hook** runs `commitlint` to verify your commit message follows Conventional Commits format
6. If the message is valid, the commit completes successfully

### Pre-commit Configuration Files

- `.husky/pre-commit` - Script that runs lint-staged
- `.husky/commit-msg` - Script that validates commit messages with commitlint
- `.lintstagedrc.json` - Configuration for lint-staged (what commands run on which files)
- `commitlint.config.js` - Configuration for commitlint (commit message validation)

### Manual Hook Bypass (Use Sparingly)

In rare circumstances, you might need to bypass hooks temporarily:

```bash
git commit -m "your message" --no-verify
```

**Warning**: This should only be used in exceptional situations, as it bypasses quality controls.

## Editor Integration

### VS Code (Recommended)

Install the following extensions for the best experience:

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [TypeScript Error Translator](https://marketplace.visualstudio.com/items?itemName=mattpocock.ts-error-translator)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

**Recommended VS Code Settings** (`.vscode/settings.json`):

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

### JetBrains IDEs (WebStorm, IntelliJ IDEA)

1. **ESLint Integration**

   - Go to Settings → Languages & Frameworks → JavaScript → Code Quality Tools → ESLint
   - Enable ESLint and set the ESLint package to your project's ESLint

2. **Prettier Integration**
   - Go to Settings → Languages & Frameworks → JavaScript → Prettier
   - Enable Prettier and set the Prettier package to your project's Prettier
   - Enable "Run on save" option

### Other Editors

- **Vim/Neovim**: Use plugins like [coc.nvim](https://github.com/neoclide/coc.nvim) with ESLint and Prettier extensions
- **Sublime Text**: Install [LSP](https://packagecontrol.io/packages/LSP) and [LSP-eslint](https://packagecontrol.io/packages/LSP-eslint) packages
- **Atom**: Install the [atom-typescript](https://atom.io/packages/atom-typescript), [linter-eslint](https://atom.io/packages/linter-eslint), and [prettier-atom](https://atom.io/packages/prettier-atom) packages

## Troubleshooting

### Common Issues and Solutions

#### Husky Hooks Not Running

If Git hooks aren't running:

1. Ensure Husky is properly installed:

   ```bash
   pnpm prepare
   ```

2. Check hook permissions:

   ```bash
   chmod +x .husky/pre-commit
   chmod +x .husky/commit-msg
   ```

3. Verify Git is using the hooks:
   ```bash
   git config core.hooksPath
   ```
   It should output `.husky` or be empty (which means it's using the default `.git/hooks` directory)

#### ESLint or Prettier Not Working

1. Verify the tools are installed:

   ```bash
   pnpm list eslint prettier
   ```

2. Check configuration:

   ```bash
   # ESLint
   npx eslint --print-config .eslintrc.json > eslint-config.json

   # Prettier
   npx prettier --config-precedence file-override --find-config-path .
   ```

3. Clear caches:

   ```bash
   # ESLint
   rm -rf node_modules/.cache/eslint-loader

   # Prettier
   rm -rf node_modules/.cache/prettier
   ```

#### Commit Rejected Due to ESLint Errors

1. Fix specific errors:

   ```bash
   pnpm lint:fix
   ```

2. For unfixable errors, manually resolve them following ESLint error messages

#### Invalid Commit Message Format

1. Review the [Conventional Commits](https://www.conventionalcommits.org/) format
2. Ensure your message follows the pattern: `type(scope): description`
3. Common types include: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

#### pnpm or Node.js Version Issues

1. Check your installed versions:

   ```bash
   node --version
   pnpm --version
   ```

2. Update to required versions:

   ```bash
   # Node.js (using nvm)
   nvm install 20
   nvm use 20

   # pnpm
   npm install -g pnpm@latest
   ```

## Additional Resources

- [ESLint Documentation](https://eslint.org/docs/user-guide/)
- [Prettier Documentation](https://prettier.io/docs/en/index.html)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Conventional Commits Specification](https://www.conventionalcommits.org/)
- [Husky Documentation](https://typicode.github.io/husky/)
- [lint-staged Documentation](https://github.com/okonet/lint-staged)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://reactjs.org/docs/getting-started.html)

---

For project-specific documentation, refer to the [README.md](../README.md) file.
