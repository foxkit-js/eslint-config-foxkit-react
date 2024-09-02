const reactPlugin = require("eslint-plugin-react");
const reactRules = require("./rules/react");
const preactCompat = require("./rules/preact");
const jsxOverride = require("./overrides/jsx");
const jsxEsmOverride = require("./overrides/jsx-esm");

const config = {
  plugins: ["react", "react-hooks", "jsx-a11y"],
  extends: ["plugin:jsx-a11y/recommended", "plugin:react-hooks/recommended"],
  rules: Object.assign(
    {},
    reactPlugin.configs.recommended.rules,
    reactRules,
    preactCompat
  ),
  overrides: [jsxOverride],
  settings: {
    react: {
      pragma: "h",
      version: "16.0"
    }
  }
};

if (process.env.npm_package_type === "module") {
  config.overrides.push(jsxEsmOverride);
}

module.exports = config;
