const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { ModuleFederationPlugin } = require('webpack').container
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  devServer: {
    port: 8080
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
      name: 'BaseApp',
      remotes: {
        LibMFE: 'LibMFE@http://localhost:8081/remoteEntry.js',
        HomePageMFE: 'HomePageMFE@http://localhost:8082/remoteEntry.js',
        ContentMFE: 'ContentMFE@http://localhost:8083/remoteEntry.js',
        ContactPageMFE: 'ContactPageMFE@http://localhost:8084/remoteEntry.js',
        AboutPageMFE: 'AboutPageMFE@http://localhost:8085/remoteEntry.js'
      }
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html')
    }),
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
