import {resolve} from 'path';
import {Configuration} from "webpack";
import HtmlPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import DotEnvPlugin from 'dotenv-webpack';
import {description} from './package.json';

const isDev = process.env.NODE_ENV !== "production";
const webpackConfig: Configuration = {
	entry: './src/index.tsx',
	devtool: isDev ? 'source-map' : false,
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.(sa|sc|c)ss$/i,
				type: 'asset',
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					"css-loader",
					{
						loader: "sass-loader",
						options: {
							sassOptions: {
								includePaths: [resolve('node_modules')],
								outputStyle: "compressed",
							},
						},
					},
				]
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/i,
				use: [{
					loader: 'file-loader',
				}],
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	output: {
		filename: '[name].js',
		path: resolve(__dirname, 'dist'),
	},
	plugins: [
		new DotEnvPlugin(),
		new HtmlPlugin({
			template: resolve(__dirname, 'public', 'template.html'),
			title: description,
			lang: 'pt-BR'
		}),
		new MiniCssExtractPlugin({
			filename: isDev ? '[name].css' : '[name].[chunkhash].css',
			chunkFilename: isDev ? '[id].css' : '[id].[chunkhash].css',
		})
	],
	optimization: {
		usedExports: true,
		minimize: true,
		minimizer: [new TerserPlugin()],
		splitChunks: {
			cacheGroups: {
				reactVendor: {
					test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom)[\\/]/,
					name: 'vendor.react',
					filename: '[name].[chunkhash].js',
					chunks: 'all',
					reuseExistingChunk: true,
				},
				muiVendor: {
					test: /[\\/]node_modules[\\/](@mui)[\\/]/,
					name: 'vendor.mui',
					filename: '[name].[chunkhash].js',
					chunks: 'all',
					reuseExistingChunk: true,
				}
			}
		}
	}
};

export default webpackConfig;
