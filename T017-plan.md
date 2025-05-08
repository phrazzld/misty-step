# T017 - Document and enforce tool versions using package.json engines

## Task Description
- **ID and Title**: T017 · Chore · P2: Document and enforce tool versions using package.json engines
- **Context**: Prevent environment inconsistencies
- **Action**:
  1. Update the `engines` field in `package.json` to specify required versions for Node.js and the package manager (npm/yarn/pnpm)
  2. Document these version requirements in the project setup guide
- **Done-when**:
  1. `package.json` specifies required engine versions
  2. Tool version requirements are clearly documented
- **Verification**:
  1. Attempt `npm install` (or equivalent) with an incompatible Node.js/package manager version; verify a warning or error is shown (depending on package manager behavior)
- **Depends-on**: [T015]

## Analysis & Implementation Plan

### Current Status
I've checked the current state of the project:

1. The `package.json` already has an engines field specifying:
   ```json
   "engines": {
     "node": ">=20",
     "pnpm": ">=10"
   }
   ```
   This was updated in a previous task (T014) to align with CI requirements.

2. The newly created `docs/CONTRIBUTING.md` mentions the Node.js and pnpm version requirements in the Prerequisites section, but could be enhanced with more specific information.

### Implementation Strategy
Since the engines field is already correctly updated, I'll focus on ensuring the documentation is complete and clear about the tool version requirements:

1. Review the current documentation in CONTRIBUTING.md and README.md
2. Enhance documentation as needed to make version requirements more prominent and detailed
3. Add information about how the engines field works and how it helps maintain consistency

### Expected Changes
- Update the CONTRIBUTING.md file to provide more detailed information about the required tool versions
- Ensure the documentation explains how the engines field helps enforce version requirements

## Implementation Details
1. Enhance the Prerequisites section in CONTRIBUTING.md to include:
   - More detailed information about Node.js and pnpm version requirements
   - Explanation of the engines field in package.json and how it helps maintain consistency
   - Instructions for handling version mismatch warnings or errors

2. Ensure readers understand the importance of using the correct tool versions