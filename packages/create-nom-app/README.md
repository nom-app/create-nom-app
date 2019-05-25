# Node Module Boilerplate

> A modern boilerplate for developing and building Node modules.

[![license](https://badgen.net/badge/license/MIT/blue)](https://github.com/MaximDevoir/node-module-boilerplate)
[![Known
Vulnerabilities](https://snyk.io/test/github/MaximDevoir/node-module-boilerplate/badge.svg)](https://snyk.io/test/github/MaximDevoir/node-module-boilerplate)

## Installation

Begin by cloning the repository

```bash
git clone https://github.com/MaximDevoir/node-module-boilerplate.git my-module

cd my-module

yarn install
```

You can now `yarn run start` and being editing the source at `src/index.js`.

Tests can be added to the `tests` directory. Tests execute by `yarn run test`
when they follow the naming format `*.spec.js`.

## Features

- Webpack V4
- Babel setup to ES9, exporting to UMD.
- ESLint for linting
- Mocha and Chai for testing
- NYC and Istanbul for code coverage, with Coveralls for online coverage
- GitHub Actions for branch pushes and conditional publish to NPM, with separate
  Action for Pull Requests. See `.github/main.workflow` for instructions on
  setting up.
- Probot Stale, see `.github/stale.yml` for installation instruction.

#### GitHub Actions

The workflow file is located at `.github/main.workflow`. To begin using actions,
you must add the following secrets to your GitHub's repository:

* `SNYK_TOKEN` for integration with Snyk's dependency vulnerability detection
  service. Go to your [Snyk Account Settings](https://app.snyk.io/account) to
  retrieve your API token.
* `NPM_AUTH_TOKEN` for automatic **public** publishing to NPM. Visit
  https://www.npmjs.com/settings/USERNAME/tokens to generate a new token with
  `read and publish` access level.
* `COVERALLS_REPO_TOKEN` for code coverage from Coveralls. Get the repo token,
  after syncing Coveralls with your repository, from
  [https://coveralls.io/repos](https://coveralls.io/repos)

#### Probot Stale

Configuration for probot-stale - https://github.com/probot/stale

## Scripts

### Building

Running `yarn run build` will build the module in production mode. Your module
is now ready to be published.

### Coverage

`yarn run coverage` generates a coverage report. You can view the output in the
`coverage/` directory.

### Linting

`yarn run lint` will lint all applicable files in your project. You can run
`yarn run lint:fix` to fix issues that can be fixed automatically.

### Starting

`yarn start` or `yarn run start` will build the application in development mode
and watch for changes in your `src/` directory. Run `yarn run start:once` to
build once and exit.

### Testing

`yarn run test` will execute your tests in `tests/*.spec.js` once. You may also
use `yarn run test:watch` to continue running tests as changes are detected.

## License

[MIT](LICENSE)
