const { ModuleFederationPlugin } = require('webpack').container

module.exports = {
  entry: './index.js',
  plugins: [
    new ModuleFederationPlugin({
      name: 'LibMFE',
      filename: 'remoteEntry.js',
      exposes: {
        './react': 'react',
        './react-dom': 'react-dom'
      }
    })
  ]
}
