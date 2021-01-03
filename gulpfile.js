"use strict";

const { buildProduction, buildDevelopment } = require("./gulp/tasks/build");
const { cleanCoverage } = require("./gulp/tasks/clean");
const { installerMac, installerWin } = require("./gulp/tasks/installer");
const { serve } = require("./gulp/tasks/serve");

exports.buildProduction = buildProduction;
exports.buildDevelopment = buildDevelopment;
exports.serve = serve;
exports.cleanCoverage = cleanCoverage;
exports.installerWin = installerWin;
exports.installerMac = installerMac;
