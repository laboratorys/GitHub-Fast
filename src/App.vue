<template>
  <n-config-provider :theme="currentTheme">
    <GitHub />
  </n-config-provider>
</template>
<script setup>
import GitHub from "./components/GitHub.vue";
import { NConfigProvider } from "naive-ui";
import { currentTheme } from "./utils/themeMode.js";
</script>
<style scoped></style>
