---
id: creating-tests
title: Creating Tests
sidebar_label: Creating Tests
---

> The test engine currently supports Mocha as a test runner. Support for Jest as
> a test runner is on the [v1.0.0
> roadmap](https://github.com/MaximDevoir/create-nom-app/issues/3).

## Filename Conventions

The test engine will load your tests from the `tests` directory. The engine will
detect whether to use the Mocha or Jest runner based on the filename pattern:

* Files with `.spec.js` suffix will run through the Mocha test runner.
* Files with `.test.js` suffix will run through the Jest test runner.

You can now use Mocha for it's powerful Assert library and Jest for it's
powerful snapshot testing tools.
