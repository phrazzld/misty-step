import { describe, it, expect, vi } from 'vitest';

import { render, screen } from '@/test/utils';

import { SiteHeader } from './site-header';

// Mock the DarkModeToggle component
vi.mock('@/components/dark-mode-toggle', () => ({
  DarkModeToggle: () => <div data-testid="dark-mode-toggle">DarkModeToggle</div>,
}));

describe('SiteHeader', () => {
  it('renders the logo and site name', () => {
    render(<SiteHeader />);

    const logo = screen.getByAltText('Misty Step Logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/images/logo.svg');

    const siteName = screen.getByText('Misty Step');
    expect(siteName).toBeInTheDocument();
  });

  it('renders the navigation links', () => {
    render(<SiteHeader />);

    const servicesLink = screen.getByRole('link', { name: 'Services' });
    expect(servicesLink).toBeInTheDocument();
    expect(servicesLink).toHaveAttribute('href', '#services');

    const aboutLink = screen.getByRole('link', { name: 'About' });
    expect(aboutLink).toBeInTheDocument();
    expect(aboutLink).toHaveAttribute('href', '#about');

    const contactLink = screen.getByRole('link', { name: 'Contact' });
    expect(contactLink).toBeInTheDocument();
    expect(contactLink).toHaveAttribute('href', '#contact');
  });

  it('renders the DarkModeToggle component', () => {
    render(<SiteHeader />);

    const darkModeToggle = screen.getByTestId('dark-mode-toggle');
    expect(darkModeToggle).toBeInTheDocument();
  });

  it('has a Get Started button linking to contact section', () => {
    render(<SiteHeader />);

    const getStartedButton = screen.getByRole('link', { name: 'Get Started' });
    expect(getStartedButton).toBeInTheDocument();
    expect(getStartedButton).toHaveAttribute('href', '#contact');
  });

  it('has the expected layout structure', () => {
    render(<SiteHeader />);

    // Check header has appropriate classes
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('sticky');
    expect(header).toHaveClass('bg-background/80');

    // Check for navigation
    const nav = header.querySelector('nav');
    expect(nav).toBeInTheDocument();
    expect(nav).toHaveClass('hidden');
    expect(nav).toHaveClass('md:flex');

    // Check for container
    const container = header.querySelector('.container');
    expect(container).toBeInTheDocument();
  });
});
