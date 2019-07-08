# Nom Scripts

TODO: Sort stuff

## Installing Dependencies and DevDependencies [DEPRECATED]

> **notice**: Packages shared in production and development are marked as
> `dependencies`.

The difference between `dependencies` and `devDependencies`.

A package required by `nom-scripts` may be used in both the production build and
in development mode. IE: `webpack` is required to build the `nom-scripts`
package and to build projects run via `nom-scripts start` from any
`create-nom-app` project.

DevDependencies aliased should be prefixed with `ns-dev-`. For `webpack`, use

```sh
# For the nom-scripts build use
yarn add -D webpack

# For development use
yarn add ns-dev-webpack@npm:webpack@^4.35.2
```

Learn about aliasing from [Yarn's
documentation](https://yarnpkg.com/lang/en/docs/cli/add/#toc-yarn-add-alias).

When using `require` or `import` statements, remember to use the correct
package.

Not all modules can be aliased. This might be because other modules depend on a
hard-coded package name. Example: `webpack` requires `webpack-cli`, thus
