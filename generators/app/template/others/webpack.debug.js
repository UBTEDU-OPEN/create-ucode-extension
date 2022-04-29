const fs = require('fs');
const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const { sendDebugCommand } = require('./.dev/debug-server');
const { getUCDEXT } = require('./.dev/lib/make-ucdext');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  watch: true,
  plugins: [
    {
      apply: (compiler) => {
        compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {
          let id = '';
          try {
            const manifest = JSON.parse(fs.readFileSync(path.join(__dirname, 'dist/manifest.json')).toString());
            id = manifest.id;
          } catch (e) {
            console.error('获取 manifest id 失败');
          }
          const zip = getUCDEXT();
          sendDebugCommand('rebuild', {
            id,
            content: zip.toBuffer(),
          });
        });
      }
    }
  ]
});
