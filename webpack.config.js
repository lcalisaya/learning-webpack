const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');

module.exports = {
  entry: {
    hello: './src/hello.js',
    contact: './src/contact.js'
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ["css-loader", "sass-loader"],
          publicPath: '/dist'
        })
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    stats: "errors-only"
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Proyecto Demo',
      // minify: {
      //   collapseWhitespace: true
      // },
      hash: true,
      //filename: './../index.html',
      template: './src/index.ejs',
      excludeChunks: ['contact']
    }),
    new HtmlWebpackPlugin({
      title: 'Contacto',
      hash: true,
      filename: 'contact.html',
      template: './src/contact.html',
      chunks: ['contact']
    }),
    new ExtractTextPlugin({
      filename: "main.css",
      disable: false,
      allChunks: true
    })
  ]
}
