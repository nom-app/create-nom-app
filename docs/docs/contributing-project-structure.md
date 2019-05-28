---
id: contributing-project-structure
title: Create Nom App's Structure
sidebar_label: Structure
---

```none
Create Nom App
├── docker-compose.yml
├── Makefile # Run `make help` too see available commands
├── README.md
├── docs
│   ├── ...
├── packages
│   ├── create-nom-app
│   ├── nom-scripts
├── services # Services used by Docker and Docker Compose
│   ├── local-publish # Publishes `packages/` to Verdaccio local registry.
│   │   └── ...
│   └── verdaccio # A local NPM registry
│       └── ...
└── tasks # Scripts related to running Docker services
    ├── check-registry-config.sh
    └── install-packages.sh

```
