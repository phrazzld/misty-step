```markdown
# Remediation Plan – Sprint 1

## Executive Summary

This plan targets critical and high-severity violations identified in the PLAN-2 Storybook implementation code review, prioritizing the restoration of modularity, accessibility, documentation integrity, and testability. We will first eliminate the framework dependency blocker, then restore lost documentation and fix test coverage configuration. Subsequently, we will address accessibility and component consistency issues, establishing a stable, compliant foundation before tackling medium and low-priority improvements.

## Strike List

| Seq | CR‑ID | Title                                                     | Effort | Owner?    |
| --- | ----- | --------------------------------------------------------- | ------ | --------- |
| 1   | cr‑01 | Remove Framework-Specific Component (`next/image`)        | xs     | Frontend  |
| 2   | cr‑04 | Reinstate Planning Documentation                          | xs     | Docs/Lead |
| 3   | cr‑05 | Remove Overly Broad Test Coverage Exclusion               | xs     | Frontend  |
| 4   | cr‑03 | Fix Accessibility Violations (Alt Text, ARIA Handling)    | s      | Frontend  |
| 5   | cr‑02 | Enforce Consistent Component Usage (Replace Raw HTML/CSS) | m      | Frontend  |
| 6   | cr‑06 | Complete Prop Documentation in `argTypes`                 | m      | Frontend  |
| 7   | cr‑09 | Document Custom `CardAction` Component (or Remove)        | s      | Frontend  |
| 8   | cr‑07 | Ensure Consistent Story Structure (Args vs. Render)       | s      | Frontend  |
| 9   | cr‑08 | Add Edge Case/State Coverage to Stories                   | m      | Frontend  |
| 10  | cr‑10 | Replace Hardcoded Unrealistic Data in Stories             | xs     | Frontend  |
| 11  | cr‑11 | Use Idiomatic React Import Style                          | xs     | Frontend  |
| 12  | cr‑15 | Use More Descriptive Story Names                          | s      | Frontend  |
| 13  | cr‑14 | Enhance `CONTRIBUTING-STORYBOOK.md`                       | xs     | Docs/Lead |
| 14  | cr‑13 | Reduce Story Definition Verbosity (Optional DRY)          | xs     | Frontend  |

_(Note: `cr-12` [Hardcoded Required Indicator] is addressed within `cr-02`)_

---

## Detailed Remedies

### cr‑01 Remove Framework-Specific Component (`next/image`)

- **Problem:** Stories directly import and use `next/image`, coupling the Storybook environment to Next.js internals.
- **Impact:** Violates **Mandatory Modularity** and **Strict Separation of Concerns**, risking Storybook build failures outside Next.js, preventing isolated component viewing, and adding unnecessary complexity.
- **Chosen Fix:** Replace all `next/image` usage in stories with standard `<img>` tags; ensure static assets are available to Storybook.
- **Steps:**
  1. Remove `import Image from "next/image";` from `components/ui/button.stories.tsx`.
  2. Replace `<Image ... />` instances (`button.stories.tsx:98`, `113`) with standard `<img src="..." width="..." height="..." alt="..." />`. Use appropriate `alt` text (see cr-03).
  3. Configure Storybook's `staticDirs` (in `.storybook/main.ts` or equivalent) if needed to serve the icon assets (e.g., from a `public/` directory).
- **Done‑When:** `next/image` is removed from stories; icons render correctly using `<img>`; Storybook builds and runs without Next.js context errors.

---

### cr‑04 Reinstate Planning Documentation

- **Problem:** Historical project planning documents (`PLAN-*.md`, etc.) were deleted, erasing project context and decision rationale.
- **Impact:** Loss of architectural history violates the **Documentation Approach**, hindering onboarding, maintenance, and understanding the "why" behind implementations.
- **Chosen Fix:** Restore deleted files from Git history and move them to a dedicated archive directory.
- **Steps:**
  1. Identify the commit hash immediately preceding the deletion of the `PLAN-*.md` files.
  2. Restore the files using Git (e.g., `git checkout <hash>^ -- PLAN-*.md PLAN-INDEX.md PLAN-ORIGINAL.md`).
  3. Create an `archive/` directory (e.g., `docs/archive/planning`).
  4. Move the restored planning files into `docs/archive/planning`.
  5. Add a brief note in the main `README.md` or contributing guide pointing to the archive for historical context.
- **Done‑When:** Planning documents are restored and accessible within the `archive/` directory; the archive location is documented.

---

### cr‑05 Remove Overly Broad Test Coverage Exclusion

- **Problem:** `vitest.config.ts` excludes `**/*.stories.{ts,tsx}` from test coverage analysis, potentially hiding untested logic within stories.
- **Impact:** Prevents accurate coverage tracking for story-embedded logic (helpers, interaction tests), violating **Design for Testability (Accurate Coverage)**.
- **Chosen Fix:** Remove the overly broad exclusion pattern and rely on Vitest's default behavior (covering files imported by tests).
- **Steps:**
  1. Edit `vitest.config.ts`.
  2. Remove the pattern `"**/*.stories.{ts,tsx}"` from the `coverage.exclude` array (line 24).
  3. Run the test coverage suite (`npm run test:coverage` or similar) to confirm it runs correctly and potentially identifies any newly included story files.
- **Done‑When:** Exclusion line is removed; test coverage runs successfully; configuration is committed.

---

### cr‑03 Fix Accessibility Violations (Alt Text, ARIA Handling)

- **Problem:** Images used as icons lack meaningful `alt` text; ARIA attributes (`aria-label`, `aria-required`) are used directly in story `args` without being defined in `argTypes`.
- **Impact:** Violates **Security Considerations (Accessibility)**, making UI elements inaccessible; creates fragile, undocumented accessibility implementations; hinders **Testability**.
- **Chosen Fix:** Provide meaningful `alt` text (or justify empty `alt`) for icons and explicitly define relevant accessibility props in `argTypes` for documentation and control.
- **Steps:**
  1.  **Button Story (`button.stories.tsx`):**
      - For `IconSize` (line 98) and `WithIcon` (line 113) `<img>` tags (updated in cr-01): Provide meaningful `alt` text (e.g., `alt="View details"`) if the icon conveys meaning not present in adjacent text or `aria-label`. If the icon is _purely_ decorative _and_ the button has text or a sufficient `aria-label`, use `alt=""` and add a comment justifying it. Icon-only buttons _must_ have an accessible name via `aria-label` or `alt`.
      - Add `aria-label` to `Button`'s `meta.argTypes` with a description (e.g., "Provides an accessible name for the button, especially useful for icon-only buttons.").
  2.  **Input Story (`input.stories.tsx`):**
      - Add `aria-required` to `Input`'s `meta.argTypes` with description. Ensure story `args` (line 86) correctly uses this prop.
  3.  **Textarea Story (`textarea.stories.tsx`):**
      - Add `aria-required` to `Textarea`'s `meta.argTypes` with description. Ensure story `args` (line 101) correctly uses this prop.
  4.  **Label Story (`label.stories.tsx`):**
      - Review if any standard ARIA props need documenting in `argTypes` based on common usage patterns (e.g., `aria-labelledby` relationships).
- **Done‑When:** `alt` text is meaningful or justified empty; `aria-label`, `aria-required` are defined in relevant `argTypes`; Storybook accessibility checks pass for these stories.

---

### cr‑02 Enforce Consistent Component Usage (Replace Raw HTML/CSS)

- **Problem:** Stories inconsistently use raw HTML elements (`<button>`, `<label>`, `<span>`) with hardcoded Tailwind classes instead of the project's `Button` and `Label` components.
- **Impact:** Undermines the component library (**Mandatory Modularity**), violates **Coding Standards (Consistency)**, duplicates logic (**Simplicity First**), risks visual inconsistencies, and potentially masks component deficiencies (e.g., `Label` state handling).
- **Chosen Fix:** Replace all raw HTML elements/styles in stories with the corresponding project components (`Button`, `Label`). Refactor the base `Label` component to handle `required` indication and `disabled` styling intrinsically.
- **Steps:**
  1.  **Refactor `Label` Component (`components/ui/label.tsx`):**
      - Add a `required?: boolean` prop.
      - Conditionally render a styled required indicator (e.g., `<span className="text-destructive">*</span>`) within the `Label` when `required={true}`.
      - Verify Radix primitives handle disabled state styling correctly via data attributes (`[data-disabled]`) when associated with a disabled input; remove any manual disabled styling logic if present.
  2.  **Card Story (`card.stories.tsx:101`):** Replace raw `<button>` with `<Button variant="secondary" size="sm">Action</Button>` (adjust props as needed).
  3.  **Input Story (`input.stories.tsx:73-77`):** Replace raw `<label>` with `<Label htmlFor="...">Email</Label>`.
  4.  **Label Story (`label.stories.tsx`):**
      - Remove raw `<span>` for required indicator (lines 32-33, 45, 61-62); use the new `required` prop on the `Label` component instead.
      - Remove manual disabled styles/classes; ensure disabled state is demonstrated by linking the `Label` to a disabled `Input` in a story.
  5.  **Textarea Story (`textarea.stories.tsx`):**
      - Ensure `Label` is used consistently (lines 72-73, 100-101).
      - Remove raw `<span>` for required indicator (line 94); use the new `required` prop on the `Label` component.
  6.  **Audit:** Review all stories again to ensure no raw HTML replacements remain for `Button` or `Label`.
- **Done‑When:** All raw HTML (`button`, `label`, style `span`s) are replaced; `Label` component handles `required`/`disabled` states internally; stories demonstrate correct component usage; visual consistency verified. _(Addresses cr-12)_

---

### cr‑06 Complete Prop Documentation in `argTypes`

- **Problem:** `argTypes` definitions omit many standard HTML attributes, accessibility attributes, and common event handlers relevant to the components.
- **Impact:** Reduces Storybook's interactive documentation value (**Documentation Approach**, **Design for Testability**), making the component API less clear and discoverable.
- **Chosen Fix:** Audit each component's props and update its `meta.argTypes` to include all relevant props a consumer might set.
- **Steps:**
  1.  **Audit & Update `argTypes` for:**
      - `Button`: Add `onClick` (control: false), `id`, `type`. (`aria-label` added in cr-03).
      - `Input`: Add `onChange`, `onBlur`, `onFocus` (all control: false), `id`, `name`, `placeholder`, `type`, `value`, `defaultValue`, `required`, `disabled`, `readOnly`. (`aria-required` added in cr-03). Consider `aria-invalid`, `aria-describedby`.
      - `Textarea`: Add `onChange`, `onBlur`, `onFocus` (all control: false), `id`, `name`, `placeholder`, `rows`, `value`, `defaultValue`, `required`, `disabled`, `readOnly`. (`aria-required` added in cr-03). Consider `aria-invalid`, `aria-describedby`.
      - `Label`: Add `htmlFor`, `id`.
      - `Card` (and subcomponents like `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`): Add common props like `id`, `className`.
  2.  **Refine:** Use `control: false` or `table: { disable: true }` for props like event handlers or complex objects not suitable for controls but needing documentation. Ensure clear `description` fields for all added props.
- **Done‑When:** `argTypes` for core UI components (Button, Input, Textarea, Label, Card) include comprehensive standard HTML, accessibility, and event props with appropriate controls/documentation settings.

---

### cr‑09 Document Custom `CardAction` Component (or Remove)

- **Problem:** The `CardAction` subcomponent used in `card.stories.tsx` is undocumented and potentially non-standard within the library.
- **Impact:** Introduces undocumented API (**Documentation Approach**), confuses consumers, potential violation of **Mandatory Modularity** if not properly integrated.
- **Chosen Fix:** Evaluate `CardAction`; if necessary, formally adopt, document, and export it; otherwise, remove it and achieve the layout with standard components/utilities. **Decision:** Assume `CardAction` is useful for layout; proceed to document.
- **Steps:**
  1.  **Document:** Add TSDoc comments to the `CardAction` component definition in `components/ui/card.tsx` explaining its purpose, props, and intended usage (e.g., "A container for action elements typically placed in the `CardHeader`, aligned to the end.").
  2.  **Export:** Ensure `CardAction` is exported from `components/ui/card.tsx` alongside other subcomponents.
  3.  **Storybook:** Explicitly list `CardAction` in `card.stories.tsx` `meta.subcomponents` if desired for documentation clarity. Ensure the `FullExample` story clearly demonstrates its usage.
  4.  **Standards:** Briefly verify `CardAction` implementation aligns with project coding and styling standards.
- **Done‑When:** `CardAction` is documented via TSDoc; exported correctly; usage is clear in Storybook; component adheres to standards.

---

### cr‑07 Ensure Consistent Story Structure (Args vs. Render)

- **Problem:** Stories within the same file or across similar components inconsistently use the `args` property versus the `render` function for defining variations.
- **Impact:** Increases cognitive load, violates **Coding Standards (Consistency)** and **Simplicity First**.
- **Chosen Fix:** Establish and enforce a consistent pattern: Prefer `args` for simple prop variations on a single component instance. Use `render` _only_ when necessary for multi-component compositions, stateful wrappers, or complex setup logic.
- **Steps:**
  1.  **Standardize:** Explicitly adopt the `args`-first approach.
  2.  **Audit & Refactor:**
      - Review stories in `input.stories.tsx`, `label.stories.tsx`, `textarea.stories.tsx`.
      - Convert stories currently using `render` for simple prop changes (like setting `required` or `disabled` on a single component) back to using the `args` property.
      - Retain `render` for stories that compose multiple components (e.g., `Input` with `Label`, `Textarea` with `Button`).
- **Done‑When:** All stories across `input`, `label`, `textarea` (and others reviewed) follow the consistent `args`-first pattern where applicable.

---

### cr‑08 Add Edge Case and State Coverage to Stories

- **Problem:** Stories primarily cover basic variants and lack explicit coverage for crucial interactive states (`hover`, `focus`, `active`), error states, and common edge cases.
- **Impact:** Limits Storybook's effectiveness for visual regression testing and comprehensive component documentation (**Testing Strategy**, **Documentation Approach**).
- **Chosen Fix:** Augment stories for interactive components to explicitly demonstrate missing states and add stories showcasing common edge cases.
- **Steps:**
  1.  **Interactive States (Button, Input, Textarea):**
      - Add stories demonstrating `:hover`, `:focus`, and `:active` states. Utilize Storybook's pseudo-state capabilities (e.g., via `parameters.pseudo` or interaction tests with `play` function) where possible. Name stories clearly (e.g., `Hover`, `FocusVisible`).
  2.  **Error States (Input, Textarea):**
      - Add stories showing the components in an error/invalid state (e.g., using `aria-invalid="true"` and applying relevant visual styles if not automatic). Name clearly (e.g., `ErrorState`).
  3.  **Edge Cases:**
      - Add stories for: Button with very long text; Input/Textarea with long placeholder/value; Label with long text; Card with minimal/overflowing content. Name clearly (e.g., `LongContent`, `EmptyContent`).
- **Done‑When:** New stories demonstrating hover, focus, active, error states, and relevant edge cases are present for Button, Input, Textarea, Label, Card.

---

### cr‑10 Replace Hardcoded Unrealistic Data in Stories

- **Problem:** Card stories use hardcoded future dates ("April ... 2025"), which are unrealistic, misleading, and guaranteed to become stale.
- **Impact:** Reduces the story's value as a reliable example (**Testing Strategy**, **Documentation Approach**).
- **Chosen Fix:** Replace hardcoded future dates with realistic static examples or relative descriptions.
- **Steps:**
  1.  Edit `components/ui/card.stories.tsx`.
  2.  Locate the hardcoded future dates (lines 56, 77, 111, 112).
  3.  Replace them with plausible static past dates (e.g., "October 26, 2023") or relative descriptions ("Updated 3 days ago"). Static dates are preferred for consistency.
- **Done‑When:** All hardcoded future dates are replaced with realistic, static data.

---

### cr‑11 Use Idiomatic React Import Style

- **Problem:** Uses verbose `import * as React from "react";` instead of relying on modern JSX transform's implicit import or standard `import React from "react";`.
- **Impact:** Minor violation of **Coding Standards (Idiomatic Patterns)**.
- **Chosen Fix:** Remove explicit `* as React` imports where the modern JSX transform suffices. Use `import React from "react";` only if React APIs (hooks, etc.) are directly used.
- **Steps:**
  1.  Remove `import * as React from "react";` from `button.stories.tsx:3` and `textarea.stories.tsx:3` (assuming no React hooks are used directly in the story file scope).
  2.  Verify builds pass.
- **Done‑When:** Unnecessary React imports are removed.

---

### cr‑15 Use More Descriptive Story Names

- **Problem:** Generic story names ("Default", "Basic", "FullExample") make it harder to quickly understand the scenario being demonstrated.
- **Impact:** Minor violation of **Coding Standards (Clarity)**, slightly hinders Storybook usability.
- **Chosen Fix:** Rename stories using more descriptive names reflecting the specific state or configuration.
- **Steps:**
  1.  Review all `*.stories.tsx` files.
  2.  Rename stories based on their content: e.g., `Default` -> `Primary` (Button), `Basic` -> `ContentOnly` (Card), `FullExample` -> `CompleteLayout` (Card), `Default` -> `BasicInput`, `Required` -> `RequiredInput`, etc.
- **Done‑When:** Stories across components have clear, descriptive names.

---

### cr‑14 Enhance `CONTRIBUTING-STORYBOOK.md`

- **Problem:** The new contribution guidelines lack detail on edge cases, complex children, and linking upstream docs.
- **Impact:** Incomplete guidance (**Documentation Approach**).
- **Chosen Fix:** Enhance `CONTRIBUTING-STORYBOOK.md` with sections covering the missing points.
- **Steps:**
  1.  Edit `docs/CONTRIBUTING-STORYBOOK.md`.
  2.  Add points or sections covering:
      - Importance of adding stories for edge cases and interaction states (referencing cr-08).
      - Guidance on using `render` vs. `args` for complex children/compositions (referencing cr-07 standard).
      - Recommendation to link to original Shadcn documentation where relevant for deeper API context.
- **Done‑When:** `CONTRIBUTING-STORYBOOK.md` includes enhanced guidance.

---

### cr‑13 Reduce Story Definition Verbosity (Optional DRY)

- **Problem:** Defining each story fully (`export const Name: Story = { args: { ... } };`) can be repetitive for simple variants.
- **Impact:** Minor verbosity (**Simplicity First**). Current explicit approach is acceptable.
- **Chosen Fix:** No action required unless the team prefers the `Template.bind({})` pattern for reducing boilerplate in files with many simple variants (like Button). Maintain current style otherwise.
- **Steps:**
  1.  Team decision: Stick with explicit definitions for clarity or adopt `Template.bind({})` for specific files.
  2.  If adopting template, refactor relevant files (e.g., `button.stories.tsx`).
- **Done‑When:** Team decision made and documented, or refactoring completed if chosen.

---

## Standards Alignment

- **Modularity & Separation of Concerns:** Enforced by `cr-01` (removing framework dependency) and `cr-02` (using library components).
- **Simplicity First:** Promoted by `cr-01` (removing complexity), `cr-02` (reducing duplication), `cr-07` (consistent patterns), `cr-11` (idiomatic imports), and potentially `cr-13`.
- **Coding Standards:** Addressed by `cr-02` & `cr-07` (consistency), `cr-11` (idiomatic code), `cr-15` (clarity).
- **Design for Testability:** Improved by `cr-03` & `cr-06` (documented APIs in `argTypes`), `cr-05` (accurate coverage), and `cr-08` (visual test coverage for states/edges).
- **Security (Accessibility):** Directly addressed by `cr-03`.
- **Documentation Approach:** Improved by `cr-03`, `cr-06` (better Storybook docs), `cr-04` (restored context), `cr-08` (documenting states), `cr-09` (documenting components), `cr-10` (realistic data), `cr-14` (better guidelines).

## Validation Checklist

- [ ] All automated tests (unit, integration, e2e if applicable) pass.
- [ ] Linting (`eslint`), formatting (`prettier`), and type checking (`tsc --noEmit`) pass without errors.
- [ ] Test coverage meets project standards after `cr-05` fix.
- [ ] `pnpm audit` reports no new high/critical vulnerabilities.
- [ ] Storybook builds successfully (`pnpm build-storybook`).
- [ ] **Manual Storybook Review:**
  - [ ] All stories render correctly without framework-specific errors (`cr-01`).
  - [ ] Stories consistently use project components (`Button`, `Label`), not raw HTML (`cr-02`).
  - [ ] Accessibility checks (`@storybook/addon-a11y`) pass for reviewed stories (`cr-03`).
  - [ ] `argTypes` controls/docs reflect complete props for major components (`cr-06`).
  - [ ] `CardAction` documentation/usage is clear (`cr-09`).
  - [ ] Story structure (`args`/`render`) is consistent (`cr-07`).
  - [ ] Stories for interactive states and edge cases are present and render correctly (`cr-08`).
  - [ ] Example data is realistic (no future dates) (`cr-10`).
  - [ ] Story names are descriptive (`cr-15`).
- [ ] Historical planning documents are accessible in `docs/archive/planning` (`cr-04`).
- [ ] `CONTRIBUTING-STORYBOOK.md` contains updated guidance (`cr-14`).
```
