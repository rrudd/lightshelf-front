var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');

module.exports = function (env) {
  let prod = env.production;

  let globals = {
    'ENV': !prod ? '"development"' : '"production"',
    'API_URL': !prod ? '"http://localhost:3333/api/"' : '"https://lightshelf-api.herokuapp.com/api/"'
  };

  return {
    context: path.join(__dirname, 'app'),
    entry: {
      index: './main.js'
    },
    output: {
      path: __dirname + '/public',
      filename: 'index.js'
    },
    plugins: [
      new webpack.DefinePlugin(globals),
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
    ].concat(!prod ? [] : [
      new webpack.optimize.UglifyJsPlugin()
    ]),
    devServer: {
      inline: true,
      port: 8080,
      contentBase: "../public"
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react']
          }
        }
      ]
    }
  };
}
