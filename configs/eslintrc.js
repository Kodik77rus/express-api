module.exports = {
  'parserOptions': {
    'ecmaVersion': 2020,
  },
  'rules': {
    'indent': [
      'error',
      2,
    ],
    'semi': [
      'error',
      'never',
    ],
    'quotes': [
      'error',
      'single',
    ],
    'max-len': [
      'error',
      {
        'code': 98,
        'ignoreStrings': true,
        'ignoreTemplateLiterals': true,
        'ignoreComments': true,
      },
    ],
    'comma-dangle': [
      'error',
      'always-multiline',
    ],
    'space-in-parens': [
      'error',
      'never',
    ],
    'no-multi-spaces': [
      'error',
    ],
    'object-curly-spacing': [
      'error',
      'always',
    ],
    'array-bracket-spacing': [
      'error',
      'never',
    ],
  },
}