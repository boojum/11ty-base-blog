const path = require('path')
const { download, constructURL } = require('google-fonts-helper')

// TODO: generalize! take in families, subsets, stylePath etc etc

module.exports = async () => {
  try {
    const url = constructURL({
      families: { 'Open Sans': [300] },
      display: 'swap',
      subsets: ['latin'],
    })

    const downloader = download(url, {
      overwriting: true,
      outputDir: './_site',
      stylePath: path.resolve(__dirname, '../../../src/assets/css/_fonts.css'),
      fontsDir: path.resolve(__dirname, '../../../_site/assets/fonts'),
      fontsPath: '../fonts',
    })

    await downloader.execute()
  } catch (err) {
    console.error(`Google Fonts: Error!\n${err}`)
  }
}
