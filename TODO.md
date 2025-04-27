# TODO

## Clarifications

- [x] **C001 · Chore · P0: define final core services content**

  - **Context:** PLAN.md - Open Questions > 1; Detailed Build Steps > 1
  - **Action:**
    1. Obtain the definitive, approved list of 3-5 core services, including their `id` (kebab-case), `title`, `description`, and key `points`.
  - **Done‑when:**
    1. Final service content is documented and approved by stakeholders.
  - **Blocking?:** yes (for T003)
  - **Resolution:** Used thinktank to get recommended core services. See clarifications/C001-C002-responses.md

- [x] **C002 · Chore · P2: decide on service icon usage and format**
  - **Context:** PLAN.md - Open Questions > 2; Detailed Build Steps > 1, 7
  - **Action:**
    1. Determine if icons should be used for service cards.
    2. If yes, specify the format/source (e.g., emoji, lucide-react icon names).
  - **Done‑when:**
    1. Decision on icon usage and format/source is documented.
  - **Blocking?:** yes (for T003, T015)
  - **Resolution:** Decision to use icons with lucide-react format. See clarifications/C001-C002-responses.md

## Content Definition (`lib/content/services.ts`)

- [x] **T001 · Feature · P1: define `ServiceOffering` interface**

  - **Context:** PLAN.md - Architecture Blueprint > Public Interfaces / Contracts; Detailed Build Steps > 2
  - **Action:**
    1. Create `lib/content/services.ts`.
    2. Define and export the `ServiceOffering` TypeScript interface as specified (id, title, description, icon?, points).
    3. Add TSDoc comments for the interface and properties.
  - **Done‑when:**
    1. `lib/content/services.ts` exists with the exported interface.
    2. Code passes linting and type checking (`pnpm lint && pnpm typecheck`).
  - **Depends‑on:** none

- [x] **T002 · Feature · P2: export placeholder `coreServices` array**

  - **Context:** PLAN.md - Detailed Build Steps > 2; Risk Matrix > Content Delay Mitigation
  - **Action:**
    1. In `lib/content/services.ts`, define and export `const coreServices: readonly ServiceOffering[]`.
    2. Populate with 1-2 placeholder objects conforming to `ServiceOffering` (using dummy data).
  - **Done‑when:**
    1. `coreServices` is exported with placeholder data.
    2. Code passes linting and type checking.
  - **Depends‑on:** [T001]

- [x] **T003 · Feature · P1: populate `coreServices` with final data**
  - **Context:** PLAN.md - Detailed Build Steps > 1, 2
  - **Action:**
    1. Replace placeholder data in `coreServices` with final content from C001.
    2. Include icon details if decided via C002.
  - **Done‑when:**
    1. `coreServices` contains final, approved service data.
    2. Data conforms to `ServiceOffering` interface.
    3. Code passes linting and type checking.
  - **Depends‑on:** [T002, C001, C002]

## Core Component Updates

- [x] **T004 · Refactor · P2: update site metadata in `app/layout.tsx`**

  - **Context:** PLAN.md - Detailed Build Steps > 3; Detailed Build Steps > 11
  - **Action:**
    1. Modify `metadata.title` and `metadata.description` in `app/layout.tsx` for service focus.
    2. Update corresponding assertions in `app/layout.test.tsx`.
  - **Done‑when:**
    1. Metadata is updated in `app/layout.tsx`.
    2. `app/layout.test.tsx` passes with updated assertions.
  - **Depends‑on:** none

- [x] **T005 · Refactor · P2: update hero content and cta in `components/hero.tsx`**

  - **Context:** PLAN.md - Detailed Build Steps > 4; Detailed Build Steps > 11
  - **Action:**
    1. Update `h1`, subheading text for service focus.
    2. Change primary CTA text (e.g., "Explore Services") and `href` to `#services`.
    3. Update corresponding assertions in `components/hero.test.tsx` (text, href).
  - **Done‑when:**
    1. Hero content and CTA are updated in `components/hero.tsx`.
    2. `components/hero.test.tsx` passes with updated assertions.
  - **Depends‑on:** none

- [x] **T006 · Refactor · P2: update header navigation in `components/site-header.tsx`**

  - **Context:** PLAN.md - Detailed Build Steps > 10; Detailed Build Steps > 11
  - **Action:**
    1. Remove "Features" nav link.
    2. Update "Solutions" link text to "Services" and `href` to `#services`.
    3. Update corresponding assertions in `components/site-header.test.tsx` (remove "Features", check "Services").
  - **Done‑when:**
    1. Header navigation is updated in `components/site-header.tsx`.
    2. `components/site-header.test.tsx` passes with updated assertions.
  - **Depends‑on:** none

- [x] **T007 · Refactor · P2: update footer navigation in `components/site-footer.tsx`**
  - **Context:** PLAN.md - Detailed Build Steps > 10; Detailed Build Steps > 11
  - **Action:**
    1. Remove "Features" nav link.
    2. Update "Solutions" link text to "Services" and `href` to `#services`.
    3. Update corresponding assertions in `components/site-footer.test.tsx` (remove "Features", check "Services").
  - **Done‑when:**
    1. Footer navigation is updated in `components/site-footer.tsx`.
    2. `components/site-footer.test.tsx` passes with updated assertions.
  - **Depends‑on:** none

## Cleanup

- [x] **T008 · Refactor · P2: delete features component files**

  - **Context:** PLAN.md - Detailed Build Steps > 5
  - **Action:**
    1. Delete `components/features.tsx`.
    2. Delete `components/features.test.tsx`.
  - **Done‑when:**
    1. Files `components/features.tsx` and `components/features.test.tsx` are deleted.
    2. Project builds successfully (`pnpm build`).
  - **Depends‑on:** none

- [x] **T009 · Refactor · P2: remove features component usage from `app/page.tsx`**

  - **Context:** PLAN.md - Detailed Build Steps > 5
  - **Action:**
    1. Remove `import { Features } ...` from `app/page.tsx`.
    2. Remove `<Features />` element from JSX in `app/page.tsx`.
  - **Done‑when:**
    1. Features import and usage are removed from `app/page.tsx`.
    2. Code passes linting and type checking.
  - **Depends‑on:** [T008]

- [x] **T010 · Refactor · P2: remove inline solutions section from `app/page.tsx`**
  - **Context:** PLAN.md - Detailed Build Steps > 6
  - **Action:**
    1. Locate and delete the `<section id="solutions" ...>` JSX block from `app/page.tsx`.
  - **Done‑when:**
    1. Solutions section JSX is removed from `app/page.tsx`.
    2. Code passes linting and type checking.
  - **Depends‑on:** none

## Services Component (`components/services.tsx`)

- [x] **T011 · Feature · P2: scaffold `Services` component structure**

  - **Context:** PLAN.md - Detailed Build Steps > 7
  - **Action:**
    1. Create `components/services.tsx`.
    2. Implement `Services` component returning `<section id="services">` with container `div` and `h2` heading.
  - **Done‑when:**
    1. `components/services.tsx` exists with basic structure.
    2. Component renders section with `id="services"` and `h2`.
    3. Code passes linting and type checking.
  - **Depends‑on:** none

- [x] **T012 · Feature · P2: implement data mapping and card rendering**

  - **Context:** PLAN.md - Detailed Build Steps > 7
  - **Action:**
    1. Import `coreServices` from `lib/content/services.ts`.
    2. Import `Card` from `ui/card`.
    3. Map `coreServices` to render a grid of `<Card key={service.id}>` components.
  - **Done‑when:**
    1. `Services` component maps `coreServices` (placeholder data initially).
    2. A `Card` is rendered for each service item.
    3. Code passes linting and type checking.
  - **Depends‑on:** [T002, T011]

- [x] **T013 · Feature · P2: populate service card content**

  - **Context:** PLAN.md - Detailed Build Steps > 7
  - **Action:**
    1. Import `CardHeader`, `CardTitle`, `CardDescription`, `CardContent` from `ui/card`.
    2. Populate each `Card` with `CardHeader` (title, description) and `CardContent` (list of points).
  - **Done‑when:**
    1. Service cards display title, description, and points from `coreServices`.
    2. Code passes linting and type checking.
  - **Depends‑on:** [T012]

- [x] **T014 · Feature · P2: apply styling to `Services` component**

  - **Context:** PLAN.md - Detailed Build Steps > 7
  - **Action:**
    1. Apply Tailwind CSS classes to section, container, heading, grid, and cards for consistent styling.
  - **Done‑when:**
    1. `Services` section and cards are styled consistently with the site.
  - **Depends‑on:** [T013]

- [x] **T015 · Feature · P2: implement optional icon rendering**
  - **Context:** PLAN.md - Detailed Build Steps > 7
  - **Action:**
    1. Conditionally render `service.icon` in `CardHeader` based on C002 decision and data.
    2. Implement logic for chosen icon format (emoji/lucide-react/etc.).
  - **Done‑when:**
    1. Icons render correctly if enabled and present in data.
    2. Component handles missing icons gracefully.
    3. Code passes linting and type checking.
  - **Depends‑on:** [T013, C002]

## Services Component Tests (`components/services.test.tsx`)

- [x] **T016 · Test · P2: set up mocks for `services` tests**

  - **Context:** PLAN.md - Detailed Build Steps > 8; Testing Strategy > What to Mock
  - **Action:**
    1. Create `components/services.test.tsx`.
    2. Use `vi.mock` to mock `lib/content/services.ts` (provide `mockCoreServices`).
    3. Use `vi.mock` to mock UI Card components (`@/components/ui/card`).
  - **Done‑when:**
    1. `components/services.test.tsx` exists with mocks for content and UI cards.
  - **Depends‑on:** [T011]

- [x] **T017 · Test · P2: write `Services` component rendering tests**

  - **Context:** PLAN.md - Detailed Build Steps > 8
  - **Action:**
    1. Verify section renders with `id="services"`.
    2. Verify main heading is displayed.
    3. Verify correct number of mocked `Card` components render based on `mockCoreServices` (including empty case).
  - **Done‑when:**
    1. Tests for basic rendering, heading, card count, and empty state pass.
  - **Depends‑on:** [T012, T016]

- [x] **T018 · Test · P2: write `Services` card content prop tests**
  - **Context:** PLAN.md - Detailed Build Steps > 8
  - **Action:**
    1. Verify props passed to mocked `Card` components (title, description, points) match `mockCoreServices`.
    2. Test icon rendering logic if implemented (T015).
  - **Done‑when:**
    1. Tests for props passed to mocked cards (content, icons if applicable) pass.
    2. `services.tsx` achieves >90% unit test coverage.
  - **Depends‑on:** [T013, T015, T016]

## Integration & Page Tests

- [x] **T019 · Feature · P2: integrate `Services` component into `app/page.tsx`**

  - **Context:** PLAN.md - Detailed Build Steps > 9
  - **Action:**
    1. Import `Services` component in `app/page.tsx`.
    2. Render `<Services />` in the main page JSX (e.g., after Hero).
  - **Done‑when:**
    1. `Services` component is rendered on the landing page.
    2. Code passes linting and type checking.
  - **Depends‑on:** [T011]

- [x] **T020 · Test · P2: update `app/page.test.tsx`**
  - **Context:** PLAN.md - Detailed Build Steps > 11
  - **Action:**
    1. Remove mocks/assertions for `Features` and inline "Solutions".
    2. Add `vi.mock('@/components/services', ...)` to mock the `Services` component.
    3. Assert the mocked `Services` component is rendered.
  - **Done‑when:**
    1. `app/page.test.tsx` reflects component changes and passes.
  - **Depends‑on:** [T009, T010, T019]

## Documentation & Final QA

- [x] **T021 · Chore · P3: update project `README.md`**

  - **Context:** PLAN.md - Documentation > README Updates
  - **Action:**
    1. Update README sections describing site structure/features to reflect service focus.
  - **Done‑when:**
    1. `README.md` accurately describes the service-centric structure.
  - **Depends‑on:** none
