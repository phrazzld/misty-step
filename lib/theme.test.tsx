import { renderHook, act } from '@testing-library/react';
import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { ThemeProvider, useTheme, getSystemThemePreference, applyTheme } from './theme';

// Mock the window.matchMedia function
const mockMatchMedia = (prefersDark = false) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: prefersDark && query === '(prefers-color-scheme: dark)',
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

describe('Theme utilities', () => {
  // Reset document class between tests
  beforeEach(() => {
    document.documentElement.classList.remove('dark');
    mockMatchMedia(false);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('getSystemThemePreference', () => {
    it('returns light when system prefers light mode', () => {
      mockMatchMedia(false);
      expect(getSystemThemePreference()).toBe('light');
    });

    it('returns dark when system prefers dark mode', () => {
      mockMatchMedia(true);
      expect(getSystemThemePreference()).toBe('dark');
    });

    it('handles SSR by defaulting to light', () => {
      const originalWindow = window;
      // @ts-expect-error - Deliberately setting window to undefined for testing
      global.window = undefined;

      expect(getSystemThemePreference()).toBe('light');

      // Restore window
      global.window = originalWindow;
    });
  });

  describe('applyTheme', () => {
    it('adds dark class to html element for dark theme', () => {
      applyTheme('dark');
      expect(document.documentElement.classList.contains('dark')).toBe(true);
    });

    it('removes dark class from html element for light theme', () => {
      // First add the class
      document.documentElement.classList.add('dark');

      // Then apply light theme
      applyTheme('light');
      expect(document.documentElement.classList.contains('dark')).toBe(false);
    });

    it('handles SSR by doing nothing', () => {
      const originalDocument = document;
      // @ts-expect-error - Deliberately setting document to undefined for testing
      global.document = undefined;

      // This should not throw an error
      expect(() => applyTheme('dark')).not.toThrow();

      // Restore document
      global.document = originalDocument;
    });
  });

  describe('ThemeProvider and useTheme', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider>{children}</ThemeProvider>
    );

    it('provides default theme context values', () => {
      const { result } = renderHook(() => useTheme(), { wrapper });
      expect(result.current.theme).toBe('light');
      expect(typeof result.current.setTheme).toBe('function');
      expect(typeof result.current.toggleTheme).toBe('function');
    });

    it('allows setting theme', () => {
      const { result } = renderHook(() => useTheme(), { wrapper });

      act(() => {
        result.current.setTheme('dark');
      });

      expect(result.current.theme).toBe('dark');
      expect(document.documentElement.classList.contains('dark')).toBe(true);
    });

    it('allows toggling theme', () => {
      const { result } = renderHook(() => useTheme(), { wrapper });

      // Start with light theme
      expect(result.current.theme).toBe('light');

      // Toggle to dark
      act(() => {
        result.current.toggleTheme();
      });

      expect(result.current.theme).toBe('dark');
      expect(document.documentElement.classList.contains('dark')).toBe(true);

      // Toggle back to light
      act(() => {
        result.current.toggleTheme();
      });

      expect(result.current.theme).toBe('light');
      expect(document.documentElement.classList.contains('dark')).toBe(false);
    });

    it('respects default theme prop', () => {
      const customWrapper = ({ children }: { children: React.ReactNode }) => (
        <ThemeProvider defaultTheme="dark">{children}</ThemeProvider>
      );

      const { result } = renderHook(() => useTheme(), { wrapper: customWrapper });
      expect(result.current.theme).toBe('dark');
      expect(document.documentElement.classList.contains('dark')).toBe(true);
    });

    it('detects system preference when enabled', () => {
      mockMatchMedia(true); // Mock system preference for dark

      const { result } = renderHook(() => useTheme(), { wrapper });

      // Check systemPreference is detected
      expect(result.current.systemPreference).toBe('dark');

      // And theme is set to system preference
      expect(result.current.theme).toBe('dark');
    });

    it('ignores system preference when disabled', () => {
      mockMatchMedia(true); // Mock system preference for dark

      const customWrapper = ({ children }: { children: React.ReactNode }) => (
        <ThemeProvider disableSystemPreference>{children}</ThemeProvider>
      );

      const { result } = renderHook(() => useTheme(), { wrapper: customWrapper });

      // System preference should be null
      expect(result.current.systemPreference).toBe(null);

      // Theme should be light (default)
      expect(result.current.theme).toBe('light');
    });
  });
});
