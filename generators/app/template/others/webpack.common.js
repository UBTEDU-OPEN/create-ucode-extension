const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
<%_ if (developFeatures.includes('typescript')) { _%>
  entry: path.join(__dirname, 'src/index.ts'),
<%_ } else { _%>
  entry: path.join(__dirname, 'src/index.js'),
<%_ } _%>
  module: {
    rules: [
      {
        test: /\.(js|ts|jsx|tsx)$/,
        exclude: /node_modules/,
        include: [path.join(__dirname, 'src')],
        use: ['babel-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx'],
    alias: {},
    fallback: {
      stream: require.resolve('stream-browserify'),
      crypto: require.resolve('crypto-browserify'),
      os: require.resolve('os-browserify/browser'),
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'static/manifest.json',
          to: '.',
        },
        {
          from: 'static/logo.svg',
          to: '.',
        },
      ],
    }),
  ],
  externals: {
    '@ubtech/ucode-extension-common-sdk': 'UCodeExtensionCommonSDK',
    react: 'React',
    'react-dom': 'ReactDOM',
  },
};
