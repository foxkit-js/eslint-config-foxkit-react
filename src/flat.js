const reactPlugin = require("eslint-plugin-react");
const reactHooksPlugin = require("eslint-plugin-react-hooks");
const jsxA11yPlugin = require("eslint-plugin-jsx-a11y");
const globals = require("globals");
const reactRules = require("./rules/react");
const preactCompat = require("./rules/preact");

const plugins = {
  react: reactPlugin,
  "react-hooks": reactHooksPlugin,
  "jsx-a11y": jsxA11yPlugin
};

module.exports = {
  /**
   * Base Configuration for React developement
   */
  react: {
    plugins,
    rules: Object.assign(
      {},
      reactPlugin.configs.recommended.rules,
      reactHooksPlugin.configs.recommended.rules,
      jsxA11yPlugin.configs.recommended.rules,
      reactRules
    ),
    settings: {
      react: { version: "detect" }
    }
  },
  /**
   * Base Configuration for Preact developement
   */
  preact: {
    plugins,
    rules: Object.assign(
      {},
      reactPlugin.configs.recommended.rules,
      reactHooksPlugin.configs.recommended.rules,
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
   */
  jsx: {
    files: ["**/*.jsx", "**/*.tsx"],
    languageOptions: {
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: Object.assign({}, globals.browser)
    }
  }
};
