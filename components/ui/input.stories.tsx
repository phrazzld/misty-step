import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";

import { Input } from "./input";
import { Label } from "./label";
import "./input-states.css";

// Wrapper to simulate interactive states
const InteractiveStateInput = ({
  className,
  state,
  ...props
}: React.ComponentProps<typeof Input> & {
  state: "hover" | "focus" | "active" | "error";
}): React.ReactElement => {
  const stateClass = `simulate-${state}`;
  return <Input className={`${className || ""} ${stateClass}`} {...props} />;
};

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

// Interactive state stories
export const HoverState: Story = {
  name: "Hover State",
  parameters: {
    docs: {
      description: {
        story:
          "This shows how the input looks when hovered. The hover state is simulated with CSS classes to make it visible without user interaction.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-sm font-medium mb-2">Default</p>
        <InteractiveStateInput state="hover" placeholder="Hover state" type="text" />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">With Label</p>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="hover-input">Email address</Label>
          <InteractiveStateInput
            state="hover"
            id="hover-input"
            placeholder="name@example.com"
            type="email"
          />
        </div>
      </div>
    </div>
  ),
};

export const FocusState: Story = {
  name: "Focus State",
  parameters: {
    docs: {
      description: {
        story:
          "This shows how the input looks when focused. The focus state is simulated with CSS classes to make it visible without user interaction.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-sm font-medium mb-2">Default</p>
        <InteractiveStateInput state="focus" placeholder="Focus state" type="text" />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">With Label</p>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="focus-input">Email address</Label>
          <InteractiveStateInput
            state="focus"
            id="focus-input"
            placeholder="name@example.com"
            type="email"
          />
        </div>
      </div>
    </div>
  ),
};

export const ActiveState: Story = {
  name: "Active State",
  parameters: {
    docs: {
      description: {
        story:
          "This shows how the input looks when active (being pressed/clicked). The active state is simulated with CSS classes to make it visible without user interaction.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-sm font-medium mb-2">Default</p>
        <InteractiveStateInput state="active" placeholder="Active state" type="text" />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">With Label</p>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="active-input">Email address</Label>
          <InteractiveStateInput
            state="active"
            id="active-input"
            placeholder="name@example.com"
            type="email"
          />
        </div>
      </div>
    </div>
  ),
};

export const ErrorState: Story = {
  name: "Error State",
  parameters: {
    docs: {
      description: {
        story:
          "This shows how the input looks when it has an error or invalid state. The error state is achieved with the aria-invalid attribute, which can be applied to any input to indicate validation failure.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-sm font-medium mb-2">With aria-invalid attribute</p>
        <Input
          aria-invalid="true"
          placeholder="Invalid input value"
          type="text"
          defaultValue="Invalid data"
        />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">With simulated error class</p>
        <InteractiveStateInput
          state="error"
          placeholder="Error state"
          type="text"
          defaultValue="Error state simulation"
        />
      </div>
    </div>
  ),
};

export const WithLabelAndError: Story = {
  name: "With Label and Error",
  parameters: {
    docs: {
      description: {
        story:
          "This shows how to display an input with an error state alongside a label and error message. The aria-describedby attribute connects the input to its error message.",
      },
    },
  },
  render: () => {
    const inputId = "email-error-demo";
    const errorId = "email-error-message";

    return (
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor={inputId}>Email address</Label>
        <Input
          id={inputId}
          type="email"
          placeholder="name@example.com"
          defaultValue="invalid-email"
          aria-invalid="true"
          aria-describedby={errorId}
        />
        <p id={errorId} className="text-sm text-destructive">
          Please enter a valid email address
        </p>
      </div>
    );
  },
};

export const LongPlaceholder: Story = {
  name: "Long Placeholder",
  parameters: {
    docs: {
      description: {
        story:
          "This demonstrates how the input handles exceptionally long placeholder text. Since inputs typically don't wrap text, long content will be truncated with an ellipsis or require scrolling.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm font-medium mb-2">Default Width</p>
        <Input
          placeholder="This is an exceptionally long placeholder text that demonstrates how the input component handles text that exceeds the typical width of an input field"
          type="text"
        />
        <p className="text-xs text-muted-foreground mt-2">
          The text is truncated and requires the user to scroll horizontally within the input.
        </p>
      </div>

      <div>
        <p className="text-sm font-medium mb-2">Constrained Width</p>
        <div className="max-w-sm">
          <Input
            placeholder="This is an exceptionally long placeholder text that demonstrates how the input component handles text that exceeds the typical width of an input field"
            type="text"
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          In a constrained container, the input still maintains its width and truncates the text.
        </p>
      </div>

      <div>
        <p className="text-sm font-medium mb-2">With Label</p>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="long-placeholder">Username</Label>
          <Input
            id="long-placeholder"
            placeholder="Enter a username that will be displayed on your profile and used for all communications within the platform"
            type="text"
          />
        </div>
      </div>
    </div>
  ),
};

export const LongValue: Story = {
  name: "Long Value",
  parameters: {
    docs: {
      description: {
        story:
          "This demonstrates how the input handles exceptionally long input values. Users can scroll horizontally to see the full content.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm font-medium mb-2">Default Width with Long Value</p>
        <Input
          type="text"
          defaultValue="This is an exceptionally long input value that demonstrates how the input component handles text that exceeds the typical width of an input field"
        />
        <p className="text-xs text-muted-foreground mt-2">
          The text extends beyond the visible area, and users can scroll horizontally to see it all.
        </p>
      </div>

      <div>
        <p className="text-sm font-medium mb-2">Constrained Width with Long Value</p>
        <div className="max-w-xs">
          <Input
            type="text"
            defaultValue="This is an exceptionally long input value that demonstrates how the input component handles text that exceeds the typical width of an input field"
          />
        </div>
      </div>

      <div>
        <p className="text-sm font-medium mb-2">Long Email Address</p>
        <div className="max-w-sm">
          <Input
            type="email"
            defaultValue="extremely.long.email.address.with.many.parts.and.subdomain.levels@very.long.domain.name.with.multiple.subdomains.example.com"
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Email inputs handle long addresses by allowing horizontal scrolling.
        </p>
      </div>

      <div>
        <p className="text-sm font-medium mb-2">Different Input Types</p>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <p className="text-xs mb-1">URL Type</p>
            <Input
              type="url"
              defaultValue="https://extremely-long-subdomain-with-many-parts.very-long-domain-name-with-multiple-words.example.com/very/long/path/with/many/segments/and/a/very/long/query/string?param1=value1&param2=value2&param3=value3"
            />
          </div>
          <div>
            <p className="text-xs mb-1">Search Type</p>
            <Input
              type="search"
              defaultValue="extremely long search query with many keywords and phrases to demonstrate how search inputs handle long content within the visible area"
            />
          </div>
        </div>
      </div>
    </div>
  ),
};
