---
id: docker-verdaccio
title: Verdaccio
sidebar_label: Verdaccio
---

[Verdaccio](https://github.com/verdaccio/verdaccio) is a local private npm
registry. It is primarily used to publish local development packages which are,
in turn, used by e2e and integration testing.

UI Entrypoint (primary): [172.30.20.18:4873](http://172.30.20.18:4873)

UI Entrypoint (secondary): [0.0.0.0:4873](http://0.0.0.0:4873)

username: `cna`

password: `local-registry`

> **Note**: The secondary entrypoint address, `localhost`/`0.0.0.0`, should not
> be used to reference the registry; use the primary address.
