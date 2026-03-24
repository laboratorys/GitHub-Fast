# Github-Fast

**Github 加速下载[油猴脚本](https://greasyfork.org/zh-CN/scripts/504224-github%E5%8A%A0%E9%80%9F%E4%B8%8B%E8%BD%BD)（自用）**

## 特性

1. 本项目默认不提供镜像或代理地址，安装完插件后，必须进行设置加速地址后才可使用，推荐自建加速代理[gh-proxy](https://github.com/hunshcn/gh-proxy) 或~~逛逛 [github-mirror](https://github-mirror.xiaoxuan6.me)~~[我的](https://gh.noki.eu.org)
2. 支持`git clone`和`--depth=1`
3. 支持 Repository、Release、Raw、Clone、Source Code
4. 支持自定义加速列表、排序
5. 支持分流下载
6. 配置页面的明暗主题与 GitHub 保持一致
7. 【新】支持代理测速

## 配置

[greasyfork](https://greasyfork.org/zh-CN/scripts/504224-github%E5%8A%A0%E9%80%9F%E4%B8%8B%E8%BD%BD)脚本安装后打开菜单

![alt text](https://cdn.jsdelivr.net/gh/laboratorys/GitHub-Fast@main/docs/%E6%88%AA%E5%9B%BE2.png)

![alt text](https://cdn.jsdelivr.net/gh/laboratorys/GitHub-Fast@main/docs/%E6%88%AA%E5%9B%BE1.png)

## 初衷

由于扩展[Fast-GitHub](https://fhefh2015.github.io/Fast-GitHub/)已下架，油猴脚本大部分都内置了三方镜像，安全性未知，手动修改又比较麻烦，所以就有了造轮子的想法，顺便也学下脚本开发。

## 反馈

[issues](https://github.com/laboratorys/GitHub-Fast/issues)

## 更新日志

### v1.0.7-2026/03/24

#### Bug Fix

- 优化加速下载显示

### v1.0.6-2026/03/03

#### Bug Fix

- 解决Release页面加速链接不显示

### v1.0.5

#### Bug Fix

- 避免分支面板显示源码包下载按钮

### v1.0.4-2025/11/10

#### Bug Fix

- 修复 `Release` 下载按钮垂直居中
- `Raw`按钮样式调整
- 修复安装其他插件导致的`Code`面板显示异常
- 修复非登录状态下`Code`面板显示异常
- 更新依赖

#### Feature

- 新增加速地址测速功能

### v1.0.3-2025/04/24

- 列表文件无法加速下载
- 源码包下载按钮显示异常
- 加速列表需要勾选生效
- 更新依赖

### v1.0.2-2024/12/07

- 优化配置页面
- naive-ui 使用 CDN 缩小脚本体积
- 更新依赖

### v1.0.1-2024/12/06

- 修复加速按钮不显示的问题

### v1.0.0

- 初版

## 鸣谢（排名不分先后）

[vite-plugin-monkey](https://github.com/lisonge/vite-plugin-monkey)、[Fast-GitHub](https://fhefh2015.github.io/Fast-GitHub/)、[XIU2/UserScript](https://github.com/XIU2/UserScript)、[FastGithub](https://github.com/RC1844/FastGithub)
