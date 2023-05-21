const path = require('path');

module.exports = {
	entry: {
		home: path.join(__dirname, 'js', 'views', 'Home.jsx'),
		error: path.join(__dirname, 'js', 'views', 'Error.jsx'),
		login: path.join(__dirname, 'js', 'views', 'Login.jsx')
	},
	output: {
		path: path.join(__dirname, 'js', 'dist'),
		filename: '[name].js'
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /(node_modules|server)/,
				use: ['babel-loader']
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			}
		]
	},
	experiments: {
		topLevelAwait: true
	}
};