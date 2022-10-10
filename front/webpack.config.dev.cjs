const { merge } = require('webpack-merge');
const path = require('path');
const baseConfig = require('./webpack.config.base.cjs');

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'source-map',

  devServer: {
    static: {
      directory: path.resolve(__dirname, 'public'),
    },
    allowedHosts: ['localhost:*'],
    hot: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
  }
});