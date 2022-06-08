const path = require('path')
const postcss = require('postcss')
const postcssConfig = require('./postcss.config')
const { transforms } = require('./src/_11ty/index')
const getGoogleFonts = require('./src/_11ty/utils/get-google-fonts')

module.exports = (config) => {
  config.setQuietMode(true)

  config.on('eleventy.before', async () => {
    try {
      await getGoogleFonts()
    } catch (err) {
      console.error(err)
    }
  })

  config.addTemplateFormats('css')
  config.addExtension('css', {
    outputFileExtension: 'css',
    compile: async (inputContent, inputPath) => {
      let parsed = path.parse(inputPath)
      if (parsed.name.startsWith('_')) {
        return
      }

      return async () => {
        let output = await postcss(postcssConfig()).process(inputContent, {
          from: inputPath,
        })

        return output.css
      }
    },
  })

  config.addPassthroughCopy('src/assets/img')
  config.addPassthroughCopy({ 'src/assets/icons': '/' })

  Object.keys(transforms).forEach((transformName) => {
    config.addTransform(transformName, transforms[transformName])
  })

  return {
    pathPrefix: '11ty-base-blog',
    dir: { input: 'src' },
    dataTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    templateFormats: ['njk', 'md'],
  }
}
