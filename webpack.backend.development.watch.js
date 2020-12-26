"use strict";

const { merge } = require('webpack-merge');
const development = require("./webpack.backend.development");

module.exports = merge(development, {
    watch: true,
    watchOptions: {
        aggregateTimeout: 1000
    }
});
