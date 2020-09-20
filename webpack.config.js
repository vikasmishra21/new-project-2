const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin')

module.exports = (env, options) => {

	let dev = options.mode === 'development';
	let prod = options.mode === 'production';

	return {
		name: 'Transpiler',
		entry: {"./prod/index": "./src/index"},
		output: {filename: '[name].js', path: __dirname},
		resolve: {
			modules: ['node_modules']
		},
		optimization: {
			minimizer: [
				new TerserPlugin({
					terserOptions: {
						ecma: undefined,
						warnings: false,
						parse: {},
						compress: {},
						mangle: false, // Note `mangle.properties` is `false` by default.
						module: false,
						output: null,
						toplevel: false,
						nameCache: null,
						ie8: false,
						keep_classnames: true,
						keep_fnames: false,
						safari10: false,
					},
				}),
			],
		},
		plugins: [
			new MiniCssExtractPlugin({filename: '[name].css'}),
		],
		devtool: 'source-map',
		module: {
			rules: [
				{
					test: /\.js$/,
					use: [
						{loader: 'webpack-import-glob-loader'},
						{loader: 'babel-loader'}
					]
				},
				{
					test: /\.(html)$/,
					use: "html-loader"
				},
				{
					test: /\.twig$/,
					use: "twig-loader"
				},
				{
					test: /\.less$/,
					use: [
						{loader: MiniCssExtractPlugin.loader, options: {}},
						{loader: "css-loader", options: {url: false, minimize: true}},
						{loader: "postcss-loader"},
						{loader: "less-loader", options: {relativeUrls: false}}
					]
				},
				{
					test: /\.scss/,
					use: [
						{loader: MiniCssExtractPlugin.loader, options: {}},
						{loader: "css-loader", options: {url: false, minimize: true}},
						{loader: "postcss-loader"},
						{loader: "sass-loader", options: {}}
					]
				},
				{
					test: /\.css$/,
					use: [
						{loader: MiniCssExtractPlugin.loader, options: {}},
						{loader: "css-loader", options: {url: false, minimize: true}},
						{loader: "postcss-loader"}
					]
				}
			]
		}
	}
};
