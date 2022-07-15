import {resolve} from 'path';
import {Configuration} from "webpack";
import HtmlPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import {description} from './package.json'

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
			}
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
		new HtmlPlugin({
			template: resolve(__dirname, 'public', 'template.html'),
			title: description,
			lang: 'pt-BR'
		}),
		new MiniCssExtractPlugin({
			filename: isDev ? '[name].css' : '[name].[hash].css',
			chunkFilename: isDev ? '[id].css' : '[id].[hash].css',
		})
	],
	optimization: {
		splitChunks: {
			cacheGroups: {
				reactVendor: {
					test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom)[\\/]/,
					name: 'vendor.react',
					filename: '[name].[hash].js',
					chunks: 'all',
				},
				muiVendor: {
					test: /[\\/]node_modules[\\/](@mui)[\\/]/,
					name: 'vendor.mui',
					filename: '[name].[hash].js',
					chunks: 'all',
				}
			}
		}
	}
};

export default webpackConfig;
