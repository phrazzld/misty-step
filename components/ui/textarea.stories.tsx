/* eslint-disable max-lines */
import type { Meta, StoryObj } from "@storybook/react";
import { ComponentProps, ReactElement, useState } from "react";

import { Label } from "./label";
import { Textarea } from "./textarea";
import "./textarea-states.css";

// Wrapper to simulate interactive states
const InteractiveStateTextarea = ({
  className,
  state,
  ...props
}: ComponentProps<typeof Textarea> & {
  state: "hover" | "focus" | "active" | "error";
}): ReactElement => {
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

    // Form attributes
    form: {
      control: "text",
      description:
        "Associates the textarea with a form (by form id) even when not nested inside the form",
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
    "aria-label": {
      control: "text",
      description:
        "Provides an accessible name for the textarea when a visible label isn't present",
    },
    "aria-labelledby": {
      control: "text",
      description: "Identifies the element that labels the textarea",
    },
    "aria-errormessage": {
      control: "text",
      description: "Identifies the element that provides an error message for the textarea",
    },
    "aria-multiline": {
      control: "boolean",
      description: "Indicates that the textarea accepts multiple lines of input",
      defaultValue: true,
    },
    "aria-placeholder": {
      control: "text",
      description:
        "Defines the placeholder text for assistive technologies (use alongside HTML placeholder)",
    },
    "aria-readonly": {
      control: "boolean",
      description: "Indicates the textarea is not editable (use alongside HTML readOnly)",
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
    onInput: {
      control: false,
      description: "Function called when the value of the textarea changes",
    },
    onInvalid: {
      control: false,
      description: "Function called when the textarea fails validation",
    },
    onKeyDown: {
      control: false,
      description: "Function called when a key is pressed down in the textarea",
    },
    onKeyUp: {
      control: false,
      description: "Function called when a key is released in the textarea",
    },
    onSelect: {
      control: false,
      description: "Function called when text is selected within the textarea",
    },

    // Additional HTML attributes
    autoComplete: {
      control: "select",
      options: ["on", "off"],
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
    // Resize property (applied via style object)
    // Note: This is intentionally commented out as it's handled through the style prop
    // resize: {
    //   control: "select",
    //   options: ["none", "both", "horizontal", "vertical"],
    //   description:
    //     "Controls how the textarea can be resized by the user (applies via style object)",
    // },
    enterKeyHint: {
      control: "select",
      options: ["enter", "done", "go", "next", "previous", "search", "send"],
      description: "Hint for what action the Enter key will perform",
    },
    inputMode: {
      control: "select",
      options: ["none", "text", "decimal", "numeric", "tel", "search", "email", "url"],
      description:
        "Hint to browsers for which input mechanism to show (e.g., virtual keyboard type)",
    },
    tabIndex: {
      control: "number",
      description: "Controls the tab order of the textarea",
    },
    title: {
      control: "text",
      description: "Tooltip text that appears when hovering over the textarea",
    },
    dirName: {
      control: "text",
      description: "Name of form field to use for sending the text direction of the textarea",
    },
    dir: {
      control: "select",
      options: ["ltr", "rtl", "auto"],
      description: "The text direction of the textarea content",
    },
    lang: {
      control: "text",
      description: "The language of the textarea content",
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
const TextareaWithCounter = (): ReactElement => {
  const [value, setValue] = useState("");
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

export const ErrorState: Story = {
  name: "Error State",
  parameters: {
    docs: {
      description: {
        story:
          "This shows how the textarea looks when it has an error or invalid state. The error state is achieved with the aria-invalid attribute, which can be applied to any textarea to indicate validation failure.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-sm font-medium mb-2">With aria-invalid attribute</p>
        <Textarea
          aria-invalid="true"
          placeholder="Invalid textarea content"
          rows={4}
          defaultValue="This content has validation errors"
        />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">With simulated error class</p>
        <InteractiveStateTextarea
          state="error"
          placeholder="Error state"
          rows={4}
          defaultValue="Error state simulation with CSS class"
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
          "This shows how to display a textarea with an error state alongside a label and error message. The aria-describedby attribute connects the textarea to its error message.",
      },
    },
  },
  render: () => {
    const textareaId = "message-error-demo";
    const errorId = "message-error-text";

    return (
      <div className="grid w-full max-w-sm gap-1.5">
        <Label htmlFor={textareaId}>Your message</Label>
        <Textarea
          id={textareaId}
          placeholder="Type your message here..."
          rows={4}
          defaultValue="Message is too short"
          aria-invalid="true"
          aria-describedby={errorId}
        />
        <p id={errorId} className="text-sm text-destructive">
          Message must be at least 20 characters long
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
          "This demonstrates how the textarea handles exceptionally long placeholder text. Unlike inputs, textareas naturally wrap content to multiple lines.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm font-medium mb-2">Default Width</p>
        <Textarea
          placeholder="This is an exceptionally long placeholder text that demonstrates how the textarea component handles text that exceeds the typical width of a single line. Unlike single-line inputs, textareas naturally wrap content to multiple lines, making them suitable for longer text content that needs to be readable without scrolling horizontally."
          rows={4}
        />
        <p className="text-xs text-muted-foreground mt-2">
          The placeholder text wraps naturally within the textarea boundaries.
        </p>
      </div>

      <div>
        <p className="text-sm font-medium mb-2">Constrained Width</p>
        <div className="max-w-sm">
          <Textarea
            placeholder="This is an exceptionally long placeholder text that demonstrates how the textarea component handles text that exceeds the typical width of a single line. Unlike single-line inputs, textareas naturally wrap content to multiple lines, making them suitable for longer text content that needs to be readable without scrolling horizontally."
            rows={4}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          In a constrained container, the textarea adapts and maintains proper text wrapping.
        </p>
      </div>

      <div>
        <p className="text-sm font-medium mb-2">With Different Row Settings</p>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <p className="text-xs mb-1">2 Rows</p>
            <Textarea
              placeholder="This is an exceptionally long placeholder text that demonstrates how the textarea component handles text with limited vertical space, showing only a portion of the content initially."
              rows={2}
            />
          </div>
          <div>
            <p className="text-xs mb-1">8 Rows</p>
            <Textarea
              placeholder="This is an exceptionally long placeholder text that demonstrates how the textarea component handles text with more vertical space, showing more content at once. When placeholder text is long but the textarea has sufficient vertical space, it can display more of the content without requiring scrolling."
              rows={8}
            />
          </div>
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
          "This demonstrates how the textarea handles exceptionally long text content. Textareas are designed specifically for multi-line content and automatically handle text wrapping and scrolling.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm font-medium mb-2">Standard Paragraph</p>
        <Textarea
          rows={4}
          defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus ac risus dignissim, at gravida urna semper. Nulla tincidunt vestibulum mauris, sit amet vestibulum mi aliquet in. Pellentesque aliquet tincidunt vestibulum. Aliquam a egestas dui. Maecenas varius sollicitudin tristique. Etiam condimentum varius massa vel consectetur. Aenean imperdiet augue velit, vitae posuere felis convallis ac. Maecenas quis lacinia lacus, vel congue lorem. Cras ut odio et magna molestie luctus. In nec dictum dolor. Ut sit amet fermentum quam."
        />
        <p className="text-xs text-muted-foreground mt-2">
          A standard paragraph with text that exceeds the visible area, requiring vertical
          scrolling.
        </p>
      </div>

      <div>
        <p className="text-sm font-medium mb-2">Very Long Single Line</p>
        <Textarea
          rows={3}
          defaultValue="This is an extremely long line of text without any line breaks that demonstrates how the textarea handles text that would normally extend far beyond the horizontal boundaries of the container and shows how the text wrapping behavior works for continuous strings of text without natural breaking points in the content."
        />
        <p className="text-xs text-muted-foreground mt-2">
          A very long single line wraps automatically to fit the textarea width.
        </p>
      </div>

      <div>
        <p className="text-sm font-medium mb-2">Content With Line Breaks</p>
        <Textarea
          rows={8}
          defaultValue={`First line: relatively short line
Second line: medium length line that spans a bit more space than the first
Third line: this is a much longer line that will definitely wrap to multiple lines within the textarea container showing how manual and automatic line breaking work together
Fourth line: back to a shorter line
Fifth line: another line with moderate length`}
        />
        <p className="text-xs text-muted-foreground mt-2">
          Content with manual line breaks combined with word wrapping.
        </p>
      </div>

      <div>
        <p className="text-sm font-medium mb-2">Constrained Width</p>
        <div className="max-w-xs">
          <Textarea
            rows={6}
            defaultValue="When a textarea is constrained to a narrow width, long words and content must wrap more frequently. This demonstrates how the component handles a higher ratio of wrapping in limited horizontal space while still maintaining readability."
          />
        </div>
      </div>
    </div>
  ),
};
