# T003 - Write Tests to Meet 85% Coverage Threshold

## Current Coverage Status

- Current coverage metrics:
  - Statements: 34.68% (target: 85%)
  - Branches: 81.25% (target: 85%)
  - Functions: 68.42% (target: 85%)
  - Lines: 34.68% (target: 85%)

## Uncovered Components

Based on the coverage report, these components need tests:

### No Coverage (0%)

1. `components/features.tsx` - 0% coverage
2. `components/hero.tsx` - 0% coverage
3. `components/site-footer.tsx` - 0% coverage
4. `components/site-header.tsx` - 0% coverage
5. `components/ui/card.tsx` - 0% coverage
6. `app/layout.tsx` - 0% coverage
7. `app/page.tsx` - 0% coverage
8. Config files - these generally don't need coverage

### Implementation Plan

#### 1. Create tests for UI components

First, let's focus on the shadcn UI components since they should be easier to test:

- `card.tsx` - Add tests for all exported Card components

#### 2. Create tests for layout components

Next, test the layout components:

- `site-footer.tsx` - Test rendering and links
- `site-header.tsx` - Test rendering, links, and mobile menu toggle

#### 3. Create tests for content components

Then, test the content components:

- `features.tsx` - Test rendering and correct props usage
- `hero.tsx` - Test rendering and props

#### 4. Create tests for app components

Finally, test the app components:

- `app/layout.tsx` - Test metadata and rendering
- `app/page.tsx` - Test sections render with correct props

## Test Approach

- Use React Testing Library and Jest DOM assertions
- Follow existing test patterns in the codebase
- Focus on component behavior and rendering
- Use mocks only for external dependencies
- Verify DOM elements, classes, and attributes
