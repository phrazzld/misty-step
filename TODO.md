Okay, here is the detailed task breakdown for PLAN-1, following your specified format and requirements.

- [x] TASK-001: Initialize Storybook and Install Core Dependencies

**PRIORITY**: MUST
**DEPENDS-ON**: None
**ESTIMATED TIME**: S

**DESCRIPTION**:
Initialize Storybook within the `marketing-site` project using the Storybook CLI, specifying the Vite builder. This command bootstraps the basic configuration and installs core dependencies.

- Navigate to the project root directory in your terminal.
- Run the command: `pnpm dlx storybook@latest init --builder vite`
- Verify the command completes successfully.
- Check `package.json` to confirm the addition of core dev dependencies like `@storybook/react-vite`, `@storybook/addon-essentials`, `@storybook/addon-interactions`, `@storybook/addon-links`.

**ACCEPTANCE CRITERIA**:

- The `storybook init` command executes without errors.
- A `.storybook` directory is created in the project root.
- Core Storybook packages (`@storybook/react-vite`, `@storybook/addon-essentials`, etc.) are added to `devDependencies` in `package.json`.
- `pnpm install` runs successfully after the changes.

- [x] TASK-002: Install Additional Required Storybook Addons

**PRIORITY**: MUST
**DEPENDS-ON**: TASK-001
**ESTIMATED TIME**: S

**DESCRIPTION**:
Manually install the specific Storybook addons required by the plan that might not have been included by the default `init` command: Styling, Themes, and Accessibility.

- Run the command: `pnpm add -D @storybook/addon-styling @storybook/addon-themes @storybook/addon-a11y`
- Verify these packages are added to `devDependencies` in `package.json`.

**ACCEPTANCE CRITERIA**:

- `@storybook/addon-styling` is listed in `devDependencies` in `package.json`.
- `@storybook/addon-themes` is listed in `devDependencies` in `package.json`.
- `@storybook/addon-a11y` is listed in `devDependencies` in `package.json`.
- `pnpm install` runs successfully without peer dependency warnings related to these addons.

- [x] TASK-003: Configure `.storybook/main.ts`

**PRIORITY**: MUST
**DEPENDS-ON**: TASK-002
**ESTIMATED TIME**: M

**DESCRIPTION**:
Configure the main Storybook settings file (`.storybook/main.ts`) to integrate with the project's specific setup: Vite, story locations, addons, PostCSS/Tailwind, path aliases, and static asset serving.

- **File Affected**: `.storybook/main.ts`
- Ensure `framework` is set to `{ name: '@storybook/react-vite', options: {} }`.
- Define the `stories` glob pattern(s) to locate stories (e.g., `['../components/**/*.stories.@(js|jsx|mjs|ts|tsx)', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)']`).
- Register all required addons in the `addons` array: `@storybook/addon-links`, `@storybook/addon-essentials`, `@storybook/addon-interactions`, `@storybook/addon-styling`, `@storybook/addon-themes`, `@storybook/addon-a11y`.
- Configure `@storybook/addon-styling` options for PostCSS: `{ name: "@storybook/addon-styling", options: { postCss: { implementation: require.resolve("postcss") } } }`.
- Implement the `viteFinal` async function to add the `@/*` path alias using `path.resolve`. Import `path` module.
- Add `staticDirs: ['../public']` to serve static assets from the project's public directory.

**ACCEPTANCE CRITERIA**:

- `.storybook/main.ts` is syntactically correct TypeScript.
- The `framework` configuration is correct for React+Vite.
- The `stories` array includes patterns covering component and potential dedicated story directories.
- All six specified addons are listed in the `addons` array.
- `@storybook/addon-styling` is configured with the PostCSS implementation.
- The `viteFinal` function correctly configures the `@/*` alias relative to the project root.
- `staticDirs` is correctly configured to point to `../public`.

- [x] TASK-004: Configure `.storybook/preview.ts`

**PRIORITY**: MUST
**DEPENDS-ON**: TASK-001
**ESTIMATED TIME**: M

**DESCRIPTION**:
Configure the Storybook preview file (`.storybook/preview.ts`) to load global styles, set up theme switching (light/dark mode), and ensure project fonts are applied correctly.

- **File Affected**: `.storybook/preview.ts`
- Import the project's global CSS file at the top: `import '../app/globals.css';`.
- Configure the `parameters` for controls matchers if not already present.
- Add the `decorators` array.
- Import `withThemeByClassName` from `@storybook/addon-themes`.
- Add the `withThemeByClassName` decorator configured for light/dark mode toggling via the `dark` class on the `html` element:
  ```typescript
  withThemeByClassName({
    themes: { light: "", dark: "dark" },
    defaultTheme: "light",
    parentSelector: "html",
  });
  ```
- Consider adding a font wrapper decorator (e.g., `(Story) => <div className="font-sans"><Story /></div>`) if the global CSS import alone doesn't apply the base font correctly (verify in TASK-008).

**ACCEPTANCE CRITERIA**:

- `.storybook/preview.ts` is syntactically correct TypeScript.
- `../app/globals.css` is imported.
- The `decorators` array includes `withThemeByClassName` configured correctly for HTML class-based theming.
- Basic `parameters.controls` are configured.

- [x] TASK-005: Add Storybook npm Scripts to `package.json`

**PRIORITY**: MUST
**DEPENDS-ON**: TASK-001
**ESTIMATED TIME**: S

**DESCRIPTION**:
Add standardized npm scripts to the project's `package.json` for running the Storybook development server and building the static Storybook site.

- **File Affected**: `package.json`
- Add or verify the following scripts under the `"scripts"` key:
  ```json
  "storybook": "storybook dev -p 6006",
  "build-storybook": "storybook build"
  ```

**ACCEPTANCE CRITERIA**:

- `package.json` contains the `storybook` script with the command `storybook dev -p 6006`.
- `package.json` contains the `build-storybook` script with the command `storybook build`.

- [x] TASK-006: Create Placeholder Verification Story

**PRIORITY**: MUST
**DEPENDS-ON**: TASK-003, TASK-004
**ESTIMATED TIME**: M

**DESCRIPTION**:
Create a minimal Storybook story to act as a test case for verifying the entire setup works end-to-end. This story will utilize Tailwind, global styles, path aliases, static assets, and theming.

- Create a sample asset (e.g., `vercel.svg`) in the `public/` directory if one doesn't exist.
- Create a new story file (e.g., `stories/SetupVerification.stories.tsx`) at a location matched by the `stories` glob in `main.ts`.
- **File Affected**: `stories/SetupVerification.stories.tsx` (new file)
- Implement the story as per the plan example:
  - Import React, Meta, StoryObj.
  - Import a UI component (e.g., `Button`) using the `@/` alias.
  - Render JSX demonstrating:
    - Tailwind utility classes (`p-4`, `text-2xl`, `font-bold`).
    - Global styles/CSS variables (`text-primary`, `text-foreground`).
    - Project font class (`font-sans`).
    - The imported component (`<Button>`).
    - An `<img>` tag loading the static asset (`<img src="/vercel.svg" ... />`).
- Define `Meta` with `title: 'Setup/Verification'`.

**ACCEPTANCE CRITERIA**:

- The story file `stories/SetupVerification.stories.tsx` is created and syntactically correct.
- The story imports a component using the `@/` alias successfully.
- The story's render function includes elements testing Tailwind, global styles, fonts, aliases, and static assets.
- A sample static asset exists in the `public/` directory.

- [x] TASK-007: Update README.md Documentation

**PRIORITY**: MUST
**DEPENDS-ON**: TASK-005
**ESTIMATED TIME**: S

**DESCRIPTION**:
Update the project's `README.md` file to document the addition of Storybook, explaining its purpose and how developers can use the newly added scripts.

- **File Affected**: `README.md`
- Add a new "Storybook" section.
- Briefly explain its purpose (component development, documentation).
- Include usage instructions for the `pnpm storybook` (local development) and `pnpm build-storybook` (static build) commands.

**ACCEPTANCE CRITERIA**:

- `README.md` contains a clear "Storybook" section.
- The section accurately describes Storybook's purpose within the project.
- The section correctly lists the `pnpm storybook` and `pnpm build-storybook` commands with brief explanations.

- [x] TASK-008: Manual Verification of Storybook Development Server

**PRIORITY**: MUST
**DEPENDS-ON**: TASK-006
**ESTIMATED TIME**: M

**DESCRIPTION**:
Run the Storybook development server locally and perform manual checks using the "Setup/Verification" story to confirm that all configuration aspects are working correctly in a development environment.

- Run `pnpm storybook`.
- Open Storybook in the browser.
- Navigate to the "Setup/Verification" story.
- **Verify**:
  - Storybook starts without console errors.
  - The story renders without errors.
  - **Visuals**: Tailwind classes, global styles (`text-primary`), and project fonts (`font-sans`) are applied correctly (use browser dev tools inspection).
  - **Aliases**: The imported `Button` component renders correctly.
  - **Static Assets**: The image from `/public` loads and displays.
  - **Theming**: Use the toolbar toggle to switch between light and dark modes. Confirm the `dark` class appears on `<html>` and styles update accordingly.

**ACCEPTANCE CRITERIA**:

- `pnpm storybook` starts successfully.
- The "Setup/Verification" story renders correctly.
- Visual inspection confirms Tailwind, global styles, and fonts are applied as expected.
- The component imported via alias renders without errors.
- The static asset from `/public` is displayed correctly.
- The theme toggle correctly applies the `dark` class and updates component appearance.
- No critical errors related to the setup appear in the browser console.

- [x] TASK-009: Install `postcss-nesting` Dependency

**PRIORITY**: MUST
**DEPENDS-ON**: None
**ESTIMATED TIME**: S

**ACTION**:

1.  Add the `postcss-nesting` package as a development dependency using the project's package manager:
    ```bash
    pnpm add -D postcss-nesting
    ```
2.  Verify that `postcss-nesting` is added to `devDependencies` in `package.json`.
3.  Ensure the lock file (`pnpm-lock.yaml`) is updated.

**AC Ref**: None

- [x] TASK-010: Update Root `postcss.config.mjs` for Tailwind v4

**PRIORITY**: MUST
**DEPENDS-ON**: TASK-009
**ESTIMATED TIME**: S

**ACTION**:

1.  Modify the root `postcss.config.mjs` file.
2.  Import the necessary plugins: `postcss-nesting`, `tailwindcss`, `autoprefixer`.
3.  Update the `plugins` array to use the standard Tailwind CSS v4 structure in the correct order:

    ```javascript
    // postcss.config.mjs
    import nesting from "postcss-nesting";
    import tailwindcss from "tailwindcss";
    import autoprefixer from "autoprefixer";

    const config = {
      plugins: [
        nesting(), // MUST come before tailwindcss
        tailwindcss(),
        autoprefixer(),
      ],
    };

    export default config;
    ```

4.  Remove any imports or usage of `@tailwindcss/postcss` or `tailwindcss/nesting` from this file.
5.  Save the changes.

**AC Ref**: None

- [x] TASK-011: Remove Storybook-Specific PostCSS Configuration File

**PRIORITY**: MUST
**DEPENDS-ON**: TASK-010
**ESTIMATED TIME**: S

**ACTION**:

1.  Delete the custom PostCSS configuration file previously created specifically for Storybook (likely located at `.storybook/postcss.config.mjs`).
    ```bash
    rm .storybook/postcss.config.mjs
    ```
2.  Verify the file no longer exists in the project structure.

**AC Ref**: None

- [x] TASK-012: Remove `webpackFinal` PostCSS Override from Storybook Config

**PRIORITY**: MUST
**DEPENDS-ON**: TASK-011
**ESTIMATED TIME**: S

**ACTION**:

1.  Edit the Storybook main configuration file (`.storybook/main.ts`).
2.  Locate the `webpackFinal` function within the exported configuration object.
3.  Remove or comment out the specific logic within `webpackFinal` that modified the `postcss-loader` options to point to the (now deleted) `.storybook/postcss.config.mjs` file.
    *(Ensure only the PostCSS loader modification part is removed, preserving other unrelated customizations if they exist. If the *only* purpose of `webpackFinal` was the PostCSS override, remove the entire `webpackFinal` key.)*
4.  Save the changes.

**AC Ref**: None

- [x] TASK-013: Update `tailwind.config.mjs` Content Paths for Storybook

**PRIORITY**: MUST
**DEPENDS-ON**: None
**ESTIMATED TIME**: S

**ACTION**:

1.  Edit the root `tailwind.config.mjs` file.
2.  Ensure the `content` array includes glob patterns that cover Storybook story files and any Storybook configuration/preview files that might use Tailwind classes. Add/verify the following patterns:
    ```diff
    --- a/tailwind.config.mjs
    +++ b/tailwind.config.mjs
    @@ -?,? +?,? @@
     export default {
       content: [
         "./pages/**/*.{js,ts,jsx,tsx,mdx}",
         "./components/**/*.{js,ts,jsx,tsx,mdx}",
         "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ```

-        // Add/verify paths for Storybook files
-        "./stories/**/*.{js,ts,jsx,tsx,mdx}",
-        "./.storybook/**/*.{js,ts,jsx,tsx,mdx}",
       ],
       darkMode: ["selector", '[data-mode="dark"]'],
       theme: {

  ```

  ```

3.  Save the changes.

**AC Ref**: None

- [x] TASK-014: Verify Dependencies and Update PostCSS Configuration

**PRIORITY**: MUST
**DEPENDS-ON**: TASK-009, TASK-010
**ESTIMATED TIME**: S

**ACTION**:

1.  Inspect `package.json`.
2.  Verify the following packages are listed as dependencies or devDependencies:
    - `tailwindcss` (ensure it's v4+)
    - `postcss`
    - `autoprefixer`
    - `postcss-nesting` (added in TASK-009)
3.  Check if `@tailwindcss/postcss` is listed as a direct dependency or devDependency. If present, remove it:
    ```bash
    pnpm remove @tailwindcss/postcss
    ```
4.  Run `pnpm install` after any removal to update the lock file and ensure consistency.

**AC Ref**: None

- [x] TASK-015: Test Storybook Integration with Tailwind v4

**PRIORITY**: MUST
**DEPENDS-ON**: TASK-010, TASK-011, TASK-012, TASK-013, TASK-014
**ESTIMATED TIME**: M

**ACTION**:

1.  Ensure all dependencies are fully installed: `pnpm install`.
2.  Start the Storybook development server: `pnpm storybook`.
3.  Check the terminal output for any PostCSS, Tailwind, or nesting-related errors during startup. Confirm the previous error (`Loading PostCSS 'tailwindcss/nesting' plugin failed`) is resolved.
4.  Open Storybook in the browser.
5.  Navigate to stories that utilize Tailwind CSS classes.
6.  Verify that components render correctly with Tailwind styles applied.
7.  If using `@storybook/addon-themes` or a similar theme toggler, test switching between modes (e.g., light/dark) and verify that styles update correctly according to Tailwind's `darkMode` configuration.

**AC Ref**: None

- [x] TASK-016: Mark Original Issue TASK-008 as Completed

**PRIORITY**: MUST
**DEPENDS-ON**: TASK-015
**ESTIMATED TIME**: S

**ACTION**:

1.  Confirm that TASK-015 (Testing) has passed successfully and the integration is working as expected.
2.  Edit the `TODO.md` file.
3.  Locate the entry for `TASK-008: Manual Verification of Storybook Development Server`.
4.  Update the line to mark the task as completed by changing `[~]` to `[x]`.
    ```diff
    - ## [~] TASK-008: Manual Verification of Storybook Development Server
    + ## [x] TASK-008: Manual Verification of Storybook Development Server
    ```
5.  Save the `TODO.md` file.

**AC Ref**: None

- [ ] TASK-009: Verify Local Storybook Build

**PRIORITY**: MUST
**DEPENDS-ON**: TASK-005, TASK-006
**ESTIMATED TIME**: S

**DESCRIPTION**:
Execute the static Storybook build command locally to ensure the build process completes without errors, confirming the configuration is valid for production builds.

- Run `pnpm build-storybook`.
- Check the terminal output for any build errors.

**ACCEPTANCE CRITERIA**:

- The `pnpm build-storybook` command finishes successfully.
- No build errors are reported in the console output.
- A `storybook-static` directory (or configured output directory) is generated.

- [ ] TASK-010: Integrate Storybook Build into CI Pipeline

**PRIORITY**: MUST
**DEPENDS-ON**: TASK-009
**ESTIMATED TIME**: M

**DESCRIPTION**:
Add a step to the project's Continuous Integration (CI) workflow (e.g., GitHub Actions) to execute the `build-storybook` command. This serves as an automated check to prevent regressions in the Storybook setup.

- **File Affected**: `.github/workflows/ci.yml` (or equivalent)
- Add a new step, typically after dependency installation and linting/testing steps.
- Configure the step to run the command: `pnpm build-storybook`.
- Ensure this step runs on pull requests and pushes to the main branch.

**ACCEPTANCE CRITERIA**:

- The CI workflow file is updated with a new step for building Storybook.
- The step executes `pnpm build-storybook`.
- The CI workflow successfully completes the "Build Storybook" step on a test commit/PR containing these changes.

- [ ] TASK-011: Code Review and QA Sign-off

**PRIORITY**: MUST
**DEPENDS-ON**: TASK-007, TASK-008, TASK-010
**ESTIMATED TIME**: M

**DESCRIPTION**:
Submit all the code changes for review by another developer. Perform final Quality Assurance checks, ensuring all previous tasks' acceptance criteria are met and the overall setup aligns with the plan.

- Create a Pull Request containing all changes from TASK-001 to TASK-010.
- Request code review.
- Reviewer checks:
  - Configuration files (`.storybook/`, `package.json`, CI workflow) for correctness and adherence to the plan.
  - Placeholder story implementation.
  - README documentation clarity.
  - Code quality and standards.
- Reviewer (or developer) performs a final check by running `pnpm storybook` and verifying TASK-008 criteria, and confirming `pnpm build-storybook` succeeds locally (TASK-009).
- Confirm the CI build (TASK-010) passes on the PR.

**ACCEPTANCE CRITERIA**:

- Pull Request is reviewed and approved by at least one team member.
- All code changes adhere to project standards.
- All acceptance criteria from PLAN-1 and tasks TASK-001 through TASK-010 are confirmed as met.
- CI pipeline passes for the PR.

- [ ] TASK-012: (Optional) Add Font Loading via `preview-head.html`

**PRIORITY**: NICE-TO-HAVE
**DEPENDS-ON**: TASK-004, TASK-008 (if fonts didn't load correctly)
**ESTIMATED TIME**: S

**DESCRIPTION**:
If TASK-008 revealed that project fonts are not loading correctly via the `globals.css` import in `preview.ts`, implement font loading by adding `<link>` tags directly to the Storybook head using `.storybook/preview-head.html`.

- Create the file `.storybook/preview-head.html`.
- Add the necessary `<link>` tags pointing to the font files (e.g., Google Fonts CDN links or locally served font files).

**ACCEPTANCE CRITERIA**:

- If implemented, `.storybook/preview-head.html` exists and contains valid `<link>` tags for project fonts.
- Project fonts load correctly in Storybook when verified via `pnpm storybook` and inspecting elements in the "Setup/Verification" story.

---

**Potential Parallel Work Streams:**

- After **TASK-002** is complete:
  - **TASK-003** (Configure `main.ts`) and **TASK-004** (Configure `preview.ts`) can be worked on in parallel.
  - **TASK-005** (Add Scripts) can be done in parallel with configuration.
- After **TASK-005** is complete:
  - **TASK-007** (Update README) can be done.
  - **TASK-010** (Integrate CI) can be started, although final validation depends on a working build.
- **TASK-006** (Create Placeholder Story) depends on **TASK-003** and **TASK-004** being sufficiently complete (especially aliases and styling).
