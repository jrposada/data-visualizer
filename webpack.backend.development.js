"use strict";

const { merge } = require('webpack-merge');
const base = require("./webpack.backend.base");

module.exports = merge(base, {
    mode: "development",
    devtool: "inline-source-map"
});
