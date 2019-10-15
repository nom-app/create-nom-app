---
id: docker-verdaccio
title: Verdaccio
sidebar_label: Verdaccio
---

> **Note**: The Verdaccio Docker service is discontinued and has been replaced
> with `tasks/registry.sh`.

[Verdaccio](https://github.com/verdaccio/verdaccio) is a local private package
registry. It is primarily used to publish local development packages which are,
in turn, used by e2e and integration testing.

UI Entrypoint (primary): [0.0.0.0:4873](http://0.0.0.0:4873)

UI Entrypoint (docker - discontinued): [172.30.20.18:4873](http://172.30.20.18:4873)

username: `cna`

password: `local-registry`

## How to use

From a terminal, load the `registry.sh` script from `tasks`.

```sh
# Project root
. ./tasks/registry.sh
```

### Starting the Local Registry

Run `startLocalRegistry`

### Stopping the Local Registry

Run `stopLocalRegistry`

You may need to verify that your registry config has changed with
`_printRegistryInformation`.

The current registries should not be set to the Verdaccio registry. If
`registry.sh` is unable to revert to your old registry information, run
`useNPMRegistry` or `useYarnRegistry` to set your configuration to their
registries.
