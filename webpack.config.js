'use strict';

var webpack       = require('webpack'),
    path          = require('path'),
    autoprefixer  = require('autoprefixer-core'),
    mqpacker = require('css-mqpacker'),
    csswring = require('csswring'),
    commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js', 2);

module.exports = {
  cache: true,
  context: path.join(__dirname, 'demo'),
  entry: {
    app: ['webpack/hot/dev-server', './js/index.jsx'],
    vendor: './vendor.js'
  },
  output: {
    path: path.join(__dirname, process.env.NODE_ENV === 'production' ? './dist' : './build'),
    filename: '[name].bundle.js',
    publicPath: '/build/'
  },
  module: {
    loaders: [
      { test: /\.js$/,        loader: 'jsx' },
      { test: /\.jsx$/,       loader: 'jsx' },
      { test : /\.html$/,     loader: 'html' },
      { test: /\.css$/,       loader: 'style!css' },
      { test: /\.(png|jpg)$/, loader: 'url?limit=8192' },
      { test: /\.scss$/,      loader: 'style!css!postcss!sass?outputStyle=expanded' }
    ]
  },
  postcss: [ autoprefixer({ browsers: ['> 1%', 'IE 7'], cascade: false }),
            mqpacker,
            csswring ],
  externals: {
    'react': 'React'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss']
  },
  plugins: [ commonsPlugin ]
};
