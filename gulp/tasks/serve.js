const { series, parallel, src, dest, watch } = require("gulp");
const { Subject, timer } = require("rxjs");
const { debounceTime } = require ("rxjs/operators");
const electron = require("electron-connect").server.create({
    path: "dist"
});

const config  = require("../config");
const { buildWatch } = require("./build");
const { cleanBuild } = require("./clean");

function startElectron(cb) {
    electron.start("--remote-debugging-port=9222");
    timer(1000).subscribe(() => cb());
}

function fakeElectron(cb) {
    return src(config.electron.fake)
    .pipe(dest(config.output));
}

function watchCode() {
    const restartSubject = new Subject();
    restartSubject
        .pipe(debounceTime(1000))
        .subscribe(() => {
            electron.restart();
        });

    watch(config.output +"/**/**.*", (cb) => {
        restartSubject.next();
        cb();
    });
}

exports.serve = series(
    cleanBuild,
    fakeElectron,
    startElectron,
    parallel(buildWatch, watchCode)
)
