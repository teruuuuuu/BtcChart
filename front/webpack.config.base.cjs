const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    app: './src/Index.tsx'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        // presetは.babelrcに記述
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: "ts-loader",
        options: {
            configFile: 'tsconfig.json'
        }
      },
      
      // {
      //   test: /\.html$/,
      //   loader: "html-loader"
      // },
      // {
      //   enforce: 'pre',
      //   test: /\.(js|jsx|ts|tsx)$/,
      //   exclude: /node_modules/,
      //   loader: 'eslint-loader',
      //   options: {
      //     emitWarning: true,
      //   },
      // },
      // {
      //   test: /\.styl$/,
      //   loader: 'style-loader!css-loader!stylus-loader'
      // },
      {
        test: /\.css$/,
        use: ['style-loader','css-loader',],
      },
      // {
      //   test: /\.(jpg|jpeg|gif|png|ico|ttf|otf|eot|svg|woff|woff2)(\?[a-z0-9]+)?$/,
      //   loader: 'file-loader?name=[path][name].[ext]'
      // }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: '[name].bundle.js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./index_webpack.html"
    }),
  ],
};