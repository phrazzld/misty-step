import { withThemeByClassName } from "@storybook/addon-themes";
import type { Preview } from "@storybook/react";
// Try to load globals CSS at the end - sometimes the order matters
// Comment out for now to get basic functionality working
// import "../app/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    withThemeByClassName({
      themes: { light: "", dark: "dark" },
      defaultTheme: "light",
      parentSelector: "html",
    }),
  ],
};

export default preview;
