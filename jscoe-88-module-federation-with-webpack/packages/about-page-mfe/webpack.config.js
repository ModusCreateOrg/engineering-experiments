const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')

module.exports = env => {
  const mode = env.production ? 'production' : 'development'

  return {
    mode,
    entry: path.join(__dirname, 'src', 'index.js'),
    devServer: {
      port: 8085
    },
    resolve: {
      extensions: ['.jsx', '.js', '.json']
    },
    module: {
      rules: [
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
    },
    plugins: [
      new ModuleFederationPlugin({
        name: 'AboutPageMFE',
        filename: 'remoteEntry.js',
        exposes: {
          './AboutPage': './src/components/AboutPage/AboutPage'
        },
        remotes: {
          LibMFE: 'LibMFE@http://localhost:8081/remoteEntry.js',
          ContentMFE: 'ContentMFE@http://localhost:8083/remoteEntry.js'
        }
      }),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'public', 'index.html')
      })
    ]
  }
}
