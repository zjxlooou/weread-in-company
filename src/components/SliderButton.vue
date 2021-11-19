<template>
    <a-popover placement="bottomLeft" v-model:visible="visible" trigger="click" @click="initValue">
        <template #content>
            <div style="display: inline-block; height: 80px; width: 12px">
                <a-slider
                    vertical
                    v-model:value="value"
                    :tipFormatter="tipFormatter"
                    @change="changeTransparent"
                    style="margin-left: 0px;"
                />
            </div>
        </template>
        <!-- 点击弹出滑动条 -->
        <a-button type="text">
            <template #icon>
                <DownOutlined :style="{color: '#909399'}" />
            </template>
        </a-button>
    </a-popover>
</template>
<script lang="ts">
import { DownOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref, createVNode } from 'vue';

export default defineComponent({
    components: {
        DownOutlined
    },
    setup() {
        const visible = ref<boolean>(false);
        const value = ref<number>(100);

        return {
            visible,
            value
        };
    },
    methods: {
        tipFormatter: function (value: Number) {
            return value + "%";
        },
        changeTransparent: function (value: Number) {
            window.ipcRenderer.send('e-window-transparent', value);
        },
        initValue: function () {
            let opacity = window.ipcRenderer.sendSync('e-window-get-opacity');
            this.value = parseInt(opacity);
        }
    }
});
</script>
