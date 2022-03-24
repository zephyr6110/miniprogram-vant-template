module.exports = {
  semi: true,
  singleQuote: true,
  trailingComma: 'none',
  bracketSpacing: true,
  jsxBracketSameLine: true,
  endOfLine: 'auto',
  arrowParens: 'always',
  overrides: [
    // 使用css/html的规则格式化wxss/wxml
    {
      files: '*.wxss',
      options: {
        parser: 'css'
      }
    },
    {
      files: '*.wxml',
      options: {
        parser: 'html'
      }
    }
  ]
};
