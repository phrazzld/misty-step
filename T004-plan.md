# T004 · chore · P2: remove stories exclusion from vitest coverage config

## Task Description

Remove the pattern `"**/*.stories.{ts,tsx}"` from the `coverage.exclude` array in `vitest.config.ts` to ensure that story files are included in the code coverage analysis.

## Plan

1. Locate the vitest.config.ts file
2. Find the coverage.exclude configuration and remove the pattern that excludes story files
3. Run the test coverage suite to ensure it works correctly with stories included

## Implementation Steps

1. Examine the vitest.config.ts file to find the coverage.exclude array
2. Remove the `"**/*.stories.{ts,tsx}"` pattern from the array
3. Run the test coverage suite to verify that it completes successfully
4. Verify that story files are now included in the coverage report

## Testing

1. Run `npm run test:coverage` or similar command to execute the test coverage suite
2. Confirm that the coverage report is generated successfully
3. Check the coverage report to ensure story files are now included
