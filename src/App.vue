<template>
  <Home />
</template>
<script lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import "ant-design-vue/dist/antd.css";
import Home from './components/Home.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    Home
  }
});
</script>
<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
