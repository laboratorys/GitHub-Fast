import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import monkey, { cdn, util } from "vite-plugin-monkey";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    monkey({
      entry: "src/main.js",
      userscript: {
        name: "GitHub加速下载",
        icon: "https://github.githubassets.com/favicon.ico",
        namespace: "https://github.com/laboratorys/github-fast",
        author: "Libs",
        include: ["*://github.com/*", "*://github*"],
        license: "MIT License",
        description: "可自定义配置的GitHub加速下载脚本",
        require: [
          "https://scriptcat.org/lib/513/2.0.1/ElementGetter.js#sha256=V0EUYIfbOrr63nT8+W7BP1xEmWcumTLWu2PXFJHh5dg=",
          util.dataUrl(`window.elmGetter=elmGetter`),
        ],
        version: "1.0.0",
      },
      build: {
        externalGlobals: {
          vue: cdn
            .npmmirror("Vue", "dist/vue.global.prod.js")
            .concat(
              "https://registry.npmmirror.com/vue-demi/0.14.10/files/lib/index.iife.js"
            ),
          jquery: cdn.npmmirror("jQuery"),
          //"naive-ui": cdn.unpkg("naive-ui", 'dist/index.prod.js'),
          pinia: cdn.npmmirror("Pinia", "dist/pinia.iife.prod.js"),
        },
      },
      server: { mountGmApi: true },
    }),
  ],
  server: {
    host: "127.0.0.1",
    port: 8991,
    // 是否开启 https
    https: false,
  },
});
