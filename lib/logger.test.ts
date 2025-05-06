import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import logger, { createLogger, createConfiguredLogger } from './logger';

describe('logger', () => {
  // Spy on the underlying methods
  beforeEach(() => {
    vi.spyOn(logger, 'info').mockImplementation(() => {});
    vi.spyOn(logger, 'error').mockImplementation(() => {});
    vi.spyOn(logger, 'warn').mockImplementation(() => {});
    vi.spyOn(logger, 'debug').mockImplementation(() => {});
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.spyOn(logger, 'child').mockImplementation(() => logger as any);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('exports a default logger instance', () => {
    expect(logger).toBeDefined();
    expect(typeof logger.info).toBe('function');
    expect(typeof logger.error).toBe('function');
    expect(typeof logger.warn).toBe('function');
    expect(typeof logger.debug).toBe('function');
  });

  it('logs messages with the correct level', () => {
    logger.info('Info message');
    logger.error('Error message');
    logger.warn('Warning message');
    logger.debug('Debug message');

    expect(logger.info).toHaveBeenCalledWith('Info message');
    expect(logger.error).toHaveBeenCalledWith('Error message');
    expect(logger.warn).toHaveBeenCalledWith('Warning message');
    expect(logger.debug).toHaveBeenCalledWith('Debug message');
  });

  it('creates child loggers with additional context', () => {
    const childSpy = vi.spyOn(logger, 'child');
    const moduleLogger = createLogger({ module: 'test-module' });

    expect(childSpy).toHaveBeenCalledWith({ module: 'test-module' });
    expect(moduleLogger).toBeDefined();
  });

  it('creates child logger with empty context when none provided', () => {
    const childSpy = vi.spyOn(logger, 'child');
    const emptyLogger = createLogger();

    expect(childSpy).toHaveBeenCalledWith({});
    expect(emptyLogger).toBeDefined();
  });

  describe('createConfiguredLogger', () => {
    it('creates a configured logger instance', () => {
      const testLogger = createConfiguredLogger();
      expect(testLogger).toBeDefined();
      expect(typeof testLogger.info).toBe('function');
    });

    it('accepts environment parameter', () => {
      // Testing that the function accepts the parameters
      // We can't directly test the transport configuration without mocking pino
      const devLogger = createConfiguredLogger({ environment: 'development' });
      const prodLogger = createConfiguredLogger({ environment: 'production' });

      expect(devLogger).toBeDefined();
      expect(prodLogger).toBeDefined();
    });

    it('accepts level parameter', () => {
      const debugLogger = createConfiguredLogger({ level: 'debug' });
      expect(debugLogger).toBeDefined();
    });

    it('accepts serviceName parameter', () => {
      const customServiceLogger = createConfiguredLogger({ serviceName: 'test-service' });
      expect(customServiceLogger).toBeDefined();
    });
  });
});
