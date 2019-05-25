# Create Nom App

> The monorepo for Create Nom App

## Testing

### Testing in Docker

To begin, run the services from docker-compose with

```bash
make up
```

**Note:** To see the available `make` commands, type `make help`.

You can now install the development package on your own system when providing
the `--registry` tag:

```bash
npm install --global --registry http://172.30.20.18:4873 create-nom-app
```

### Services

#### Portainer

[Portainer](https://github.com/portainer/portainer) is used to easily monitor
and manage Docker services through a simple web interface.

UI Entrypoint: [172.30.20.20](http://172.30.20.20)

Username: `admin`

Password: `portpass`

#### Verdaccio

[Verdaccio](https://github.com/verdaccio/verdaccio) is a local private npm
registry. It is primarily used to publish local development packages which are,
in turn, used by e2e and integration testing.

UI Entrypoint (primary): [172.30.20.18:4873](http://172.30.20.18:4873)

UI Entrypoint (secondary): [0.0.0.0:4873](http://0.0.0.0:4873)

username: `cna`

password: `local-registry`

#### local_publish

This service builds and publishes all `packages` to the Verdaccio registry.

## License

Licenses are also available within each package.
