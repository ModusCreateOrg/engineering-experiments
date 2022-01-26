const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { ModuleFederationPlugin } = require('webpack').container
const { merge } = require('webpack-merge')

const extensions = ['.jsx', '.js', '.json']
const rootDir = process.cwd()
const srcDir = 'src'
const distDir = 'dist'
const publicDir = 'public'
const indexJs = 'index.js'
const indexHtml = 'index.html'

// Webpack config items
const entry = resolve(rootDir, srcDir, indexJs)
const output = {
  path: resolve(rootDir, distDir),
  clean: true
}
const rules = [
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env', '@babel/preset-react']
      }
    }
  },
  {
    test: /\.css$/i,
    use: ['style-loader', 'css-loader', 'postcss-loader']
  }
]
const plugins = [
  new HtmlWebpackPlugin({
    template: resolve(rootDir, publicDir, indexHtml)
  })
]

const getCommonConfig = mode =>
  merge([
    { mode },
    { entry },
    { output },
    {
      resolve: {
        extensions
      }
    },
    { module: { rules } },
    { plugins }
  ])

const getModuleFederationConfig = moduleFederationOptions =>
  moduleFederationOptions
    ? { plugins: [new ModuleFederationPlugin(moduleFederationOptions)] }
    : {}

const getDevelopmentConfig = ({
  port,
  moduleFederationOptions,
  moreWebpackConfig
}) => {
  const mode = 'development'
  const moduleFederationConfig = getModuleFederationConfig(
    moduleFederationOptions
  )

  return merge(
    getCommonConfig(mode),
    {
      devServer: { port }
    },
    moduleFederationConfig,
    moreWebpackConfig
  )
}

const getProductionConfig = ({
  moduleFederationOptions,
  moreWebpackConfig
}) => {
  const mode = 'production'
  const moduleFederationConfig = getModuleFederationConfig(
    moduleFederationOptions
  )

  return merge(getCommonConfig(mode), moduleFederationConfig, moreWebpackConfig)
}

module.exports = {
  getDevelopmentConfig,
  getProductionConfig
}
