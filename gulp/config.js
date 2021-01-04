module.exports = {
    installer: "./installers",
    package: {
        output: "./packages",
        name: "DataVisualizer"
    },
    coverage: "./coverage",
    output: "./dist",
    frontend: {
        index: "./src/index.html"
    },
    electron: {
        main: "./src/backend/main.ts",
        package: "./src/electron-files/package.json",
        fake: "./src/electron-files/fake/**.*"
    }
}