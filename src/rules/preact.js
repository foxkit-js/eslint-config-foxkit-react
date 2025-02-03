/**
 * Compatibility ruleset for usage with Preact
 * @type {import("@typescript-eslint/utils").TSESLint.FlatConfig.Rules}
 */
module.exports = {
  "react/no-did-mount-set-state": "error",
  "react/no-did-update-set-state": "error",
  "react/no-find-dom-node": "error",
  "react/no-is-mounted": "error",
  "react/no-string-refs": "error"
};
