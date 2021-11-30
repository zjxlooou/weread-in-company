const { ipcRenderer } = require("electron");
// const webview = document.getElementById("webview");
// webview.openDevTools();
document.addEventListener('DOMContentLoaded', function () {
    makeDraggableFallback(document.body);
});
function makeDraggableFallback(el) {
    // 方案一
    // el.style['-webkit-app-region'] = 'drag'; // 点击事件被屏蔽

    // 方案二
    let dragging = false;
    let mouseX = 0;
    let mouseY = 0;
    el.addEventListener('mousedown', (e) => {
        dragging = true;
        // const { pageX, pageY } = e;
        mouseX = 0;
        mouseY = 0;
    });
    el.addEventListener('mouseup', () => {
        dragging = false;
    });
    el.addEventListener('mousemove', (e) => {
        if (dragging) {
            const { pageX, pageY } = e;
            if (mouseX === 0 && mouseY === 0) {
                mouseX = pageX;
                mouseY = pageY;
                return;
            }
            let pos = [];
            pos.push(pageX - mouseX);
            pos.push(pageY - mouseY);
            ipcRenderer.sendToHost('set-window-position', pos)
            mouseX = pageX;
            mouseY = pageY;
        }
    });
}