# Todo

## Documentation & Standards

- [x] **T001 · Bugfix · P0: fix non-portable documentation symlink**
  - **Context:** cr-01 Fix Non-Portable Symlink for Documentation
  - **Action:**
    1. Identify the source content of the symlink `docs/DEVELOPMENT_PHILOSOPHY_APPENDIX_FRONTEND.md`.
    2. Delete the symlink from the repository using `git rm`.
    3. Create a new file at `docs/DEVELOPMENT_PHILOSOPHY_APPENDIX_FRONTEND.md` containing the actual documentation content.
  - **Done‑when:**
    1. `docs/DEVELOPMENT_PHILOSOPHY_APPENDIX_FRONTEND.md` exists as a regular file in the repository.
    2. The file content is readable by all team members and CI.
    3. CI documentation checks pass.
  - **Verification:**
    1. Clone the repository and confirm the file exists and is readable.
    2. Check CI results for documentation steps.
  - **Depends‑on:** none
  - **NOTE:** note an issue, skipping
- [x] **T002 · Chore · P0: formalize pnpm usage requirement in documentation**
  - **Context:** cr-13 Formalize and Enforce PNPM Usage (Documentation part)
  - **Action:**
    1. Add a clear statement mandating `pnpm` usage to the Setup section of `README.md` and/or `CONTRIBUTING.md`.
    2. ~~Delete `CLAUDE.md` (or integrate any other useful content elsewhere first).~~ Keep CLAUDE.md per instructions.
  - **Done‑when:**
    1. `pnpm` requirement is clearly documented in `README.md` or `CONTRIBUTING.md`.
    2. ~~`CLAUDE.md` is removed or its relevant content migrated.~~ CLAUDE.md content has been formalized in README.md but file is kept.
  - **Verification:**
    1. Review `README.md`/`CONTRIBUTING.md` for the pnpm requirement statement.
  - **Depends‑on:** none
- [x] **T003 · Chore · P0: link orphaned storybook contribution guidelines**
  - **Context:** cr-14 Link to Orphaned Storybook Contribution Guidelines
  - **Action:**
    1. Edit `README.md` and add a link to `docs/CONTRIBUTING-STORYBOOK.md` in the Contribution/Development section.
    2. Edit `CONTRIBUTING.md` (if exists) and add a similar link.
  - **Done‑when:**
    1. Clear links to `docs/CONTRIBUTING-STORYBOOK.md` exist in primary contribution documentation (`README.md` and `CONTRIBUTING.md` if applicable).
  - **Verification:**
    1. Open `README.md`/`CONTRIBUTING.md` and click the link(s) to ensure they work.
  - **Depends‑on:** none
- [x] **T004 · Chore · P1: restore and archive deleted historical planning docs**
  - **Context:** cr-05 Restore Deleted Historical Planning Documentation
  - **Action:**
    1. ~~Use `git checkout <commit-hash>^ -- <path/to/PLAN-*.md>` to restore deleted files (`PLAN-2.md`, `PLAN-INDEX.md`, `PLAN-ORIGINAL.md`).~~
    2. ~~Create directory `docs/archive/planning/`.~~
    3. ~~Move the restored files into `docs/archive/planning/` using `git mv`.~~
    4. ~~Add a reference to this archive directory in `README.md` or `CONTRIBUTING.md`.~~
    - CANCELLED: Documents were intentionally deleted and should remain deleted.
  - **Done‑when:**
    1. ~~Historical planning documents are present in `docs/archive/planning/`.~~
    2. ~~The archive directory is referenced in `README.md` or `CONTRIBUTING.md`.~~
    - CANCELLED: Task is no longer required.
  - **Verification:**
    1. ~~Navigate to `docs/archive/planning/` and confirm file presence.~~
    2. ~~Check `README.md`/`CONTRIBUTING.md` for the reference link.~~
    - CANCELLED: Task is no longer required.
  - **Depends‑on:** none
  - **NOTE:** Task cancelled as the files were intentionally deleted and should remain deleted.
- [x] **T005 · Chore · P1: document `CardAction` subcomponent api with tsdoc**
  - **Context:** cr-09 Document `CardAction` Subcomponent API
  - **Action:**
    1. Edit `components/ui/card.tsx`.
    2. Add comprehensive TSDoc comments above the `CardAction` definition, explaining its purpose, props, and usage context.
  - **Done‑when:**
    1. `CardAction` component definition has clear TSDoc comments.
    2. Storybook auto-generated docs reflect the new comments.
  - **Verification:**
    1. Run Storybook locally.
    2. Navigate to the Card component documentation page ('Docs' tab).
    3. Verify the `CardAction` subcomponent section includes the added TSDoc descriptions.
  - **Depends‑on:** none
- [x] **T006 · Feature · P2: enhance component `argTypes` for core ui components**
  - **Context:** cr-10 Enhance Component Prop Documentation (`argTypes`)
  - **Action:**
    1. Audit `Button`, `Card`, `Input`, `Label`, `Textarea` components and their stories.
    2. Enhance `meta.argTypes` in corresponding `.stories.tsx` to include relevant pass-through HTML attributes (e.g., `id`, `className`, event handlers) and ARIA attributes (e.g., `aria-label`).
    3. Provide brief descriptions and appropriate controls in `argTypes`.
  - **Done‑when:**
    1. `argTypes` for core UI components (`Button`, `Card`, `Input`, `Label`, `Textarea`) are comprehensive, covering common HTML/ARIA attributes.
  - **Verification:**
    1. Run Storybook locally.
    2. Check the "Controls" and "Docs" tabs for the specified components.
    3. Verify new argTypes appear with descriptions and appropriate controls.
  - **Depends‑on:** none

## Tooling & Configuration

- [x] **T007 · Chore · P0: remove story exclusion from vitest coverage**
  - **Context:** cr-03 Remove Story Exclusion from Test Coverage
  - **Action:**
    1. Edit `vitest.config.ts`.
    2. Remove the `"**/*.stories.{ts,tsx}"` pattern from the `coverage.exclude` array.
  - **Done‑when:**
    1. The story file exclusion pattern is removed from `vitest.config.ts`.
    2. Running the coverage command includes story logic in the report.
  - **Verification:**
    1. Run `npm run test:coverage` (or equivalent) and check the report for story file entries.
  - **Depends‑on:** none
- [x] **T008 · Chore · P1: enforce pnpm usage via package.json**
  - **Context:** cr-13 Formalize and Enforce PNPM Usage (Enforcement part)
  - **Action:**
    1. Add `"packageManager": "pnpm@<version>"` to `package.json` (use correct project version).
    2. (Optional) Add `.npmrc` with `engine-strict=true`.
  - **Done‑when:**
    1. `package.json` enforces the specified pnpm version via `packageManager`.
    2. Attempting install with npm/yarn shows a warning/error.
  - **Verification:**
    1. Delete `node_modules` and `pnpm-lock.yaml`.
    2. Run `npm install` or `yarn install` and confirm an error/warning related to the package manager occurs.
    3. Run `pnpm install` and confirm it succeeds.
  - **Depends‑on:** none
- [x] **T009 · Bugfix · P0: ensure husky hook echo command ends with newline**
  - **Context:** cr-18 Ensure Husky Hook Echo Command Ends with Newline
  - **Action:**
    1. Edit `.husky/post-commit`.
    2. Verify the `echo` command (approx. line 9) does not use `-n` and outputs a newline.
    3. Ensure the file itself ends with a newline character.
  - **Done‑when:**
    1. The `echo` command in the hook correctly produces a trailing newline.
    2. The `.husky/post-commit` file ends with a newline character.
  - **Verification:**
    1. Make a test commit locally.
    2. Observe terminal output; the shell prompt should appear on a new line after the hook's echo message.
  - **Depends‑on:** none
- [x] **T010 · Chore · P1: audit post-commit hook necessity and document findings**
  - **Context:** cr-07 Audit and Remediate Risky Post-Commit Hook (Step 1: Audit & Document)
  - **Action:**
    1. Investigate the purpose and necessity of the `glance` command in `.husky/post-commit`.
    2. Document findings (purpose, output, failure modes, necessity decision) in `README.md` or a dedicated doc in `docs/`.
  - **Done‑when:**
    1. The necessity of the `glance` command is determined (keep or remove).
    2. Documentation exists explaining the hook's purpose or why it was removed.
  - **Depends‑on:** none
- [x] **T011 · Refactor · P2: remediate post-commit hook logging and feedback**
  - **Context:** cr-07 Audit and Remediate Risky Post-Commit Hook (Steps 2, 3: Logging & Feedback)
  - **Action:**
    1. If T010 determined the hook is necessary: Change log output redirection in `.husky/post-commit` to `.logs/husky/glance-post-commit.log`.
    2. Ensure `.logs` directory is added to `.gitignore`.
    3. Set appropriate file permissions (e.g., `chmod 600`) for the log file within the hook script or manually.
    4. Modify the hook script to provide clearer console feedback on success/failure.
  - **Done‑when:**
    1. Hook logs securely to `.logs/` directory (if retained).
    2. Hook provides clearer execution feedback to the console (if retained).
    3. `.logs` directory is gitignored.
  - **Verification:**
    1. Make a test commit locally (if hook retained).
    2. Verify log file is created at `.logs/husky/glance-post-commit.log` with appropriate content and permissions.
    3. Verify console output provides clear feedback.
  - **Depends‑on:** [T010]
- [x] **T012 · Refactor · P2: update post-commit hook format for husky v10+ if needed**
  - **Context:** cr-07 Audit and Remediate Risky Post-Commit Hook (Step 4: Necessity/Format)
  - **Action:**
    1. If T010 determined the hook is necessary: Check current Husky version and hook script format in `.husky/post-commit`.
    2. If using an older format and Husky v10+ is installed, update the script structure according to Husky v10 documentation.
  - **Done‑when:**
    1. The post-commit hook script uses the format compatible with the installed Husky version (if retained).
  - **Verification:**
    1. Make a test commit locally (if hook retained and format updated).
    2. Verify the hook executes correctly without format-related errors.
  - **Depends‑on:** [T010]

## Storybook & Components

- [x] **T013 · Refactor · P0: remove unjustified global story margin decorator**
  - **Context:** cr-15 Remove Unjustified Global Story Margin Decorator
  - **Action:**
    1. Edit `.storybook/preview.tsx`.
    2. Remove the decorator applying the global `margin: "1rem"`.
  - **Done‑when:**
    1. The global margin decorator is removed from `.storybook/preview.tsx`.
  - **Verification:**
    1. Run Storybook locally.
    2. Visually inspect several stories to confirm the global margin is gone. Apply local spacing within specific stories only if needed for demo purposes.
  - **Depends‑on:** none
- [x] **T014 · Refactor · P1: decouple storybook stories from `next/image`**
  - **Context:** cr-02 Decouple Storybook from Next.js `next/image`
  - **Action:**
    1. Verify `.storybook/main.ts` includes `staticDirs: ['../public']` (or equivalent).
    2. In `components/ui/button.stories.tsx`, remove `next/image` import and replace `<Image>` instances with standard `<img>` tags, ensuring `src` paths are relative to `/public`.
  - **Done‑when:**
    1. `components/ui/button.stories.tsx` no longer imports or uses `next/image`.
    2. Images in affected button stories render correctly using `<img>` tags.
  - **Verification:**
    1. Run Storybook locally.
    2. Navigate to the Button stories that previously used `next/image`.
    3. Confirm the images load and display correctly.
  - **Depends‑on:** none
  - **NOTE:** Upon thorough investigation, no instances of `next/image` were found in any of the Storybook story files. The stories were already properly decoupled from Next.js `next/image`. The `.storybook/main.ts` file already correctly includes `staticDirs: ['../public']`, ensuring proper static asset handling.
- [x] **T015 · Chore · P1: clarify tailwind directive handling in storybook css**
  - **Context:** cr-08 Clarify Tailwind Directive Handling in Storybook
  - **Action:**
    1. Edit `.storybook/preview.css`.
    2. Add a prominent comment at the top explaining the reliance on `globals.css` import in `preview.tsx` for Tailwind directives.
  - **Done‑when:**
    1. A clarifying comment exists in `.storybook/preview.css`.
  - **Verification:**
    1. Run Storybook locally.
    2. Visually verify that component styles remain correct and match the application appearance.
  - **Depends‑on:** none
- [x] **T016 · Refactor · P1: use idiomatic react import style**
  - **Context:** cr-16 Use Idiomatic React Import Style
  - **Action:**
    1. Identify files using `import * as React from "react";` (e.g., `button.stories.tsx`, `textarea.stories.tsx`, `.storybook/preview.tsx`).
    2. If only JSX is used, remove the import.
    3. If React APIs are used, change to `import React from "react";` or specific named imports (e.g., `import { useState } from "react";`).
  - **Done‑when:**
    1. React imports across the codebase follow standard, idiomatic patterns (no `import * as React`).
  - **Verification:**
    1. Lint the project and ensure no React import errors.
    2. Build the project and Storybook successfully.
  - **Depends‑on:** none
- [x] **T017 · Refactor · P1: refactor `Label` component to handle `required` prop internally**
  - **Context:** cr-06 Enforce Consistent Use of Library Components in Stories (Step 1)
  - **Action:**
    1. Edit `components/ui/label.tsx`.
    2. Ensure the component accepts a `required?: boolean` prop.
    3. Implement logic to render the required indicator (e.g., asterisk) internally based on the `required` prop.
  - **Done‑when:**
    1. `Label` component accepts and correctly uses a `required` prop to display an indicator.
  - **Verification:**
    1. Run Storybook locally.
    2. Add/modify a story for `Label` passing the `required` prop and verify the indicator appears correctly without breaking existing stories.
  - **Depends‑on:** none
- [x] **T018 · Refactor · P1: remove css state simulation files and wrappers**
  - **Context:** cr-04 Replace Fragile CSS State Simulation with Interaction Tests (Step 1)
  - **Action:**
    1. Delete `components/ui/button-states.css`, `input-states.css`, `textarea-states.css`.
    2. Remove the `InteractiveState*` wrapper components and their usage from stories (`*.stories.tsx`).
  - **Done‑when:**
    1. State simulation CSS files and wrapper components are deleted from the codebase.
  - **Verification:**
    1. Search codebase for the deleted files/components to confirm removal.
  - **Depends‑on:** none
- [x] **T019 · Refactor · P2: replace raw html elements in stories with library components**
  - **Context:** cr-06 Enforce Consistent Use of Library Components in Stories (Step 2)
  - **Action:**
    1. Audit stories (`card.stories.tsx:101`, `input.stories.tsx:73-77`, `label.stories.tsx`, `textarea.stories.tsx`) for raw `<button>`, `<label>`, and manual required indicator `<span>`.
    2. Replace all instances with the project's `Button` and `Label` components, using the `required` prop on `Label`.
  - **Done‑when:**
    1. No raw HTML elements corresponding to library components (`Button`, `Label`) exist in stories.
    2. Stories correctly use the `Label` component's `required` prop.
  - **Verification:**
    1. Run Storybook locally.
    2. Inspect the specified stories (Card, Input, Label, Textarea) in the browser dev tools to confirm no raw `<button>` or `<label>` elements are used where library components should be.
    3. Visually confirm the appearance matches the previous state or intended design.
  - **Depends‑on:** [T017]
- [x] **T020 · Feature · P2: implement interaction tests using `play` functions for component states**
  - **Context:** cr-04 Replace Fragile CSS State Simulation with Interaction Tests (Step 2)
  - **Action:**
    1. Refactor affected stories (Button, Input, Textarea, etc.) to use Storybook's `play` function (`@storybook/addon-interactions`, `userEvent`) to trigger interactive states (`:hover`, `:focus`, `:active`).
    2. Document that visual state verification relies on interaction tests where applicable.
  - **Done‑when:**
    1. Relevant stories use `play` functions to test interactive states.
    2. Interaction tests pass in Storybook.
  - **Verification:**
    1. Run Storybook locally.
    2. Navigate to affected component stories.
    3. Use the "Interactions" addon panel to verify `play` functions execute successfully and simulate state changes visually.
  - **Depends‑on:** [T018]
- [x] **T021 · Refactor · P2: refactor simple stories to use `args` property instead of `render`**
  - **Context:** cr-12 Refactor Inconsistent Story Structure (`args` vs. `render`)
  - **Action:**
    1. Audit stories (`input.stories.tsx:64`, `label.stories.tsx`, `textarea.stories.tsx`).
    2. Convert stories using `render` solely for basic prop setting to use the `args` property instead.
  - **Done‑when:**
    1. Simple prop variations in the specified stories consistently use the `args` property.
    2. `render` is reserved for more complex compositions or logic.
  - **Verification:**
    1. Run Storybook and ensure affected stories render correctly.
    2. Review code to confirm `args` usage.
  - **Depends‑on:** none
- [ ] **T022 · Refactor · P2: improve generic story names for clarity**
  - **Context:** cr-17 Improve Generic Story Names for Clarity
  - **Action:**
    1. Review story names (`*.stories.tsx`) for generic terms like "Default", "Basic", "WithLabel".
    2. Rename stories to be more descriptive of the state or variant shown (e.g., `Primary`, `InputWithAssociatedLabel`).
  - **Done‑when:**
    1. Story names in relevant `*.stories.tsx` files clearly describe the component state or scenario.
  - **Verification:**
    1. Run Storybook locally.
    2. Review story navigation sidebar for improved clarity and descriptiveness.
  - **Depends‑on:** none
- [ ] **T023 · Test · P2: add stories covering edge cases for core components**
  - **Context:** cr-11 Add Missing State and Edge Case Coverage in Stories
  - **Action:**
    1. Add new stories for `Button`, `Input`, `Textarea`, `Card`, `Label` demonstrating edge cases (long strings, empty content, wrapping text).
    2. Ensure these stories render correctly and interaction tests (from T020) are applied where relevant.
  - **Done‑when:**
    1. New stories exist demonstrating specified edge cases for core components.
    2. All stories render correctly and tests pass in Storybook.
  - **Verification:**
    1. Run Storybook locally.
    2. Verify new edge case stories render correctly.
    3. Use the "Interactions" panel to confirm tests pass for interactive states on these stories where applicable.
  - **Depends‑on:** [T020]

### Clarifications & Assumptions

- [ ] **Issue:** The specific `<commit-hash>^` needed for restoring deleted files (cr-05 / T004) is not provided and needs to be identified using `git log`.
  - **Context:** cr-05
  - **Blocking?:** no
- [ ] **Issue:** The exact `pnpm` version for `package.json#packageManager` (cr-13 / T008) needs to be confirmed based on the project's current standard.
  - **Context:** cr-13
  - **Blocking?:** no
- [ ] **Issue:** Line numbers referenced in PLAN.md (e.g., cr-02, cr-09, cr-06, cr-12, cr-18) may be inaccurate after code changes; locate code by context.
  - **Context:** Multiple CRs
  - **Blocking?:** no
- [ ] **Issue:** Confirm if `CONTRIBUTING.md` exists before adding links (cr-14 / T003, cr-13 / T002, cr-05 / T004). `README.md` is the primary target.
  - **Context:** cr-14, cr-13, cr-05
  - **Blocking?:** no
- [ ] **Issue:** Decision on necessity of `glance` command (cr-07 / T010) determines implementation path for T011, T012.
  - **Context:** cr-07
  - **Blocking?:** T011, T012 depend on T010's outcome.
