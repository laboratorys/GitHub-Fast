// ==UserScript==
// @name         GitHub加速下载
// @namespace    https://github.com/laboratorys/github-fast
// @version      1.0.7
// @author       Libs
// @description  可自定义配置的GitHub加速下载脚本
// @license      MIT License
// @icon         https://github.githubassets.com/favicon.ico
// @include      *://github.com/*
// @include      *://github*
// @require      https://scriptcat.org/lib/513/2.0.1/ElementGetter.js#sha256=V0EUYIfbOrr63nT8+W7BP1xEmWcumTLWu2PXFJHh5dg=
// @require      data:application/javascript,window.elmGetter%3DelmGetter
// @require      https://registry.npmmirror.com/vue/3.5.24/files/dist/vue.global.prod.js
// @require      https://registry.npmmirror.com/vue-demi/0.14.10/files/lib/index.iife.js
// @require      data:application/javascript,%3Bwindow.Vue%3DVue%3B
// @require      https://registry.npmmirror.com/jquery/3.7.1/files
// @require      https://unpkg.com/naive-ui@2.43.1/dist/index.prod.js
// @require      https://registry.npmmirror.com/pinia/3.0.4/files/dist/pinia.iife.prod.js
// @grant        GM.notification
// @grant        GM.registerMenuCommand
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==

(function (vue, pinia$1, naiveUi, $) {
  'use strict';

  const useStore = pinia$1.defineStore("main", {
    state: () => ({
      showConfig: false
    })
  });
  const _hoisted_1 = { class: "centered-content" };
  const _hoisted_2 = { style: { "display": "flex", "align-items": "center", "width": "100%" } };
  const _sfc_main$1 = {
    __name: "GitHub",
    setup(__props) {
      const store = useStore();
      const proxyUrlList = vue.ref([]);
      const isAutoTest = vue.ref(false);
      const projectFileDownloadUrl = vue.ref(null);
      const bypassDownload = vue.ref(false);
      const clone = vue.ref(true);
      const depth = vue.ref(false);
      const isTesting = vue.ref(false);
      const projectFileUrlList = vue.computed(() => {
        var hasVal = false;
        proxyUrlList.value.find(function(value) {
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
          disabled: !u.isCheck
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
          speed: "未测速"
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
          depth: depth.value
        });
        GM.notification("配置更新成功，请刷新页面！");
      };
      const measureUrlSpeed = async (url) => {
        try {
          const startTime = performance.now();
          const cleanedUrl = url.replace(/\/+$/, "");
          const response = await fetch(
            `${cleanedUrl}/https://raw.githubusercontent.com/XTLS/Xray-core/main/LICENSE`,
            { method: "HEAD", mode: "no-cors" }
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
          const toTest = proxyUrlList.value.filter((item) => item.isCheck && item.url?.trim()).map((item) => ({ ...item }));
          if (toTest.length === 0) {
            GM.notification("没有启用的加速地址");
            return;
          }
          const results = await measureAllUrlsParallel(toTest);
          const updatedList = proxyUrlList.value.map((item) => {
            const result = results.find((r) => r.url === item.url);
            return result ? { ...item, speed: result.speed } : item;
          });
          const sortedList = updatedList.sort((a, b) => {
            const isValid = (s) => s && s !== "未测速" && s !== "超时" && s !== "-1" && !isNaN(parseFloat(s));
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
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createBlock(vue.unref(naiveUi.NDrawer), {
          show: vue.unref(store).showConfig,
          "onUpdate:show": _cache[7] || (_cache[7] = ($event) => vue.unref(store).showConfig = $event),
          width: 630
        }, {
          default: vue.withCtx(() => [
            vue.createVNode(vue.unref(naiveUi.NDrawerContent), { closable: "" }, {
              header: vue.withCtx(() => [..._cache[8] || (_cache[8] = [
                vue.createTextVNode(" GitHub加速配置 ", -1)
              ])]),
              default: vue.withCtx(() => [
                vue.createElementVNode("div", _hoisted_1, [
                  vue.createVNode(vue.unref(naiveUi.NForm), {
                    "label-placement": "left",
                    "label-width": "auto",
                    size: "medium"
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(vue.unref(naiveUi.NH3), null, {
                        default: vue.withCtx(() => [
                          vue.createVNode(vue.unref(naiveUi.NFlex), { style: { "gap": "3px" } }, {
                            default: vue.withCtx(() => [
                              vue.createVNode(vue.unref(naiveUi.NButton), {
                                text: "",
                                style: { "font-size": "20px" },
                                type: "primary"
                              }, {
                                default: vue.withCtx(() => [
                                  vue.createVNode(vue.unref(naiveUi.NIcon), null, {
                                    default: vue.withCtx(() => [..._cache[9] || (_cache[9] = [
                                      vue.createElementVNode("svg", {
                                        xmlns: "http://www.w3.org/2000/svg",
                                        "xmlns:xlink": "http://www.w3.org/1999/xlink",
                                        viewBox: "0 0 32 32"
                                      }, [
                                        vue.createElementVNode("path", {
                                          d: "M15 8h2v2h-2z",
                                          fill: "currentColor"
                                        }),
                                        vue.createElementVNode("path", {
                                          d: "M19 8h2v2h-2z",
                                          fill: "currentColor"
                                        }),
                                        vue.createElementVNode("path", {
                                          d: "M11 8h2v2h-2z",
                                          fill: "currentColor"
                                        }),
                                        vue.createElementVNode("path", {
                                          d: "M25 16h-8v-3h-2v3H7a2.002 2.002 0 0 0-2 2v6h2v-6h8v6h2v-6h8v6h2v-6a2.002 2.002 0 0 0-2-2z",
                                          fill: "currentColor"
                                        }),
                                        vue.createElementVNode("path", {
                                          d: "M4 26h4v4H4z",
                                          fill: "currentColor"
                                        }),
                                        vue.createElementVNode("path", {
                                          d: "M14 26h4v4h-4z",
                                          fill: "currentColor"
                                        }),
                                        vue.createElementVNode("path", {
                                          d: "M24 26h4v4h-4z",
                                          fill: "currentColor"
                                        }),
                                        vue.createElementVNode("path", {
                                          d: "M11 3h10v2H11z",
                                          fill: "currentColor"
                                        })
                                      ], -1)
                                    ])]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              vue.createVNode(vue.unref(naiveUi.NText), { type: "primary" }, {
                                default: vue.withCtx(() => [..._cache[10] || (_cache[10] = [
                                  vue.createTextVNode(" 分流下载 ", -1)
                                ])]),
                                _: 1
                              }),
                              vue.createVNode(vue.unref(naiveUi.NTooltip), {
                                trigger: "hover",
                                placement: "right"
                              }, {
                                trigger: vue.withCtx(() => [
                                  vue.createVNode(vue.unref(naiveUi.NButton), {
                                    text: "",
                                    style: { "font-size": "20px" }
                                  }, {
                                    default: vue.withCtx(() => [
                                      vue.createVNode(vue.unref(naiveUi.NIcon), null, {
                                        default: vue.withCtx(() => [..._cache[11] || (_cache[11] = [
                                          vue.createElementVNode("svg", {
                                            xmlns: "http://www.w3.org/2000/svg",
                                            "xmlns:xlink": "http://www.w3.org/1999/xlink",
                                            viewBox: "0 0 16 16"
                                          }, [
                                            vue.createElementVNode("g", { fill: "none" }, [
                                              vue.createElementVNode("path", {
                                                d: "M8 2a6 6 0 1 1 0 12A6 6 0 0 1 8 2zm0 8.5A.75.75 0 1 0 8 12a.75.75 0 0 0 0-1.5zm0-6a2 2 0 0 0-2 2a.5.5 0 0 0 1 0a1 1 0 0 1 2 0c0 .37-.083.58-.366.898l-.116.125l-.264.27C7.712 8.36 7.5 8.768 7.5 9.5a.5.5 0 0 0 1 0c0-.37.083-.58.366-.898l.116-.125l.264-.27C9.788 7.64 10 7.232 10 6.5a2 2 0 0 0-2-2z",
                                                fill: "currentColor"
                                              })
                                            ])
                                          ], -1)
                                        ])]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                default: vue.withCtx(() => [
                                  _cache[12] || (_cache[12] = vue.createTextVNode(" 加速按钮只会显示一个，下载时轮询加速 ", -1))
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      vue.createVNode(vue.unref(naiveUi.NFormItem), null, {
                        default: vue.withCtx(() => [
                          vue.createVNode(vue.unref(naiveUi.NSwitch), {
                            value: bypassDownload.value,
                            "onUpdate:value": _cache[0] || (_cache[0] = ($event) => bypassDownload.value = $event),
                            size: "large",
                            round: false
                          }, {
                            checked: vue.withCtx(() => [..._cache[13] || (_cache[13] = [
                              vue.createTextVNode(" 开启 ", -1)
                            ])]),
                            unchecked: vue.withCtx(() => [..._cache[14] || (_cache[14] = [
                              vue.createTextVNode(" 关闭 ", -1)
                            ])]),
                            _: 1
                          }, 8, ["value"])
                        ]),
                        _: 1
                      }),
                      vue.createVNode(vue.unref(naiveUi.NH3), null, {
                        default: vue.withCtx(() => [
                          vue.createVNode(vue.unref(naiveUi.NFlex), { style: { "gap": "3px" } }, {
                            default: vue.withCtx(() => [
                              vue.createVNode(vue.unref(naiveUi.NButton), {
                                text: "",
                                style: { "font-size": "20px" },
                                type: "primary"
                              }, {
                                default: vue.withCtx(() => [
                                  vue.createVNode(vue.unref(naiveUi.NIcon), null, {
                                    default: vue.withCtx(() => [..._cache[15] || (_cache[15] = [
                                      vue.createElementVNode("svg", {
                                        xmlns: "http://www.w3.org/2000/svg",
                                        "xmlns:xlink": "http://www.w3.org/1999/xlink",
                                        viewBox: "0 0 512 512"
                                      }, [
                                        vue.createElementVNode("path", {
                                          d: "M464 0H144c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h320c26.51 0 48-21.49 48-48v-48h48c26.51 0 48-21.49 48-48V48c0-26.51-21.49-48-48-48zM362 464H54a6 6 0 0 1-6-6V150a6 6 0 0 1 6-6h42v224c0 26.51 21.49 48 48 48h224v42a6 6 0 0 1-6 6zm96-96H150a6 6 0 0 1-6-6V54a6 6 0 0 1 6-6h308a6 6 0 0 1 6 6v308a6 6 0 0 1-6 6z",
                                          fill: "currentColor"
                                        })
                                      ], -1)
                                    ])]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              vue.createVNode(vue.unref(naiveUi.NText), { type: "primary" }, {
                                default: vue.withCtx(() => [..._cache[16] || (_cache[16] = [
                                  vue.createTextVNode(" 克隆 ", -1)
                                ])]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      vue.createVNode(vue.unref(naiveUi.NFormItem), null, {
                        default: vue.withCtx(() => [
                          vue.createVNode(vue.unref(naiveUi.NSpace), { "item-style": "display: flex;" }, {
                            default: vue.withCtx(() => [
                              vue.createVNode(vue.unref(naiveUi.NCheckbox), {
                                size: "large",
                                checked: clone.value,
                                "onUpdate:checked": [
                                  _cache[1] || (_cache[1] = ($event) => clone.value = $event),
                                  handleUpdateCloneValue
                                ],
                                label: "git clone"
                              }, null, 8, ["checked"]),
                              vue.createVNode(vue.unref(naiveUi.NCheckbox), {
                                size: "large",
                                checked: depth.value,
                                "onUpdate:checked": [
                                  _cache[2] || (_cache[2] = ($event) => depth.value = $event),
                                  handleUpdateDepthValue
                                ],
                                label: "--depth=1"
                              }, null, 8, ["checked"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      vue.createVNode(vue.unref(naiveUi.NH3), null, {
                        default: vue.withCtx(() => [
                          vue.createVNode(vue.unref(naiveUi.NFlex), { style: { "gap": "3px" } }, {
                            default: vue.withCtx(() => [
                              vue.createVNode(vue.unref(naiveUi.NButton), {
                                text: "",
                                style: { "font-size": "20px" },
                                type: "primary"
                              }, {
                                default: vue.withCtx(() => [
                                  vue.createVNode(vue.unref(naiveUi.NIcon), null, {
                                    default: vue.withCtx(() => [..._cache[17] || (_cache[17] = [
                                      vue.createElementVNode("svg", {
                                        xmlns: "http://www.w3.org/2000/svg",
                                        "xmlns:xlink": "http://www.w3.org/1999/xlink",
                                        viewBox: "0 0 24 24"
                                      }, [
                                        vue.createElementVNode("g", { fill: "none" }, [
                                          vue.createElementVNode("path", {
                                            d: "M4.25 4A2.25 2.25 0 0 0 2 6.25v2.5A2.25 2.25 0 0 0 4.25 11h2.5A2.25 2.25 0 0 0 9 8.75v-2.5A2.25 2.25 0 0 0 6.75 4h-2.5zM3.5 6.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1-.75-.75v-2.5zM11.25 5a.75.75 0 0 0 0 1.5h10a.75.75 0 0 0 0-1.5h-10zm0 3a.75.75 0 0 0 0 1.5h7a.75.75 0 0 0 0-1.5h-7zm-7 5A2.25 2.25 0 0 0 2 15.25v2.5A2.25 2.25 0 0 0 4.25 20h2.5A2.25 2.25 0 0 0 9 17.75v-2.5A2.25 2.25 0 0 0 6.75 13h-2.5zm-.75 2.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1-.75-.75v-2.5zM11.25 14a.75.75 0 0 0 0 1.5h10a.75.75 0 0 0 0-1.5h-10zm0 3a.75.75 0 0 0 0 1.5h7a.75.75 0 0 0 0-1.5h-7z",
                                            fill: "currentColor"
                                          })
                                        ])
                                      ], -1)
                                    ])]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              vue.createVNode(vue.unref(naiveUi.NText), { type: "primary" }, {
                                default: vue.withCtx(() => [..._cache[18] || (_cache[18] = [
                                  vue.createTextVNode(" 仓库文件加速 ", -1)
                                ])]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      vue.createVNode(vue.unref(naiveUi.NFormItem), null, {
                        default: vue.withCtx(() => [
                          vue.createVNode(vue.unref(naiveUi.NSelect), {
                            value: projectFileDownloadUrl.value,
                            "onUpdate:value": _cache[3] || (_cache[3] = ($event) => projectFileDownloadUrl.value = $event),
                            options: projectFileUrlList.value,
                            filterable: "",
                            placeholder: "选择加速地址"
                          }, {
                            arrow: vue.withCtx(() => [
                              vue.createVNode(vue.Transition, { name: "slide-left" }, {
                                default: vue.withCtx(() => [..._cache[19] || (_cache[19] = [
                                  vue.createElementVNode("svg", {
                                    xmlns: "http://www.w3.org/2000/svg",
                                    "xmlns:xlink": "http://www.w3.org/1999/xlink",
                                    viewBox: "0 0 16 16"
                                  }, [
                                    vue.createElementVNode("g", { fill: "none" }, [
                                      vue.createElementVNode("path", {
                                        d: "M3.689 1a.75.75 0 0 0-.721.544l-1.858 6.5A.75.75 0 0 0 1.832 9H3.36l-1.345 5.379a.5.5 0 0 0 .849.464l2.428-2.57a5.47 5.47 0 0 1-.26-1.181l-1.583 1.675l1.036-4.146A.5.5 0 0 0 4 8H2.163l1.714-6H8.28L7.032 5.324a.5.5 0 0 0 .332.657A5.474 5.474 0 0 1 10.42 5H8.222l1.12-2.987A.75.75 0 0 0 8.639 1H3.69zM10.5 15a4.5 4.5 0 1 0 0-9a4.5 4.5 0 0 0 0 9zm2.354-5.646l-3 3a.5.5 0 0 1-.707 0l-1-1a.5.5 0 0 1 .707-.708l.646.647l2.646-2.647a.5.5 0 1 1 .708.708z",
                                        fill: "currentColor"
                                      })
                                    ])
                                  ], -1)
                                ])]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["value", "options"])
                        ]),
                        _: 1
                      }),
                      vue.createVNode(vue.unref(naiveUi.NH3), null, {
                        default: vue.withCtx(() => [
                          vue.createVNode(vue.unref(naiveUi.NFlex), {
                            style: { "gap": "3px" },
                            align: "center",
                            justify: "space-between"
                          }, {
                            default: vue.withCtx(() => [
                              vue.createVNode(vue.unref(naiveUi.NFlex), {
                                style: { "gap": "3px" },
                                align: "center"
                              }, {
                                default: vue.withCtx(() => [
                                  vue.createVNode(vue.unref(naiveUi.NButton), {
                                    text: "",
                                    style: { "font-size": "20px" },
                                    type: "primary"
                                  }, {
                                    default: vue.withCtx(() => [
                                      vue.createVNode(vue.unref(naiveUi.NIcon), null, {
                                        default: vue.withCtx(() => [..._cache[20] || (_cache[20] = [
                                          vue.createElementVNode("svg", {
                                            xmlns: "http://www.w3.org/2000/svg",
                                            "xmlns:xlink": "http://www.w3.org/1999/xlink",
                                            viewBox: "0 0 16 16"
                                          }, [
                                            vue.createElementVNode("g", { fill: "none" }, [
                                              vue.createElementVNode("path", {
                                                d: "M4.968 1.544A.75.75 0 0 1 5.688 1h4.951a.75.75 0 0 1 .703 1.013L10.222 5h2.198a.75.75 0 0 1 .545 1.265l-8.101 8.578a.5.5 0 0 1-.849-.464L5.36 9H3.832a.75.75 0 0 1-.722-.956l1.858-6.5zm.91.456L4.162 8H6a.5.5 0 0 1 .485.621L5.45 12.767L11.84 6H9.5a.5.5 0 0 1-.468-.676L10.279 2H5.877z",
                                                fill: "currentColor"
                                              })
                                            ])
                                          ], -1)
                                        ])]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  vue.createVNode(vue.unref(naiveUi.NText), { type: "primary" }, {
                                    default: vue.withCtx(() => [..._cache[21] || (_cache[21] = [
                                      vue.createTextVNode(" 加速列表", -1)
                                    ])]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              vue.createVNode(vue.unref(naiveUi.NFlex), {
                                style: { "gap": "8px" },
                                align: "center"
                              }, {
                                default: vue.withCtx(() => [
                                  vue.createVNode(vue.unref(naiveUi.NSwitch), {
                                    value: isAutoTest.value,
                                    "onUpdate:value": _cache[4] || (_cache[4] = ($event) => isAutoTest.value = $event),
                                    size: "small",
                                    round: false
                                  }, null, 8, ["value"]),
                                  vue.createVNode(vue.unref(naiveUi.NButton), {
                                    size: "tiny",
                                    round: "",
                                    type: "primary",
                                    onClick: testAllEnabledUrls,
                                    loading: isTesting.value,
                                    style: { "min-width": "80px" }
                                  }, {
                                    icon: vue.withCtx(() => [..._cache[22] || (_cache[22] = [
                                      vue.createElementVNode("svg", {
                                        xmlns: "http://www.w3.org/2000/svg",
                                        viewBox: "0 0 24 24",
                                        width: "16",
                                        height: "16"
                                      }, [
                                        vue.createElementVNode("path", {
                                          fill: "none",
                                          d: "M0 0h24v24H0z"
                                        }),
                                        vue.createElementVNode("path", {
                                          d: "M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm1-8h4v2h-6V7h2v5z",
                                          fill: "currentColor"
                                        })
                                      ], -1)
                                    ])]),
                                    default: vue.withCtx(() => [
                                      vue.createTextVNode(" " + vue.toDisplayString(isTesting.value ? "测速中..." : "测速"), 1)
                                    ]),
                                    _: 1
                                  }, 8, ["loading"]),
                                  vue.createVNode(vue.unref(naiveUi.NTooltip), {
                                    trigger: "hover",
                                    placement: "right"
                                  }, {
                                    trigger: vue.withCtx(() => [
                                      vue.createVNode(vue.unref(naiveUi.NButton), {
                                        text: "",
                                        style: { "font-size": "20px" },
                                        onClick: handleClick
                                      }, {
                                        default: vue.withCtx(() => [
                                          vue.createVNode(vue.unref(naiveUi.NIcon), null, {
                                            default: vue.withCtx(() => [..._cache[23] || (_cache[23] = [
                                              vue.createElementVNode("svg", {
                                                xmlns: "http://www.w3.org/2000/svg",
                                                "xmlns:xlink": "http://www.w3.org/1999/xlink",
                                                viewBox: "0 0 16 16"
                                              }, [
                                                vue.createElementVNode("g", { fill: "none" }, [
                                                  vue.createElementVNode("path", {
                                                    d: "M8 2a6 6 0 1 1 0 12A6 6 0 0 1 8 2zm0 8.5A.75.75 0 1 0 8 12a.75.75 0 0 0 0-1.5zm0-6a2 2 0 0 0-2 2a.5.5 0 0 0 1 0a1 1 0 0 1 2 0c0 .37-.083.58-.366.898l-.116.125l-.264.27C7.712 8.36 7.5 8.768 7.5 9.5a.5.5 0 0 0 1 0c0-.37.083-.58.366-.898l.116-.125l.264-.27C9.788 7.64 10 7.232 10 6.5a2 2 0 0 0-2-2z",
                                                    fill: "currentColor"
                                                  })
                                                ])
                                              ], -1)
                                            ])]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    default: vue.withCtx(() => [
                                      _cache[24] || (_cache[24] = vue.createTextVNode(" GitHub镜像站点，没有代理的话可以逛逛 ", -1))
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      vue.createVNode(vue.unref(naiveUi.NAlert), {
                        "show-icon": false,
                        bordered: false
                      }, {
                        default: vue.withCtx(() => [..._cache[25] || (_cache[25] = [
                          vue.createTextVNode(" 开启自动检测后，每次打开GitHub会进行一次测速，测速后将按照速度进行排序。 ", -1)
                        ])]),
                        _: 1
                      }),
                      vue.createVNode(vue.unref(naiveUi.NFormItem), { class: "mt-4" }, {
                        default: vue.withCtx(() => [
                          vue.createVNode(vue.unref(naiveUi.NDynamicInput), {
                            value: proxyUrlList.value,
                            "onUpdate:value": _cache[5] || (_cache[5] = ($event) => proxyUrlList.value = $event),
                            "show-sort-button": "",
                            "on-create": onCreate
                          }, {
                            "create-button-default": vue.withCtx(() => [..._cache[26] || (_cache[26] = [
                              vue.createTextVNode(" 添加 ", -1)
                            ])]),
                            default: vue.withCtx(({ value }) => [
                              vue.createElementVNode("div", _hoisted_2, [
                                vue.createVNode(vue.unref(naiveUi.NCheckbox), {
                                  checked: value.isCheck,
                                  "onUpdate:checked": ($event) => value.isCheck = $event,
                                  style: { "margin-right": "12px" }
                                }, null, 8, ["checked", "onUpdate:checked"]),
                                vue.createVNode(vue.unref(naiveUi.NInput), {
                                  class: "mr-2",
                                  value: value.name,
                                  "onUpdate:value": ($event) => value.name = $event,
                                  type: "text",
                                  placeholder: "名称",
                                  style: { "width": "90px" }
                                }, null, 8, ["value", "onUpdate:value"]),
                                vue.createVNode(vue.unref(naiveUi.NInput), {
                                  value: value.url,
                                  "onUpdate:value": ($event) => value.url = $event,
                                  type: "text",
                                  placeholder: "加速地址",
                                  style: { "width": "210px" }
                                }, null, 8, ["value", "onUpdate:value"]),
                                vue.createVNode(vue.unref(naiveUi.NText), {
                                  type: getSpeedTextColor(value),
                                  style: { "width": "80px", "margin-left": "12px" }
                                }, {
                                  default: vue.withCtx(() => [
                                    vue.createTextVNode(vue.toDisplayString(value.speed || "未测速"), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["type"])
                              ])
                            ]),
                            _: 1
                          }, 8, ["value"])
                        ]),
                        _: 1
                      }),
                      vue.createVNode(vue.unref(naiveUi.NSpace), { justify: "center" }, {
                        default: vue.withCtx(() => [
                          vue.createVNode(vue.unref(naiveUi.NButton), {
                            round: "",
                            type: "primary",
                            size: "medium",
                            strong: "",
                            onClick: saveConfig
                          }, {
                            icon: vue.withCtx(() => [..._cache[27] || (_cache[27] = [
                              vue.createElementVNode("svg", {
                                xmlns: "http://www.w3.org/2000/svg",
                                "xmlns:xlink": "http://www.w3.org/1999/xlink",
                                viewBox: "0 0 24 24"
                              }, [
                                vue.createElementVNode("g", { fill: "none" }, [
                                  vue.createElementVNode("path", {
                                    d: "M3 5.75A2.75 2.75 0 0 1 5.75 3h9.964a3.25 3.25 0 0 1 2.299.952l2.035 2.035c.61.61.952 1.437.952 2.299v9.964A2.75 2.75 0 0 1 18.25 21H5.75A2.75 2.75 0 0 1 3 18.25V5.75zM5.75 4.5c-.69 0-1.25.56-1.25 1.25v12.5c0 .69.56 1.25 1.25 1.25H6v-5.25A2.25 2.25 0 0 1 8.25 12h7.5A2.25 2.25 0 0 1 18 14.25v5.25h.25c.69 0 1.25-.56 1.25-1.25V8.286c0-.465-.184-.91-.513-1.238l-2.035-2.035a1.75 1.75 0 0 0-.952-.49V7.25a2.25 2.25 0 0 1-2.25 2.25h-4.5A2.25 2.25 0 0 1 7 7.25V4.5H5.75zm10.75 15v-5.25a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0-.75.75v5.25h9zm-8-15v2.75c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75V4.5h-6z",
                                    fill: "currentColor"
                                  })
                                ])
                              ], -1)
                            ])]),
                            default: vue.withCtx(() => [
                              _cache[28] || (_cache[28] = vue.createTextVNode(" 保存配置 ", -1))
                            ]),
                            _: 1
                          }),
                          vue.createVNode(vue.unref(naiveUi.NButton), {
                            round: "",
                            type: "default",
                            size: "medium",
                            strong: "",
                            onClick: _cache[6] || (_cache[6] = ($event) => vue.unref(store).showConfig = false)
                          }, {
                            icon: vue.withCtx(() => [..._cache[29] || (_cache[29] = [
                              vue.createElementVNode("svg", {
                                xmlns: "http://www.w3.org/2000/svg",
                                "xmlns:xlink": "http://www.w3.org/1999/xlink",
                                viewBox: "0 0 24 24"
                              }, [
                                vue.createElementVNode("path", {
                                  d: "M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41z",
                                  fill: "currentColor"
                                })
                              ], -1)
                            ])]),
                            default: vue.withCtx(() => [
                              _cache[30] || (_cache[30] = vue.createTextVNode(" 关闭 ", -1))
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ])
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["show"]);
      };
    }
  };
  const colorMode = vue.ref(
    document.querySelector("html").getAttribute("data-color-mode")
  );
  const currentTheme = vue.ref(naiveUi.lightTheme);
  const updateThemeMode = () => {
    currentTheme.value = mql.matches ? naiveUi.darkTheme : naiveUi.lightTheme;
  };
  const mql = window.matchMedia("(prefers-color-scheme: dark)");
  mql.addEventListener("change", updateThemeMode);
  const initThemeMode = (mode) => {
    if (mode === "dark") {
      currentTheme.value = naiveUi.darkTheme;
    } else if (mode === "auto") {
      updateThemeMode();
    } else {
      currentTheme.value = naiveUi.lightTheme;
    }
  };
  initThemeMode(colorMode.value);
  new MutationObserver((mutationsList) => {
    for (let mutation of mutationsList) {
      if (mutation.type === "attributes" && mutation.attributeName === "data-color-mode") {
        colorMode.value = document.querySelector("html").getAttribute("data-color-mode");
        initThemeMode(colorMode.value);
      }
    }
  }).observe(document.querySelector("html"), { attributes: true });
  const _sfc_main = {
    __name: "App",
    setup(__props) {
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createBlock(vue.unref(naiveUi.NConfigProvider), { theme: vue.unref(currentTheme) }, {
          default: vue.withCtx(() => [
            vue.createVNode(_sfc_main$1)
          ]),
          _: 1
        }, 8, ["theme"]);
      };
    }
  };
  function run(elmGetter) {
    const config = GM_getValue("githubFastConfig");
    const store = useStore();
    const injectCSS = () => {
      const style = document.createElement("style");
      style.innerHTML = `
      .react-directory-filename-column { display: flex !important; align-items: center !important; flex-direction: row !important; }
      .react-directory-filename-column:hover > svg:first-child { display: none !important; }
      .react-directory-filename-column:hover .fileDownLink { display: inline-flex !important; }
      .fileDownLink { display: none !important; margin-right: 8px; flex-shrink: 0; vertical-align: middle; }
      .react-directory-filename-column .Link--primary { word-break: break-all; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .fast-clone-wrapper { margin-top: 12px; width: 100%; border: none !important; }
      .palegreen { color: palegreen; font-weight: 600; font-size: 12px; margin-bottom: 6px; display: block; }
      .fast-clone-row { display: flex !important; align-items: center !important; gap: 8px; margin-top: 8px; }
      .fast-clone-row input { flex-grow: 1; width: 0; }
      .fast-copy-btn {
        color: var(--button-invisible-iconColor-rest, #59636e);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 5px;
        border-radius: 6px;
        border: 1px solid var(--color-border-default);
        background: var(--color-canvas-subtle);
        transition: all 0.2s;
        width: 28px;
        height: 28px;
      }
      .fast-copy-btn:hover {
        background: var(--color-canvas-higher);
        color: var(--color-accent-fg);
        border-color: var(--color-accent-fg);
      }
      .fast-copy-btn.copied {
        color: var(--fgColor-success, var(--color-success-fg)) !important;
        border-color: var(--color-success-fg) !important;
      }
      .fast-release { display: inline-flex !important; margin-left: 12px; align-items: center; vertical-align: middle; }
    `;
      document.head.appendChild(style);
    };
    injectCSS();
    const ICON_COPY = `<path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>`;
    const ICON_CHECK = `<path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"></path>`;
    GM.registerMenuCommand("加速配置", () => {
      store.showConfig = true;
    });
    var MirrorUrl = pollingUrl();
    if (MirrorUrl.length == 0) return;
    function setListDownBtn() {
      const $table = $("table[aria-labelledby='folders-and-files']");
      if ($table.length === 0) return;
      $table.find("tr").each(function() {
        const $row = $(this);
        if ($row.data("has-down-btn")) return;
        const $nameCol = $row.find("div.react-directory-filename-column");
        if ($nameCol.length > 0) {
          const $svg = $nameCol.find("svg:first");
          if (!($svg.attr("class") || "").includes("icon-directory")) {
            $row.data("has-down-btn", true);
            var dLink = $nameCol.find('a[class="Link--primary"]').attr("href");
            if (dLink) {
              const downloadUrl = (config?.projectFileDownloadUrl || MirrorUrl[0].url) + "/https://github.com" + dLink;
              $svg.after(
                `<a href="${downloadUrl}" target="_blank" class="fileDownLink" title="下载文件"><svg viewBox="0 0 1024 1024" width="16" height="16"><path d="M508.746667 299.2L485.333333 452.373333a5.333333 5.333333 0 0 0 4 5.973334l217.386667 53.333333a5.333333 5.333333 0 0 1 2.72 8.693333l-184.906667 208.8a5.333333 5.333333 0 0 1-9.28-4.32l23.413334-153.226666a5.333333 5.333333 0 0 0-4-5.973334L317.173333 512a5.333333 5.333333 0 0 1-2.506666-8.48l184.8-208.693333a5.333333 5.333333 0 0 1 9.28 4.373333z m-329.493334 256l271.253334 66.666667a5.333333 5.333333 0 0 1 4 5.973333l-51.04 335.68a5.333333 5.333333 0 0 0 9.226666 4.32l434.773334-490.346667a5.333333 5.333333 0 0 0-2.72-8.693333l-271.253334-66.666667a5.333333 5.333333 0 0 1-4-5.973333l51.04-335.626667a5.333333 5.333333 0 0 0-9.226666-4.373333L176.533333 546.506667a5.333333 5.333333 0 0 0 2.72 8.693333z" fill="#57606a"></path></svg></a>`
              );
            }
          }
        }
      });
    }
    function setRawBtn() {
      if (!window.location.pathname.includes("/blob/")) return;
      const $sourceBtn = $('a[data-testid="raw-button"]');
      if ($sourceBtn.length === 0 || $sourceBtn.parent().data("has-fast-raw"))
        return;
      const $container = $sourceBtn.parent();
      const rawUrl = $sourceBtn.attr("href");
      if (!rawUrl) return;
      $container.data("has-fast-raw", true);
      MirrorUrl.forEach((u) => {
        var url = u.url + "/" + rawUrl;
        var rawCloneBtn = $sourceBtn.first().clone().addClass("fast-raw").text(u.name).attr("href", url).attr("target", "_blank").css({
          "border-radius": "0",
          "border-left": "none",
          display: "inline-flex",
          "align-items": "center"
        });
        $sourceBtn.last().after(rawCloneBtn);
      });
    }
    function setReleaseBtn() {
      if (!window.location.pathname.includes("/releases") && !window.location.pathname.match(/\/releases\/tag\//))
        return;
      $(
        "div.Box--condensed ul li, div[data-testid='check-run-header'] + div ul li"
      ).each(function() {
        const $li = $(this);
        if ($li.data("has-fast-release") || $li.find(".fast-release").length > 0)
          return;
        const $anchor = $li.find("a").first();
        const releasePath = $anchor.attr("href");
        if (!releasePath || releasePath.includes("#") || releasePath.includes("archive"))
          return;
        $li.data("has-fast-release", true);
        const urls = MirrorUrl.map(
          (u) => u.url + "/https://github.com" + releasePath
        );
        const aHtml = urls.map(
          (u, i) => `<a href="${u}" rel="nofollow" class="Truncate ml-1"><span class="Truncate-text text-bold" style="color:palegreen">${MirrorUrl[i].name}</span></a>`
        ).join("");
        $li.append(
          `<div class="fast-release"><svg width="14" height="14" viewBox="0 0 1024 1024" style="vertical-align: middle; margin-right: 4px;"><path d="M508.746667 299.2L485.333333 452.373333a5.333333 5.333333 0 0 0 4 5.973334l217.386667 53.333333a5.333333 5.333333 0 0 1 2.72 8.693333l-184.906667 208.8a5.333333 5.333333 0 0 1-9.28-4.32l23.413334-153.226666a5.333333 5.333333 0 0 0-4-5.973334L317.173333 512a5.333333 5.333333 0 0 1-2.506666-8.48l184.8-208.693333a5.333333 5.333333 0 0 1 9.28 4.373333z m-329.493334 256l271.253334 66.666667a5.333333 5.333333 0 0 1 4 5.973333l-51.04 335.68a5.333333 5.333333 0 0 0 9.226666 4.32l434.773334-490.346667a5.333333 5.333333 0 0 0-2.72-8.693333l-271.253334-66.666667a5.333333 5.333333 0 0 1-4-5.973333l51.04-335.626667a5.333333 5.333333 0 0 0-9.226666-4.373333L176.533333 546.506667a5.333333 5.333333 0 0 0 2.72 8.693333z" fill="#57606a"></path></svg>${aHtml}</div>`
        );
      });
    }
    function addCloneList() {
      const $portal = $("#__primerPortalRoot__");
      if (!$portal.length) return;
      const $nativeInput = $portal.find('input[value^="https://github.com"]').first();
      if (!$nativeInput.length) {
        $portal.find(".fast-clone-wrapper").remove();
        return;
      }
      if ($portal.find(".fast-clone-wrapper").length > 0) return;
      const gitUrl = $nativeInput.val();
      let info = `<div class="fast-clone-wrapper"><span class="palegreen">加速地址</span>`;
      MirrorUrl.forEach((u) => {
        let Url = u.url + "/" + gitUrl;
        if (config?.clone)
          Url = config.depth ? `git clone --depth=1 ${Url}` : `git clone ${Url}`;
        info += `
        <div class="fast-clone-row">
          <input type="text" class="form-control input-monospace input-sm color-bg-subtle" readonly value="${Url}" style="height: 32px;" />
          <div class="fast-copy-btn" data-url="${Url}" title="复制加速地址">
            <svg aria-hidden="true" height="16" viewBox="0 0 16 16" width="16" fill="currentColor">${ICON_COPY}</svg>
          </div>
        </div>`;
      });
      info += `</div>`;
      const $targetText = $portal.find("p.color-fg-muted, p.text-normal, p.color-fg-default").first();
      const $html = $(info);
      $html.find(".fast-copy-btn").on("click", function() {
        const $btn = $(this);
        const url = $btn.data("url");
        navigator.clipboard.writeText(url).then(() => {
          const $svg = $btn.find("svg");
          $btn.addClass("copied");
          $svg.html(ICON_CHECK);
          setTimeout(() => {
            $btn.removeClass("copied");
            $svg.html(ICON_COPY);
          }, 2e3);
        });
      });
      $targetText.length ? $targetText.before($html) : $nativeInput.parent().after($html);
    }
    function addDownZipList() {
      const $portal = $("#__primerPortalRoot__");
      const $ul = $portal.find("ul:last");
      if (!$ul.length || $ul.find(".fast-zip").length > 0) return;
      let $zipLi = $ul.find("li").filter((_, el) => $(el).find('a[href$=".zip"]').length).first();
      if (!$zipLi.length) return;
      MirrorUrl.forEach((u) => {
        let $li = $zipLi.clone().addClass("fast-zip");
        var originalHref = $li.find("a").attr("href");
        var Url = u.url + "/https://github.com" + originalHref;
        $li.find("a").attr("href", Url).find("span").last().text(`Fast ZIP [${u.name}]`).css("color", "palegreen");
        $ul.append($li);
      });
    }
    let rAFId = null;
    function callback() {
      if (rAFId) cancelAnimationFrame(rAFId);
      rAFId = requestAnimationFrame(() => {
        setListDownBtn();
        setRawBtn();
        setReleaseBtn();
        const $portal = $("#__primerPortalRoot__");
        if ($portal.length && $portal.children().length > 0) {
          addCloneList();
          if ($portal.find("a[href*='.zip']").length) addDownZipList();
        }
      });
    }
    function pollingUrl() {
      const filteredUrlList = (config?.proxyUrlList || []).filter(
        (item) => item.isCheck
      );
      if (config?.bypassDownload && filteredUrlList.length > 0) {
        var index = (GM_getValue("MirrorUrlIndex") || 0) % filteredUrlList.length;
        GM_setValue("MirrorUrlIndex", index + 1);
        return [filteredUrlList[index]];
      }
      return filteredUrlList;
    }
    const observer = new MutationObserver(callback);
    observer.observe(document.body, {
      attributes: true,
      childList: true,
      subtree: true
    });
    callback();
  }
  const pinia = pinia$1.createPinia();
  const app = vue.createApp(_sfc_main);
  app.use(pinia);
  app.mount(
    (() => {
      const app2 = document.createElement("div");
      document.body.append(app2);
      run();
      return app2;
    })()
  );

})(Vue, Pinia, naive, jQuery);