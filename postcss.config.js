module.exports = () => {
  const plugins = [
    require('postcss-import')({ path: 'src/assets/**/*' }),
    require('postcss-preset-env')({ stage: 1 }),
  ]

  return { plugins }
}
