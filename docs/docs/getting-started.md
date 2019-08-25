---
id: getting-started
title: Getting Started
---

Create Nom App is a zero-config tool to develop, test, and build Node modules.

![cna-create-project](https://user-images.githubusercontent.com/10104630/61597124-1a500380-abc1-11e9-9446-b382301bb9af.gif)

## Quick Start

You can run Create Nom App with any of `npm`, `yarn`, or `npx`.

<!--DOCUSAURUS_CODE_TABS-->
<!--npx-->
```sh
npx create-nom-app hello-world
```

<!--yarn-->
```sh
yarn create nom-app hello-world
```

<!--npm-->
```sh
npm init nom-app hello-world
```

<!--END_DOCUSAURUS_CODE_TABS-->

## Structure

```none
hello-world
├── .gitignore
├── .npmignore
├── package.json
├── README.md
├── node_modules
├── src
│   └── index.js
└── tests
    └── index.spec.js
```

## Scripts

### Start

Builds your app in development mode. You will be reported of any errors with your code.

<!--DOCUSAURUS_CODE_TABS-->
<!--yarn-->
```sh
yarn start
```

<!--npm-->
```sh
npm start
```
<!--END_DOCUSAURUS_CODE_TABS-->

### Test

Runs unit tests.

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

### Build

Builds your app for use in production environments.

<!--DOCUSAURUS_CODE_TABS-->
<!--yarn-->
```sh
yarn build
```

<!--npm-->
```sh
npm run build
```
<!--END_DOCUSAURUS_CODE_TABS-->
