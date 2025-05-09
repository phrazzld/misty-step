import { withThemeByClassName } from '@storybook/addon-themes';
import type { Preview } from '@storybook/react';

import './preview.css';
import '../app/globals.css'; // Use the main app's CSS directly

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
      themes: { light: '', dark: 'dark' },
      defaultTheme: 'light',
      parentSelector: 'html',
    }),
  ],
};

export default preview;
