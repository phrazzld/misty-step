import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import Home from './page';

// Mock all imported components
vi.mock('@/components/contact', () => ({
  Contact: () => <div data-testid="contact-component">Contact Component</div>,
}));

vi.mock('@/components/hero', () => ({
  Hero: () => <div data-testid="hero-component">Hero Component</div>,
}));

vi.mock('@/components/services', () => ({
  Services: () => <div data-testid="services-component">Services Component</div>,
}));

vi.mock('@/components/site-footer', () => ({
  SiteFooter: () => <div data-testid="site-footer-component">SiteFooter Component</div>,
}));

vi.mock('@/components/site-header', () => ({
  SiteHeader: () => <div data-testid="site-header-component">SiteHeader Component</div>,
}));

describe('Home Page', () => {
  it('renders all main components', () => {
    render(<Home />);

    expect(screen.getByTestId('site-header-component')).toBeInTheDocument();
    expect(screen.getByTestId('hero-component')).toBeInTheDocument();
    expect(screen.getByTestId('services-component')).toBeInTheDocument();
    expect(screen.getByTestId('contact-component')).toBeInTheDocument();
    expect(screen.getByTestId('site-footer-component')).toBeInTheDocument();
  });

  it('renders the about section', () => {
    render(<Home />);

    // About section heading
    expect(screen.getByText('About Misty Step')).toBeInTheDocument();

    // About section paragraphs
    expect(screen.getByText(/Founded in 2023, Misty Step is dedicated/)).toBeInTheDocument();
    expect(screen.getByText(/We believe in partnering with our clients/)).toBeInTheDocument();
  });

  it('has sections with correct IDs for navigation', () => {
    render(<Home />);

    const aboutSection = document.getElementById('about');
    expect(aboutSection).toBeInTheDocument();
  });
});
