'use client';

import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';

// Theme types
export type Theme = 'light' | 'dark';

// Interface for the theme context
export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  systemPreference: Theme | null;
}

// Create the theme context with a default value
export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  setTheme: () => {},
  toggleTheme: () => {},
  systemPreference: null,
});

// Hook to use the theme context
export const useTheme = (): ThemeContextType => useContext(ThemeContext);

// Utility to detect system preference for dark mode
export const getSystemThemePreference = (): Theme => {
  // Default to light mode if window object is not available (SSR)
  if (typeof window === 'undefined') {
    return 'light';
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

// Apply the theme to the document
export const applyTheme = (theme: Theme): void => {
  if (typeof document === 'undefined') {
    return;
  }

  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

// Properties for the ThemeProvider component
interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
  disableSystemPreference?: boolean;
}

// ThemeProvider component
export const ThemeProvider = ({
  children,
  defaultTheme,
  disableSystemPreference = false,
}: ThemeProviderProps): JSX.Element => {
  // State for the current theme
  const [theme, setThemeState] = useState<Theme>(defaultTheme || 'light');

  // State to track system preference
  const [systemPreference, setSystemPreference] = useState<Theme | null>(null);

  // Initialize system preference
  useEffect(() => {
    if (!disableSystemPreference) {
      const preference = getSystemThemePreference();
      setSystemPreference(preference);

      // Use system preference if no default theme was provided
      if (!defaultTheme) {
        setThemeState(preference);
      }
    }
  }, [disableSystemPreference, defaultTheme]);

  // Apply theme to document
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // Set theme function
  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
  }, []);

  // Toggle theme function
  const toggleTheme = useCallback(() => {
    setThemeState((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);

  // Context value
  const contextValue: ThemeContextType = {
    theme,
    setTheme,
    toggleTheme,
    systemPreference,
  };

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};
