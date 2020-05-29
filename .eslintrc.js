module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  rules: {
    'no-undef-init': 0,
    semi: [2, 'always'],
    'no-path-concat': 0,
  },
};
