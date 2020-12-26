"use strict";

const { series, parallel } = require("gulp");

const { buildBackendProduction, buildBackendDevelopment, buildBackendWatch } = require("./backend");
const { buildFrontendProduction, buildFrontendDevelopment, buildFrontendWatch } = require("./frontend");
const { cleanBuild } = require("./clean");


exports.buildProduction = series(cleanBuild, buildBackendProduction, buildFrontendProduction);

exports.buildDevelopment = series(cleanBuild, buildBackendDevelopment, buildFrontendDevelopment);

exports.buildWatch = parallel(buildBackendWatch, buildFrontendWatch);
