import pino from "pino";

/**
 * Configured Pino logger instance for structured logging
 *
 * Features:
 * - JSON output for production
 * - Pretty printing for development
 * - Standard fields: timestamp, level, service_name
 * - Configurable level via environment variable
 */
const logger = pino({
  name: "marketing-site",
  level: process.env.LOG_LEVEL || "info",
  timestamp: pino.stdTimeFunctions.isoTime,
  formatters: {
    level: (label) => {
      return { level: label };
    },
  },
  base: {
    service_name: "marketing-site",
  },
  transport:
    process.env.NODE_ENV === "development"
      ? {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: "SYS:standard",
          },
        }
      : undefined,
});

/**
 * Creates a child logger with additional context
 *
 * @param context Additional context fields to add to the logger
 * @returns A child logger with the provided context
 */
export function createLogger(context: Record<string, unknown> = {}): typeof logger {
  return logger.child(context);
}

export default logger;
