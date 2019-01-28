const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  devServer: {
    // Redirect all requests to "index.html".
    historyApiFallback: true,
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
      'appraisejs-containers': path.resolve(__dirname, './src/containers'),
      'appraisejs-components': path.resolve(__dirname, './src/components'),
      'appraisejs-proptypes': path.resolve(__dirname, './src/proptypes'),
      'appraisejs-redux': path.resolve(__dirname, './src/redux'),
      'appraisejs-utils': path.resolve(__dirname, './src/utils')
    }
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'appraise.js',
    publicPath: '/'
  }
};
