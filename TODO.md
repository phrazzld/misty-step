```markdown
# Todo

## Storybook / Configuration & Core

- [x] **T001 · refactor · P0: remove next/image usage in button stories**
  - **Context:** cr‑01 Remove Framework-Specific Component (`next/image`)
  - **Action:**
    1. Remove `import Image from "next/image";` from `components/ui/button.stories.tsx`.
    2. Replace `<Image ... />` instances (lines ~98, ~113) with standard `<img>` tags (use placeholder `alt` for now, addressed in T005).
  - **Done‑when:**
    1. `next/image` import and usage are removed from `button.stories.tsx`.
    2. Storybook builds and runs without Next.js context errors related to Image.
  - **Verification:**
    1. Run `pnpm storybook`.
    2. Check browser console for errors when viewing Button stories.
  - **Depends‑on:** none
- [x] **T002 · chore · P2: configure storybook staticdirs for assets**
  - **Context:** cr‑01 Remove Framework-Specific Component (`next/image`) - Step 3
  - **Action:**
    1. Configure Storybook's `staticDirs` in `.storybook/main.ts` (or equivalent) to serve icon assets (e.g., from `public/`).
  - **Done‑when:**
    1. `staticDirs` configuration is added/updated.
    2. Icons used in stories (via `<img>` tags) render correctly.
  - **Verification:**
    1. Run `pnpm storybook`.
    2. Navigate to Button stories (`IconSize`, `WithIcon`). Verify icons load and render correctly via `<img>`.
  - **Depends‑on:** T001
- [x] **T004 · chore · P2: remove stories exclusion from vitest coverage config**
  - **Context:** cr‑05 Remove Overly Broad Test Coverage Exclusion
  - **Action:**
    1. Edit `vitest.config.ts` and remove the pattern `"**/*.stories.{ts,tsx}"` from the `coverage.exclude` array.
    2. Run the test coverage suite (`npm run test:coverage` or similar).
  - **Done‑when:**
    1. Exclusion line is removed from `vitest.config.ts`.
    2. Test coverage suite runs successfully and potentially includes story files in analysis.
  - **Depends‑on:** none

## Storybook / Accessibility (A11y)

- [x] **T005 · refactor · P1: add meaningful alt text to button story images**
  - **Context:** cr‑03 Fix Accessibility Violations (Alt Text, ARIA Handling) - Step 1 (Button)
  - **Action:**
    1. In `button.stories.tsx`, update the `<img>` tags (from T001) with meaningful `alt` text or `alt=""` (if purely decorative + button has text/aria-label) with a comment justifying empty alt.
  - **Done‑when:**
    1. `<img>` tags in Button stories have appropriate `alt` attributes.
    2. Storybook a11y addon passes for image alt text checks on relevant stories.
  - **Verification:**
    1. Run Storybook, navigate to Button stories with icons.
    2. Inspect `<img>` elements for correct `alt` text.
    3. Check Accessibility addon panel for violations.
  - **Depends‑on:** T001
- [x] **T006 · refactor · P1: define aria-label in button argtypes**
  - **Context:** cr‑03 Fix Accessibility Violations (Alt Text, ARIA Handling) - Step 1 (Button)
  - **Action:**
    1. Edit `components/ui/button.stories.tsx` and add `aria-label` to `meta.argTypes` with a description.
  - **Done‑when:**
    1. `aria-label` is documented in Storybook argTypes for the Button component.
  - **Verification:**
    1. Run Storybook, check Button component's "Controls" / "Docs" tabs for `aria-label`.
  - **Depends‑on:** none
- [x] **T007 · refactor · P1: define aria-required in input argtypes**
  - **Context:** cr‑03 Fix Accessibility Violations (Alt Text, ARIA Handling) - Step 2 (Input)
  - **Action:**
    1. Edit `components/ui/input.stories.tsx` and add `aria-required` to `meta.argTypes` with a description.
  - **Done‑when:**
    1. `aria-required` is documented in Storybook argTypes for the Input component.
  - **Verification:**
    1. Run Storybook, check Input component's "Controls" / "Docs" tabs for `aria-required`.
  - **Depends‑on:** none
- [x] **T008 · refactor · P1: define aria-required in textarea argtypes**
  - **Context:** cr‑03 Fix Accessibility Violations (Alt Text, ARIA Handling) - Step 3 (Textarea)
  - **Action:**
    1. Edit `components/ui/textarea.stories.tsx` and add `aria-required` to `meta.argTypes` with a description.
  - **Done‑when:**
    1. `aria-required` is documented in Storybook argTypes for the Textarea component.
  - **Verification:**
    1. Run Storybook, check Textarea component's "Controls" / "Docs" tabs for `aria-required`.
  - **Depends‑on:** none
- [x] **T009 · refactor · P2: review and define standard aria props in label argtypes**
  - **Context:** cr‑03 Fix Accessibility Violations (Alt Text, ARIA Handling) - Step 4 (Label)
  - **Action:**
    1. Review `components/ui/label.stories.tsx` for common ARIA props (e.g., `aria-labelledby`).
    2. Add any missing relevant standard ARIA props to `meta.argTypes` with descriptions.
  - **Done‑when:**
    1. Label `argTypes` include documentation for relevant standard ARIA props.
  - **Depends‑on:** none

## Storybook / Component Consistency & Refinement

- [ ] **T010 · refactor · P1: refactor label component for required prop and disabled state handling**
  - **Context:** cr‑02 Enforce Consistent Component Usage - Step 1 (Refactor Label)
  - **Action:**
    1. Edit `components/ui/label.tsx`, add `required?: boolean` prop.
    2. Conditionally render required indicator (`*`) within the component based on the prop.
    3. Verify Radix primitives handle disabled styling via `[data-disabled]`; remove manual disabled styling logic if present.
  - **Done‑when:**
    1. Label component accepts `required` prop and renders indicator correctly.
    2. Label component styles correctly via data attributes when associated with a disabled input.
    3. No manual disabled styling logic remains in the Label component.
  - **Verification:**
    1. Create/update a story demonstrating the `required` prop visually.
    2. Create/update a story linking Label via `htmlFor` to a disabled input, verifying the Label's disabled style.
  - **Depends‑on:** none
- [ ] **T011 · refactor · P1: replace raw button with button component in card story**
  - **Context:** cr‑02 Enforce Consistent Component Usage - Step 2 (Card Story)
  - **Action:**
    1. Edit `components/ui/card.stories.tsx` (line ~101) and replace raw `<button>` with `<Button>`.
  - **Done‑when:**
    1. Card story uses the project `<Button>` component instead of raw HTML.
    2. Story renders correctly.
  - **Verification:**
    1. Run Storybook, view the Card story with the action button. Verify it renders correctly and uses the `<Button>` component via inspection.
  - **Depends‑on:** T010
- [ ] **T012 · refactor · P1: replace raw label with label component in input story**
  - **Context:** cr‑02 Enforce Consistent Component Usage - Step 3 (Input Story)
  - **Action:**
    1. Edit `components/ui/input.stories.tsx` (lines ~73-77) and replace raw `<label>` with `<Label>`.
  - **Done‑when:**
    1. Input story uses the project `<Label>` component instead of raw HTML.
    2. Story renders correctly with correct `htmlFor` association.
  - **Verification:**
    1. Run Storybook, view the Input story with a label. Verify it renders correctly and uses the `<Label>` component via inspection.
  - **Depends‑on:** T010
- [ ] **T013 · refactor · P1: update label stories to use required prop and remove manual styles**
  - **Context:** cr‑02 Enforce Consistent Component Usage - Step 4 (Label Story)
  - **Action:**
    1. Edit `components/ui/label.stories.tsx`, remove raw `<span>` indicators (lines ~32-33, ~45, ~61-62) and use the `required` prop on `<Label>` instead.
    2. Remove manual disabled styles/classes; ensure disabled state is demonstrated by linking Label to a disabled Input in a story.
  - **Done‑when:**
    1. Label stories use the `required` prop for indicators.
    2. Label stories demonstrate disabled state via association, not manual styles.
  - **Verification:**
    1. Run Storybook, view Label stories for required/disabled states. Verify correct rendering and implementation.
  - **Depends‑on:** T010
- [ ] **T014 · refactor · P1: update textarea stories to use label component and required prop**
  - **Context:** cr‑02 Enforce Consistent Component Usage - Step 5 (Textarea Story)
  - **Action:**
    1. Edit `components/ui/textarea.stories.tsx`, ensure `<Label>` is used consistently (lines ~72-73, ~100-101).
    2. Remove raw `<span>` indicator (line ~94) and use the `required` prop on the associated `<Label>`.
  - **Done‑when:**
    1. Textarea stories consistently use `<Label>`.
    2. Required indicator is handled via the Label's `required` prop.
  - **Verification:**
    1. Run Storybook, view Textarea stories with labels/required indicators. Verify correct rendering and implementation.
  - **Depends‑on:** T010
- [ ] **T015 · test · P2: audit all stories for remaining raw html button/label usage**
  - **Context:** cr‑02 Enforce Consistent Component Usage - Step 6 (Audit)
  - **Action:**
    1. Review all `*.stories.tsx` files for inappropriate use of raw `<button>` or `<label>` where project components should be used.
  - **Done‑when:**
    1. Audit is complete; any remaining issues are documented or fixed.
  - **Depends‑on:** T011, T012, T013, T014

## Storybook / ArgTypes Documentation

- [ ] **T016 · refactor · P2: add standard props to button argtypes**
  - **Context:** cr‑06 Complete Prop Documentation in `argTypes` - Step 1 (Button)
  - **Action:**
    1. Edit `components/ui/button.stories.tsx`, add `onClick` (control: false), `id`, `type` to `meta.argTypes`.
  - **Done‑when:**
    1. Specified standard props are documented in Button `argTypes`.
  - **Verification:**
    1. Run Storybook, check Button "Controls"/"Docs" for added props.
  - **Depends‑on:** T006
- [ ] **T017 · refactor · P2: add standard props to input argtypes**
  - **Context:** cr‑06 Complete Prop Documentation in `argTypes` - Step 1 (Input)
  - **Action:**
    1. Edit `components/ui/input.stories.tsx`, add `onChange`, `onBlur`, `onFocus` (control: false), `id`, `name`, `placeholder`, `type`, `value`, `defaultValue`, `required`, `disabled`, `readOnly`, etc. to `meta.argTypes`.
  - **Done‑when:**
    1. Specified standard props are documented in Input `argTypes`.
  - **Verification:**
    1. Run Storybook, check Input "Controls"/"Docs" for added props.
  - **Depends‑on:** T007
- [ ] **T018 · refactor · P2: add standard props to textarea argtypes**
  - **Context:** cr‑06 Complete Prop Documentation in `argTypes` - Step 1 (Textarea)
  - **Action:**
    1. Edit `components/ui/textarea.stories.tsx`, add `onChange`, `onBlur`, `onFocus` (control: false), `id`, `name`, `placeholder`, `rows`, `value`, `defaultValue`, `required`, `disabled`, `readOnly`, etc. to `meta.argTypes`.
  - **Done‑when:**
    1. Specified standard props are documented in Textarea `argTypes`.
  - **Verification:**
    1. Run Storybook, check Textarea "Controls"/"Docs" for added props.
  - **Depends‑on:** T008
- [ ] **T019 · refactor · P2: add standard props to label argtypes**
  - **Context:** cr‑06 Complete Prop Documentation in `argTypes` - Step 1 (Label)
  - **Action:**
    1. Edit `components/ui/label.stories.tsx`, add `htmlFor`, `id` to `meta.argTypes`.
  - **Done‑when:**
    1. Specified standard props are documented in Label `argTypes`.
  - **Verification:**
    1. Run Storybook, check Label "Controls"/"Docs" for added props.
  - **Depends‑on:** T009, T010
- [ ] **T020 · refactor · P2: add standard props to card component argtypes**
  - **Context:** cr‑06 Complete Prop Documentation in `argTypes` - Step 1 (Card)
  - **Action:**
    1. Edit `components/ui/card.stories.tsx`, add common props like `id`, `className` to `meta.argTypes` for Card and its subcomponents.
  - **Done‑when:**
    1. Specified standard props are documented in Card `argTypes`.
  - **Verification:**
    1. Run Storybook, check Card "Controls"/"Docs" for added props.
  - **Depends‑on:** none

## Storybook / CardAction Component

- [ ] **T021 · refactor · P2: add tsdoc comments to cardaction component**
  - **Context:** cr‑09 Document Custom `CardAction` Component - Step 1
  - **Action:**
    1. Add TSDoc comments to the `CardAction` component definition in `components/ui/card.tsx`.
  - **Done‑when:**
    1. `CardAction` component has TSDoc documentation explaining purpose and props.
  - **Depends‑on:** none
- [ ] **T022 · refactor · P2: export cardaction component**
  - **Context:** cr‑09 Document Custom `CardAction` Component - Step 2
  - **Action:**
    1. Ensure `CardAction` is exported from `components/ui/card.tsx`.
  - **Done‑when:**
    1. `CardAction` component is successfully exported and importable.
  - **Depends‑on:** T021
- [ ] **T023 · refactor · P2: list cardaction in storybook meta subcomponents**
  - **Context:** cr‑09 Document Custom `CardAction` Component - Step 3
  - **Action:**
    1. Edit `card.stories.tsx` and add `CardAction` to `meta.subcomponents` if desired for clarity.
  - **Done‑when:**
    1. `CardAction` is listed as a subcomponent in the Card story meta.
  - **Verification:**
    1. Run Storybook, check Card "Docs" tab to see `CardAction` listed.
  - **Depends‑on:** T022

## Storybook / Story Structure & Quality

- [ ] **T024 · refactor · P2: standardize input story structure (args vs render)**
  - **Context:** cr‑07 Ensure Consistent Story Structure (Args vs. Render)
  - **Action:**
    1. Review `input.stories.tsx` and convert stories using `render` for simple prop changes to use `args`.
  - **Done‑when:**
    1. Input stories consistently use `args` for simple prop variations.
  - **Depends‑on:** none
- [ ] **T025 · refactor · P2: standardize label story structure (args vs render)**
  - **Context:** cr‑07 Ensure Consistent Story Structure (Args vs. Render)
  - **Action:**
    1. Review `label.stories.tsx` and convert stories using `render` for simple prop changes to use `args`.
  - **Done‑when:**
    1. Label stories consistently use `args` for simple prop variations.
  - **Depends‑on:** none
- [ ] **T026 · refactor · P2: standardize textarea story structure (args vs render)**
  - **Context:** cr‑07 Ensure Consistent Story Structure (Args vs. Render)
  - **Action:**
    1. Review `textarea.stories.tsx` and convert stories using `render` for simple prop changes to use `args`.
  - **Done‑when:**
    1. Textarea stories consistently use `args` for simple prop variations.
  - **Depends‑on:** none
- [ ] **T027 · feature · P2: add interactive state stories for button**
  - **Context:** cr‑08 Add Edge Case and State Coverage to Stories - Step 1
  - **Action:**
    1. Add stories to `button.stories.tsx` demonstrating `:hover`, `:focus`, `:active` states using pseudo-state addon or interaction tests. Name clearly (e.g., `HoverState`).
  - **Done‑when:**
    1. Button stories include visually verifiable interactive states.
  - **Verification:**
    1. Run Storybook, view new Button state stories, confirm visual correctness.
  - **Depends‑on:** none
- [ ] **T028 · feature · P2: add interactive state stories for input/textarea**
  - **Context:** cr‑08 Add Edge Case and State Coverage to Stories - Step 1
  - **Action:**
    1. Add stories to `input.stories.tsx` and `textarea.stories.tsx` demonstrating `:hover`, `:focus`, `:active` states. Name clearly.
  - **Done‑when:**
    1. Input/Textarea stories include visually verifiable interactive states.
  - **Verification:**
    1. Run Storybook, view new Input/Textarea state stories, confirm visual correctness.
  - **Depends‑on:** none
- [ ] **T029 · feature · P2: add error state stories for input/textarea**
  - **Context:** cr‑08 Add Edge Case and State Coverage to Stories - Step 2
  - **Action:**
    1. Add stories to `input.stories.tsx` and `textarea.stories.tsx` demonstrating error/invalid states (e.g., using `aria-invalid="true"`). Name clearly (e.g., `ErrorState`).
  - **Done‑when:**
    1. Input/Textarea stories include visually verifiable error states.
  - **Verification:**
    1. Run Storybook, view new Input/Textarea error state stories, confirm visual correctness.
  - **Depends‑on:** none
- [ ] **T030 · feature · P2: add edge case stories for button (long text)**
  - **Context:** cr‑08 Add Edge Case and State Coverage to Stories - Step 3
  - **Action:**
    1. Add story to `button.stories.tsx` demonstrating behavior with very long text content. Name clearly (e.g., `LongText`).
  - **Done‑when:**
    1. Button story exists for long text edge case.
  - **Verification:**
    1. Run Storybook, view new Button edge case story, confirm visual correctness (wrapping/truncation).
  - **Depends‑on:** none
- [ ] **T031 · feature · P2: add edge case stories for input/textarea (long placeholder/value)**
  - **Context:** cr‑08 Add Edge Case and State Coverage to Stories - Step 3
  - **Action:**
    1. Add stories to `input.stories.tsx` and `textarea.stories.tsx` demonstrating behavior with long placeholder/value text. Name clearly (e.g., `LongPlaceholder`).
```
