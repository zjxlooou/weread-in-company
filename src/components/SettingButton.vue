<template>
    <a-button type="text" @click="showSetting">
        <template #icon>
            <SettingOutlined :style="{ color: '#909399' }" />
        </template>
    </a-button>
    <a-modal v-model:visible="visible" title="设置" @ok="save" @show="initForm" width="60%">
        <template #footer>
            <a-button @click="cancel" danger>关闭</a-button>
            <a-button @click="forceInit">初始化</a-button>
            <a-button type="primary" @click="save">保存</a-button>
        </template>
        <a-form
            :model="formState"
            labelAlign="right"
            :labelCol="{ span: 6 }"
            :wrapperCol="{ span: 14 }"
        >
            <a-form-item label="透明度">
                <a-slider
                    v-model:value="opacity"
                    :tipFormatter="opacityTipFormatter"
                    @change="changeOpacity"
                />
            </a-form-item>
            <a-form-item label="启用老板键">
                <a-switch v-model:checked="bossKeySwitch" @change="changeSwitch">
                    <template #checkedChildren>
                        <check-outlined />
                    </template>
                    <template #unCheckedChildren>
                        <close-outlined />
                    </template>
                </a-switch>
                当前：{{ currentBossKey }}
            </a-form-item>
            <a-divider>以下需保存生效</a-divider>
            <a-form-item label="老板键">
                <a-input-search
                    v-model:value="formState.bossKey"
                    placeholder="例如：Ctrl+Alt+M"
                    @search="openHelp"
                >
                    <template #enterButton>
                        <a-button>帮助</a-button>
                    </template>
                </a-input-search>
            </a-form-item>
            <a-form-item label="默认主页">
                <a-input v-model:value="formState.home" placeholder="例如：https://weread.qq.com/" />
            </a-form-item>
        </a-form>
    </a-modal>
</template>
<script lang="ts">
import { SettingOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { defineComponent, ref, reactive, UnwrapRef, toRaw } from 'vue';

const defaultpacity = 100;
const defaultBossKeySwitch = true;
const defaultBossKey = "Ctrl+Alt+M";
const defaultHome = "https://weread.qq.com/";

interface FormState {
    home: string;
    bossKey: string;
}

export default defineComponent({
    components: {
        SettingOutlined,
        CheckOutlined,
        CloseOutlined
    },
    setup() {
        const bossKeySwitch = ref<boolean>(defaultBossKeySwitch);
        const opacity = ref<number>(defaultpacity);
        const visible = ref<boolean>(false);
        const currentBossKey = ref<string>(defaultBossKey);
        const formState: UnwrapRef<FormState> = reactive({
            home: defaultHome,
            bossKey: defaultBossKey
        });
        return {
            visible,
            bossKeySwitch,
            currentBossKey,
            opacity,
            formState
        };
    },
    methods: {
        showSetting: function () {
            this.visible = true;
            this.initForm();
        },
        cancel: function () {
            this.visible = false;
        },
        save: function () {
            console.log(toRaw(this.formState));
            try {
                const res = window.ipcRenderer.sendSync('e-window-update-setting', toRaw(this.formState));
                if (res === 'ok') {
                    message.success('保存成功');
                    location.reload();
                } else {
                    message.warning(res);
                }
            } catch {

            }
        },
        forceInit: function () {
            try {
                const res = window.ipcRenderer.sendSync('e-window-force-init');
                if (res === 'ok') {
                    message.success('初始化成功');
                    location.reload();
                } else {
                    message.warning(res);
                }
            } catch {

            }
        },
        initForm: function () {
            let opacity = defaultpacity;
            let home = defaultHome;
            let bossKey = defaultBossKey;
            let bossKeySwitch = defaultBossKeySwitch;
            try {
                const config = window.ipcRenderer.sendSync('e-window-get-config');
                opacity = config.opacity;
                home = config.home;
                bossKey = config.bossKey;
                bossKeySwitch = config.bossKeySwitch;
            } catch {

            } finally {
                this.opacity = opacity;
                this.formState.home = home;
                this.formState.bossKey = bossKey;
                this.bossKeySwitch = bossKeySwitch;
                this.currentBossKey = bossKey;
            }
        },
        opacityTipFormatter: function (value: number) {
            return value + "%";
        },
        changeOpacity: function (value: number) {
            try {
                window.ipcRenderer.send('e-window-change-opacity', value);
            } catch {

            }
        },
        changeSwitch: function (value: boolean) {
            try {
                const res = window.ipcRenderer.sendSync('e-window-boss-key-switch', value);
                if (res === 'ok') {
                    const msg = this.currentBossKey + (value ? ' 已启用' : ' 已停用');
                    message.success(msg);
                } else {
                    message.warning(res);
                }
            } catch {

            }
        },
        emitToParent: function (url: string) {
            this.$emit('change-home', url);
        },
        openHelp: function () {
            try {
                const helpUrl = 'https://www.electronjs.org/zh/docs/latest/api/accelerator';
                window.ipcRenderer.send('e-window-open-url', helpUrl);
            } catch {

            }
        }
    }
});
</script>