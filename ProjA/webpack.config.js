const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
	mode: 'development',
	entry: './index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.d\.ts$/,
				type: 'asset/source'
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./index.html"
    }),
		// new ModuleFederationPlugin({
    //   name: 'app2',
    //   filename: 'remoteEntry.js',
		// 	remotes: {
		// 		Motor: "Motor@http://localhost:3000/v1.4.3/remoteEntry.js"
		// 	},
    //   shared: {},
    // }),
	],
	devServer: {
		static: {
			directory: path.join(__dirname, 'dist'), // 告诉服务器从哪里提供内容
		},
		compress: true, // 为所有服务启用 gzip 压缩
		port: 3002, // 指定要监听的端口号
	},
};
