const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  devServer: {
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.less/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html'
    })
  ],
  resolve: {
    alias: {
      'appraisejs-root': __dirname,
      'appraisejs-components': path.resolve(__dirname, './src/components'),
      'appraisejs-modules': path.resolve(__dirname, './src/modules'),
      'appraisejs-utils': path.resolve(__dirname, './src/utils')
    }
  }
};
