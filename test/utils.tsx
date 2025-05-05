// Import vitest for mocking functionality
import { render, RenderOptions } from '@testing-library/react';
import React, { ReactElement, useEffect } from 'react';
import { vi, beforeEach } from 'vitest';

// Mock theme provider for testing
interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: 'light' | 'dark';
}

const ThemeProvider = ({
  children,
  defaultTheme = 'light',
}: ThemeProviderProps): React.JSX.Element => {
  // Set up the theme class on the document
  useEffect(() => {
    // First apply the theme class
    if (defaultTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Clean up on unmount
    return () => {
      document.documentElement.classList.remove('dark');
    };
  }, [defaultTheme]);

  return <>{children}</>;
};

// Custom render options interface
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  theme?: 'light' | 'dark';
  prefersDarkMode?: boolean;
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

// All providers wrapper
const AllTheProviders = ({
  children,
  theme = 'light',
  prefersDarkMode = false,
}: {
  children: React.ReactNode;
  theme?: 'light' | 'dark';
  prefersDarkMode?: boolean;
}): React.JSX.Element => {
  // Set up dark mode preferences if needed
  useEffect(() => {
    if (prefersDarkMode) {
      // Override matchMedia for dark mode preference
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation((query) => ({
          matches: query.includes('dark'), // Match dark mode queries
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
      });
    }
  }, [prefersDarkMode]);

  return <ThemeProvider defaultTheme={theme}>{children}</ThemeProvider>;
};

// Custom render function
const customRender = (
  ui: ReactElement,
  options?: CustomRenderOptions,
): ReturnType<typeof render> => {
  const { theme, prefersDarkMode, ...restOptions } = options || {};

  return render(ui, {
    wrapper: (props) =>
      AllTheProviders({
        ...props,
        theme,
        prefersDarkMode,
      }),
    ...restOptions,
  });
};

// Re-export everything
export * from '@testing-library/react';
export { customRender as render };
