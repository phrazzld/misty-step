import { describe, it, expect, vi, beforeEach } from 'vitest';

import { processContactForm, submitContactForm } from './contact-form';

describe('contact-form', () => {
  // Create a mock FormData for testing
  let mockFormData: FormData;

  beforeEach(() => {
    // Reset the FormData mock before each test
    mockFormData = {
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
    } as unknown as FormData;
  });

  describe('processContactForm', () => {
    it('returns success result with form data when all fields are provided', () => {
      // Set up the mock to return valid data
      vi.mocked(mockFormData.get).mockImplementation((key) => {
        if (key === 'name') return 'John Doe';
        if (key === 'email') return 'john@example.com';
        if (key === 'message') return 'This is a test message';
        return null;
      });

      // Process the form
      const result = processContactForm(mockFormData);

      // Check the result
      expect(result.success).toBe(true);
      expect(result.data).toEqual({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'This is a test message',
      });
      expect(result.error).toBeUndefined();

      // Verify the form data was accessed correctly
      expect(mockFormData.get).toHaveBeenCalledWith('name');
      expect(mockFormData.get).toHaveBeenCalledWith('email');
      expect(mockFormData.get).toHaveBeenCalledWith('message');
    });

    it('returns error result when name is missing', () => {
      // Set up the mock to return incomplete data
      vi.mocked(mockFormData.get).mockImplementation((key) => {
        if (key === 'name') return null; // Missing name
        if (key === 'email') return 'john@example.com';
        if (key === 'message') return 'This is a test message';
        return null;
      });

      // Process the form
      const result = processContactForm(mockFormData);

      // Check the result
      expect(result.success).toBe(false);
      expect(result.error).toBe('All fields are required');
      expect(result.data).toBeUndefined();
    });

    it('returns error result when email is missing', () => {
      // Set up the mock to return incomplete data
      vi.mocked(mockFormData.get).mockImplementation((key) => {
        if (key === 'name') return 'John Doe';
        if (key === 'email') return null; // Missing email
        if (key === 'message') return 'This is a test message';
        return null;
      });

      // Process the form
      const result = processContactForm(mockFormData);

      // Check the result
      expect(result.success).toBe(false);
      expect(result.error).toBe('All fields are required');
      expect(result.data).toBeUndefined();
    });

    it('returns error result when message is missing', () => {
      // Set up the mock to return incomplete data
      vi.mocked(mockFormData.get).mockImplementation((key) => {
        if (key === 'name') return 'John Doe';
        if (key === 'email') return 'john@example.com';
        if (key === 'message') return null; // Missing message
        return null;
      });

      // Process the form
      const result = processContactForm(mockFormData);

      // Check the result
      expect(result.success).toBe(false);
      expect(result.error).toBe('All fields are required');
      expect(result.data).toBeUndefined();
    });

    it('handles unexpected errors during processing', () => {
      // Make the FormData.get method throw an error
      vi.mocked(mockFormData.get).mockImplementation(() => {
        throw new Error('Test error');
      });

      // Process the form
      const result = processContactForm(mockFormData);

      // Check the result
      expect(result.success).toBe(false);
      expect(result.error).toBe('Test error');
      expect(result.data).toBeUndefined();
    });
  });

  describe('submitContactForm', () => {
    it('returns the result from processContactForm when validation fails', async () => {
      // Set up the mock to return incomplete data
      vi.mocked(mockFormData.get).mockImplementation((key) => {
        if (key === 'name') return null; // Missing name
        return null;
      });

      // Submit the form
      const result = await submitContactForm(mockFormData);

      // Check the result
      expect(result.success).toBe(false);
      expect(result.error).toBe('All fields are required');
    });

    it('returns a successful result after the simulated delay when validation passes', async () => {
      // Set up the mock to return valid data
      vi.mocked(mockFormData.get).mockImplementation((key) => {
        if (key === 'name') return 'John Doe';
        if (key === 'email') return 'john@example.com';
        if (key === 'message') return 'This is a test message';
        return null;
      });

      // Mock setTimeout to avoid actual delay in tests
      vi.useFakeTimers();

      // Start the submission
      const resultPromise = submitContactForm(mockFormData);

      // Fast-forward the timer
      vi.runAllTimers();

      // Get the result
      const result = await resultPromise;

      // Check the result
      expect(result.success).toBe(true);
      expect(result.data).toEqual({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'This is a test message',
      });

      // Restore timers
      vi.useRealTimers();
    });
  });
});
