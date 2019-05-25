#!/bin/bash

# Checks if both NPM and Yarn have set their registrys to Verdaccio.
function checkRegistryConfig() {
  local verdaccioRegistry="http://172.30.20.18:4873"
  local npmRegistry
  local yarnRegistry

  npmRegistry="$(npm config get registry)"
  yarnRegistry="$(yarn config get registry)"

  if [[ "$npmRegistry" != *"$verdaccioRegistry"* ]]; then
    echo "NPM registry is not set to $verdaccioRegistry"
    echo "NPM registry is currently set to $npmRegistry"

    return 1
  fi

  if [[ "$yarnRegistry" != *"$verdaccioRegistry"* ]]; then
    echo "Yarn registry is not set to $verdaccioRegistry"
    echo "Yarn registry is currently set to $yarnRegistry"

    return 1
  fi

  return 0
}
