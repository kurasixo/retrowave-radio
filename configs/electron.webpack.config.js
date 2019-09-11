module.exports = {
  entry: './src/electron-app/main.js',

  mode: 'production',

  output: {
    path: `${__dirname}/../build`,
    filename: 'electron-app.js',
  },

  node: {
    __dirname: false,
    __filename: false,
  },

  externals: {
    electron: 'require("electron")',
  },

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
