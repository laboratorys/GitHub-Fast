<template>
  <n-drawer v-model:show="store.showConfig" :width="502">
    <n-drawer-content title="GitHub加速配置" closable>
      <div class="centered-content">
        <n-form label-placement="left" label-width="auto">
          <n-h3>
            <n-text type="primary"> 负载均衡 </n-text>
          </n-h3>
          <n-form-item>
            <n-switch
              v-model:value="bypassDownload"
              size="large"
              :round="false">
              <template #checked> 开启 </template>
              <template #unchecked> 关闭 </template>
            </n-switch>
          </n-form-item>
          <n-h3>
            <n-text type="primary"> 克隆 </n-text>
          </n-h3>
          <n-form-item>
            <n-space item-style="display: flex;">
              <n-checkbox
                size="large"
                v-model:checked="clone"
                @update:checked="handleUpdateCloneValue"
                label="git clone" />
              <n-checkbox
                size="large"
                v-model:checked="depth"
                @update:checked="handleUpdateDepthValue"
                label="--depth=1" />
            </n-space>
          </n-form-item>
          <n-h3>
            <n-text type="primary"> 列表文件加速 </n-text>
          </n-h3>
          <n-form-item>
            <n-select
              v-model:value="projectFileDownloadUrl"
              :options="projectFileUrlList"
              placeholder="选择加速地址" />
          </n-form-item>
          <n-h3>
            <n-text type="primary"> 加速列表 </n-text>
          </n-h3>
          <n-form-item>
            <n-dynamic-input
              v-model:value="proxyUrlList"
              show-sort-button
              :on-create="onCreate">
              <template #create-button-default> 添加 </template>
              <template #default="{ value }">
                <div style="display: flex; align-items: center; width: 100%">
                  <n-checkbox
                    v-model:checked="value.isCheck"
                    style="margin-right: 12px" />
                  <n-input
                    class="mr-2"
                    v-model:value="value.name"
                    type="text"
                    placeholder="名称"
                    style="width: 40%" />
                  <n-input
                    v-model:value="value.url"
                    type="text"
                    placeholder="加速地址" />
                </div>
              </template>
            </n-dynamic-input>
          </n-form-item>
          <n-space justify="center"
            ><n-button type="primary" size="medium" strong @click="saveConfig">
              保存配置
            </n-button>
            <n-button
              type="default"
              size="medium"
              strong
              @click="store.showConfig = false">
              关闭
            </n-button>
          </n-space>
        </n-form>
      </div>
    </n-drawer-content>
  </n-drawer>
</template>
<script setup>
import { ref, computed } from "vue";
import { useStore } from "../utils/store.js";
import {
  NButton,
  NDrawer,
  NDrawerContent,
  NForm,
  NFormItem,
  NDynamicInput,
  NSpace,
  NInput,
  NCheckbox,
  NH3,
  NText,
  NSelect,
  NSwitch,
} from "naive-ui";
const store = useStore();
const proxyUrlList = ref([]);
const projectFileDownloadUrl = ref(null);
const bypassDownload = ref(false);
const clone = ref(true);
const depth = ref(false);
const projectFileUrlList = computed(() => {
  var hasVal = false;
  proxyUrlList.value.find(function (value) {
    if (value.url == projectFileDownloadUrl.value && value.isCheck) {
      hasVal = true;
    }
  });
  if (!hasVal) {
    projectFileDownloadUrl.value = null;
  }
  return proxyUrlList.value.map((u) => ({
    label: u.url,
    value: u.url,
    disabled: !u.isCheck,
  }));
});
const onCreate = () => {
  return {
    isCheck: true,
    name: "",
    url: "",
  };
};
const handleUpdateCloneValue = (value) => {
  if (!value) {
    depth.value = false;
  }
};
const handleUpdateDepthValue = (value) => {
  if (value) {
    clone.value = true;
  }
};
const saveConfig = () => {
  GM_setValue("githubFastConfig", {
    projectFileDownloadUrl: projectFileDownloadUrl.value,
    proxyUrlList: proxyUrlList.value,
    bypassDownload: bypassDownload.value,
    clone: clone.value,
    depth: depth.value,
  });
  GM.notification("配置更新成功，请刷新页面！");
};
const initData = () => {
  const config = GM_getValue("githubFastConfig");
  if (config) {
    projectFileDownloadUrl.value = config.projectFileDownloadUrl;
    proxyUrlList.value = config.proxyUrlList;
    bypassDownload.value = config.bypassDownload;
    clone.value = config.clone;
    depth.value = config.depth;
  }
};
initData();
</script>
<style scoped></style>
