<template>
    <div>
        <webview
            ref="webview"
            id="webview"
            :src="srcUrl"
            :style="style"
            v-on:load-commit="hideScrollbar"
            scrolling="no"
        ></webview>
    </div>
</template>

<script>
export default {
    data() {
        const windowHeight = document.documentElement.clientHeight;
        const heightTemp = windowHeight + 'px';
        const style = {
            width: "100%",
            height: heightTemp
        };
        return {
            srcUrl: 'https://weread.qq.com/',
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
            var webview = document.getElementById("webview");
            // webview.insertCSS("body{overflow-y:hidden;}"); // 这样不能滚动
            webview.insertCSS("::-webkit-scrollbar {display: none;}"); // 隐藏且可滚动
        }
    }
}
</script>
