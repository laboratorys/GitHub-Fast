<template>
  <n-config-provider :theme="currentTheme" preflight-style-disabled>
    <GitHub />
  </n-config-provider>
</template>
<script setup>
import { NConfigProvider } from "naive-ui";
import GitHub from "./components/GitHub.vue";
import { currentTheme } from "./utils/themeMode.js";
</script>
<style scoped></style>
