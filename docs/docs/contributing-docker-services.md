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

> **Note**: The secondary entrypoint address, `localhost`/`0.0.0.0`, should not
> be used to reference the registry; use the primary address.

### Setting Yarn and NPM to the Verdaccio Registry

From the root directory of the `create-nom-app` monorepo:

1. Source the `registry.sh` file

    ```sh
    source ./tasks/registry.sh
    ```

2. Print your registry information with

    ```sh
    _printRegistryInformation
    # verdaccio registry: http://172.30.20.18:4873
    #
    # original npm  registry: https://registry.npmjs.org
    # original yarn registry: https://registry.yarnpkg.com
    #
    # current npm   registry: https://registry.npmjs.org
    # current yarn  registry: https://registry.yarnpkg.com
    ```

    > **First Time Users Notice**: If this is your fist time running any
    > `registry.sh` commands, you will want to save your original registries
    > somewhere.

3. Set your package managers registry to Verdaccio.

    ```sh
    useVerdaccioRegistry
    ```

4. When you are finished using the Verdaccio registry, switch back to your
   original registry.

    ```sh
    useOriginalRegistry
    ```

    If your package managers do not set themselves to how they originally were,
    which can be the case when the `registry.sh` file was sourced while
    Verdaccio was the active registry, use the `_setRegistries [npm registry]
    [yarn registry]` command

    ```sh
    _setRegistries https://registry.npmjs.org/ https://registry.yarnpkg
    ```

> When the Verdaccio service is stopped, you will no longer be able to
> interact with any package registry. Remember to switch back to your
> original registries.

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

> **Note:** The only font currently supported for rendering is [Menlo for
> Powerline][MFP-font]. Make sure that your configuration is set correctly and
> that, if you plan on running `render.js` outside of the Docker service, you
> have the Menlo for Powerline font installed locally on your system.
>
> ```yaml
> config:
>   fontFamily: "Menlo for Powerline"
>   ...
> records:
>    ...
> ```

## Docs Docusaurus

Docusaurus builds the documentation.

The `docker-compose.yml` file for Docusaurus is in the `docs/` folder.

Build the documentation with `docker-compose up`.

View the documentation locally at <http://localhost:3000/create-nom-app/>

[MFP-font]: https://github.com/abertsch/Menlo-for-Powerline
