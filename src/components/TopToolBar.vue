<template>
  <!-- 顶部浮动工具条 -->
  <a-affix ref="affix" :style="style">
    <a-row ref="row">
      <!-- 在左边 -->
      <a-col :span="12" align="left">
        <!-- 因为隐藏了标题栏，所以设置一个按钮以拖动窗口 -->
        <a-button type="text" style="-webkit-app-region: drag;">
          <template #icon>
            <DragOutlined :style="{ color: '#909399' }" />
          </template>
        </a-button>
        <!-- 刷新按钮 -->
        <a-button type="text" @click="reload">
          <template #icon>
            <ReloadOutlined :style="{ color: '#909399' }" />
          </template>
        </a-button>
        <!-- 显示设置按钮 -->
        <setting-button />
      </a-col>
      <!-- 在右边 -->
      <a-col :span="12" align="right">
        <!-- 置顶窗口 -->
        <a-button type="text" @click="onTopWindow">
          <template #icon>
            <PushpinOutlined :style="{ color: '#909399' }" />
          </template>
        </a-button>
        <!-- 最小化窗口 -->
        <a-button type="text" @click="minimizeWindow">
          <template #icon>
            <MinusOutlined :style="{ color: '#909399' }" />
          </template>
        </a-button>
        <!-- 关闭窗口 -->
        <a-button type="text" @click="closeWindow">
          <template #icon>
            <CloseOutlined :style="{ color: '#909399' }" />
          </template>
        </a-button>
      </a-col>
    </a-row>
  </a-affix>
</template>
<script>
import SettingButton from './SettingButton.vue';
import { DragOutlined, ReloadOutlined, MinusOutlined, CloseOutlined, PushpinOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref } from 'vue';

export default {
  components: {
    DragOutlined,
    ReloadOutlined,
    MinusOutlined,
    CloseOutlined,
    PushpinOutlined,
    SettingButton
  },
  data() {
    let clientWidth = (document.body.clientWidth - 10) + 'px'
    let style = { position: 'absolute', width: clientWidth };
    return {
      style
    };
  },
  mounted: function () {
    const that = this;
    function resizeToolBar() {
      let clientWidthTemp = document.body.clientWidth - 15;
      that.style.width = clientWidthTemp + 'px';
    }
    window.addEventListener('resize', resizeToolBar);
  },
  methods: {
    onTopWindow: function () {
      window.ipcRenderer.send('e-window-on-top');
    },
    closeWindow: function () {
      window.ipcRenderer.send('e-window-close');
    },
    minimizeWindow: function () {
      window.ipcRenderer.send('e-window-minimize');
    },
    reload: function () {
      location.reload();
    }
  }
}
</script>