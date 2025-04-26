# T014 Plan: Enhance Test Utils with Context Providers

## Analysis

This task requires updating the test utilities to wrap component renders with necessary context providers, then refactoring existing tests to use this enhanced render utility. This will simplify test setup and ensure consistent context across all tests.

## Steps

1. Examine `test/utils.tsx` to understand current render utilities
2. Identify which contexts are needed by components (ThemeProvider, etc.)
3. Update `test/utils.tsx` to include these context providers
4. Refactor existing component tests to use the enhanced render utility
5. Verify all tests pass with the new utility

## Success Criteria

- All component tests pass without manual context providers
- Test setup is simplified and consistent across all components
