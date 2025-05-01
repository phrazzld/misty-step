# T015 · test · P2: audit all stories for remaining raw html button/label usage

## Context

This task is part of the effort to enforce consistent component usage (cr-02) by ensuring that all stories use the project's Button and Label components rather than raw HTML elements.

## Implementation Plan

1. Find all `.stories.tsx` files in the project using Glob
2. For each story file:
   - Check for raw `<button>` tags that should use the Button component
   - Check for raw `<label>` tags that should use the Label component
   - Document any issues found or fix them directly

## Success Criteria

- All `.stories.tsx` files have been reviewed
- Any remaining instances of raw HTML button/label usage are documented or fixed
- The audit process and findings are documented

## Implementation Steps

1. Use Glob to find all `.stories.tsx` files
2. For each file, read its content and search for raw button and label tags
3. Analyze the context to determine if these instances should be replaced with Button or Label components
4. Document findings and make necessary changes
5. Verify changes work correctly in Storybook
6. Mark the ticket as completed

## Audit Results

### Found Story Files

1. `/stories/SetupVerification.stories.tsx`
2. `/components/ui/button.stories.tsx`
3. `/components/ui/label.stories.tsx`
4. `/components/ui/card.stories.tsx`
5. `/components/ui/input.stories.tsx`
6. `/components/ui/textarea.stories.tsx`

### Findings

1. `/stories/SetupVerification.stories.tsx`:

   - Contains a raw `<button>` element (lines 7-17)
   - **Analysis**: This is a test component explicitly designed for simple setup verification with minimal dependencies. The use of a raw button here appears intentional, as it tests basic Storybook functionality without relying on any project components.
   - **Recommendation**: Keep as is, since it serves a specific testing purpose.

2. `/components/ui/card.stories.tsx`:

   - No raw `<button>` tags found
   - Correctly uses the Button component (line 95)

3. `/components/ui/textarea.stories.tsx`:

   - No raw `<label>` tags found
   - Correctly uses the Label component throughout

4. `/components/ui/input.stories.tsx`:

   - No raw `<label>` tags found
   - Correctly uses the Label component throughout

5. `/components/ui/label.stories.tsx`:

   - No raw `<label>` tags found (as expected in a Label component story)

6. `/components/ui/button.stories.tsx`:
   - No raw `<button>` tags found (as expected in a Button component story)

### Conclusion

All component stories are correctly using the project's Button and Label components where appropriate. The only exception is in `SetupVerification.stories.tsx`, which uses a raw button by design as part of a minimal test setup. No changes are needed as the codebase is already following the consistent component usage principle.
