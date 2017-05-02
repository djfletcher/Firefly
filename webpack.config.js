const path = require('path');

module.exports = {
  entry: './js/firefly.js',
  output: {
    path: path.resolve(__dirname, 'js'),
    filename: './bundle.js'
  },
  module: {
    loaders: [
      {
        test: [/\.jsx?$/],
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '*']
  }
};
