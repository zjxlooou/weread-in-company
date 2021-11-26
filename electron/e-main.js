const { info } = require('console');
const { app, BrowserWindow, ipcMain, Tray, nativeImage, Menu, globalShortcut, dialog, shell } = require('electron');
const Store = require('electron-store');
const path = require('path');

global.APP_ENV = (process.env.NODE_ENV === 'dev') ? 'dev' : 'production';

const store = new Store();

const HOME_NAME = "home";
const BOSS_KEY_NAME = "bossKey";
const BOSS_KEY_SWITCH_NAME = "bossKeySwitch";

const DEFAULT_HOME = "http://weread.qq.com/";
const DEFAULT_BOSS_KEY = "Ctrl+Alt+M";
const DEFAULT_BOSS_KEY_SWITCH = true;

let currentHome;
let currentBossKey;
let tempBossKey;
let currentBossKeySwitch;

let mainWindow;
let tray;
let globalOpacity = 100;

app.on('ready', init);

function init() {
    initConfig(false);
    createWindow();
    createTray();
    initBossKey();
}

function initConfig(forceInit) {
    if (!forceInit) {
        currentHome = store.get(HOME_NAME);
        currentBossKey = store.get(BOSS_KEY_NAME);
        currentBossKeySwitch = store.get(BOSS_KEY_SWITCH_NAME);
        if (!currentHome) {
            currentHome = DEFAULT_HOME;
        }
        if (!currentBossKey) {
            currentBossKey = DEFAULT_BOSS_KEY;
        }
        if (!currentBossKeySwitch) {
            currentBossKeySwitch = DEFAULT_BOSS_KEY_SWITCH;
        }
    } else {
        currentHome = DEFAULT_HOME;
        currentBossKey = DEFAULT_BOSS_KEY;
        currentBossKeySwitch = DEFAULT_BOSS_KEY_SWITCH;
        changeOpacity(100);
        registerBossKey(false);

    }
    tempBossKey = currentBossKey;
    saveConfig();
}

function initBossKey() {
    registerBossKey(currentBossKey, currentBossKeySwitch, true);

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
        // mainWindow.webContents.openDevTools(); // 打开开发工具
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

function registerBossKey(isInit) {
    // 先删除上一次注册的全局快捷键
    globalShortcut.unregister(tempBossKey);
    // 先处理开关逻辑
    if (currentBossKeySwitch !== undefined) {
        if (currentBossKeySwitch === false) {
            return 'ok';
        } else if (currentBossKeySwitch !== true) {
            const options = {
                title: "警告",
                message: "老板键开关配置错误1",
                type: "error"
            }
            dialog.showMessageBox(mainWindow, options)
            return '老板键开关配置错误';
        }
    } else {
        const options = {
            title: "警告",
            message: "老板键开关配置错误2",
            type: "error"
        }
        dialog.showMessageBox(mainWindow, options)
        return '老板键开关配置错误';
    }
    // 如果指令有问题，则不注册
    if (!currentBossKey || currentBossKey.indexOf('+') < 0) {
        if (!isInit) {
            return '老板键指令格式错误';
        }
        const options = {
            title: "警告",
            message: "老板键指令格式错误",
            type: "error"
        }
        dialog.showMessageBox(mainWindow, options)
        return '老板键指令格式错误';
    }
    // 开始注册热键
    const ret = globalShortcut.register(currentBossKey, function () {
        if (mainWindow.isMinimized()) {
            mainWindow.show();
        } else if (!mainWindow.isMinimized()) {
            windowMinimize();
        }
    });
    // 如果注册失败
    if (!ret) {
        return '老板键注册失败';
    } else {
        return 'ok';
    }
}

function windowError(message) {
    const options = {
        title: "错误",
        message: message,
        type: "error"
    }
    dialog.showMessageBox(mainWindow, options)
}

function windowWarning(message) {
    const options = {
        title: "警告",
        message: message,
        type: "warning"
    }
    dialog.showMessageBox(mainWindow, options)
}

function windowInfo(message) {
    const options = {
        title: "消息",
        message: message,
        type: "info"
    }
    dialog.showMessageBox(mainWindow, options)
}

ipcMain.on("e-window-close", function () {
    windowClose();
});

ipcMain.on("e-window-minimize", function () {
    windowMinimize();
});

ipcMain.on("e-window-change-opacity", function (event, arg) {
    changeOpacity(arg);
});

ipcMain.on("e-window-on-top", function () {
    let onTop = !mainWindow.isAlwaysOnTop();
    mainWindow.setAlwaysOnTop(onTop);
});

ipcMain.on("e-window-get-config", function (event) {
    event.returnValue = {
        opacity: globalOpacity,
        home: currentHome,
        bossKey: currentBossKey,
        bossKeySwitch: currentBossKeySwitch
    };
});

ipcMain.on("e-window-boss-key-switch", function (event, arg) {
    currentBossKeySwitch = arg;
    const msg = registerBossKey(false);
    saveConfig();
    event.returnValue = msg;
});

ipcMain.on("e-window-update-setting", function (event, arg) {
    currentHome = arg.home;
    currentBossKey = arg.bossKey;
    registerBossKey(false);
    saveConfig();
    event.returnValue = 'ok';
});

ipcMain.on("e-window-open-url", function (event, arg) {
    shell.openExternal(arg);
});

ipcMain.on("e-window-force-init", function (event) {
    initConfig(true);
    event.returnValue = 'ok';
});

function windowMinimize() {
    mainWindow.setSkipTaskbar(true);
    mainWindow.minimize();
}

function windowClose() {
    mainWindow.close();
}

function changeOpacity(arg) {
    arg = arg >= 98 ? 100 : arg;
    let opacity = arg / 100.0;
    mainWindow.setOpacity(opacity);
    globalOpacity = arg;
}

function saveConfig() {
    store.set(HOME_NAME, currentHome);
    store.set(BOSS_KEY_NAME, currentBossKey);
    store.set(BOSS_KEY_SWITCH_NAME, currentBossKeySwitch);
}