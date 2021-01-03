const { series } = require("gulp");
const createDMG = require("electron-installer-dmg");


const { packageMac, packageWin } = require("./package");

function installerWin(cb) {
    cb();
}
exports.installerWin = series(packageWin, installerWin);

function installerMac(cb) {
    const options = {
        appPath: "release-builds/DataVisualizer-darwin-x64/DataVisualizer.app",
        name: "DataVisualizer"
    };

    createDMG(options, function done (err) {
        cb(err);
    });
}
exports.installerMac = series(packageMac, installerMac);