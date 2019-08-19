#!/bin/bash

verdaccio_registry=http://172.30.20.18:4873
npm_registry=https://registry.npmjs.org/
yarn_registry=https://registry.yarnpkg.com
original_npm_registry=$(npm config get registry)
original_yarn_registry=$(yarn config get registry)

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
