# Todo

## Core Dependency Installation

- [x] **T001 · Chore · P0: install ESLint core and TypeScript plugins**
  - **Context:** PLAN.md > Detailed Build Steps > 1. Set up ESLint
  - **Action:**
    1. Run `pnpm add -D eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser`.
  - **Done‑when:**
    1. Packages are listed in `devDependencies` in `package.json`.
    2. `pnpm-lock.yaml` is updated.
  - **Depends‑on:** none
- [x] **T002 · Chore · P0: install ESLint React/JSX/Import plugins**
  - **Context:** PLAN.md > Detailed Build Steps > 1. Set up ESLint
  - **Action:**
    1. Run `pnpm add -D eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y eslint-plugin-import`.
  - **Done‑when:**
    1. Packages are listed in `devDependencies` in `package.json`.
    2. `pnpm-lock.yaml` is updated.
  - **Depends‑on:** [T001]
- [x] **T003 · Chore · P0: install Prettier and ESLint integration plugins**
  - **Context:** PLAN.md > Detailed Build Steps > 2. Set up Prettier
  - **Action:**
    1. Run `pnpm add -D prettier eslint-config-prettier eslint-plugin-prettier`.
  - **Done‑when:**
    1. Packages are listed in `devDependencies` in `package.json`.
    2. `pnpm-lock.yaml` is updated.
  - **Depends‑on:** [T001]
- [x] **T004 · Chore · P0: install Husky and lint-staged**
  - **Context:** PLAN.md > Detailed Build Steps > 4. Configure Husky and lint-staged
  - **Action:**
    1. Run `pnpm add -D husky lint-staged`.
  - **Done‑when:**
    1. Packages are listed in `devDependencies` in `package.json`.
    2. `pnpm-lock.yaml` is updated.
  - **Depends‑on:** none

## Tool Configuration

- [x] **T005 · Chore · P1: configure ESLint flat config with strict rules**
  - **Context:** PLAN.md > Detailed Build Steps > 1. Set up ESLint; Development Philosophy Appendices
  - **Action:**
    1. Create `eslint.config.mjs` using flat config format.
    2. Configure strict TypeScript rules (`@typescript-eslint/recommended`, type-aware rules), React/Hooks/JSX-A11y rules, Import rules, and Prettier integration (`eslint-config-prettier`).
    3. Ensure config references `tsconfig.json` for type-aware linting.
  - **Done‑when:**
    1. `eslint.config.mjs` exists and is valid.
    2. Running `pnpm eslint .` uses the configured rules without errors.
  - **Verification:**
    1. Introduce distinct TS, React, and import errors; confirm ESLint reports them.
  - **Depends‑on:** [T001, T002, T003]
- [x] **T006 · Chore · P1: configure Prettier formatting rules**
  - **Context:** PLAN.md > Detailed Build Steps > 2. Set up Prettier
  - **Action:**
    1. Create `.prettierrc.json` with standard formatting rules (semi, singleQuote, trailingComma, etc.).
    2. Create `.prettierignore` listing standard exclusions (`node_modules`, `dist`, etc.).
  - **Done‑when:**
    1. `.prettierrc.json` and `.prettierignore` exist with correct settings.
    2. Running `pnpm prettier --check .` validates files according to rules and ignores specified patterns.
  - **Depends‑on:** [T003]
- [x] **T007 · Refactor · P1: configure TypeScript for strict type-checking**
  - **Context:** PLAN.md > Detailed Build Steps > 3. Configure TypeScript; Development Philosophy Appendix: TypeScript
  - **Action:**
    1. Update `tsconfig.json` to set `"strict": true` and enable related strict flags.
    2. Configure appropriate `module`, `moduleResolution`, `target`, and other compiler options as per appendix.
  - **Done‑when:**
    1. `tsconfig.json` reflects strict settings and required configurations.
    2. Running `pnpm tsc --noEmit` performs strict type checks.
  - **Depends‑on:** none
- [x] **T008 · Chore · P1: initialize Husky and configure pre-commit hook**
  - **Context:** PLAN.md > Detailed Build Steps > 4. Configure Husky and lint-staged
  - **Action:**
    1. Run `pnpm dlx husky init` to initialize Husky.
    2. Modify the generated `.husky/pre-commit` script to execute `npx lint-staged`.
  - **Done‑when:**
    1. `.husky/pre-commit` script exists and invokes `lint-staged`.
    2. `prepare` script in `package.json` is correctly set by Husky.
  - **Depends‑on:** [T004]
- [ ] **T009 · Chore · P1: configure lint-staged for staged files**
  - **Context:** PLAN.md > Detailed Build Steps > 4. Configure Husky and lint-staged
  - **Action:**
    1. Create `.lintstagedrc.json`.
    2. Configure it to run `prettier --write` and `eslint --fix` on staged `*.{js,jsx,ts,tsx}` files.
    3. Configure it to run `prettier --write` on staged `*.{json,md,css}` files.
  - **Done‑when:**
    1. `.lintstagedrc.json` exists with specified file patterns and commands.
  - **Verification:**
    1. Stage a file with formatting/lint errors (`git add <file>`).
    2. Attempt commit (`git commit -m "test"`), verify `lint-staged` runs, fixes issues, and commit succeeds (or fails if errors are unfixable).
  - **Depends‑on:** [T004, T005, T006]

## Build Scripts & CI

- [ ] **T010 · Chore · P1: add code quality npm scripts**
  - **Context:** PLAN.md > Detailed Build Steps > 5. Add npm Scripts
  - **Action:**
    1. Add `lint`, `lint:fix`, `format`, `format:check`, `typecheck` scripts to `package.json`.
    2. Ensure the `prepare` script (added by T008) correctly triggers Husky setup.
  - **Done‑when:**
    1. All specified scripts exist in `package.json` and execute the correct tools without error.
  - **Verification:**
    1. Run `pnpm lint`, `pnpm format:check`, `pnpm typecheck` individually to confirm they work.
  - **Depends‑on:** [T005, T006, T007, T008, T009]
- [ ] **T011 · Feature · P1: create GitHub Actions CI workflow for code quality**
  - **Context:** PLAN.md > Detailed Build Steps > 6. Create CI Check
  - **Action:**
    1. Create `.github/workflows/code-quality.yml`.
    2. Configure the workflow to trigger on pull requests.
    3. Include steps to checkout code, set up Node.js/pnpm, install dependencies, and run `format:check`, `lint`, and `typecheck` scripts.
  - **Done‑when:**
    1. `code-quality.yml` file exists and is syntactically valid.
    2. Workflow triggers on pull requests and executes the defined checks.
  - **Depends‑on:** [T010]

## Testing & Validation

- [ ] **T012 · Test · P1: test pre-commit hook end-to-end**
  - **Context:** PLAN.md > Testing Strategy > Pre-commit Hook Testing; Risk Matrix
  - **Action:**
    1. Stage files with intentional (auto-fixable) formatting and linting errors. Attempt commit, verify fixes are applied and commit succeeds.
    2. Stage files with intentional (non-auto-fixable) linting errors. Attempt commit, verify commit fails with error messages.
    3. Stage clean files. Attempt commit, verify commit succeeds quickly.
  - **Done‑when:**
    1. Pre-commit hook correctly formats, lints, and blocks/allows commits based on staged file content.
  - **Verification:**
    1. Observe git commit output and resulting commit status for each test case.
  - **Depends‑on:** [T008, T009]
- [ ] **T013 · Test · P1: test CI pipeline behavior**
  - **Context:** PLAN.md > Testing Strategy > CI Pipeline Testing; Risk Matrix
  - **Action:**
    1. Create a test PR with code containing formatting/linting/type errors. Verify CI workflow runs and fails, reporting the errors.
    2. Create a test PR with clean code. Verify CI workflow runs and passes.
  - **Done‑when:**
    1. CI workflow accurately reports pass/fail status based on code quality checks defined in T011.
  - **Verification:**
    1. Check GitHub Actions logs and PR status checks for the test PRs.
  - **Depends‑on:** [T011]

## Codebase Alignment & Documentation

- [ ] **T014 · Refactor · P2: apply formatting and lint fixes to entire codebase**
  - **Context:** PLAN.md > Risk Matrix > Inconsistency with existing codebase
  - **Action:**
    1. Run `pnpm format` to apply Prettier formatting across all applicable files.
    2. Run `pnpm lint:fix` to apply auto-fixable ESLint rules across all applicable files.
    3. Review changes and commit the baseline code quality fixes.
  - **Done‑when:**
    1. `pnpm format:check` and `pnpm lint` report no errors on the main branch (ignoring non-auto-fixable lint errors for now).
    2. A commit containing the initial formatting/linting fixes is created.
  - **Depends‑on:** [T010]
- [ ] **T015 · Documentation · P2: document code quality tools in README**
  - **Context:** PLAN.md > Documentation > README Updates; Environmental Considerations
  - **Action:**
    1. Add a "Code Quality" section to `README.md`.
    2. Explain the purpose of ESLint, Prettier, TypeScript checks, and the pre-commit hook workflow.
    3. Document the `pnpm` scripts for manual checks (`lint`, `format:check`, `typecheck`).
    4. Add guidance on recommended editor integration (e.g., VS Code extensions).
  - **Done‑when:**
    1. `README.md` contains a clear, comprehensive section on using and understanding the code quality tooling.
  - **Depends‑on:** [T010, T012]
- [ ] **T016 · Documentation · P3: add explanatory comments to config files**
  - **Context:** PLAN.md > Documentation > TSDoc Comments
  - **Action:**
    1. Add comments (JSDoc/TSDoc style where applicable) to `eslint.config.mjs`, `.prettierrc.json`, and `tsconfig.json` explaining key configurations or non-obvious choices.
  - **Done‑when:**
    1. Major sections and complex settings in configuration files have explanatory comments.
  - **Depends‑on:** [T005, T006, T007]

---

### Clarifications & Assumptions

- [ ] **Issue:** Confirm the target Node.js version for the project environment.
  - **Context:** PLAN.md > Environmental Considerations > Node.js Version
  - **Blocking?:** no
- [ ] **Issue:** Determine if specific editor settings (`.vscode/settings.json`) should be committed or only documented.
  - **Context:** PLAN.md > Environmental Considerations > Editor Integration
  - **Blocking?:** no
- [ ] **Issue:** Verify if the project is a monorepo or single package, as this impacts `tsconfig.json` and potentially ESLint/Prettier configuration scope.
  - **Context:** PLAN.md > Architecture Blueprint (assumed); Detailed Build Steps
  - **Blocking?:** no (Assuming single package for now)
- [ ] **Issue:** Confirm `pnpm` is the standard package manager for this project.
  - **Context:** PLAN.md > Detailed Build Steps (uses pnpm); Development Philosophy Appendix > Dependency Management
  - **Blocking?:** no (Proceeding with pnpm based on plan usage)
