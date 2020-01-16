#!/bin/bash

# Print each command and their arguments as they are executed
set -x

# Exit if a command returns a non-zero code
set -e

# Specify a package to install. ./install-packages.sh nom-scripts
installPackage=$1

printf "Set to install "
if [ -n "$installPackage" ]; then
  printf "%s\n" "$installPackage"
elif [ -z "$installPackage" ]; then
  printf "all packages.\n"
fi

printf "Waiting for Verdaccio"

# From https://stackoverflow.com/a/246128
SOURCE="${BASH_SOURCE[0]}"
while [ -h "$SOURCE" ]; do # resolve $SOURCE until the file is no longer a symlink
  DIR="$( cd -P "$( dirname "$SOURCE" )" >/dev/null 2>&1 && pwd )"
  SOURCE="$(readlink "$SOURCE")"
  [[ $SOURCE != /* ]] && SOURCE="$DIR/$SOURCE" # if $SOURCE was a relative symlink, we need to resolve it relative to the path where the symlink file was located
done
DIR="$( cd -P "$( dirname "$SOURCE" )" >/dev/null 2>&1 && pwd )"

# FIXME: This line will loop forever in CI environments, and because there is
# output, the CI will run for a very long time.
until curl --output /dev/null --silent --head --fail http://0.0.0.0:4873; do
    printf "."
    sleep 1s
done

printf "... Verdaccio service detected.\n"

# shellcheck source=./check-registry-config.sh
source "${DIR}/check-registry-config.sh"

if ! checkRegistryConfig; then
  exit 12
fi

PACKAGES_DIR=$(pwd)/packages

local_packages=()

echo "Packages directory set: $PACKAGES_DIR"

# Checks if a `package.json` file exists in `$1/$2`.
#
# @param {string} baseDir The base directory
# @param {string} packageDir The name of the package
# @return {boolean} Whether or not package.json is discovered.
function isPackage() {
  local baseDir
  baseDir=$1
  local package_dir
  package_dir=$2

  test -f "$baseDir/$package_dir/package.json"
}

function buildAndPublish() {
  local prevPWD
  local package
  local pkgAbsoluteDir

  prevPWD=$(pwd)
  package=$1
  pkgAbsoluteDir="$PACKAGES_DIR/$package"

  # From https://gist.github.com/DarrenN/8c6a5b969481725a4413
  # shellcheck disable=2002
  pkgVersion=$(cat "$pkgAbsoluteDir/package.json" \
    | grep version \
    | head -1 \
    | awk -F: '{ print $2 }' \
    | sed 's/[",]//g' \
    | tr -d '[:space:]')

  echo "  $package@$pkgVersion"

  echo "$pkgAbsoluteDir"

  cd "$pkgAbsoluteDir" || exit 1

  echo "unpublishing previous versions of $package@$pkgVersion from Verdaccio"
  # Unpublish previous version of package, which may have persisted on Verdaccio
  if [[ $(npm view --registry http://0.0.0.0:4873 "$package@$pkgVersion") ]]; then
    npm unpublish --force --registry http://0.0.0.0:4873 --verbose "$package@$pkgVersion"
  fi

  echo "yarn install"
  yarn install

  echo "yarn run build"
  yarn run build

  echo "publishing $package to Verdaccio"
  npm publish --registry http://0.0.0.0:4873 --verbose

  cd "$prevPWD" || exit 1
}

function getPackages() {
  local prevPWD
  prevPWD=$(pwd)

  echo "prevPWD=$prevPWD"

  cd "$PACKAGES_DIR" || exit 1

  for package in *; do
    if [ -d "$package" ]; then
      if [[ -f "$(pwd)/$package/package.json" ]]; then
        if [ -n "$installPackage" ] && [ "$package" = "$installPackage" ] || [ -z "$installPackage" ]; then
          local_packages+=("$package")
        fi
      fi
    fi
  done

  cd "$prevPWD" || exit 1
}

getPackages

for package in "${local_packages[@]}"; do
  echo "Building and Publishing $package to Verdaccio"

  buildAndPublish "$package"
done


# Sleep gives us time to open an interactive shell. This should be removed when
# opening an interactive shell is no longer required. TODO: Remove sleep time
# when no longer required for development.
POST_INSTALL_SLEEP_TIME="0s"

echo "finished, sleeping now for $POST_INSTALL_SLEEP_TIME"

sleep $POST_INSTALL_SLEEP_TIME
