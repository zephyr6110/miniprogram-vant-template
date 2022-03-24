module.exports = {
  root: true,
  env: {
    es6: true,
    browser: true,
    node: true
  },
  ecmaFeatures: {
    modules: true
  },
  extends: ['prettier'],
  plugins: ['prettier'],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    semi: ['warn', 'always'],
    quotes: ['warn', 'single']
  },
  globals: {
    wx: true,
    App: true,
    Page: true,
    getCurrentPages: true,
    getApp: true,
    Component: true,
    requirePlugin: true,
    requireMiniProgram: true
  }
};
