#!/bin/bash

# Print each command and their arguments as they are executed
set -x

# Exit if a command returns a non-zero code
set -e

# Go to root of repository
cd "$(dirname "$(dirname "${BASH_SOURCE[0]}")")"

# Install packages
yarn

# Cleans build directory, code coverage results, and more
./node_modules/.bin/lerna exec -- yarn build:clean

# Build packages
./node_modules/.bin/lerna exec -- yarn build

if [ -n "$(git status --porcelain)" ]; then
  echo "There are uncommitted changes in the repository." >&2
  exit 1
fi

# Publish packages
./node_modules/.bin/lerna publish --npm-client=npm "$@"
