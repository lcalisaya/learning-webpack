const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/hello.js',
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: 'hello.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        include: /\.pug/,
        loader: ['raw-loader', 'pug-html-loader']
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    stats: "errors-only",
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Proyecto Demo',
      template: './src/index.pug',
      hash: true
    }),
    new ExtractTextPlugin({
      filename: "main.css",
      disable: true,
      allChunks: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
}
