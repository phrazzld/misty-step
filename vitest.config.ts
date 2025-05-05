import { resolve } from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        '.next/',
        '**/*.d.ts',
        '**/*.test.{ts,tsx}',
        '**/*.stories.{ts,tsx}',
        '**/*.config.{ts,js,mjs}',
        'next.config.ts',
        'postcss.config.mjs',
        'eslint.config.mjs',
        '.storybook/**',
        'storybook-static/**',
        'stories/**',
      ],
      thresholds: {
        statements: 85,
        branches: 85,
        functions: 85,
        lines: 85,
      },
    },
    include: ['**/*.test.{ts,tsx}'],
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './'),
    },
  },
});
