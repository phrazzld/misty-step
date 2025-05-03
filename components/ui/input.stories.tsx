import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";

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
      options: [
        "text",
        "password",
        "email",
        "number",
        "tel",
        "url",
        "search",
        "date",
        "time",
        "datetime-local",
        "month",
        "week",
        "color",
        "file",
        "hidden",
      ],
      description: "The type of input",
    },

    // Text attributes
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

    // Form attributes
    form: {
      control: "text",
      description:
        "Associates the input with a form (by form id) even when not nested inside the form",
    },
    formAction: {
      control: "text",
      description: "URL where form data will be submitted if this input submits a form",
    },
    formEncType: {
      control: "select",
      options: ["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"],
      description: "Encoding type to use when submitting form data",
    },
    formMethod: {
      control: "select",
      options: ["get", "post", "dialog"],
      description: "HTTP method to use when submitting form data",
    },
    formNoValidate: {
      control: "boolean",
      description: "Bypass form validation when submitting",
    },
    formTarget: {
      control: "text",
      description: "Where to display the response after form submission",
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
    "aria-label": {
      control: "text",
      description: "Provides an accessible name for the input when a visible label isn't present",
    },
    "aria-labelledby": {
      control: "text",
      description: "Identifies the element that labels the input",
    },
    "aria-errormessage": {
      control: "text",
      description: "Identifies the element that provides an error message for the input",
    },
    "aria-autocomplete": {
      control: "select",
      options: ["none", "inline", "list", "both"],
      description: "Indicates whether and how autocomplete suggestions are provided",
    },
    "aria-haspopup": {
      control: "select",
      options: ["false", "true", "menu", "listbox", "tree", "grid", "dialog"],
      description:
        "Indicates the availability and type of interactive popup element that can be triggered",
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
    onInput: {
      control: false,
      description: "Function called when the value of the input changes",
    },
    onInvalid: {
      control: false,
      description: "Function called when the input fails validation",
    },
    onKeyDown: {
      control: false,
      description: "Function called when a key is pressed down in the input",
    },
    onKeyUp: {
      control: false,
      description: "Function called when a key is released in the input",
    },

    // Additional HTML attributes
    autoComplete: {
      control: "select",
      options: [
        "on",
        "off",
        "name",
        "email",
        "username",
        "current-password",
        "new-password",
        "one-time-code",
        "tel",
        "street-address",
        "country",
        "postal-code",
      ],
      description: "Hint for form autofill feature",
    },
    autoFocus: {
      control: "boolean",
      description: "Input should automatically get focus when the page loads",
    },
    min: {
      control: "text",
      description: "Minimum value for number, date, time, and range inputs",
    },
    max: {
      control: "text",
      description: "Maximum value for number, date, time, and range inputs",
    },
    step: {
      control: "text",
      description: "Granularity increment for number, date, time, and range inputs",
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
    accept: {
      control: "text",
      description: "Types of files that can be selected with a file input",
    },
    capture: {
      control: "select",
      options: ["user", "environment"],
      description: "Which camera to use for file inputs of type 'file' (for mobile devices)",
    },
    multiple: {
      control: "boolean",
      description:
        "Whether multiple values can be entered for appropriate input types (e.g., email, file)",
    },
    list: {
      control: "text",
      description: "ID of a datalist element providing predefined options for the input",
    },
    size: {
      control: "number",
      description: "Visual size of the input in characters",
    },
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
    placeholder: {
      control: "text",
      description: "Short hint displayed in the input before the user enters a value",
    },
    title: {
      control: "text",
      description: "Tooltip text that appears when hovering over the input",
    },
    spellCheck: {
      control: "boolean",
      description: "Whether to enable spell checking for the input",
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

// Interactive state stories using play functions to replace the old CSS-based simulation
export const HoverInteraction: Story = {
  name: "Hover State",
  parameters: {
    docs: {
      description: {
        story:
          "This demonstrates the input's hover state through an actual user interaction. The play function will hover over the input to show its hover styling.",
      },
    },
  },
  args: {
    placeholder: "Hover over me",
    type: "text",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    // Get the input
    const input = canvas.getByPlaceholderText("Hover over me");

    // Hover over the input
    await step("Hover over the input", async () => {
      await userEvent.hover(input);

      // Verify the input is being hovered (visual confirmation is primary)
      await expect(input).toBeInTheDocument();
    });
  },
};

export const FocusInteraction: Story = {
  name: "Focus State",
  parameters: {
    docs: {
      description: {
        story:
          "This demonstrates the input's focus state through an actual user interaction. The play function will focus the input and type some text to show the focus styling and interaction.",
      },
    },
  },
  args: {
    placeholder: "Click me or press Tab",
    type: "text",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    // Get the input
    const input = canvas.getByPlaceholderText("Click me or press Tab");

    // Focus the input
    await step("Focus the input", async () => {
      await userEvent.tab();

      // Verify the input has focus
      await expect(input).toHaveFocus();
    });

    // Type something to demonstrate the focus state
    await step("Type in the input", async () => {
      await userEvent.type(input, "This input is now focused");

      // Verify the typed content
      await expect(input).toHaveValue("This input is now focused");
    });
  },
};

export const AllInteractionsSequence: Story = {
  name: "All Interactions",
  parameters: {
    docs: {
      description: {
        story:
          "This demonstrates all input interactions in sequence: hover, focus, and typing interactions. The play function shows each state with a short delay between them.",
      },
    },
  },
  args: {
    placeholder: "Interact with me",
    type: "text",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText("Interact with me");

    // 1. Hover state
    await step("Hover over the input", async () => {
      await userEvent.hover(input);
      // Wait a moment to see the hover state
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    // 2. Focus state
    await step("Focus the input", async () => {
      await userEvent.click(input);
      await expect(input).toHaveFocus();
      // Wait a moment to see the focus state
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    // 3. Type some text
    await step("Type in the input", async () => {
      await userEvent.type(input, "Hello, world!", { delay: 100 });
      // Verify the typed content
      await expect(input).toHaveValue("Hello, world!");
    });
  },
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
  args: {
    "aria-invalid": "true",
    placeholder: "Invalid input value",
    type: "text",
    defaultValue: "Invalid data",
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
          "This shows how to display an input with an error state alongside a label and error message. The aria-describedby attribute connects the input to its error message.",
      },
    },
  },
  args: {
    id: "email-error-demo",
    type: "email",
    placeholder: "name@example.com",
    defaultValue: "invalid-email",
    "aria-invalid": "true",
    "aria-describedby": "email-error-message",
  },
  decorators: [
    (Story) => (
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email-error-demo">Email address</Label>
        <Story />
        <p id="email-error-message" className="text-sm text-destructive">
          Please enter a valid email address
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
          "This demonstrates how the input handles exceptionally long placeholder text. Since inputs typically don't wrap text, long content will be truncated with an ellipsis or require scrolling.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <Label className="mb-2">Default Width</Label>
        <Input
          placeholder="This is an exceptionally long placeholder text that demonstrates how the input component handles text that exceeds the typical width of an input field"
          type="text"
        />
        <p className="text-xs text-muted-foreground mt-2">
          The text is truncated and requires the user to scroll horizontally within the input.
        </p>
      </div>

      <div>
        <Label className="mb-2">Constrained Width</Label>
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
        <Label className="mb-2">With Label</Label>
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
        <Label className="mb-2">Default Width with Long Value</Label>
        <Input
          type="text"
          defaultValue="This is an exceptionally long input value that demonstrates how the input component handles text that exceeds the typical width of an input field"
        />
        <p className="text-xs text-muted-foreground mt-2">
          The text extends beyond the visible area, and users can scroll horizontally to see it all.
        </p>
      </div>

      <div>
        <Label className="mb-2">Constrained Width with Long Value</Label>
        <div className="max-w-xs">
          <Input
            type="text"
            defaultValue="This is an exceptionally long input value that demonstrates how the input component handles text that exceeds the typical width of an input field"
          />
        </div>
      </div>

      <div>
        <Label className="mb-2">Long Email Address</Label>
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
        <Label className="mb-2">Different Input Types</Label>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <Label className="text-xs mb-1">URL Type</Label>
            <Input
              type="url"
              defaultValue="https://extremely-long-subdomain-with-many-parts.very-long-domain-name-with-multiple-words.example.com/very/long/path/with/many/segments/and/a/very/long/query/string?param1=value1&param2=value2&param3=value3"
            />
          </div>
          <div>
            <Label className="text-xs mb-1">Search Type</Label>
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
