const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',

  mode: 'production',

  output: {
    path: `${__dirname}/build`,
    filename: 'bundle.js',
  },

  externals: {
    electron: 'require("electron")',
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html',
    }),
  ],

  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
      },
    }],
  },
};
