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
    className: {
      control: "text",
      description: "Additional CSS class names",
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
