var merge = require('webpack-merge')
var common = require('./webpack.common')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')

const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')

const terserPlugin = require('terser-webpack-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')


module.exports = merge(common, {
    entry: path.resolve(__dirname, './src/main.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash:8].js',
        // publicPath: '/dist/'

    },
    mode: "production",
    optimization: {
        minimizer: [
            new terserPlugin({
                cache: true,
                parallel: true,
                // sourceMap: config.build.productionSourceMap,
                terserOptions: {
                    warnings: false,
                    compress: {
                        drop_console: true
                    }
                }
            }),
            new OptimizeCssAssetsWebpackPlugin(),
        ],
        runtimeChunk: {
            name: 'mainfest'
        },
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                vueFramwork: {
                    name: 'vueFramwork',
                    test: (module) => {
                        return /vue|vue-loader|vuex/.test(module.context);
                    },
                    chunks: "initial",
                    priority: 200,
                },
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'initial',
                    priority: 100,
                }
            }
        }
    },
    plugins: [

        new webpack.HashedModuleIdsPlugin(),
        new CleanWebpackPlugin(),

        new MiniCssExtractPlugin({
            filename: '[name].[hash:8].css',
        }),
    ],


    module: {
        rules: [

            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    minimize: true
                }
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    // 'style-loader',
                    // 'cache-loader',
                    MiniCssExtractPlugin.loader,
                    'thread-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(jpg|jpeg|png|svg|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 1024,
                    name: '[name].[hash:8].[ext]'



                }
            },
        ]
    }
})