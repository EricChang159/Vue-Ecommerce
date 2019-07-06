const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const webpack = require('webpack')
const path = require('path')

module.exports = merge(common, {
    entry: path.resolve(__dirname, './src/main.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: '/dist/'

    },
    mode: "development",
    module: {
        rules: [{
                test: /\.(sa|sc|c)ss$/,
                use: [
                    'style-loader',
                    'cache-loader',
                    'thread-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {

                test: /\.html$/,
                loader: 'html-loader'

            },
            {
                test: /\.(jpg|jpeg|png|svg|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 1024,
                    name: '[name]-pack.[ext]'

                }
            },
        ]
    },

    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 8080,
        host: '0.0.0.0',
        overlay: {
            errors: true
        },

        hot: true,
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]

})