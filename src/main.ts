import { createApp } from "vue";
import App from "./App.vue";
import Antd from "ant-design-vue";

const app = createApp(App);
app.use(Antd);
app.mount("#app");
if (window.isElectron) {
  const { ipcRenderer } = require("electron");
  window.ipcRenderer = ipcRenderer;
}
