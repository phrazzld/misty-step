import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import ClientThemeProvider from './client-theme-provider';

// Mock the ThemeProvider from the theme module
vi.mock('@/lib/theme', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="theme-provider-mock">{children}</div>
  ),
}));

describe('ClientThemeProvider', () => {
  it('renders children within the ThemeProvider', () => {
    const { getByTestId } = render(
      <ClientThemeProvider>
        <div data-testid="test-child">Test Content</div>
      </ClientThemeProvider>,
    );

    // Verify the ThemeProvider is used
    expect(getByTestId('theme-provider-mock')).toBeInTheDocument();

    // Verify children are rendered
    expect(getByTestId('test-child')).toBeInTheDocument();
    expect(getByTestId('test-child')).toHaveTextContent('Test Content');
  });
});
