const foxkit = require("eslint-config-foxkit/flat");
const prettier = require("eslint-config-prettier");
const foxkitReact = require("./src/configs");

console.log("Linting with Flat config");

module.exports = [
  { ignores: ["dist/**"] },
  {
    files: ["**/*.?(c)js"],
    languageOptions: { sourceType: "commonjs" }
  },
  foxkit.base,
  foxkit.typescript,
  foxkit.configureTS({ tsconfigRootDir: __dirname }),
  foxkitReact.jsx,
  foxkitReact.react,
  prettier
];
