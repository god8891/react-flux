var path = require('path');

var config = {
  entry: path.resolve(__dirname, 'js/app.js'),
  output: {
  	publicPath : 'http://localhost:8080/dist/',
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
    	/*{
	      test: /\.jsx?$/,
	      loader : 'jsx-loader'
    	},*/
    	{
	      test: /\.jsx?$/,
	      loader : 'babel-loader',
	      query : {
	      	presets : ['es2015', 'react']
	      }
    	}
    ]
  }
};

module.exports = config;