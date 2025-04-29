Okay, Council of Developers, let's synthesize the insights into a comprehensive implementation plan for setting up Storybook for the Misty Step marketing website.

## 1. Requirements Analysis

**Goal:** Integrate Storybook into the `marketing-site` project (Next.js 15+, React 19, TypeScript, Tailwind CSS, Shadcn UI, CSS Variables, Vite) to serve as a development environment, component library, and documentation tool for UI components.

**Scope:**

- Install and configure Storybook and necessary addons for the project's specific tech stack (React, Vite, TS, Tailwind).
- Ensure Storybook correctly loads and applies project styles: Tailwind utilities, `globals.css`, CSS variables (for theming/dark mode), and fonts.
- Configure Storybook to resolve project path aliases (e.g., `@/*`).
- Create initial, comprehensive stories for core Shadcn UI components currently used: `Button`, `Card`, `Input`, `Label`, `Textarea`.
- Stories should showcase component variations (variants, sizes), states (disabled, focus, hover), and allow interactive prop manipulation via controls.
- Stories must render correctly in both light and dark modes, utilizing the existing theme mechanism.
- Add necessary npm scripts for running and building Storybook.
- Update project documentation (`README.md`) with instructions for using Storybook.
- Integrate a Storybook build check into the CI pipeline (GitHub Actions).

**Non-Goals (Initial Setup):**

- Stories for complex site-specific layout components (e.g., `SiteHeader`, `Hero`) - can be added subsequently.
- Full visual regression testing setup (e.g., Chromatic) - can be added later.

## 2. Implementation Plan

**Phase 1: Setup & Configuration**

1.  **Install Storybook & Dependencies:**

    - Run the Storybook CLI init command, specifying the Vite builder (crucial for Next.js 15+):
      ```bash
      pnpm dlx storybook@latest init --builder vite
      ```
    - Verify installation of core packages: `@storybook/react-vite`, `@storybook/addon-essentials`, `@storybook/addon-interactions`, `@storybook/addon-links`.
    - Manually install necessary addons if not added automatically:
      ```bash
      pnpm add -D @storybook/addon-styling @storybook/addon-themes @storybook/addon-a11y
      ```
      _(Note: `@storybook/addon-styling` is preferred over the webpack-specific version)_

2.  **Configure Storybook (`.storybook/`):**

    - **`main.ts`:**
      - Verify `framework` is set to `@storybook/react-vite`.
      - Ensure `stories` glob points to colocated story files: `../components/**/*.stories.@(js|jsx|mjs|ts|tsx)`.
      - Register addons: `@storybook/addon-links`, `@storybook/addon-essentials`, `@storybook/addon-interactions`, `@storybook/addon-styling`, `@storybook/addon-themes`, `@storybook/addon-a11y`.
      - Configure `@storybook/addon-styling` for PostCSS/Tailwind:
        ```typescript
        // Example within addons array in main.ts
        {
          name: "@storybook/addon-styling",
          options: {
            postCss: {
              implementation: require.resolve("postcss"),
            },
          },
        }
        ```
      - Configure Vite settings if needed (e.g., for path aliases, though often handled automatically by the framework preset):
        ```typescript
        // Example within main.ts config object
        viteFinal: async (config) => {
          // Add alias resolution if necessary
          config.resolve.alias = {
            ...config.resolve.alias,
            '@': path.resolve(__dirname, '../'), // Adjust path as needed
          };
          return config;
        },
        ```
      - Add `staticDirs: ['../public']` to make public assets available.
    - **`preview.ts`:**

      - **Import Global Styles:** Add `import '../app/globals.css';` at the top.
      - **Configure Theme Decorator:** Use `withThemeByClassName` from `@storybook/addon-themes` to toggle the `dark` class on the `html` element:

        ```typescript
        import type { Preview } from "@storybook/react";
        import { withThemeByClassName } from "@storybook/addon-themes";
        import "../app/globals.css"; // Import Tailwind global styles

        const preview: Preview = {
          parameters: {
            /* ... default parameters ... */
          },
          decorators: [
            withThemeByClassName({
              themes: { light: "", dark: "dark" },
              defaultTheme: "light",
              parentSelector: "html",
            }),
            // Optional: Add font wrapper if globals.css doesn't cover Storybook context
            // (Story) => <div className="font-sans"><Story /></div>,
          ],
        };
        export default preview;
        ```

      - Ensure project fonts are loaded correctly (may require inspecting if `globals.css` import is sufficient or if font links/variables need explicit setup, potentially via `preview-head.html`).

**Phase 2: Initial Story Creation**

3.  **Create Core UI Component Stories:**
    - For each component (`Button`, `Card`, `Input`, `Label`, `Textarea`) within `components/ui/`:
      - Create a colocated story file (e.g., `components/ui/button.stories.tsx`).
      - Write stories using TypeScript and Component Story Format (CSF) 3.
      - Define `meta` with `title` (e.g., 'UI/Button'), `component`, `tags: ['autodocs']`, and `argTypes` for relevant props.
      - Create individual named exports for key variations/states:
        - `Button`: Default, Secondary, Destructive, Outline, Ghost, Link, different sizes, disabled, with icon, `asChild`.
        - `Card`: Basic structure, with Header/Footer/Content combinations.
        - `Input`: Default, with placeholder, disabled, different types (if applicable).
        - `Label`: Basic usage, associated with an input.
        - `Textarea`: Default, with placeholder, disabled.
      - Utilize Storybook Controls (`args` and `argTypes`) to allow interactive manipulation of props.
      - Ensure stories render correctly in both light and dark modes via the theme toggle.

**Phase 3: Integration & Documentation**

4.  **Add `package.json` Scripts:**

    - Verify/add scripts:
      ```json
      "scripts": {
        // ... existing scripts
        "storybook": "storybook dev -p 6006",
        "build-storybook": "storybook build"
      }
      ```

5.  **Update Documentation (`README.md`):**

    - Add a "Storybook" section explaining its purpose in the project (component development, documentation, visual testing).
    - Include commands: `pnpm storybook` (local development) and `pnpm build-storybook` (static build).
    - Provide brief guidelines on creating new stories (colocation, CSF format, covering variants/states).

6.  **CI Integration (e.g., `.github/workflows/ci.yml`):**
    - Add a job step (e.g., after linting/testing) to build Storybook:
      ```yaml
      - name: Build Storybook
        run: pnpm build-storybook
      ```
    - Ensure this step runs on pull requests to catch configuration or story errors early.

## 3. Testing Strategy

- **Manual Visual Inspection:** Developers run `pnpm storybook` locally and review each story for:
  - Correct rendering according to designs.
  - Proper application of Tailwind styles and CSS variables.
  - Correct behavior across variants and states.
  - Responsiveness (using Storybook viewport addon).
  - Accurate rendering in both light and dark modes (using theme toggle).
- **Interaction Testing:** Manually test interactive elements within stories (e.g., button clicks, input focus). Use `@storybook/addon-interactions` for automated interaction tests on key flows later, if desired.
- **Accessibility Testing:** Use the `@storybook/addon-a11y` panel within Storybook to identify basic accessibility violations in components.
- **Automated Build Check (CI):** The `pnpm build-storybook` command in the CI pipeline serves as a smoke test, ensuring Storybook configuration is valid and all stories compile successfully.
- **Complementary Unit Tests:** Storybook focuses on visual states; existing Vitest tests remain crucial for component logic, state management, and non-visual behavior testing.

## 4. Acceptance Criteria

- [ ] Storybook dependencies are correctly installed and listed in `package.json`.
- [ ] The `.storybook` directory contains valid `main.ts` and `preview.ts` configurations.
- [ ] `pnpm storybook` starts the Storybook development server successfully without errors.
- [ ] Stories for `Button`, `Card`, `Input`, `Label`, and `Textarea` are present under a 'UI' category in the Storybook navigation.
- [ ] Stories render components accurately, reflecting the application's Tailwind styles, custom themes (CSS variables), and fonts.
- [ ] Dark mode toggle works correctly, and components adapt their styling accordingly.
- [ ] Storybook controls allow interactive modification of component props, and the component display updates correctly.
- [ ] Path aliases (`@/*`) resolve correctly within stories.
- [ ] `pnpm build-storybook` command completes successfully without errors.
- [ ] The CI pipeline includes a `build-storybook` step, and it passes.
- [ ] `README.md` includes a section detailing Storybook usage for the project.
- [ ] All new code (stories, config) adheres to project linting and formatting standards.

## 5. Risks & Edge Cases

- **Theming/Styling Discrepancy:** Storybook might not perfectly match the app if `globals.css`, Tailwind config, or CSS variables aren't loaded identically.
  - _Mitigation:_ Ensure `globals.css` is imported in `preview.ts`, use the same `tailwind.config.mjs`, and verify CSS variable application (especially for fonts/dark mode).
- **Font Loading Issues:** Custom fonts might not load correctly in the Storybook environment.
  - _Mitigation:_ Ensure font imports/links are included, potentially via `globals.css` or a custom `.storybook/preview-head.html`.
- **Path Alias Conflicts:** Storybook's Vite config might clash with Next.js or project setup.
  - _Mitigation:_ Explicitly configure aliases in `viteFinal` within `main.ts` if auto-resolution fails.
- **Build Failures in CI:** Misconfiguration or errors in stories can break the CI build.
  - _Mitigation:_ Run `build-storybook` locally before pushing. Ensure CI environment has necessary dependencies.
- **Component Logic Dependency:** Stories for components relying heavily on external context or data fetching might require mocking.
  - _Mitigation:_ Provide mock data/context directly within the story file. This setup focuses on UI primitives, minimizing this risk initially.
