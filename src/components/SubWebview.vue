<template>
    <webview
        ref="webview"
        id="webview"
        :src="initSrcUrl"
        :style="style"
        :preload="preloadPath"
        v-on:load-commit="hideScrollbar"
        v-on:dom-ready="domReady"
        scrolling="no"
        autosize
    ></webview>
</template>

<script>
export default {
    props: {
        'initSrcUrl': String,
        'preloadPath': String
    },
    data() {
        const windowHeight = document.documentElement.clientHeight;
        const heightTemp = windowHeight + 'px';
        const style = {
            width: "100%",
            height: heightTemp
        };
        return {
            style
        }
    },
    methods: {
        hideScrollbar: function () {
            const webview = document.getElementById("webview");
            // webview.insertCSS("body{overflow-y:hidden;}"); // 这样不能滚动
            webview.insertCSS("::-webkit-scrollbar {display: none;}"); // 隐藏且可滚动
        },
        domReady: function () {
            const webview = document.getElementById("webview");
            // webview.openDevTools();
            const thatWin = parent.window;
            webview.addEventListener("ipc-message", function (event) {
                if (event.channel === 'set-window-position') {
                    // 咋整，这里的实际效果跟想要的完全不一样
                    thatWin.moveBy(event.args[0][0], event.args[0][1]);
                }
            });
        }
    }
}
</script>
