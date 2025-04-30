import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";

import { Button } from "./button";

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
