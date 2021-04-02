const { spawn } = require("child_process");
const { series } = require("gulp");

class NgLauncher {
    constructor(isProd) {
        this.params = ['node_modules/@angular/cli/bin/ng'];

        if (isProd) {
            this.params.push('--configuration=production');
        } else {
            this.params.push('--configuration=development')
        }
    }

    build(cb) {
        this.params.push('build');
        this._spawn(cb);
    }

    watch(cb) {
        this.params.push('--watch=true');
        this.params.push('--deleteOutputPath=false')

        this.build(cb);
    }

    lint(cb) {
        this.params.push('lint');
        this._spawn(cb);
    }

    _spawn(cb) {
        const buildSpawn = spawn('node', this.params, { stdio: ['inherit', 'inherit', 'inherit'] });

        buildSpawn.on("close", (code) => {
            cb(code);
        });
    }
}

function lintFrontend(cb) {
    const ngLauncher = new NgLauncher(true);
    ngLauncher.lint(cb);
}

function buildFrontendProduction(cb) {
    const ngLauncher = new NgLauncher(true);
    ngLauncher.build(cb);
}
exports.buildFrontendProduction = series(lintFrontend, buildFrontendProduction);

function buildFrontendDevelopment(cb) {
    const ngLauncher = new NgLauncher(false);
    ngLauncher.build(cb);
}
exports.buildFrontendDevelopment = buildFrontendDevelopment;

function buildFrontendWatch(cb) {
    const ngLauncher = new NgLauncher(false);
    ngLauncher.watch(cb);
}
exports.buildFrontendWatch = buildFrontendWatch;