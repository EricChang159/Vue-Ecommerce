const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
var SpeedMeasurePlugin = require("speed-measure-webpack-plugin")
const webpack = require('webpack')
var smp = new SpeedMeasurePlugin()


module.exports = smp.wrap({
    plugins: [
        new HtmlWebpackPlugin(),
        new VueLoaderPlugin(),
        new webpack.ProvidePlugin({
            jQuery: "jquery",
            $: "jquery",
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default'],
        })
    ],
    module: {
        rules: [{
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    'cache-loader',
                    'thread-loader',
                    {
                        loader: 'babel-loader',

                    }
                ]

            },
            {
                test: /\.vue$/,
                use: [
                    'cache-loader',
                    'thread-loader',
                    'vue-loader'
                ],

            },


        ]
    },

})