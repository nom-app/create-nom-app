#!/usr/bin/env bash

# Print each command and their arguments as they are executed
set -x

# Exit if a command returns a non-zero code
set -e

# Go to root of repository
root_dir="$(dirname "$(dirname "${BASH_SOURCE[0]}")")"
cd "$root_dir"

# shellcheck source=./registry.sh
source ./tasks/registry.sh

yarn --frozen-lockfile

startLocalRegistry

./tasks/install-packages.sh

tests_tmp_dir=$(mktemp -d -t cna-XXXXXXXXXX)
cd "$tests_tmp_dir"

{
  npx --ignore-existing create-nom-app --info
}

{
  npx --ignore-existing create-nom-app my-first-app --use-npm
  cd "my-first-app"
  if [ ! -f "./package-lock.json" ]; then
    echo "No package-lock.json file generated."
    exit 1
  fi

  if [ -f "./yarn.lock" ]; then
    echo "A yarn.lock file was generated while using the --use-npm flag."
    exit 1
  fi

  if [ ! "$(timeout 5s npm run start -- --once)" ]; then
    echo "Failed to start with once with --once"
  fi

  if [ ! "$(timeout 5s npm run build)" ]; then
    echo "Failed to build"
  fi

  if [ ! "$(npm run test)" ]; then
    echo "Not all tests pass"
  fi
}

cd "$root_dir"

./node_modules/.bin/lerna exec -- yarn test

yarn run lint
./node_modules/.bin/lerna exec -- yarn lint

stopLocalRegistry
