var webpack = require('webpack');
var path = require('path');

module.exports = {
	entry: [
		path.resolve(__dirname, 'src/js/main.js'),
	],
	output: {
		path: path.resolve(__dirname, '../public/engine'),
		filename: 'gimplab-engine.js',
		publicPath: '/engine/'
	},
	resolve: {
		extensions: ['.js', '.css'],
		alias: {
			Utilities: path.resolve(__dirname, '../node_modules/')
		}
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: { url: false }
					}
				]
			},
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
						plugins: ['@babel/plugin-transform-runtime']
					}
				}
			},
		]
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			"window.jQuery": "jquery"
		}),
		new webpack.DefinePlugin({
			VERSION: JSON.stringify("1.0.0")
		}),
	],
	devtool: "cheap-module-source-map",
};