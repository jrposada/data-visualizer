import { App, BrowserWindow, globalShortcut } from "electron";

export class ElectronMainWindow {
    private window: BrowserWindow;

    constructor(private app: App) {
        globalShortcut.register("CommandOrControl+R", () => this.reload());
        globalShortcut.register("CommandOrControl+Shift+I", () => this.window.webContents.openDevTools());

        this.window = new BrowserWindow({
            width: 800,
            height: 600,
            minWidth: 800,
            minHeight: 600,
            webPreferences: {
                contextIsolation: true
            }
        });
        this.window.removeMenu();
    }

    public open(): void {
        this.window.loadURL(`file://${this.app.getAppPath()}/frontend/index.html`);
    }

    public reload() {
        // Keeping developer tools
        this.window.webContents.reload();
        this.window.loadURL(`file://${this.app.getAppPath()}/frontend/index.html`);
      }
}
