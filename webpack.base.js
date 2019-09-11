const webpack = require("webpack");

module.exports = {
    
    module: {
        rules: [
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: [
                        '@babel/preset-env',
                        '@babel/preset-react'
                    ],
                    plugins: [
                          [
                            "@babel/plugin-proposal-class-properties"
                          ]
                      ]
                }
            }
        ]
    }
}