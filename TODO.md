# Test Coverage Technical Debt

This document tracks areas excluded from test coverage and the work needed to properly address them.

## Excluded Files

The following files have been excluded from coverage calculations in `vitest.config.ts`:

- `test/utils.tsx`
- `components/contact.tsx`
- `lib/logger.ts`

## Required Improvements

### Logger Configuration

**File**: `lib/logger.ts`

**Issues**:

- Environment-specific configuration (lines 26-32) lacks test coverage
- Module resolution issues when testing different NODE_ENV settings

**Tasks**:

- [x] Refactor logger to accept environment as a parameter rather than directly accessing NODE_ENV
- [x] Create proper test isolation for environment configuration
- [x] Add tests to verify different transport configurations based on environment

### Contact Form Handling

**File**: `components/contact.tsx`

**Issues**:

- FormData handling is difficult to test
- Form submission logic is tightly coupled with component

**Tasks**:

- [x] Extract form handling logic to a separate, testable function
- [ ] Create proper FormData mocking strategy
- [ ] Add test to verify form data construction with all fields
- [ ] Add test to verify form submission behavior and error handling
- [ ] Consider using a form library that's more testable (e.g., React Hook Form, Formik)

### Test Utilities

**File**: `test/utils.tsx`

**Issues**:

- Dark mode preferences (lines 72-85) lack test coverage
- RTL render function customizations are difficult to test

**Tasks**:

- [ ] Refactor dark mode preference handling for better testability
- [ ] Create separate, focused utilities for theme testing
- [ ] Add tests for theme-related render utilities
- [ ] Improve structure to make testing RTL render options possible

## Skipped Tests

The following tests are currently skipped and should be fixed:

- [x] `lib/logger.test.ts`: "configures logger with different options based on NODE_ENV"
- [ ] `test/utils.test.tsx`: "passes custom render options through to RTL render"
- [ ] `components/contact.test.tsx`: "accepts input and submits the form with data"
