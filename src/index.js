const reactPlugin = require("eslint-plugin-react");
const reactRules = require("./rules/react");
const overrides = require("./legacy/overrides");

const config = {
  plugins: ["react", "react-hooks", "jsx-a11y"],
  extends: ["plugin:jsx-a11y/recommended", "plugin:react-hooks/recommended"],
  rules: Object.assign({}, reactPlugin.configs.recommended.rules, reactRules),
  overrides: [overrides.jsx],
  settings: {
    react: {
      version: "detect"
    }
  }
};

if (process.env.npm_package_type === "module") {
  config.overrides.push(overrides.jsxEsm);
}

module.exports = config;
