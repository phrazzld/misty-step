# TASK-003: Configure `.storybook/main.ts` - Plan

## Task Classification

Complex - This task involves modifying a configuration file with multiple settings, including path aliases and Vite configuration.

## Approach

1. Read the current `.storybook/main.ts` file to understand its default configuration
2. Modify the file to meet all the requirements from the task description:
   - Update framework configuration for React+Vite if needed
   - Configure story patterns to include components and dedicated story directories
   - Add all required addons with proper configuration
   - Set up path aliases using viteFinal
   - Configure staticDirs for the public directory

## Implementation Steps

1. Read the current `.storybook/main.ts` file
2. Modify the file with the necessary configuration:
   - Update the `framework` property if needed (from nextjs to react-vite)
   - Configure `stories` array to include appropriate file patterns
   - Add all required addons to the `addons` array
   - Configure `@storybook/addon-styling` with PostCSS options
   - Add the `viteFinal` function to set up the `@/*` path alias
   - Add `staticDirs` configuration for the public directory
3. Make sure all configurations are type-safe and TypeScript will compile successfully

## Verification of Success

The task will be considered complete when:

- `.storybook/main.ts` is syntactically correct TypeScript
- The framework is configured for React+Vite
- The stories array includes patterns for both component and dedicated story directories
- All six required addons are in the addons array with proper configuration
- The viteFinal function correctly sets up the @/\* path alias
- staticDirs is configured for the public directory
