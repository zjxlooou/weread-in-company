const { ipcRenderer } = require("electron");

window.isElectron = true;
const config = ipcRenderer.sendSync('e-window-get-config');
window.homeUrl = config.home;
const webviewProloadPath = ipcRenderer.sendSync('e-window-get-webview-preload');
window.webviewProloadPath = webviewProloadPath;