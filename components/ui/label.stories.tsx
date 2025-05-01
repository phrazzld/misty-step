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
  },
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="default-input">Default Label</Label>
      <Input id="default-input" placeholder="Enter text..." />
    </div>
  ),
};

export const Required: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="required-input" required>
        Required Field
      </Label>
      <Input id="required-input" placeholder="Required field" required aria-required="true" />
    </div>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email-with-description">Email Address</Label>
      <Input id="email-with-description" type="email" placeholder="email@example.com" />
      <p className="text-xs text-muted-foreground">
        We&apos;ll never share your email with anyone else.
      </p>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="disabled-input">Disabled Field</Label>
      <Input id="disabled-input" placeholder="This field is disabled" disabled />
    </div>
  ),
};
