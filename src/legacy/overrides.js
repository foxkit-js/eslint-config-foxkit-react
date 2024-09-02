module.exports = {
  jsx: {
    files: ["**/*.jsx", "**/*.tsx"],
    env: { browser: true },
    parserOptions: {
      ecmaFeatures: { jsx: true }
    }
  },
  jsxEsm: {
    files: ["**/*.jsx"],
    parserOptions: {
      sourceType: "module"
    }
  }
};
