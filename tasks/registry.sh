#!/bin/bash

verdaccio_registry=http://0.0.0.0:4873
npm_registry=https://registry.npmjs.org/
yarn_registry=https://registry.yarnpkg.com
original_npm_registry=$(npm config get registry)
original_yarn_registry=$(yarn config get registry)
root_dir="$( cd -P "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
verdaccio_package=verdaccio@4.2.2

function useVerdaccioRegistry () {
  _printRegistryInformation
  _setRegistries "$verdaccio_registry" "$verdaccio_registry"
}

function useOriginalRegistry () {
  _printRegistryInformation
  _setRegistries "$original_npm_registry" "$original_yarn_registry"
}

function useNPMRegistry () {
  _printRegistryInformation
  _setRegistries "$npm_registry" "$npm_registry"
}

function useYarnRegisty () {
  _printRegistryInformation
  _setRegistries "$yarn_registry" "$yarn_registry"
}

function _printRegistryInformation () {
  echo "verdaccio registry: ${verdaccio_registry}"
  echo ""
  echo "original npm  registry: ${original_npm_registry}"
  echo "original yarn registry: ${original_yarn_registry}"
  echo ""
  echo "current  npm  registry: $(npm config get registry)"
  echo "current  yarn registry: $(yarn config get registry)"
}

# Usage: _setRegistries [newNPMRegistry] [newYarnRegistry]
function _setRegistries () {
  local newNPMRegistry
  newNPMRegistry=$1
  local newYarnRegistry
  newYarnRegistry=$2

  echo "setting new npm registry: $newNPMRegistry"
  npm config set registry "$newNPMRegistry"

  echo "setting new yarn registry: $newYarnRegistry"
  yarn config set registry "$newYarnRegistry"
}

function startLocalRegistry () {
  current_npm_registry=$(npm config get registry)
  if ! curl --output /dev/null --silent --max-time 5 --head --fail "$current_npm_registry"; then
    echo "Unable to connect to registry - $current_npm_registry - for npx."
    echo "Is the registry on the NPM client set correctly?"
    return 1
  fi
  if checkVerdaccioServiceRunning; then
    echo "Verdaccio service already running at $verdaccio_registry."
    return 0
  fi

  local configPath
  configPath=${1:-"$root_dir/services/verdaccio/conf/config.yaml"}
  registryLog=$(mktemp)

  echo "Registry log path: $registryLog"
  echo "Starting Verdaccio registry..."

  (cd && nohup npx $verdaccio_package --config "$configPath" --listen "$verdaccio_registry" &> "$registryLog" &)
  grep -q 'http address' <(tail -f "$registryLog")
  useVerdaccioRegistry
}

function checkVerdaccioServiceRunning () {
  if curl --output /dev/null --silent --head --fail "$verdaccio_registry"; then
    return 0
  else
    return 1
  fi
}

function stopLocalRegistry () {
  useOriginalRegistry

  verdaccio_pid=$(pgrep verdaccio | head -1)

  if [ -n "$verdaccio_pid" ]; then
    kill -9 "$verdaccio_pid"
  fi
}
