---
id: contributing-docker-services
title: Create Nom App's Docker Services
sidebar_label: Docker & Services
---

## Portainer

[Portainer](https://github.com/portainer/portainer) is used to easily monitor
and manage Docker services through a simple web interface.

UI Entrypoint: [172.30.20.20](http://172.30.20.20)

Username: `admin`

Password: `portpass`

## Verdaccio

[Verdaccio](https://github.com/verdaccio/verdaccio) is a local private npm
registry. It is primarily used to publish local development packages which are,
in turn, used by e2e and integration testing.

UI Entrypoint (primary): [172.30.20.18:4873](http://172.30.20.18:4873)

UI Entrypoint (secondary): [0.0.0.0:4873](http://0.0.0.0:4873)

username: `cna`

password: `local-registry`

## local_publish

This service builds and publishes all `packages` to the Verdaccio registry.

If you make changes to a package, or wish to republish the packages to the
Verdaccio registry, run `make reup-packages`.

> **Note:** Packages published to Verdaccio are on the `dev` tag at the registry
> <http://172.30.20.18:4873>.

