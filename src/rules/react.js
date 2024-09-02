/**
 * Base Ruleset for enabling JSX features in eslint-plugin-react and enforcing
 * the correct filename extensions. Does not include their recommended ruleset!
 */
module.exports = {
  "react/jsx-key": "error",
  "react/jsx-no-undef": "error",
  "react/jsx-uses-react": "error",
  "react/jsx-uses-vars": "error",
  "react/prop-types": "off",
  "react/jsx-filename-extension": ["error", { extensions: [".jsx", ".tsx"] }]
};
