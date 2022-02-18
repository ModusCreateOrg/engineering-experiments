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
      loader: require.resolve('babel-loader'),
      options: {
        presets: [
          require.resolve('@babel/preset-env'),
          require.resolve('@babel/preset-react')
        ]
      }
    }
  },
  {
    test: /\.css$/i,
    use: [
      require.resolve('style-loader'),
      require.resolve('css-loader'),
      {
        loader: require.resolve('postcss-loader'),
        options: {
          postcssOptions: {
            plugins: [require('postcss-nested'), require('autoprefixer')]
          }
        }
      }
    ]
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
      devServer: {
        port,
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      }
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
