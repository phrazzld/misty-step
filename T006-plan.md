# T006 · refactor · P1: define aria-label in button argtypes

## Task Description

Add the `aria-label` property to the `meta.argTypes` in the button.stories.tsx file with an appropriate description to improve accessibility documentation for the Button component.

## Plan

1. Examine the current button.stories.tsx file to understand the existing argTypes structure
2. Add the `aria-label` property to the `meta.argTypes` object with a clear description
3. Follow the same formatting and style as the existing argTypes
4. Verify the changes by ensuring the code compiles without errors

## Implementation Steps

1. Open the button.stories.tsx file
2. Locate the `meta.argTypes` object
3. Add a new entry for `aria-label` with:
   - Appropriate control type (likely "text")
   - Clear description explaining its purpose (accessibility information for screen readers)
4. Ensure proper formatting and code style consistency
5. Test that the code still compiles without errors

## Testing

1. Run TypeScript type checking to ensure no type errors
2. Run the test suite to ensure existing functionality is not broken
3. Ideally, run Storybook to verify that the `aria-label` prop appears correctly in the Controls panel
