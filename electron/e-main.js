const { app, BrowserWindow, ipcMain, Tray, nativeImage, Menu } = require('electron');
const path = require('path');

global.APP_ENV = (process.env.NODE_ENV === 'dev') ? 'dev' : 'production';

let mainWindow;
let tray;
let globalOpacity = 100;

app.on('ready', init);

function init() {
    createWindow();
    createTray();
}

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 860,
        height: 640,
        transparent: true, // 透明
        frame: false, // 无边框
        webPreferences: {
            preload: path.join(__dirname, 'e-preload.js'),
            nodeIntegration: true,
            contextIsolation: false,
            webSecurity: false,
            webviewTag: true
        }
    });

    if (APP_ENV === 'production') {
        mainWindow.loadURL(`file://${__dirname}/index.html`);
    } else {
        mainWindow.loadURL('http://localhost:3000/');
        mainWindow.webContents.openDevTools(); // 打开开发工具
    }

    mainWindow.on("minimize", function () {
        mainWindow.setSkipTaskbar(true);
    });
}

function createTray() {
    const icon = nativeImage.createFromPath(path.join(__dirname, '/static/icon.png'));
    tray = new Tray(icon);
    const contextMenu = Menu.buildFromTemplate([
        {
            label: '显示', click() {
                changeOpacity(100);
                mainWindow.show();
            }
        },
        {
            label: '关闭', click() {
                windowClose();
            }
        }
    ]);
    tray.setContextMenu(contextMenu);

    tray.on("click", function () {
        if (mainWindow.isMinimized()) {
            mainWindow.show();
        } else if (!mainWindow.isMinimized()) {
            windowMinimize();
        }
    });
}

ipcMain.on("e-window-close", function () {
    windowClose();
});

ipcMain.on("e-window-minimize", function () {
    windowMinimize();
});

ipcMain.on("e-window-transparent", function (event, arg) {
    changeOpacity(arg);
});

ipcMain.on("e-window-on-top", function () {
    let onTop = !mainWindow.isAlwaysOnTop();
    mainWindow.setAlwaysOnTop(onTop);
});

ipcMain.on("e-window-get-opacity", function (event) {
    event.returnValue = globalOpacity;
});

function windowMinimize() {
    mainWindow.setSkipTaskbar(true);
    mainWindow.minimize();
}

function windowClose() {
    mainWindow.close();
}

function changeOpacity(arg) {
    let parcent = parseInt(arg);
    arg = arg >= 98 ? 100 : arg;
    let opacity = arg / 100.0;
    mainWindow.setOpacity(opacity);
    globalOpacity = arg;
}