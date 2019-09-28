---
id: creating-tests
title: Creating Tests
sidebar_label: Creating Tests
---

The Create Nom App test engine supports Mocha out of the box.

## Filename Conventions

The test engine will load your tests from the `tests` directory. The engine will
detect whether to use the Mocha or Jest runner based on the filename pattern:

* Files with `.spec.js` suffix will run through the Mocha test runner.

* Jest as a test runner is on the [roadmap](https://github.com/create-nom-app/create-nom-app/issues/3).

## Running Tests

You can run tests with the `test` script.

<!--DOCUSAURUS_CODE_TABS-->
<!--yarn-->
```sh
yarn test
```

<!--npm-->
```sh
npm test
```
<!--END_DOCUSAURUS_CODE_TABS-->
