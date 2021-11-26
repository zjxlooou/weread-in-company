<template>
    <div>
        <webview
            ref="webview"
            id="webview"
            :src="initSrcUrl"
            :style="style"
            v-on:load-commit="hideScrollbar"
            scrolling="no"
        ></webview>
    </div>
</template>

<script>
export default {
    props: {
        'initSrcUrl': String
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
            webview.insertCSS("::-webkit-scrollbar {display: none;}"); // 隐藏且可滚动
        }
    }
}
</script>
