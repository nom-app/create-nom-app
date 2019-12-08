module.exports = {
  "root": true,
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": __dirname + "/tsconfig.lint.json",
    "sourceType": "module",
    "ecmaVersion": 2018
  },
  "plugins": ["@typescript-eslint"],
  "extends": [
    "eslint:recommended", // Uses the set of rules recommended by the ESLint Team
    "plugin:@typescript-eslint/eslint-recommended", // Uses @typescript-eslint/eslint-plugin to adjust the rules set by `eslint:recommended` that are not compatible with TypeScript
    "plugin:@typescript-eslint/recommended", // Uses the recommended rules from @typescript-eslint/eslint-plugin
    "prettier/@typescript-eslint", // Uses eslint-config-prettier to disable rules that are unnecessary or might conflict with Prettier
    "plugin:prettier/recommended" // Enables both eslint-plugin-prettier and extends the rules from eslint-config-prettier. Will report Prettier errors to ESLint.
    // Only special rules should be added after `plugin:prettier/recommended`.
    // See the list of special rules:
    //   - https://github.com/prettier/eslint-config-prettier/blob/dcca556e260af985ece4d9af92531fa649268f80/README.md#special-rules
  ],
  "env": {
    "node": true
  }
}
