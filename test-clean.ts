// Test file with no linting or formatting errors

function testClean(param1: string, param2: string): string {
  const greeting = 'Hello';

  if (param1 === 'world') {
    return `${greeting}, ${param1}!`;
  } else {
    return `${greeting}, ${param2}!`;
  }
}

export { testClean };
