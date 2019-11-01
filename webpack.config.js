const path = require('path');
var fs = require('fs');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var BUILD_DIR = path.resolve(__dirname, 'build');
var APP_DIR = path.resolve(__dirname, 'src');

module.exports = {
  entry: APP_DIR+'/index.js',
  output: {
	    path: BUILD_DIR,
	    filename: 'bundle.js'
  },
  plugins: [
	    new HtmlWebpackPlugin({
	      template: 'public/index.html'
	    }),
	    new CopyWebpackPlugin([
	    	{ from: 'public/favicon.ico' },
	    	{ from: 'public/ringer.mp3' }
	    ])
  ],
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/, query: {presets: ['es2015', 'react']} },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/, query: {presets: ['es2015', 'react']} },
      { test: /\.css$/, loader: 'style-loader!css-loader'},
      {	test: /\.mp3$/, loader: 'file-loader'},
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader" },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader" }
    ]
  },
  resolve: {
	  extensions: ['.js', '.jsx'],
  },
  devServer: {
	  proxy: {
		  '/api/*': {
			  target: 'https://localhost:3001',
			  pathRewrite: {'^/api' : ''},
			  secure: false
		  }
	  }
  }
};
