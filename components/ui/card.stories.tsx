import type { Meta, StoryObj } from "@storybook/react";
import Image from "next/image";

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

    // Note: Data attributes are removed as they're causing TypeScript errors with Storybook's ArgTypes
  },
  subcomponents: {
    CardHeader: CardHeader,
    CardTitle: CardTitle,
    CardDescription: CardDescription,
    CardAction: CardAction,
    CardContent: CardContent,
    CardFooter: CardFooter,
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const ContentOnly: Story = {
  name: "Simple Content Card",
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

// Edge case stories

export const EmptyContent: Story = {
  name: "Card with Empty Content",
  parameters: {
    docs: {
      description: {
        story:
          "A card with completely empty content sections to test how the component handles empty values while maintaining structure.",
      },
    },
  },
  render: () => (
    <div className="max-w-md">
      <Card>
        <CardHeader>
          <CardTitle />
          <CardDescription />
        </CardHeader>
        <CardContent />
        <CardFooter />
      </Card>
    </div>
  ),
};

export const LongContent: Story = {
  name: "Card with Extremely Long Content",
  parameters: {
    docs: {
      description: {
        story:
          "A card with exceptionally long content in various sections to test text overflow and wrapping behavior.",
      },
    },
  },
  render: () => (
    <div className="max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>
            This is an extremely long card title that spans multiple lines to test how the component
            handles long headings and whether they wrap properly or cause layout issues with other
            card elements
          </CardTitle>
          <CardDescription>
            This is an extremely long card description that contains a significant amount of text to
            test how the description component handles text wrapping, overflow, and maintains proper
            spacing with other card elements.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus ac risus
            dignissim, at gravida urna semper. Nulla tincidunt vestibulum mauris, sit amet
            vestibulum mi aliquet in. Pellentesque aliquet tincidunt vestibulum. Aliquam a egestas
            dui. Maecenas varius sollicitudin tristique. Etiam condimentum varius massa vel
            consectetur. Aenean imperdiet augue velit, vitae posuere felis convallis ac. Maecenas
            quis lacinia lacus, vel congue lorem. Cras ut odio et magna molestie luctus. In nec
            dictum dolor. Ut sit amet fermentum quam.
          </p>
          <p className="mt-4">
            Donec auctor, nisl eget ultricies ultricies, nisl nunc tincidunt nisl, eget ultricies
            nisl nunc eget nisl. Donec auctor, nisl eget ultricies ultricies, nisl nunc tincidunt
            nisl, eget ultricies nisl nunc eget nisl. Donec auctor, nisl eget ultricies ultricies,
            nisl nunc tincidunt nisl, eget ultricies nisl nunc eget nisl.
          </p>
        </CardContent>
        <CardFooter>
          <p>
            This is an extremely long footer text that might contain information about the
            card&apos;s content, actions that can be taken, or other details that would typically
            appear at the bottom of a card component.
          </p>
        </CardFooter>
      </Card>
    </div>
  ),
};

export const NestedCards: Story = {
  name: "Nested Cards",
  parameters: {
    docs: {
      description: {
        story:
          "Cards nested within other cards to test how the component handles nested structures and maintains proper spacing and borders.",
      },
    },
  },
  render: () => (
    <div className="max-w-xl">
      <Card>
        <CardHeader>
          <CardTitle>Parent Card</CardTitle>
          <CardDescription>This card contains nested child cards</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Card className="border-dashed">
            <CardHeader>
              <CardTitle>Nested Card 1</CardTitle>
            </CardHeader>
            <CardContent>
              <p>This is a card nested inside another card.</p>
            </CardContent>
          </Card>

          <Card className="border-dashed">
            <CardHeader>
              <CardTitle>Nested Card 2</CardTitle>
            </CardHeader>
            <CardContent>
              <Card className="border-dotted">
                <CardHeader>
                  <CardTitle>Deeply Nested Card</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>This is a deeply nested card (3 levels).</p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </CardContent>
        <CardFooter>
          <p>Parent card footer</p>
        </CardFooter>
      </Card>
    </div>
  ),
};

export const MixedContent: Story = {
  name: "Card with Mixed Content Types",
  parameters: {
    docs: {
      description: {
        story:
          "A card containing mixed content types including text, lists, a table, and an image to test layout flexibility.",
      },
    },
  },
  render: () => (
    <div className="max-w-lg">
      <Card>
        <CardHeader>
          <CardTitle>Mixed Content Types</CardTitle>
          <CardDescription>Various content types in a single card</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>This card demonstrates different types of content within a single card component:</p>

          <h3 className="text-base font-semibold">Unordered List</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>First list item with some text</li>
            <li>Second list item with more text</li>
            <li>Third item with an even longer description to see how it wraps</li>
          </ul>

          <h3 className="text-base font-semibold">Ordered List</h3>
          <ol className="list-decimal pl-6 space-y-1">
            <li>First step in the process</li>
            <li>Second step with additional details</li>
            <li>Final step with concluding information</li>
          </ol>

          <h3 className="text-base font-semibold">Simple Table</h3>
          <div className="border rounded-md">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-2">Name</th>
                  <th className="text-left p-2">Value</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-2">Item 1</td>
                  <td className="p-2">Value 1</td>
                </tr>
                <tr className="border-t">
                  <td className="p-2">Item 2</td>
                  <td className="p-2">Value 2</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-base font-semibold">Image</h3>
          <div className="relative h-40 w-full">
            {/* Replace with Next.js Image component */}
            <Image
              src="/images/nextjs-icon.svg"
              alt="Next.js Logo"
              className="mx-auto h-full object-contain"
              width={100}
              height={100}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <button className="text-sm text-muted-foreground hover:underline">View More</button>
          <button className="text-sm text-primary hover:underline">Save</button>
        </CardFooter>
      </Card>
    </div>
  ),
};

export const AccessibilityEdgeCaseCard: Story = {
  name: "Card with Accessibility Edge Cases",
  parameters: {
    docs: {
      description: {
        story:
          "A card with various accessibility attributes to test compatibility with assistive technologies.",
      },
    },
  },
  render: () => (
    <div className="max-w-md">
      <Card aria-labelledby="card-title" aria-describedby="card-description" role="region">
        <CardHeader>
          <CardTitle id="card-title">Accessibility Test Card</CardTitle>
          <CardDescription id="card-description">
            This card tests various accessibility attributes and landmark roles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>This card has the following accessibility features:</p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>aria-labelledby pointing to the card title</li>
            <li>aria-describedby pointing to the card description</li>
            <li>A landmark role of &quot;region&quot;</li>
            <li>Proper heading hierarchy</li>
          </ul>
          <div className="mt-4">
            <p id="long-aria-label-example" className="text-xs text-muted-foreground">
              This paragraph has an extremely long ID that will be referenced by aria-labelledby on
              the button below, testing how assistive technologies handle lengthy attribute
              references.
            </p>
            <button
              className="mt-2 px-4 py-2 bg-primary text-primary-foreground rounded"
              aria-label="This is an extremely long aria-label that tests how screen readers handle verbose button descriptions in the context of a card component"
              aria-labelledby="long-aria-label-example"
            >
              Action Button
            </button>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-xs text-muted-foreground">This card tests accessibility edge cases</p>
        </CardFooter>
      </Card>
    </div>
  ),
};
