import path from "path";
import { fileURLToPath } from "url";

import type { StorybookConfig } from "@storybook/react-vite";

// Get the directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config: StorybookConfig = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../components/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
    "@storybook/addon-themes",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  staticDirs: ["../public"],
  async viteFinal(viteConfig) {
    // Add path aliases
    if (viteConfig.resolve) {
      viteConfig.resolve.alias = {
        ...(viteConfig.resolve.alias || {}),
        "@": path.resolve(__dirname, "../"),
      };
    }
    return viteConfig;
  },
};

export default config;
