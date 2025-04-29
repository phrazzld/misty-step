import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import { Button } from "@/components/ui/button";

const meta: Meta<typeof Button> = {
  title: "Setup/Verification",
  component: Button,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const VerificationStory: Story = {
  render: () => (
    <div className="p-4 border rounded-lg max-w-md space-y-4">
      <h2 className="text-2xl font-bold text-foreground">Storybook Setup Verification</h2>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Tailwind Classes</h3>
        <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-md">
          <p className="text-primary">Primary text color from theme</p>
          <p className="text-foreground">Foreground text color from theme</p>
          <p className="text-sm text-muted-foreground">Muted text with smaller size</p>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Component from alias</h3>
        <Button variant="default">Button Component</Button>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Static Assets</h3>
        <div className="flex justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/vercel.svg"
            alt="Vercel Logo"
            width={120}
            height={40}
            className="dark:invert"
          />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Font Family</h3>
        <p className="font-sans">This text uses the font-sans class</p>
      </div>

      <p className="text-xs text-muted-foreground mt-4">
        Use the theme toggle in the toolbar to switch between light and dark mode
      </p>
    </div>
  ),
};
