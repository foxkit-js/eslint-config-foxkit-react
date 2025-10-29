// @ts-check
const reactPlugin = require("eslint-plugin-react");
// @ts-ignore
const reactHooksPlugin = require("eslint-plugin-react-hooks");
// @ts-ignore
const jsxA11yPlugin = require("eslint-plugin-jsx-a11y");
const globals = require("globals");
const reactRules = require("./rules/react");
const preactCompat = require("./rules/preact");

/**
 * @type {import('@typescript-eslint/utils').TSESLint.FlatConfig.Config["plugins"]}
 */
const plugins = {
  react: reactPlugin,
  // @ts-ignore
  "react-hooks": reactHooksPlugin,
  "jsx-a11y": jsxA11yPlugin
};

module.exports = {
  /**
   * Base Configuration for React developement
   * @type {import('@typescript-eslint/utils').TSESLint.FlatConfig.Config}
   */
  react: {
    name: "@foxkit/react",
    plugins,
    rules: Object.assign(
      {},
      reactPlugin.configs.recommended.rules,
      reactHooksPlugin.configs.flat.recommended.rules,
      jsxA11yPlugin.configs.recommended.rules,
      reactRules
    ),
    settings: {
      react: { version: "detect" }
    }
  },
  /**
   * Base Configuration for Preact developement
   * @type {import('@typescript-eslint/utils').TSESLint.FlatConfig.Config}
   */
  preact: {
    name: "@foxkit/preact",
    plugins,
    rules: Object.assign(
      {},
      reactPlugin.configs.recommended.rules,
      reactHooksPlugin.configs.flat.recommended.rules,
      jsxA11yPlugin.configs.recommended.rules,
      reactRules,
      preactCompat
    ),
    settings: {
      react: { pragma: "h", version: "16.0" }
    }
  },
  /**
   * Configuration for enabling JSX features in ESLint
   * @type {import('@typescript-eslint/utils').TSESLint.FlatConfig.Config}
   */
  jsx: {
    name: "@foxkit/jsx",
    files: ["**/*.jsx", "**/*.tsx"],
    languageOptions: {
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: Object.assign({}, globals.browser)
    }
  }
};
