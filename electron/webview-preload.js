const { ipcRenderer } = require("electron");
// const webview = document.getElementById("webview");
// webview.openDevTools();
document.addEventListener('DOMContentLoaded', function () {
    // makeDraggableFallback(document.body);
});
function makeDraggableFallback(el) {
    // 方案一
    // el.style['-webkit-app-region'] = 'drag'; // 点击事件被屏蔽

    // 方案二
    let dragging = false;
    let clientXInit;
    let clientYInit;
    el.addEventListener('mousedown', (e) => {
        const { clientX, clientY } = e;
        clientXInit = clientX;
        clientYInit = clientY;
        // ipcRenderer.sendToHost('record-window-size');
        dragging = true;
    });
    el.addEventListener('mouseup', () => {
        dragging = false;
    });
    el.addEventListener('mouseleave', () => {
        dragging = false;
    });
    el.addEventListener('mousemove', (e) => {
        if (dragging) {
            // console.log(e)
            const { screenX, screenY } = e;
            // let targetX = screenX - clientXInit;
            // let targetY = screenY - clientYInit;
            // let pos = [];
            // pos.push(targetX);
            // pos.push(targetY);
            // window.moveTo(screenX - clientXInit, screenY - clientYInit); // 没用
            // ipcRenderer.sendToHost('set-window-position', [screenX - clientXInit, screenY - clientYInit]);
            // ipcRenderer.sendSync('e-window-set-position', [screenX - clientXInit, screenY - clientYInit]);
        }
    });
}