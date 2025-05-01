import type { Meta, StoryObj } from "@storybook/react";

import { Input } from "./input";
import { Label } from "./label";

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    // Input type
    type: {
      control: "select",
      options: ["text", "password", "email", "number", "tel", "url", "search"],
      description: "The type of input",
    },
    // Text attributes
    placeholder: {
      control: "text",
      description: "Placeholder text for the input",
    },
    value: {
      control: "text",
      description: "The controlled value of the input",
    },
    defaultValue: {
      control: "text",
      description: "The default value of the input (uncontrolled)",
    },
    // Identification
    id: {
      control: "text",
      description: "Unique identifier for the input",
    },
    name: {
      control: "text",
      description: "Name of the input, used when submitting forms",
    },
    // Input states
    disabled: {
      control: "boolean",
      description: "Whether the input is disabled",
    },
    required: {
      control: "boolean",
      description:
        "Indicates that user input is required on the input before a form can be submitted",
    },
    readOnly: {
      control: "boolean",
      description: "Indicates whether the input value can be modified",
    },
    // Accessibility attributes
    "aria-required": {
      control: "boolean",
      description:
        "Indicates to screen readers that input is required. Use alongside HTML 'required' attribute for both validation and accessibility.",
    },
    "aria-invalid": {
      control: "boolean",
      description:
        "Indicates the entered value does not conform to the format expected by the application",
    },
    "aria-describedby": {
      control: "text",
      description: "Identifies the element(s) that describes the input",
    },
    // Styling
    className: {
      control: "text",
      description: "Additional CSS class names",
    },
    // Event handlers - control: false means they won't appear in controls panel
    onChange: {
      control: false,
      description: "Function called when the input's value changes",
    },
    onBlur: {
      control: false,
      description: "Function called when the input loses focus",
    },
    onFocus: {
      control: false,
      description: "Function called when the input receives focus",
    },
    // Additional HTML attributes
    autoComplete: {
      control: "text",
      description: "Hint for form autofill feature",
    },
    autoFocus: {
      control: "boolean",
      description: "Input should automatically get focus when the page loads",
    },
    min: {
      control: "text",
      description: "Minimum value for number inputs",
    },
    max: {
      control: "text",
      description: "Maximum value for number inputs",
    },
    maxLength: {
      control: "number",
      description: "Maximum length of the input value",
    },
    minLength: {
      control: "number",
      description: "Minimum length of the input value",
    },
    pattern: {
      control: "text",
      description: "Regular expression pattern the input's value must match",
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
  args: {
    type: "email",
    id: "email-demo",
    placeholder: "Email",
  },
  decorators: [
    (Story) => (
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email-demo">Email</Label>
        <Story />
      </div>
    ),
  ],
};

export const Required: Story = {
  args: {
    type: "text",
    placeholder: "Required field",
    required: true,
    "aria-required": true,
  },
};
