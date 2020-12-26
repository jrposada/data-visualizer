import { App, BrowserWindow } from "electron";

export class ElectronMainWindow {
    private window: BrowserWindow;

    constructor(private app: App) {
        this.window = new BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                contextIsolation: true
            }
        });
    }

    public open(): void {
        this.window.loadURL(`file://${this.app.getAppPath()}/frontend/index.html`);
    }
}
