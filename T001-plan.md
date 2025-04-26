# T001 - Enable TypeScript-aware ESLint rules

## Task Overview

Enable TypeScript-aware ESLint rules by configuring `parserOptions.project` to point to `tsconfig.json` and extending the recommended type-checking ruleset.

## Implementation Plan

1. Update `eslint.config.mjs`:

   - Add `parserOptions.project` pointing to `./tsconfig.json`
   - Extend `plugin:@typescript-eslint/recommended-requiring-type-checking`
   - Uncomment and enable previously disabled rules:
     - `@typescript-eslint/explicit-function-return-type`
     - `@typescript-eslint/no-floating-promises`

2. Run `pnpm lint` to identify violations
3. Fix any violations that are found
4. Verify fixes by running `pnpm lint` again to ensure there are no errors

## Success Criteria

- CI reports zero lint errors under strict TypeScript-aware rules
