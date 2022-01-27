const path = require('path')
const runwebpack = require('runwebpack')
const CopyPlugin = require('copy-webpack-plugin')

const moduleFederationOptions = {
  name: 'ContentMFE',
  filename: 'remoteEntry.js',
  exposes: {
    './content': './src/content/content.js'
  }
}

const moreWebpackConfig = {
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public', 'images'),
          to: path.resolve(__dirname, 'dist', 'images')
        }
      ]
    })
  ]
}

runwebpack(moduleFederationOptions, moreWebpackConfig)
