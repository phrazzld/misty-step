import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";

import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    // Core Button props
    variant: {
      control: "select",
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
      description: "The visual style of the button",
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
      description: "The size of the button",
    },
    asChild: {
      control: "boolean",
      description: "Whether to render as a child element instead of a button",
    },

    // HTML button attributes
    disabled: {
      control: "boolean",
      description: "Whether the button is disabled",
    },
    type: {
      control: "select",
      options: ["button", "submit", "reset"],
      description: "The type of button, affecting its behavior in forms",
    },
    name: {
      control: "text",
      description: "The name of the button, used when submitting forms",
    },
    value: {
      control: "text",
      description: "The value of the button, used when submitting forms",
    },
    form: {
      control: "text",
      description:
        "Associates the button with a form (by form id) even when not nested inside the form",
    },
    formAction: {
      control: "text",
      description: "URL where form data will be submitted if this button submits a form",
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
      description: "Bypass form validation when submitting via this button",
    },
    formTarget: {
      control: "text",
      description: "Where to display the response after form submission",
    },

    // Content props
    children: {
      control: "text",
      description: "The content of the button",
    },

    // Event handlers
    onClick: {
      control: false,
      description: "Function to call when the button is clicked",
    },
    onFocus: {
      control: false,
      description: "Function to call when the button receives focus",
    },
    onBlur: {
      control: false,
      description: "Function to call when the button loses focus",
    },
    onMouseEnter: {
      control: false,
      description: "Function to call when mouse pointer enters the button",
    },
    onMouseLeave: {
      control: false,
      description: "Function to call when mouse pointer leaves the button",
    },
    onKeyDown: {
      control: false,
      description: "Function to call when a key is pressed while the button has focus",
    },

    // ARIA accessibility attributes
    "aria-label": {
      control: "text",
      description:
        "Accessible label for the button when visual text is not available or not descriptive enough",
    },
    "aria-expanded": {
      control: "boolean",
      description:
        "Indicates whether a dropdown or similar element controlled by this button is expanded",
    },
    "aria-haspopup": {
      control: "select",
      options: ["true", "menu", "dialog", "listbox", "tree", "grid"],
      description: "Indicates the button opens a menu or other interactive element",
    },
    "aria-controls": {
      control: "text",
      description: "Identifies the element controlled by this button",
    },
    "aria-pressed": {
      control: "select",
      options: ["true", "false", "mixed"],
      description: "Indicates the button's pressed state (for toggle buttons)",
    },
    "aria-disabled": {
      control: "boolean",
      description: "Indicates the button is disabled for accessibility purposes",
    },

    // Common HTML attributes
    id: {
      control: "text",
      description: "The unique identifier for the button element",
    },
    className: {
      control: "text",
      description: "Additional CSS class names",
    },
    tabIndex: {
      control: "number",
      description: "Controls the tab order of the button",
    },
    title: {
      control: "text",
      description: "Tooltip text that appears when hovering over the button",
    },
    autoFocus: {
      control: "boolean",
      description: "Button should automatically receive focus when the page loads",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  name: "Primary Button",
  args: {
    children: "Button",
    variant: "default",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary",
    variant: "secondary",
  },
};

export const Destructive: Story = {
  args: {
    children: "Destructive",
    variant: "destructive",
  },
};

export const Outline: Story = {
  args: {
    children: "Outline",
    variant: "outline",
  },
};

export const Ghost: Story = {
  args: {
    children: "Ghost",
    variant: "ghost",
  },
};

export const Link: Story = {
  args: {
    children: "Link",
    variant: "link",
  },
};

export const SmallSize: Story = {
  args: {
    children: "Small",
    size: "sm",
  },
};

export const LargeSize: Story = {
  args: {
    children: "Large",
    size: "lg",
  },
};

export const IconSize: Story = {
  args: {
    size: "icon",
    "aria-label": "Icon button",
    children: (
      <span className="flex items-center justify-center h-5 w-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      </span>
    ),
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled",
    disabled: true,
  },
};

export const IconButton: Story = {
  name: "Button with Icon and Text",
  args: {
    children: (
      <>
        <span className="flex items-center justify-center h-4 w-4 mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <line x1="10" y1="9" x2="8" y2="9" />
          </svg>
        </span>
        With Icon
      </>
    ),
  },
};

export const AsChild: Story = {
  args: {
    asChild: true,
    children: <a href="#">Anchor Button</a>,
  },
};

// Interactive state stories using play functions to replace the old CSS-based simulation
export const HoverInteraction: Story = {
  name: "Hover State",
  parameters: {
    docs: {
      description: {
        story:
          "This demonstrates the button's hover state through an actual user interaction. The play function will hover over the button to show its hover styling.",
      },
    },
  },
  args: {
    children: "Hover me",
    variant: "default",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    // Get the button
    const button = canvas.getByRole("button");

    // Hover over the button
    await step("Hover the button", async () => {
      await userEvent.hover(button);

      // Verify the button has hover styling (optional - visual confirmation is primary)
      await expect(button).toBeInTheDocument();
    });
  },
};

export const FocusInteraction: Story = {
  name: "Focus State",
  parameters: {
    docs: {
      description: {
        story:
          "This demonstrates the button's focus state through an actual user interaction. The play function will focus the button to show its focus styling.",
      },
    },
  },
  args: {
    children: "Focus me",
    variant: "default",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    // Get the button
    const button = canvas.getByRole("button");

    // Focus the button
    await step("Focus the button", async () => {
      await userEvent.tab();

      // Verify the button has focus
      await expect(button).toHaveFocus();
    });
  },
};

export const ActiveInteraction: Story = {
  name: "Active State",
  parameters: {
    docs: {
      description: {
        story:
          "This demonstrates the button's active state through an actual user interaction. The play function will click the button to show its active styling.",
      },
    },
  },
  args: {
    children: "Click me",
    variant: "default",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    // Get the button
    const button = canvas.getByRole("button");

    // Click the button (mousedown shows the active state)
    await step("Click the button", async () => {
      // Use pointer events for more precise control
      await userEvent.pointer({ keys: "[MouseLeft>]", target: button });

      // Note: We're not releasing the mouse button immediately to show the active state
      // In a real interaction, you would complete the click with:
      // await userEvent.pointer({ keys: "[/MouseLeft]", target: button });
    });
  },
};

export const AllInteractionsSequence: Story = {
  name: "All Interactions",
  parameters: {
    docs: {
      description: {
        story:
          "This demonstrates all button interactions in sequence: hover, focus, and active states. The play function shows each state with a short delay between them.",
      },
    },
  },
  args: {
    children: "Interact with me",
    variant: "default",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");

    // 1. Hover state
    await step("Hover the button", async () => {
      await userEvent.hover(button);
      // Wait a moment to see the hover state
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    // 2. Focus state
    await step("Focus the button", async () => {
      await userEvent.tab();
      await expect(button).toHaveFocus();
      // Wait a moment to see the focus state
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    // 3. Active state (without completing the click)
    await step("Press the button", async () => {
      await userEvent.pointer({ keys: "[MouseLeft>]", target: button });
      // Wait a moment to see the active state
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Complete the click
      await userEvent.pointer({ keys: "[/MouseLeft]", target: button });
    });
  },
};

export const LongText: Story = {
  name: "Long Text",
  parameters: {
    docs: {
      description: {
        story:
          "This demonstrates how the button handles very long text content. By default, buttons use `whitespace-nowrap` which prevents text wrapping. For buttons with long text, you may need to override this behavior with custom classes.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm font-medium mb-2">Default (No Wrapping)</p>
        <div className="border border-dashed border-gray-300 p-4 overflow-auto">
          <Button>
            This is an extremely long button text that demonstrates how the button handles excessive
            content without wrapping
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Note: The button extends beyond its container and requires scrolling.
        </p>
      </div>

      <div>
        <p className="text-sm font-medium mb-2">With Custom Wrapping</p>
        <div className="border border-dashed border-gray-300 p-4 max-w-sm">
          <Button className="whitespace-normal h-auto py-2">
            This is an extremely long button text that demonstrates how the button can be modified
            to wrap text by overriding the default whitespace-nowrap behavior
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          The button above uses <code>whitespace-normal h-auto</code> classes to enable text
          wrapping.
        </p>
      </div>

      <div>
        <p className="text-sm font-medium mb-2">Different Variants with Long Text</p>
        <div className="grid grid-cols-2 gap-4 max-w-xl">
          <Button variant="default" className="whitespace-normal h-auto py-2">
            Long text in default variant that wraps to multiple lines when the container width is
            limited
          </Button>
          <Button variant="destructive" className="whitespace-normal h-auto py-2">
            Long text in destructive variant that wraps to multiple lines when the container width
            is limited
          </Button>
          <Button variant="outline" className="whitespace-normal h-auto py-2">
            Long text in outline variant that wraps to multiple lines when the container width is
            limited
          </Button>
          <Button variant="secondary" className="whitespace-normal h-auto py-2">
            Long text in secondary variant that wraps to multiple lines when the container width is
            limited
          </Button>
        </div>
      </div>

      <div>
        <p className="text-sm font-medium mb-2">Long Text with Different Sizes</p>
        <div className="flex flex-col gap-4 max-w-md">
          <Button size="sm" className="whitespace-normal h-auto py-1">
            This is long text content in a small button that demonstrates text wrapping behavior
          </Button>
          <Button size="default" className="whitespace-normal h-auto py-2">
            This is long text content in a default size button that demonstrates text wrapping
            behavior
          </Button>
          <Button size="lg" className="whitespace-normal h-auto py-3">
            This is long text content in a large button that demonstrates text wrapping behavior
          </Button>
        </div>
      </div>
    </div>
  ),
};
