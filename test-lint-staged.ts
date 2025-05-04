// This is a test file with proper formatting and linting

function testFunction(param1: string, param2: string): string {
  if (param1 === 'test') {
    return 'test';
  }
  return param1 + param2;
}

// Export to avoid unused function warning
export { testFunction };
