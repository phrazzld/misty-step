# Todo

## Linting & TypeScript Rules

- [x] **T001 · Chore · P0: enable TypeScript-aware ESLint rules**

  - **Context:** cr-01 Enable TypeScript-Aware ESLint Rules
  - **Action:**
    1. In `eslint.config.mjs`, set `parserOptions.project = './tsconfig.json'` and extend `plugin:@typescript-eslint/recommended-requiring-type-checking`.
    2. Uncomment and enable strict rules (`explicit-function-return-type`, `no-floating-promises`).
    3. Run `pnpm lint` and fix all violations.
  - **Done-when:**
    1. CI reports zero lint errors under strict TypeScript-aware rules.
  - **Depends-on:** none

- [x] **T018 · Chore · P2: configure ESLint max-lines rule**

  - **Context:** cr-17 Enforce File Length Limits via ESLint (Step 1)
  - **Action:**
    1. In `eslint.config.mjs`, add `max-lines` rule: warn at 500 lines (skip blanks/comments) and error at 1000 lines.
  - **Done-when:**
    1. ESLint configuration includes the `max-lines` rule.
  - **Depends-on:** [T001]

- [x] **T019 · Refactor · P2: refactor files exceeding max-lines limit**
  - **Context:** cr-17 Enforce File Length Limits via ESLint (Step 2)
  - **Action:**
    1. Identify files triggering the `max-lines` rule.
    2. Split or refactor oversized files to comply with the new limits.
  - **Done-when:**
    1. `pnpm lint` reports no `max-lines` errors.
  - **Depends-on:** [T018]

## Test Coverage & Quality Gates

- [x] **T002 · Chore · P1: update Vitest coverage thresholds to 85%**

  - **Context:** cr-02 Raise Test Coverage Thresholds (Step 1)
  - **Action:**
    1. In `vitest.config.ts`, set minimum thresholds to 85% for statements, branches, functions, and lines.
  - **Done-when:**
    1. CI and local `pnpm test --coverage` fail if coverage falls below 85%.
  - **Depends-on:** none

- [x] **T003 · Test · P1: write tests to meet 85% coverage threshold**
  - **Context:** cr-02 Raise Test Coverage Thresholds (Step 2)
  - **Action:**
    1. Identify uncovered core logic/components via the coverage report.
    2. Write unit/integration tests to achieve ≥85% coverage across all metrics.
  - **Done-when:**
    1. `pnpm test --coverage` passes locally and in CI at ≥85%.
  - **Depends-on:** [T002]

## Husky Hooks & CI Automation

- [x] **T004 · Chore · P2: enforce Conventional Commits via commit-msg hook**

  - **Context:** cr-03 Enforce Conventional Commits via commit-msg hook
  - **Action:**
    1. Install `@commitlint/cli` and `@commitlint/config-conventional` as dev dependencies.
    2. Create `commitlint.config.js` extending the conventional config.
    3. Add `.husky/commit-msg` invoking `npx commitlint --edit "$1"` and mark it executable.
  - **Done-when:**
    1. Invalid commit messages are rejected locally and in CI.
  - **Depends-on:** none

- [x] **T005 · Chore · P2: run tests in pre-commit/pre-push hooks**

  - **Context:** cr-10 Run Tests in Pre-commit/Pre-push Hooks
  - **Action:**
    1. Update `.husky/pre-commit` to run `pnpm test --passWithNoTests` after `lint-staged`.
    2. Optionally add `.husky/pre-push` to run the full test suite.
  - **Done-when:**
    1. Failing tests block commits or pushes locally.
  - **Depends-on:** [T003]

- [x] **T012 · Chore · P2: optimize CI cache configuration**
  - **Context:** cr-11 Optimize CI Cache Configuration
  - **Action:**
    1. In `.github/workflows/ci.yml`, add caching for `node_modules/.pnpm` (or workspace directories) alongside the pnpm store.
    2. Validate faster CI runs with cache hits.
  - **Done-when:**
    1. CI shows cache restores for new paths and reduced setup time.
  - **Depends-on:** none

## Components & Code Quality

- [x] **T006 · Refactor · P2: add forwardRef to Button component**

  - **Context:** cr-04 Add `forwardRef` to Button Component
  - **Action:**
    1. Refactor `Button` to use `React.forwardRef<HTMLButtonElement, Props>`.
    2. Pass `ref` down to the underlying `<button>` element.
    3. Update tests to assert ref forwarding.
  - **Done-when:**
    1. Tests confirm consumers can attach refs to `Button`.
  - **Depends-on:** none

- [x] **T007 · Refactor · P2: remove unnecessary "use client" directives**

  - **Context:** cr-05 Remove Unnecessary `"use client"` Directives
  - **Action:**
    1. Remove `"use client"` from static components (`site-header.tsx`, `site-footer.tsx`, `ui/label.tsx`, etc.).
    2. Run SSR smoke tests to confirm no regressions.
  - **Done-when:**
    1. No static components contain `"use client"` and SSR/hydration succeed.
  - **Depends-on:** none

- [x] **T008 · Refactor · P2: replace array index keys with stable IDs**

  - **Context:** cr-06 Replace Array Index Keys with Stable IDs
  - **Action:**
    1. In `components/features.tsx`, change `key={index}` to `key={feature.title}`.
    2. In `app/page.tsx`, use unique identifiers (`solution.title`, `point`) as keys.
  - **Done-when:**
    1. React renders lists with no key warnings and correct updates.
  - **Depends-on:** none

- [x] **T014 · Refactor · P2: enhance test utils with context providers**
  - **Context:** cr-13 Enhance Test Utils with Context Providers
  - **Action:**
    1. Update `test/utils.tsx` to wrap renders with required contexts (ThemeProvider, Router, etc.).
    2. Refactor existing tests to use the enhanced render utility.
  - **Done-when:**
    1. All component tests pass under full context without manual providers.
  - **Depends-on:** none

## Logging & Dependencies

- [x] **T009 · Feature · P2: implement structured logging solution**

  - **Context:** cr-07 Implement Structured Logging Solution
  - **Action:**
    1. Install `pino` and create `lib/logger.ts` exporting a configured instance with `service_name`.
    2. Replace all `console.log`/`console.error` calls with `logger.info`/`logger.error`.
  - **Done-when:**
    1. All logs are JSON-formatted with timestamp, level, service_name; no `console.log` remains.
  - **Depends-on:** none

- [x] **T010 · Chore · P2: remove unused dependencies**
  - **Context:** cr-08 Remove Unused Dependencies
  - **Action:**
    1. Run `pnpm remove tw-animate-css lucide-react`.
    2. Delete any import references.
    3. Run `pnpm install` and perform a smoke build.
  - **Done-when:**
    1. Removed packages are absent from `package.json` and lockfile; build succeeds.
  - **Depends-on:** none

## Environment & Configuration

- [x] **T011 · Chore · P3: add engines specification to package.json**

  - **Context:** cr-09 Add `engines` Specification to `package.json`
  - **Action:**
    1. In `package.json`, add `"engines": { "node": ">=18 <20", "pnpm": ">=7" }`.
    2. Confirm warnings on incompatible versions.
  - **Done-when:**
    1. `package.json` contains the `engines` field and displays warnings for non-compliant environments.
  - **Depends-on:** none

- [x] **T017 · Chore · P3: correct Tailwind config reference**
  - **Context:** cr-16 Correct Tailwind Config Reference
  - **Action:**
    1. Update `"config": "tailwind.config.js"` in `components.json`.
    2. Rebuild and verify shadcn UI styles render correctly.
  - **Done-when:**
    1. `components.json` points to `tailwind.config.js` and styles appear as expected.
  - **Depends-on:** none

## Documentation & Site Content

- [ ] **T013 · Chore · P3: standardize pnpm usage in docs**

  - **Context:** cr-12 Standardize `pnpm` Usage in Docs
  - **Action:**
    1. Replace all `npm` commands with `pnpm` equivalents in `.md` documentation files.
  - **Done-when:**
    1. No `npm` references remain in project documentation.
  - **Depends-on:** none

- [ ] **T015 · Chore · P3: update placeholder site metadata**

  - **Context:** cr-14 Update Placeholder Site Metadata
  - **Action:**
    1. Draft new title and description aligned with Misty Step branding.
    2. Update `metadata.title` and `description` in `app/layout.tsx`.
  - **Done-when:**
    1. Site metadata reflects the new branding in page source.
  - **Depends-on:** none

- [ ] **T016 · Chore · P3: add CI & coverage badges to README**
  - **Context:** cr-15 Add CI & Coverage Badges to README
  - **Action:**
    1. Obtain Markdown snippets for CI status and test coverage badges.
    2. Insert badges at the top of `README.md`.
  - **Done-when:**
    1. Badges render correctly on GitHub showing current build status and coverage.
  - **Depends-on:** [T003, T012]

### Clarifications & Assumptions

- [ ] **Issue:** Scope of writing tests for coverage (T003)
  - **Context:** cr-02 Raise Test Coverage Thresholds
  - **Blocking?:** no
- [ ] **Issue:** Choice of pre-commit vs pre-push hook (T005)
  - **Context:** cr-10 Run Tests in Pre-commit/Pre-push Hooks
  - **Blocking?:** no
- [ ] **Issue:** Volume of lint violations from enabling strict TS rules (T001)
  - **Context:** cr-01 Enable TypeScript-Aware ESLint Rules
  - **Blocking?:** no
- [ ] **Issue:** Number of files exceeding max-lines threshold (T019)
  - **Context:** cr-17 Enforce File Length Limits via ESLint
  - **Blocking?:** no
