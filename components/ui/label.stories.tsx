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

export const StandardLabel: Story = {
  name: "Standard Label with Input",
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

// Edge case stories

export const LongLabelText: Story = {
  name: "Label with Long Text",
  parameters: {
    docs: {
      description: {
        story: "A label with extremely long text to test text wrapping and overflow behavior.",
      },
    },
  },
  args: {
    htmlFor: "long-text-input",
    children:
      "This is an extremely long label text that tests how the component handles text wrapping and overflow when used as a form element label with content that far exceeds typical label length",
  },
  decorators: [
    (Story) => (
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Story />
        <Input id="long-text-input" placeholder="Input with long label" />
      </div>
    ),
  ],
};

export const EmptyLabel: Story = {
  name: "Empty Label",
  parameters: {
    docs: {
      description: {
        story:
          "A label with empty text content but with aria-label for accessibility to test how the component handles empty content.",
      },
    },
  },
  args: {
    htmlFor: "empty-label-input",
    children: "",
    "aria-label": "Empty visual label with aria-label for screen readers",
  },
  decorators: [
    (Story) => (
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Story />
        <Input id="empty-label-input" placeholder="Input with empty label" />
        <p className="text-xs text-muted-foreground mt-1">
          The label above is empty but has an aria-label for screen readers.
        </p>
      </div>
    ),
  ],
};

export const WithHTMLContent: Story = {
  name: "Label with HTML Content",
  parameters: {
    docs: {
      description: {
        story:
          "A label containing HTML elements like bold text, links, and a tooltip to test complex content rendering.",
      },
    },
  },
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="html-content-input">
        Label with <strong>bold text</strong> and a{" "}
        <span
          className="relative cursor-help underline decoration-dotted underline-offset-2"
          title="This is a tooltip"
        >
          tooltip
        </span>{" "}
        and a{" "}
        <a href="#" className="text-primary hover:underline">
          link
        </a>
      </Label>
      <Input id="html-content-input" placeholder="Input with rich text label" />
    </div>
  ),
};

export const LabelWithSpecialCharacters: Story = {
  name: "Label with Special Characters",
  parameters: {
    docs: {
      description: {
        story:
          "A label containing various special characters, symbols, and emojis to verify proper rendering of non-standard text.",
      },
    },
  },
  args: {
    htmlFor: "special-chars-input",
    children: "→ Your Name & Email ←  🚀 ★ Nombre (必須) é ç ñ",
  },
  decorators: [
    (Story) => (
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Story />
        <Input id="special-chars-input" placeholder="Input with special character label" />
      </div>
    ),
  ],
};

export const LabelWithAccessibilityEdgeCases: Story = {
  name: "Label with Accessibility Edge Cases",
  parameters: {
    docs: {
      description: {
        story:
          "Tests various accessibility edge cases for labels, including very long aria attributes and connections to other elements.",
      },
    },
  },
  render: () => (
    <div className="space-y-6">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="a11y-input-1" aria-describedby="very-long-description-1">
          Label with long aria-describedby
        </Label>
        <Input id="a11y-input-1" placeholder="Input with accessibility features" />
        <p id="very-long-description-1" className="text-xs text-muted-foreground mt-1">
          This is an extremely long description that is connected to the label above via
          aria-describedby. It provides extensive details about the input field to test how
          assistive technologies handle verbose descriptions and whether they&apos;re properly
          associated with the label element, which might be read along with the label itself
          depending on the screen reader&apos;s behavior.
        </p>
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <span id="a11y-external-label" className="sr-only">
          This is an extremely long external text that serves as a label for the input below through
          aria-labelledby, testing how assistive technologies handle verbose labels that are
          connected to form elements but not directly visible on screen. This pattern is sometimes
          used for more complex labeling scenarios.
        </span>
        <Label htmlFor="a11y-input-2" aria-labelledby="a11y-external-label">
          Label with external aria-labelledby
        </Label>
        <Input id="a11y-input-2" placeholder="Input with external label reference" />
        <p className="text-xs text-muted-foreground mt-1">
          This label references an external element via aria-labelledby.
        </p>
      </div>
    </div>
  ),
};
