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
        const widthTemp = document.documentElement.clientWidth;
        const heightTemp = document.documentElement.clientHeight + 'px';
        const style = {
            width: widthTemp,
            height: heightTemp
        };
        return {
            style
        }
    },
    mounted() {
        const that = this;
        function resizeIframe() {
            let windowHeight = document.documentElement.clientHeight;
            that.style.height = windowHeight + 'px';
        }
        window.addEventListener('resize', resizeIframe);
    },
    methods: {
        hideScrollbar: function () {
            const webview = document.getElementById("webview");
            // webview.insertCSS("body{overflow-y:hidden;}"); // 这样不能滚动
            webview.insertCSS("::-webkit-scrollbar {display: none} * {-webkit-user-drag: none}"); // 隐藏且可滚动
        },
        domReady: function () {
            // 会触发resize，然后窗口被变大，不知道原因，也不知道怎么结局，放弃
            // const webview = document.getElementById("webview");
            // webview.openDevTools();
            // let windowSize = { x: 0, y: 0 };
            // webview.addEventListener("ipc-message", function (event) {
            //     if (event.channel === 'set-window-position') {
            //         window.moveTo(event.args[0][0], event.args[0][1]);
            //         window.resizeTo(windowSize.x, windowSize.y);
            //         console.log("width = " + windowSize.x + ", height = " + windowSize.y);
            //     } else if ('record-window-size') {
            //         windowSize.x = window.outerWidth;
            //         windowSize.y = window.outerHeight;
            //         console.log("width = " + windowSize.x + ", height = " + windowSize.y);
            //     }
            // });
        }
    }
}
</script>
