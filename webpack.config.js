const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/main.js',
  devtool: "source-map",
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  }
};