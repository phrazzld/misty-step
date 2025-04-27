# T003 · Feature · P1: populate `coreServices` with final data

## Task Description

Replace the placeholder data in `coreServices` with the final content obtained from thinktank-provided clarifications (C001). Include icon details as decided via C002 (Lucide React icons).

## Approach

1. Use the thinktank-provided core services content from clarifications/C001-C002-responses.md
2. Update the `coreServices` array in `lib/content/services.ts` with the four recommended services
3. Add appropriate Lucide React icons for each service
4. Ensure all data conforms to the `ServiceOffering` interface
5. Verify code passes linting and type checking

## Implementation Steps

1. Install lucide-react package if not already installed
2. Import appropriate icons from lucide-react for each service
3. Update the `coreServices` array with the final content:
   - Strategic Technology Consulting
   - Custom Software Development
   - Cloud & DevOps Solutions
   - Data Analytics & AI
4. For each service, include:
   - id (kebab-case)
   - title
   - description
   - icon (using Lucide React components)
   - points array with key aspects
5. Run linting and type checking to ensure everything works correctly
