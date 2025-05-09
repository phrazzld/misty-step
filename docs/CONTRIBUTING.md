# Contributing Guide

This document provides comprehensive instructions for setting up and working with the development tooling in this project. It covers the entire development workflow from initial setup to daily operations and troubleshooting.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Initial Setup](#initial-setup)
3. [Development Workflow](#development-workflow)
4. [Git Workflow and Pre-commit Hooks](#git-workflow-and-pre-commit-hooks)
5. [Code Quality Philosophy](#code-quality-philosophy)
6. [Editor Integration](#editor-integration)
7. [Troubleshooting](#troubleshooting)
8. [Additional Resources](#additional-resources)

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** - Version 22.15.0 (required)

  - [Download from nodejs.org](https://nodejs.org/)
  - Or use a version manager like [nvm](https://github.com/nvm-sh/nvm) or [fnm](https://github.com/Schniz/fnm)
  - If using nvm/fnm, the project contains an `.nvmrc` file for automatic version switching
  - Run `nvm use` or `fnm use` in the project directory to switch to the correct version
  - To check your version: `node --version`

- **pnpm** - Version 10.10.0 (required)

  - Install globally: `npm install -g pnpm@latest`
  - Or use [Corepack](https://nodejs.org/api/corepack.html): `corepack enable && corepack prepare pnpm@latest --activate`
  - To check your version: `pnpm --version`

- **Git** - Latest version recommended
  - [Download from git-scm.com](https://git-scm.com/downloads)

### Version Requirements Enforcement

This project uses the `engines` field in `package.json` to define and enforce tool version requirements:

```json
"engines": {
  "node": "22.15.0",
  "pnpm": "10.10.0"
}
```

These requirements ensure all developers work with compatible tooling, preventing inconsistencies and "works on my machine" issues. When you run `pnpm install`, the package manager will check your Node.js and pnpm versions against these requirements:

- If using an incompatible version, you'll receive a warning or error
- By default, pnpm will warn but continue with installation
- To strictly enforce these requirements, you can set `engine-strict=true` in `.npmrc`

**Note**: npm and yarn are not supported for this project. If you attempt to use them, you may encounter compatibility issues as the project is specifically configured for pnpm.

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

#### Required Elements

- **Type**: Describes the kind of change (see types below)
- **Description**: A short, imperative tense description of the change
  - Begin with a lowercase letter
  - Do not end with a period
  - Keep it under 100 characters
  - Use imperative, present tense (e.g., "add" not "added" or "adds")

#### Optional Elements

- **Scope**: A noun describing the section of the codebase affected

  - Must be one of the predefined scopes (see below)
  - Should be lowercase
  - Example: `feat(ui): add button component`

- **Body**: Provides detailed explanatory text

  - Separated from subject by a blank line
  - Can consist of multiple paragraphs separated by blank lines
  - Use to explain the motivation for the change
  - Describe differences from previous behavior
  - Use imperative, present tense

- **Footer**: Metadata about the commit
  - Breaking changes MUST be indicated with `BREAKING CHANGE:` prefix
  - Reference issues that this commit closes with `Closes #123, #456`

#### Allowed Types

| Type       | Description                                                                        |
| ---------- | ---------------------------------------------------------------------------------- |
| `feat`     | A new feature                                                                      |
| `fix`      | A bug fix                                                                          |
| `docs`     | Documentation only changes                                                         |
| `style`    | Changes that do not affect the meaning of the code (white-space, formatting, etc.) |
| `refactor` | A code change that neither fixes a bug nor adds a feature                          |
| `perf`     | A code change that improves performance                                            |
| `test`     | Adding missing tests or correcting existing tests                                  |
| `build`    | Changes to the build system or external dependencies                               |
| `ci`       | Changes to CI configuration files and scripts                                      |
| `chore`    | Other changes that don't modify src or test files                                  |
| `revert`   | Reverts a previous commit                                                          |

#### Allowed Scopes

Scopes are used to provide additional context about the part of the codebase being modified:

- `ui`: UI components and styling
- `components`: React components
- `docs`: Documentation
- `lib`: Library code and utilities
- `config`: Configuration files
- `test`: Test-related changes
- `ci`: CI-related changes
- `deps`: Dependency updates
- `app`: Application pages and routing

#### Examples of Valid Commit Messages

```
feat(ui): add dark mode toggle button

Implement a new button component that allows users to switch between light and dark themes.
The button stores the preference in localStorage for persistence.

Closes #123
```

```
fix(components): correct header link paths

The navigation links in the header were pointing to incorrect routes, causing 404 errors.
```

```
docs: update README with new setup instructions

Update the getting started guide with clearer instructions for the updated build process.
```

```
chore(deps): update dependencies

Update all non-major dependencies to their latest versions.
```

```
refactor(lib): simplify contact form validation logic

Refactor form validation to use the new schema-based approach, reducing code complexity.
```

```
BREAKING CHANGE: rename user authentication props

Change the naming convention for auth-related props to improve clarity.
Anyone using these components will need to update their implementation.

Before:
<AuthForm userToken={token} />

After:
<AuthForm authToken={token} />
```

#### Commit Linting

Our repository uses `commitlint` to automatically enforce these standards. Commits that do not match the format will be rejected. This ensures a clean, consistent commit history that can be used to generate changelogs and determine version bumps automatically.

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

### Scope of Linting and Formatting for Non-Source Code Files

This project applies different levels of code quality checks depending on the file type:

#### Source Code Files (JavaScript/TypeScript)

- **JavaScript/TypeScript files** (`.js`, `.jsx`, `.ts`, `.tsx`, `.mjs`):
  - Formatted with Prettier
  - Linted with ESLint with auto-fixes applied
  - Type-checked with TypeScript (for `.ts` and `.tsx` files)

#### Non-Source Code Files

- **JSON files** (`.json`):

  - Formatted with Prettier
  - No additional linting beyond formatting

- **Styling files** (`.css`):

  - Formatted with Prettier
  - No additional linting beyond formatting

- **HTML files** (`.html`):

  - Formatted with Prettier
  - No additional linting beyond formatting

- **YAML files** (`.yml`, `.yaml`):

  - Formatted with Prettier
  - No additional linting beyond formatting

- **Markdown files** (`.md`):

  - Formatted with Prettier
  - Special handling to exclude symlinks (which are common in the documentation)

- **Storybook configuration files** (`.storybook/**/*.{js,ts,tsx,css}`):

  - Formatted with Prettier
  - JavaScript/TypeScript files also linted with ESLint

- **Husky scripts** (`.husky/*`):
  - Ensured to end with a newline
  - No formatting or linting beyond this

This configuration ensures all files in the repository maintain consistent formatting while applying appropriate linting rules to source code files. The pre-commit hooks apply these checks only to staged files, making the commit process efficient.

### Manual Hook Bypass (Use Sparingly)

In rare circumstances, you might need to bypass hooks temporarily:

```bash
git commit -m "your message" --no-verify
```

**Warning**: This should only be used in exceptional situations, as it bypasses quality controls.

## Code Quality Philosophy

This project enforces strict linting and formatting rules to ensure code quality, consistency, and maintainability. Understanding the rationale behind these strict rules helps developers appreciate their value and work effectively within the established guidelines.

### Why We Enforce Strict Rules

#### 1. Code Consistency

Consistent code is easier to read, understand, and maintain. When all code follows the same patterns and conventions:

- **Reduced Cognitive Load**: Developers can focus on solving problems rather than deciphering different coding styles
- **Faster Onboarding**: New team members can become productive more quickly
- **Improved Collaboration**: Team members can work on each other's code without friction

#### 2. Error Prevention

Many linting rules exist to catch potential bugs and issues before they make it into production:

- **Type Safety**: TypeScript's strict mode prevents many common runtime errors
- **Common Pitfalls**: Rules like no-unused-vars, no-implicit-any, and no-floating-promises prevent subtle bugs
- **Security Issues**: Certain patterns that could lead to security vulnerabilities are caught early

#### 3. Better Code Reviews

When formatting and basic code quality are handled automatically:

- **Focus on Logic**: Code reviews can focus on logic, architecture, and business requirements
- **Faster Reviews**: Reviewers don't need to comment on formatting or style issues
- **Higher Quality Feedback**: More attention can be given to important aspects of the code

#### 4. Reduced Technical Debt

Enforcing high standards from the beginning prevents the accumulation of technical debt:

- **Consistent Quality**: Even under deadline pressure, quality standards are maintained
- **Refactoring Confidence**: Automated tools help ensure refactors don't introduce new issues
- **Sustainable Development**: The codebase remains maintainable as it grows

### Key Principles in Our Ruleset

1. **Strong Typing**: We prohibit the use of `any` type in TypeScript and require explicit return types on functions
2. **Immutability**: We enforce immutable programming patterns where possible
3. **Component Best Practices**: Rules ensure React components follow established patterns
4. **Accessibility**: We enforce accessibility standards in our UI components
5. **Performance**: Rules help catch common performance issues in React applications

### Auto-Fixing and Working with the Rules

Most of our linting and formatting rules can be automatically fixed:

- **IDE Integration**: Configure your editor for real-time feedback and auto-fixing (see [Editor Integration](#editor-integration))
- **Command Line**: Use `pnpm lint:fix` and `pnpm format` to automatically fix many issues
- **Pre-commit Hooks**: Our pre-commit hooks automatically fix many issues in staged files

### When Rules Conflict with Pragmatism

Occasionally, strict rules might seem to get in the way of practical solutions. In these cases:

1. **First**, try to understand the rule's purpose and if there's a compliant alternative approach
2. **Second**, consider refactoring to make your code work within the rules
3. **Only as a last resort**, use approved escape hatches:
   - For ESLint: `// eslint-disable-next-line rule-name` (with justification comment)
   - For TypeScript: Judicious use of type assertions (with justification comment)

Remember that exceptions should be rare and well-justified. The long-term benefits of consistent, high-quality code outweigh the short-term convenience of bypassing the rules.

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
   nvm install 22.15.0
   nvm use

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
