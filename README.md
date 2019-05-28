# Create Nom App

> The monorepo for Create Nom App

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

## License

Licenses are also available within each package.
