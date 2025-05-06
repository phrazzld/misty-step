import { describe, it, expect, vi } from 'vitest';

// Import form module for mocking
import '@/lib/contact-form';
import { render, screen } from '@/test/utils';

import { Contact } from './contact';

// Mock the form handling functions
vi.mock('@/lib/contact-form', () => ({
  submitContactForm: vi.fn(),
  processContactForm: vi.fn(),
}));

describe('Contact', () => {
  it('renders correctly with all form elements', () => {
    render(<Contact />);

    // Check for heading
    expect(screen.getByText('Get In Touch')).toBeInTheDocument();

    // Check for form fields
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Message')).toBeInTheDocument();

    // Check for submit button
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  it('validates required fields', () => {
    render(<Contact />);

    // Get form fields
    const nameInput = screen.getByLabelText('Name');
    const emailInput = screen.getByLabelText('Email');
    const messageInput = screen.getByLabelText('Message');

    // Check if required validation is working
    expect(nameInput).toBeRequired();
    expect(emailInput).toBeRequired();
    expect(messageInput).toBeRequired();
  });

  it('validates email format', () => {
    render(<Contact />);

    // Get email input
    const emailInput = screen.getByLabelText('Email') as HTMLInputElement;

    // Email input should have type="email" for browser validation
    expect(emailInput.type).toBe('email');
  });

  it('has the correct section id for navigation purposes', () => {
    render(<Contact />);
    const section = document.getElementById('contact');
    expect(section).toBeInTheDocument();
    expect(section).toHaveTextContent(/get in touch/i);
  });

  // Note: Form submission tests are skipped for now
  // They are covered by tests in lib/contact-form.test.ts
  it.todo('should call submitContactForm when the form is submitted');
  it.todo('should show success message on successful form submission');
  it.todo('should show error message on failed form submission');
});
