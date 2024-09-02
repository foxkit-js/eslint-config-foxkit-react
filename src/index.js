const reactPlugin = require("eslint-plugin-react");
const reactRules = require("./rules/react");
const jsxOverride = require("./overrides/jsx");
const jsxEsmOverride = require("./overrides/jsx-esm");

const config = {
  plugins: ["react", "react-hooks", "jsx-a11y"],
  extends: ["plugin:jsx-a11y/recommended", "plugin:react-hooks/recommended"],
  rules: Object.assign({}, reactPlugin.configs.recommended.rules, reactRules),
  overrides: [jsxOverride],
  settings: {
    react: {
      version: "detect"
    }
  }
};

if (process.env.npm_package_type === "module") {
  config.overrides.push(jsxEsmOverride);
}

module.exports = config;
