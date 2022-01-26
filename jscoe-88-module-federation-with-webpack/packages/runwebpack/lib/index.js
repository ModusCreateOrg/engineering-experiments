const cmdLineParser = require('command-line-args')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

const { getDevelopmentConfig, getProductionConfig } = require('./config_maker')

const cmdLineOptions = cmdLineParser([
  {
    name: 'mode',
    alias: 'm',
    type: String
  },
  {
    name: 'port',
    alias: 'p',
    type: Number
  }
])

const runwebpack = (moduleFederationOptions, moreWebpackConfig = {}) => {
  const { mode, port = 8070 } = cmdLineOptions

  switch (mode) {
    case 'development': {
      const config = getDevelopmentConfig({
        port,
        moduleFederationOptions,
        moreWebpackConfig
      })

      const devServerOptions = { ...config.devServer, open: true }
      const compiler = webpack(config)
      const server = new WebpackDevServer(devServerOptions, compiler)
      const runServer = async () => {
        console.log(`Starting the dev server at ${port}...`)
        await server.start()
      }
      runServer()
      return
    }

    case 'production': {
      const config = getProductionConfig({
        moduleFederationOptions,
        moreWebpackConfig
      })

      const compiler = webpack(config)

      compiler.run(() => {
        console.log('Production build completed....')
      })
    }

    default:
      break
  }
}

module.exports = runwebpack
