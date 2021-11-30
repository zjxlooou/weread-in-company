<template>
    <TopToolBar @change-home="loadUrl" />
    <SubWebview ref="subWebview" :initSrcUrl="home" :preloadPath="preloadFile" />
</template>
<script lang="ts">
import TopToolBar from './TopToolBar.vue';
import SubWebview from './SubWebview.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    components: {
        TopToolBar,
        SubWebview,
    },
    setup() {
        const home = window.homeUrl;
        return {
            home,
            preloadFile: window.webviewProloadPath
        };
    },
    methods: {
        loadUrl: function (url: string) {
            console.log(url);
            this.home = url;
        }
    }
});
</script>