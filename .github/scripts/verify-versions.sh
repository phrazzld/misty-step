#!/bin/bash
set -e

# Script to verify Node.js and pnpm versions match package.json#engines

# Constants
PACKAGE_JSON="package.json"
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions
log_error() {
  echo -e "${RED}ERROR:${NC} $1"
}

log_success() {
  echo -e "${GREEN}SUCCESS:${NC} $1"
}

log_info() {
  echo -e "${BLUE}INFO:${NC} $1"
}

# Check if package.json exists
if [ ! -f "$PACKAGE_JSON" ]; then
  log_error "Cannot find $PACKAGE_JSON in the current directory"
  exit 1
fi

# Extract expected versions from package.json using grep and sed
# This approach doesn't require jq which might not be available in all CI environments
log_info "Extracting engine requirements from $PACKAGE_JSON..."

# Extract Node.js version
EXPECTED_NODE_VERSION=$(grep -o '"node": *"[^"]*"' $PACKAGE_JSON | sed 's/"node": *"\(.*\)"/\1/')
if [ -z "$EXPECTED_NODE_VERSION" ]; then
  log_error "Could not extract Node.js version from $PACKAGE_JSON"
  exit 1
fi

# Extract pnpm version
EXPECTED_PNPM_VERSION=$(grep -o '"pnpm": *"[^"]*"' $PACKAGE_JSON | sed 's/"pnpm": *"\(.*\)"/\1/')
if [ -z "$EXPECTED_PNPM_VERSION" ]; then
  log_error "Could not extract pnpm version from $PACKAGE_JSON"
  exit 1
fi

# Get actual versions
ACTUAL_NODE_VERSION=$(node -v | sed 's/^v//')
ACTUAL_PNPM_VERSION=$(pnpm -v)

# Display version information
echo "===== Version Verification ====="
echo -e "Node.js: Expected ${YELLOW}$EXPECTED_NODE_VERSION${NC}, Actual ${YELLOW}$ACTUAL_NODE_VERSION${NC}"
echo -e "pnpm:    Expected ${YELLOW}$EXPECTED_PNPM_VERSION${NC}, Actual ${YELLOW}$ACTUAL_PNPM_VERSION${NC}"
echo "=============================="

# Check Node.js version
if [ "$ACTUAL_NODE_VERSION" != "$EXPECTED_NODE_VERSION" ]; then
  log_error "Node.js version mismatch!"
  log_error "Expected: $EXPECTED_NODE_VERSION, Actual: $ACTUAL_NODE_VERSION"
  exit 1
fi

# Check pnpm version
if [ "$ACTUAL_PNPM_VERSION" != "$EXPECTED_PNPM_VERSION" ]; then
  log_error "pnpm version mismatch!"
  log_error "Expected: $EXPECTED_PNPM_VERSION, Actual: $ACTUAL_PNPM_VERSION"
  exit 1
fi

# All checks passed
log_success "All version checks passed! Node.js and pnpm versions match package.json#engines requirements."
exit 0