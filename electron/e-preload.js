const { ipcRenderer } = require("electron");

window.isElectron = true;
const config = ipcRenderer.sendSync('e-window-get-config');
window.homeUrl = config.home;