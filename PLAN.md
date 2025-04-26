# Remediation Plan – Sprint 1

## Executive Summary

This plan addresses the BLOCKER and HIGH-severity issues preventing merge of Sprint 1 remediation work, then tackles MEDIUM and LOW priorities as quick wins. Sequencing ensures critical type-safety, test‐coverage, and release‐automation fixes unblock other remediation tasks first. Once foundational quality gates are restored, we implement component API improvements, performance optimizations, and documentation enhancements.

## Strike List

| Seq | CR-ID | Title                                            | Effort | Owner?   |
| --- | ----- | ------------------------------------------------ | ------ | -------- |
| 1   | cr-01 | Enable TypeScript-Aware ESLint Rules             | s      | frontend |
| 2   | cr-02 | Raise Test Coverage Thresholds                   | m      | frontend |
| 3   | cr-03 | Enforce Conventional Commits via commit-msg hook | s      | devops   |
| 4   | cr-04 | Add `forwardRef` to Button Component             | s      | frontend |
| 5   | cr-05 | Remove Unnecessary `"use client"` Directives     | xs     | frontend |
| 6   | cr-06 | Replace Array Index Keys with Stable IDs         | xs     | frontend |
| 7   | cr-07 | Implement Structured Logging Solution            | m      | frontend |
| 8   | cr-08 | Remove Unused Dependencies                       | xs     | frontend |
| 9   | cr-09 | Add `engines` Specification to `package.json`    | xs     | frontend |
| 10  | cr-10 | Run Tests in Pre-commit/Pre-push Hooks           | s      | frontend |
| 11  | cr-11 | Optimize CI Cache Configuration                  | s      | devops   |
| 12  | cr-12 | Standardize `pnpm` Usage in Docs                 | xs     | frontend |
| 13  | cr-13 | Enhance Test Utils with Context Providers        | s      | frontend |
| 14  | cr-14 | Update Placeholder Site Metadata                 | xs     | frontend |
| 15  | cr-15 | Add CI & Coverage Badges to README               | xs     | frontend |
| 16  | cr-16 | Correct Tailwind Config Reference                | xs     | frontend |
| 17  | cr-17 | Enforce File Length Limits via ESLint            | xs     | frontend |

## Detailed Remedies

### cr-01 Enable TypeScript-Aware ESLint Rules

- Problem: Critical rules (`explicit-function-return-type`, `no-floating-promises`) are disabled due to missing `parserOptions.project`.
- Impact: Type errors bypass lint, risking runtime bugs; violates strictness policy.
- Chosen Fix: Configure parser to use `tsconfig.json` and re-enable `@typescript-eslint/recommended-requiring-type-checking`.
- Steps:
  1. In `eslint.config.mjs`, set `parserOptions.project = './tsconfig.json'`.
  2. Extend `plugin:@typescript-eslint/recommended-requiring-type-checking`.
  3. Uncomment and enable the disabled rules.
  4. Run `pnpm lint` and fix all violations.
- Done-When: CI reports zero lint errors under strict TypeScript rules.

### cr-02 Raise Test Coverage Thresholds

- Problem: Coverage thresholds (30%/70%) are far below the 85% standard.
- Impact: Unverified code can merge, increasing risk of regressions.
- Chosen Fix: Update Vitest config to enforce ≥85% on all metrics and add missing tests.
- Steps:
  1. In `vitest.config.ts`, set thresholds to 85% for statements, branches, functions, and lines.
  2. Write unit/integration tests for uncovered core logic and components.
  3. Ensure CI fails if thresholds aren’t met.
- Done-When: `pnpm test --coverage` passes locally and in CI at ≥85%.

### cr-03 Enforce Conventional Commits via commit-msg hook

- Problem: No hook enforces Conventional Commits spec.
- Impact: Automated changelog/versioning is broken.
- Chosen Fix: Install `commitlint` and add a Husky `commit-msg` hook.
- Steps:
  1. `pnpm add -D @commitlint/cli @commitlint/config-conventional`
  2. Create `commitlint.config.js` extending the conventional config.
  3. Add `.husky/commit-msg` invoking `npx commitlint --edit "$1"`.
  4. `chmod +x .husky/commit-msg`
- Done-When: Invalid commit messages are rejected locally and in CI.

### cr-04 Add `forwardRef` to Button Component

- Problem: Button lacks `React.forwardRef`, blocking ref usage.
- Impact: Hinders testability and integration with forms.
- Chosen Fix: Refactor Button to use `forwardRef`, update its props and types.
- Steps:
  1. Convert to `const Button = React.forwardRef<HTMLButtonElement, Props>(…)`.
  2. Pass `ref` to the underlying element (`<Comp ref={ref} …>`).
  3. Update tests to verify ref forwarding.
- Done-When: Tests confirm consumers can attach refs to Button.

### cr-05 Remove Unnecessary `"use client"` Directives

- Problem: Non-interactive components are marked client-side.
- Impact: Unneeded client JS bloats bundle and hurts performance.
- Chosen Fix: Audit and remove `"use client"` from all static components.
- Steps:
  1. Identify directives in `site-header.tsx`, `site-footer.tsx`, `ui/label.tsx`, etc.
  2. Delete the directives and verify SSR behavior.
  3. Run smoke tests.
- Done-When: No redundant `"use client"` lines; SSR and hydration succeed.

### cr-06 Replace Array Index Keys with Stable IDs

- Problem: Using array indices as React keys in lists.
- Impact: Incorrect UI updates and performance issues when lists change.
- Chosen Fix: Use unique identifiers (e.g., `feature.title`, `point`).
- Steps:
  1. In `components/features.tsx`, change `key={index}` to `key={feature.title}`.
  2. In `app/page.tsx`, use `key={solution.title}` and `key={point}`.
  3. Verify absence of key warnings.
- Done-When: All lists use stable keys and render correctly.

### cr-07 Implement Structured Logging Solution

- Problem: Ad-hoc `console.log`; no structured logging.
- Impact: Poor observability; logs not machine-readable.
- Chosen Fix: Integrate `pino` for JSON structured logs.
- Steps:
  1. `pnpm add pino`
  2. Create `lib/logger.ts` exporting a `pino` instance with `service_name`.
  3. Replace `console.log`/`error` with `logger.info`/`error`.
  4. Ensure logs include timestamp, level, service_name.
- Done-When: All logs are JSON-structured via `pino`; no `console.log` remains.

### cr-08 Remove Unused Dependencies

- Problem: `tw-animate-css` and `lucide-react` remain installed but unused.
- Impact: Increases bundle size and attack surface.
- Chosen Fix: Remove via pnpm.
- Steps:
  1. `pnpm remove tw-animate-css lucide-react`
  2. Remove any import references.
  3. Run `pnpm install` and smoke-test.
- Done-When: Dependencies are gone from `package.json`; build succeeds.

### cr-09 Add `engines` Specification to `package.json`

- Problem: No `engines` field to enforce Node.js/pnpm versions.
- Impact: Environment drift risks inconsistent builds.
- Chosen Fix: Add `"engines": { "node": ">=18 <20", "pnpm": ">=7" }`.
- Steps:
  1. Edit `package.json` accordingly.
  2. Verify pnpm warns on unsupported versions.
- Done-When: `engines` field present and enforced.

### cr-10 Run Tests in Pre-commit/Pre-push Hooks

- Problem: Pre-commit only runs lint/format, not tests.
- Impact: Broken functionality can be committed.
- Chosen Fix: Extend Husky hooks to execute tests.
- Steps:
  1. Update `.husky/pre-commit` to run `pnpm test --passWithNoTests` after `lint-staged`.
  2. Or add `.husky/pre-push` that runs full test suite.
- Done-When: Failing tests block commit or push locally.

### cr-11 Optimize CI Cache Configuration

- Problem: CI only caches pnpm store path, rebuilds node_modules each run.
- Impact: Slow CI feedback loop.
- Chosen Fix: Cache `node_modules/.pnpm` or workspace directories too.
- Steps:
  1. Edit `.github/workflows/ci.yml` to add corresponding cache paths.
  2. Validate faster CI runs on cache hits.
- Done-When: CI build time improves and cache hit rate increases.

### cr-12 Standardize `pnpm` Usage in Docs

- Problem: PLAN.md and other docs reference `npm`.
- Impact: Confuses contributors; inconsistent commands.
- Chosen Fix: Replace all `npm` commands with `pnpm` equivalents.
- Steps:
  1. Grep for `npm` in docs and replace.
  2. Verify commands in README and PLAN.md.
- Done-When: No `npm` references remain in process docs.

### cr-13 Enhance Test Utils with Context Providers

- Problem: Test utilities omit essential providers (Theme, Router).
- Impact: Component tests may fail or be incomplete.
- Chosen Fix: Wrap test renderers with all required contexts.
- Steps:
  1. Update `test/utils.tsx` to include ThemeProvider, Router, etc.
  2. Refactor existing tests to use enhanced utility.
- Done-When: All component tests pass consistently under full context.

### cr-14 Update Placeholder Site Metadata

- Problem: `metadata.title` and `description` are generic placeholders.
- Impact: Weak branding and SEO.
- Chosen Fix: Craft specific, compelling metadata aligning with Misty Step brand.
- Steps:
  1. Write descriptive title and summary.
  2. Update `app/layout.tsx`.
- Done-When: Metadata reflects real product positioning.

### cr-15 Add CI & Coverage Badges to README

- Problem: README lacks status and coverage indicators.
- Impact: New contributors can’t gauge build/test health at a glance.
- Chosen Fix: Insert badges for CI status, coverage percentage, and maturity.
- Steps:
  1. Copy badge URLs from CI and coverage services.
  2. Add to top of `README.md`.
- Done-When: Badges display correctly in GitHub.

### cr-16 Correct Tailwind Config Reference

- Problem: `components.json` has empty `config` string.
- Impact: Potential misconfiguration of shadcn UI integration.
- Chosen Fix: Point `config` to `tailwind.config.js`.
- Steps:
  1. Update `"config": "tailwind.config.js"` in `components.json`.
  2. Verify Tailwind classes generate correctly.
- Done-When: shadcn components build with expected styles.

### cr-17 Enforce File Length Limits via ESLint

- Problem: No rule limiting file size, risking unmanageable files.
- Impact: Codebase complexity can grow unchecked.
- Chosen Fix: Add `max-lines` rule to ESLint.
- Steps:
  1. In `eslint.config.mjs`, configure `max-lines: ["warn", { max: 500, skipBlankLines: true, skipComments: true }]` and error at 1000.
  2. Lint and refactor oversized files.
- Done-When: Files over threshold trigger ESLint warnings/errors.

## Standards Alignment

- **Simplicity First:** cr-05, cr-08, cr-09, cr-12 remove unnecessary complexity and standardize environment.
- **Maximize Language Strictness:** cr-01 enforces strict TypeScript linting to catch errors early.
- **Design for Testability:** cr-02, cr-04, cr-10, cr-13 ensure robust test coverage, ref-forwarding, and full context.
- **Coding Standards:** cr-06 and cr-17 uphold React best practices and file manageability.
- **Automation & Release Hygiene:** cr-03 and cr-10 automate commit and quality gates for seamless CI/CD.
- **Observability:** cr-07 implements structured JSON logging for reliable debugging.

## Validation Checklist

- [ ] cr-01: ESLint with `parserOptions.project` passes strictly.
- [ ] cr-02: Vitest coverage ≥85% locally and in CI.
- [ ] cr-03: Husky `commit-msg` hook rejects non-conventional commits.
- [ ] cr-04: Button component forwards refs; tests verify.
- [ ] cr-05: No unnecessary `"use client"` directives; SSR works.
- [ ] cr-06: All list `key` props use stable identifiers; no warnings.
- [ ] cr-07: Structured JSON logs via `pino`; no `console.log`.
- [ ] cr-08: Unused dependencies removed; build passes.
- [ ] cr-09: `package.json` contains correct `engines`.
- [ ] cr-10: Pre-commit/pre-push hooks run tests and block failures.
- [ ] cr-11: CI caching extended; build times improved.
- [ ] cr-12: Docs reference only `pnpm`.
- [ ] cr-13: Test utils wrap all required context.
- [ ] cr-14: Site metadata updated with brand messaging.
- [ ] cr-15: README displays CI and coverage badges.
- [ ] cr-16: Tailwind config reference corrected; styles intact.
- [ ] cr-17: ESLint warns/errors on oversized files.
- [ ] All automated tests and linters pass; no new warnings.
