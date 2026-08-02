const neostandardReplica = require("./neostandard-replica.cjs");
const stylistic = require("@stylistic/eslint-plugin");

module.exports = [
  neostandardReplica,
  {
    name: "project/style",
    plugins: {
      "@stylistic": stylistic
    },
    rules: {
      "@stylistic/indent": ["error", 2],
      "@stylistic/quotes": [
        "error",
        "double",
        { avoidEscape: true, allowTemplateLiterals: "always" }
      ],
      "@stylistic/semi": ["error", "always"]
    }
  }
];
