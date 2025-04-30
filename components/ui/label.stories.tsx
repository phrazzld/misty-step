import type { Meta, StoryObj } from "@storybook/react";

import { Input } from "./input";
import { Label } from "./label";

const meta: Meta<typeof Label> = {
  title: "UI/Label",
  component: Label,
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: "text",
      description: "The content of the label",
    },
    htmlFor: {
      control: "text",
      description: "The ID of the form element this label is associated with",
    },
    className: {
      control: "text",
      description: "Additional CSS class names",
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
      <Label htmlFor="required-input">
        Required Field <span className="text-destructive">*</span>
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
      <Label htmlFor="disabled-input" className="opacity-50 cursor-not-allowed">
        Disabled Field
      </Label>
      <Input id="disabled-input" placeholder="This field is disabled" disabled />
    </div>
  ),
};
