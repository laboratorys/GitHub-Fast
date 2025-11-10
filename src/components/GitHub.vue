<template>
  <n-drawer v-model:show="store.showConfig" :width="630">
    <n-drawer-content closable>
      <template #header> GitHub加速配置 </template>
      <div class="centered-content">
        <n-form label-placement="left" label-width="auto" size="medium">
          <n-h3>
            <n-flex style="gap: 3px">
              <n-button text style="font-size: 20px" type="primary">
                <n-icon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 32 32">
                    <path d="M15 8h2v2h-2z" fill="currentColor"></path>
                    <path d="M19 8h2v2h-2z" fill="currentColor"></path>
                    <path d="M11 8h2v2h-2z" fill="currentColor"></path>
                    <path
                      d="M25 16h-8v-3h-2v3H7a2.002 2.002 0 0 0-2 2v6h2v-6h8v6h2v-6h8v6h2v-6a2.002 2.002 0 0 0-2-2z"
                      fill="currentColor"></path>
                    <path d="M4 26h4v4H4z" fill="currentColor"></path>
                    <path d="M14 26h4v4h-4z" fill="currentColor"></path>
                    <path d="M24 26h4v4h-4z" fill="currentColor"></path>
                    <path d="M11 3h10v2H11z" fill="currentColor"></path>
                  </svg>
                </n-icon>
              </n-button>
              <n-text type="primary"> 分流下载 </n-text>
              <n-tooltip trigger="hover" placement="right">
                <template #trigger>
                  <n-button text style="font-size: 20px">
                    <n-icon>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 16 16">
                        <g fill="none">
                          <path
                            d="M8 2a6 6 0 1 1 0 12A6 6 0 0 1 8 2zm0 8.5A.75.75 0 1 0 8 12a.75.75 0 0 0 0-1.5zm0-6a2 2 0 0 0-2 2a.5.5 0 0 0 1 0a1 1 0 0 1 2 0c0 .37-.083.58-.366.898l-.116.125l-.264.27C7.712 8.36 7.5 8.768 7.5 9.5a.5.5 0 0 0 1 0c0-.37.083-.58.366-.898l.116-.125l.264-.27C9.788 7.64 10 7.232 10 6.5a2 2 0 0 0-2-2z"
                            fill="currentColor"></path>
                        </g>
                      </svg>
                    </n-icon>
                  </n-button>
                </template>
                加速按钮只会显示一个，下载时轮询加速
              </n-tooltip>
            </n-flex>
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
            <n-flex style="gap: 3px">
              <n-button text style="font-size: 20px" type="primary">
                <n-icon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 512 512">
                    <path
                      d="M464 0H144c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h320c26.51 0 48-21.49 48-48v-48h48c26.51 0 48-21.49 48-48V48c0-26.51-21.49-48-48-48zM362 464H54a6 6 0 0 1-6-6V150a6 6 0 0 1 6-6h42v224c0 26.51 21.49 48 48 48h224v42a6 6 0 0 1-6 6zm96-96H150a6 6 0 0 1-6-6V54a6 6 0 0 1 6-6h308a6 6 0 0 1 6 6v308a6 6 0 0 1-6 6z"
                      fill="currentColor"></path>
                  </svg>
                </n-icon>
              </n-button>
              <n-text type="primary"> 克隆 </n-text>
            </n-flex>
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
            <n-flex style="gap: 3px">
              <n-button text style="font-size: 20px" type="primary">
                <n-icon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 24 24">
                    <g fill="none">
                      <path
                        d="M4.25 4A2.25 2.25 0 0 0 2 6.25v2.5A2.25 2.25 0 0 0 4.25 11h2.5A2.25 2.25 0 0 0 9 8.75v-2.5A2.25 2.25 0 0 0 6.75 4h-2.5zM3.5 6.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1-.75-.75v-2.5zM11.25 5a.75.75 0 0 0 0 1.5h10a.75.75 0 0 0 0-1.5h-10zm0 3a.75.75 0 0 0 0 1.5h7a.75.75 0 0 0 0-1.5h-7zm-7 5A2.25 2.25 0 0 0 2 15.25v2.5A2.25 2.25 0 0 0 4.25 20h2.5A2.25 2.25 0 0 0 9 17.75v-2.5A2.25 2.25 0 0 0 6.75 13h-2.5zm-.75 2.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1-.75-.75v-2.5zM11.25 14a.75.75 0 0 0 0 1.5h10a.75.75 0 0 0 0-1.5h-10zm0 3a.75.75 0 0 0 0 1.5h7a.75.75 0 0 0 0-1.5h-7z"
                        fill="currentColor"></path>
                    </g>
                  </svg>
                </n-icon>
              </n-button>
              <n-text type="primary"> 仓库文件加速 </n-text>
            </n-flex>
          </n-h3>
          <n-form-item>
            <n-select
              v-model:value="projectFileDownloadUrl"
              :options="projectFileUrlList"
              filterable
              placeholder="选择加速地址">
              <template #arrow>
                <transition name="slide-left">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 16 16">
                    <g fill="none">
                      <path
                        d="M3.689 1a.75.75 0 0 0-.721.544l-1.858 6.5A.75.75 0 0 0 1.832 9H3.36l-1.345 5.379a.5.5 0 0 0 .849.464l2.428-2.57a5.47 5.47 0 0 1-.26-1.181l-1.583 1.675l1.036-4.146A.5.5 0 0 0 4 8H2.163l1.714-6H8.28L7.032 5.324a.5.5 0 0 0 .332.657A5.474 5.474 0 0 1 10.42 5H8.222l1.12-2.987A.75.75 0 0 0 8.639 1H3.69zM10.5 15a4.5 4.5 0 1 0 0-9a4.5 4.5 0 0 0 0 9zm2.354-5.646l-3 3a.5.5 0 0 1-.707 0l-1-1a.5.5 0 0 1 .707-.708l.646.647l2.646-2.647a.5.5 0 1 1 .708.708z"
                        fill="currentColor"></path>
                    </g>
                  </svg>
                </transition>
              </template>
            </n-select>
          </n-form-item>
          <n-h3>
            <n-flex style="gap: 3px" align="center" justify="space-between">
              <!-- 左侧：图标 + 文字 -->
              <n-flex style="gap: 3px" align="center">
                <n-button text style="font-size: 20px" type="primary">
                  <n-icon>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 16 16">
                      <g fill="none">
                        <path
                          d="M4.968 1.544A.75.75 0 0 1 5.688 1h4.951a.75.75 0 0 1 .703 1.013L10.222 5h2.198a.75.75 0 0 1 .545 1.265l-8.101 8.578a.5.5 0 0 1-.849-.464L5.36 9H3.832a.75.75 0 0 1-.722-.956l1.858-6.5zm.91.456L4.162 8H6a.5.5 0 0 1 .485.621L5.45 12.767L11.84 6H9.5a.5.5 0 0 1-.468-.676L10.279 2H5.877z"
                          fill="currentColor"></path>
                      </g>
                    </svg>
                  </n-icon>
                </n-button>
                <n-text type="primary"> 加速列表</n-text>
              </n-flex>

              <!-- 右侧：手动测速按钮 + 帮助按钮 -->
              <n-flex style="gap: 8px" align="center">
                <n-switch
                  v-model:value="isAutoTest"
                  size="small"
                  :round="false">
                </n-switch>
                <!-- 手动测速按钮 -->
                <n-button
                  size="tiny"
                  round
                  type="primary"
                  @click="testAllEnabledUrls"
                  :loading="isTesting"
                  style="min-width: 80px">
                  <template #icon>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="16"
                      height="16">
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path
                        d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm1-8h4v2h-6V7h2v5z"
                        fill="currentColor" />
                    </svg>
                  </template>
                  {{ isTesting ? "测速中..." : "测速" }}
                </n-button>

                <!-- 帮助按钮（原有的） -->
                <n-tooltip trigger="hover" placement="right">
                  <template #trigger>
                    <n-button text style="font-size: 20px" @click="handleClick">
                      <n-icon>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          viewBox="0 0 16 16">
                          <g fill="none">
                            <path
                              d="M8 2a6 6 0 1 1 0 12A6 6 0 0 1 8 2zm0 8.5A.75.75 0 1 0 8 12a.75.75 0 0 0 0-1.5zm0-6a2 2 0 0 0-2 2a.5.5 0 0 0 1 0a1 1 0 0 1 2 0c0 .37-.083.58-.366.898l-.116.125l-.264.27C7.712 8.36 7.5 8.768 7.5 9.5a.5.5 0 0 0 1 0c0-.37.083-.58.366-.898l.116-.125l.264-.27C9.788 7.64 10 7.232 10 6.5a2 2 0 0 0-2-2z"
                              fill="currentColor"></path>
                          </g>
                        </svg>
                      </n-icon>
                    </n-button>
                  </template>
                  GitHub镜像站点，没有代理的话可以逛逛
                </n-tooltip>
              </n-flex>
            </n-flex>
          </n-h3>
          <n-alert :show-icon="false" :bordered="false">
            开启自动检测后，每次打开GitHub会进行一次测速，测速后将按照速度进行排序。
          </n-alert>
          <n-form-item class="mt-4">
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
                    style="width: 90px" />
                  <n-input
                    v-model:value="value.url"
                    type="text"
                    placeholder="加速地址"
                    style="width: 210px" />
                  <n-text
                    :type="getSpeedTextColor(value)"
                    style="width: 80px; margin-left: 12px"
                    >{{ value.speed || "未测速" }}</n-text
                  >
                </div>
              </template>
            </n-dynamic-input>
          </n-form-item>
          <n-space justify="center"
            ><n-button
              round
              type="primary"
              size="medium"
              strong
              @click="saveConfig">
              <template #icon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 24 24">
                  <g fill="none">
                    <path
                      d="M3 5.75A2.75 2.75 0 0 1 5.75 3h9.964a3.25 3.25 0 0 1 2.299.952l2.035 2.035c.61.61.952 1.437.952 2.299v9.964A2.75 2.75 0 0 1 18.25 21H5.75A2.75 2.75 0 0 1 3 18.25V5.75zM5.75 4.5c-.69 0-1.25.56-1.25 1.25v12.5c0 .69.56 1.25 1.25 1.25H6v-5.25A2.25 2.25 0 0 1 8.25 12h7.5A2.25 2.25 0 0 1 18 14.25v5.25h.25c.69 0 1.25-.56 1.25-1.25V8.286c0-.465-.184-.91-.513-1.238l-2.035-2.035a1.75 1.75 0 0 0-.952-.49V7.25a2.25 2.25 0 0 1-2.25 2.25h-4.5A2.25 2.25 0 0 1 7 7.25V4.5H5.75zm10.75 15v-5.25a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0-.75.75v5.25h9zm-8-15v2.75c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75V4.5h-6z"
                      fill="currentColor"></path>
                  </g>
                </svg>
              </template>
              保存配置
            </n-button>
            <n-button
              round
              type="default"
              size="medium"
              strong
              @click="store.showConfig = false">
              <template #icon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 24 24">
                  <path
                    d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41z"
                    fill="currentColor"></path>
                </svg>
              </template>
              关闭
            </n-button>
          </n-space>
        </n-form>
      </div>
    </n-drawer-content>
  </n-drawer>
</template>
<script setup>
import { ref, computed, watch } from "vue";
import { useStore } from "../utils/store.js";
import {
  NFlex,
  NIcon,
  NTooltip,
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
  NAlert,
} from "naive-ui";
const store = useStore();
const proxyUrlList = ref([]);
const isAutoTest = ref(false);
const projectFileDownloadUrl = ref(null);
const bypassDownload = ref(false);
const clone = ref(true);
const depth = ref(false);
const isTesting = ref(false);
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
const getSpeedTextColor = (item) => {
  if (!item.speed || item.speed === "未测速") return "info";
  if (item.speed === "超时" || item.speed === "-1") return "error";
  const ms = parseFloat(item.speed);
  if (ms < 200) return "success";
  if (ms < 500) return "warning";
  return "error";
};
const onCreate = () => {
  return {
    isCheck: true,
    name: "",
    url: "",
    speed: "未测速",
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
const saveConfig = async () => {
  await testAllEnabledUrls(true);
  GM_setValue("githubFastConfig", {
    projectFileDownloadUrl: projectFileDownloadUrl.value,
    proxyUrlList: proxyUrlList.value,
    isAutoTest: isAutoTest.value,
    bypassDownload: bypassDownload.value,
    clone: clone.value,
    depth: depth.value,
  });
  GM.notification("配置更新成功，请刷新页面！");
};
const measureUrlSpeed = async (url) => {
  try {
    const startTime = performance.now();
    const cleanedUrl = url.replace(/\/+$/, "");
    const response = await fetch(
      `${cleanedUrl}/https://raw.githubusercontent.com/XTLS/Xray-core/main/LICENSE`,
      { method: "HEAD", mode: "no-cors" } // 避免跨域问题
    );
    const endTime = performance.now();
    const speed = endTime - startTime;
    return speed >= 0 ? `${speed.toFixed(0)}ms` : "-1";
  } catch (error) {
    console.error(`测速失败 [${url}]:`, error.message);
    return "超时";
  }
};
async function measureAllUrlsParallel(items) {
  const results = await Promise.all(
    items.map(async (item) => {
      const speed = await measureUrlSpeed(item.url);
      return { url: item.url, speed };
    })
  );
  return results;
}
const testAllEnabledUrls = async (isNotify) => {
  if (isTesting.value) return;
  isTesting.value = true;

  try {
    const toTest = proxyUrlList.value
      .filter((item) => item.isCheck && item.url?.trim())
      .map((item) => ({ ...item }));

    if (toTest.length === 0) {
      GM.notification("没有启用的加速地址");
      return;
    }

    const results = await measureAllUrlsParallel(toTest);

    const updatedList = proxyUrlList.value.map((item) => {
      const result = results.find((r) => r.url === item.url);
      return result ? { ...item, speed: result.speed } : item;
    });

    // 排序逻辑
    const sortedList = updatedList.sort((a, b) => {
      const isValid = (s) =>
        s &&
        s !== "未测速" &&
        s !== "超时" &&
        s !== "-1" &&
        !isNaN(parseFloat(s));
      const validA = isValid(a.speed);
      const validB = isValid(b.speed);

      if (validA && !validB) return -1;
      if (!validA && validB) return 1;
      if (!validA && !validB) return 0;

      return parseFloat(a.speed) - parseFloat(b.speed);
    });

    proxyUrlList.value = sortedList;
    if (isNotify) {
      GM.notification(`测速完成，已检测 ${toTest.length} 个加速地址`);
    }
  } catch (err) {
    if (isNotify) {
      GM.notification("测速失败，请检查网络");
    }
  } finally {
    isTesting.value = false;
  }
};
const initData = () => {
  const config = GM_getValue("githubFastConfig");
  if (config) {
    projectFileDownloadUrl.value = config.projectFileDownloadUrl;
    proxyUrlList.value = config.proxyUrlList;
    bypassDownload.value = config.bypassDownload;
    clone.value = config.clone;
    depth.value = config.depth;
    if (config.isAutoTest) {
      testAllEnabledUrls(false).then(() => {
        config.proxyUrlList = proxyUrlList.value;
        GM_setValue("githubFastConfig", config);
      });
    }
  }
};
initData();
const handleClick = () => {
  window.open("https://gh.noki.eu.org", "_blank");
};
</script>
<style scoped></style>
