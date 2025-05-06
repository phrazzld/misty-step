import { describe, it, expect, vi } from 'vitest';

import { mockFormDataWithValues } from '@/test/mocks/formdata-mock';

import { processContactForm, submitContactForm } from './contact-form';

describe('contact-form', () => {
  describe('processContactForm', () => {
    it('returns success result with form data when all fields are provided', () => {
      // Create a mock FormData with valid data
      const mockFormData = mockFormDataWithValues({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'This is a test message',
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
      // Create a mock FormData with missing name
      const mockFormData = mockFormDataWithValues({
        email: 'john@example.com',
        message: 'This is a test message',
      });

      // Process the form
      const result = processContactForm(mockFormData);

      // Check the result
      expect(result.success).toBe(false);
      expect(result.error).toBe('All fields are required');
      expect(result.data).toBeUndefined();
    });

    it('returns error result when email is missing', () => {
      // Create a mock FormData with missing email
      const mockFormData = mockFormDataWithValues({
        name: 'John Doe',
        message: 'This is a test message',
      });

      // Process the form
      const result = processContactForm(mockFormData);

      // Check the result
      expect(result.success).toBe(false);
      expect(result.error).toBe('All fields are required');
      expect(result.data).toBeUndefined();
    });

    it('returns error result when message is missing', () => {
      // Create a mock FormData with missing message
      const mockFormData = mockFormDataWithValues({
        name: 'John Doe',
        email: 'john@example.com',
      });

      // Process the form
      const result = processContactForm(mockFormData);

      // Check the result
      expect(result.success).toBe(false);
      expect(result.error).toBe('All fields are required');
      expect(result.data).toBeUndefined();
    });

    it('handles unexpected errors during processing', () => {
      // Create a mock FormData that throws an error
      const mockFormData = mockFormDataWithValues({});
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
      // Create a mock FormData with missing fields
      const mockFormData = mockFormDataWithValues({
        email: 'john@example.com',
        message: 'This is a test message',
      });

      // Submit the form
      const result = await submitContactForm(mockFormData);

      // Check the result
      expect(result.success).toBe(false);
      expect(result.error).toBe('All fields are required');
    });

    it('returns a successful result after the simulated delay when validation passes', async () => {
      // Create a mock FormData with valid data
      const mockFormData = mockFormDataWithValues({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'This is a test message',
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
