---
id: contributing-nom-scripts
title: Contributing to Nom Scripts
sidebar_label: Publishing and Testing
---

Follow this guide and learn how to test your forked
`create-nom-app`/`nom-scripts` package.

#### Summary

- Use one of [these methods](#publishing-nom-scripts) to publish `nom-scripts`.

- Then [install your package](#installing-nom-scripts).

## Publishing `nom-scripts`

> These methods require:
>
>- You are running `make up` command, which runs Verdaccio.
>
>- Your registries for NPM and Yarn are set to Verdaccio.

### Make Command

1. From the root folder of your forked `create-nom-app` repository, run:

   ```sh
   make reup-packages
   ```

### Manually

1. From your forked `packages/nom-scripts` directory, unpublish the current
   `nom-scripts` package from Verdaccio.

   ```sh
   npm unpublish --registry http://172.30.20.18:4873 --force
   ```

2. Build your forked `nom-scripts` package.

   ```sh
   yarn install
   yarn build
   ```

3. Publish `nom-scripts` to Verdaccio.

   ```sh
   npm publish --tag dev --registry http://172.30.20.18:4873 --verbose
   ```

## Installing `nom-scripts`

### Dependency Upgrade

Running `create-nom-app` will install the `nom-scripts` package you just
uploaded.

If you're already in a nom app, run:

```sh
yarn upgrade nom-scripts
```

### Direct Call

From any `create-react-app` directory: where you would normally run `yarn start`,
you can run:

```sh
/forked-repo/packages/nom-scripts/bin/nom-scripts.js [command | start | test | ...]

# example
.../nom-scripts.js start
```

`forked-repo` is the path to your forked repo of `create-nom-app`.
