import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";

import { Label } from "./label";
import { Textarea } from "./textarea";

const meta: Meta<typeof Textarea> = {
  title: "UI/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  argTypes: {
    placeholder: {
      control: "text",
      description: "Placeholder text for the textarea",
    },
    disabled: {
      control: "boolean",
      description: "Whether the textarea is disabled",
    },
    rows: {
      control: { type: "number", min: 2, max: 20 },
      description: "Number of visible text lines",
    },
    className: {
      control: "text",
      description: "Additional CSS class names",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    rows: 4,
  },
};

export const Placeholder: Story = {
  args: {
    placeholder: "Type your message here...",
    rows: 4,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "This textarea is disabled",
    disabled: true,
    rows: 4,
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="grid w-full max-w-sm gap-1.5">
      <Label htmlFor="message">Your message</Label>
      <Textarea id="message" placeholder="Type your message here..." rows={4} />
    </div>
  ),
};

// Component that uses useState to track character count
const TextareaWithCounter = (): React.ReactElement => {
  const [value, setValue] = React.useState("");
  const maxLength = 200;

  return (
    <div className="grid w-full max-w-sm gap-1.5">
      <Label htmlFor="character-count">Bio</Label>
      <Textarea
        id="character-count"
        placeholder="Tell us about yourself..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        maxLength={maxLength}
        rows={4}
      />
      <div className="text-right text-xs text-muted-foreground">
        {value.length}/{maxLength} characters
      </div>
    </div>
  );
};

export const WithCharacterCount: Story = {
  render: () => <TextareaWithCounter />,
};

export const Required: Story = {
  render: () => (
    <div className="grid w-full max-w-sm gap-1.5">
      <Label htmlFor="required-message">
        Message <span className="text-destructive">*</span>
      </Label>
      <Textarea
        id="required-message"
        placeholder="This field is required"
        required
        aria-required="true"
        rows={4}
      />
    </div>
  ),
};
