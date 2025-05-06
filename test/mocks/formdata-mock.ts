import { vi } from 'vitest';

/**
 * Form field value type
 * Mirrors the types that can be stored in a real FormData object
 */
export type FormDataValue = string | File | Blob | null;

/**
 * Form data storage type
 * Maps field names to their values (which can be single values or arrays of values)
 */
export type FormDataStorage = Map<string, FormDataValue[]>;

/**
 * Create a mock FormData class with controlled test data
 *
 * @param initialData - Optional initial data to populate the FormData object
 * @returns A mock FormData instance with ViTest spy functions
 */
export function createMockFormData(initialData: Record<string, FormDataValue> = {}): FormData {
  // The internal storage for our form data
  const storage: FormDataStorage = new Map();

  // Initialize with any provided data
  Object.entries(initialData).forEach(([key, value]) => {
    storage.set(key, [value]);
  });

  // Create the mock FormData object
  const mockFormData = {
    // Core methods that operate on the internal storage
    append: vi.fn((name: string, value: FormDataValue, _filename?: string) => {
      const existingValues = storage.get(name) || [];
      storage.set(name, [...existingValues, value]);
    }),

    delete: vi.fn((name: string) => {
      storage.delete(name);
    }),

    get: vi.fn((name: string): FormDataValue => {
      const values = storage.get(name);
      return values && values.length > 0 ? values[0] : null;
    }),

    getAll: vi.fn((name: string): FormDataValue[] => {
      return storage.get(name) || [];
    }),

    has: vi.fn((name: string): boolean => {
      return storage.has(name);
    }),

    set: vi.fn((name: string, value: FormDataValue, _filename?: string) => {
      storage.set(name, [value]);
    }),

    // Iterator methods
    entries: vi.fn(function* (): IterableIterator<[string, FormDataValue]> {
      for (const [key, values] of storage.entries()) {
        for (const value of values) {
          yield [key, value];
        }
      }
    }),

    keys: vi.fn(function* (): IterableIterator<string> {
      for (const key of storage.keys()) {
        yield key;
      }
    }),

    values: vi.fn(function* (): IterableIterator<FormDataValue> {
      for (const values of storage.values()) {
        for (const value of values) {
          yield value;
        }
      }
    }),

    forEach: vi.fn((callback: (value: FormDataValue, key: string, parent: FormData) => void) => {
      for (const [key, values] of storage.entries()) {
        for (const value of values) {
          callback(value, key, mockFormData as unknown as FormData);
        }
      }
    }),
  };

  return mockFormData as unknown as FormData;
}

/**
 * Setup global FormData mock for testing
 *
 * @param initialData - Optional data to pre-populate in constructed FormData instances
 * @returns A cleanup function to restore the original FormData constructor
 */
export function setupGlobalFormDataMock(
  initialData: Record<string, FormDataValue> = {},
): () => void {
  // Store the original FormData constructor
  const originalFormData = global.FormData;

  // Create a spy for the FormData constructor
  const formDataSpy = vi.fn(() => createMockFormData(initialData));

  // Replace the global FormData constructor
  global.FormData = formDataSpy as unknown as typeof FormData;

  // Return a cleanup function
  return () => {
    global.FormData = originalFormData;
  };
}

/**
 * Shorthand to create a FormData mock with specific field values
 *
 * @param values - Record of field names to their values
 * @returns A mock FormData instance with the specified values
 */
export function mockFormDataWithValues(values: Record<string, FormDataValue>): FormData {
  return createMockFormData(values);
}
