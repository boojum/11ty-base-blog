module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  parserOptions: {
    ecmaFeatures: {
      impliedStrict: true,
    },
  },
  extends: ['eslint:recommended', 'prettier'],
}
