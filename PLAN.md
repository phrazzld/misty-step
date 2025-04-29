# PLAN-2: Initial UI Component Story Creation

## 1. Introduction & Goal

This plan outlines the creation of the initial set of comprehensive stories for core Shadcn UI components within the established Storybook environment for the `marketing-site` project.

**Goal:** Create high-quality, interactive stories for the `Button`, `Card`, `Input`, `Label`, and `Textarea` components, showcasing their variations, states, and props, leveraging the Storybook platform set up in Plan 1.

---

## 2. Context

Following the successful setup and configuration of the Storybook environment (Plan 1), this plan focuses on populating it with meaningful content. These stories will serve as living documentation, enable isolated component development, and facilitate visual testing and accessibility checks for our core UI building blocks.

**Overall Project Goal:** Integrate Storybook into the `marketing-site` project to serve as a development environment, component library, and documentation tool for UI components.

**Non-Goals (This Plan):**

- Modifying core Storybook setup/configuration (Handled in Plan 1).
- Stories for complex, application-specific layout components.
- Implementing full visual regression testing or advanced interaction testing.

---

## 3. Scope

- For each target component (`Button`, `Card`, `Input`, `Label`, `Textarea`) in `components/ui/`:
  - Create a colocated story file (e.g., `components/ui/button.stories.tsx`).
  - Implement stories using Component Story Format (CSF) 3 and TypeScript.
  - Define `meta` including `title`, `component`, `tags: ['autodocs']`, and `argTypes` for interactive controls.
  - Create named story exports covering key variations (variants, sizes), states (disabled, focus, hover), and common use cases (e.g., Button `asChild`).
  - Utilize Storybook Controls (`args` and `argTypes`) for interactive prop manipulation.
  - Verify correct rendering in both light and dark modes using the existing theme toggle.
- Update project documentation (`README.md` or dedicated file) with guidelines on _how to create_ new stories.

---

## 4. Implementation Steps

1.  **Create Core UI Component Stories:**

    - Navigate to `components/ui/`. For each target component:

      - Create `[componentName].stories.tsx`.
      - Write stories using CSF 3 and TypeScript.
      - Define `meta`:

        ```typescript
        import type { Meta, StoryObj } from "@storybook/react";
        import { Button } from "./button"; // Import the component

        const meta: Meta<typeof Button> = {
          title: "UI/Button", // Use a clear hierarchy
          component: Button,
          tags: ["autodocs"], // Enable automatic documentation generation
          argTypes: {
            // Define controls for props
            variant: {
              control: "select",
              options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
            },
            size: {
              control: "select",
              options: ["default", "sm", "lg", "icon"],
            },
            disabled: { control: "boolean" },
            // Add other relevant props like 'asChild', 'children' (if needed)
          },
        };
        export default meta;
        type Story = StoryObj<typeof Button>; // Define Story type
        ```

      - Create named exports for variations/states:
        - **`Button`**: Default, Secondary, Destructive, Outline, Ghost, Link, SmallSize, LargeSize, IconSize, Disabled, WithIcon (requires importing an icon), AsChild (requires wrapping another element).
        - **`Card`**: Basic, WithHeader, WithFooter, WithHeaderAndFooter, FullExample (Header+Title+Description+Content+Footer).
        - **`Input`**: Default, Placeholder, Disabled, TypePassword, TypeNumber, TypeEmail.
        - **`Label`**: Default (associated with an input via `htmlFor`).
        - **`Textarea`**: Default, Placeholder, Disabled.
      - Use `args` in stories to set default prop values for each specific story:
        ```typescript
        export const Secondary: Story = {
          args: {
            variant: "secondary",
            children: "Secondary Button",
          },
        };
        export const Disabled: Story = {
          args: {
            disabled: true,
            children: "Disabled Button",
          },
        };
        ```
      - Verify rendering in both light and dark modes using the theme toggle.

2.  **Update Documentation (`README.md` or `CONTRIBUTING-STORYBOOK.md`):**
    - Add guidelines for creating new stories:
      - Colocate `*.stories.tsx` files with components.
      - Use CSF 3 and TypeScript.
      - Define `meta` (title, component, tags, argTypes).
      - Create named exports for key variants/states.
      - Utilize `args` for story-specific props.
      - Check light/dark modes and use the a11y addon.

---

## 5. Testing Strategy

- **Manual Visual Inspection:**
  - Run `pnpm storybook`. Review each new story (`UI/Button`, `UI/Card`, etc.).
  - Verify correct rendering of all variants and states against design specs.
  - Confirm styles (Tailwind, CSS vars) are applied correctly.
  - Test hover, focus, and disabled states visually.
  - Use the theme toggle extensively to check light/dark mode rendering for every story.
  - Use the viewport addon (if relevant) for responsiveness checks.
- **Interaction Testing:**
  - Use Storybook Controls to change props and verify the component updates correctly in the canvas.
  - Manually interact with components (click buttons, type in inputs/textareas).
- **Accessibility Testing:**
  - Use the `@storybook/addon-a11y` panel for each story. Identify and address basic accessibility violations reported.
- **Automated Build Check (CI):** The `build-storybook` step in CI (from Plan 1) ensures the new stories compile without errors.

---

## 6. Acceptance Criteria

- [ ] Colocated `*.stories.tsx` files exist for `Button`, `Card`, `Input`, `Label`, and `Textarea` in `components/ui/`.
- [ ] Stories are organized under a 'UI' category in the Storybook navigation.
- [ ] Stories cover the specified key variations, states, and use cases for each component.
- [ ] Components render accurately with project styles/themes in Storybook for all stories.
- [ ] Stories function correctly in both light and dark modes.
- [ ] Storybook Controls (`args`/`argTypes`) allow interactive modification of relevant props, and the component display updates correctly.
- [ ] Stories pass basic accessibility checks using the `@storybook/addon-a11y` panel.
- [ ] Story files adhere to CSF 3 format, TypeScript, and project standards.
- [ ] Documentation includes guidelines for creating new stories.
- [ ] The CI `build-storybook` step passes with the new stories included.

---

## 7. Risks & Edge Cases

- **Component Logic Dependency:** Components needing external context/data may require mocking within stories.
  - _Mitigation:_ Provide mocks/context wrappers directly in stories or via decorators. Keep focus on UI state for these primitive components.
- **Incomplete Coverage:** Missing edge-case prop combinations or states.
  - _Mitigation:_ Prioritize common cases. Review for completeness. Add stories iteratively.
- **Styling Divergence:** Subtle style differences between app and Storybook (if Plan 1 setup wasn't perfect).
  - _Mitigation:_ Compare with app rendering. If issues trace back to core setup, address them there (potentially outside this plan's scope).

---

## 8. Dependency Notes

- **Requires:** Successful completion and merge of `PLAN-1: Storybook Core Setup & Integration`. The Storybook environment must be fully functional before starting this plan.
- This plan has no further Storybook-related dependencies outlined in the original scope.
