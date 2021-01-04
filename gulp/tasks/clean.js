const del = require("del");

const config = require("../config");

function cleanBuild() {
    return del([config.output]);
}
exports.cleanBuild = cleanBuild;

function cleanCoverage() {
    return del([config.coverage]);
}
exports.cleanCoverage = cleanCoverage;

function cleanPackage() {
    return del([config.pacakge.output]);
}
exports.cleanPackage = cleanPackage;