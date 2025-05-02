import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./button";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  CardAction,
} from "./card";

const meta: Meta<typeof Card> = {
  title: "UI/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    // Standard HTML div props (Card is a div)
    id: {
      control: "text",
      description: "Unique identifier for the card element",
    },
    className: {
      control: "text",
      description: "Additional CSS class names",
    },

    // Event handlers
    onClick: {
      control: false,
      description: "Function called when the card is clicked",
    },
    onKeyDown: {
      control: false,
      description: "Function called when a key is pressed while the card has focus",
    },
    onFocus: {
      control: false,
      description: "Function called when the card receives focus",
    },
    onBlur: {
      control: false,
      description: "Function called when the card loses focus",
    },
    onMouseEnter: {
      control: false,
      description: "Function called when mouse pointer enters the card",
    },
    onMouseLeave: {
      control: false,
      description: "Function called when mouse pointer leaves the card",
    },

    // Accessibility attributes
    role: {
      control: "select",
      options: ["region", "group", "article", "figure", "presentation", "none"],
      description: "ARIA role attribute for accessibility",
    },
    "aria-label": {
      control: "text",
      description: "Accessible label for the card, if title is not visible",
    },
    "aria-labelledby": {
      control: "text",
      description: "ID of an element (typically CardTitle) that labels this card",
    },
    "aria-describedby": {
      control: "text",
      description: "ID of an element (typically CardDescription) that describes this card",
    },
    "aria-details": {
      control: "text",
      description: "ID of an element providing more detailed information about the card",
    },
    "aria-hidden": {
      control: "boolean",
      description: "Whether to hide the card from screen readers",
    },

    // Common HTML attributes
    tabIndex: {
      control: "number",
      description: "Tab order of the element",
    },
    style: {
      control: false,
      description: "Inline styles for the card element",
    },
    lang: {
      control: "text",
      description: "The language of the card content",
    },
    dir: {
      control: "select",
      options: ["ltr", "rtl", "auto"],
      description: "The text direction of the card content",
    },
    title: {
      control: "text",
      description: "Tooltip text that appears when hovering over the card",
    },
    hidden: {
      control: "boolean",
      description: "Hides the card visually and from screen readers",
    },

    // Data attributes
    "data-state": {
      control: "text",
      description: "Custom data attribute for controlling card state via CSS",
    },
    "data-orientation": {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "Orientation of the card's internal layout",
    },
  },
  subcomponents: {
    CardHeader: {
      description: "Container for the top section of the card",
      props: {
        className: {
          description: "Additional CSS classes for the header",
          control: "text",
        },
        id: {
          description: "Unique identifier for the header",
          control: "text",
        },
        "aria-labelledby": {
          description: "ID of an element that labels this header",
          control: "text",
        },
        "aria-describedby": {
          description: "ID of an element that describes this header",
          control: "text",
        },
        children: {
          description:
            "Content of the header (typically CardTitle, CardDescription, and optionally CardAction)",
          control: false,
        },
        onClick: {
          description: "Function called when the header is clicked",
          control: false,
        },
      },
    },
    CardTitle: {
      description: "Main heading for the card",
      props: {
        className: {
          description: "Additional CSS classes for the title",
          control: "text",
        },
        id: {
          description: "Unique identifier for the title",
          control: "text",
        },
        children: {
          description: "Text content of the title",
          control: "text",
        },
        "aria-level": {
          description: "Semantic heading level (1-6) for screen readers",
          control: "number",
        },
      },
    },
    CardDescription: {
      description: "Supporting text below the card title",
      props: {
        className: {
          description: "Additional CSS classes for the description",
          control: "text",
        },
        id: {
          description: "Unique identifier for the description",
          control: "text",
        },
        children: {
          description: "Text content of the description",
          control: "text",
        },
      },
    },
    CardAction: {
      description: "Container for buttons or actions in the card header",
      props: {
        className: {
          description: "Additional CSS classes for the action container",
          control: "text",
        },
        id: {
          description: "Unique identifier for the action container",
          control: "text",
        },
        children: {
          description: "Action elements like buttons or links",
          control: false,
        },
      },
    },
    CardContent: {
      description: "Container for the main content of the card",
      props: {
        className: {
          description: "Additional CSS classes for the content",
          control: "text",
        },
        id: {
          description: "Unique identifier for the content",
          control: "text",
        },
        children: {
          description: "Main content of the card",
          control: false,
        },
      },
    },
    CardFooter: {
      description: "Container for the bottom section of the card",
      props: {
        className: {
          description: "Additional CSS classes for the footer",
          control: "text",
        },
        id: {
          description: "Unique identifier for the footer",
          control: "text",
        },
        children: {
          description: "Content of the footer",
          control: false,
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Basic: Story = {
  render: () => (
    <Card className="max-w-md">
      <CardContent>
        <p>This is a basic card with only content.</p>
      </CardContent>
    </Card>
  ),
};

export const WithHeader: Story = {
  render: () => (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>This is a description of the card.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This card includes a header with title and description.</p>
      </CardContent>
    </Card>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Card className="max-w-md">
      <CardContent>
        <p>This card includes a footer section for actions or additional information.</p>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">Last updated: April 30, 2025</p>
      </CardFooter>
    </Card>
  ),
};

export const WithHeaderAndFooter: Story = {
  render: () => (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Card with Header and Footer</CardTitle>
        <CardDescription>This card has both a header and footer.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is the main content of the card.</p>
        <p className="mt-4">
          The combination of header and footer creates a well-structured component.
        </p>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">Last updated: April 30, 2025</p>
      </CardFooter>
    </Card>
  ),
};

export const FullExample: Story = {
  render: () => (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Complete Card Example</CardTitle>
        <CardDescription>
          This card demonstrates all subcomponents working together.
        </CardDescription>
        <CardAction>
          <Button variant="default" size="sm">
            View
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <p>This example shows a complete card with all available subcomponents:</p>
          <ul className="list-inside list-disc space-y-1 text-sm">
            <li>CardHeader for the title section</li>
            <li>CardTitle for the main heading</li>
            <li>CardDescription for supporting text</li>
            <li>CardAction for a header-aligned button</li>
            <li>CardContent for the main content</li>
            <li>CardFooter for the bottom section</li>
          </ul>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-sm text-muted-foreground">Created: April 28, 2025</p>
        <p className="text-sm text-muted-foreground">Updated: April 30, 2025</p>
      </CardFooter>
    </Card>
  ),
};
