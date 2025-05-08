# Clarification Issue: Define scope of linting/formatting for non-source code files

## Issue Description
- **Issue:** Define scope of linting/formatting for non-source code files (e.g., Markdown, JSON, YAML)
- **Context:** Sections related to ESLint, Prettier, lint-staged configuration
- **Blocking?:** No

## Analysis & Implementation Plan

### Current Status
After examining the current configuration:

1. The `.lintstagedrc.json` file already has specific handling for various non-source code files:
   - JSON, CSS, HTML, YAML/YML files: Run through Prettier for formatting
   - Markdown files: Custom script that filters out symlinks and formats with Prettier
   - Husky script files: Custom script that ensures they end with a newline

2. The ESLint configuration focuses on TypeScript/JavaScript files, as expected.

3. Prettier is configured to format all supported file types in the project.

### Scope Definition for Non-Source Code Files

For clarity, we should document the current scope of linting and formatting for non-source code files:

1. **Markdown (.md)**: 
   - Formatted with Prettier
   - Special handling for symlinks (they are excluded)

2. **JSON (.json)**:
   - Formatted with Prettier
   - No linting beyond formatting

3. **YAML/YML (.yml, .yaml)**:
   - Formatted with Prettier
   - No linting beyond formatting

4. **CSS (.css)**:
   - Formatted with Prettier
   - No linting beyond formatting

5. **HTML (.html)**:
   - Formatted with Prettier
   - No linting beyond formatting

6. **Storybook Configuration Files**:
   - JavaScript/TypeScript files: ESLint and Prettier
   - CSS files: Prettier

7. **Husky Scripts**:
   - Ensure each file ends with a newline

### Implementation Strategy
This is primarily a documentation task to clarify the existing setup, which is already well-configured. I'll:

1. Create or update documentation that clearly explains which non-source files are linted/formatted
2. Ensure the documentation includes how the configuration was implemented
3. Mark the issue as addressed in the TODO.md file

### Expected Changes
- Add a section to CONTRIBUTING.md explaining the scope of linting/formatting for non-source files
- No changes to the actual configuration files, as they are already properly set up