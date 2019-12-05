const webpack = require('webpack');

const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


module.exports = {
    entry: path.join(__dirname, 'src/index.js'),

    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },

    resolve: {
        extensions: [".js"]
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, 'src/index.html')
        }),
		
		 new MiniCssExtractPlugin({
            filename: 'css/main.css'
            }
        ),
    ],
	
	optimization: {
        minimizer: [new UglifyJsPlugin()],
    },

    module: {
        rules: [
            {
                test: /.js?$/,
                exclude: /node_modules/,
                include: path.join(__dirname, 'src'),
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015']
                        }
                    }
                ]
            },

            {
                test: /\.(jpe?g|ico|png|gif|svg)$/i,
                loader: 'file-loader?name=img/[name].[ext]'
            },
			
			{
                test: /\.s[ac]ss$/i,
                use: [
                  // Creates `style` nodes from JS strings
                  'style-loader',
                  // Translates CSS into CommonJS
                  'css-loader',
                  // Compiles Sass to CSS
                  'sass-loader',
                ],
            },
			
			{
				test: /\.(sa|sc|c)ss$/,
                use: [
                  {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        hmr: process.env.NODE_ENV === 'development',
                    },
                  },
                  'css-loader',
                  'sass-loader',
                ],
			},
        ]
    },

    devServer: {
        publicPath: "/",
        contentBase: "./dist"
    }
};