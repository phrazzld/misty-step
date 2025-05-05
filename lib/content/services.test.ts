import { describe, it, expect } from 'vitest';

import { coreServices } from './services';

describe('ServiceOffering', () => {
  it('coreServices should contain at least one service', () => {
    expect(coreServices.length).toBeGreaterThan(0);
  });

  it('each service should have the required properties', () => {
    coreServices.forEach((service) => {
      // Check that the service has all required properties
      expect(service).toHaveProperty('id');
      expect(service).toHaveProperty('title');
      expect(service).toHaveProperty('description');
      expect(service).toHaveProperty('points');

      // Check that the properties have the correct types
      expect(typeof service.id).toBe('string');
      expect(typeof service.title).toBe('string');
      expect(typeof service.description).toBe('string');
      expect(Array.isArray(service.points)).toBe(true);

      // Check that points is not empty
      expect(service.points.length).toBeGreaterThan(0);

      // Check that all points are strings
      service.points.forEach((point) => {
        expect(typeof point).toBe('string');
      });
    });
  });

  it('services should have the expected core services', () => {
    // Check that we have the expected core services by id
    const expectedServiceIds = [
      'strategic-technology-consulting',
      'custom-software-development',
      'cloud-devops-solutions',
      'data-analytics-ai',
    ];

    // Verify each expected service exists
    expectedServiceIds.forEach((expectedId) => {
      const service = coreServices.find((s) => s.id === expectedId);
      expect(service).toBeDefined();
    });
  });
});
