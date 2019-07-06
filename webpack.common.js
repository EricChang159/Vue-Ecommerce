const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
var SpeedMeasurePlugin = require("speed-measure-webpack-plugin")
var smp = new SpeedMeasurePlugin()


module.exports = smp.wrap({
    plugins: [
        new HtmlWebpackPlugin(),
        new VueLoaderPlugin()
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