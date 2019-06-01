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

## Local Publish

This service builds and publishes all `packages` to the Verdaccio registry.

If you make changes to a package, or wish to republish the packages to the
Verdaccio registry, run `make reup-packages`.

> **Note:** Packages published to Verdaccio are on the `dev` tag at the registry
> <http://172.30.20.18:4873>.

## Terminal Renderer

This service will render recorded
[Terminalizer](https://github.com/faressoft/terminalizer) files. The files are
written to the `output` folder.

You can run the project without Docker by using `RAW_TERM_DIR=./rawTerminalData
OUTPUT_DIR=./output node render.js` from the `services/termr` directory.

> **Note:** The only font currently supported for rendering is "Menlo for
> Powerline". Make sure that your configuration is set correctly.
>
> ```yaml
> config:
>   fontFamily: "Menlo for Powerline"
>   ...
> records:
>    ...
> ```

## docs_docusaurus

Docusaurus builds the documentation.

The `docker-compose.yml` file for Docusaurus is in the `docs/` folder.

Build the documentation with `docker-compose up`.

View the documentation locally at <http://localhost:3000/create-nom-app/>
