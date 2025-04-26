# T004-plan.md - Enforce Conventional Commits via commit-msg hook

## Task Description

- Install `@commitlint/cli` and `@commitlint/config-conventional` as dev dependencies
- Create `commitlint.config.js` extending the conventional config
- Add `.husky/commit-msg` invoking `npx commitlint --edit "$1"` and mark it executable

## Implementation Plan

1. Install required dependencies:
   - Install `@commitlint/cli` and `@commitlint/config-conventional` using pnpm
2. Create commitlint configuration:
   - Create `commitlint.config.js` file in the project root
   - Extend the conventional configuration
3. Add the commit-msg hook:
   - Create `.husky/commit-msg` file
   - Add the script to run commitlint
   - Make the file executable
4. Test the commit-msg hook:
   - Attempt a commit with an invalid commit message to verify it is rejected
   - Verify that a valid conventional commit message is accepted

## Expected Output

- The commit-msg hook rejects invalid commit messages
- The hook allows valid conventional commit messages to pass
- Commitlint configuration is in place for future use
