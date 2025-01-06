// this file exists just so that react linting is actually ran
const React = require("react");

function TestComponent({ name }) {
  return <p>Hello, {name || "World"}!</p>;
}

module.exports = { TestComponent };
