// Replica of neostandard's base configuration
// (https://github.com/neostandard/neostandard/blob/main/lib/configs/base.js).
//
// The neostandard package itself does not support ESLint 10 yet (its peer
// dependency is eslint ^9.0.0), so its popular "standard" rule set is
// replicated here using ESLint 10-compatible packages
// (eslint-plugin-n, eslint-plugin-promise, globals).
//
// Once neostandard adds ESLint 10 support, this file can be replaced with
// `require("neostandard")({ semi: true, noStyle: true })`.
const globals = require("globals");
const node = require("eslint-plugin-n");
const promise = require("eslint-plugin-promise");

module.exports = {
  name: "neostandard/base",
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: "script",
    globals: {
      ...globals.es2022,
      ...globals.node
    }
  },
  plugins: {
    n: node,
    promise
  },
  rules: {
    "no-var": "warn",
    "object-shorthand": ["warn", "properties"],
    "accessor-pairs": [
      "error",
      { setWithoutGet: true, enforceForClassMembers: true }
    ],
    "array-callback-return": [
      "error",
      { allowImplicit: false, checkForEach: false }
    ],
    camelcase: [
      "error",
      { allow: ["^UNSAFE_"], properties: "never", ignoreGlobals: true }
    ],
    "constructor-super": "error",
    curly: ["error", "multi-line"],
    "default-case-last": "error",
    "dot-notation": ["error", { allowKeywords: true }],
    eqeqeq: ["error", "always", { null: "ignore" }],
    "new-cap": ["error", { newIsCap: true, capIsNew: false, properties: true }],
    "no-array-constructor": "error",
    "no-async-promise-executor": "error",
    "no-caller": "error",
    "no-case-declarations": "error",
    "no-class-assign": "error",
    "no-compare-neg-zero": "error",
    "no-cond-assign": "error",
    "no-const-assign": "error",
    "no-constant-condition": ["error", { checkLoops: false }],
    "no-control-regex": "error",
    "no-debugger": "error",
    "no-delete-var": "error",
    "no-dupe-args": "error",
    "no-dupe-class-members": "error",
    "no-dupe-keys": "error",
    "no-duplicate-case": "error",
    "no-useless-backreference": "error",
    "no-empty": ["error", { allowEmptyCatch: true }],
    "no-empty-character-class": "error",
    "no-empty-pattern": "error",
    "no-eval": "error",
    "no-ex-assign": "error",
    "no-extend-native": "error",
    "no-extra-bind": "error",
    "no-extra-boolean-cast": "error",
    "no-fallthrough": "error",
    "no-func-assign": "error",
    "no-global-assign": "error",
    "no-implied-eval": "error",
    "no-import-assign": "error",
    "no-invalid-regexp": "error",
    "no-irregular-whitespace": "error",
    "no-iterator": "error",
    "no-labels": ["error", { allowLoop: false, allowSwitch: false }],
    "no-lone-blocks": "error",
    "no-loss-of-precision": "error",
    "no-misleading-character-class": "error",
    "no-prototype-builtins": "error",
    "no-useless-catch": "error",
    "no-multi-str": "error",
    "no-new": "error",
    "no-new-func": "error",
    "no-object-constructor": "error",
    "no-new-native-nonconstructor": "error",
    "no-new-wrappers": "error",
    "no-obj-calls": "error",
    "no-octal": "error",
    "no-octal-escape": "error",
    "no-proto": "error",
    "no-redeclare": ["error", { builtinGlobals: false }],
    "no-regex-spaces": "error",
    "no-return-assign": ["error", "except-parens"],
    "no-self-assign": ["error", { props: true }],
    "no-self-compare": "error",
    "no-sequences": "error",
    "no-shadow-restricted-names": "error",
    "no-sparse-arrays": "error",
    "no-template-curly-in-string": "error",
    "no-this-before-super": "error",
    "no-throw-literal": "error",
    "no-undef": "error",
    "no-undef-init": "error",
    "no-unexpected-multiline": "error",
    "no-unmodified-loop-condition": "error",
    "no-unneeded-ternary": ["error", { defaultAssignment: false }],
    "no-unreachable": "error",
    "no-unreachable-loop": "error",
    "no-unsafe-finally": "error",
    "no-unsafe-negation": "error",
    "no-unused-expressions": [
      "error",
      {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: true
      }
    ],
    "no-unused-vars": [
      "error",
      {
        args: "none",
        caughtErrors: "none",
        ignoreRestSiblings: true,
        vars: "all"
      }
    ],
    "no-use-before-define": [
      "error",
      { functions: false, classes: false, variables: false }
    ],
    "no-useless-call": "error",
    "no-useless-computed-key": "error",
    "no-useless-constructor": "error",
    "no-useless-escape": "error",
    "no-useless-rename": "error",
    "no-useless-return": "error",
    "no-void": "error",
    "no-with": "error",
    "one-var": ["error", { initialized: "never" }],
    "prefer-const": ["error", { destructuring: "all" }],
    "prefer-promise-reject-errors": "error",
    "prefer-regex-literals": ["error", { disallowRedundantWrapping: true }],
    "symbol-description": "error",
    "unicode-bom": ["error", "never"],
    "use-isnan": [
      "error",
      { enforceForSwitchCase: true, enforceForIndexOf: true }
    ],
    "valid-typeof": ["error", { requireStringLiterals: true }],
    yoda: ["error", "never"],
    "n/handle-callback-err": ["error", "^(err|error)$"],
    "n/no-callback-literal": "error",
    "n/no-deprecated-api": "error",
    "n/no-exports-assign": "error",
    "n/no-new-require": "error",
    "n/no-path-concat": "error",
    "n/process-exit-as-throw": "error",
    "promise/param-names": "error",
    "no-console": "warn"
  }
};
