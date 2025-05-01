# T029: Add Error State Stories for Input/Textarea

## Task Details

- Add stories to `input.stories.tsx` and `textarea.stories.tsx` demonstrating error/invalid states
- Use `aria-invalid="true"` to trigger error styling
- Name stories clearly (like `ErrorState`)
- Ensure states are visually verifiable in Storybook

## Approach

1. Examine the existing CSS for input and textarea components to understand error state styling
2. Add error state stories to both components, following similar patterns as the interactive state stories from T028
3. For each component:
   - Add an `ErrorState` story that demonstrates standalone components with error states
   - Add a `WithLabelAndError` story that shows how errors look with associated labels and error messages

## Implementation Steps

1. Update the `input-states.css` and `textarea-states.css` files to make sure error states are properly defined (already set up in T028)
2. Update `input.stories.tsx` to add:
   - A basic `ErrorState` story with `aria-invalid="true"`
   - A more complex story showing an error message and label
3. Update `textarea.stories.tsx` with the same error state patterns
4. Run tests to ensure changes don't break existing functionality
5. Verify visual appearance in Storybook
