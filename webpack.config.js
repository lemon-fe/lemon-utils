
var path = require('path');
var webpack = require('webpack');
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

module.exports = {
  entry: {
    app: path.join(__dirname, "./src/index.js")
  },
  output: {
    path: path.join(__dirname, "./lib/"),
    publicPath: '/',
    filename: 'index.js',
    libraryTarget: 'umd', // 输出格式umd, 支持所有模块格式引入
    umdNamedDefine: true // 是否把模块名作为AMD输出的命名空间
  },
  resolve: {
    alias: {
      '@': './'
    },
    extensions: ['.js', '.json']
  },
  devtool: false,
  module: {
    rules: [
     {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015-loose', 'stage-0'],
          plugins: [['transform-runtime',{ helpers: false, polyfill: false, regenerator: true }], 'transform-decorators-legacy']
        },
        exclude: /node_modules/
      }, {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 1024,
          name: 'img/[name]-[hash:6].[ext]'
        }
      }, {
        test: /\.(woff2?|eot|ttf|otf)$/,
        loader: 'url-loader',
        options: {
          limit: 1024,
          name: 'fonts/[name]-[hash:6].[ext]'
        },
      },
    ]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
      compress: {
        warnings: false,
        collapse_vars: true,
        reduce_vars: true
      }
    })
    // new OptimizeCssAssetsPlugin(), // 优化 CSS（去重/压缩）
  ]
};
