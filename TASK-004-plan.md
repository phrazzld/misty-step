# TASK-004: Configure `.storybook/preview.ts` - Plan

## Task Classification

Medium - This task involves configuring the Storybook preview file with global styles and theme support.

## Approach

1. Read the current `.storybook/preview.ts` file to understand its default configuration
2. Modify the file to meet all the requirements from the task description:
   - Import the project's global CSS
   - Configure parameters for controls
   - Add decorators array with theme switching support
   - Consider adding font wrapper if needed

## Implementation Steps

1. Read the current `.storybook/preview.ts` file
2. Modify the file with the necessary configuration:
   - Add import for the global CSS file
   - Ensure parameters for controls are properly configured
   - Import `withThemeByClassName` from `@storybook/addon-themes`
   - Add the withThemeByClassName decorator to support light/dark mode toggling
   - Verify configuration is type-safe and TypeScript will compile successfully

## Verification of Success

The task will be considered complete when:

- `.storybook/preview.ts` is syntactically correct TypeScript
- The global CSS file is imported properly
- The decorator for theme switching is configured correctly
- The parameters for controls are properly set up
