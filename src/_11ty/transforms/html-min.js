const htmlmin = require('html-minifier')

module.exports = (content, outputPath) => {
  if (outputPath && outputPath.endsWith('.html')) {
    const minified = htmlmin.minify(content, {
      collapseInlineTagWhitespace: false,
      collapseWhitespace: true,
      removeComments: true,
      sortClassName: true,
      useShortDoctype: true,
    })
    return minified
  }
  return content
}
