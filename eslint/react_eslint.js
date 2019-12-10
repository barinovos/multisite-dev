module.exports = {
  "extends": [
    "eslint:recommended",
    "./rules/base.js",
    "./rules/best_practices.js",
    "./rules/errors.js",
    "./rules/style.js",
    "./rules/imports.js",
    "./rules/es6.js",
    "./rules/variables.js",
    "./rules/react_jsx.js"
  ],
  "plugins": [
    "react"
  ],
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "env": {
    "es6": true,
    "browser": true,
    "node": true,
    "jquery": true,
    "mocha": true
  },
  "parser": "babel-eslint",
  "rules": {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "space-before-function-paren": ["error", {"anonymous": "always",
      "named": "ignore", "asyncArrow": "always"}],
    "jsx-quotes": ["error", "prefer-double"],
    "react/prop-types": "off",
    "no-bitwise": "off"
  },
  "ecmaFeatures": {
    "arrowFunctions": true,
    "binaryLiterals": true,
    "blockBindings": true,
    "classes": true,
    "defaultParams": true,
    "destructuring": true,
    "forOf": true,
    "generators": true,
    "modules": true,
    "objectLiteralComputedProperties": true,
    "objectLiteralDuplicateProperties": true,
    "objectLiteralShorthandMethods": true,
    "objectLiteralShorthandProperties": true,
    "octalLiterals": true,
    "regexUFlag": true,
    "regexYFlag": true,
    "spread": true,
    "superInFunctions": true,
    "templateStrings": true,
    "unicodeCodePointEscapes": true,
    "globalReturn": true,
    "jsx": true
  },
  "globals": {
    "expect": true
  }
}
