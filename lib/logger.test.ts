import pino from 'pino';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Import after the mock is set up
import logger, { createLogger, createConfiguredLogger } from './logger';

// Define the type for our mock pino function with additional properties
type MockPinoFn = ReturnType<typeof vi.fn> & {
  lastOptions: Record<string, any>;
  stdTimeFunctions: {
    isoTime: string;
  };
};

// We need to mock pino before importing our logger
vi.mock('pino', () => {
  const mockPinoInstance = {
    info: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
    debug: vi.fn(),
    child: vi.fn().mockImplementation(() => mockPinoInstance),
  };

  const mockPino = vi.fn().mockImplementation((options) => {
    // Store the options for testing
    (mockPino as MockPinoFn).lastOptions = options;
    return mockPinoInstance;
  }) as MockPinoFn;

  // Add a place to store the last options
  mockPino.lastOptions = {};

  // Add the standard time functions that our logger uses
  mockPino.stdTimeFunctions = {
    isoTime: 'ISO_TIME',
  };

  return {
    default: mockPino,
  };
});

describe('logger', () => {
  // Get the mocked pino function
  const mockPino = pino as unknown as MockPinoFn;

  beforeEach(() => {
    // Reset the lastOptions before each test
    mockPino.lastOptions = {};
    mockPino.mockClear();
  });

  afterEach(() => {
    vi.clearAllMocks();
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
    it('creates a configured logger instance with default options', () => {
      // Create a logger with default options
      const testLogger = createConfiguredLogger();

      // Verify the logger was created
      expect(testLogger).toBeDefined();
      expect(typeof testLogger.info).toBe('function');

      // Verify pino was called with the expected default options
      expect(mockPino).toHaveBeenCalled();
      expect(mockPino.lastOptions).toMatchObject({
        name: 'marketing-site',
        level: expect.any(String),
        base: {
          service_name: 'marketing-site',
        },
        formatters: {
          level: expect.any(Function),
        },
      });
    });

    it('configures logger with pretty printing when environment is development', () => {
      // Create a logger in development environment
      createConfiguredLogger({ environment: 'development' });

      // Verify pino was called with the expected options for development
      expect(mockPino).toHaveBeenCalled();
      expect(mockPino.lastOptions.transport).toBeDefined();
      expect(mockPino.lastOptions.transport).toMatchObject({
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:standard',
        },
      });
    });

    it('configures logger without pretty printing when environment is production', () => {
      // Create a logger in production environment
      createConfiguredLogger({ environment: 'production' });

      // Verify pino was called with the expected options for production
      expect(mockPino).toHaveBeenCalled();
      expect(mockPino.lastOptions.transport).toBeUndefined();
    });

    it('configures logger with custom log level', () => {
      // Create a logger with custom level
      createConfiguredLogger({ level: 'debug' });

      // Verify pino was called with the custom level
      expect(mockPino).toHaveBeenCalled();
      expect(mockPino.lastOptions.level).toBe('debug');
    });

    it('configures logger with custom service name', () => {
      // Create a logger with custom service name
      createConfiguredLogger({ serviceName: 'test-service' });

      // Verify pino was called with the custom name
      expect(mockPino).toHaveBeenCalled();
      expect(mockPino.lastOptions.name).toBe('test-service');
      expect(mockPino.lastOptions.base.service_name).toBe('test-service');
    });

    it('uses the same configuration approach regardless of environment', () => {
      // Create loggers with different environments
      createConfiguredLogger({ environment: 'development' });
      const devOptions = { ...mockPino.lastOptions };

      mockPino.lastOptions = {}; // Reset
      createConfiguredLogger({ environment: 'production' });
      const prodOptions = { ...mockPino.lastOptions };

      // Compare key options (excluding transport)
      expect(devOptions.name).toEqual(prodOptions.name);
      expect(devOptions.level).toEqual(prodOptions.level);
      expect(devOptions.base.service_name).toEqual(prodOptions.base.service_name);

      // But transport should be different
      expect(devOptions.transport).toBeDefined();
      expect(prodOptions.transport).toBeUndefined();
    });

    it('configures logger with different options based on environment parameter', () => {
      // This test was previously skipped, but now we can properly test it

      // Test development environment
      createConfiguredLogger({ environment: 'development' });
      expect(mockPino.lastOptions.transport).toBeDefined();
      expect(mockPino.lastOptions.transport.target).toBe('pino-pretty');

      // Test production environment
      mockPino.lastOptions = {}; // Reset
      createConfiguredLogger({ environment: 'production' });
      expect(mockPino.lastOptions.transport).toBeUndefined();

      // Test staging environment (should behave like production)
      mockPino.lastOptions = {}; // Reset
      createConfiguredLogger({ environment: 'staging' });
      expect(mockPino.lastOptions.transport).toBeUndefined();

      // Test test environment (should behave like production)
      mockPino.lastOptions = {}; // Reset
      createConfiguredLogger({ environment: 'test' });
      expect(mockPino.lastOptions.transport).toBeUndefined();
    });
  });
});
