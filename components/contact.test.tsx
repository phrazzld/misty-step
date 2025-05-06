import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import * as contactFormModule from '@/lib/contact-form';
import { render, screen } from '@/test/utils';

import { Contact } from './contact';

// Mock the form handling functions
vi.mock('@/lib/contact-form', () => ({
  submitContactForm: vi.fn(),
  processContactForm: vi.fn(),
}));

describe('Contact', () => {
  // Mock FormData
  const mockFormData = {
    get: vi.fn(),
    append: vi.fn(),
    delete: vi.fn(),
    entries: vi.fn(),
    forEach: vi.fn(),
    getAll: vi.fn(),
    has: vi.fn(),
    keys: vi.fn(),
    set: vi.fn(),
    values: vi.fn(),
  };

  // Setup mocks before tests
  beforeEach(() => {
    // Clear all mocks
    vi.clearAllMocks();

    // Mock FormData
    const originalFormData = global.FormData;
    global.FormData = vi.fn().mockImplementation(() => mockFormData as unknown as FormData);

    // Mock the submitContactForm function
    vi.mocked(contactFormModule.submitContactForm).mockResolvedValue({
      success: true,
      data: {
        name: 'Test User',
        email: 'test@example.com',
        message: 'Test message',
      },
    });

    // Cleanup function to restore the original FormData
    return () => {
      global.FormData = originalFormData;
    };
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

  it.skip('properly validates email format', async () => {
    const user = userEvent.setup();
    render(<Contact />);

    // Get email input
    const emailInput = screen.getByLabelText('Email');

    // Fill in other required fields
    await user.type(screen.getByLabelText('Name'), 'John Doe');
    await user.type(screen.getByLabelText('Message'), 'This is a test message');

    // Try with invalid email
    await user.type(emailInput, 'invalid-email');

    // Validate input
    expect(emailInput).toBeInvalid();

    // Clear and try with valid email
    await user.clear(emailInput);
    await user.type(emailInput, 'valid@example.com');

    // Email field should be valid
    expect(emailInput).toBeValid();
  });

  it('has the correct section id for navigation purposes', () => {
    render(<Contact />);
    const section = document.getElementById('contact');
    expect(section).toBeInTheDocument();
    expect(section).toHaveTextContent(/get in touch/i);
  });
});
