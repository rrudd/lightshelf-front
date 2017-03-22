var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');

var PROD = process.argv[2].indexOf('p') > -1;

var GLOBALS = {
  'ENV': !PROD ? '"development"' : '"production"',
  'API_URL': !PROD ? '"http://localhost:3333/api/"' : '"https://lightshelf-api.herokuapp.com/api/"'
};

module.exports = {
  context: path.join(__dirname, 'app'),
  entry: {
    index: './main.js'
  },
  output: {
    path: __dirname + '/public',
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
  ].concat(!PROD ? [] : [
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
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
};
