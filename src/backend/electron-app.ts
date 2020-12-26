import { App, app } from "electron";
import { ElectronMainWindow } from "./electron-main-window";

export class ElectronApp {
    private readonly app: App;

    constructor(private mainWindow: ElectronMainWindow) {
        this.app = app
    }

    public init(): void {
        this.app.whenReady()
            .then(() => this.onReady())
            .catch((err: any) => console.log(err));
        this.app.on("window-all-closed", () => this.onWindowAllClosed());
    }

    private onReady(): void {
        this.mainWindow = new ElectronMainWindow(app);
        this.mainWindow.open();
    }

    private onWindowAllClosed(): void {
        // On OS X it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd + Q
        if (process.platform !== 'darwin') {
            app.quit();
        }
    }

}
