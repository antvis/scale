module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: ['airbnb-base', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'import'],
  rules: {
    semi: 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['off'],
    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': ['error'],
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'object-curly-newline': 'off',
    'class-methods-use-this': 'off',
    'no-shadow': 'off',
    'no-console': 'off',
    'arrow-body-style': 'off',
    'no-useless-constructor': 'off',
    'no-nested-ternary': 'off',
    'no-param-reassign': 'off',
    'func-names': ['error', 'never'],
    'no-else-return': 'off',
    'no-restricted-syntax': 'off',
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
};
