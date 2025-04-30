# T002 · chore · P2: configure storybook staticdirs for assets

## Task Description

Configure Storybook's `staticDirs` in `.storybook/main.ts` (or equivalent) to serve icon assets from the `public/` directory, ensuring that the icons used in button stories (via `<img>` tags) render correctly.

## Plan

1. Locate the Storybook configuration file (likely `.storybook/main.ts` or `.storybook/main.js`)
2. Examine the existing configuration and identify where to add or update the `staticDirs` setting
3. Add/update the configuration to serve files from the `public/` directory
4. Verify that the icons used in button stories are served correctly via the Storybook UI

## Implementation Steps

1. Find the Storybook configuration file
2. Add or update the `staticDirs` configuration to include the `public/` directory
3. Ensure proper configuration format based on the Storybook version in use
4. Test that the configuration works by running Storybook and verifying the icons load correctly

## Testing

1. Run `pnpm storybook` to start Storybook
2. Navigate to Button stories with icons (`IconSize` and `WithIcon`)
3. Visually verify that icons load and display correctly
4. Check browser console for any missing asset errors
