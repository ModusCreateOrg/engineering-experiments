const { ModuleFederationPlugin } = require('webpack').container

module.exports = {
  entry: './index.js',
  plugins: [
    new ModuleFederationPlugin({
      name: 'ContentMFE',
      filename: 'remoteEntry.js',
      exposes: {
        './content': './content/index.json'
      }
    })
  ]
}
