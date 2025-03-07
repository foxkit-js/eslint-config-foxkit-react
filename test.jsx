// this file exists just so that react linting is actually ran
const React = require("react");

function TestComponent({ name }) {
  React.useEffect(() => {
    console.log(name);
  }, [name]);

  return <p>Hello, {name || "World"}!</p>;
}

module.exports = { TestComponent };
