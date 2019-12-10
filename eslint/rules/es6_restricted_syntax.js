module.exports = {
  rules: {
    // Disallow certain syntax for the Aphrodite project. We only support
    // specific ES2015 features to limit the size of the transpiled bundle.
    // http://eslint.org/docs/rules/no-restricted-syntax
    'no-restricted-syntax': ['error',
      'WithStatement',
      'ClassDeclaration',
      'ClassExpression',
      'ClassBody',
      'ForOfStatement',
      'YieldExpression'
    ]
  }
};