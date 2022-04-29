const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const { writeUCDEXT } = require('./.dev/lib/make-ucdext');
const validateManifest = require('./.dev/validate_manifest');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    {
      apply: (compiler) => {
        compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {
          validateManifest();
          writeUCDEXT();
        });
      }
    }
  ]
});
