var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/hello.js',
  output: {
    path: __dirname + '/dist',
    filename: 'hello.bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Demo! Lalal',
      minify: {
        collapseWhitespace: true
      },
      hash: true,
      template: './src/index.ejs', // Load a custom template (ejs by default see the FAQ for details)
    })
  ]
}
