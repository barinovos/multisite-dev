module.exports = {
  rules: {
    // Require semicolon insertion.
    'semi': ['error', 'always'],
    // Require {} for every new block or scope.
    'curly': ['error', 'all'],
    // Require triple equals i.e. `===`. Do not tolerate use of `== null`.
    'eqeqeq': ['error', 'always', {'null': 'always'}],
    // Tolerate use of `eval`.
    'no-eval': 'error',
    // Generates way too many warnings
    'no-unused-vars': 'off',
    // Require camelcase. Not too useful.
    'camelcase': 'off',
    // Require immediate invocations to be wrapped in parens
    // e.g. `( function(){}() );`
    'wrap-iife': ['error', 'any'],
    // Require `use strict` pragma in every file.
    'strict': ['error', 'function'],
    // Prohibit variable use before definition.
    'no-use-before-define': ['error', {'functions': false}],
    // Allows re-define variables later in code e.g. `var x=1; x=2;`.
    'no-redeclare': ['error', {'builtinGlobals': true}],
    // Require all non-global variables be declared before they are used.
    'no-undef': 'error'
  }
};