import type { Meta, StoryObj } from "@storybook/react";

import { Input } from "./input";

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "password", "email", "number", "tel", "url", "search"],
      description: "The type of input",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text for the input",
    },
    disabled: {
      control: "boolean",
      description: "Whether the input is disabled",
    },
    className: {
      control: "text",
      description: "Additional CSS class names",
    },
    "aria-required": {
      control: "boolean",
      description:
        "Indicates to screen readers that input is required. Use alongside HTML 'required' attribute for both validation and accessibility.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    type: "text",
  },
};

export const Placeholder: Story = {
  args: {
    type: "text",
    placeholder: "Enter your text here...",
  },
};

export const Disabled: Story = {
  args: {
    type: "text",
    placeholder: "This input is disabled",
    disabled: true,
  },
};

export const TypePassword: Story = {
  args: {
    type: "password",
    placeholder: "Enter your password",
  },
};

export const TypeNumber: Story = {
  args: {
    type: "number",
    placeholder: "Enter a number",
  },
};

export const TypeEmail: Story = {
  args: {
    type: "email",
    placeholder: "email@example.com",
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <label
        htmlFor="email-demo"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Email
      </label>
      <Input type="email" id="email-demo" placeholder="Email" />
    </div>
  ),
};

export const Required: Story = {
  args: {
    type: "text",
    placeholder: "Required field",
    required: true,
    "aria-required": true,
  },
};
