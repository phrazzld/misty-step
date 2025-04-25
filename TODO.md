# Todo

## Setup & Configuration
- [x] **T001 · Chore · P1: confirm shadcn/ui initialization**
    - **Context:** PLAN.md > Implementation Steps > 1. Verify and Configure shadcn/ui Setup
    - **Action:**
        1. Run `pnpm dlx shadcn-ui@latest init` in the project root.
        2. Review the output to confirm settings match project expectations (TypeScript, App Router, CSS variables, etc.).
    - **Done‑when:**
        1. Command executed successfully.
        2. Output confirms expected configuration.
    - **Depends‑on:** none
- [x] **T002 · Chore · P1: verify shadcn/ui configuration files**
    - **Context:** PLAN.md > Implementation Steps > 1. Verify and Configure shadcn/ui Setup
    - **Action:**
        1. Inspect `tailwind.config.js` (or equivalent) for correct shadcn/ui plugin setup.
        2. Inspect `components.json` for correct paths (`components`, `lib/utils`).
        3. Inspect `globals.css` for base CSS variable definitions added by shadcn/ui.
    - **Done‑when:**
        1. Configuration files (`tailwind.config.js`, `components.json`, `globals.css`) contain the necessary settings as per shadcn/ui docs.
    - **Depends‑on:** [T001]

## Base Component Integration
- [x] **T003 · Feature · P2: add shadcn button component**
    - **Context:** PLAN.md > Implementation Steps > 3. Add Basic shadcn Components
    - **Action:**
        1. Run `pnpm dlx shadcn-ui@latest add button`.
    - **Done‑when:**
        1. `components/ui/button.tsx` file exists and compiles without errors.
    - **Depends‑on:** [T002]
- [x] **T004 · Feature · P2: add shadcn card component**
    - **Context:** PLAN.md > Implementation Steps > 3. Add Basic shadcn Components
    - **Action:**
        1. Run `pnpm dlx shadcn-ui@latest add card`.
    - **Done‑when:**
        1. `components/ui/card.tsx` file exists and compiles without errors.
    - **Depends‑on:** [T002]
- [x] **T005 · Feature · P2: add shadcn input component**
    - **Context:** PLAN.md > Implementation Steps > 3. Add Basic shadcn Components
    - **Action:**
        1. Run `pnpm dlx shadcn-ui@latest add input`.
    - **Done‑when:**
        1. `components/ui/input.tsx` file exists and compiles without errors.
    - **Depends‑on:** [T002]
- [x] **T006 · Feature · P2: add shadcn textarea component**
    - **Context:** PLAN.md > Implementation Steps > 3. Add Basic shadcn Components
    - **Action:**
        1. Run `pnpm dlx shadcn@latest add textarea`.
    - **Done‑when:**
        1. `components/ui/textarea.tsx` file exists and compiles without errors.
    - **Depends‑on:** [T002]
- [x] **T007 · Feature · P2: add shadcn label component**
    - **Context:** PLAN.md > Implementation Steps > 3. Add Basic shadcn Components
    - **Action:**
        1. Run `pnpm dlx shadcn@latest add label`.
    - **Done‑when:**
        1. `components/ui/label.tsx` file exists and compiles without errors.
    - **Depends‑on:** [T002]

## Theming
- [x] **T008 · Refactor · P1: align shadcn css variables with project oklch values**
    - **Context:** PLAN.md > Implementation Steps > 4. Theme Alignment
    - **Action:**
        1. Identify existing OKLCH color variables in the project (likely `globals.css` or Tailwind config).
        2. Update the CSS variables defined by shadcn/ui in `globals.css` (e.g., `--primary`, `--card`, etc.) to use the project's OKLCH values.
    - **Done‑when:**
        1. Shadcn CSS variables in `globals.css` are updated to reflect project's OKLCH color theme.
        2. Base component previews (if available) show correct project colors.
    - **Depends‑on:** [T002]
- [x] **T009 · Test · P1: verify base dark mode theme variables**
    - **Context:** PLAN.md > Implementation Steps > 4. Theme Alignment
    - **Action:**
        1. Inspect the dark mode variable definitions (`.dark { ... }`) added/modified by shadcn/ui in `globals.css`.
        2. Ensure these variables correctly map to the project's dark theme OKLCH values.
    - **Done‑when:**
        1. Dark mode CSS variables in `globals.css` correctly reflect the project's dark theme.
        2. Toggling dark mode (system or manual) correctly applies base dark theme variables.
    - **Depends‑on:** [T008]

## Refactoring `app/page.tsx`
- [x] **T010 · Refactor · P2: refactor buttons in `app/page.tsx` to use `<Button>`**
    - **Context:** PLAN.md > Implementation Steps > 5. Refactor Site to Use Components > Replace buttons...
    - **Action:**
        1. Identify all button-like elements (`<a>`, `<button>`) in `app/page.tsx`.
        2. Replace them with the `<Button>` component (using `asChild` for links), preserving functionality and applying appropriate variants/sizes.
    - **Done‑when:**
        1. All identified button elements in `app/page.tsx` are replaced by `<Button>`.
        2. Buttons render visually consistent with the original design (post-theming).
        3. Button functionality (links, actions) remains unchanged.
    - **Depends‑on:** [T003, T008]
- [x] **T011 · Refactor · P2: refactor card elements in `app/page.tsx` to use `<Card>`**
    - **Context:** PLAN.md > Implementation Steps > 5. Refactor Site to Use Components > Replace card elements...
    - **Action:**
        1. Identify elements representing cards (e.g., in Features, Solutions sections) in `app/page.tsx`.
        2. Replace the container and content structure with `<Card>`, `<CardHeader>`, `<CardTitle>`, `<CardDescription>`, `<CardContent>`, `<CardFooter>` as appropriate.
    - **Done‑when:**
        1. All identified card elements in `app/page.tsx` are replaced by `<Card>` components.
        2. Cards render visually consistent with the original design (post-theming).
        3. Card content structure is preserved.
    - **Depends‑on:** [T004, T008]
- [x] **T012 · Refactor · P2: refactor form elements in `app/page.tsx` to use form components**
    - **Context:** PLAN.md > Implementation Steps > 5. Refactor Site to Use Components > Refactor form elements...
    - **Action:**
        1. Identify form elements (likely in Contact section) in `app/page.tsx`.
        2. Replace `<input>`, `<textarea>`, and associated `<label>` elements with `<Input>`, `<Textarea>`, and `<Label>` components.
    - **Done‑when:**
        1. Form elements in `app/page.tsx` use `<Input>`, `<Textarea>`, and `<Label>`.
        2. Form renders visually consistent with the original design (post-theming).
        3. Form accessibility attributes (e.g., `htmlFor` on Label) are correctly linked.
    - **Depends‑on:** [T005, T006, T007, T008]

## Composite Components
- [x] **T013 · Feature · P2: implement `SiteHeader` component**
    - **Context:** PLAN.md > Implementation Steps > 6. Create Composite Components
    - **Action:**
        1. Create `components/site-header.tsx`.
        2. Implement the header structure, potentially using base components like `<Button>`.
        3. Replace the existing header implementation in the layout/page with `<SiteHeader>`.
    - **Done‑when:**
        1. `SiteHeader` component exists and renders the site navigation/header.
        2. Header is visually and functionally consistent with the original design.
    - **Depends‑on:** [T003] 
- [x] **T014 · Feature · P2: implement `SiteFooter` component**
    - **Context:** PLAN.md > Implementation Steps > 6. Create Composite Components
    - **Action:**
        1. Create `components/site-footer.tsx`.
        2. Implement the footer structure and content.
        3. Replace the existing footer implementation in the layout/page with `<SiteFooter>`.
    - **Done‑when:**
        1. `SiteFooter` component exists and renders the site footer.
        2. Footer is visually and functionally consistent with the original design.
    - **Depends‑on:** none
- [x] **T015 · Refactor · P2: extract Hero section into component**
    - **Context:** PLAN.md > Implementation Steps > 6. Create Composite Components
    - **Action:**
        1. Move Hero JSX from `app/page.tsx` to `components/hero.tsx`.
        2. Convert inline styles to shadcn UI primitives (e.g., `<Button>`).
    - **Done‑when:**
        1. `<Hero />` renders identically in page.
        2. No Hero-section code remains in `app/page.tsx`.
    - **Depends‑on:** [T010]
- [x] **T016 · Refactor · P2: extract Features section into component**
    - **Context:** PLAN.md > Implementation Steps > 6. Create Composite Components
    - **Action:**
        1. Move Features JSX into `components/features.tsx`.
        2. Replace card blocks with `<Card>` usage.
    - **Done‑when:**
        1. `<Features />` renders identically in page.
        2. No Features-section code remains in `app/page.tsx`.
    - **Depends‑on:** [T011]
- [ ] **T017 · Refactor · P2: extract Contact section into component**
    - **Context:** PLAN.md > Implementation Steps > 6. Create Composite Components
    - **Action:**
        1. Move Contact form JSX into `components/contact.tsx`.
        2. Ensure form uses shadcn Input, Textarea, Label.
    - **Done‑when:**
        1. `<Contact />` renders identically in page.
        2. No Contact-section code remains in `app/page.tsx`.
    - **Depends‑on:** [T012]

## Testing & Validation
- [ ] **T018 · Test · P2: perform visual regression testing**
    - **Context:** PLAN.md > Implementation Steps > 7. Testing and Validation > Verify visual consistency...
    - **Action:**
        1. Compare the appearance of refactored components/pages against the original design mocks or screenshots.
        2. Identify and document any visual discrepancies.
    - **Done‑when:**
        1. Visual comparison completed for all affected areas (`Button`, `Card`, Form, Header, Footer).
        2. Any deviations from the original design are documented in new bugfix tickets.
    - **Depends‑on:** [T010, T011, T012, T013, T014, T015, T016, T017]
- [ ] **T019 · Test · P2: perform responsiveness testing**
    - **Context:** PLAN.md > Implementation Steps > 7. Testing and Validation > Test responsiveness...
    - **Action:**
        1. Test the refactored pages/components across standard breakpoints (e.g., mobile, tablet, desktop).
        2. Verify layout and usability are maintained.
    - **Done‑when:**
        1. Responsiveness testing completed across target breakpoints.
        2. Layout issues are documented in new bugfix tickets.
    - **Depends‑on:** [T010, T011, T012, T013, T014, T015, T016, T017]
- [ ] **T020 · Test · P1: perform accessibility testing**
    - **Context:** PLAN.md > Implementation Steps > 7. Testing and Validation > Test ... accessibility & Considerations > Accessibility
    - **Action:**
        1. Test keyboard navigation (tab order, focus visibility) on all interactive components (`Button`, `Input`, `Textarea`, links).
        2. Test compatibility with a screen reader (e.g., VoiceOver, NVDA) for major components and page structure.
    - **Done‑when:**
        1. Keyboard navigation is logical and focus indicators are visible.
        2. Screen reader output is coherent and elements are properly announced.
        3. Accessibility issues are documented in new bugfix tickets.
    - **Depends‑on:** [T010, T011, T012, T013, T014, T015, T016, T017]
- [ ] **T021 · Test · P2: verify dark mode appearance**
    - **Context:** PLAN.md > Implementation Steps > 7. Testing and Validation > Ensure dark mode compatibility
    - **Action:**
        1. Activate dark mode.
        2. Verify all refactored components (`Button`, `Card`, Form elements) and composite components render correctly using dark theme variables.
    - **Done‑when:**
        1. Dark mode renders correctly across all refactored/added components.
        2. Dark mode inconsistencies are documented in new bugfix tickets.
    - **Depends‑on:** [T009, T010, T011, T012, T013, T014, T015, T016, T017]

---

### Clarifications & Assumptions
- [ ] **Issue:** Determine if additional shadcn components are needed beyond the initial set
    - **Context:** PLAN.md > Base Component Integration
    - **Blocking?:** no (Can proceed with core components and add more as needed)