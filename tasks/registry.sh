#!/bin/bash

verdaccio_registry=http://localhost:4873
original_npm_registry=`npm config get registry`
original_yarn_registry=`yarn config get registry`

function useVerdaccioRegistry () {
  _printRegistryInformation
  _setRegistries "$verdaccio_registry" "$verdaccio_registry"
}

function useOriginalRegistry () {
  _printRegistryInformation
  _setRegistries "$original_npm_registry" "$original_yarn_registry"
}

function _printRegistryInformation () {
  echo "verdaccio registry: ${verdaccio_registry}"
  echo "original npm registry: ${original_npm_registry}"
  echo "original yarn registry: ${original_yarn_registry}"
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
