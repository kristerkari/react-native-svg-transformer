module.exports = [
  {
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "script"
    },
    rules: {
      eqeqeq: ["error", "always", { null: "ignore" }],
      indent: ["error", 2],
      quotes: [
        "error",
        "double",
        { avoidEscape: true, allowTemplateLiterals: true }
      ],
      semi: ["error", "always"],
      "no-console": "warn",
      "no-debugger": "error"
    }
  }
];
