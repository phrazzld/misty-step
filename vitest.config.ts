import { resolve } from "path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: ["node_modules/", ".next/", "**/*.d.ts", "**/*.test.{ts,tsx}"],
      // Setting initial lower thresholds for bootstrapping
      // TODO: Raise to 85% as required by development philosophy once more tests are added in task T008
      thresholds: {
        statements: 30,
        branches: 80,
        functions: 70,
        lines: 30,
      },
    },
    include: ["**/*.test.{ts,tsx}"],
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./"),
    },
  },
});
