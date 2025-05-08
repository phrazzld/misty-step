# TODO: Configure Core Development Tooling

This document outlines the specific tasks required to implement the core development tooling configuration as described in the PLAN.md document.

## ESLint Configuration

- [x] **T001 · Chore · P1: Review and enhance ESLint configuration against project standards**

  - **Context:** Verify and align ESLint configuration with development philosophy
  - **Action:**
    1. Audit `eslint.config.mjs` against `DEVELOPMENT_PHILOSOPHY.md` and relevant TypeScript/Frontend appendices
    2. Update or add ESLint rules and plugins to fully enforce required standards (strict TypeScript, accessibility, component best practices)
  - **Done‑when:**
    1. ESLint configuration aligns with all documented project standards
    2. Configuration changes are committed with clear justifications
  - **Verification:**
    1. Manually review the `eslint.config.mjs` diff
    2. Run `eslint --print-config .` to inspect the final effective configuration
  - **Depends‑on:** none

- [x] **T002 · Test · P1: Test ESLint on codebase to identify violations**

  - **Context:** Verify current ESLint compliance
  - **Action:**
    1. Execute `eslint .` (or equivalent command) across the entire codebase
  - **Done‑when:**
    1. ESLint scan completes
    2. A comprehensive list of all current linting violations is available (if any)
  - **Verification:**
    1. Check the console output of the ESLint command for error reports
  - **Depends‑on:** [T001]

- [x] **T003 · Refactor · P0: Fix all ESLint violations in the codebase**
  - **Context:** Ensure codebase adheres to established standards
  - **Action:**
    1. Run ESLint with auto-fixing enabled (e.g., `eslint . --fix`)
    2. Manually address any remaining violations that cannot be auto-fixed
  - **Done‑when:**
    1. Running `eslint .` (or equivalent) reports zero errors and zero warnings (or as per agreed project baseline)
    2. All fixes are committed
  - **Verification:**
    1. Execute `eslint .` and confirm clean output
  - **Depends‑on:** [T002]

## Prettier Configuration

- [x] **T004 · Chore · P1: Review and enhance Prettier configuration against project standards**

  - **Context:** Verify and align Prettier configuration with development philosophy
  - **Action:**
    1. Audit `.prettierrc.js` (or equivalent) against formatting rules in `DEVELOPMENT_PHILOSOPHY.md`
    2. Adjust Prettier settings to match all documented project formatting standards
  - **Done‑when:**
    1. Prettier configuration aligns with all documented project standards
    2. Configuration changes are committed
  - **Verification:**
    1. Manually review the `.prettierrc.js` diff
  - **Depends‑on:** none

- [x] **T005 · Test · P1: Test Prettier format check across all relevant file types**

  - **Context:** Verify current Prettier compliance
  - **Action:**
    1. Execute `prettier --check .` (or equivalent command for configured file types) across the codebase
  - **Done‑when:**
    1. Prettier format check command completes
    2. A list of files not conforming to Prettier rules is available (if any)
  - **Verification:**
    1. Check the console output of the Prettier command for non-conformant file reports
  - **Depends‑on:** [T004]

- [x] **T006 · Chore · P1: Format entire codebase using approved Prettier configuration**
  - **Context:** Ensure codebase has consistent formatting
  - **Action:**
    1. Execute `prettier --write .` (or equivalent command for configured file types) across the entire codebase
  - **Done‑when:**
    1. All relevant files in the codebase are formatted according to the approved Prettier rules
    2. Running `prettier --check .` subsequently reports no issues
    3. All formatting changes are committed
  - **Verification:**
    1. Execute `prettier --check .` and confirm clean output
  - **Depends‑on:** [T005]

## Pre-commit Hooks (Husky & lint-staged)

- [x] **T007 · Feature · P1: Configure Husky pre-commit hook to run lint-staged**

  - **Context:** Automate quality checks before commits
  - **Action:**
    1. Install Husky and lint-staged if not already present
    2. Configure or update the `.husky/pre-commit` hook script to execute `lint-staged`
  - **Done‑when:**
    1. The `pre-commit` hook is configured and triggers `lint-staged` on `git commit` for staged files
  - **Verification:**
    1. Stage a file with a known minor lint/format issue
    2. Attempt to commit and verify `lint-staged` runs (and potentially fixes/blocks based on its config)
  - **Depends‑on:** none

- [x] **T008 · Feature · P1: Configure Husky commit-msg hook to enforce conventional commits**

  - **Context:** Ensure commit messages follow standards
  - **Action:**
    1. Install `commitlint` and a conventional commit config (e.g., `@commitlint/config-conventional`)
    2. Configure or update the `.husky/commit-msg` hook script to execute `commitlint` on the commit message
  - **Done‑when:**
    1. The `commit-msg` hook is configured and validates commit messages against Conventional Commits spec
    2. Commits with invalid messages are rejected; commits with valid messages are accepted
  - **Verification:**
    1. Attempt to commit with an invalid message format; verify rejection
    2. Attempt to commit with a valid message format; verify acceptance
  - **Depends‑on:** none

- [x] **T009 · Feature · P1: Configure lint-staged for ESLint and Prettier on relevant file types**
  - **Context:** Define which checks to run on staged files
  - **Action:**
    1. Update `.lintstagedrc.json` (or equivalent lint-staged configuration)
    2. Define tasks to run ESLint (with `--fix`) and Prettier (with `--write`) on staged files (e.g., `.ts`, `.tsx`, `.js`, `.jsx`, `.json`, `.md`)
  - **Done‑when:**
    1. `lint-staged` configuration correctly targets relevant file types
    2. ESLint and Prettier are executed on staged files as per configuration
  - **Verification:**
    1. Stage a `.ts` file with a fixable ESLint/Prettier issue
    2. Commit and verify `lint-staged` applies the fixes and the commit succeeds
  - **Depends‑on:** [T001, T004, T007]

## Tool Integration & Workflow

- [x] **T010 · Chore · P1: Ensure ESLint and Prettier integration is conflict-free**

  - **Context:** Prevent conflicts between linting and formatting
  - **Action:**
    1. Install and configure `eslint-config-prettier` (or similar) in the ESLint configuration
    2. Verify that no ESLint rules conflict with Prettier's formatting rules
  - **Done‑when:**
    1. ESLint is configured to defer all formatting concerns to Prettier
    2. Running ESLint (with auto-fix) and Prettier (with write) sequentially does not result in conflicting changes or infinite loops
  - **Verification:**
    1. Format a file with Prettier, then lint it with ESLint. Confirm no new linting errors related to formatting appear
    2. Lint a file with ESLint (with auto-fix), then format it with Prettier. Confirm no new formatting changes are made due to ESLint fixes
  - **Depends‑on:** [T001, T004]

- [x] **T011 · Test · P0: Test complete pre-commit workflow end-to-end**
  - **Context:** Verify entire tooling workflow functions correctly
  - **Action:**
    1. Create scenarios: a) stage files with fixable ESLint/Prettier issues, b) stage files with unfixable ESLint issues, c) attempt commit with invalid message format
    2. For each scenario, attempt a commit and observe the pre-commit workflow
  - **Done‑when:**
    1. Workflow correctly auto-fixes and commits for scenario (a)
    2. Workflow correctly blocks commit for scenario (b) due to ESLint errors
    3. Workflow correctly blocks commit for scenario (c) due to commit message validation failure
    4. Workflow allows commit when all staged files are clean and commit message is valid
  - **Verification:**
    1. Document test steps and outcomes for each scenario
  - **Depends‑on:** [T003, T006, T008, T009, T010]

## CI Integration

- [ ] **T012 · Feature · P0: Configure CI pipeline to run ESLint checks**

  - **Context:** Enforce linting standards in CI
  - **Action:**
    1. Add a step to the CI workflow (e.g., GitHub Actions) to execute `eslint .` (or equivalent)
    2. Ensure the CI job fails if this step reports any ESLint violations
  - **Done‑when:**
    1. CI pipeline includes an ESLint check step
    2. CI job reliably fails if ESLint violations are present in the codebase
  - **Verification:**
    1. Push a commit with a known ESLint violation; verify CI job fails at the ESLint step
    2. Push a clean commit; verify CI job passes the ESLint step
  - **Depends‑on:** [T003]

- [ ] **T013 · Feature · P0: Configure CI pipeline to run Prettier format checks**

  - **Context:** Enforce formatting standards in CI
  - **Action:**
    1. Add a step to the CI workflow to execute `prettier --check .` (or equivalent)
    2. Ensure the CI job fails if this step reports any formatting inconsistencies
  - **Done‑when:**
    1. CI pipeline includes a Prettier format check step
    2. CI job reliably fails if formatting inconsistencies are present
  - **Verification:**
    1. Push a commit with a known Prettier formatting issue; verify CI job fails at the Prettier step
    2. Push a commit with correctly formatted code; verify CI job passes the Prettier step
  - **Depends‑on:** [T006]

- [ ] **T014 · Chore · P1: Align CI checks with pre-commit hook configurations**
  - **Context:** Ensure consistency between local and CI environments
  - **Action:**
    1. Ensure CI scripts use the same versions of Node.js, ESLint, Prettier, and their respective configurations as used by the local pre-commit hooks
    2. Verify that the commands run in CI for linting and formatting are equivalent to those run locally
  - **Done‑when:**
    1. CI and local pre-commit checks are consistent in terms of tools, versions, configurations, and commands
    2. Discrepancies (if any unavoidable) are documented with rationale
  - **Verification:**
    1. Compare the tool versions and commands used in CI scripts with local setup
  - **Depends‑on:** [T011, T012, T013]

## Documentation

- [ ] **T015 · Chore · P2: Document core development tooling setup and workflow**

  - **Context:** Enable developers to understand and use the tooling
  - **Action:**
    1. Update `README.md` or `CONTRIBUTING.md` with comprehensive instructions for setting up ESLint, Prettier, Husky (including `husky install`), and editor integration (e.g., format-on-save)
    2. Clearly describe the pre-commit workflow and how to troubleshoot common issues
  - **Done‑when:**
    1. Documentation is clear, accurate, comprehensive, and discoverable
    2. A new developer can follow the documentation to successfully set up their environment and understand the workflow
  - **Verification:**
    1. Ask a team member unfamiliar with the setup to follow the documentation and provide feedback
  - **Depends‑on:** [T011]

- [ ] **T016 · Chore · P3: Document rationale for strict linting and formatting rules**

  - **Context:** Help developers understand why strict rules are enforced
  - **Action:**
    1. Add a section to the project's development guidelines or `README.md`
    2. Explain the benefits of enforcing strict linting and formatting rules (e.g., code consistency, early bug detection, maintainability)
    3. Include links or references to how auto-fixes can be applied
  - **Done‑when:**
    1. The rationale for strict rules is clearly documented and accessible to developers
  - **Depends‑on:** [T015]

- [ ] **T017 · Chore · P2: Document and enforce tool versions using package.json engines**
  - **Context:** Prevent environment inconsistencies
  - **Action:**
    1. Update the `engines` field in `package.json` to specify required versions for Node.js and the package manager (npm/yarn/pnpm)
    2. Document these version requirements in the project setup guide
  - **Done‑when:**
    1. `package.json` specifies required engine versions
    2. Tool version requirements are clearly documented
  - **Verification:**
    1. Attempt `npm install` (or equivalent) with an incompatible Node.js/package manager version; verify a warning or error is shown (depending on package manager behavior)
  - **Depends‑on:** [T015]

## Clarifications & Assumptions

- [ ] **Issue:** Define scope of linting/formatting for non-source code files (e.g., Markdown, JSON, YAML)

  - **Context:** Sections related to ESLint, Prettier, lint-staged configuration
  - **Blocking?:** No

- [ ] **Issue:** Determine the canonical location for developer tooling documentation (e.g., `README.md` vs. `CONTRIBUTING.md` vs. a dedicated `docs/` folder)

  - **Context:** Documentation tasks
  - **Blocking?:** No

- [ ] **Issue:** Confirm specific Conventional Commits configuration/preset to be used (e.g., default, angular, etc.)

  - **Context:** Task regarding commit-msg hook for Conventional Commits
  - **Blocking?:** No

- [ ] **Issue:** Identify if any specialized or non-default file types (beyond common JS/TS/JSON/MD) require specific lint-staged or Prettier handling
  - **Context:** lint-staged configuration task
  - **Blocking?:** No
