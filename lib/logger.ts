import pino from 'pino';

/**
 * Configuration options for creating loggers
 */
export interface LoggerOptions {
  /**
   * Environment ('development', 'production', etc.)
   * Controls whether pretty printing is enabled
   * @default process.env.NODE_ENV
   */
  environment?: string;

  /**
   * Log level
   * @default process.env.LOG_LEVEL || 'info'
   */
  level?: string;

  /**
   * Service name for the base context
   * @default 'marketing-site'
   */
  serviceName?: string;
}

/**
 * Creates a configured Pino logger instance
 *
 * @param options Configuration options
 * @returns Configured logger instance
 */
export function createConfiguredLogger(options: LoggerOptions = {}): pino.Logger {
  const {
    environment = process.env.NODE_ENV,
    level = process.env.LOG_LEVEL || 'info',
    serviceName = 'marketing-site',
  } = options;

  return pino({
    name: serviceName,
    level,
    timestamp: pino.stdTimeFunctions.isoTime,
    formatters: {
      level: (label) => {
        return { level: label };
      },
    },
    base: {
      service_name: serviceName,
    },
    transport:
      environment === 'development'
        ? {
            target: 'pino-pretty',
            options: {
              colorize: true,
              translateTime: 'SYS:standard',
            },
          }
        : undefined,
  });
}

// Create the default logger instance
const logger = createConfiguredLogger();

/**
 * Creates a child logger with additional context
 *
 * @param context Additional context fields to add to the logger
 * @returns A child logger with the provided context
 */
export function createLogger(context: Record<string, unknown> = {}): pino.Logger {
  return logger.child(context);
}

export default logger;
