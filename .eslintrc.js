module.exports = {
  root: true,
  env: {
    node: true,
    es6: true
  },
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:prettier/recommended"
  ],
  ignorePatterns: [ "node_modules/*" ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    parser: "babel-eslint",
  },
  rules: {
    "prettier/prettier": process.env.NODE_ENV === "production" ? "error" : "warn",
    "no-unused-vars": process.env.NODE_ENV === "production" ? "error" : "warn",
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off"
  },
  overrides: [
    {
      files: [
        "**/tests/**/*.test.{j,t}s?(x)"
      ],
      env: {
        mocha: true
      }
    }
  ]
};
