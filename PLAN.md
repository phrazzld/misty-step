# Plan: Configure Core Development Tooling

## Chosen Approach (One-liner)

Implement a comprehensive, automated code quality tooling setup with ESLint, Prettier, TypeScript, and Husky pre-commit hooks to enforce code standards, aligned with the Development Philosophy.

## Architecture Blueprint

- **Modules / Components**

  - **ESLint Configuration**: Define and enforce TypeScript/React code standards
  - **Prettier Configuration**: Ensure consistent code formatting
  - **Pre-commit Hooks (Husky)**: Automate quality checks before commits
  - **lint-staged**: Run checks only on staged files for efficiency
  - **TypeScript Configuration**: Ensure strict type-checking

- **Configuration Files**

  - `.eslintrc.js` / `eslint.config.mjs` (flat config): ESLint rules and plugins
  - `.prettierrc.json`: Prettier formatting rules
  - `tsconfig.json`: TypeScript compiler options (strict mode)
  - `.husky/pre-commit`: Pre-commit hook script
  - `.lintstagedrc.json`: Configuration for lint-staged
  - `package.json`: Scripts and dependencies

- **Interactions & Data Flow**
  1. Developer writes code
  2. Developer stages changes with `git add`
  3. Developer attempts to commit with `git commit`
  4. Husky pre-commit hook triggers
  5. lint-staged runs on staged files:
     - Prettier formats code
     - ESLint checks for linting issues
     - TypeScript verifies type correctness
  6. If all checks pass, commit succeeds; otherwise it fails with error messages

## Detailed Build Steps

1. **Set up ESLint**

   - Install core dependencies: `pnpm add -D eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser`
   - Install React-specific plugins: `pnpm add -D eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y`
   - Install import plugin: `pnpm add -D eslint-plugin-import`
   - Create ESLint configuration file (flat config - `eslint.config.mjs`) with rules aligned to Development Philosophy:
     - Strict TypeScript checks
     - React best practices
     - Accessibility requirements
     - Import order and organization
     - Code quality rules

2. **Set up Prettier**

   - Install dependencies: `pnpm add -D prettier`
   - Create `.prettierrc.json` with configuration:
     - Semi-colons
     - Single quotes
     - Trailing commas
     - Tab width/indentation
     - Print width
   - Add `.prettierignore` to exclude certain files/directories

3. **Configure TypeScript**

   - Review and update `tsconfig.json`:
     - Enable `"strict": true` and related flags
     - Set appropriate module resolution strategy
     - Configure paths and output options
     - Enable additional type-checking options per TS appendix

4. **Configure Husky and lint-staged**

   - Install dependencies: `pnpm add -D husky lint-staged`
   - Initialize Husky: `pnpm dlx husky init`
   - Create pre-commit hook: `.husky/pre-commit`
   - Configure lint-staged in `.lintstagedrc.json`:
     ```json
     {
       "*.{js,jsx,ts,tsx}": ["prettier --write", "eslint --fix"],
       "*.{json,md,css}": ["prettier --write"]
     }
     ```

5. **Add npm Scripts**

   - Add to `package.json`:
     ```json
     "scripts": {
       "lint": "eslint --ext .js,.jsx,.ts,.tsx .",
       "lint:fix": "eslint --ext .js,.jsx,.ts,.tsx . --fix",
       "format": "prettier --write .",
       "format:check": "prettier --check .",
       "typecheck": "tsc --noEmit",
       "prepare": "husky"
     }
     ```

6. **Create CI Check**
   - Create GitHub Actions workflow file (`.github/workflows/code-quality.yml`) to run linting, formatting, and type-checking on PRs

## Testing Strategy

- **Lint Rules Testing**

  - Manually test ESLint rules against existing codebase
  - Verify all required rules are enforced
  - Ensure no false positives on valid code patterns

- **Pre-commit Hook Testing**

  - Make intentional linting errors and attempt commit
  - Verify hook prevents commit with appropriate errors
  - Fix errors and verify commit succeeds

- **CI Pipeline Testing**
  - Simulate PR with both valid and invalid code
  - Verify CI checks fail on invalid code
  - Verify CI checks pass on valid code

## Risk Matrix

| Risk                                         | Severity | Mitigation                                                                                 |
| -------------------------------------------- | -------- | ------------------------------------------------------------------------------------------ |
| Too strict rules cause developer friction    | Medium   | Start with essential rules, gradually increase strictness; document rule rationales        |
| False positives in linting                   | Medium   | Carefully test rules on real codebase before enforcement; adjust rules if needed           |
| Performance issues with large codebases      | Low      | Use lint-staged to check only changed files in pre-commit; optimize CI for parallel checks |
| Inconsistency with existing codebase         | Medium   | Run auto-fix on full codebase as initialization step; review changes before committing     |
| Pre-commit hooks bypassed with `--no-verify` | High     | Add CI checks that run on all PRs/pushes; document the importance of hook adherence        |

## Implementation Roadmap

1. **Phase 1: Basic Setup (Day 1)**

   - Install core dependencies
   - Set up ESLint, Prettier, TypeScript configs with essential rules
   - Implement basic pre-commit hooks

2. **Phase 2: Rule Refinement (Day 1-2)**

   - Adjust rules based on project needs
   - Test against existing codebase
   - Document rule rationales

3. **Phase 3: CI Integration (Day 2)**
   - Set up GitHub Actions workflow
   - Test CI pipeline
   - Ensure consistent results between local and CI checks

## Decision Log

- **ESLint**: Using Flat Config (`eslint.config.mjs`) as it's the current recommended approach and provides better extensibility.
- **Husky**: Using latest version with modern Git hooks approach.
- **TypeScript**: Enforcing strictest settings according to TS appendix.
- **Pre-commit Structure**: Using lint-staged for efficiency rather than running on entire codebase.

## Environmental Considerations

- **Node.js Version**: Ensuring compatibility with project's Node.js version
- **Editor Integration**: Providing guidance for VS Code settings to support ESLint and Prettier

## Documentation

- **TSDoc Comments**: Add appropriate comments to configuration files explaining purpose
- **README Updates**: Add section on code quality tools and standards, explaining:
  - How to run checks manually
  - How pre-commit hooks work
  - How to properly commit changes
  - How to update linting rules
