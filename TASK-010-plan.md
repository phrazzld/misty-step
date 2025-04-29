# TASK-010: Integrate Storybook Build into CI Pipeline

## Plan

1. Check if there's an existing CI configuration file in the project
2. If a CI file exists:
   - Add a step to run `pnpm build-storybook` after the existing build/test steps
3. If no CI file exists:
   - Create a basic GitHub Actions workflow file that:
     - Sets up Node.js
     - Installs dependencies
     - Runs linting & tests
     - Builds Storybook
4. Ensure the workflow runs on:
   - Pull requests to main branch
   - Pushes to main branch
5. Verify the configuration is valid

## Implementation Approach

- We'll need to check for CI configuration in standard locations:
  - `.github/workflows/`
  - `.gitlab-ci.yml`
  - `circle.yml` or `.circleci/`
- The Storybook build step should be added after other build/test steps
- If creating a new workflow, follow CI best practices from DEVELOPMENT_PHILOSOPHY.md
