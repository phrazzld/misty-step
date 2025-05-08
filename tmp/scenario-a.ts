// Scenario A: File with fixable ESLint/Prettier issues
// This file has formatting issues that should be auto-fixed by the pre-commit hook

export function scenarioA() {
  const fixableIssues = true;
  if (fixableIssues) {
    return 'This file has formatting issues that should be auto-fixed';
  } else {
    return 'The pre-commit hook should fail';
  }
}
