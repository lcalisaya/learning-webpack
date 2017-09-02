var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: './src/hello.js',
  output: {
    path: __dirname + '/dist',
    filename: 'hello.bundle.js'
  },
  module: {
    rules: [{
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ["css-loader", "sass-loader"],
        publicPath: '/dist'
      })
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Demo! Lalal',
      // minify: {
      //   collapseWhitespace: true
      // },
      hash: true,
      template: './src/index.ejs', // Load a custom template (ejs by default see the FAQ for details)
    }),
    new ExtractTextPlugin({
      filename: "main.css",
      disable: false,
      allChunks: true
    })
  ]
}
