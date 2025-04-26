# Remediation Plan – Sprint 1

## Executive Summary

We tackle the four critical blockers first—strict typing, lint/format enforcement, docs integrity, and form accessibility—to restore core developer workflows and UX. Next, we eliminate high-severity performance and process gaps ("use client" misuse, missing CI/tests). Finally, we sweep up medium-effort code-hygiene tasks (ref forwarding, logging, deps, React keys) to bulletproof the codebase.

## Strike List

| Seq | CR-ID | Title                                                         | Effort | Owner     |
| --- | ----- | ------------------------------------------------------------- | ------ | --------- |
| 1   | cr-01 | Add `tsconfig.json` with strict settings                      | s      | frontend  |
| 2   | cr-02 | Commit ESLint & Prettier configs + pre-commit hooks           | s      | frontend  |
| 3   | cr-03 | Replace invalid documentation symlinks                        | xs     | docs team |
| 4   | cr-04 | Wrap Contact component in `<form>`                            | s      | frontend  |
| 5   | cr-05 | Remove unnecessary `"use client"` directives                  | xs     | frontend  |
| 6   | cr-06 | Introduce automated tests & CI pipeline                       | m      | devops    |
| 7   | cr-07 | Add `forwardRef` to Input/Textarea/Label primitives           | s      | frontend  |
| 8   | cr-08 | Remove unstructured `console.log` in DarkModeToggle           | xs     | frontend  |
| 9   | cr-09 | Remove unused dependencies (`tw-animate-css`, `lucide-react`) | xs     | frontend  |
| 10  | cr-10 | Replace array-index keys with stable identifiers              | xs     | frontend  |

## Detailed Remedies

### cr-01 Add `tsconfig.json` with strict settings

- **Problem:** No TypeScript config exists, so code isn’t type-checked.
- **Impact:** Runtime bugs slip through; editors and CI can’t enforce types.
- **Chosen Fix:** Create a root `tsconfig.json` per Appendix-TypeScript §4 with `"strict": true`, `noImplicitAny`, `strictNullChecks`, etc.
- **Steps:**
  1. Add `tsconfig.json` at project root with mandated `compilerOptions`.
  2. Include `include: ["next-env.d.ts","**/*.ts","**/*.tsx"]`.
  3. Run `tsc --noEmit`; fix resulting errors.
- **Done-When:** `tsc --noEmit` passes locally and in CI.

### cr-02 Commit ESLint & Prettier configs + pre-commit hooks

- **Problem:** No linting or formatting enforcement.
- **Impact:** Style drift, undetected errors, no CI quality gate.
- **Chosen Fix:** Add `.eslintrc.js` extending `next/core-web-vitals` & `@typescript-eslint/recommended`, plus `.prettierrc`; wire Husky + lint-staged.
- **Steps:**
  1. Install dev deps: `eslint`, `prettier`, `@typescript-eslint/*`, `eslint-config-prettier`, `husky`, `lint-staged`.
  2. Create configs and `package.json` scripts for `lint`/`format`.
  3. Configure Husky pre-commit to run `eslint --fix` & `prettier --write`.
  4. Add lint/format checks to CI.
- **Done-When:** Pre-commit and CI block on lint/format violations.

### cr-03 Replace invalid documentation symlinks

- **Problem:** `docs/DEVELOPMENT_PHILOSOPHY.md` and `docs/prompts` are symlinked to local absolute paths.
- **Impact:** Team and CI see empty placeholders; core docs unavailable.
- **Chosen Fix:** Delete symlinks and check in real Markdown content under `docs/`.
- **Steps:**
  1. Remove the broken symlinks.
  2. Copy or recreate the original content as `.md` files.
  3. Verify rendering in GitHub and local previews.
- **Done-When:** `docs/` contains proper `.md` files; docs linting passes.

### cr-04 Wrap Contact component in `<form>`

- **Problem:** Inputs and submit button aren’t inside a `<form>`.
- **Impact:** “Send Message” does nothing; accessibility context lost.
- **Chosen Fix:** Wrap fields and `<Button type="submit">` in a semantic `<form>` with `onSubmit`.
- **Steps:**
  1. In `components/contact.tsx`, wrap the grid and button in `<form onSubmit={handleSubmit}>`.
  2. Implement `handleSubmit` to `preventDefault()` and handle data.
  3. Ensure each `<Label htmlFor>` matches the input `id`.
  4. Add basic validation (`required` attributes).
- **Done-When:** Clicking “Send Message” fires `handleSubmit`; unit test verifies submission.

### cr-05 Remove unnecessary `"use client"` directives

- **Problem:** Static components (`hero.tsx`, `features.tsx`) declare `"use client"` without needing state/effects.
- **Impact:** Forces client-side JS, inflating bundle and hurting SSR performance.
- **Chosen Fix:** Remove the `"use client"` pragma from these files.
- **Steps:**
  1. Delete the first line in each file.
  2. Rebuild and confirm SSR rendering in Next.js.
- **Done-When:** No client-only warnings; Lighthouse SSR audit shows no extra bundle.

### cr-06 Introduce automated tests & CI pipeline

- **Problem:** Zero tests and no CI workflow.
- **Impact:** High regression risk; no enforceable quality gate.
- **Chosen Fix:** Add Jest or Vitest config, write baseline tests, enforce ≥85% coverage, and create GitHub Actions CI.
- **Steps:**
  1. Install `jest`/`vitest`, `@testing-library/react`, and setup config.
  2. Write unit tests for `Contact`, `DarkModeToggle`, UI primitives.
  3. Configure coverage thresholds.
  4. Create `.github/workflows/ci.yml` to run lint, typecheck, test, coverage, and `npm audit`.
- **Done-When:** CI on PRs fails on any lint/type/test/coverage/audit violation.

### cr-07 Add `forwardRef` to Input/Textarea/Label primitives

- **Problem:** Primitives can’t accept refs for composition/testing.
- **Impact:** Hinders integration with form libraries and testing tools.
- **Chosen Fix:** Refactor each to use `React.forwardRef<HTML…, Props>`.
- **Steps:**
  1. In `components/ui/*`, wrap component definitions with `forwardRef`.
  2. Pass the `ref` to the underlying DOM element.
  3. Update types to include `ref`.
  4. Add/refactor tests to assert `ref` attachment.
- **Done-When:** Consumers can attach refs; tests confirm ref forwarding.

### cr-08 Remove unstructured `console.log` in DarkModeToggle

- **Problem:** Uses `console.log` for debugging in production code.
- **Impact:** Pollutes logs; violates structured-logging policy.
- **Chosen Fix:** Delete all `console.log` calls (or guard behind `NODE_ENV==='development'`).
- **Steps:**
  1. Remove debug statements from `components/dark-mode-toggle.tsx`.
  2. Optionally inject a structured logger if logging needed.
- **Done-When:** No `console.log` in production build; `no-console` lint rule passes.

### cr-09 Remove unused dependencies

- **Problem:** `tw-animate-css` and `lucide-react` are installed but not used.
- **Impact:** Bundle bloat; larger attack surface; wasted maintenance.
- **Chosen Fix:** Uninstall and remove from `package.json`/lockfile.
- **Steps:**
  1. Run `npm uninstall tw-animate-css lucide-react`.
  2. Clean up any import references.
  3. Commit updated `package.json` and lockfile.
- **Done-When:** Dependencies gone; `npm ls` shows no references; app builds.

### cr-10 Replace array-index keys with stable identifiers

- **Problem:** Lists use `key={index}` in `app/page.tsx` and `components/features.tsx`.
- **Impact:** React can mis-match DOM, lose state, and cause UI flicker on reorders.
- **Chosen Fix:** Use a unique field (e.g., `title` or `id`) as `key`.
- **Steps:**
  1. Update `map` calls to `key={item.title}` or `item.id`.
  2. Ensure items have unique IDs; add if needed.
  3. Run storybook/tests to confirm no key warnings.
- **Done-When:** React console shows no `key` warnings; UI behaves correctly on dynamic updates.

## Standards Alignment

- **Simplicity First:** We add only essential infra (tsconfig, linting, docs) and remove accidental complexity (`"use client"`, `console.log`, unused deps).
- **Modularity & Separation of Concerns:** Forms are now semantic; UI primitives accept refs; global styles unaffected.
- **Design for Testability & Automation:** CI with lint/type/test/coverage/audit, plus `forwardRef`, unlock safe refactors.
- **Coding Standards:** Strict TS, ESLint/Prettier, no-console, stable keys enforce cultural discipline.
- **Performance & Security:** Removing client-only directives and unused deps shrinks bundle; CI audit reduces vulnerabilities.
- **Accessibility:** Contact form semantics and proper labels restore a11y compliance.

## Validation Checklist

- [ ] `tsc --noEmit` passes without errors (cr-01)
- [ ] Pre-commit hooks block on lint/format; CI fails on violations (cr-02)
- [ ] `docs/` contains real Markdown; GitHub renders correctly (cr-03)
- [ ] “Send Message” triggers form submission; basic validation works (cr-04)
- [ ] No `"use client"` in pure static components; SSR audit clean (cr-05)
- [ ] CI workflow runs lint, typecheck, tests, coverage, audit on PRs (cr-06)
- [ ] UI primitives accept React refs; tests verify ref forwarding (cr-07)
- [ ] No `console.log` in production; lint rule `no-console` passes (cr-08)
- [ ] `tw-animate-css` and `lucide-react` removed; lockfile updated (cr-09)
- [ ] React console shows no key warnings; stable keys in place (cr-10)
