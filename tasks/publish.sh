#!/bin/bash

echo "publish.sh will publish packages to NPM and is not recommended to run."
echo ""
echo "If you intend to publish packages to NPM, don't. Publishing packages should be handled in the CI by a bot."
echo ""
echo "You probably meant to publish packages to the local Verdaccio registry."
echo ""
echo "To update packages on the registry, run 'bash ./tasks/install-packages.sh'"
exit 1

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
