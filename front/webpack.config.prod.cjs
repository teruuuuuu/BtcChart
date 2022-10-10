const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.config.base.cjs');

module.exports = merge(baseConfig, {
  mode: 'production',
});