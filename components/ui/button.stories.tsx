import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";

import { Button } from "./button";
import "./button-states.css";

// Wrapper to simulate interactive states
const InteractiveStateButton = ({
  children,
  className,
  state,
  variant = "default",
  ...props
}: React.ComponentProps<typeof Button> & {
  state: "hover" | "focus" | "active";
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}): React.ReactElement => {
  const stateClass = `simulate-${state} variant-${variant}`;
  return (
    <Button className={`${className || ""} ${stateClass}`} variant={variant} {...props}>
      {children}
    </Button>
  );
};

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
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
    disabled: {
      control: "boolean",
      description: "Whether the button is disabled",
    },
    asChild: {
      control: "boolean",
      description: "Whether to render as a child element instead of a button",
    },
    children: {
      control: "text",
      description: "The content of the button",
    },
    "aria-label": {
      control: "text",
      description:
        "Accessible label for the button when visual text is not available or not descriptive enough",
    },
    onClick: {
      control: false,
      description: "Function to call when the button is clicked",
    },
    id: {
      control: "text",
      description: "The unique identifier for the button element",
    },
    type: {
      control: "select",
      options: ["button", "submit", "reset"],
      description: "The type of button, affecting its behavior in forms",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
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
      <img
        src="/globe.svg"
        width={20}
        height={20}
        alt="" /* Empty alt as this is decorative; the button has an aria-label that describes its purpose */
      />
    ),
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled",
    disabled: true,
  },
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <img
          src="/file.svg"
          width={16}
          height={16}
          alt="" /* Empty alt as this is decorative; the visible text "With Icon" provides context */
        />
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

// Interactive state stories
export const HoverState: Story = {
  name: "Hover State",
  parameters: {
    docs: {
      description: {
        story:
          "This shows how the button looks when hovered. The hover state is simulated with CSS classes to make it visible without user interaction.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-sm font-medium mb-2">Default</p>
        <InteractiveStateButton state="hover" variant="default">
          Hover State
        </InteractiveStateButton>
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Destructive</p>
        <InteractiveStateButton state="hover" variant="destructive">
          Hover State
        </InteractiveStateButton>
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Outline</p>
        <InteractiveStateButton state="hover" variant="outline">
          Hover State
        </InteractiveStateButton>
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Secondary</p>
        <InteractiveStateButton state="hover" variant="secondary">
          Hover State
        </InteractiveStateButton>
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Ghost</p>
        <InteractiveStateButton state="hover" variant="ghost">
          Hover State
        </InteractiveStateButton>
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Link</p>
        <InteractiveStateButton state="hover" variant="link">
          Hover State
        </InteractiveStateButton>
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
          "This shows how the button looks when focused. The focus state is simulated with CSS classes to make it visible without user interaction.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-sm font-medium mb-2">Default</p>
        <InteractiveStateButton state="focus" variant="default">
          Focus State
        </InteractiveStateButton>
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Destructive</p>
        <InteractiveStateButton state="focus" variant="destructive">
          Focus State
        </InteractiveStateButton>
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Outline</p>
        <InteractiveStateButton state="focus" variant="outline">
          Focus State
        </InteractiveStateButton>
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Secondary</p>
        <InteractiveStateButton state="focus" variant="secondary">
          Focus State
        </InteractiveStateButton>
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
          "This shows how the button looks when active (pressed). The active state is simulated with CSS classes to make it visible without user interaction.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-sm font-medium mb-2">Default</p>
        <InteractiveStateButton state="active" variant="default">
          Active State
        </InteractiveStateButton>
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Destructive</p>
        <InteractiveStateButton state="active" variant="destructive">
          Active State
        </InteractiveStateButton>
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Outline</p>
        <InteractiveStateButton state="active" variant="outline">
          Active State
        </InteractiveStateButton>
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Secondary</p>
        <InteractiveStateButton state="active" variant="secondary">
          Active State
        </InteractiveStateButton>
      </div>
    </div>
  ),
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
