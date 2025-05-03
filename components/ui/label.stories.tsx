import type { Meta, StoryObj } from "@storybook/react";

import { Input } from "./input";
import { Label } from "./label";

const meta: Meta<typeof Label> = {
  title: "UI/Label",
  component: Label,
  tags: ["autodocs"],
  argTypes: {
    // Content
    children: {
      control: "text",
      description: "The content of the label",
    },

    // Identification and relationships
    id: {
      control: "text",
      description: "Unique identifier for the label element",
    },
    htmlFor: {
      control: "text",
      description: "The ID of the form element this label is associated with",
    },

    // Label states and features
    required: {
      control: "boolean",
      description: "Displays a required indicator (*) after the label text",
    },

    // Styling
    className: {
      control: "text",
      description: "Additional CSS class names",
    },

    // Accessibility attributes
    "aria-labelledby": {
      control: "text",
      description:
        "ID of an element that labels this element. Use when a label can't be directly associated via htmlFor.",
    },
    "aria-describedby": {
      control: "text",
      description:
        "ID of an element that describes this label's associated input. Useful for linking to help text or error messages.",
    },
    "aria-owns": {
      control: "text",
      description:
        "Indicates element(s) that are owned by the label but not in the DOM hierarchy. Useful for complex form relationships.",
    },
    "aria-hidden": {
      control: "boolean",
      description: "Whether to hide the label from screen readers (use with caution)",
    },
    "aria-live": {
      control: "select",
      options: ["off", "polite", "assertive"],
      description: "Indicates how assistive technologies should announce updates to the label",
    },
    "aria-atomic": {
      control: "boolean",
      description: "Whether the entire label should be announced when it changes",
    },

    // Event handlers - control: false means they won't appear in controls panel
    onClick: {
      control: false,
      description: "Function called when the label is clicked",
    },
    onMouseEnter: {
      control: false,
      description: "Function called when mouse enters the label area",
    },
    onMouseLeave: {
      control: false,
      description: "Function called when mouse leaves the label area",
    },
    onFocus: {
      control: false,
      description: "Function called when the label receives focus",
    },
    onBlur: {
      control: false,
      description: "Function called when the label loses focus",
    },
    onKeyDown: {
      control: false,
      description: "Function called when a key is pressed while the label is focused",
    },

    // HTML attributes
    lang: {
      control: "text",
      description: "The language of the label content",
    },
    dir: {
      control: "select",
      options: ["ltr", "rtl", "auto"],
      description: "The text direction of the label content",
    },
    style: {
      control: false,
      description: "Inline CSS styles for the label element",
    },
    title: {
      control: "text",
      description: "Additional information shown as a tooltip when hovering over the label",
    },
    tabIndex: {
      control: "number",
      description:
        "Tab order of the element (typically -1 for labels as they're not usually focusable)",
    },

    // Radix UI Label specific props from @radix-ui/react-label
    asChild: {
      control: "boolean",
      description:
        "Change the default rendered element for the one passed as a child, merging their props and behavior",
    },
    ref: {
      control: false,
      description: "React ref forwarded to the underlying DOM element",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: {
    htmlFor: "default-input",
    children: "Default Label",
  },
  decorators: [
    (Story) => (
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Story />
        <Input id="default-input" placeholder="Enter text..." />
      </div>
    ),
  ],
};

export const Required: Story = {
  args: {
    htmlFor: "required-input",
    required: true,
    children: "Required Field",
  },
  decorators: [
    (Story) => (
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Story />
        <Input id="required-input" placeholder="Required field" required aria-required="true" />
      </div>
    ),
  ],
};

export const WithDescription: Story = {
  args: {
    htmlFor: "email-with-description",
    children: "Email Address",
  },
  decorators: [
    (Story) => (
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Story />
        <Input id="email-with-description" type="email" placeholder="email@example.com" />
        <p className="text-xs text-muted-foreground">
          We&apos;ll never share your email with anyone else.
        </p>
      </div>
    ),
  ],
};

export const Disabled: Story = {
  args: {
    htmlFor: "disabled-input",
    children: "Disabled Field",
  },
  decorators: [
    (Story) => (
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Story />
        <Input id="disabled-input" placeholder="This field is disabled" disabled />
      </div>
    ),
  ],
};
