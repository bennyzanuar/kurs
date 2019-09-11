const path = require('path');
const webpack = require("webpack");
const merge = require("webpack-merge");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const baseConfig = require('./webpack.base.js')

const config = {
    entry: './src/client/client.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js',
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            })
        ],
        splitChunks: {
            cacheGroups: {
                default: false,
                vendors: false,
                vendor: {
                    name: 'vendor',
                    chunks: 'all',
                    test: /node_modules/,
                    priority: 20
                }
            }
        }
    }
};


module.exports = merge(baseConfig, config);