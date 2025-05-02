# Remediation Plan – Sprint 1

## Executive Summary

This plan prioritizes the immediate resolution of critical blockers preventing documentation access, component isolation, and accurate test coverage reporting. High-priority fixes addressing historical context loss, component inconsistency, and fragile testing methods follow. The strike order focuses on rapid wins and unblocking foundational improvements to restore repository integrity and align with core development philosophies.

## Strike List

| Seq | CR-ID | Title                                                       | Effort | Owner? |
| --- | ----- | ----------------------------------------------------------- | ------ | ------ |
| 1   | cr-01 | Fix Non-Portable Symlink for Documentation                  | xs     |        |
| 2   | cr-03 | Remove Story Exclusion from Test Coverage                   | xs     |        |
| 3   | cr-13 | Formalize and Enforce PNPM Usage                            | xs     |        |
| 4   | cr-14 | Link to Orphaned Storybook Contribution Guidelines          | xs     |        |
| 5   | cr-15 | Remove Unjustified Global Story Margin Decorator            | xs     |        |
| 6   | cr-18 | Ensure Husky Hook Echo Command Ends with Newline            | xs     |        |
| 7   | cr-05 | Restore Deleted Historical Planning Documentation           | s      |        |
| 8   | cr-02 | Decouple Storybook from Next.js `next/image`                | s      |        |
| 9   | cr-08 | Clarify Tailwind Directive Handling in Storybook            | xs     |        |
| 10  | cr-09 | Document `CardAction` Subcomponent API                      | xs     |        |
| 11  | cr-16 | Use Idiomatic React Import Style                            | xs     |        |
| 12  | cr-06 | Enforce Consistent Use of Library Components in Stories     | m      |        |
| 13  | cr-04 | Replace Fragile CSS State Simulation with Interaction Tests | m      |        |
| 14  | cr-12 | Refactor Inconsistent Story Structure (`args` vs. `render`) | s      |        |
| 15  | cr-17 | Improve Generic Story Names for Clarity                     | s      |        |
| 16  | cr-07 | Audit and Remediate Risky Post-Commit Hook                  | s      |        |
| 17  | cr-10 | Enhance Component Prop Documentation (`argTypes`)           | m      |        |
| 18  | cr-11 | Add Missing State and Edge Case Coverage in Stories         | m      |        |

## Detailed Remedies

### cr-01 Fix Non-Portable Symlink for Documentation

- **Problem:** Documentation file `docs/DEVELOPMENT_PHILOSOPHY_APPENDIX_FRONTEND.md` is an inaccessible absolute-path symlink.
- **Impact:** Blocks documentation access for team and CI/CD, violating portability.
- **Chosen Fix:** Replace the symlink with the actual file content directly in the repository.
- **Steps:**
  1.  Identify the source content of the symlink (`/Users/phaedrus/...`).
  2.  Delete the symlink `docs/DEVELOPMENT_PHILOSOPHY_APPENDIX_FRONTEND.md` from the repository (`git rm ...`).
  3.  Create a new file at the same path containing the actual documentation content.
  4.  Commit the new file (`git add ...`).
- **Done-When:** The file exists as a regular file in Git, is readable by all, and CI passes doc checks.

### cr-03 Remove Story Exclusion from Test Coverage

- **Problem:** Story files (`*.stories.tsx`) are excluded from Vitest coverage analysis.
- **Impact:** Hides untested logic within stories (e.g., `play` functions), undermining quality gates.
- **Chosen Fix:** Remove the story file exclusion pattern from the Vitest configuration.
- **Steps:**
  1.  Edit `vitest.config.ts`.
  2.  Remove the `"**/*.stories.{ts,tsx}"` pattern from the `coverage.exclude` array.
  3.  Commit the change.
  4.  Run coverage and verify stories are included in the report.
- **Done-When:** `coverage.exclude` no longer lists story files; coverage report includes story logic.

### cr-13 Formalize and Enforce PNPM Usage

- **Problem:** Mandated `pnpm` usage is hidden in an obscure file (`CLAUDE.md`).
- **Impact:** New contributors miss the requirement, leading to inconsistent environments.
- **Chosen Fix:** Document the requirement prominently and enforce it technically via `package.json`.
- **Steps:**
  1.  Add a clear statement mandating `pnpm` usage to the Setup section of `README.md` and/or `CONTRIBUTING.md`.
  2.  Add `"packageManager": "pnpm@<version>"` to `package.json` (use the correct project version).
  3.  (Optional) Add `.npmrc` with `engine-strict=true`.
  4.  Delete `CLAUDE.md` (or integrate any other useful content elsewhere).
- **Done-When:** `pnpm` requirement is documented in main README/CONTRIBUTING and enforced via `package.json`.

### cr-14 Link to Orphaned Storybook Contribution Guidelines

- **Problem:** `docs/CONTRIBUTING-STORYBOOK.md` exists but is not linked from main documentation.
- **Impact:** Developers are unaware of specific Storybook contribution standards.
- **Chosen Fix:** Add links to the guidelines from `README.md` and/or `CONTRIBUTING.md`.
- **Steps:**
  1.  Edit `README.md` and add a link to `docs/CONTRIBUTING-STORYBOOK.md` in the Contribution/Development section.
  2.  Edit `CONTRIBUTING.md` (if exists) and add a link similarly.
- **Done-When:** Clear links to `docs/CONTRIBUTING-STORYBOOK.md` exist in primary contribution documentation.

### cr-15 Remove Unjustified Global Story Margin Decorator

- **Problem:** A global Storybook decorator adds `margin: "1rem"` to all stories without justification.
- **Impact:** May interfere with component layout, visual testing, or intended component boundaries.
- **Chosen Fix:** Remove the global margin decorator.
- **Steps:**
  1.  Edit `.storybook/preview.tsx`.
  2.  Remove the decorator applying the `margin: "1rem"` style wrapper.
  3.  Visually verify stories in Storybook; apply spacing locally within stories only if needed for specific demos.
- **Done-When:** The global margin decorator is removed from `.storybook/preview.tsx`.

### cr-18 Ensure Husky Hook Echo Command Ends with Newline

- **Problem:** The `echo` command in `.husky/post-commit` lacks a final newline.
- **Impact:** Causes minor terminal formatting issues where the prompt follows immediately.
- **Chosen Fix:** Ensure the `echo` command output includes a trailing newline.
- **Steps:**
  1.  Edit `.husky/post-commit`.
  2.  Verify the `echo` command on line 9 does not use `-n` and naturally outputs a newline.
  3.  Ensure the file itself ends with a newline character.
- **Done-When:** Terminal output from the hook is correctly formatted with a trailing newline.

### cr-05 Restore Deleted Historical Planning Documentation

- **Problem:** Historical planning documents (`PLAN-*.md`) were deleted.
- **Impact:** Loss of critical project context, rationale, and decision history.
- **Chosen Fix:** Restore files from Git history and archive them within the `docs` directory.
- **Steps:**
  1.  Use `git checkout <commit-hash>^ -- <path/to/PLAN-*.md>` to restore the deleted files (`PLAN-2.md`, `PLAN-INDEX.md`, `PLAN-ORIGINAL.md`).
  2.  Create directory `docs/archive/planning/`.
  3.  Move the restored files into `docs/archive/planning/` (`git mv ...`).
  4.  Commit the restored and moved files.
  5.  Add a reference to this archive directory in `README.md` or `CONTRIBUTING.md`.
- **Done-When:** Historical planning documents are present in `docs/archive/planning/` and referenced.

### cr-02 Decouple Storybook from Next.js `next/image`

- **Problem:** Storybook stories directly import and use `next/image`.
- **Impact:** Violates component isolation, couples Storybook to Next.js, risks errors outside Next.js context.
- **Chosen Fix:** Replace `next/image` with standard HTML `<img>` tags and configure static asset serving.
- **Steps:**
  1.  Verify `.storybook/main.ts` includes `staticDirs: ['../public']` (or equivalent).
  2.  In `components/ui/button.stories.tsx` (lines 3, 98, 113):
      - Remove the `next/image` import.
      - Replace `<Image ... />` with `<img ... />`.
      - Ensure `src` paths are relative to `public` (e.g., `/icons/lucide-icon.svg`).
  3.  Test affected stories in Storybook to ensure images load correctly.
- **Done-When:** No `next/image` usage in stories; images render correctly via `<img>`.

### cr-08 Clarify Tailwind Directive Handling in Storybook

- **Problem:** Omitting `@tailwind` directives in `.storybook/preview.css` relies implicitly on `globals.css` import.
- **Impact:** Makes Tailwind integration less explicit and potentially fragile.
- **Chosen Fix:** Add a prominent comment in `preview.css` explaining the reliance on `globals.css` import.
- **Steps:**
  1.  Edit `.storybook/preview.css`.
  2.  Add a comment at the top explaining why `@tailwind` directives are omitted and confirming that importing `globals.css` in `preview.tsx` is the intended mechanism.
  3.  Visually verify styles in Storybook match the application.
- **Done-When:** A clarifying comment exists in `.storybook/preview.css`; styles are verified.

### cr-09 Document `CardAction` Subcomponent API

- **Problem:** The `CardAction` subcomponent lacks TSDoc comments.
- **Impact:** Creates an undocumented internal API surface, increasing friction.
- **Chosen Fix:** Add comprehensive TSDoc comments to the `CardAction` component definition.
- **Steps:**
  1.  Edit `components/ui/card.tsx`.
  2.  Add TSDoc comments above the `CardAction` definition (lines 61-72), explaining its purpose (e.g., container for actions in `CardHeader`), props, and usage context.
  3.  Verify Storybook's auto-generated docs pick up the comments.
- **Done-When:** `CardAction` component has clear TSDoc documentation.

### cr-16 Use Idiomatic React Import Style

- **Problem:** Non-idiomatic `import * as React from "react";` is used.
- **Impact:** Verbose and generally unnecessary with modern JSX transforms.
- **Chosen Fix:** Remove unnecessary imports or switch to standard `import React from "react";` / named imports.
- **Steps:**
  1.  Identify files using `import * as React` (e.g., `button.stories.tsx:3`, `textarea.stories.tsx:3`, `.storybook/preview.tsx:3`).
  2.  If only JSX is used, remove the import.
  3.  If React APIs (hooks, context) are used, change to `import React from "react";` or specific named imports (`import { useState } from "react";`).
- **Done-When:** React imports follow standard, idiomatic patterns.

### cr-06 Enforce Consistent Use of Library Components in Stories

- **Problem:** Stories bypass `Button`/`Label` components, using raw HTML and manual styling.
- **Impact:** Undermines library purpose, duplicates logic, risks inconsistency, masks component deficiencies.
- **Chosen Fix:** Refactor `Label` to handle `required` prop; replace all raw HTML in stories with library components.
- **Steps:**
  1.  Edit `components/ui/label.tsx`: ensure it accepts a `required?: boolean` prop and renders the required indicator internally based on it.
  2.  Audit stories (`card.stories.tsx:101`, `input.stories.tsx:73-77`, `label.stories.tsx`, `textarea.stories.tsx`) for raw `<button>`, `<label>`, and manual required indicator `<span>` elements.
  3.  Replace _all_ instances with the project's `Button` and `Label` components, utilizing the `required` prop on `Label`.
  4.  Rigorously verify visual consistency in Storybook.
- **Done-When:** No raw HTML elements for library-defined components exist in stories; `Label` handles `required` state internally.

### cr-04 Replace Fragile CSS State Simulation with Interaction Tests

- **Problem:** Interactive states are faked via custom CSS classes and wrappers.
- **Impact:** Brittle, complex, inaccurate visual representation, diverges from actual component styling.
- **Chosen Fix:** Eliminate CSS/wrappers; use Storybook's `play` function with `userEvent` for interaction testing.
- **Steps:**
  1.  Delete `components/ui/button-states.css`, `input-states.css`, `textarea-states.css`.
  2.  Remove the `InteractiveState*` wrapper components and their usage from stories.
  3.  Refactor affected stories to use the `play` function (`@storybook/addon-interactions`) with `userEvent` to programmatically trigger `:hover`, `:focus`, `:active` states.
  4.  Document that visual state verification relies on interaction tests or investigate pseudo-state addon integration.
- **Done-When:** No simulation CSS/wrappers remain; interactive states are tested via `play` functions.

### cr-12 Refactor Inconsistent Story Structure (`args` vs. `render`)

- **Problem:** Stories inconsistently use `render` for simple prop variations where `args` would suffice.
- **Impact:** Increases boilerplate and cognitive load, contradicts guidelines.
- **Chosen Fix:** Refactor simple stories to use the `args` property consistently.
- **Steps:**
  1.  Audit stories noted (`input.stories.tsx:64`, `label.stories.tsx`, `textarea.stories.tsx`).
  2.  Convert stories using `render` solely to set basic props on a single component instance to use the `args` property instead.
  3.  Reserve `render` for complex compositions or stateful logic.
- **Done-When:** Simple prop variations in stories consistently use the `args` property.

### cr-17 Improve Generic Story Names for Clarity

- **Problem:** Story names like "Default", "Basic", "WithLabel" are uninformative.
- **Impact:** Slightly hinders navigation and understanding within Storybook.
- **Chosen Fix:** Rename stories to be more descriptive of the state or variant shown.
- **Steps:**
  1.  Review story names in `*.stories.tsx` files.
  2.  Rename generic names to be specific (e.g., `Default` -> `Primary`, `WithLabel` -> `InputWithAssociatedLabel`).
- **Done-When:** Story names clearly describe the component state or scenario being demonstrated.

### cr-07 Audit and Remediate Risky Post-Commit Hook

- **Problem:** The post-commit hook runs an undocumented async command, logs insecurely to `/tmp/`, and lacks feedback.
- **Impact:** Opaque, potentially insecure, and unreliable automation.
- **Chosen Fix:** Audit necessity, document purpose, secure logging, provide feedback, and update format.
- **Steps:**
  1.  **Audit & Document:** Determine if the `glance` command is necessary. Document purpose, output, failure modes in `README.md` or `docs/`.
  2.  **Logging:** Change output redirection to `.logs/husky/glance-post-commit.log` (ensure `.logs` is gitignored). Set appropriate file permissions (`chmod 600`).
  3.  **Feedback:** Ensure hook provides clearer feedback on success/failure, or consider synchronous execution if failure should block (e.g., pre-push).
  4.  **Necessity/Format:** Evaluate if it belongs in commit hook vs CI. Address Husky v10 format update.
- **Done-When:** Hook is documented, logs securely, provides feedback, and its necessity/placement is confirmed.

### cr-10 Enhance Component Prop Documentation (`argTypes`)

- **Problem:** `argTypes` definitions omit many standard HTML attributes and relevant ARIA attributes.
- **Impact:** Reduces Storybook's value as interactive documentation and API reference.
- **Chosen Fix:** Systematically enhance `argTypes` for core UI components.
- **Steps:**
  1.  Audit `Button`, `Card`, `Input`, `Label`, `Textarea` components.
  2.  Enhance `meta.argTypes` in corresponding `.stories.tsx` files to include relevant pass-through HTML attributes (`id`, `className`, event handlers, form attributes) and ARIA attributes (`aria-label`, `aria-invalid`).
  3.  Provide brief descriptions and appropriate controls (`text`, `boolean`, `control: false`).
- **Done-When:** Core UI components have comprehensive `argTypes` covering common HTML/ARIA attributes.

### cr-11 Add Missing State and Edge Case Coverage in Stories

- **Problem:** Stories lack coverage for true interactive states and common edge cases.
- **Impact:** Limits Storybook's utility for robust visual testing, accessibility validation, and resilience demonstration.
- **Chosen Fix:** Augment stories with edge-case data and implement interaction tests for states.
- **Steps:**
  1.  Add specific stories for `Button`, `Input`, `Textarea`, `Card`, `Label` demonstrating behavior with edge cases (long strings, empty content, wrapping text).
  2.  Implement interaction tests using the `play` function (building on cr-04 fix) to cover `:hover`, `:focus`, `:active` states programmatically.
- **Done-When:** Stories include explicit examples and tests for common edge cases and interactive states.

## Standards Alignment

- **Simplicity First:** Fixes eliminate complex CSS simulations (cr-04), unnecessary global styles (cr-15), inconsistent story structures (cr-12), and opaque automation (cr-07).
- **Mandatory Modularity:** Decoupling Storybook from Next.js (cr-02), enforcing library component usage (cr-06), and ensuring portable documentation (cr-01) reinforce modularity.
- **Design for Testability:** Including stories in coverage (cr-03) and using proper interaction tests (cr-04, cr-11) improve testability and confidence.
- **Documentation Approach:** Restoring history (cr-05), fixing access (cr-01), linking guidelines (cr-14), documenting APIs (cr-09), enhancing prop docs (cr-10), and clarifying configurations (cr-08, cr-13) uphold documentation standards.
- **Coding Standards:** Enforcing consistency (cr-06, cr-12), portability (cr-01), and idiomatic patterns (cr-16, cr-18) aligns with established standards.

## Validation Checklist

- [ ] Automated tests (Vitest) pass, including coverage checks.
- [ ] Static analyzers (ESLint, TypeScript) pass without new warnings.
- [ ] Storybook builds successfully and all stories render correctly without errors.
- [ ] Manual review confirms documentation accessibility (cr-01), archive restoration (cr-05), and link updates (cr-14).
- [ ] Manual review confirms Storybook component consistency (cr-06) and state interactions (cr-04, cr-11).
- [ ] Post-commit hook (cr-07) logs correctly to the designated local directory (if retained).
- [ ] No new `npm audit` warnings introduced.
