# T001 · refactor · P0: remove next/image usage in button stories

## Task Description

Remove `next/image` usage from button stories to eliminate framework-specific component dependencies in Storybook.

## Plan

1. Locate the button.stories.tsx file
2. Identify the import of `next/image` and instances of `<Image .../>` usage
3. Replace the `import Image from "next/image"` with appropriate standard HTML usage
4. Replace all `<Image ... />` instances with standard `<img>` tags, keeping the same visual appearance
5. Verify the changes work in Storybook by running it locally

## Implementation Steps

1. Remove the import statement for `next/image`
2. Replace `<Image />` components with `<img>` tags
   - Preserve src, alt, width, height attributes
   - Add placeholder alt text as specified in the task
   - Ensure styling remains consistent
3. Run storybook to verify there are no Next.js context errors

## Testing

1. Run storybook with `pnpm storybook`
2. Verify Button stories render correctly without errors
3. Check browser console for any Next.js-related errors
