import { describe, it, expect, afterEach } from 'vitest';

import {
  createMockFormData,
  setupGlobalFormDataMock,
  mockFormDataWithValues,
} from './formdata-mock';

describe('FormData mock utilities', () => {
  describe('createMockFormData', () => {
    it('creates a FormData mock with the expected methods', () => {
      const mockFormData = createMockFormData();

      // Check that all expected methods exist
      expect(mockFormData.append).toBeDefined();
      expect(mockFormData.delete).toBeDefined();
      expect(mockFormData.get).toBeDefined();
      expect(mockFormData.getAll).toBeDefined();
      expect(mockFormData.has).toBeDefined();
      expect(mockFormData.set).toBeDefined();
      expect(mockFormData.entries).toBeDefined();
      expect(mockFormData.keys).toBeDefined();
      expect(mockFormData.values).toBeDefined();
      expect(mockFormData.forEach).toBeDefined();
    });

    it('initializes with provided data', () => {
      const mockFormData = createMockFormData({
        name: 'John Doe',
        email: 'john@example.com',
      });

      expect(mockFormData.get('name')).toBe('John Doe');
      expect(mockFormData.get('email')).toBe('john@example.com');
      expect(mockFormData.get('nonexistent')).toBeNull();
    });

    it('allows appending values', () => {
      const mockFormData = createMockFormData();

      mockFormData.append('field', 'value1');
      mockFormData.append('field', 'value2');

      expect(mockFormData.get('field')).toBe('value1');
      expect(mockFormData.getAll('field')).toEqual(['value1', 'value2']);
    });

    it('allows setting values', () => {
      const mockFormData = createMockFormData();

      mockFormData.set('field', 'value1');
      expect(mockFormData.get('field')).toBe('value1');

      mockFormData.set('field', 'value2');
      expect(mockFormData.get('field')).toBe('value2');
      expect(mockFormData.getAll('field')).toEqual(['value2']);
    });

    it('allows deleting values', () => {
      const mockFormData = createMockFormData({ field: 'value' });

      expect(mockFormData.has('field')).toBe(true);

      mockFormData.delete('field');

      expect(mockFormData.has('field')).toBe(false);
      expect(mockFormData.get('field')).toBeNull();
    });

    it('supports iteration methods', () => {
      const mockFormData = createMockFormData({
        name: 'John Doe',
        email: 'john@example.com',
      });

      // Test entries()
      const entries = Array.from(mockFormData.entries());
      expect(entries).toEqual([
        ['name', 'John Doe'],
        ['email', 'john@example.com'],
      ]);

      // Test keys()
      const keys = Array.from(mockFormData.keys());
      expect(keys).toEqual(['name', 'email']);

      // Test values()
      const values = Array.from(mockFormData.values());
      expect(values).toEqual(['John Doe', 'john@example.com']);

      // Test forEach()
      const collected: Record<string, string> = {};
      mockFormData.forEach((value, key) => {
        collected[key] = value as string;
      });
      expect(collected).toEqual({
        name: 'John Doe',
        email: 'john@example.com',
      });
    });
  });

  describe('setupGlobalFormDataMock', () => {
    let cleanup: () => void;

    afterEach(() => {
      if (cleanup) {
        cleanup();
      }
    });

    it('replaces the global FormData constructor', () => {
      const originalFormData = global.FormData;

      cleanup = setupGlobalFormDataMock({
        name: 'Default Name',
      });

      expect(global.FormData).not.toBe(originalFormData);

      const formData = new FormData();
      expect(formData.get('name')).toBe('Default Name');
    });

    it('returns a cleanup function that restores the original FormData', () => {
      const originalFormData = global.FormData;

      cleanup = setupGlobalFormDataMock();
      expect(global.FormData).not.toBe(originalFormData);

      cleanup();
      expect(global.FormData).toBe(originalFormData);
    });
  });

  describe('mockFormDataWithValues', () => {
    it('creates a pre-populated FormData mock', () => {
      const formData = mockFormDataWithValues({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Hello world',
      });

      expect(formData.get('name')).toBe('John Doe');
      expect(formData.get('email')).toBe('john@example.com');
      expect(formData.get('message')).toBe('Hello world');
    });
  });
});
