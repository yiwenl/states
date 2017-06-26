/* eslint comma-dangle: 0 */
const webpack           = require('webpack');
const path              = require('path');
const isDevelopment     = process.env.NODE_ENV === 'development';
const prod 				= !isDevelopment;
const ip                = require('ip');
const serverIp          = ip.address();

function getOutput() {
	if(prod) {
		return path.resolve(__dirname, "lib/" );
	} else {
		return path.resolve(__dirname, "dev/" );
	}
}

const getEntry = () => {
	if(prod) {
		return ['./src/State.js']
	} else {
		return ['./dev/app.js']
	}
}

module.exports = {
	hotPort: 8081,
	cache: isDevelopment,
	debug: isDevelopment,
	entry: {
		app: getEntry()
	},
	stats: {
		cached: false,
		cachedAssets: false,
		chunkModules: false,
		chunks: false,
		colors: true,
		errorDetails: true,
		hash: false,
		progress: true,
		reasons: false,
		timings: true,
		version: false
	},
	output: {
		path: getOutput(),
		filename: prod ? 'State.js' : 'bundle.js',
		publicPath: 'http://localhost:8081/',
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel',
				exclude: /node_modules/,
				query: {
					plugins: ['transform-runtime', 'add-module-exports'],
					presets: ['es2015', 'stage-1']
				}
			}
		]
	},
	plugins: prod ? [
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				screw_ie8: true,
				warnings: false
			}
		})
	] : []
};