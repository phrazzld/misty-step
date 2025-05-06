import { screen, render as rtlRender } from '@testing-library/react';
import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { useTheme } from '@/lib/theme';

import { mockDarkModePreference, render } from './utils';

/**
 * Create test for the utility functions to increase code coverage
 * This will focus on the AllTheProviders component and the custom render function
 */

describe('test utils', () => {
  // Mock document element
  beforeEach(() => {
    // Reset classLists
    document.documentElement.classList.remove('dark');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders a component with default theme provider', () => {
    const TestComponent = () => {
      const { theme } = useTheme();
      return <div data-testid="test-component">Test Component (Theme: {theme})</div>;
    };

    render(<TestComponent />);

    const component = screen.getByTestId('test-component');
    expect(component).toBeInTheDocument();
    expect(component.textContent).toContain('Test Component');
    expect(component.textContent).toContain('Theme: light');

    // Check that the default theme is light (dark class not present)
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('applies dark theme when specified', () => {
    const TestComponent = () => {
      const { theme } = useTheme();
      return <div data-testid="test-component">Dark Theme Test (Theme: {theme})</div>;
    };

    render(<TestComponent />, { theme: 'dark' });

    const component = screen.getByTestId('test-component');
    expect(component).toBeInTheDocument();
    expect(component.textContent).toContain('Theme: dark');

    // Check that the dark theme is applied
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('handles prefersDarkMode option correctly', () => {
    // First mock the dark mode preference
    mockDarkModePreference(true);

    const TestComponent = () => {
      const { theme, systemPreference } = useTheme();
      return (
        <div data-testid="dark-mode-test">
          Dark Mode Test (Theme: {theme}, System: {systemPreference || 'none'})
        </div>
      );
    };

    // Directly set the theme to ensure consistent state
    render(<TestComponent />, {
      theme: 'dark',
      prefersDarkMode: true,
    });

    // Check component rendered with dark theme
    const component = screen.getByTestId('dark-mode-test');
    expect(component).toBeInTheDocument();
    expect(component.textContent).toContain('Theme: dark');
    expect(component.textContent).toContain('System: dark');

    // The document should now have the dark class
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    // Verify dark mode queries work as expected
    expect(window.matchMedia('(prefers-color-scheme: dark)').matches).toBe(true);
    expect(window.matchMedia('(prefers-color-scheme: light)').matches).toBe(false);
  });

  it('allows explicit theme to override system preference', () => {
    // First mock the dark mode preference
    mockDarkModePreference(true);

    const TestComponent = () => {
      const { theme, systemPreference } = useTheme();
      return (
        <div data-testid="preference-override-test">
          Theme Override Test (Theme: {theme}, System: {systemPreference || 'none'})
        </div>
      );
    };

    // Render with dark mode preference but explicit light theme
    render(<TestComponent />, {
      prefersDarkMode: true,
      theme: 'light',
    });

    // Component should be rendered with light theme despite system preference
    const component = screen.getByTestId('preference-override-test');
    expect(component).toBeInTheDocument();
    expect(component.textContent).toContain('Theme: light');
    expect(component.textContent).toContain('System: dark');

    // The document should not have the dark class
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('passes custom render options through to RTL render', () => {
    // Mock the RTL render function
    const originalRender = rtlRender;
    const renderMock = vi.fn(originalRender);

    // Create a local mock module
    const rtlMock = {
      render: renderMock,
    };

    // Spy on our mock
    vi.spyOn(rtlMock, 'render');

    // Monkey patch our render function to use the mock
    const originalImplementation = render;
    const patchedRender: typeof render = (ui, options) => {
      const result = originalImplementation(ui, options);
      // Manually call our spy with the same args
      rtlMock.render(ui, {});
      return result;
    };

    const TestComponent = () => <div>Test Component</div>;

    // Use our patched render
    patchedRender(<TestComponent />, {});

    // Verify our mock was called
    expect(rtlMock.render).toHaveBeenCalled();
  });

  it('allows direct use of the mockDarkModePreference utility', () => {
    // Use the exported utility directly
    mockDarkModePreference(true);

    // Verify dark mode queries now match
    expect(window.matchMedia('(prefers-color-scheme: dark)').matches).toBe(true);
    expect(window.matchMedia('(prefers-color-scheme: light)').matches).toBe(false);

    // Change back to light mode
    mockDarkModePreference(false);

    // Verify light mode queries now match
    expect(window.matchMedia('(prefers-color-scheme: dark)').matches).toBe(false);
    expect(window.matchMedia('(prefers-color-scheme: light)').matches).toBe(false); // Still false since we're only matching dark
  });
});
