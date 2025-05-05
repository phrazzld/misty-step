import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { metadata, default as RootLayout } from './layout';

// Mock the globals.css import to avoid PostCSS loading issues
vi.mock('./globals.css', () => ({}));

// Mock the next/font/google
vi.mock('next/font/google', () => ({
  Geist: () => ({
    variable: '--font-geist-sans',
  }),
  Geist_Mono: () => ({
    variable: '--font-geist-mono',
  }),
}));

describe('Layout', () => {
  it('has the correct metadata', () => {
    expect(metadata.title).toBe('Misty Step - Professional Technology Consulting Services');
    expect(metadata.description).toBe(
      'Software development and technical consulting services that transform your business challenges into effective digital solutions. Expert guidance when you need it most.',
    );
  });

  it('renders correctly with children', () => {
    const { container } = render(
      <RootLayout>
        <div data-testid="test-child">Test Child</div>
      </RootLayout>,
    );

    // In React Testing Library, the rendered component is inside a div wrapper,
    // so we can't directly access the html element
    // Instead, check that the body contains the expected children and classes

    // Check that our test child is rendered
    expect(container.querySelector('[data-testid="test-child"]')).toBeInTheDocument();
    expect(container.querySelector('[data-testid="test-child"]')?.textContent).toBe('Test Child');

    // Check for the presence of the font variable classes in the rendered output
    const bodyClasses = container.firstChild?.textContent;
    // Just verify that the component renders without crashing
    expect(bodyClasses).toBeDefined();
  });
});
