#!/bin/bash

REGISTRY_WARMUP_TIME="5s"

echo "Giving Verdaccio some time to warm up: $REGISTRY_WARMUP_TIME"
sleep "$REGISTRY_WARMUP_TIME"

if ! curl --head http://172.30.20.18:4873/; then
  echo "Verdaccio is still not responding after $REGISTRY_WARMUP_TIME seconds. Exiting now"
  exit 16
fi


# NPM_USERNAME=cna
# NPM_PASSWORD="local-registry"
# NPM_EMAIL="localregistry@example.local"

# echo "adding npm user for Verdaccio registry"
# npm adduser --registry=http://172.30.20.18:4873 --verbose <<!
# $NPM_USERNAME
# $NPM_PASSWORD
# $NPM_EMAIL
# !



source ./check-registry-config.sh

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

  echo "$pkgAbsoluteDir"

  cd "$pkgAbsoluteDir" || exit 1

  echo "unpublishing previous versions of $package from Verdaccio"
  # Unpublish previous version of package, which may have persisted on Verdaccio
  npm unpublish --registry http://172.30.20.18:4873 --force

  echo "yarn install"
  yarn install

  echo "yarn build"
  yarn build

  echo "publishing $package to Verdaccio"
  npm publish --registry http://172.30.20.18:4873 --verbose

  cd "$prevPWD" || exit 1
}

function getPackages() {
  local prevPWD
  prevPWD=$(pwd)

  echo "prevPWD=$prevPWD"

  cd "$PACKAGES_DIR" || exit 1

  for package in *; do
    if [ -d "$package" ]; then
      if isPackage "$(pwd)" "$package"; then
        local_packages+=("$package")
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


echo "finished, sleeping now"

# Sleep gives us time to open an interactive shell. This should be removed when
# opening an interactive shell is no longer required.
sleep 1000s
