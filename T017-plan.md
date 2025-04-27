# T017 · Test · P2: write `Services` component rendering tests

## Task Description

- Write tests for the Services component rendering
- Verify section renders with `id="services"`
- Verify main heading is displayed
- Verify correct number of mocked Card components render based on mockCoreServices
- Include test for empty state

## Approach

1. First, let's examine the current implementation of the Services component and the existing test file with mocks
2. Write tests to verify the section renders with correct ID and heading
3. Write tests to verify cards are rendered correctly based on mockCoreServices
4. Write a test for the empty state by temporarily modifying the mock

## Implementation Steps

1. Open and review the existing Services component
2. Open and review the existing services.test.tsx file
3. Add test cases:
   - Basic rendering test (verify section element with correct ID exists)
   - Heading test (verify "Our Services" text is present)
   - Card count test (verify number of cards matches mockCoreServices length)
   - Empty state test (verify no cards render when mockCoreServices is empty)
4. Run tests to ensure all pass
