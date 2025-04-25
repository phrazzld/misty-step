# Todo

## Core Infrastructure

- [x] **T001 · Chore · P0: create tsconfig.json with strict settings**

  - **Context:** cr-01 in PLAN.md
  - **Action:**
    1. Add `tsconfig.json` at project root with mandatory `compilerOptions` from DEVELOPMENT_PHILOSOPHY_APPENDIX_TYPESCRIPT.md §4
    2. Include `["next-env.d.ts","**/*.ts","**/*.tsx"]` in the includes section
    3. Run `tsc --noEmit` to verify configuration
  - **Done-when:**
    1. `tsc --noEmit` passes without errors
  - **Depends-on:** none

- [x] **T002 · Chore · P0: configure eslint and prettier with pre-commit hooks**

  - **Context:** cr-02 in PLAN.md
  - **Action:**
    1. Install necessary dev dependencies (eslint, prettier, typescript-eslint, husky, lint-staged)
    2. Configure ESLint to extend recommended configs and strictest settings
    3. Set up Husky pre-commit hooks for linting and formatting
  - **Done-when:**
    1. Pre-commit hooks block commits with lint/format violations
  - **Depends-on:** [T001]

- [x] **T003 · Chore · INVALID: symlinks are intentional**
  - **Context:** cr-03 in PLAN.md - INVALID
  - **Action:** NONE - symlinks are intentional and should be preserved
  - **Done-when:** N/A
  - **Depends-on:** none

## Accessibility & User Experience

- [x] **T004 · Bugfix · P0: wrap contact component in semantic form element**

  - **Context:** cr-04 in PLAN.md
  - **Action:**
    1. Modify `components/contact.tsx` to wrap inputs and button in `<form>` tag
    2. Implement `handleSubmit` function with preventDefault()
    3. Add proper validation attributes to inputs
  - **Done-when:**
    1. Clicking "Send Message" triggers form submission handler
  - **Depends-on:** none

- [x] **T005 · Refactor · P1: remove unnecessary "use client" directives**
  - **Context:** cr-05 in PLAN.md
  - **Action:**
    1. Remove "use client" from `hero.tsx` and `features.tsx`
    2. Verify server-side rendering still works correctly
  - **Done-when:**
    1. No client-only warnings in build output
  - **Depends-on:** none

## Testing & CI

- [x] **T006 · Chore · P1: set up automated testing infrastructure**

  - **Context:** cr-06 in PLAN.md (part 1)
  - **Action:**
    1. Install Jest/Vitest and React Testing Library
    2. Configure test runner with settings that match our development philosophy
    3. Set up coverage thresholds (≥85%)
  - **Done-when:**
    1. Test runner initialized and properly configured
  - **Depends-on:** [T001, T002]

- [ ] **T007 · Test · P1: write tests for core components**

  - **Context:** cr-06 in PLAN.md (part 2)
  - **Action:**
    1. Create tests for Contact component
    2. Create tests for DarkModeToggle component
    3. Create tests for UI primitives (Button, Input, etc.)
  - **Done-when:**
    1. Tests passing with target coverage reached
  - **Depends-on:** [T006, T004]

- [ ] **T008 · Chore · P1: implement CI workflow**
  - **Context:** cr-06 in PLAN.md (part 3)
  - **Action:**
    1. Create GitHub Actions workflow file
    2. Configure CI to run lint, typecheck, tests, coverage checks
    3. Add npm audit for security checks
  - **Done-when:**
    1. CI pipeline successfully runs on PRs
  - **Depends-on:** [T006, T007]

## Component Improvements

- [ ] **T009 · Refactor · P2: add forwardRef to UI primitives**

  - **Context:** cr-07 in PLAN.md
  - **Action:**
    1. Refactor Input component to use React.forwardRef
    2. Refactor Textarea component to use React.forwardRef
    3. Refactor Label component to use React.forwardRef
  - **Done-when:**
    1. Components properly forward refs to underlying DOM elements
  - **Depends-on:** [T001]

- [ ] **T010 · Bugfix · P2: remove console.log statements from DarkModeToggle**
  - **Context:** cr-08 in PLAN.md
  - **Action:**
    1. Remove all console.log statements from components/dark-mode-toggle.tsx
    2. Add structured logging if necessary (behind development flag)
  - **Done-when:**
    1. No console.log statements in production code
  - **Depends-on:** none

## Code Hygiene

- [ ] **T011 · Chore · P2: remove unused dependencies**

  - **Context:** cr-09 in PLAN.md
  - **Action:**
    1. Run `pnpm remove tw-animate-css lucide-react`
    2. Remove any import references to these packages
    3. Verify build still works after removal
  - **Done-when:**
    1. Dependencies removed from package.json and lockfile
    2. Application builds and runs without errors
  - **Depends-on:** none

- [ ] **T012 · Bugfix · P2: replace array-index keys with stable identifiers**
  - **Context:** cr-10 in PLAN.md
  - **Action:**
    1. Find map functions in app/page.tsx using index as key
    2. Find map functions in components/features.tsx using index as key
    3. Replace with stable unique identifiers (title, id, etc.)
  - **Done-when:**
    1. No React "key" warnings in console
  - **Depends-on:** none

### Clarifications & Assumptions

- [ ] **Issue:** Package manager choice (npm vs yarn vs pnpm)
  - **Context:** PLAN.md mentions npm commands but actual project might use a different package manager
  - **Blocking?:** no
