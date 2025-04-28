# T007 Plan: Implement Dark Mode Colors in globals.css

## Task Description

Replace HSL/Oklch values in the `.dark` scope of `app/globals.css` with the finalized dark mode values (from T005).

## Implementation Approach

1. Reference the finalized dark mode color values from `docs/colors.md`
2. Update the `.dark` selector in `app/globals.css` with these values
3. Ensure all 33 semantic color tokens are properly updated
4. Maintain the existing structure and variable naming

## Implementation Steps

1. Extract all dark mode color values from `docs/colors.md`
2. Update the `.dark` section in `app/globals.css` with these values
3. Ensure consistent formatting with the `:root` section
4. Verify all values are correctly transcribed

## Notes

- All dark mode colors must use the Oklch format consistent with light mode implementation
- Maintain the existing variable names to ensure compatibility with the Shadcn UI expectations
- Ensure all 33 color tokens are included
