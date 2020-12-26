import { ElectronApp } from "./electron-app";

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
const mainWindow: any = null;

const app = new ElectronApp(mainWindow);
app.init();
