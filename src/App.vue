<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import TopToolBar from './components/TopToolBar.vue';
import SubWebview from './components/SubWebview.vue';
import "ant-design-vue/dist/antd.css";
</script>

<template>
  <TopToolBar />
  <SubWebview />
</template>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
