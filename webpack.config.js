const webpack = require('webpack');

const { readdirSync } = require('fs');
const { join, extname, basename } = require('path');

const BUILD_PATH = join(__dirname, '.build');
const joinBuildPath = file => join(BUILD_PATH, file);

const isValidBuildFile = filename => filename[0] !== '.'
  && extname(filename) === ''
  && filename !== 'internal';

const entries = readdirSync(BUILD_PATH).filter(isValidBuildFile).map(joinBuildPath);
const keyedEntries = {};

entries.forEach((entry) => {
  keyedEntries[basename(entry)] = entry;
});

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: {
    ...keyedEntries,
    full: join(__dirname, '.build', 'index.js'),
  },
  output: {
    library: 'brewjs',
    path: join(__dirname, 'dist'),
    filename: '[name]/index.min.js',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new webpack.BannerPlugin('foobar'),
  ],
};
