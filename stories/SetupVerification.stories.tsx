import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

// Create a simple button component for testing
const TestButton = ({ label }: { label: string }) => (
  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
    {label}
  </button>
);

const meta: Meta<typeof TestButton> = {
  title: "Setup/Verification",
  component: TestButton,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof TestButton>;

export const VerificationStory: Story = {
  args: {
    label: "Test Button",
  },
};

// Simple version as a fallback
export const SimpleVerification: Story = {
  render: () => (
    <div className="p-4 border border-gray-300 rounded-lg max-w-md">
      <h2 className="text-xl font-bold mb-4">Storybook Verification</h2>
      <TestButton label="Simple Button" />
      <div className="mt-4">
        <p className="text-sm">Tailwind classes are working if this has padding and rounded corners</p>
      </div>
      <div className="mt-4">
        <p>Static asset test:</p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/vercel.svg" alt="Vercel Logo" width={100} height={50} />
      </div>
    </div>
  ),
};
