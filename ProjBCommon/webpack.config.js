const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;
const CopyPlugin = require('copy-webpack-plugin')

const lubanMotorSource = path.resolve('./node_modules/luban_motor_sdk')

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
		new CopyPlugin({
      patterns: [
        { from: path.resolve(lubanMotorSource, 'Assets'), to: "Assets" },
        { from: path.resolve(lubanMotorSource, 'motorAssets'), to: "motorAssets" },
        { from: path.resolve(lubanMotorSource, 'ThirdParty'), to: "ThirdParty" },
        { from: path.resolve(lubanMotorSource, 'Widgets'), to: "Widgets" },
        { from: path.resolve(lubanMotorSource, 'Workers'), to: "Workers" },
      ],
    }),
		 // To learn more about the usage of this plugin, please visit https://webpack.js.org/plugins/module-federation-plugin/
    new ModuleFederationPlugin({
      name: 'Motor',
      filename: 'remoteEntry.js',
      exposes: {
        './Motor': './index',
      },
      shared: {},
    }),
		
	],
	devServer: {
		static: {
			directory: path.join(__dirname, 'dist'), // 告诉服务器从哪里提供内容
		},
		compress: true, // 为所有服务启用 gzip 压缩
		port: 3001, // 指定要监听的端口号
	},
};
