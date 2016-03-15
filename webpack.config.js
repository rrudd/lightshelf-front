var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');

var DEBUG = !process.argv.production;

var GLOBALS = {
  'ENV': DEBUG ? '"development"' : '"production"',
  'API_URL': '"https://lightshelf-api.herokuapp.com/api/"'
};

module.exports = {
  context: path.join(__dirname, 'app'),
  entry: {
    index: './main.js'
  },
  output: {
    path: './public',
    filename: 'index.js'
  },
  plugins: [
      new webpack.DefinePlugin(GLOBALS),
      new CopyWebpackPlugin([
        {
          from: 'index.html',
          force: true
        },
        {
          from: 'styles/*.css',
          force: true
        },
        {
          from: 'img/*',
          force: true
        }
      ])
  ].concat(DEBUG ? [] : [
          new webpack.optimize.UglifyJsPlugin()
      ]),
  devServer: {
    inline: true,
    port: 8080,
    contentBase: "../public"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
};
