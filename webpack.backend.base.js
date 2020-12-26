"use strict";

const webpack = require("webpack");

module.exports = {
    module: {
        rules: [{
            test: /\.ts$/,
            use: [{
                loader: "ts-loader"
            }]
        }]
    },
    output: {
        filename: "main.backend.js"
    },
    resolve: {
        extensions: [".ts"]
    },
    target: "electron-main",
    plugins: [
        new webpack.ProgressPlugin()
    ]
}