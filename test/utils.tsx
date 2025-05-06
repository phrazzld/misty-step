// Import vitest for mocking functionality
import { render, RenderOptions } from '@testing-library/react';
import React, { ReactElement } from 'react';
import { vi, beforeEach } from 'vitest';

// Import our new ThemeProvider and types
import { Theme, ThemeProvider } from '@/lib/theme';

// Custom render options interface
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  theme?: Theme;
  prefersDarkMode?: boolean;
  renderOptions?: RenderOptions;
}

// Mock the window.matchMedia function globally for all tests
beforeEach(() => {
  // Setup a standard matchMedia mock for tests
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false, // Default to not matching (light mode)
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

// Set up mock matchMedia for dark mode preference
export const mockDarkModePreference = (prefersDark = true): void => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: prefersDark && query.includes('dark'), // Match dark mode queries when prefersDark is true
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
};

// All providers wrapper
const AllTheProviders = ({
  children,
  theme = 'light',
  prefersDarkMode = false,
}: {
  children: React.ReactNode;
  theme?: Theme;
  prefersDarkMode?: boolean;
}): React.ReactElement => {
  // If prefersDarkMode is true, mock the system preference
  if (prefersDarkMode) {
    mockDarkModePreference(true);
  }

  return (
    <ThemeProvider defaultTheme={theme} disableSystemPreference={!prefersDarkMode}>
      {children}
    </ThemeProvider>
  );
};

// Custom render function
const customRender = (
  ui: ReactElement,
  options?: CustomRenderOptions,
): ReturnType<typeof render> => {
  const { theme, prefersDarkMode, renderOptions, ...restOptions } = options || {};

  return render(ui, {
    wrapper: (props) =>
      AllTheProviders({
        ...props,
        theme,
        prefersDarkMode,
      }),
    ...restOptions,
    ...(renderOptions || {}),
  });
};

// Re-export everything
export * from '@testing-library/react';
export { customRender as render };
