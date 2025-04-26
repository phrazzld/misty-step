import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

import logger, { createLogger } from "./logger";

describe("logger", () => {
  // Spy on the underlying methods
  beforeEach(() => {
    vi.spyOn(logger, "info").mockImplementation(() => {});
    vi.spyOn(logger, "error").mockImplementation(() => {});
    vi.spyOn(logger, "warn").mockImplementation(() => {});
    vi.spyOn(logger, "debug").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("exports a default logger instance", () => {
    expect(logger).toBeDefined();
    expect(typeof logger.info).toBe("function");
    expect(typeof logger.error).toBe("function");
    expect(typeof logger.warn).toBe("function");
    expect(typeof logger.debug).toBe("function");
  });

  it("logs messages with the correct level", () => {
    logger.info("Info message");
    logger.error("Error message");
    logger.warn("Warning message");
    logger.debug("Debug message");

    expect(logger.info).toHaveBeenCalledWith("Info message");
    expect(logger.error).toHaveBeenCalledWith("Error message");
    expect(logger.warn).toHaveBeenCalledWith("Warning message");
    expect(logger.debug).toHaveBeenCalledWith("Debug message");
  });

  it("creates child loggers with additional context", () => {
    const childSpy = vi.spyOn(logger, "child");
    const moduleLogger = createLogger({ module: "test-module" });

    expect(childSpy).toHaveBeenCalledWith({ module: "test-module" });
    expect(moduleLogger).toBeDefined();
  });
});
