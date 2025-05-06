import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import * as contactFormModule from '@/lib/contact-form';
import { render, screen, waitFor } from '@/test/utils';

import { Contact } from './contact';

// Mock the form handling functions
vi.mock('@/lib/contact-form', () => ({
  submitContactForm: vi.fn(),
  processContactForm: vi.fn(),
}));

describe('Contact', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

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

  it('validates required fields when form is submitted', async () => {
    const user = userEvent.setup();
    render(<Contact />);

    // Submit the form without filling any fields
    await user.click(screen.getByRole('button', { name: /send message/i }));

    // Check for validation error messages
    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.getByText('Message is required')).toBeInTheDocument();
    });
  });

  it('uses email input type for validation', () => {
    render(<Contact />);

    // Check that the email input has the correct type for browser validation
    const emailInput = screen.getByLabelText('Email') as HTMLInputElement;
    expect(emailInput.type).toBe('email');
  });

  it('submits the form with valid data', async () => {
    // Mock successful submission
    vi.mocked(contactFormModule.submitContactForm).mockResolvedValueOnce({
      success: true,
      data: {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Test message',
      },
    });

    const user = userEvent.setup();
    render(<Contact />);

    // Fill in the form
    await user.type(screen.getByLabelText('Name'), 'John Doe');
    await user.type(screen.getByLabelText('Email'), 'john@example.com');
    await user.type(screen.getByLabelText('Message'), 'Test message');

    // Submit the form
    await user.click(screen.getByRole('button', { name: /send message/i }));

    // Verify form submission
    await waitFor(() => {
      expect(contactFormModule.submitContactForm).toHaveBeenCalledTimes(1);

      // Check that FormData was created with the form values
      const formDataArg = vi.mocked(contactFormModule.submitContactForm).mock.calls[0][0];
      expect(formDataArg).toBeInstanceOf(FormData);

      // Success message should be displayed
      expect(screen.getByRole('alert')).toHaveTextContent(
        'Your message has been sent successfully!',
      );
    });
  });

  it('shows error message on failed form submission', async () => {
    // Mock failed submission
    vi.mocked(contactFormModule.submitContactForm).mockResolvedValueOnce({
      success: false,
      error: 'Failed to send message',
    });

    const user = userEvent.setup();
    render(<Contact />);

    // Fill in the form
    await user.type(screen.getByLabelText('Name'), 'John Doe');
    await user.type(screen.getByLabelText('Email'), 'john@example.com');
    await user.type(screen.getByLabelText('Message'), 'Test message');

    // Submit the form
    await user.click(screen.getByRole('button', { name: /send message/i }));

    // Verify error message
    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Failed to send message');
    });
  });

  it('has the correct section id for navigation purposes', () => {
    render(<Contact />);
    const section = document.getElementById('contact');
    expect(section).toBeInTheDocument();
    expect(section).toHaveTextContent(/get in touch/i);
  });
});
