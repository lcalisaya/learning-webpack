const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');
const webpack = require('webpack');
const bootstrapEntryPoints = require('./webpack.bootstrap.config');

const isProd = process.env.NODE_ENV === 'production'; // true o false
const cssDev = ['style-loader','css-loader','sass-loader'];
const cssProd =  ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ["css-loader", "sass-loader"],
          publicPath: '/dist'
});
const cssConfig = isProd ? cssProd : cssDev;
const bootstrapConfig = isProd ? bootstrapEntryPoints.prod : bootstrapEntryPoints.dev;

module.exports = {
  entry: {
    hello: './src/hello.js',
    bootstrap: bootstrapConfig
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: cssConfig
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        include: /\.pug/,
        loader: ['raw-loader', 'pug-html-loader']
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          "file-loader?name=images/[name].[ext]",
          'image-webpack-loader'
        ]
      },
      { test: /\.(woff2?|svg)$/, loader: 'url-loader?limit=10000' },
      { test: /\.(ttf|eot)$/, loader: 'file-loader' }
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
      template: './src/index.html',
      hash: true
    }),
    new ExtractTextPlugin({
      filename: "main.css",
      disable: !isProd,
      allChunks: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
}
