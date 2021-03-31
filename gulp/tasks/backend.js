"use strict";

const config = require("../config");
const { src, dest, series } = require("gulp");
const webpack = require("webpack-stream");
const tslint = require("gulp-tslint");

const webpackProductionConfig = require("../../webpack.backend.production");
const webpackDevelopmentConfig = require("../../webpack.backend.development");
const webpackDevelopmentWatchConfig = require("../../webpack.backend.development.watch");

function lintBackend() {
    return src(config.electron.main)
    .pipe(tslint())
    .pipe(tslint.report())
}

function electronFiles() {
    return src(config.electron.package)
    .pipe(dest(config.output));
}

function buildBackendProduction() {
    return src(config.electron.main)
        .pipe(webpack(webpackProductionConfig))
        .pipe(dest(config.output));
}
exports.buildBackendProduction = series(lintBackend, electronFiles, buildBackendProduction);

function buildBackendDevelopment() {
    return src(config.electron.main)
        .pipe(webpack(webpackDevelopmentConfig))
        .pipe(dest(config.output));
}
exports.buildBackendDevelopment = series(electronFiles, buildBackendDevelopment);

function buildBackendWatch() {
    return src(config.electron.main)
        .pipe(webpack(webpackDevelopmentWatchConfig))
        .pipe(dest(config.output));
}
exports.buildBackendWatch = series(electronFiles, buildBackendWatch);
