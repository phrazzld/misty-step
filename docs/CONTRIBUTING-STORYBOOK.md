# Storybook Contribution Guidelines

This document outlines the standards and best practices for creating and maintaining Storybook stories in the Misty Step marketing site project.

## Table of Contents

- [Overview](#overview)
- [File Organization](#file-organization)
- [Component Story Format (CSF) 3](#component-story-format-csf-3)
- [Story Structure](#story-structure)
- [Accessibility Testing](#accessibility-testing)
- [Theme Testing](#theme-testing)
- [Best Practices](#best-practices)

## Overview

Storybook is used in this project for:

- Component development and testing in isolation
- Visual documentation of UI components
- Accessibility testing via addon-a11y
- Theme testing (light/dark mode)
- Interactive examples and usage patterns

Our Storybook implementation includes the following addons:

- @storybook/addon-links
- @storybook/addon-essentials
- @storybook/addon-interactions
- @storybook/addon-a11y
- @storybook/addon-themes

## File Organization

- **File Colocation**: Story files should be placed alongside the component files they document.
- **Naming Convention**: Use `.stories.tsx` extension for all story files.
- **Example**: For a component at `components/ui/button.tsx`, create `components/ui/button.stories.tsx`.

## Component Story Format (CSF) 3

All stories must follow Component Story Format 3 with TypeScript:

```typescript
import type { Meta, StoryObj } from "@storybook/react";
import { Component } from "./component";

// Meta definition
const meta: Meta<typeof Component> = {
  title: "Category/Component",
  component: Component,
  tags: ["autodocs"],
  argTypes: {
    // Define controls for component props
    propName: {
      control: "boolean", // or "text", "select", "number", etc.
      description: "Description of this prop",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Component>;

// Story definitions
export const Default: Story = {
  args: {
    // Default props
  },
};
```

## Story Structure

### Meta Definition

- **Title**: Use a category prefix followed by the component name (`UI/Button`, `Layout/Header`).
- **Tags**: Always include `["autodocs"]` to generate automatic documentation.
- **ArgTypes**: Define controls for relevant props that users might want to modify.

### Story Variants

Create separate stories for different:

1. **Variants**: Different visual or functional variants of the component (e.g., primary vs. secondary button).
2. **States**: Different states the component can be in (e.g., default, disabled, loading).
3. **Sizes**: Different size variations if applicable.
4. **Compositions**: Show how the component works with other components when relevant.

### Args vs. Render Function

- **Simple Components**: Use the `args` property for basic prop variations.
- **Complex Components**: Use the `render` function for stories that require:
  - Multiple components together
  - State management
  - Custom event handlers
  - Complex layouts

Example of a render function:

```typescript
export const WithLabel: Story = {
  render: () => (
    <div className="grid w-full max-w-sm gap-1.5">
      <Label htmlFor="example">Example Label</Label>
      <Input id="example" placeholder="With associated label" />
    </div>
  ),
};
```

## Accessibility Testing

Each story should be tested for accessibility using the a11y addon:

1. Run Storybook in development mode (`pnpm storybook`).
2. Navigate to your component.
3. Select the "Accessibility" tab in the Storybook addon panel.
4. Address any violations that appear.

Common accessibility considerations:

- Ensure proper contrast ratios
- Provide appropriate labels and ARIA attributes
- Make sure interactive elements are keyboard accessible

## Theme Testing

All components should be tested in both light and dark themes:

1. Use the theme toggle in the Storybook toolbar to switch between themes.
2. Verify that the component displays correctly in both themes.
3. Pay attention to contrast, borders, and other visual elements that might change between themes.

## Best Practices

1. **Keep Stories Simple**: Each story should demonstrate one specific aspect or variant of a component.
2. **Document Props**: Use argTypes to document all relevant component props.
3. **Realistic Data**: Use realistic (but not sensitive) data in your stories for better context.
4. **Consistent Styling**: Use consistent styling patterns across all stories.
5. **Performance**: Avoid creating stories that are unnecessarily complex or slow to render.
6. **Show Edge Cases**: Include stories that demonstrate edge cases like long text, missing data, etc.
7. **Real-world Usage**: Include examples that show how components are used in real-world scenarios.
8. **Visual Consistency**: Use consistent sizing and spacing in your stories for better visual documentation.

By following these guidelines, we ensure our Storybook implementation provides valuable documentation, testing capabilities, and a consistent developer experience.
