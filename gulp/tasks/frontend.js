const { spawn } = require("child_process");

class NgLauncher {
    constructor(isProd) {
        this.params = ['node_modules/@angular/cli/bin/ng'];
        this.params.push('build');

        if (isProd) {
            this.params.push('--configuration=production');
        } else {
            this.params.push('--configuration=development')
        }
    }

    build(cb) {
        const buildSpawn = spawn('node', this.params, { stdio: ['inherit', 'inherit', 'inherit'] });

        buildSpawn.on("close", (code) => {
            cb(code);
        });
    }

    watch(cb) {
        this.params.push('--watch=true');
        this.params.push('--deleteOutputPath=false')

        this.build(cb);
    }

}

function buildFrontendProduction(cb) {
    const ngLauncher = new NgLauncher(true);
    ngLauncher.build(cb);
}
exports.buildFrontendProduction = buildFrontendProduction;

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