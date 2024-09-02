# eslint-config-foxkit-react

This package contains opinionated base configs for React/Preact development with ESLint.

See also [eslint-config-foxkit](https://github.com/foxkit-js/eslint-config-foxkit) for our JavaScript/TypeScript base configs.

## Installation

Install with your package manager of choice:

```bash
pnpm add --save-dev eslint-config-foxkit-react eslint@8.57.0 react
```

**Note**: You can also install ESlint v9, but this version may not yet be supported by other Foxkit configs.

## Usage with Flat Configuration System

Add a [Flat Config] in your project like this:

```js
import foxkitReact from "eslint-config-foxkit-react/configs/index.js";

export default [foxkitReact.jsx, foxkitReact.react];
```

You may also add other configs on top, such as [prettier], as well as your own overrides.

### Usage in CommonJS projects

If your project does not set `"type": "module"` in package.json your config will be CommonJS instead (unless explicitly named "eslint.config.mjs"). If this is the case use `require("eslint-config-foxkit/configs")` instead.

```js
const foxkitReact = require("eslint-config-foxkit-react/configs");

module.exports = [foxkitReact.jsx, foxkitReact.react];
```

### Usage with Preact

The base configuration is also available for [Preact], adding a few more rules to ensure compatibilty:

```js
import foxkitReact from "eslint-config-foxkit-react/configs/index.js";

export default [foxkitReact.jsx, foxkitReact.preact];
```

### Usage with other base configurations

Alternatively you can access the rulesets by importing from `eslint-config-foxkit-react/rules`. If you are already using a base config like from your project's framework you may want to add a customized config object with our rules as well as the required plugins like this:

```js
const reactPlugin = require("eslint-plugin-react");
const globals = require("globals");
const reactRules = require("../rules/react");

export default [
  // your other base configs here,
  {
    plugins: { react: reactPlugin },
    rules: { ...reactRules },
    settings: {
      react: { version: "detect" }
    }
  }
  // more configs here as needed
];
```

**Note**: This does not yet configure `eslint-plugin-jsx-a11y` and `eslint-plugin-react-hooks` which are included in our base configuration!

### Usage with new JSX Runtime

If your project uses the new JSX transform from React 17 or a framework that similarly does no longer require `React` to be imported at the top of each file you need to include the `"jsx-runtime"` config of the [eslint-plugin-react] plugin like this:

```js
import reactPlugin from "eslint-plugin-react";
import foxkitReact from "eslint-config-foxkit-react/configs/index.js";

export default [
  foxkitReact.jsx,
  foxkitReact.react,
  reactPlugin.configs["jsx-runtime"]
];
```

## Usage with the Legacy Configuration System

Simply add `"foxkit-react"` (or `"foxkit-react/preact"` if you are using Preact) to your extends array in your `.eslintrc.cjs` file:

```js
module.exports = {
  extends: ["foxkit-react"]
};
```

**Note**: Should you need to add a file extension you will need to adjust jsx override and `"react/jsx-filename-extension"` rule:

```js
const foxkitReactOverrides = require("eslint-config-foxkit-react/legacy/overrides");
const foxkitJSX = foxkitReactOverrides.jsx;
foxkitJSX.files.push("**/*.astro"); // example adding .astro files

module.exports = {
  extends: ["foxkit-react"],
  overrides: [foxkitJSX], // re-insert patched version of the override
  rules: {
    "react/jsx-filename-extension": [
      "error",
      { extensions: [".jsx", ".tsx", ".astro"] }
    ]
  }
};
```

## Note for VSCode

As of right now the [ESLint plugin available for VSCode](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) has experimental support for [Flat Config] hidden behind a setting. In your project simply create a `.vscode` directory with a `settings.json` file with the following content (or add to it if you already have one):

```json
{
  "eslint.experimental.useFlatConfig": true
}
```

This enables the setting on a workspace-level, so when switching between projects the setting remains disabled for projects using the old config system. Also note that the `.mjs` and `.cjs` extensions may not get picked up correctly, so your config file should always be called `eslint.config.js`.

[Preact]: https://preactjs.com/
[eslint-plugin-react]: https://github.com/jsx-eslint/eslint-plugin-react
[Flat Config]: (https://eslint.org/docs/latest/use/configure/configuration-files-new)
[prettier]: (https://www.npmjs.com/package/eslint-config-prettier)
