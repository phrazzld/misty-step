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

  it('renders with correct font classes', () => {
    // We don't need TestComponent approach, just introspect layout directly
    // Comment left to show previous attempt strategy

    // Use JSDOM's document API instead of rendering the actual layout
    // This avoids the hydration warning from rendering <html> in a <div>
    const div = document.createElement('div');
    div.innerHTML =
      '<div data-test-body-classes="--font-geist-sans --font-geist-mono antialiased" />';
    document.body.appendChild(div);

    // Verify layout structure and content
    expect(RootLayout.name).toBe('RootLayout');

    // We're introspecting the layout component structure
    const layout = RootLayout({ children: <div>Test Child</div> });

    // Verify that it's an html element
    expect(layout.type).toBe('html');

    // Use a more specific type for props
    interface HtmlElementProps {
      lang: string;
      children: React.ReactNode;
      [key: string]: unknown;
    }

    expect((layout.props as HtmlElementProps).lang).toBe('en');

    // Verify that it contains a body element with children
    const body = (layout.props as HtmlElementProps).children;
    expect(body.type).toBe('body');
    expect(body.props.className).toContain('--font-geist-sans');
    expect(body.props.className).toContain('--font-geist-mono');
    expect(body.props.className).toContain('antialiased');
  });
});
