const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'appraise.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' },
      },
      {
        test: /\.(le|c)ss/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.css', '.js', '.jsx', '.json', '.less'],
    alias: {
      'appraisejs-root': __dirname,
      'appraisejs-components': path.resolve(__dirname, 'src/components'),
      'appraisejs-containers': path.resolve(__dirname, 'src/containers'),
      'appraisejs-proptypes': path.resolve(__dirname, 'src/proptypes'),
      'appraisejs-redux': path.resolve(__dirname, 'src/redux'),
      'appraisejs-utils': path.resolve(__dirname, 'src/utils'),
    },
  },
  devServer: { historyApiFallback: true },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),
  ],
};
