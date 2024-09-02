console.log("Linting with legacy config");

module.exports = {
  extends: ["foxkit", "./src/index.js"],
  overrides: [
    {
      files: ["**/*.ts"],
      parserOptions: {
        project: true,
        tsconfigRootDir: __dirname
      }
    }
  ]
};
