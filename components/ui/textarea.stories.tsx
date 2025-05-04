import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { useState, ReactElement } from "react";

import { Label } from "./label";
import { Textarea } from "./textarea";

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

export const BasicTextarea: Story = {
  name: "Basic Multiline Input",
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

export const TextareaWithLabel: Story = {
  name: "Textarea with Associated Label",
  args: {
    id: "message",
    placeholder: "Type your message here...",
    rows: 4,
  },
  decorators: [
    (Story) => (
      <div className="grid w-full max-w-sm gap-1.5">
        <Label htmlFor="message">Your message</Label>
        <Story />
      </div>
    ),
  ],
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
  decorators: [
    (Story) => (
      <div className="grid w-full max-w-sm gap-1.5">
        <Label htmlFor="required-message" required>
          Message
        </Label>
        <Story />
      </div>
    ),
  ],
};

// Interactive state stories using play functions to replace the old CSS-based simulation
export const HoverInteraction: Story = {
  name: "Hover State",
  parameters: {
    docs: {
      description: {
        story:
          "This demonstrates the textarea's hover state through an actual user interaction. The play function will hover over the textarea to show its hover styling.",
      },
    },
  },
  args: {
    placeholder: "Hover over me",
    rows: 4,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    // Get the textarea
    const textarea = canvas.getByPlaceholderText("Hover over me");

    // Hover over the textarea
    await step("Hover over the textarea", async () => {
      await userEvent.hover(textarea);

      // Verify the textarea is being hovered (visual confirmation is primary)
      await expect(textarea).toBeInTheDocument();
    });
  },
};

export const FocusInteraction: Story = {
  name: "Focus State",
  parameters: {
    docs: {
      description: {
        story:
          "This demonstrates the textarea's focus state through an actual user interaction. The play function will focus the textarea and type some text to show the focus styling and interaction.",
      },
    },
  },
  args: {
    placeholder: "Click me or press Tab",
    rows: 4,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    // Get the textarea
    const textarea = canvas.getByPlaceholderText("Click me or press Tab");

    // Focus the textarea
    await step("Focus the textarea", async () => {
      await userEvent.tab();

      // Verify the textarea has focus
      await expect(textarea).toHaveFocus();
    });

    // Type something to demonstrate the focus state
    await step("Type in the textarea", async () => {
      await userEvent.type(
        textarea,
        "This textarea is now focused.\nYou can type multiple lines of text."
      );

      // Verify the typed content
      await expect(textarea).toHaveValue(
        "This textarea is now focused.\nYou can type multiple lines of text."
      );
    });
  },
};

export const AllInteractionsSequence: Story = {
  name: "All Interactions",
  parameters: {
    docs: {
      description: {
        story:
          "This demonstrates all textarea interactions in sequence: hover, focus, and typing interactions with multi-line input. The play function shows each state with a short delay between them.",
      },
    },
  },
  args: {
    placeholder: "Interact with me",
    rows: 4,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByPlaceholderText("Interact with me");

    // 1. Hover state
    await step("Hover over the textarea", async () => {
      await userEvent.hover(textarea);
      // Wait a moment to see the hover state
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    // 2. Focus state
    await step("Focus the textarea", async () => {
      await userEvent.click(textarea);
      await expect(textarea).toHaveFocus();
      // Wait a moment to see the focus state
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    // 3. Type some multi-line text
    await step("Type in the textarea", async () => {
      await userEvent.type(textarea, "This is line one.\nThis is line two.\nThis is line three.", {
        delay: 100,
      });

      // Verify the typed content
      await expect(textarea).toHaveValue(
        "This is line one.\nThis is line two.\nThis is line three."
      );
    });
  },
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
  args: {
    "aria-invalid": "true",
    placeholder: "Invalid textarea content",
    rows: 4,
    defaultValue: "This content has validation errors",
  },
  decorators: [
    (Story) => (
      <div className="flex flex-col gap-4">
        <div>
          <Label className="mb-2">With aria-invalid attribute</Label>
          <Story />
        </div>
      </div>
    ),
  ],
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
  args: {
    id: "message-error-demo",
    placeholder: "Type your message here...",
    rows: 4,
    defaultValue: "Message is too short",
    "aria-invalid": "true",
    "aria-describedby": "message-error-text",
  },
  decorators: [
    (Story) => (
      <div className="grid w-full max-w-sm gap-1.5">
        <Label htmlFor="message-error-demo">Your message</Label>
        <Story />
        <p id="message-error-text" className="text-sm text-destructive">
          Message must be at least 20 characters long
        </p>
      </div>
    ),
  ],
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
        <Label className="mb-2">Default Width</Label>
        <Textarea
          placeholder="This is an exceptionally long placeholder text that demonstrates how the textarea component handles text that exceeds the typical width of a single line. Unlike single-line inputs, textareas naturally wrap content to multiple lines, making them suitable for longer text content that needs to be readable without scrolling horizontally."
          rows={4}
        />
        <p className="text-xs text-muted-foreground mt-2">
          The placeholder text wraps naturally within the textarea boundaries.
        </p>
      </div>

      <div>
        <Label className="mb-2">Constrained Width</Label>
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
        <Label className="mb-2">With Different Row Settings</Label>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <Label className="text-xs mb-1">2 Rows</Label>
            <Textarea
              placeholder="This is an exceptionally long placeholder text that demonstrates how the textarea component handles text with limited vertical space, showing only a portion of the content initially."
              rows={2}
            />
          </div>
          <div>
            <Label className="text-xs mb-1">8 Rows</Label>
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
        <Label className="mb-2">Standard Paragraph</Label>
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
        <Label className="mb-2">Very Long Single Line</Label>
        <Textarea
          rows={3}
          defaultValue="This is an extremely long line of text without any line breaks that demonstrates how the textarea handles text that would normally extend far beyond the horizontal boundaries of the container and shows how the text wrapping behavior works for continuous strings of text without natural breaking points in the content."
        />
        <p className="text-xs text-muted-foreground mt-2">
          A very long single line wraps automatically to fit the textarea width.
        </p>
      </div>

      <div>
        <Label className="mb-2">Content With Line Breaks</Label>
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
        <Label className="mb-2">Constrained Width</Label>
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

// Additional edge case stories

export const EmptyTextarea: Story = {
  name: "Empty Textarea",
  parameters: {
    docs: {
      description: {
        story:
          "A textarea with empty content to test how the component handles empty values while maintaining proper dimensions.",
      },
    },
  },
  args: {
    placeholder: "Type your message here...",
    defaultValue: "",
    rows: 4,
  },
};

export const SpecialCharactersTextarea: Story = {
  name: "Textarea with Special Characters",
  parameters: {
    docs: {
      description: {
        story:
          "A textarea with various special characters, emojis, and international characters to verify proper rendering and handling.",
      },
    },
  },
  args: {
    rows: 4,
    defaultValue:
      "Line 1: → Special & Unicode € Characters 🚀 ★\nLine 2: é ç ñ ö ü ß\nLine 3: 你好 こんにちは 안녕하세요\nLine 4: ♠ ♥ ♦ ♣ ♤ ♧ ♡ ♢",
  },
};

export const ResizeHandling: Story = {
  name: "Textarea Resize Handling",
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates how textarea handles different resize behavior settings. This is useful for testing user experience when manual resizing is allowed or restricted.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <Label className="mb-2">Default (Both Directions)</Label>
        <Textarea
          placeholder="This textarea can be resized in both directions by default"
          rows={3}
        />
        <p className="text-xs text-muted-foreground mt-2">
          Browser default allows resizing in both directions
        </p>
      </div>

      <div>
        <Label className="mb-2">Vertical Only</Label>
        <Textarea
          placeholder="This textarea can only be resized vertically"
          rows={3}
          style={{ resize: "vertical" }}
        />
        <p className="text-xs text-muted-foreground mt-2">
          Restricted to vertical resizing only via CSS
        </p>
      </div>

      <div>
        <Label className="mb-2">Horizontal Only</Label>
        <Textarea
          placeholder="This textarea can only be resized horizontally"
          rows={3}
          style={{ resize: "horizontal" }}
        />
        <p className="text-xs text-muted-foreground mt-2">
          Restricted to horizontal resizing only via CSS
        </p>
      </div>

      <div>
        <Label className="mb-2">No Resize</Label>
        <Textarea
          placeholder="This textarea cannot be resized by the user"
          rows={3}
          style={{ resize: "none" }}
        />
        <p className="text-xs text-muted-foreground mt-2">
          Resizing is disabled completely via CSS
        </p>
      </div>
    </div>
  ),
};

export const AccessibilityEdgeCaseTextarea: Story = {
  name: "Textarea with Accessibility Edge Cases",
  parameters: {
    docs: {
      description: {
        story:
          "Tests how textarea handles extremely long accessibility attributes to ensure compatibility with assistive technologies.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <Label htmlFor="textarea-long-aria-label">With Extremely Long ARIA Label</Label>
        <Textarea
          id="textarea-long-aria-label"
          rows={4}
          aria-label="This is an extremely long accessibility label that provides an extensive description of what this textarea is for and how it should be used by the user. It contains significantly more text than would typically be used in a production environment to test how screen readers and other assistive technologies handle verbose descriptions for multiline text input fields."
          placeholder="Textarea with extremely long aria-label"
        />
      </div>

      <div>
        <Label htmlFor="textarea-long-describedby">With Long Description</Label>
        <Textarea
          id="textarea-long-describedby"
          rows={4}
          aria-describedby="textarea-very-long-description"
          placeholder="Textarea with long aria-describedby reference"
        />
        <p id="textarea-very-long-description" className="text-xs text-muted-foreground mt-1">
          This is an extremely long description that provides detailed instructions and context for
          the textarea field above. It contains significantly more explanatory text than would
          normally be used in a typical form to test how assistive technologies handle verbose
          descriptions and whether they&apos;re properly associated with the textarea element
          through the aria-describedby attribute. It includes details about what the user should
          enter, formatting guidelines, and other information that would help someone understand how
          to use this particular text input area.
        </p>
      </div>
    </div>
  ),
};
