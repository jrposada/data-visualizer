"use strict";

const { merge } = require('webpack-merge');
const base = require("./webpack.backend.base");

module.exports = merge(base, {
    mode: "production",
    devtool: "none"
});
