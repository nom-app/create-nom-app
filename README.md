# Create Nom App

> The monorepo for Create Nom App.

[![license](https://badgen.net/badge/license/MIT/blue)](https://www.npmjs.com/package/create-nom-app)
[![Deploy Docs](https://github.com/MaximDevoir/create-nom-app/workflows/Deploy%20Docs/badge.svg)](https://github.com/MaximDevoir/create-nom-app)

Get started with your first Nom app now. Visit the [Getting
Started](https://maximdevoir.github.io/create-nom-app/) page.

## Docker

### Testing in Docker

To begin, run the services from docker-compose with

```bash
make up
```

**Note:** To see the available `make` commands, type `make help`.

You can now install the development package on your own system when providing
the `--registry` tag:

```bash
npm install --global --registry http://172.30.20.18:4873 create-nom-app@dev
```

**Note on Verdaccio Packages:** Packages published to Verdaccio are on the `dev`
tag.

### Running the Docs Locally

> To view the documentation online, visit
> <https://maximdevoir.github.io/create-nom-app/>.

Run `make docs-local` and visit <http://localhost:3000/create-nom-app/>.

## Deployments

## License

Licenses are also available within each package.
