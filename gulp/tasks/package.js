const packager = require('electron-packager');
const { series } = require("gulp");

const config = require("../config");
const { buildDevelopment } = require("./build");
const { cleanPackage } = require("./clean");

function package(platform, arch, cb) {
    const options = {
        dir: config.output,
        name: config.package.name,
        platform,
        arch,
        out: config.package.output,
        overwrite: true
    };
    
    packager(options)
        .then(() => cb())
        .catch((err) => {
            console.error(err);
            cb(err);
        });
}

function packageWin(cb) {
    package("win32", "ia32", cb);
}
exports.packageWin = series(buildDevelopment, cleanPackage, packageWin);


function packageMac(cb) {
    package("darwin", "x64", cb);
}
exports.packageMac = series(buildDevelopment, cleanPackage, packageMac);
