import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

// Super simple button with inline styles only
const SuperBasicButton = (): React.ReactElement => {
  return (
    <button
      style={{
        backgroundColor: "blue",
        color: "white",
        padding: "8px 16px",
        border: "none",
        borderRadius: "4px",
      }}
    >
      Test Button
    </button>
  );
};

// Minimal story configuration
const meta: Meta<typeof SuperBasicButton> = {
  title: "Setup/SimpleTest",
  component: SuperBasicButton,
};

export default meta;
type Story = StoryObj<typeof SuperBasicButton>;

// Minimal story that should just work
export const StorybookSetupTest: Story = {
  name: "Storybook Setup Verification",
};
