# Todo

## Storybook UI Component Stories

- [x] **T001 · Feature · P2: create button component stories and verify**

  - **Context:** PLAN-2 §4.1 - Button Stories Creation
  - **Action:**
    1. Create `components/ui/button.stories.tsx`.
    2. Define CSF 3 `meta` (title `UI/Button`, component, tags, argTypes for `variant`, `size`, `disabled`, `asChild`, `children`).
    3. Implement named stories: Default, Secondary, Destructive, Outline, Ghost, Link, SmallSize, LargeSize, IconSize, Disabled, WithIcon (use placeholder/simple icon), AsChild (wrapping simple element).
  - **Done‑when:**
    1. `button.stories.tsx` exists, compiles, and runs in Storybook under "UI/Button".
    2. All specified named stories render correctly.
    3. Storybook Controls for specified props update the component display correctly.
    4. Stories render correctly in both light and dark modes.
    5. Basic accessibility checks pass in the `@storybook/addon-a11y` panel.
  - **Verification:**
    1. Run `pnpm storybook`. Navigate to `UI/Button`.
    2. Verify each named story visually.
    3. Interact with controls (variant, size, disabled) and verify component updates.
    4. Test hover/focus states visually.
    5. Toggle light/dark mode and verify styles adapt correctly.
    6. Check the Accessibility tab for violations.
  - **Depends‑on:** none

- [x] **T002 · Feature · P2: create card component stories and verify**

  - **Context:** PLAN-2 §4.1 - Card Stories Creation
  - **Action:**
    1. Create `components/ui/card.stories.tsx`.
    2. Define CSF 3 `meta` (title `UI/Card`, component, tags, minimal relevant argTypes).
    3. Implement named stories using Card sub-components: Basic, WithHeader, WithFooter, WithHeaderAndFooter, FullExample (Header+Title+Description+Content+Footer).
  - **Done‑when:**
    1. `card.stories.tsx` exists, compiles, and runs in Storybook under "UI/Card".
    2. All specified named stories render correctly, showcasing different combinations of Card sub-components.
    3. Stories render correctly in both light and dark modes.
    4. Basic accessibility checks pass in the `@storybook/addon-a11y` panel.
  - **Verification:**
    1. Run `pnpm storybook`. Navigate to `UI/Card`.
    2. Verify each named story visually.
    3. Toggle light/dark mode and verify styles adapt correctly.
    4. Check the Accessibility tab for violations.
  - **Depends‑on:** none

- [x] **T003 · Feature · P2: create input component stories and verify**

  - **Context:** PLAN-2 §4.1 - Input Stories Creation
  - **Action:**
    1. Create `components/ui/input.stories.tsx`.
    2. Define CSF 3 `meta` (title `UI/Input`, component, tags, argTypes for `type`, `placeholder`, `disabled`).
    3. Implement named stories: Default, Placeholder, Disabled, TypePassword, TypeNumber, TypeEmail.
  - **Done‑when:**
    1. `input.stories.tsx` exists, compiles, and runs in Storybook under "UI/Input".
    2. All specified named stories render correctly.
    3. Storybook Controls for specified props update the component display correctly.
    4. Stories render correctly in both light and dark modes.
    5. Basic accessibility checks pass in the `@storybook/addon-a11y` panel.
  - **Verification:**
    1. Run `pnpm storybook`. Navigate to `UI/Input`.
    2. Verify each named story visually.
    3. Interact with controls (type, placeholder, disabled) and verify component updates.
    4. Test focus states visually and type into inputs.
    5. Toggle light/dark mode and verify styles adapt correctly.
    6. Check the Accessibility tab for violations.
  - **Depends‑on:** none

- [x] **T004 · Feature · P2: create label component stories and verify**

  - **Context:** PLAN-2 §4.1 - Label Stories Creation
  - **Action:**
    1. Create `components/ui/label.stories.tsx`.
    2. Define CSF 3 `meta` (title `UI/Label`, component, tags, argTypes for `children`, `htmlFor`).
    3. Implement named story: Default (showing association with a basic Input component via `htmlFor` and `id`).
  - **Done‑when:**
    1. `label.stories.tsx` exists, compiles, and runs in Storybook under "UI/Label".
    2. The Default story renders a Label correctly associated with a basic Input.
    3. Story renders correctly in both light and dark modes.
    4. Basic accessibility checks pass in the `@storybook/addon-a11y` panel.
  - **Verification:**
    1. Run `pnpm storybook`. Navigate to `UI/Label`.
    2. Verify the story visually.
    3. Verify clicking the label focuses the associated input.
    4. Toggle light/dark mode and verify styles adapt correctly.
    5. Check the Accessibility tab for violations.
  - **Depends‑on:** none _(Assumes Input component exists, story doesn't need T003 to be merged)_

- [ ] **T005 · Feature · P2: create textarea component stories and verify**
  - **Context:** PLAN-2 §4.1 - Textarea Stories Creation
  - **Action:**
    1. Create `components/ui/textarea.stories.tsx`.
    2. Define CSF 3 `meta` (title `UI/Textarea`, component, tags, argTypes for `placeholder`, `disabled`).
    3. Implement named stories: Default, Placeholder, Disabled.
  - **Done‑when:**
    1. `textarea.stories.tsx` exists, compiles, and runs in Storybook under "UI/Textarea".
    2. All specified named stories render correctly.
    3. Storybook Controls for specified props update the component display correctly.
    4. Stories render correctly in both light and dark modes.
    5. Basic accessibility checks pass in the `@storybook/addon-a11y` panel.
  - **Verification:**
    1. Run `pnpm storybook`. Navigate to `UI/Textarea`.
    2. Verify each named story visually.
    3. Interact with controls (placeholder, disabled) and verify component updates.
    4. Test focus states visually and type into textareas.
    5. Toggle light/dark mode and verify styles adapt correctly.
    6. Check the Accessibility tab for violations.
  - **Depends‑on:** none

## Documentation

- [ ] **T006 · Chore · P2: document story creation guidelines**
  - **Context:** PLAN-2 §4.2 - Update Documentation
  - **Action:**
    1. Choose location (`README.md` or new `docs/CONTRIBUTING-STORYBOOK.md`).
    2. Add guidelines covering: colocation (`*.stories.tsx`), CSF 3/TS usage, `meta` definition (title, component, tags, argTypes), named exports for variants/states, `args` usage, light/dark mode checking, and a11y addon usage.
  - **Done‑when:**
    1. Documentation file is updated or created with the specified guidelines.
    2. Guidelines accurately reflect the process used in T001-T005.
  - **Verification:**
    1. Review the updated documentation file to ensure all points are covered clearly.
  - **Depends‑on:** [T001, T002, T003, T004, T005]

## Verification

- [ ] **T007 · Test · P2: verify storybook build passes with new stories**
  - **Context:** PLAN-2 §5, §6 - Testing Strategy & Acceptance Criteria (CI build)
  - **Action:**
    1. Run the `build-storybook` command locally (e.g., `pnpm build-storybook`).
  - **Done‑when:**
    1. The `build-storybook` command completes successfully without errors.
    2. Build output is generated in the designated directory (`storybook-static` by default).
  - **Depends‑on:** [T001, T002, T003, T004, T005]

---

### Clarifications & Assumptions

- [ ] **Issue:** How should icons be handled/imported for stories like `Button` `WithIcon`?
  - **Context:** PLAN-2 §4.1 bullet "Button: ... WithIcon (requires importing an icon)"
  - **Blocking?:** no _(Assumption: Use a simple placeholder SVG or readily available icon for the story)_
