const path = require('path');
const exec = require( 'child_process' ).execSync;
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const buildDir = path.resolve('./build/');
const NODE_ENV = process.env.NODE_ENV;

const option = {
  entry: {
    'app': './source/js/app.js',
  },
  output: {
    path: buildDir,
    publicPath: '/static/',
    filename: '[name].js',
    sourceMapFilename: '[name].js.map',
    chunkFilename: '[id].chunk.js'
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },{
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: "style-loader",
          loader: "css-loader!sass-loader",
        }),
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({ 'NODE_ENV': JSON.stringify(NODE_ENV) }),
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify(NODE_ENV) }}),
    new webpack.optimize.CommonsChunkPlugin({ name: 'common', filename: 'common.js'}),
    new ExtractTextPlugin({
      filename: 'app.css',
      allChunks: true
    }),
  ]
};

if (NODE_ENV !== 'production') {
  option.watchOptions = {
    aggregateTimeout: 300,
    poll: 1000,
    ignored: /node_modules/
  };
  option.devtool = 'eval';
} else {
  option.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true,
        unsafe: true,
      },
      comments: false,
      sourceMap: false,
      mangle: true,
      minimize: true
    })
  );
}

module.exports = option;
