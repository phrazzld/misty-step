import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";

import { Label } from "./label";
import { Textarea } from "./textarea";
import "./textarea-states.css";

// Wrapper to simulate interactive states
const InteractiveStateTextarea = ({
  className,
  state,
  ...props
}: React.ComponentProps<typeof Textarea> & {
  state: "hover" | "focus" | "active" | "error";
}): React.ReactElement => {
  const stateClass = `simulate-${state}`;
  return <Textarea className={`${className || ""} ${stateClass}`} {...props} />;
};

const meta: Meta<typeof Textarea> = {
  title: "UI/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  argTypes: {
    // Text attributes
    placeholder: {
      control: "text",
      description: "Placeholder text for the textarea",
    },
    value: {
      control: "text",
      description: "The controlled value of the textarea",
    },
    defaultValue: {
      control: "text",
      description: "The default value of the textarea (uncontrolled)",
    },
    // Sizing
    rows: {
      control: { type: "number", min: 2, max: 20 },
      description: "Number of visible text lines",
    },
    cols: {
      control: "number",
      description: "Number of visible character columns",
    },
    // Identification
    id: {
      control: "text",
      description: "Unique identifier for the textarea",
    },
    name: {
      control: "text",
      description: "Name of the textarea, used when submitting forms",
    },
    // TextArea states
    disabled: {
      control: "boolean",
      description: "Whether the textarea is disabled",
    },
    required: {
      control: "boolean",
      description:
        "Indicates that user input is required on the textarea before a form can be submitted",
    },
    readOnly: {
      control: "boolean",
      description: "Indicates whether the textarea value can be modified",
    },
    // Accessibility attributes
    "aria-required": {
      control: "boolean",
      description:
        "Indicates to screen readers that textarea is required. Use alongside HTML 'required' attribute for both validation and accessibility.",
    },
    "aria-invalid": {
      control: "boolean",
      description:
        "Indicates the entered value does not conform to the format expected by the application",
    },
    "aria-describedby": {
      control: "text",
      description: "Identifies the element(s) that describes the textarea",
    },
    // Styling
    className: {
      control: "text",
      description: "Additional CSS class names",
    },
    // Event handlers - control: false means they won't appear in controls panel
    onChange: {
      control: false,
      description: "Function called when the textarea's value changes",
    },
    onBlur: {
      control: false,
      description: "Function called when the textarea loses focus",
    },
    onFocus: {
      control: false,
      description: "Function called when the textarea receives focus",
    },
    // Additional HTML attributes
    autoComplete: {
      control: "text",
      description: "Hint for form autofill feature",
    },
    autoFocus: {
      control: "boolean",
      description: "Textarea should automatically get focus when the page loads",
    },
    maxLength: {
      control: "number",
      description: "Maximum length of the textarea value",
    },
    minLength: {
      control: "number",
      description: "Minimum length of the textarea value",
    },
    spellCheck: {
      control: "boolean",
      description: "Whether to enable spell checking for the textarea",
    },
    wrap: {
      control: "select",
      options: ["hard", "soft", "off"],
      description: "Indicates how the text should be wrapped when submitting in a form",
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
  args: {
    id: "message",
    placeholder: "Type your message here...",
    rows: 4,
  },
  render: (args) => (
    <div className="grid w-full max-w-sm gap-1.5">
      <Label htmlFor={args.id}>Your message</Label>
      <Textarea {...args} />
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
  args: {
    id: "required-message",
    placeholder: "This field is required",
    required: true,
    "aria-required": "true",
    rows: 4,
  },
  render: (args) => (
    <div className="grid w-full max-w-sm gap-1.5">
      <Label htmlFor={args.id} required>
        Message
      </Label>
      <Textarea {...args} />
    </div>
  ),
};

// Interactive state stories
export const HoverState: Story = {
  name: "Hover State",
  parameters: {
    docs: {
      description: {
        story:
          "This shows how the textarea looks when hovered. The hover state is simulated with CSS classes to make it visible without user interaction.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-sm font-medium mb-2">Default</p>
        <InteractiveStateTextarea state="hover" placeholder="Hover state" rows={4} />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">With Label</p>
        <div className="grid w-full max-w-sm gap-1.5">
          <Label htmlFor="hover-textarea">Your message</Label>
          <InteractiveStateTextarea
            state="hover"
            id="hover-textarea"
            placeholder="Type your message here..."
            rows={4}
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
          "This shows how the textarea looks when focused. The focus state is simulated with CSS classes to make it visible without user interaction.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-sm font-medium mb-2">Default</p>
        <InteractiveStateTextarea state="focus" placeholder="Focus state" rows={4} />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">With Label</p>
        <div className="grid w-full max-w-sm gap-1.5">
          <Label htmlFor="focus-textarea">Your message</Label>
          <InteractiveStateTextarea
            state="focus"
            id="focus-textarea"
            placeholder="Type your message here..."
            rows={4}
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
          "This shows how the textarea looks when active (being edited). The active state is simulated with CSS classes to make it visible without user interaction.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-sm font-medium mb-2">Default</p>
        <InteractiveStateTextarea state="active" placeholder="Active state" rows={4} />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">With Label</p>
        <div className="grid w-full max-w-sm gap-1.5">
          <Label htmlFor="active-textarea">Your message</Label>
          <InteractiveStateTextarea
            state="active"
            id="active-textarea"
            placeholder="Type your message here..."
            rows={4}
          />
        </div>
      </div>
    </div>
  ),
};
