// ==UserScript==
// @name         GitHub加速下载
// @namespace    https://github.com/laboratorys/github-fast
// @version      1.0.0
// @author       Libs
// @description  可自定义配置的GitHub加速下载脚本
// @license      MIT License
// @icon         https://github.githubassets.com/favicon.ico
// @include      *://github.com/*
// @include      *://github*
// @require      https://registry.npmmirror.com/vue/3.4.38/files/dist/vue.global.prod.js
// @require      https://registry.npmmirror.com/vue-demi/0.14.10/files/lib/index.iife.js
// @require      https://registry.npmmirror.com/jquery/3.7.1/files
// @require      https://registry.npmmirror.com/pinia/2.2.2/files/dist/pinia.iife.prod.js
// @grant        GM.notification
// @grant        GM.registerMenuCommand
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==

(function (vue, pinia, $) {
  'use strict';

  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var require_main_001 = __commonJS({
    "main-C7YDsW3n.js"(exports, module) {
      const useStore = pinia.defineStore("main", {
        state: () => ({
          showConfig: false
        })
      });
      let onceCbs = [];
      const paramsMap = /* @__PURE__ */ new WeakMap();
      function flushOnceCallbacks() {
        onceCbs.forEach((cb) => cb(...paramsMap.get(cb)));
        onceCbs = [];
      }
      function beforeNextFrameOnce(cb, ...params) {
        paramsMap.set(cb, params);
        if (onceCbs.includes(cb))
          return;
        onceCbs.push(cb) === 1 && requestAnimationFrame(flushOnceCallbacks);
      }
      function happensIn(e, dataSetPropName) {
        let { target } = e;
        while (target) {
          if (target.dataset) {
            if (target.dataset[dataSetPropName] !== void 0)
              return true;
          }
          target = target.parentElement;
        }
        return false;
      }
      function getPreciseEventTarget(event) {
        return event.composedPath()[0] || null;
      }
      function depx(value) {
        if (typeof value === "string") {
          if (value.endsWith("px")) {
            return Number(value.slice(0, value.length - 2));
          }
          return Number(value);
        }
        return value;
      }
      function pxfy(value) {
        if (value === void 0 || value === null)
          return void 0;
        if (typeof value === "number")
          return `${value}px`;
        if (value.endsWith("px"))
          return value;
        return `${value}px`;
      }
      function getMargin(value, position) {
        const parts = value.trim().split(/\s+/g);
        const margin = {
          top: parts[0]
        };
        switch (parts.length) {
          case 1:
            margin.right = parts[0];
            margin.bottom = parts[0];
            margin.left = parts[0];
            break;
          case 2:
            margin.right = parts[1];
            margin.left = parts[1];
            margin.bottom = parts[0];
            break;
          case 3:
            margin.right = parts[1];
            margin.bottom = parts[2];
            margin.left = parts[1];
            break;
          case 4:
            margin.right = parts[1];
            margin.bottom = parts[2];
            margin.left = parts[3];
            break;
          default:
            throw new Error("[seemly/getMargin]:" + value + " is not a valid value.");
        }
        if (position === void 0)
          return margin;
        return margin[position];
      }
      function getGap(value, orient) {
        const [rowGap, colGap] = value.split(" ");
        return {
          row: rowGap,
          col: colGap || rowGap
        };
      }
      const colors = {
        black: "#000",
        silver: "#C0C0C0",
        gray: "#808080",
        white: "#FFF",
        maroon: "#800000",
        red: "#F00",
        purple: "#800080",
        fuchsia: "#F0F",
        green: "#008000",
        lime: "#0F0",
        olive: "#808000",
        yellow: "#FF0",
        navy: "#000080",
        blue: "#00F",
        teal: "#008080",
        aqua: "#0FF",
        transparent: "#0000"
      };
      const prefix$1 = "^\\s*";
      const suffix = "\\s*$";
      const float = "\\s*((\\.\\d+)|(\\d+(\\.\\d*)?))\\s*";
      const hex = "([0-9A-Fa-f])";
      const dhex = "([0-9A-Fa-f]{2})";
      const rgbRegex = new RegExp(`${prefix$1}rgb\\s*\\(${float},${float},${float}\\)${suffix}`);
      const rgbaRegex = new RegExp(`${prefix$1}rgba\\s*\\(${float},${float},${float},${float}\\)${suffix}`);
      const sHexRegex = new RegExp(`${prefix$1}#${hex}${hex}${hex}${suffix}`);
      const hexRegex = new RegExp(`${prefix$1}#${dhex}${dhex}${dhex}${suffix}`);
      const sHexaRegex = new RegExp(`${prefix$1}#${hex}${hex}${hex}${hex}${suffix}`);
      const hexaRegex = new RegExp(`${prefix$1}#${dhex}${dhex}${dhex}${dhex}${suffix}`);
      function parseHex(value) {
        return parseInt(value, 16);
      }
      function rgba(color) {
        try {
          let i;
          if (i = hexRegex.exec(color)) {
            return [parseHex(i[1]), parseHex(i[2]), parseHex(i[3]), 1];
          } else if (i = rgbRegex.exec(color)) {
            return [roundChannel(i[1]), roundChannel(i[5]), roundChannel(i[9]), 1];
          } else if (i = rgbaRegex.exec(color)) {
            return [
              roundChannel(i[1]),
              roundChannel(i[5]),
              roundChannel(i[9]),
              roundAlpha(i[13])
            ];
          } else if (i = sHexRegex.exec(color)) {
            return [
              parseHex(i[1] + i[1]),
              parseHex(i[2] + i[2]),
              parseHex(i[3] + i[3]),
              1
            ];
          } else if (i = hexaRegex.exec(color)) {
            return [
              parseHex(i[1]),
              parseHex(i[2]),
              parseHex(i[3]),
              roundAlpha(parseHex(i[4]) / 255)
            ];
          } else if (i = sHexaRegex.exec(color)) {
            return [
              parseHex(i[1] + i[1]),
              parseHex(i[2] + i[2]),
              parseHex(i[3] + i[3]),
              roundAlpha(parseHex(i[4] + i[4]) / 255)
            ];
          } else if (color in colors) {
            return rgba(colors[color]);
          }
          throw new Error(`[seemly/rgba]: Invalid color value ${color}.`);
        } catch (e) {
          throw e;
        }
      }
      function normalizeAlpha(alphaValue) {
        return alphaValue > 1 ? 1 : alphaValue < 0 ? 0 : alphaValue;
      }
      function stringifyRgba(r, g, b, a) {
        return `rgba(${roundChannel(r)}, ${roundChannel(g)}, ${roundChannel(b)}, ${normalizeAlpha(a)})`;
      }
      function compositeChannel(v1, a1, v2, a2, a) {
        return roundChannel((v1 * a1 * (1 - a2) + v2 * a2) / a);
      }
      function composite(background, overlay2) {
        if (!Array.isArray(background))
          background = rgba(background);
        if (!Array.isArray(overlay2))
          overlay2 = rgba(overlay2);
        const a1 = background[3];
        const a2 = overlay2[3];
        const alpha = roundAlpha(a1 + a2 - a1 * a2);
        return stringifyRgba(compositeChannel(background[0], a1, overlay2[0], a2, alpha), compositeChannel(background[1], a1, overlay2[1], a2, alpha), compositeChannel(background[2], a1, overlay2[2], a2, alpha), alpha);
      }
      function changeColor(base2, options) {
        const [r, g, b, a = 1] = Array.isArray(base2) ? base2 : rgba(base2);
        if (options.alpha) {
          return stringifyRgba(r, g, b, options.alpha);
        }
        return stringifyRgba(r, g, b, a);
      }
      function scaleColor(base2, options) {
        const [r, g, b, a = 1] = Array.isArray(base2) ? base2 : rgba(base2);
        const { lightness = 1, alpha = 1 } = options;
        return toRgbaString([r * lightness, g * lightness, b * lightness, a * alpha]);
      }
      function roundAlpha(value) {
        const v = Math.round(Number(value) * 100) / 100;
        if (v > 1)
          return 1;
        if (v < 0)
          return 0;
        return v;
      }
      function roundChannel(value) {
        const v = Math.round(Number(value));
        if (v > 255)
          return 255;
        if (v < 0)
          return 0;
        return v;
      }
      function toRgbaString(base2) {
        const [r, g, b] = base2;
        if (3 in base2) {
          return `rgba(${roundChannel(r)}, ${roundChannel(g)}, ${roundChannel(b)}, ${roundAlpha(base2[3])})`;
        }
        return `rgba(${roundChannel(r)}, ${roundChannel(g)}, ${roundChannel(b)}, 1)`;
      }
      function createId(length = 8) {
        return Math.random().toString(16).slice(2, 2 + length);
      }
      function getSlot$1(instance, slotName = "default", fallback = []) {
        const slots = instance.$slots;
        const slot = slots[slotName];
        if (slot === void 0) return fallback;
        return slot();
      }
      function keep(object, keys2 = [], rest) {
        const keepedObject = {};
        keys2.forEach((key) => {
          keepedObject[key] = object[key];
        });
        return Object.assign(keepedObject, rest);
      }
      function flatten$2(vNodes, filterCommentNode = true, result = []) {
        vNodes.forEach((vNode) => {
          if (vNode === null) return;
          if (typeof vNode !== "object") {
            if (typeof vNode === "string" || typeof vNode === "number") {
              result.push(vue.createTextVNode(String(vNode)));
            }
            return;
          }
          if (Array.isArray(vNode)) {
            flatten$2(vNode, filterCommentNode, result);
            return;
          }
          if (vNode.type === vue.Fragment) {
            if (vNode.children === null) return;
            if (Array.isArray(vNode.children)) {
              flatten$2(vNode.children, filterCommentNode, result);
            }
          } else {
            if (vNode.type === vue.Comment && filterCommentNode) return;
            result.push(vNode);
          }
        });
        return result;
      }
      function call(funcs, ...args) {
        if (Array.isArray(funcs)) {
          funcs.forEach((func) => call(func, ...args));
        } else {
          return funcs(...args);
        }
      }
      function keysOf(obj) {
        return Object.keys(obj);
      }
      function render$1(r, ...args) {
        if (typeof r === "function") {
          return r(...args);
        } else if (typeof r === "string") {
          return vue.createTextVNode(r);
        } else if (typeof r === "number") {
          return vue.createTextVNode(String(r));
        } else {
          return null;
        }
      }
      function warn$2(location, message) {
        console.error(`[naive/${location}]: ${message}`);
      }
      function throwError(location, message) {
        throw new Error(`[naive/${location}]: ${message}`);
      }
      function getTitleAttribute(value) {
        switch (typeof value) {
          case "string":
            return value || void 0;
          case "number":
            return String(value);
          default:
            return void 0;
        }
      }
      function getFirstSlotVNode(slots, slotName = "default", props = void 0) {
        const slot = slots[slotName];
        if (!slot) {
          warn$2("getFirstSlotVNode", `slot[${slotName}] is empty`);
          return null;
        }
        const slotContent = flatten$2(slot(props));
        if (slotContent.length === 1) {
          return slotContent[0];
        } else {
          warn$2("getFirstSlotVNode", `slot[${slotName}] should have exactly one child`);
          return null;
        }
      }
      function createInjectionKey(key) {
        return key;
      }
      function ensureValidVNode(vnodes) {
        return vnodes.some((child) => {
          if (!vue.isVNode(child)) {
            return true;
          }
          if (child.type === vue.Comment) {
            return false;
          }
          if (child.type === vue.Fragment && !ensureValidVNode(child.children)) {
            return false;
          }
          return true;
        }) ? vnodes : null;
      }
      function resolveSlot(slot, fallback) {
        return slot && ensureValidVNode(slot()) || fallback();
      }
      function resolveSlotWithProps(slot, props, fallback) {
        return slot && ensureValidVNode(slot(props)) || fallback(props);
      }
      function resolveWrappedSlot(slot, wrapper) {
        const children = slot && ensureValidVNode(slot());
        return wrapper(children || null);
      }
      function isSlotEmpty(slot) {
        return !(slot && ensureValidVNode(slot()));
      }
      function mergeEventHandlers(handlers) {
        const filteredHandlers = handlers.filter((handler) => handler !== void 0);
        if (filteredHandlers.length === 0) return void 0;
        if (filteredHandlers.length === 1) return filteredHandlers[0];
        return (e) => {
          handlers.forEach((handler) => {
            if (handler) {
              handler(e);
            }
          });
        };
      }
      const Wrapper = vue.defineComponent({
        render() {
          var _a, _b;
          return (_b = (_a = this.$slots).default) === null || _b === void 0 ? void 0 : _b.call(_a);
        }
      });
      const pureNumberRegex = /^(\d|\.)+$/;
      const numberRegex = /(\d|\.)+/;
      function formatLength(length, {
        c: c2 = 1,
        offset = 0,
        attachPx = true
      } = {}) {
        if (typeof length === "number") {
          const result = (length + offset) * c2;
          if (result === 0) return "0";
          return `${result}px`;
        } else if (typeof length === "string") {
          if (pureNumberRegex.test(length)) {
            const result = (Number(length) + offset) * c2;
            if (attachPx) {
              if (result === 0) return "0";
              return `${result}px`;
            } else {
              return `${result}`;
            }
          } else {
            const result = numberRegex.exec(length);
            if (!result) return length;
            return length.replace(numberRegex, String((Number(result[0]) + offset) * c2));
          }
        }
        return length;
      }
      function color2Class(color) {
        return color.replace(/#|\(|\)|,|\s|\./g, "_");
      }
      function rtlInset(inset) {
        const {
          left,
          right,
          top,
          bottom
        } = getMargin(inset);
        return `${top} ${right} ${bottom} ${left}`;
      }
      function ampCount(selector) {
        let cnt = 0;
        for (let i = 0; i < selector.length; ++i) {
          if (selector[i] === "&")
            ++cnt;
        }
        return cnt;
      }
      const separatorRegex = /\s*,(?![^(]*\))\s*/g;
      const extraSpaceRegex = /\s+/g;
      function resolveSelectorWithAmp(amp, selector) {
        const nextAmp = [];
        selector.split(separatorRegex).forEach((partialSelector) => {
          let round = ampCount(partialSelector);
          if (!round) {
            amp.forEach((partialAmp) => {
              nextAmp.push(
                // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                (partialAmp && partialAmp + " ") + partialSelector
              );
            });
            return;
          } else if (round === 1) {
            amp.forEach((partialAmp) => {
              nextAmp.push(partialSelector.replace("&", partialAmp));
            });
            return;
          }
          let partialNextAmp = [
            partialSelector
          ];
          while (round--) {
            const nextPartialNextAmp = [];
            partialNextAmp.forEach((selectorItr) => {
              amp.forEach((partialAmp) => {
                nextPartialNextAmp.push(selectorItr.replace("&", partialAmp));
              });
            });
            partialNextAmp = nextPartialNextAmp;
          }
          partialNextAmp.forEach((part) => nextAmp.push(part));
        });
        return nextAmp;
      }
      function resolveSelector(amp, selector) {
        const nextAmp = [];
        selector.split(separatorRegex).forEach((partialSelector) => {
          amp.forEach((partialAmp) => {
            nextAmp.push((partialAmp && partialAmp + " ") + partialSelector);
          });
        });
        return nextAmp;
      }
      function parseSelectorPath(selectorPaths) {
        let amp = [""];
        selectorPaths.forEach((selector) => {
          selector = selector && selector.trim();
          if (
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            !selector
          ) {
            return;
          }
          if (selector.includes("&")) {
            amp = resolveSelectorWithAmp(amp, selector);
          } else {
            amp = resolveSelector(amp, selector);
          }
        });
        return amp.join(", ").replace(extraSpaceRegex, " ");
      }
      function removeElement(el) {
        if (!el)
          return;
        const parentElement = el.parentElement;
        if (parentElement)
          parentElement.removeChild(el);
      }
      function queryElement(id, parent) {
        return (parent !== null && parent !== void 0 ? parent : document.head).querySelector(`style[cssr-id="${id}"]`);
      }
      function createElement(id) {
        const el = document.createElement("style");
        el.setAttribute("cssr-id", id);
        return el;
      }
      function isMediaOrSupports(selector) {
        if (!selector)
          return false;
        return /^\s*@(s|m)/.test(selector);
      }
      const kebabRegex = /[A-Z]/g;
      function kebabCase(pattern) {
        return pattern.replace(kebabRegex, (match2) => "-" + match2.toLowerCase());
      }
      function unwrapProperty(prop, indent = "  ") {
        if (typeof prop === "object" && prop !== null) {
          return " {\n" + Object.entries(prop).map((v) => {
            return indent + `  ${kebabCase(v[0])}: ${v[1]};`;
          }).join("\n") + "\n" + indent + "}";
        }
        return `: ${prop};`;
      }
      function unwrapProperties(props, instance, params) {
        if (typeof props === "function") {
          return props({
            context: instance.context,
            props: params
          });
        }
        return props;
      }
      function createStyle(selector, props, instance, params) {
        if (!props)
          return "";
        const unwrappedProps = unwrapProperties(props, instance, params);
        if (!unwrappedProps)
          return "";
        if (typeof unwrappedProps === "string") {
          return `${selector} {
${unwrappedProps}
}`;
        }
        const propertyNames = Object.keys(unwrappedProps);
        if (propertyNames.length === 0) {
          if (instance.config.keepEmptyBlock)
            return selector + " {\n}";
          return "";
        }
        const statements = selector ? [
          selector + " {"
        ] : [];
        propertyNames.forEach((propertyName) => {
          const property2 = unwrappedProps[propertyName];
          if (propertyName === "raw") {
            statements.push("\n" + property2 + "\n");
            return;
          }
          propertyName = kebabCase(propertyName);
          if (property2 !== null && property2 !== void 0) {
            statements.push(`  ${propertyName}${unwrapProperty(property2)}`);
          }
        });
        if (selector) {
          statements.push("}");
        }
        return statements.join("\n");
      }
      function loopCNodeListWithCallback(children, options, callback) {
        if (!children)
          return;
        children.forEach((child) => {
          if (Array.isArray(child)) {
            loopCNodeListWithCallback(child, options, callback);
          } else if (typeof child === "function") {
            const grandChildren = child(options);
            if (Array.isArray(grandChildren)) {
              loopCNodeListWithCallback(grandChildren, options, callback);
            } else if (grandChildren) {
              callback(grandChildren);
            }
          } else if (child) {
            callback(child);
          }
        });
      }
      function traverseCNode(node, selectorPaths, styles2, instance, params) {
        const $2 = node.$;
        let blockSelector = "";
        if (!$2 || typeof $2 === "string") {
          if (isMediaOrSupports($2)) {
            blockSelector = $2;
          } else {
            selectorPaths.push($2);
          }
        } else if (typeof $2 === "function") {
          const selector2 = $2({
            context: instance.context,
            props: params
          });
          if (isMediaOrSupports(selector2)) {
            blockSelector = selector2;
          } else {
            selectorPaths.push(selector2);
          }
        } else {
          if ($2.before)
            $2.before(instance.context);
          if (!$2.$ || typeof $2.$ === "string") {
            if (isMediaOrSupports($2.$)) {
              blockSelector = $2.$;
            } else {
              selectorPaths.push($2.$);
            }
          } else if ($2.$) {
            const selector2 = $2.$({
              context: instance.context,
              props: params
            });
            if (isMediaOrSupports(selector2)) {
              blockSelector = selector2;
            } else {
              selectorPaths.push(selector2);
            }
          }
        }
        const selector = parseSelectorPath(selectorPaths);
        const style2 = createStyle(selector, node.props, instance, params);
        if (blockSelector) {
          styles2.push(`${blockSelector} {`);
        } else if (style2.length) {
          styles2.push(style2);
        }
        if (node.children) {
          loopCNodeListWithCallback(node.children, {
            context: instance.context,
            props: params
          }, (childNode) => {
            if (typeof childNode === "string") {
              const style3 = createStyle(selector, { raw: childNode }, instance, params);
              styles2.push(style3);
            } else {
              traverseCNode(childNode, selectorPaths, styles2, instance, params);
            }
          });
        }
        selectorPaths.pop();
        if (blockSelector) {
          styles2.push("}");
        }
        if ($2 && $2.after)
          $2.after(instance.context);
      }
      function render(node, instance, props) {
        const styles2 = [];
        traverseCNode(node, [], styles2, instance, props);
        return styles2.join("\n\n");
      }
      function murmur2(str) {
        var h2 = 0;
        var k, i = 0, len2 = str.length;
        for (; len2 >= 4; ++i, len2 -= 4) {
          k = str.charCodeAt(i) & 255 | (str.charCodeAt(++i) & 255) << 8 | (str.charCodeAt(++i) & 255) << 16 | (str.charCodeAt(++i) & 255) << 24;
          k = /* Math.imul(k, m): */
          (k & 65535) * 1540483477 + ((k >>> 16) * 59797 << 16);
          k ^= /* k >>> r: */
          k >>> 24;
          h2 = /* Math.imul(k, m): */
          (k & 65535) * 1540483477 + ((k >>> 16) * 59797 << 16) ^ /* Math.imul(h, m): */
          (h2 & 65535) * 1540483477 + ((h2 >>> 16) * 59797 << 16);
        }
        switch (len2) {
          case 3:
            h2 ^= (str.charCodeAt(i + 2) & 255) << 16;
          case 2:
            h2 ^= (str.charCodeAt(i + 1) & 255) << 8;
          case 1:
            h2 ^= str.charCodeAt(i) & 255;
            h2 = /* Math.imul(h, m): */
            (h2 & 65535) * 1540483477 + ((h2 >>> 16) * 59797 << 16);
        }
        h2 ^= h2 >>> 13;
        h2 = /* Math.imul(h, m): */
        (h2 & 65535) * 1540483477 + ((h2 >>> 16) * 59797 << 16);
        return ((h2 ^ h2 >>> 15) >>> 0).toString(36);
      }
      if (typeof window !== "undefined") {
        window.__cssrContext = {};
      }
      function unmount(instance, node, id, parent) {
        const { els } = node;
        if (id === void 0) {
          els.forEach(removeElement);
          node.els = [];
        } else {
          const target = queryElement(id, parent);
          if (target && els.includes(target)) {
            removeElement(target);
            node.els = els.filter((el) => el !== target);
          }
        }
      }
      function addElementToList(els, target) {
        els.push(target);
      }
      function mount(instance, node, id, props, head, force, anchorMetaName, parent, ssrAdapter2) {
        let style2;
        if (id === void 0) {
          style2 = node.render(props);
          id = murmur2(style2);
        }
        if (ssrAdapter2) {
          ssrAdapter2.adapter(id, style2 !== null && style2 !== void 0 ? style2 : node.render(props));
          return;
        }
        if (parent === void 0) {
          parent = document.head;
        }
        const queriedTarget = queryElement(id, parent);
        if (queriedTarget !== null && !force) {
          return queriedTarget;
        }
        const target = queriedTarget !== null && queriedTarget !== void 0 ? queriedTarget : createElement(id);
        if (style2 === void 0)
          style2 = node.render(props);
        target.textContent = style2;
        if (queriedTarget !== null)
          return queriedTarget;
        if (anchorMetaName) {
          const anchorMetaEl = parent.querySelector(`meta[name="${anchorMetaName}"]`);
          if (anchorMetaEl) {
            parent.insertBefore(target, anchorMetaEl);
            addElementToList(node.els, target);
            return target;
          }
        }
        if (head) {
          parent.insertBefore(target, parent.querySelector("style, link"));
        } else {
          parent.appendChild(target);
        }
        addElementToList(node.els, target);
        return target;
      }
      function wrappedRender(props) {
        return render(this, this.instance, props);
      }
      function wrappedMount(options = {}) {
        const { id, ssr, props, head = false, force = false, anchorMetaName, parent } = options;
        const targetElement = mount(this.instance, this, id, props, head, force, anchorMetaName, parent, ssr);
        return targetElement;
      }
      function wrappedUnmount(options = {}) {
        const { id, parent } = options;
        unmount(this.instance, this, id, parent);
      }
      const createCNode = function(instance, $2, props, children) {
        return {
          instance,
          $: $2,
          props,
          children,
          els: [],
          render: wrappedRender,
          mount: wrappedMount,
          unmount: wrappedUnmount
        };
      };
      const c$2 = function(instance, $2, props, children) {
        if (Array.isArray($2)) {
          return createCNode(instance, { $: null }, null, $2);
        } else if (Array.isArray(props)) {
          return createCNode(instance, $2, null, props);
        } else if (Array.isArray(children)) {
          return createCNode(instance, $2, props, children);
        } else {
          return createCNode(instance, $2, props, null);
        }
      };
      function CssRender(config = {}) {
        const cssr2 = {
          c: (...args) => c$2(cssr2, ...args),
          use: (plugin2, ...args) => plugin2.install(cssr2, ...args),
          find: queryElement,
          context: {},
          config
        };
        return cssr2;
      }
      function exists(id, ssr) {
        if (id === void 0)
          return false;
        if (ssr) {
          const { context: { ids } } = ssr;
          return ids.has(id);
        }
        return queryElement(id) !== null;
      }
      function plugin$1(options) {
        let _bPrefix = ".";
        let _ePrefix = "__";
        let _mPrefix = "--";
        let c2;
        if (options) {
          let t = options.blockPrefix;
          if (t) {
            _bPrefix = t;
          }
          t = options.elementPrefix;
          if (t) {
            _ePrefix = t;
          }
          t = options.modifierPrefix;
          if (t) {
            _mPrefix = t;
          }
        }
        const _plugin = {
          install(instance) {
            c2 = instance.c;
            const ctx2 = instance.context;
            ctx2.bem = {};
            ctx2.bem.b = null;
            ctx2.bem.els = null;
          }
        };
        function b(arg) {
          let memorizedB;
          let memorizedE;
          return {
            before(ctx2) {
              memorizedB = ctx2.bem.b;
              memorizedE = ctx2.bem.els;
              ctx2.bem.els = null;
            },
            after(ctx2) {
              ctx2.bem.b = memorizedB;
              ctx2.bem.els = memorizedE;
            },
            $({ context, props }) {
              arg = typeof arg === "string" ? arg : arg({ context, props });
              context.bem.b = arg;
              return `${(props === null || props === void 0 ? void 0 : props.bPrefix) || _bPrefix}${context.bem.b}`;
            }
          };
        }
        function e(arg) {
          let memorizedE;
          return {
            before(ctx2) {
              memorizedE = ctx2.bem.els;
            },
            after(ctx2) {
              ctx2.bem.els = memorizedE;
            },
            $({ context, props }) {
              arg = typeof arg === "string" ? arg : arg({ context, props });
              context.bem.els = arg.split(",").map((v) => v.trim());
              return context.bem.els.map((el) => `${(props === null || props === void 0 ? void 0 : props.bPrefix) || _bPrefix}${context.bem.b}${_ePrefix}${el}`).join(", ");
            }
          };
        }
        function m(arg) {
          return {
            $({ context, props }) {
              arg = typeof arg === "string" ? arg : arg({ context, props });
              const modifiers = arg.split(",").map((v) => v.trim());
              function elementToSelector(el) {
                return modifiers.map((modifier) => `&${(props === null || props === void 0 ? void 0 : props.bPrefix) || _bPrefix}${context.bem.b}${el !== void 0 ? `${_ePrefix}${el}` : ""}${_mPrefix}${modifier}`).join(", ");
              }
              const els = context.bem.els;
              if (els !== null) {
                return elementToSelector(els[0]);
              } else {
                return elementToSelector();
              }
            }
          };
        }
        function notM(arg) {
          return {
            $({ context, props }) {
              arg = typeof arg === "string" ? arg : arg({ context, props });
              const els = context.bem.els;
              return `&:not(${(props === null || props === void 0 ? void 0 : props.bPrefix) || _bPrefix}${context.bem.b}${els !== null && els.length > 0 ? `${_ePrefix}${els[0]}` : ""}${_mPrefix}${arg})`;
            }
          };
        }
        const cB2 = (...args) => c2(b(args[0]), args[1], args[2]);
        const cE2 = (...args) => c2(e(args[0]), args[1], args[2]);
        const cM2 = (...args) => c2(m(args[0]), args[1], args[2]);
        const cNotM2 = (...args) => c2(notM(args[0]), args[1], args[2]);
        Object.assign(_plugin, {
          cB: cB2,
          cE: cE2,
          cM: cM2,
          cNotM: cNotM2
        });
        return _plugin;
      }
      const namespace = "n";
      const prefix = `.${namespace}-`;
      const elementPrefix = "__";
      const modifierPrefix = "--";
      const cssr = CssRender();
      const plugin = plugin$1({
        blockPrefix: prefix,
        elementPrefix,
        modifierPrefix
      });
      cssr.use(plugin);
      const {
        c: c$1,
        find
      } = cssr;
      const {
        cB,
        cE,
        cM,
        cNotM
      } = plugin;
      function insideModal(style2) {
        return c$1(({
          props: {
            bPrefix
          }
        }) => `${bPrefix || prefix}modal, ${bPrefix || prefix}drawer`, [style2]);
      }
      function insidePopover(style2) {
        return c$1(({
          props: {
            bPrefix
          }
        }) => `${bPrefix || prefix}popover`, [style2]);
      }
      const cCB = (...args) => {
        return c$1(">", [cB(...args)]);
      };
      function createKey(prefix2, suffix2) {
        return prefix2 + (suffix2 === "default" ? "" : suffix2.replace(/^[a-z]/, (startChar) => startChar.toUpperCase()));
      }
      let _isJsdom;
      function isJsdom() {
        if (_isJsdom === void 0) {
          _isJsdom = navigator.userAgent.includes("Node.js") || navigator.userAgent.includes("jsdom");
        }
        return _isJsdom;
      }
      const isBrowser$2 = typeof document !== "undefined" && typeof window !== "undefined";
      const eventSet = /* @__PURE__ */ new WeakSet();
      function markEventEffectPerformed(event) {
        eventSet.add(event);
      }
      function eventEffectNotPerformed(event) {
        return !eventSet.has(event);
      }
      function useInjectionInstanceCollection(injectionName, collectionKey, registerKeyRef) {
        var _a;
        const injection = vue.inject(injectionName, null);
        if (injection === null) return;
        const vm = (_a = vue.getCurrentInstance()) === null || _a === void 0 ? void 0 : _a.proxy;
        vue.watch(registerKeyRef, registerInstance);
        registerInstance(registerKeyRef.value);
        vue.onBeforeUnmount(() => {
          registerInstance(void 0, registerKeyRef.value);
        });
        function registerInstance(key, oldKey) {
          if (!injection) return;
          const collection = injection[collectionKey];
          if (oldKey !== void 0) removeInstance(collection, oldKey);
          if (key !== void 0) addInstance(collection, key);
        }
        function removeInstance(collection, key) {
          if (!collection[key]) collection[key] = [];
          collection[key].splice(collection[key].findIndex((instance) => instance === vm), 1);
        }
        function addInstance(collection, key) {
          if (!collection[key]) collection[key] = [];
          if (!~collection[key].findIndex((instance) => instance === vm)) {
            collection[key].push(vm);
          }
        }
      }
      function useFalseUntilTruthy(originalRef) {
        const currentRef = vue.ref(!!originalRef.value);
        if (currentRef.value)
          return vue.readonly(currentRef);
        const stop = vue.watch(originalRef, (value) => {
          if (value) {
            currentRef.value = true;
            stop();
          }
        });
        return vue.readonly(currentRef);
      }
      function useMemo(getterOrOptions) {
        const computedValueRef = vue.computed(getterOrOptions);
        const valueRef = vue.ref(computedValueRef.value);
        vue.watch(computedValueRef, (value) => {
          valueRef.value = value;
        });
        if (typeof getterOrOptions === "function") {
          return valueRef;
        } else {
          return {
            __v_isRef: true,
            get value() {
              return valueRef.value;
            },
            set value(v) {
              getterOrOptions.set(v);
            }
          };
        }
      }
      const isBrowser$1 = typeof window !== "undefined";
      let fontsReady;
      let isFontReady;
      const init = () => {
        var _a, _b;
        fontsReady = isBrowser$1 ? (_b = (_a = document) === null || _a === void 0 ? void 0 : _a.fonts) === null || _b === void 0 ? void 0 : _b.ready : void 0;
        isFontReady = false;
        if (fontsReady !== void 0) {
          void fontsReady.then(() => {
            isFontReady = true;
          });
        } else {
          isFontReady = true;
        }
      };
      init();
      function onFontsReady(cb) {
        if (isFontReady)
          return;
        let deactivated = false;
        vue.onMounted(() => {
          if (!isFontReady) {
            fontsReady === null || fontsReady === void 0 ? void 0 : fontsReady.then(() => {
              if (deactivated)
                return;
              cb();
            });
          }
        });
        vue.onBeforeUnmount(() => {
          deactivated = true;
        });
      }
      function getEventTarget(e) {
        const path = e.composedPath();
        return path[0];
      }
      const traps = {
        mousemoveoutside: /* @__PURE__ */ new WeakMap(),
        clickoutside: /* @__PURE__ */ new WeakMap()
      };
      function createTrapHandler(name, el, originalHandler) {
        if (name === "mousemoveoutside") {
          const moveHandler = (e) => {
            if (el.contains(getEventTarget(e)))
              return;
            originalHandler(e);
          };
          return {
            mousemove: moveHandler,
            touchstart: moveHandler
          };
        } else if (name === "clickoutside") {
          let mouseDownOutside = false;
          const downHandler = (e) => {
            mouseDownOutside = !el.contains(getEventTarget(e));
          };
          const upHanlder = (e) => {
            if (!mouseDownOutside)
              return;
            if (el.contains(getEventTarget(e)))
              return;
            originalHandler(e);
          };
          return {
            mousedown: downHandler,
            mouseup: upHanlder,
            touchstart: downHandler,
            touchend: upHanlder
          };
        }
        console.error(
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          `[evtd/create-trap-handler]: name \`${name}\` is invalid. This could be a bug of evtd.`
        );
        return {};
      }
      function ensureTrapHandlers(name, el, handler) {
        const handlers = traps[name];
        let elHandlers = handlers.get(el);
        if (elHandlers === void 0) {
          handlers.set(el, elHandlers = /* @__PURE__ */ new WeakMap());
        }
        let trapHandler = elHandlers.get(handler);
        if (trapHandler === void 0) {
          elHandlers.set(handler, trapHandler = createTrapHandler(name, el, handler));
        }
        return trapHandler;
      }
      function trapOn(name, el, handler, options) {
        if (name === "mousemoveoutside" || name === "clickoutside") {
          const trapHandlers = ensureTrapHandlers(name, el, handler);
          Object.keys(trapHandlers).forEach((key) => {
            on(key, document, trapHandlers[key], options);
          });
          return true;
        }
        return false;
      }
      function trapOff(name, el, handler, options) {
        if (name === "mousemoveoutside" || name === "clickoutside") {
          const trapHandlers = ensureTrapHandlers(name, el, handler);
          Object.keys(trapHandlers).forEach((key) => {
            off(key, document, trapHandlers[key], options);
          });
          return true;
        }
        return false;
      }
      function createDelegate() {
        if (typeof window === "undefined") {
          return {
            on: () => {
            },
            off: () => {
            }
          };
        }
        const propagationStopped = /* @__PURE__ */ new WeakMap();
        const immediatePropagationStopped = /* @__PURE__ */ new WeakMap();
        function trackPropagation() {
          propagationStopped.set(this, true);
        }
        function trackImmediate() {
          propagationStopped.set(this, true);
          immediatePropagationStopped.set(this, true);
        }
        function spy(event, propName, fn) {
          const source = event[propName];
          event[propName] = function() {
            fn.apply(event, arguments);
            return source.apply(event, arguments);
          };
          return event;
        }
        function unspy(event, propName) {
          event[propName] = Event.prototype[propName];
        }
        const currentTargets = /* @__PURE__ */ new WeakMap();
        const currentTargetDescriptor = Object.getOwnPropertyDescriptor(Event.prototype, "currentTarget");
        function getCurrentTarget() {
          var _a;
          return (_a = currentTargets.get(this)) !== null && _a !== void 0 ? _a : null;
        }
        function defineCurrentTarget(event, getter) {
          if (currentTargetDescriptor === void 0)
            return;
          Object.defineProperty(event, "currentTarget", {
            configurable: true,
            enumerable: true,
            get: getter !== null && getter !== void 0 ? getter : currentTargetDescriptor.get
          });
        }
        const phaseToTypeToElToHandlers = {
          bubble: {},
          capture: {}
        };
        const typeToWindowEventHandlers = {};
        function createUnifiedHandler() {
          const delegeteHandler = function(e) {
            const { type, eventPhase, bubbles } = e;
            const target = getEventTarget(e);
            if (eventPhase === 2)
              return;
            const phase = eventPhase === 1 ? "capture" : "bubble";
            let cursor = target;
            const path = [];
            while (true) {
              if (cursor === null)
                cursor = window;
              path.push(cursor);
              if (cursor === window) {
                break;
              }
              cursor = cursor.parentNode || null;
            }
            const captureElToHandlers = phaseToTypeToElToHandlers.capture[type];
            const bubbleElToHandlers = phaseToTypeToElToHandlers.bubble[type];
            spy(e, "stopPropagation", trackPropagation);
            spy(e, "stopImmediatePropagation", trackImmediate);
            defineCurrentTarget(e, getCurrentTarget);
            if (phase === "capture") {
              if (captureElToHandlers === void 0)
                return;
              for (let i = path.length - 1; i >= 0; --i) {
                if (propagationStopped.has(e))
                  break;
                const target2 = path[i];
                const handlers = captureElToHandlers.get(target2);
                if (handlers !== void 0) {
                  currentTargets.set(e, target2);
                  for (const handler of handlers) {
                    if (immediatePropagationStopped.has(e))
                      break;
                    handler(e);
                  }
                }
                if (i === 0 && !bubbles && bubbleElToHandlers !== void 0) {
                  const bubbleHandlers = bubbleElToHandlers.get(target2);
                  if (bubbleHandlers !== void 0) {
                    for (const handler of bubbleHandlers) {
                      if (immediatePropagationStopped.has(e))
                        break;
                      handler(e);
                    }
                  }
                }
              }
            } else if (phase === "bubble") {
              if (bubbleElToHandlers === void 0)
                return;
              for (let i = 0; i < path.length; ++i) {
                if (propagationStopped.has(e))
                  break;
                const target2 = path[i];
                const handlers = bubbleElToHandlers.get(target2);
                if (handlers !== void 0) {
                  currentTargets.set(e, target2);
                  for (const handler of handlers) {
                    if (immediatePropagationStopped.has(e))
                      break;
                    handler(e);
                  }
                }
              }
            }
            unspy(e, "stopPropagation");
            unspy(e, "stopImmediatePropagation");
            defineCurrentTarget(e);
          };
          delegeteHandler.displayName = "evtdUnifiedHandler";
          return delegeteHandler;
        }
        function createUnifiedWindowEventHandler() {
          const delegateHandler = function(e) {
            const { type, eventPhase } = e;
            if (eventPhase !== 2)
              return;
            const handlers = typeToWindowEventHandlers[type];
            if (handlers === void 0)
              return;
            handlers.forEach((handler) => handler(e));
          };
          delegateHandler.displayName = "evtdUnifiedWindowEventHandler";
          return delegateHandler;
        }
        const unifiedHandler = createUnifiedHandler();
        const unfiendWindowEventHandler = createUnifiedWindowEventHandler();
        function ensureElToHandlers(phase, type) {
          const phaseHandlers = phaseToTypeToElToHandlers[phase];
          if (phaseHandlers[type] === void 0) {
            phaseHandlers[type] = /* @__PURE__ */ new Map();
            window.addEventListener(type, unifiedHandler, phase === "capture");
          }
          return phaseHandlers[type];
        }
        function ensureWindowEventHandlers(type) {
          const windowEventHandlers = typeToWindowEventHandlers[type];
          if (windowEventHandlers === void 0) {
            typeToWindowEventHandlers[type] = /* @__PURE__ */ new Set();
            window.addEventListener(type, unfiendWindowEventHandler);
          }
          return typeToWindowEventHandlers[type];
        }
        function ensureHandlers(elToHandlers, el) {
          let elHandlers = elToHandlers.get(el);
          if (elHandlers === void 0) {
            elToHandlers.set(el, elHandlers = /* @__PURE__ */ new Set());
          }
          return elHandlers;
        }
        function handlerExist(el, phase, type, handler) {
          const elToHandlers = phaseToTypeToElToHandlers[phase][type];
          if (elToHandlers !== void 0) {
            const handlers = elToHandlers.get(el);
            if (handlers !== void 0) {
              if (handlers.has(handler))
                return true;
            }
          }
          return false;
        }
        function windowEventHandlerExist(type, handler) {
          const handlers = typeToWindowEventHandlers[type];
          if (handlers !== void 0) {
            if (handlers.has(handler)) {
              return true;
            }
          }
          return false;
        }
        function on2(type, el, handler, options) {
          let mergedHandler;
          if (typeof options === "object" && options.once === true) {
            mergedHandler = (e) => {
              off2(type, el, mergedHandler, options);
              handler(e);
            };
          } else {
            mergedHandler = handler;
          }
          const trapped = trapOn(type, el, mergedHandler, options);
          if (trapped)
            return;
          const phase = options === true || typeof options === "object" && options.capture === true ? "capture" : "bubble";
          const elToHandlers = ensureElToHandlers(phase, type);
          const handlers = ensureHandlers(elToHandlers, el);
          if (!handlers.has(mergedHandler))
            handlers.add(mergedHandler);
          if (el === window) {
            const windowEventHandlers = ensureWindowEventHandlers(type);
            if (!windowEventHandlers.has(mergedHandler)) {
              windowEventHandlers.add(mergedHandler);
            }
          }
        }
        function off2(type, el, handler, options) {
          const trapped = trapOff(type, el, handler, options);
          if (trapped)
            return;
          const capture = options === true || typeof options === "object" && options.capture === true;
          const phase = capture ? "capture" : "bubble";
          const elToHandlers = ensureElToHandlers(phase, type);
          const handlers = ensureHandlers(elToHandlers, el);
          if (el === window) {
            const mirrorPhase = capture ? "bubble" : "capture";
            if (!handlerExist(el, mirrorPhase, type, handler) && windowEventHandlerExist(type, handler)) {
              const windowEventHandlers = typeToWindowEventHandlers[type];
              windowEventHandlers.delete(handler);
              if (windowEventHandlers.size === 0) {
                window.removeEventListener(type, unfiendWindowEventHandler);
                typeToWindowEventHandlers[type] = void 0;
              }
            }
          }
          if (handlers.has(handler))
            handlers.delete(handler);
          if (handlers.size === 0) {
            elToHandlers.delete(el);
          }
          if (elToHandlers.size === 0) {
            window.removeEventListener(type, unifiedHandler, phase === "capture");
            phaseToTypeToElToHandlers[phase][type] = void 0;
          }
        }
        return {
          on: on2,
          off: off2
        };
      }
      const { on, off } = createDelegate();
      function useMergedState(controlledStateRef, uncontrolledStateRef) {
        vue.watch(controlledStateRef, (value) => {
          if (value !== void 0) {
            uncontrolledStateRef.value = value;
          }
        });
        return vue.computed(() => {
          if (controlledStateRef.value === void 0) {
            return uncontrolledStateRef.value;
          }
          return controlledStateRef.value;
        });
      }
      function isMounted() {
        const isMounted2 = vue.ref(false);
        vue.onMounted(() => {
          isMounted2.value = true;
        });
        return vue.readonly(isMounted2);
      }
      function useCompitable(reactive, keys2) {
        return vue.computed(() => {
          for (const key of keys2) {
            if (reactive[key] !== void 0)
              return reactive[key];
          }
          return reactive[keys2[keys2.length - 1]];
        });
      }
      const isIos = (typeof window === "undefined" ? false : /iPad|iPhone|iPod/.test(navigator.platform) || navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) && // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      !window.MSStream;
      function useIsIos() {
        return isIos;
      }
      const internalSelectionMenuInjectionKey = createInjectionKey("n-internal-select-menu");
      const internalSelectionMenuBodyInjectionKey = createInjectionKey("n-internal-select-menu-body");
      const modalBodyInjectionKey = createInjectionKey("n-modal-body");
      const drawerBodyInjectionKey = createInjectionKey("n-drawer-body");
      const drawerInjectionKey = createInjectionKey("n-drawer");
      const popoverBodyInjectionKey = createInjectionKey("n-popover-body");
      const teleportDisabled = "__disabled__";
      function useAdjustedTo(props) {
        const modal = vue.inject(modalBodyInjectionKey, null);
        const drawer = vue.inject(drawerBodyInjectionKey, null);
        const popover = vue.inject(popoverBodyInjectionKey, null);
        const selectMenu = vue.inject(internalSelectionMenuBodyInjectionKey, null);
        const fullscreenElementRef = vue.ref();
        if (typeof document !== "undefined") {
          fullscreenElementRef.value = document.fullscreenElement;
          const handleFullscreenChange = () => {
            fullscreenElementRef.value = document.fullscreenElement;
          };
          vue.onMounted(() => {
            on("fullscreenchange", document, handleFullscreenChange);
          });
          vue.onBeforeUnmount(() => {
            off("fullscreenchange", document, handleFullscreenChange);
          });
        }
        return useMemo(() => {
          var _a;
          const {
            to
          } = props;
          if (to !== void 0) {
            if (to === false) return teleportDisabled;
            if (to === true) return fullscreenElementRef.value || "body";
            return to;
          }
          if (modal === null || modal === void 0 ? void 0 : modal.value) {
            return (_a = modal.value.$el) !== null && _a !== void 0 ? _a : modal.value;
          }
          if (drawer === null || drawer === void 0 ? void 0 : drawer.value) return drawer.value;
          if (popover === null || popover === void 0 ? void 0 : popover.value) return popover.value;
          if (selectMenu === null || selectMenu === void 0 ? void 0 : selectMenu.value) return selectMenu.value;
          return to !== null && to !== void 0 ? to : fullscreenElementRef.value || "body";
        });
      }
      useAdjustedTo.tdkey = teleportDisabled;
      useAdjustedTo.propTo = {
        type: [String, Object, Boolean],
        default: void 0
      };
      function getSlot(scope, slots, slotName = "default") {
        const slot = slots[slotName];
        if (slot === void 0) {
          throw new Error(`[vueuc/${scope}]: slot[${slotName}] is empty.`);
        }
        return slot();
      }
      function flatten$1(vNodes, filterCommentNode = true, result = []) {
        vNodes.forEach((vNode) => {
          if (vNode === null)
            return;
          if (typeof vNode !== "object") {
            if (typeof vNode === "string" || typeof vNode === "number") {
              result.push(vue.createTextVNode(String(vNode)));
            }
            return;
          }
          if (Array.isArray(vNode)) {
            flatten$1(vNode, filterCommentNode, result);
            return;
          }
          if (vNode.type === vue.Fragment) {
            if (vNode.children === null)
              return;
            if (Array.isArray(vNode.children)) {
              flatten$1(vNode.children, filterCommentNode, result);
            }
          } else if (vNode.type !== vue.Comment) {
            result.push(vNode);
          }
        });
        return result;
      }
      function getFirstVNode(scope, slots, slotName = "default") {
        const slot = slots[slotName];
        if (slot === void 0) {
          throw new Error(`[vueuc/${scope}]: slot[${slotName}] is empty.`);
        }
        const content = flatten$1(slot());
        if (content.length === 1) {
          return content[0];
        } else {
          throw new Error(`[vueuc/${scope}]: slot[${slotName}] should have exactly one child.`);
        }
      }
      let viewMeasurer = null;
      function ensureViewBoundingRect() {
        if (viewMeasurer === null) {
          viewMeasurer = document.getElementById("v-binder-view-measurer");
          if (viewMeasurer === null) {
            viewMeasurer = document.createElement("div");
            viewMeasurer.id = "v-binder-view-measurer";
            const { style: style2 } = viewMeasurer;
            style2.position = "fixed";
            style2.left = "0";
            style2.right = "0";
            style2.top = "0";
            style2.bottom = "0";
            style2.pointerEvents = "none";
            style2.visibility = "hidden";
            document.body.appendChild(viewMeasurer);
          }
        }
        return viewMeasurer.getBoundingClientRect();
      }
      function getPointRect(x, y) {
        const viewRect = ensureViewBoundingRect();
        return {
          top: y,
          left: x,
          height: 0,
          width: 0,
          right: viewRect.width - x,
          bottom: viewRect.height - y
        };
      }
      function getRect(el) {
        const elRect = el.getBoundingClientRect();
        const viewRect = ensureViewBoundingRect();
        return {
          left: elRect.left - viewRect.left,
          top: elRect.top - viewRect.top,
          bottom: viewRect.height + viewRect.top - elRect.bottom,
          right: viewRect.width + viewRect.left - elRect.right,
          width: elRect.width,
          height: elRect.height
        };
      }
      function getParentNode(node) {
        if (node.nodeType === 9) {
          return null;
        }
        return node.parentNode;
      }
      function getScrollParent(node) {
        if (node === null)
          return null;
        const parentNode = getParentNode(node);
        if (parentNode === null) {
          return null;
        }
        if (parentNode.nodeType === 9) {
          return document;
        }
        if (parentNode.nodeType === 1) {
          const { overflow, overflowX, overflowY } = getComputedStyle(parentNode);
          if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {
            return parentNode;
          }
        }
        return getScrollParent(parentNode);
      }
      const Binder = vue.defineComponent({
        name: "Binder",
        props: {
          syncTargetWithParent: Boolean,
          syncTarget: {
            type: Boolean,
            default: true
          }
        },
        setup(props) {
          var _a;
          vue.provide("VBinder", (_a = vue.getCurrentInstance()) === null || _a === void 0 ? void 0 : _a.proxy);
          const VBinder = vue.inject("VBinder", null);
          const targetRef = vue.ref(null);
          const setTargetRef = (el) => {
            targetRef.value = el;
            if (VBinder && props.syncTargetWithParent) {
              VBinder.setTargetRef(el);
            }
          };
          let scrollableNodes = [];
          const ensureScrollListener = () => {
            let cursor = targetRef.value;
            while (true) {
              cursor = getScrollParent(cursor);
              if (cursor === null)
                break;
              scrollableNodes.push(cursor);
            }
            for (const el of scrollableNodes) {
              on("scroll", el, onScroll, true);
            }
          };
          const removeScrollListeners = () => {
            for (const el of scrollableNodes) {
              off("scroll", el, onScroll, true);
            }
            scrollableNodes = [];
          };
          const followerScrollListeners = /* @__PURE__ */ new Set();
          const addScrollListener = (listener) => {
            if (followerScrollListeners.size === 0) {
              ensureScrollListener();
            }
            if (!followerScrollListeners.has(listener)) {
              followerScrollListeners.add(listener);
            }
          };
          const removeScrollListener = (listener) => {
            if (followerScrollListeners.has(listener)) {
              followerScrollListeners.delete(listener);
            }
            if (followerScrollListeners.size === 0) {
              removeScrollListeners();
            }
          };
          const onScroll = () => {
            beforeNextFrameOnce(onScrollRaf);
          };
          const onScrollRaf = () => {
            followerScrollListeners.forEach((listener) => listener());
          };
          const followerResizeListeners = /* @__PURE__ */ new Set();
          const addResizeListener = (listener) => {
            if (followerResizeListeners.size === 0) {
              on("resize", window, onResize);
            }
            if (!followerResizeListeners.has(listener)) {
              followerResizeListeners.add(listener);
            }
          };
          const removeResizeListener = (listener) => {
            if (followerResizeListeners.has(listener)) {
              followerResizeListeners.delete(listener);
            }
            if (followerResizeListeners.size === 0) {
              off("resize", window, onResize);
            }
          };
          const onResize = () => {
            followerResizeListeners.forEach((listener) => listener());
          };
          vue.onBeforeUnmount(() => {
            off("resize", window, onResize);
            removeScrollListeners();
          });
          return {
            targetRef,
            setTargetRef,
            addScrollListener,
            removeScrollListener,
            addResizeListener,
            removeResizeListener
          };
        },
        render() {
          return getSlot("binder", this.$slots);
        }
      });
      const VTarget = vue.defineComponent({
        name: "Target",
        setup() {
          const { setTargetRef, syncTarget } = vue.inject("VBinder");
          const setTargetDirective = {
            mounted: setTargetRef,
            updated: setTargetRef
          };
          return {
            syncTarget,
            setTargetDirective
          };
        },
        render() {
          const { syncTarget, setTargetDirective } = this;
          if (syncTarget) {
            return vue.withDirectives(getFirstVNode("follower", this.$slots), [
              [setTargetDirective]
            ]);
          }
          return getFirstVNode("follower", this.$slots);
        }
      });
      const ctxKey$1 = "@@mmoContext";
      const mousemoveoutside = {
        mounted(el, { value }) {
          el[ctxKey$1] = {
            handler: void 0
          };
          if (typeof value === "function") {
            el[ctxKey$1].handler = value;
            on("mousemoveoutside", el, value);
          }
        },
        updated(el, { value }) {
          const ctx2 = el[ctxKey$1];
          if (typeof value === "function") {
            if (ctx2.handler) {
              if (ctx2.handler !== value) {
                off("mousemoveoutside", el, ctx2.handler);
                ctx2.handler = value;
                on("mousemoveoutside", el, value);
              }
            } else {
              el[ctxKey$1].handler = value;
              on("mousemoveoutside", el, value);
            }
          } else {
            if (ctx2.handler) {
              off("mousemoveoutside", el, ctx2.handler);
              ctx2.handler = void 0;
            }
          }
        },
        unmounted(el) {
          const { handler } = el[ctxKey$1];
          if (handler) {
            off("mousemoveoutside", el, handler);
          }
          el[ctxKey$1].handler = void 0;
        }
      };
      const ctxKey = "@@coContext";
      const clickoutside = {
        mounted(el, { value, modifiers }) {
          el[ctxKey] = {
            handler: void 0
          };
          if (typeof value === "function") {
            el[ctxKey].handler = value;
            on("clickoutside", el, value, {
              capture: modifiers.capture
            });
          }
        },
        updated(el, { value, modifiers }) {
          const ctx2 = el[ctxKey];
          if (typeof value === "function") {
            if (ctx2.handler) {
              if (ctx2.handler !== value) {
                off("clickoutside", el, ctx2.handler, {
                  capture: modifiers.capture
                });
                ctx2.handler = value;
                on("clickoutside", el, value, {
                  capture: modifiers.capture
                });
              }
            } else {
              el[ctxKey].handler = value;
              on("clickoutside", el, value, {
                capture: modifiers.capture
              });
            }
          } else {
            if (ctx2.handler) {
              off("clickoutside", el, ctx2.handler, {
                capture: modifiers.capture
              });
              ctx2.handler = void 0;
            }
          }
        },
        unmounted(el, { modifiers }) {
          const { handler } = el[ctxKey];
          if (handler) {
            off("clickoutside", el, handler, {
              capture: modifiers.capture
            });
          }
          el[ctxKey].handler = void 0;
        }
      };
      function warn$1(location, message) {
        console.error(`[vdirs/${location}]: ${message}`);
      }
      class ZIndexManager {
        constructor() {
          this.elementZIndex = /* @__PURE__ */ new Map();
          this.nextZIndex = 2e3;
        }
        get elementCount() {
          return this.elementZIndex.size;
        }
        ensureZIndex(el, zIndex) {
          const { elementZIndex } = this;
          if (zIndex !== void 0) {
            el.style.zIndex = `${zIndex}`;
            elementZIndex.delete(el);
            return;
          }
          const { nextZIndex } = this;
          if (elementZIndex.has(el)) {
            const currentZIndex = elementZIndex.get(el);
            if (currentZIndex + 1 === this.nextZIndex)
              return;
          }
          el.style.zIndex = `${nextZIndex}`;
          elementZIndex.set(el, nextZIndex);
          this.nextZIndex = nextZIndex + 1;
          this.squashState();
        }
        unregister(el, zIndex) {
          const { elementZIndex } = this;
          if (elementZIndex.has(el)) {
            elementZIndex.delete(el);
          } else if (zIndex === void 0) {
            warn$1("z-index-manager/unregister-element", "Element not found when unregistering.");
          }
          this.squashState();
        }
        squashState() {
          const { elementCount } = this;
          if (!elementCount) {
            this.nextZIndex = 2e3;
          }
          if (this.nextZIndex - elementCount > 2500)
            this.rearrange();
        }
        rearrange() {
          const elementZIndexPair = Array.from(this.elementZIndex.entries());
          elementZIndexPair.sort((pair1, pair2) => {
            return pair1[1] - pair2[1];
          });
          this.nextZIndex = 2e3;
          elementZIndexPair.forEach((pair) => {
            const el = pair[0];
            const zIndex = this.nextZIndex++;
            if (`${zIndex}` !== el.style.zIndex)
              el.style.zIndex = `${zIndex}`;
          });
        }
      }
      const zIndexManager = new ZIndexManager();
      const ctx = "@@ziContext";
      const zindexable = {
        mounted(el, bindings) {
          const { value = {} } = bindings;
          const { zIndex, enabled } = value;
          el[ctx] = {
            enabled: !!enabled,
            initialized: false
          };
          if (enabled) {
            zIndexManager.ensureZIndex(el, zIndex);
            el[ctx].initialized = true;
          }
        },
        updated(el, bindings) {
          const { value = {} } = bindings;
          const { zIndex, enabled } = value;
          const cachedEnabled = el[ctx].enabled;
          if (enabled && !cachedEnabled) {
            zIndexManager.ensureZIndex(el, zIndex);
            el[ctx].initialized = true;
          }
          el[ctx].enabled = !!enabled;
        },
        unmounted(el, bindings) {
          if (!el[ctx].initialized)
            return;
          const { value = {} } = bindings;
          const { zIndex } = value;
          zIndexManager.unregister(el, zIndex);
        }
      };
      const ssrContextKey = "@css-render/vue3-ssr";
      function createStyleString(id, style2) {
        return `<style cssr-id="${id}">
${style2}
</style>`;
      }
      function ssrAdapter(id, style2, ssrContext) {
        const { styles: styles2, ids } = ssrContext;
        if (ids.has(id))
          return;
        if (styles2 !== null) {
          ids.add(id);
          styles2.push(createStyleString(id, style2));
        }
      }
      const isBrowser = typeof document !== "undefined";
      function useSsrAdapter() {
        if (isBrowser)
          return void 0;
        const context = vue.inject(ssrContextKey, null);
        if (context === null)
          return void 0;
        return {
          adapter: (id, style2) => ssrAdapter(id, style2, context),
          context
        };
      }
      function warn(location, message) {
        console.error(`[vueuc/${location}]: ${message}`);
      }
      const { c } = CssRender();
      const cssrAnchorMetaName$1 = "vueuc-style";
      function lowBit(n) {
        return n & -n;
      }
      class FinweckTree {
        /**
         * @param l length of the array
         * @param min min value of the array
         */
        constructor(l, min) {
          this.l = l;
          this.min = min;
          const ft = new Array(l + 1);
          for (let i = 0; i < l + 1; ++i) {
            ft[i] = 0;
          }
          this.ft = ft;
        }
        /**
         * Add arr[i] by n, start from 0
         * @param i the index of the element to be added
         * @param n the value to be added
         */
        add(i, n) {
          if (n === 0)
            return;
          const { l, ft } = this;
          i += 1;
          while (i <= l) {
            ft[i] += n;
            i += lowBit(i);
          }
        }
        /**
         * Get the value of index i
         * @param i index
         * @returns value of the index
         */
        get(i) {
          return this.sum(i + 1) - this.sum(i);
        }
        /**
         * Get the sum of first i elements
         * @param i count of head elements to be added
         * @returns the sum of first i elements
         */
        sum(i) {
          if (i === void 0)
            i = this.l;
          if (i <= 0)
            return 0;
          const { ft, min, l } = this;
          if (i > l)
            throw new Error("[FinweckTree.sum]: `i` is larger than length.");
          let ret = i * min;
          while (i > 0) {
            ret += ft[i];
            i -= lowBit(i);
          }
          return ret;
        }
        /**
         * Get the largest count of head elements whose sum are <= threshold
         * @param threshold
         * @returns the largest count of head elements whose sum are <= threshold
         */
        getBound(threshold) {
          let l = 0;
          let r = this.l;
          while (r > l) {
            const m = Math.floor((l + r) / 2);
            const sumM = this.sum(m);
            if (sumM > threshold) {
              r = m;
              continue;
            } else if (sumM < threshold) {
              if (l === m) {
                if (this.sum(l + 1) <= threshold)
                  return l + 1;
                return m;
              }
              l = m;
            } else {
              return m;
            }
          }
          return l;
        }
      }
      function resolveTo(selector) {
        if (typeof selector === "string") {
          return document.querySelector(selector);
        }
        return selector();
      }
      const LazyTeleport = vue.defineComponent({
        name: "LazyTeleport",
        props: {
          to: {
            type: [String, Object],
            default: void 0
          },
          disabled: Boolean,
          show: {
            type: Boolean,
            required: true
          }
        },
        setup(props) {
          return {
            showTeleport: useFalseUntilTruthy(vue.toRef(props, "show")),
            mergedTo: vue.computed(() => {
              const { to } = props;
              return to !== null && to !== void 0 ? to : "body";
            })
          };
        },
        render() {
          return this.showTeleport ? this.disabled ? getSlot("lazy-teleport", this.$slots) : vue.h(vue.Teleport, {
            disabled: this.disabled,
            to: this.mergedTo
          }, getSlot("lazy-teleport", this.$slots)) : null;
        }
      });
      const oppositionPositions = {
        top: "bottom",
        bottom: "top",
        left: "right",
        right: "left"
      };
      const oppositeAligns = {
        start: "end",
        center: "center",
        end: "start"
      };
      const propToCompare = {
        top: "height",
        bottom: "height",
        left: "width",
        right: "width"
      };
      const transformOrigins = {
        "bottom-start": "top left",
        bottom: "top center",
        "bottom-end": "top right",
        "top-start": "bottom left",
        top: "bottom center",
        "top-end": "bottom right",
        "right-start": "top left",
        right: "center left",
        "right-end": "bottom left",
        "left-start": "top right",
        left: "center right",
        "left-end": "bottom right"
      };
      const overlapTransformOrigin = {
        "bottom-start": "bottom left",
        bottom: "bottom center",
        "bottom-end": "bottom right",
        "top-start": "top left",
        top: "top center",
        "top-end": "top right",
        "right-start": "top right",
        right: "center right",
        "right-end": "bottom right",
        "left-start": "top left",
        left: "center left",
        "left-end": "bottom left"
      };
      const oppositeAlignCssPositionProps = {
        "bottom-start": "right",
        "bottom-end": "left",
        "top-start": "right",
        "top-end": "left",
        "right-start": "bottom",
        "right-end": "top",
        "left-start": "bottom",
        "left-end": "top"
      };
      const keepOffsetDirection = {
        top: true,
        bottom: false,
        left: true,
        right: false
        // left--
      };
      const cssPositionToOppositeAlign = {
        top: "end",
        bottom: "start",
        left: "end",
        right: "start"
      };
      function getPlacementAndOffsetOfFollower(placement, targetRect, followerRect, shift, flip, overlap) {
        if (!flip || overlap) {
          return { placement, top: 0, left: 0 };
        }
        const [position, align] = placement.split("-");
        let properAlign = align !== null && align !== void 0 ? align : "center";
        let properOffset = {
          top: 0,
          left: 0
        };
        const deriveOffset = (oppositeAlignCssSizeProp, alignCssPositionProp, offsetVertically2) => {
          let left = 0;
          let top = 0;
          const diff = followerRect[oppositeAlignCssSizeProp] - targetRect[alignCssPositionProp] - targetRect[oppositeAlignCssSizeProp];
          if (diff > 0 && shift) {
            if (offsetVertically2) {
              top = keepOffsetDirection[alignCssPositionProp] ? diff : -diff;
            } else {
              left = keepOffsetDirection[alignCssPositionProp] ? diff : -diff;
            }
          }
          return {
            left,
            top
          };
        };
        const offsetVertically = position === "left" || position === "right";
        if (properAlign !== "center") {
          const oppositeAlignCssPositionProp = oppositeAlignCssPositionProps[placement];
          const currentAlignCssPositionProp = oppositionPositions[oppositeAlignCssPositionProp];
          const oppositeAlignCssSizeProp = propToCompare[oppositeAlignCssPositionProp];
          if (followerRect[oppositeAlignCssSizeProp] > targetRect[oppositeAlignCssSizeProp]) {
            if (
              // current space is not enough
              // ----------[ target ]---------|
              // -------[     follower        ]
              targetRect[oppositeAlignCssPositionProp] + targetRect[oppositeAlignCssSizeProp] < followerRect[oppositeAlignCssSizeProp]
            ) {
              const followerOverTargetSize = (followerRect[oppositeAlignCssSizeProp] - targetRect[oppositeAlignCssSizeProp]) / 2;
              if (targetRect[oppositeAlignCssPositionProp] < followerOverTargetSize || targetRect[currentAlignCssPositionProp] < followerOverTargetSize) {
                if (targetRect[oppositeAlignCssPositionProp] < targetRect[currentAlignCssPositionProp]) {
                  properAlign = oppositeAligns[align];
                  properOffset = deriveOffset(oppositeAlignCssSizeProp, currentAlignCssPositionProp, offsetVertically);
                } else {
                  properOffset = deriveOffset(oppositeAlignCssSizeProp, oppositeAlignCssPositionProp, offsetVertically);
                }
              } else {
                properAlign = "center";
              }
            }
          } else if (followerRect[oppositeAlignCssSizeProp] < targetRect[oppositeAlignCssSizeProp]) {
            if (targetRect[currentAlignCssPositionProp] < 0 && // opposite align has larger space
            // ------------[   target   ]
            // ----------------[follower]
            targetRect[oppositeAlignCssPositionProp] > targetRect[currentAlignCssPositionProp]) {
              properAlign = oppositeAligns[align];
            }
          }
        } else {
          const possibleAlternativeAlignCssPositionProp1 = position === "bottom" || position === "top" ? "left" : "top";
          const possibleAlternativeAlignCssPositionProp2 = oppositionPositions[possibleAlternativeAlignCssPositionProp1];
          const alternativeAlignCssSizeProp = propToCompare[possibleAlternativeAlignCssPositionProp1];
          const followerOverTargetSize = (followerRect[alternativeAlignCssSizeProp] - targetRect[alternativeAlignCssSizeProp]) / 2;
          if (
            // center is not enough
            // ----------- [ target ]--|
            // -------[     follower     ]
            targetRect[possibleAlternativeAlignCssPositionProp1] < followerOverTargetSize || targetRect[possibleAlternativeAlignCssPositionProp2] < followerOverTargetSize
          ) {
            if (targetRect[possibleAlternativeAlignCssPositionProp1] > targetRect[possibleAlternativeAlignCssPositionProp2]) {
              properAlign = cssPositionToOppositeAlign[possibleAlternativeAlignCssPositionProp1];
              properOffset = deriveOffset(alternativeAlignCssSizeProp, possibleAlternativeAlignCssPositionProp1, offsetVertically);
            } else {
              properAlign = cssPositionToOppositeAlign[possibleAlternativeAlignCssPositionProp2];
              properOffset = deriveOffset(alternativeAlignCssSizeProp, possibleAlternativeAlignCssPositionProp2, offsetVertically);
            }
          }
        }
        let properPosition = position;
        if (
          // space is not enough
          targetRect[position] < followerRect[propToCompare[position]] && // opposite position's space is larger
          targetRect[position] < targetRect[oppositionPositions[position]]
        ) {
          properPosition = oppositionPositions[position];
        }
        return {
          placement: properAlign !== "center" ? `${properPosition}-${properAlign}` : properPosition,
          left: properOffset.left,
          top: properOffset.top
        };
      }
      function getProperTransformOrigin(placement, overlap) {
        if (overlap)
          return overlapTransformOrigin[placement];
        return transformOrigins[placement];
      }
      function getOffset(placement, offsetRect, targetRect, offsetTopToStandardPlacement, offsetLeftToStandardPlacement, overlap) {
        if (overlap) {
          switch (placement) {
            case "bottom-start":
              return {
                top: `${Math.round(targetRect.top - offsetRect.top + targetRect.height)}px`,
                left: `${Math.round(targetRect.left - offsetRect.left)}px`,
                transform: "translateY(-100%)"
              };
            case "bottom-end":
              return {
                top: `${Math.round(targetRect.top - offsetRect.top + targetRect.height)}px`,
                left: `${Math.round(targetRect.left - offsetRect.left + targetRect.width)}px`,
                transform: "translateX(-100%) translateY(-100%)"
              };
            case "top-start":
              return {
                top: `${Math.round(targetRect.top - offsetRect.top)}px`,
                left: `${Math.round(targetRect.left - offsetRect.left)}px`,
                transform: ""
              };
            case "top-end":
              return {
                top: `${Math.round(targetRect.top - offsetRect.top)}px`,
                left: `${Math.round(targetRect.left - offsetRect.left + targetRect.width)}px`,
                transform: "translateX(-100%)"
              };
            case "right-start":
              return {
                top: `${Math.round(targetRect.top - offsetRect.top)}px`,
                left: `${Math.round(targetRect.left - offsetRect.left + targetRect.width)}px`,
                transform: "translateX(-100%)"
              };
            case "right-end":
              return {
                top: `${Math.round(targetRect.top - offsetRect.top + targetRect.height)}px`,
                left: `${Math.round(targetRect.left - offsetRect.left + targetRect.width)}px`,
                transform: "translateX(-100%) translateY(-100%)"
              };
            case "left-start":
              return {
                top: `${Math.round(targetRect.top - offsetRect.top)}px`,
                left: `${Math.round(targetRect.left - offsetRect.left)}px`,
                transform: ""
              };
            case "left-end":
              return {
                top: `${Math.round(targetRect.top - offsetRect.top + targetRect.height)}px`,
                left: `${Math.round(targetRect.left - offsetRect.left)}px`,
                transform: "translateY(-100%)"
              };
            case "top":
              return {
                top: `${Math.round(targetRect.top - offsetRect.top)}px`,
                left: `${Math.round(targetRect.left - offsetRect.left + targetRect.width / 2)}px`,
                transform: "translateX(-50%)"
              };
            case "right":
              return {
                top: `${Math.round(targetRect.top - offsetRect.top + targetRect.height / 2)}px`,
                left: `${Math.round(targetRect.left - offsetRect.left + targetRect.width)}px`,
                transform: "translateX(-100%) translateY(-50%)"
              };
            case "left":
              return {
                top: `${Math.round(targetRect.top - offsetRect.top + targetRect.height / 2)}px`,
                left: `${Math.round(targetRect.left - offsetRect.left)}px`,
                transform: "translateY(-50%)"
              };
            case "bottom":
            default:
              return {
                top: `${Math.round(targetRect.top - offsetRect.top + targetRect.height)}px`,
                left: `${Math.round(targetRect.left - offsetRect.left + targetRect.width / 2)}px`,
                transform: "translateX(-50%) translateY(-100%)"
              };
          }
        }
        switch (placement) {
          case "bottom-start":
            return {
              top: `${Math.round(targetRect.top - offsetRect.top + targetRect.height + offsetTopToStandardPlacement)}px`,
              left: `${Math.round(targetRect.left - offsetRect.left + offsetLeftToStandardPlacement)}px`,
              transform: ""
            };
          case "bottom-end":
            return {
              top: `${Math.round(targetRect.top - offsetRect.top + targetRect.height + offsetTopToStandardPlacement)}px`,
              left: `${Math.round(targetRect.left - offsetRect.left + targetRect.width + offsetLeftToStandardPlacement)}px`,
              transform: "translateX(-100%)"
            };
          case "top-start":
            return {
              top: `${Math.round(targetRect.top - offsetRect.top + offsetTopToStandardPlacement)}px`,
              left: `${Math.round(targetRect.left - offsetRect.left + offsetLeftToStandardPlacement)}px`,
              transform: "translateY(-100%)"
            };
          case "top-end":
            return {
              top: `${Math.round(targetRect.top - offsetRect.top + offsetTopToStandardPlacement)}px`,
              left: `${Math.round(targetRect.left - offsetRect.left + targetRect.width + offsetLeftToStandardPlacement)}px`,
              transform: "translateX(-100%) translateY(-100%)"
            };
          case "right-start":
            return {
              top: `${Math.round(targetRect.top - offsetRect.top + offsetTopToStandardPlacement)}px`,
              left: `${Math.round(targetRect.left - offsetRect.left + targetRect.width + offsetLeftToStandardPlacement)}px`,
              transform: ""
            };
          case "right-end":
            return {
              top: `${Math.round(targetRect.top - offsetRect.top + targetRect.height + offsetTopToStandardPlacement)}px`,
              left: `${Math.round(targetRect.left - offsetRect.left + targetRect.width + offsetLeftToStandardPlacement)}px`,
              transform: "translateY(-100%)"
            };
          case "left-start":
            return {
              top: `${Math.round(targetRect.top - offsetRect.top + offsetTopToStandardPlacement)}px`,
              left: `${Math.round(targetRect.left - offsetRect.left + offsetLeftToStandardPlacement)}px`,
              transform: "translateX(-100%)"
            };
          case "left-end":
            return {
              top: `${Math.round(targetRect.top - offsetRect.top + targetRect.height + offsetTopToStandardPlacement)}px`,
              left: `${Math.round(targetRect.left - offsetRect.left + offsetLeftToStandardPlacement)}px`,
              transform: "translateX(-100%) translateY(-100%)"
            };
          case "top":
            return {
              top: `${Math.round(targetRect.top - offsetRect.top + offsetTopToStandardPlacement)}px`,
              left: `${Math.round(targetRect.left - offsetRect.left + targetRect.width / 2 + offsetLeftToStandardPlacement)}px`,
              transform: "translateY(-100%) translateX(-50%)"
            };
          case "right":
            return {
              top: `${Math.round(targetRect.top - offsetRect.top + targetRect.height / 2 + offsetTopToStandardPlacement)}px`,
              left: `${Math.round(targetRect.left - offsetRect.left + targetRect.width + offsetLeftToStandardPlacement)}px`,
              transform: "translateY(-50%)"
            };
          case "left":
            return {
              top: `${Math.round(targetRect.top - offsetRect.top + targetRect.height / 2 + offsetTopToStandardPlacement)}px`,
              left: `${Math.round(targetRect.left - offsetRect.left + offsetLeftToStandardPlacement)}px`,
              transform: "translateY(-50%) translateX(-100%)"
            };
          case "bottom":
          default:
            return {
              top: `${Math.round(targetRect.top - offsetRect.top + targetRect.height + offsetTopToStandardPlacement)}px`,
              left: `${Math.round(targetRect.left - offsetRect.left + targetRect.width / 2 + offsetLeftToStandardPlacement)}px`,
              transform: "translateX(-50%)"
            };
        }
      }
      const style$o = c([
        c(".v-binder-follower-container", {
          position: "absolute",
          left: "0",
          right: "0",
          top: "0",
          height: "0",
          pointerEvents: "none",
          zIndex: "auto"
        }),
        c(".v-binder-follower-content", {
          position: "absolute",
          zIndex: "auto"
        }, [
          c("> *", {
            pointerEvents: "all"
          })
        ])
      ]);
      const VFollower = vue.defineComponent({
        name: "Follower",
        inheritAttrs: false,
        props: {
          show: Boolean,
          enabled: {
            type: Boolean,
            default: void 0
          },
          placement: {
            type: String,
            default: "bottom"
          },
          syncTrigger: {
            type: Array,
            default: ["resize", "scroll"]
          },
          to: [String, Object],
          flip: {
            type: Boolean,
            default: true
          },
          internalShift: Boolean,
          x: Number,
          y: Number,
          width: String,
          minWidth: String,
          containerClass: String,
          teleportDisabled: Boolean,
          zindexable: {
            type: Boolean,
            default: true
          },
          zIndex: Number,
          overlap: Boolean
        },
        setup(props) {
          const VBinder = vue.inject("VBinder");
          const mergedEnabledRef = useMemo(() => {
            return props.enabled !== void 0 ? props.enabled : props.show;
          });
          const followerRef = vue.ref(null);
          const offsetContainerRef = vue.ref(null);
          const ensureListeners = () => {
            const { syncTrigger } = props;
            if (syncTrigger.includes("scroll")) {
              VBinder.addScrollListener(syncPosition);
            }
            if (syncTrigger.includes("resize")) {
              VBinder.addResizeListener(syncPosition);
            }
          };
          const removeListeners = () => {
            VBinder.removeScrollListener(syncPosition);
            VBinder.removeResizeListener(syncPosition);
          };
          vue.onMounted(() => {
            if (mergedEnabledRef.value) {
              syncPosition();
              ensureListeners();
            }
          });
          const ssrAdapter2 = useSsrAdapter();
          style$o.mount({
            id: "vueuc/binder",
            head: true,
            anchorMetaName: cssrAnchorMetaName$1,
            ssr: ssrAdapter2
          });
          vue.onBeforeUnmount(() => {
            removeListeners();
          });
          onFontsReady(() => {
            if (mergedEnabledRef.value) {
              syncPosition();
            }
          });
          const syncPosition = () => {
            if (!mergedEnabledRef.value) {
              return;
            }
            const follower = followerRef.value;
            if (follower === null)
              return;
            const target = VBinder.targetRef;
            const { x, y, overlap } = props;
            const targetRect = x !== void 0 && y !== void 0 ? getPointRect(x, y) : getRect(target);
            follower.style.setProperty("--v-target-width", `${Math.round(targetRect.width)}px`);
            follower.style.setProperty("--v-target-height", `${Math.round(targetRect.height)}px`);
            const { width, minWidth, placement, internalShift, flip } = props;
            follower.setAttribute("v-placement", placement);
            if (overlap) {
              follower.setAttribute("v-overlap", "");
            } else {
              follower.removeAttribute("v-overlap");
            }
            const { style: style2 } = follower;
            if (width === "target") {
              style2.width = `${targetRect.width}px`;
            } else if (width !== void 0) {
              style2.width = width;
            } else {
              style2.width = "";
            }
            if (minWidth === "target") {
              style2.minWidth = `${targetRect.width}px`;
            } else if (minWidth !== void 0) {
              style2.minWidth = minWidth;
            } else {
              style2.minWidth = "";
            }
            const followerRect = getRect(follower);
            const offsetContainerRect = getRect(offsetContainerRef.value);
            const { left: offsetLeftToStandardPlacement, top: offsetTopToStandardPlacement, placement: properPlacement } = getPlacementAndOffsetOfFollower(placement, targetRect, followerRect, internalShift, flip, overlap);
            const properTransformOrigin = getProperTransformOrigin(properPlacement, overlap);
            const { left, top, transform } = getOffset(properPlacement, offsetContainerRect, targetRect, offsetTopToStandardPlacement, offsetLeftToStandardPlacement, overlap);
            follower.setAttribute("v-placement", properPlacement);
            follower.style.setProperty("--v-offset-left", `${Math.round(offsetLeftToStandardPlacement)}px`);
            follower.style.setProperty("--v-offset-top", `${Math.round(offsetTopToStandardPlacement)}px`);
            follower.style.transform = `translateX(${left}) translateY(${top}) ${transform}`;
            follower.style.setProperty("--v-transform-origin", properTransformOrigin);
            follower.style.transformOrigin = properTransformOrigin;
          };
          vue.watch(mergedEnabledRef, (value) => {
            if (value) {
              ensureListeners();
              syncOnNextTick();
            } else {
              removeListeners();
            }
          });
          const syncOnNextTick = () => {
            vue.nextTick().then(syncPosition).catch((e) => console.error(e));
          };
          [
            "placement",
            "x",
            "y",
            "internalShift",
            "flip",
            "width",
            "overlap",
            "minWidth"
          ].forEach((prop) => {
            vue.watch(vue.toRef(props, prop), syncPosition);
          });
          ["teleportDisabled"].forEach((prop) => {
            vue.watch(vue.toRef(props, prop), syncOnNextTick);
          });
          vue.watch(vue.toRef(props, "syncTrigger"), (value) => {
            if (!value.includes("resize")) {
              VBinder.removeResizeListener(syncPosition);
            } else {
              VBinder.addResizeListener(syncPosition);
            }
            if (!value.includes("scroll")) {
              VBinder.removeScrollListener(syncPosition);
            } else {
              VBinder.addScrollListener(syncPosition);
            }
          });
          const isMountedRef = isMounted();
          const mergedToRef = useMemo(() => {
            const { to } = props;
            if (to !== void 0)
              return to;
            if (isMountedRef.value) {
              return void 0;
            }
            return void 0;
          });
          return {
            VBinder,
            mergedEnabled: mergedEnabledRef,
            offsetContainerRef,
            followerRef,
            mergedTo: mergedToRef,
            syncPosition
          };
        },
        render() {
          return vue.h(LazyTeleport, {
            show: this.show,
            to: this.mergedTo,
            disabled: this.teleportDisabled
          }, {
            default: () => {
              var _a, _b;
              const vNode = vue.h("div", {
                class: ["v-binder-follower-container", this.containerClass],
                ref: "offsetContainerRef"
              }, [
                vue.h("div", {
                  class: "v-binder-follower-content",
                  ref: "followerRef"
                }, (_b = (_a = this.$slots).default) === null || _b === void 0 ? void 0 : _b.call(_a))
              ]);
              if (this.zindexable) {
                return vue.withDirectives(vNode, [
                  [
                    zindexable,
                    {
                      enabled: this.mergedEnabled,
                      zIndex: this.zIndex
                    }
                  ]
                ]);
              }
              return vNode;
            }
          });
        }
      });
      var resizeObservers = [];
      var hasActiveObservations = function() {
        return resizeObservers.some(function(ro) {
          return ro.activeTargets.length > 0;
        });
      };
      var hasSkippedObservations = function() {
        return resizeObservers.some(function(ro) {
          return ro.skippedTargets.length > 0;
        });
      };
      var msg = "ResizeObserver loop completed with undelivered notifications.";
      var deliverResizeLoopError = function() {
        var event;
        if (typeof ErrorEvent === "function") {
          event = new ErrorEvent("error", {
            message: msg
          });
        } else {
          event = document.createEvent("Event");
          event.initEvent("error", false, false);
          event.message = msg;
        }
        window.dispatchEvent(event);
      };
      var ResizeObserverBoxOptions;
      (function(ResizeObserverBoxOptions2) {
        ResizeObserverBoxOptions2["BORDER_BOX"] = "border-box";
        ResizeObserverBoxOptions2["CONTENT_BOX"] = "content-box";
        ResizeObserverBoxOptions2["DEVICE_PIXEL_CONTENT_BOX"] = "device-pixel-content-box";
      })(ResizeObserverBoxOptions || (ResizeObserverBoxOptions = {}));
      var freeze = function(obj) {
        return Object.freeze(obj);
      };
      var ResizeObserverSize = /* @__PURE__ */ function() {
        function ResizeObserverSize2(inlineSize, blockSize) {
          this.inlineSize = inlineSize;
          this.blockSize = blockSize;
          freeze(this);
        }
        return ResizeObserverSize2;
      }();
      var DOMRectReadOnly = function() {
        function DOMRectReadOnly2(x, y, width, height) {
          this.x = x;
          this.y = y;
          this.width = width;
          this.height = height;
          this.top = this.y;
          this.left = this.x;
          this.bottom = this.top + this.height;
          this.right = this.left + this.width;
          return freeze(this);
        }
        DOMRectReadOnly2.prototype.toJSON = function() {
          var _a = this, x = _a.x, y = _a.y, top = _a.top, right = _a.right, bottom = _a.bottom, left = _a.left, width = _a.width, height = _a.height;
          return { x, y, top, right, bottom, left, width, height };
        };
        DOMRectReadOnly2.fromRect = function(rectangle) {
          return new DOMRectReadOnly2(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
        };
        return DOMRectReadOnly2;
      }();
      var isSVG = function(target) {
        return target instanceof SVGElement && "getBBox" in target;
      };
      var isHidden = function(target) {
        if (isSVG(target)) {
          var _a = target.getBBox(), width = _a.width, height = _a.height;
          return !width && !height;
        }
        var _b = target, offsetWidth = _b.offsetWidth, offsetHeight = _b.offsetHeight;
        return !(offsetWidth || offsetHeight || target.getClientRects().length);
      };
      var isElement = function(obj) {
        var _a;
        if (obj instanceof Element) {
          return true;
        }
        var scope = (_a = obj === null || obj === void 0 ? void 0 : obj.ownerDocument) === null || _a === void 0 ? void 0 : _a.defaultView;
        return !!(scope && obj instanceof scope.Element);
      };
      var isReplacedElement = function(target) {
        switch (target.tagName) {
          case "INPUT":
            if (target.type !== "image") {
              break;
            }
          case "VIDEO":
          case "AUDIO":
          case "EMBED":
          case "OBJECT":
          case "CANVAS":
          case "IFRAME":
          case "IMG":
            return true;
        }
        return false;
      };
      var global$1 = typeof window !== "undefined" ? window : {};
      var cache = /* @__PURE__ */ new WeakMap();
      var scrollRegexp = /auto|scroll/;
      var verticalRegexp = /^tb|vertical/;
      var IE = /msie|trident/i.test(global$1.navigator && global$1.navigator.userAgent);
      var parseDimension = function(pixel) {
        return parseFloat(pixel || "0");
      };
      var size = function(inlineSize, blockSize, switchSizes) {
        if (inlineSize === void 0) {
          inlineSize = 0;
        }
        if (blockSize === void 0) {
          blockSize = 0;
        }
        if (switchSizes === void 0) {
          switchSizes = false;
        }
        return new ResizeObserverSize((switchSizes ? blockSize : inlineSize) || 0, (switchSizes ? inlineSize : blockSize) || 0);
      };
      var zeroBoxes = freeze({
        devicePixelContentBoxSize: size(),
        borderBoxSize: size(),
        contentBoxSize: size(),
        contentRect: new DOMRectReadOnly(0, 0, 0, 0)
      });
      var calculateBoxSizes = function(target, forceRecalculation) {
        if (forceRecalculation === void 0) {
          forceRecalculation = false;
        }
        if (cache.has(target) && !forceRecalculation) {
          return cache.get(target);
        }
        if (isHidden(target)) {
          cache.set(target, zeroBoxes);
          return zeroBoxes;
        }
        var cs = getComputedStyle(target);
        var svg = isSVG(target) && target.ownerSVGElement && target.getBBox();
        var removePadding = !IE && cs.boxSizing === "border-box";
        var switchSizes = verticalRegexp.test(cs.writingMode || "");
        var canScrollVertically = !svg && scrollRegexp.test(cs.overflowY || "");
        var canScrollHorizontally = !svg && scrollRegexp.test(cs.overflowX || "");
        var paddingTop = svg ? 0 : parseDimension(cs.paddingTop);
        var paddingRight = svg ? 0 : parseDimension(cs.paddingRight);
        var paddingBottom = svg ? 0 : parseDimension(cs.paddingBottom);
        var paddingLeft = svg ? 0 : parseDimension(cs.paddingLeft);
        var borderTop = svg ? 0 : parseDimension(cs.borderTopWidth);
        var borderRight = svg ? 0 : parseDimension(cs.borderRightWidth);
        var borderBottom = svg ? 0 : parseDimension(cs.borderBottomWidth);
        var borderLeft = svg ? 0 : parseDimension(cs.borderLeftWidth);
        var horizontalPadding = paddingLeft + paddingRight;
        var verticalPadding = paddingTop + paddingBottom;
        var horizontalBorderArea = borderLeft + borderRight;
        var verticalBorderArea = borderTop + borderBottom;
        var horizontalScrollbarThickness = !canScrollHorizontally ? 0 : target.offsetHeight - verticalBorderArea - target.clientHeight;
        var verticalScrollbarThickness = !canScrollVertically ? 0 : target.offsetWidth - horizontalBorderArea - target.clientWidth;
        var widthReduction = removePadding ? horizontalPadding + horizontalBorderArea : 0;
        var heightReduction = removePadding ? verticalPadding + verticalBorderArea : 0;
        var contentWidth = svg ? svg.width : parseDimension(cs.width) - widthReduction - verticalScrollbarThickness;
        var contentHeight = svg ? svg.height : parseDimension(cs.height) - heightReduction - horizontalScrollbarThickness;
        var borderBoxWidth = contentWidth + horizontalPadding + verticalScrollbarThickness + horizontalBorderArea;
        var borderBoxHeight = contentHeight + verticalPadding + horizontalScrollbarThickness + verticalBorderArea;
        var boxes = freeze({
          devicePixelContentBoxSize: size(Math.round(contentWidth * devicePixelRatio), Math.round(contentHeight * devicePixelRatio), switchSizes),
          borderBoxSize: size(borderBoxWidth, borderBoxHeight, switchSizes),
          contentBoxSize: size(contentWidth, contentHeight, switchSizes),
          contentRect: new DOMRectReadOnly(paddingLeft, paddingTop, contentWidth, contentHeight)
        });
        cache.set(target, boxes);
        return boxes;
      };
      var calculateBoxSize = function(target, observedBox, forceRecalculation) {
        var _a = calculateBoxSizes(target, forceRecalculation), borderBoxSize = _a.borderBoxSize, contentBoxSize = _a.contentBoxSize, devicePixelContentBoxSize = _a.devicePixelContentBoxSize;
        switch (observedBox) {
          case ResizeObserverBoxOptions.DEVICE_PIXEL_CONTENT_BOX:
            return devicePixelContentBoxSize;
          case ResizeObserverBoxOptions.BORDER_BOX:
            return borderBoxSize;
          default:
            return contentBoxSize;
        }
      };
      var ResizeObserverEntry = /* @__PURE__ */ function() {
        function ResizeObserverEntry2(target) {
          var boxes = calculateBoxSizes(target);
          this.target = target;
          this.contentRect = boxes.contentRect;
          this.borderBoxSize = freeze([boxes.borderBoxSize]);
          this.contentBoxSize = freeze([boxes.contentBoxSize]);
          this.devicePixelContentBoxSize = freeze([boxes.devicePixelContentBoxSize]);
        }
        return ResizeObserverEntry2;
      }();
      var calculateDepthForNode = function(node) {
        if (isHidden(node)) {
          return Infinity;
        }
        var depth = 0;
        var parent = node.parentNode;
        while (parent) {
          depth += 1;
          parent = parent.parentNode;
        }
        return depth;
      };
      var broadcastActiveObservations = function() {
        var shallowestDepth = Infinity;
        var callbacks2 = [];
        resizeObservers.forEach(function processObserver(ro) {
          if (ro.activeTargets.length === 0) {
            return;
          }
          var entries = [];
          ro.activeTargets.forEach(function processTarget(ot) {
            var entry = new ResizeObserverEntry(ot.target);
            var targetDepth = calculateDepthForNode(ot.target);
            entries.push(entry);
            ot.lastReportedSize = calculateBoxSize(ot.target, ot.observedBox);
            if (targetDepth < shallowestDepth) {
              shallowestDepth = targetDepth;
            }
          });
          callbacks2.push(function resizeObserverCallback() {
            ro.callback.call(ro.observer, entries, ro.observer);
          });
          ro.activeTargets.splice(0, ro.activeTargets.length);
        });
        for (var _i = 0, callbacks_1 = callbacks2; _i < callbacks_1.length; _i++) {
          var callback = callbacks_1[_i];
          callback();
        }
        return shallowestDepth;
      };
      var gatherActiveObservationsAtDepth = function(depth) {
        resizeObservers.forEach(function processObserver(ro) {
          ro.activeTargets.splice(0, ro.activeTargets.length);
          ro.skippedTargets.splice(0, ro.skippedTargets.length);
          ro.observationTargets.forEach(function processTarget(ot) {
            if (ot.isActive()) {
              if (calculateDepthForNode(ot.target) > depth) {
                ro.activeTargets.push(ot);
              } else {
                ro.skippedTargets.push(ot);
              }
            }
          });
        });
      };
      var process$1 = function() {
        var depth = 0;
        gatherActiveObservationsAtDepth(depth);
        while (hasActiveObservations()) {
          depth = broadcastActiveObservations();
          gatherActiveObservationsAtDepth(depth);
        }
        if (hasSkippedObservations()) {
          deliverResizeLoopError();
        }
        return depth > 0;
      };
      var trigger;
      var callbacks = [];
      var notify = function() {
        return callbacks.splice(0).forEach(function(cb) {
          return cb();
        });
      };
      var queueMicroTask = function(callback) {
        if (!trigger) {
          var toggle_1 = 0;
          var el_1 = document.createTextNode("");
          var config = { characterData: true };
          new MutationObserver(function() {
            return notify();
          }).observe(el_1, config);
          trigger = function() {
            el_1.textContent = "".concat(toggle_1 ? toggle_1-- : toggle_1++);
          };
        }
        callbacks.push(callback);
        trigger();
      };
      var queueResizeObserver = function(cb) {
        queueMicroTask(function ResizeObserver2() {
          requestAnimationFrame(cb);
        });
      };
      var watching = 0;
      var isWatching = function() {
        return !!watching;
      };
      var CATCH_PERIOD = 250;
      var observerConfig = { attributes: true, characterData: true, childList: true, subtree: true };
      var events = [
        "resize",
        "load",
        "transitionend",
        "animationend",
        "animationstart",
        "animationiteration",
        "keyup",
        "keydown",
        "mouseup",
        "mousedown",
        "mouseover",
        "mouseout",
        "blur",
        "focus"
      ];
      var time = function(timeout) {
        if (timeout === void 0) {
          timeout = 0;
        }
        return Date.now() + timeout;
      };
      var scheduled = false;
      var Scheduler = function() {
        function Scheduler2() {
          var _this = this;
          this.stopped = true;
          this.listener = function() {
            return _this.schedule();
          };
        }
        Scheduler2.prototype.run = function(timeout) {
          var _this = this;
          if (timeout === void 0) {
            timeout = CATCH_PERIOD;
          }
          if (scheduled) {
            return;
          }
          scheduled = true;
          var until = time(timeout);
          queueResizeObserver(function() {
            var elementsHaveResized = false;
            try {
              elementsHaveResized = process$1();
            } finally {
              scheduled = false;
              timeout = until - time();
              if (!isWatching()) {
                return;
              }
              if (elementsHaveResized) {
                _this.run(1e3);
              } else if (timeout > 0) {
                _this.run(timeout);
              } else {
                _this.start();
              }
            }
          });
        };
        Scheduler2.prototype.schedule = function() {
          this.stop();
          this.run();
        };
        Scheduler2.prototype.observe = function() {
          var _this = this;
          var cb = function() {
            return _this.observer && _this.observer.observe(document.body, observerConfig);
          };
          document.body ? cb() : global$1.addEventListener("DOMContentLoaded", cb);
        };
        Scheduler2.prototype.start = function() {
          var _this = this;
          if (this.stopped) {
            this.stopped = false;
            this.observer = new MutationObserver(this.listener);
            this.observe();
            events.forEach(function(name) {
              return global$1.addEventListener(name, _this.listener, true);
            });
          }
        };
        Scheduler2.prototype.stop = function() {
          var _this = this;
          if (!this.stopped) {
            this.observer && this.observer.disconnect();
            events.forEach(function(name) {
              return global$1.removeEventListener(name, _this.listener, true);
            });
            this.stopped = true;
          }
        };
        return Scheduler2;
      }();
      var scheduler = new Scheduler();
      var updateCount = function(n) {
        !watching && n > 0 && scheduler.start();
        watching += n;
        !watching && scheduler.stop();
      };
      var skipNotifyOnElement = function(target) {
        return !isSVG(target) && !isReplacedElement(target) && getComputedStyle(target).display === "inline";
      };
      var ResizeObservation = function() {
        function ResizeObservation2(target, observedBox) {
          this.target = target;
          this.observedBox = observedBox || ResizeObserverBoxOptions.CONTENT_BOX;
          this.lastReportedSize = {
            inlineSize: 0,
            blockSize: 0
          };
        }
        ResizeObservation2.prototype.isActive = function() {
          var size2 = calculateBoxSize(this.target, this.observedBox, true);
          if (skipNotifyOnElement(this.target)) {
            this.lastReportedSize = size2;
          }
          if (this.lastReportedSize.inlineSize !== size2.inlineSize || this.lastReportedSize.blockSize !== size2.blockSize) {
            return true;
          }
          return false;
        };
        return ResizeObservation2;
      }();
      var ResizeObserverDetail = /* @__PURE__ */ function() {
        function ResizeObserverDetail2(resizeObserver, callback) {
          this.activeTargets = [];
          this.skippedTargets = [];
          this.observationTargets = [];
          this.observer = resizeObserver;
          this.callback = callback;
        }
        return ResizeObserverDetail2;
      }();
      var observerMap = /* @__PURE__ */ new WeakMap();
      var getObservationIndex = function(observationTargets, target) {
        for (var i = 0; i < observationTargets.length; i += 1) {
          if (observationTargets[i].target === target) {
            return i;
          }
        }
        return -1;
      };
      var ResizeObserverController = function() {
        function ResizeObserverController2() {
        }
        ResizeObserverController2.connect = function(resizeObserver, callback) {
          var detail = new ResizeObserverDetail(resizeObserver, callback);
          observerMap.set(resizeObserver, detail);
        };
        ResizeObserverController2.observe = function(resizeObserver, target, options) {
          var detail = observerMap.get(resizeObserver);
          var firstObservation = detail.observationTargets.length === 0;
          if (getObservationIndex(detail.observationTargets, target) < 0) {
            firstObservation && resizeObservers.push(detail);
            detail.observationTargets.push(new ResizeObservation(target, options && options.box));
            updateCount(1);
            scheduler.schedule();
          }
        };
        ResizeObserverController2.unobserve = function(resizeObserver, target) {
          var detail = observerMap.get(resizeObserver);
          var index = getObservationIndex(detail.observationTargets, target);
          var lastObservation = detail.observationTargets.length === 1;
          if (index >= 0) {
            lastObservation && resizeObservers.splice(resizeObservers.indexOf(detail), 1);
            detail.observationTargets.splice(index, 1);
            updateCount(-1);
          }
        };
        ResizeObserverController2.disconnect = function(resizeObserver) {
          var _this = this;
          var detail = observerMap.get(resizeObserver);
          detail.observationTargets.slice().forEach(function(ot) {
            return _this.unobserve(resizeObserver, ot.target);
          });
          detail.activeTargets.splice(0, detail.activeTargets.length);
        };
        return ResizeObserverController2;
      }();
      var ResizeObserver = function() {
        function ResizeObserver2(callback) {
          if (arguments.length === 0) {
            throw new TypeError("Failed to construct 'ResizeObserver': 1 argument required, but only 0 present.");
          }
          if (typeof callback !== "function") {
            throw new TypeError("Failed to construct 'ResizeObserver': The callback provided as parameter 1 is not a function.");
          }
          ResizeObserverController.connect(this, callback);
        }
        ResizeObserver2.prototype.observe = function(target, options) {
          if (arguments.length === 0) {
            throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': 1 argument required, but only 0 present.");
          }
          if (!isElement(target)) {
            throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': parameter 1 is not of type 'Element");
          }
          ResizeObserverController.observe(this, target, options);
        };
        ResizeObserver2.prototype.unobserve = function(target) {
          if (arguments.length === 0) {
            throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': 1 argument required, but only 0 present.");
          }
          if (!isElement(target)) {
            throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': parameter 1 is not of type 'Element");
          }
          ResizeObserverController.unobserve(this, target);
        };
        ResizeObserver2.prototype.disconnect = function() {
          ResizeObserverController.disconnect(this);
        };
        ResizeObserver2.toString = function() {
          return "function ResizeObserver () { [polyfill code] }";
        };
        return ResizeObserver2;
      }();
      class ResizeObserverDelegate {
        constructor() {
          this.handleResize = this.handleResize.bind(this);
          this.observer = new (typeof window !== "undefined" && window.ResizeObserver || ResizeObserver)(this.handleResize);
          this.elHandlersMap = /* @__PURE__ */ new Map();
        }
        handleResize(entries) {
          for (const entry of entries) {
            const handler = this.elHandlersMap.get(entry.target);
            if (handler !== void 0) {
              handler(entry);
            }
          }
        }
        registerHandler(el, handler) {
          this.elHandlersMap.set(el, handler);
          this.observer.observe(el);
        }
        unregisterHandler(el) {
          if (!this.elHandlersMap.has(el)) {
            return;
          }
          this.elHandlersMap.delete(el);
          this.observer.unobserve(el);
        }
      }
      const resizeObserverManager = new ResizeObserverDelegate();
      const VResizeObserver = vue.defineComponent({
        name: "ResizeObserver",
        props: {
          onResize: Function
        },
        setup(props) {
          let registered = false;
          const proxy = vue.getCurrentInstance().proxy;
          function handleResize(entry) {
            const { onResize } = props;
            if (onResize !== void 0)
              onResize(entry);
          }
          vue.onMounted(() => {
            const el = proxy.$el;
            if (el === void 0) {
              warn("resize-observer", "$el does not exist.");
              return;
            }
            if (el.nextElementSibling !== el.nextSibling) {
              if (el.nodeType === 3 && el.nodeValue !== "") {
                warn("resize-observer", "$el can not be observed (it may be a text node).");
                return;
              }
            }
            if (el.nextElementSibling !== null) {
              resizeObserverManager.registerHandler(el.nextElementSibling, handleResize);
              registered = true;
            }
          });
          vue.onBeforeUnmount(() => {
            if (registered) {
              resizeObserverManager.unregisterHandler(proxy.$el.nextElementSibling);
            }
          });
        },
        render() {
          return vue.renderSlot(this.$slots, "default");
        }
      });
      let maybeTouch;
      function ensureMaybeTouch() {
        if (typeof document === "undefined")
          return false;
        if (maybeTouch === void 0) {
          if ("matchMedia" in window) {
            maybeTouch = window.matchMedia("(pointer:coarse)").matches;
          } else {
            maybeTouch = false;
          }
        }
        return maybeTouch;
      }
      let wheelScale;
      function ensureWheelScale() {
        if (typeof document === "undefined")
          return 1;
        if (wheelScale === void 0) {
          wheelScale = "chrome" in window ? window.devicePixelRatio : 1;
        }
        return wheelScale;
      }
      const styles = c(".v-vl", {
        maxHeight: "inherit",
        height: "100%",
        overflow: "auto",
        minWidth: "1px"
        // a zero width container won't be scrollable
      }, [
        c("&:not(.v-vl--show-scrollbar)", {
          scrollbarWidth: "none"
        }, [
          c("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb", {
            width: 0,
            height: 0,
            display: "none"
          })
        ])
      ]);
      const VVirtualList = vue.defineComponent({
        name: "VirtualList",
        inheritAttrs: false,
        props: {
          showScrollbar: {
            type: Boolean,
            default: true
          },
          items: {
            type: Array,
            default: () => []
          },
          // it is suppose to be the min height
          itemSize: {
            type: Number,
            required: true
          },
          itemResizable: Boolean,
          itemsStyle: [String, Object],
          visibleItemsTag: {
            type: [String, Object],
            default: "div"
          },
          visibleItemsProps: Object,
          ignoreItemResize: Boolean,
          onScroll: Function,
          onWheel: Function,
          onResize: Function,
          defaultScrollKey: [Number, String],
          defaultScrollIndex: Number,
          keyField: {
            type: String,
            default: "key"
          },
          // Whether it is a good API?
          // ResizeObserver + footer & header is not enough.
          // Too complex for simple case
          paddingTop: {
            type: [Number, String],
            default: 0
          },
          paddingBottom: {
            type: [Number, String],
            default: 0
          }
        },
        setup(props) {
          const ssrAdapter2 = useSsrAdapter();
          styles.mount({
            id: "vueuc/virtual-list",
            head: true,
            anchorMetaName: cssrAnchorMetaName$1,
            ssr: ssrAdapter2
          });
          vue.onMounted(() => {
            const { defaultScrollIndex, defaultScrollKey } = props;
            if (defaultScrollIndex !== void 0 && defaultScrollIndex !== null) {
              scrollTo({ index: defaultScrollIndex });
            } else if (defaultScrollKey !== void 0 && defaultScrollKey !== null) {
              scrollTo({ key: defaultScrollKey });
            }
          });
          let isDeactivated = false;
          let activateStateInitialized = false;
          vue.onActivated(() => {
            isDeactivated = false;
            if (!activateStateInitialized) {
              activateStateInitialized = true;
              return;
            }
            scrollTo({ top: scrollTopRef.value, left: scrollLeft });
          });
          vue.onDeactivated(() => {
            isDeactivated = true;
            if (!activateStateInitialized) {
              activateStateInitialized = true;
            }
          });
          const keyIndexMapRef = vue.computed(() => {
            const map2 = /* @__PURE__ */ new Map();
            const { keyField } = props;
            props.items.forEach((item, index) => {
              map2.set(item[keyField], index);
            });
            return map2;
          });
          const listElRef = vue.ref(null);
          const listHeightRef = vue.ref(void 0);
          const keyToHeightOffset = /* @__PURE__ */ new Map();
          const finweckTreeRef = vue.computed(() => {
            const { items, itemSize, keyField } = props;
            const ft = new FinweckTree(items.length, itemSize);
            items.forEach((item, index) => {
              const key = item[keyField];
              const heightOffset = keyToHeightOffset.get(key);
              if (heightOffset !== void 0) {
                ft.add(index, heightOffset);
              }
            });
            return ft;
          });
          const finweckTreeUpdateTrigger = vue.ref(0);
          let scrollLeft = 0;
          const scrollTopRef = vue.ref(0);
          const startIndexRef = useMemo(() => {
            return Math.max(finweckTreeRef.value.getBound(scrollTopRef.value - depx(props.paddingTop)) - 1, 0);
          });
          const viewportItemsRef = vue.computed(() => {
            const { value: listHeight } = listHeightRef;
            if (listHeight === void 0)
              return [];
            const { items, itemSize } = props;
            const startIndex = startIndexRef.value;
            const endIndex = Math.min(startIndex + Math.ceil(listHeight / itemSize + 1), items.length - 1);
            const viewportItems = [];
            for (let i = startIndex; i <= endIndex; ++i) {
              viewportItems.push(items[i]);
            }
            return viewportItems;
          });
          const scrollTo = (options, y) => {
            if (typeof options === "number") {
              scrollToPosition(options, y, "auto");
              return;
            }
            const { left, top, index, key, position, behavior, debounce = true } = options;
            if (left !== void 0 || top !== void 0) {
              scrollToPosition(left, top, behavior);
            } else if (index !== void 0) {
              scrollToIndex(index, behavior, debounce);
            } else if (key !== void 0) {
              const toIndex = keyIndexMapRef.value.get(key);
              if (toIndex !== void 0)
                scrollToIndex(toIndex, behavior, debounce);
            } else if (position === "bottom") {
              scrollToPosition(0, Number.MAX_SAFE_INTEGER, behavior);
            } else if (position === "top") {
              scrollToPosition(0, 0, behavior);
            }
          };
          let anchorIndex;
          let anchorTimerId = null;
          function scrollToIndex(index, behavior, debounce) {
            const { value: ft } = finweckTreeRef;
            const targetTop = ft.sum(index) + depx(props.paddingTop);
            if (!debounce) {
              listElRef.value.scrollTo({
                left: 0,
                top: targetTop,
                behavior
              });
            } else {
              anchorIndex = index;
              if (anchorTimerId !== null) {
                window.clearTimeout(anchorTimerId);
              }
              anchorTimerId = window.setTimeout(() => {
                anchorIndex = void 0;
                anchorTimerId = null;
              }, 16);
              const { scrollTop, offsetHeight } = listElRef.value;
              if (targetTop > scrollTop) {
                const itemSize = ft.get(index);
                if (targetTop + itemSize <= scrollTop + offsetHeight) ;
                else {
                  listElRef.value.scrollTo({
                    left: 0,
                    top: targetTop + itemSize - offsetHeight,
                    behavior
                  });
                }
              } else {
                listElRef.value.scrollTo({
                  left: 0,
                  top: targetTop,
                  behavior
                });
              }
            }
          }
          function scrollToPosition(left, top, behavior) {
            listElRef.value.scrollTo({
              left,
              top,
              behavior
            });
          }
          function handleItemResize(key, entry) {
            var _a, _b, _c;
            if (isDeactivated)
              return;
            if (props.ignoreItemResize)
              return;
            if (isHideByVShow(entry.target))
              return;
            const { value: ft } = finweckTreeRef;
            const index = keyIndexMapRef.value.get(key);
            const previousHeight = ft.get(index);
            const height = (_c = (_b = (_a = entry.borderBoxSize) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.blockSize) !== null && _c !== void 0 ? _c : entry.contentRect.height;
            if (height === previousHeight)
              return;
            const offset = height - props.itemSize;
            if (offset === 0) {
              keyToHeightOffset.delete(key);
            } else {
              keyToHeightOffset.set(key, height - props.itemSize);
            }
            const delta = height - previousHeight;
            if (delta === 0)
              return;
            ft.add(index, delta);
            const listEl = listElRef.value;
            if (listEl != null) {
              if (anchorIndex === void 0) {
                const previousHeightSum = ft.sum(index);
                if (listEl.scrollTop > previousHeightSum) {
                  listEl.scrollBy(0, delta);
                }
              } else {
                if (index < anchorIndex) {
                  listEl.scrollBy(0, delta);
                } else if (index === anchorIndex) {
                  const previousHeightSum = ft.sum(index);
                  if (height + previousHeightSum > // Note, listEl shouldn't have border, nor offsetHeight won't be
                  // correct
                  listEl.scrollTop + listEl.offsetHeight) {
                    listEl.scrollBy(0, delta);
                  }
                }
              }
              syncViewport();
            }
            finweckTreeUpdateTrigger.value++;
          }
          const mayUseWheel = !ensureMaybeTouch();
          let wheelCatched = false;
          function handleListScroll(e) {
            var _a;
            (_a = props.onScroll) === null || _a === void 0 ? void 0 : _a.call(props, e);
            if (!mayUseWheel || !wheelCatched) {
              syncViewport();
            }
          }
          function handleListWheel(e) {
            var _a;
            (_a = props.onWheel) === null || _a === void 0 ? void 0 : _a.call(props, e);
            if (mayUseWheel) {
              const listEl = listElRef.value;
              if (listEl != null) {
                if (e.deltaX === 0) {
                  if (listEl.scrollTop === 0 && e.deltaY <= 0) {
                    return;
                  }
                  if (listEl.scrollTop + listEl.offsetHeight >= listEl.scrollHeight && e.deltaY >= 0) {
                    return;
                  }
                }
                e.preventDefault();
                listEl.scrollTop += e.deltaY / ensureWheelScale();
                listEl.scrollLeft += e.deltaX / ensureWheelScale();
                syncViewport();
                wheelCatched = true;
                beforeNextFrameOnce(() => {
                  wheelCatched = false;
                });
              }
            }
          }
          function handleListResize(entry) {
            if (isDeactivated)
              return;
            if (isHideByVShow(entry.target))
              return;
            if (entry.contentRect.height === listHeightRef.value)
              return;
            listHeightRef.value = entry.contentRect.height;
            const { onResize } = props;
            if (onResize !== void 0)
              onResize(entry);
          }
          function syncViewport() {
            const { value: listEl } = listElRef;
            if (listEl == null)
              return;
            scrollTopRef.value = listEl.scrollTop;
            scrollLeft = listEl.scrollLeft;
          }
          function isHideByVShow(el) {
            let cursor = el;
            while (cursor !== null) {
              if (cursor.style.display === "none")
                return true;
              cursor = cursor.parentElement;
            }
            return false;
          }
          return {
            listHeight: listHeightRef,
            listStyle: {
              overflow: "auto"
            },
            keyToIndex: keyIndexMapRef,
            itemsStyle: vue.computed(() => {
              const { itemResizable } = props;
              const height = pxfy(finweckTreeRef.value.sum());
              finweckTreeUpdateTrigger.value;
              return [
                props.itemsStyle,
                {
                  boxSizing: "content-box",
                  height: itemResizable ? "" : height,
                  minHeight: itemResizable ? height : "",
                  paddingTop: pxfy(props.paddingTop),
                  paddingBottom: pxfy(props.paddingBottom)
                }
              ];
            }),
            visibleItemsStyle: vue.computed(() => {
              finweckTreeUpdateTrigger.value;
              return {
                transform: `translateY(${pxfy(finweckTreeRef.value.sum(startIndexRef.value))})`
              };
            }),
            viewportItems: viewportItemsRef,
            listElRef,
            itemsElRef: vue.ref(null),
            scrollTo,
            handleListResize,
            handleListScroll,
            handleListWheel,
            handleItemResize
          };
        },
        render() {
          const { itemResizable, keyField, keyToIndex, visibleItemsTag } = this;
          return vue.h(VResizeObserver, {
            onResize: this.handleListResize
          }, {
            default: () => {
              var _a, _b;
              return vue.h("div", vue.mergeProps(this.$attrs, {
                class: ["v-vl", this.showScrollbar && "v-vl--show-scrollbar"],
                onScroll: this.handleListScroll,
                onWheel: this.handleListWheel,
                ref: "listElRef"
              }), [
                this.items.length !== 0 ? vue.h("div", {
                  ref: "itemsElRef",
                  class: "v-vl-items",
                  style: this.itemsStyle
                }, [
                  vue.h(visibleItemsTag, Object.assign({
                    class: "v-vl-visible-items",
                    style: this.visibleItemsStyle
                  }, this.visibleItemsProps), {
                    default: () => this.viewportItems.map((item) => {
                      const key = item[keyField];
                      const index = keyToIndex.get(key);
                      const itemVNode = this.$slots.default({
                        item,
                        index
                      })[0];
                      if (itemResizable) {
                        return vue.h(VResizeObserver, {
                          key,
                          onResize: (entry) => this.handleItemResize(key, entry)
                        }, {
                          default: () => itemVNode
                        });
                      }
                      itemVNode.key = key;
                      return itemVNode;
                    })
                  })
                ]) : (_b = (_a = this.$slots).empty) === null || _b === void 0 ? void 0 : _b.call(_a)
              ]);
            }
          });
        }
      });
      const hiddenAttr = "v-hidden";
      const style$n = c("[v-hidden]", {
        display: "none!important"
      });
      const VOverflow = vue.defineComponent({
        name: "Overflow",
        props: {
          getCounter: Function,
          getTail: Function,
          updateCounter: Function,
          onUpdateCount: Function,
          onUpdateOverflow: Function
        },
        setup(props, { slots }) {
          const selfRef = vue.ref(null);
          const counterRef = vue.ref(null);
          function deriveCounter(options) {
            const { value: self2 } = selfRef;
            const { getCounter, getTail } = props;
            let counter;
            if (getCounter !== void 0)
              counter = getCounter();
            else {
              counter = counterRef.value;
            }
            if (!self2 || !counter)
              return;
            if (counter.hasAttribute(hiddenAttr)) {
              counter.removeAttribute(hiddenAttr);
            }
            const { children } = self2;
            if (options.showAllItemsBeforeCalculate) {
              for (const child of children) {
                if (child.hasAttribute(hiddenAttr)) {
                  child.removeAttribute(hiddenAttr);
                }
              }
            }
            const containerWidth = self2.offsetWidth;
            const childWidths = [];
            const tail = slots.tail ? getTail === null || getTail === void 0 ? void 0 : getTail() : null;
            let childWidthSum = tail ? tail.offsetWidth : 0;
            let overflow = false;
            const len2 = self2.children.length - (slots.tail ? 1 : 0);
            for (let i = 0; i < len2 - 1; ++i) {
              if (i < 0)
                continue;
              const child = children[i];
              if (overflow) {
                if (!child.hasAttribute(hiddenAttr)) {
                  child.setAttribute(hiddenAttr, "");
                }
                continue;
              } else if (child.hasAttribute(hiddenAttr)) {
                child.removeAttribute(hiddenAttr);
              }
              const childWidth = child.offsetWidth;
              childWidthSum += childWidth;
              childWidths[i] = childWidth;
              if (childWidthSum > containerWidth) {
                const { updateCounter } = props;
                for (let j = i; j >= 0; --j) {
                  const restCount = len2 - 1 - j;
                  if (updateCounter !== void 0) {
                    updateCounter(restCount);
                  } else {
                    counter.textContent = `${restCount}`;
                  }
                  const counterWidth = counter.offsetWidth;
                  childWidthSum -= childWidths[j];
                  if (childWidthSum + counterWidth <= containerWidth || j === 0) {
                    overflow = true;
                    i = j - 1;
                    if (tail) {
                      if (i === -1) {
                        tail.style.maxWidth = `${containerWidth - counterWidth}px`;
                        tail.style.boxSizing = "border-box";
                      } else {
                        tail.style.maxWidth = "";
                      }
                    }
                    const { onUpdateCount } = props;
                    if (onUpdateCount)
                      onUpdateCount(restCount);
                    break;
                  }
                }
              }
            }
            const { onUpdateOverflow } = props;
            if (!overflow) {
              if (onUpdateOverflow !== void 0) {
                onUpdateOverflow(false);
              }
              counter.setAttribute(hiddenAttr, "");
            } else {
              if (onUpdateOverflow !== void 0) {
                onUpdateOverflow(true);
              }
            }
          }
          const ssrAdapter2 = useSsrAdapter();
          style$n.mount({
            id: "vueuc/overflow",
            head: true,
            anchorMetaName: cssrAnchorMetaName$1,
            ssr: ssrAdapter2
          });
          vue.onMounted(() => deriveCounter({
            showAllItemsBeforeCalculate: false
          }));
          return {
            selfRef,
            counterRef,
            sync: deriveCounter
          };
        },
        render() {
          const { $slots } = this;
          vue.nextTick(() => this.sync({
            showAllItemsBeforeCalculate: false
          }));
          return vue.h("div", {
            class: "v-overflow",
            ref: "selfRef"
          }, [
            vue.renderSlot($slots, "default"),
            // $slots.counter should only has 1 element
            $slots.counter ? $slots.counter() : vue.h("span", {
              style: {
                display: "inline-block"
              },
              ref: "counterRef"
            }),
            // $slots.tail should only has 1 element
            $slots.tail ? $slots.tail() : null
          ]);
        }
      });
      function isHTMLElement(node) {
        return node instanceof HTMLElement;
      }
      function focusFirstDescendant(node) {
        for (let i = 0; i < node.childNodes.length; i++) {
          const child = node.childNodes[i];
          if (isHTMLElement(child)) {
            if (attemptFocus(child) || focusFirstDescendant(child)) {
              return true;
            }
          }
        }
        return false;
      }
      function focusLastDescendant(element) {
        for (let i = element.childNodes.length - 1; i >= 0; i--) {
          const child = element.childNodes[i];
          if (isHTMLElement(child)) {
            if (attemptFocus(child) || focusLastDescendant(child)) {
              return true;
            }
          }
        }
        return false;
      }
      function attemptFocus(element) {
        if (!isFocusable(element)) {
          return false;
        }
        try {
          element.focus({ preventScroll: true });
        } catch (e) {
        }
        return document.activeElement === element;
      }
      function isFocusable(element) {
        if (element.tabIndex > 0 || element.tabIndex === 0 && element.getAttribute("tabIndex") !== null) {
          return true;
        }
        if (element.getAttribute("disabled")) {
          return false;
        }
        switch (element.nodeName) {
          case "A":
            return !!element.href && element.rel !== "ignore";
          case "INPUT":
            return element.type !== "hidden" && element.type !== "file";
          case "BUTTON":
          case "SELECT":
          case "TEXTAREA":
            return true;
          default:
            return false;
        }
      }
      let stack = [];
      const FocusTrap = vue.defineComponent({
        name: "FocusTrap",
        props: {
          disabled: Boolean,
          active: Boolean,
          autoFocus: {
            type: Boolean,
            default: true
          },
          onEsc: Function,
          initialFocusTo: String,
          finalFocusTo: String,
          returnFocusOnDeactivated: {
            type: Boolean,
            default: true
          }
        },
        setup(props) {
          const id = createId();
          const focusableStartRef = vue.ref(null);
          const focusableEndRef = vue.ref(null);
          let activated = false;
          let ignoreInternalFocusChange = false;
          const lastFocusedElement = typeof document === "undefined" ? null : document.activeElement;
          function isCurrentActive() {
            const currentActiveId = stack[stack.length - 1];
            return currentActiveId === id;
          }
          function handleDocumentKeydown(e) {
            var _a;
            if (e.code === "Escape") {
              if (isCurrentActive()) {
                (_a = props.onEsc) === null || _a === void 0 ? void 0 : _a.call(props, e);
              }
            }
          }
          vue.onMounted(() => {
            vue.watch(() => props.active, (value) => {
              if (value) {
                activate();
                on("keydown", document, handleDocumentKeydown);
              } else {
                off("keydown", document, handleDocumentKeydown);
                if (activated) {
                  deactivate();
                }
              }
            }, {
              immediate: true
            });
          });
          vue.onBeforeUnmount(() => {
            off("keydown", document, handleDocumentKeydown);
            if (activated)
              deactivate();
          });
          function handleDocumentFocus(e) {
            if (ignoreInternalFocusChange)
              return;
            if (isCurrentActive()) {
              const mainEl = getMainEl();
              if (mainEl === null)
                return;
              if (mainEl.contains(getPreciseEventTarget(e)))
                return;
              resetFocusTo("first");
            }
          }
          function getMainEl() {
            const focusableStartEl = focusableStartRef.value;
            if (focusableStartEl === null)
              return null;
            let mainEl = focusableStartEl;
            while (true) {
              mainEl = mainEl.nextSibling;
              if (mainEl === null)
                break;
              if (mainEl instanceof Element && mainEl.tagName === "DIV") {
                break;
              }
            }
            return mainEl;
          }
          function activate() {
            var _a;
            if (props.disabled)
              return;
            stack.push(id);
            if (props.autoFocus) {
              const { initialFocusTo } = props;
              if (initialFocusTo === void 0) {
                resetFocusTo("first");
              } else {
                (_a = resolveTo(initialFocusTo)) === null || _a === void 0 ? void 0 : _a.focus({ preventScroll: true });
              }
            }
            activated = true;
            document.addEventListener("focus", handleDocumentFocus, true);
          }
          function deactivate() {
            var _a;
            if (props.disabled)
              return;
            document.removeEventListener("focus", handleDocumentFocus, true);
            stack = stack.filter((idInStack) => idInStack !== id);
            if (isCurrentActive())
              return;
            const { finalFocusTo } = props;
            if (finalFocusTo !== void 0) {
              (_a = resolveTo(finalFocusTo)) === null || _a === void 0 ? void 0 : _a.focus({ preventScroll: true });
            } else if (props.returnFocusOnDeactivated) {
              if (lastFocusedElement instanceof HTMLElement) {
                ignoreInternalFocusChange = true;
                lastFocusedElement.focus({ preventScroll: true });
                ignoreInternalFocusChange = false;
              }
            }
          }
          function resetFocusTo(target) {
            if (!isCurrentActive())
              return;
            if (props.active) {
              const focusableStartEl = focusableStartRef.value;
              const focusableEndEl = focusableEndRef.value;
              if (focusableStartEl !== null && focusableEndEl !== null) {
                const mainEl = getMainEl();
                if (mainEl == null || mainEl === focusableEndEl) {
                  ignoreInternalFocusChange = true;
                  focusableStartEl.focus({ preventScroll: true });
                  ignoreInternalFocusChange = false;
                  return;
                }
                ignoreInternalFocusChange = true;
                const focused = target === "first" ? focusFirstDescendant(mainEl) : focusLastDescendant(mainEl);
                ignoreInternalFocusChange = false;
                if (!focused) {
                  ignoreInternalFocusChange = true;
                  focusableStartEl.focus({ preventScroll: true });
                  ignoreInternalFocusChange = false;
                }
              }
            }
          }
          function handleStartFocus(e) {
            if (ignoreInternalFocusChange)
              return;
            const mainEl = getMainEl();
            if (mainEl === null)
              return;
            if (e.relatedTarget !== null && mainEl.contains(e.relatedTarget)) {
              resetFocusTo("last");
            } else {
              resetFocusTo("first");
            }
          }
          function handleEndFocus(e) {
            if (ignoreInternalFocusChange)
              return;
            if (e.relatedTarget !== null && e.relatedTarget === focusableStartRef.value) {
              resetFocusTo("last");
            } else {
              resetFocusTo("first");
            }
          }
          return {
            focusableStartRef,
            focusableEndRef,
            focusableStyle: "position: absolute; height: 0; width: 0;",
            handleStartFocus,
            handleEndFocus
          };
        },
        render() {
          const { default: defaultSlot } = this.$slots;
          if (defaultSlot === void 0)
            return null;
          if (this.disabled)
            return defaultSlot();
          const { active, focusableStyle } = this;
          return vue.h(vue.Fragment, null, [
            vue.h("div", {
              "aria-hidden": "true",
              tabindex: active ? "0" : "-1",
              ref: "focusableStartRef",
              style: focusableStyle,
              onFocus: this.handleStartFocus
            }),
            defaultSlot(),
            vue.h("div", {
              "aria-hidden": "true",
              style: focusableStyle,
              ref: "focusableEndRef",
              tabindex: active ? "0" : "-1",
              onFocus: this.handleEndFocus
            })
          ]);
        }
      });
      function useOnResize(elRef, onResize) {
        if (onResize) {
          vue.onMounted(() => {
            const {
              value: el
            } = elRef;
            if (el) {
              resizeObserverManager.registerHandler(el, onResize);
            }
          });
          vue.onBeforeUnmount(() => {
            const {
              value: el
            } = elRef;
            if (el) {
              resizeObserverManager.unregisterHandler(el);
            }
          });
        }
      }
      let lockCount = 0;
      let originalMarginRight = "";
      let originalOverflow = "";
      let originalOverflowX = "";
      let originalOverflowY = "";
      const lockHtmlScrollRightCompensationRef = vue.ref("0px");
      function useLockHtmlScroll(lockRef) {
        if (typeof document === "undefined") return;
        const el = document.documentElement;
        let watchStopHandle;
        let activated = false;
        const unlock = () => {
          el.style.marginRight = originalMarginRight;
          el.style.overflow = originalOverflow;
          el.style.overflowX = originalOverflowX;
          el.style.overflowY = originalOverflowY;
          lockHtmlScrollRightCompensationRef.value = "0px";
        };
        vue.onMounted(() => {
          watchStopHandle = vue.watch(lockRef, (value) => {
            if (value) {
              if (!lockCount) {
                const scrollbarWidth = window.innerWidth - el.offsetWidth;
                if (scrollbarWidth > 0) {
                  originalMarginRight = el.style.marginRight;
                  el.style.marginRight = `${scrollbarWidth}px`;
                  lockHtmlScrollRightCompensationRef.value = `${scrollbarWidth}px`;
                }
                originalOverflow = el.style.overflow;
                originalOverflowX = el.style.overflowX;
                originalOverflowY = el.style.overflowY;
                el.style.overflow = "hidden";
                el.style.overflowX = "hidden";
                el.style.overflowY = "hidden";
              }
              activated = true;
              lockCount++;
            } else {
              lockCount--;
              if (!lockCount) {
                unlock();
              }
              activated = false;
            }
          }, {
            immediate: true
          });
        });
        vue.onBeforeUnmount(() => {
          watchStopHandle === null || watchStopHandle === void 0 ? void 0 : watchStopHandle();
          if (activated) {
            lockCount--;
            if (!lockCount) {
              unlock();
            }
            activated = false;
          }
        });
      }
      const isComposingRef = vue.ref(false);
      function compositionStartHandler() {
        isComposingRef.value = true;
      }
      function compositionEndHandler() {
        isComposingRef.value = false;
      }
      let mountedCount = 0;
      function useIsComposing() {
        if (isBrowser$2) {
          vue.onBeforeMount(() => {
            if (!mountedCount) {
              window.addEventListener("compositionstart", compositionStartHandler);
              window.addEventListener("compositionend", compositionEndHandler);
            }
            mountedCount++;
          });
          vue.onBeforeUnmount(() => {
            if (mountedCount <= 1) {
              window.removeEventListener("compositionstart", compositionStartHandler);
              window.removeEventListener("compositionend", compositionEndHandler);
              mountedCount = 0;
            } else {
              mountedCount--;
            }
          });
        }
        return isComposingRef;
      }
      function useReactivated(callback) {
        const isDeactivatedRef = {
          isDeactivated: false
        };
        let activateStateInitialized = false;
        vue.onActivated(() => {
          isDeactivatedRef.isDeactivated = false;
          if (!activateStateInitialized) {
            activateStateInitialized = true;
            return;
          }
          callback();
        });
        vue.onDeactivated(() => {
          isDeactivatedRef.isDeactivated = true;
          if (!activateStateInitialized) {
            activateStateInitialized = true;
          }
        });
        return isDeactivatedRef;
      }
      const formItemInjectionKey = createInjectionKey("n-form-item");
      function useFormItem(props, {
        defaultSize = "medium",
        mergedSize,
        mergedDisabled
      } = {}) {
        const NFormItem2 = vue.inject(formItemInjectionKey, null);
        vue.provide(formItemInjectionKey, null);
        const mergedSizeRef = vue.computed(mergedSize ? () => mergedSize(NFormItem2) : () => {
          const {
            size: size2
          } = props;
          if (size2) return size2;
          if (NFormItem2) {
            const {
              mergedSize: mergedSize2
            } = NFormItem2;
            if (mergedSize2.value !== void 0) {
              return mergedSize2.value;
            }
          }
          return defaultSize;
        });
        const mergedDisabledRef = vue.computed(mergedDisabled ? () => mergedDisabled(NFormItem2) : () => {
          const {
            disabled
          } = props;
          if (disabled !== void 0) {
            return disabled;
          }
          if (NFormItem2) {
            return NFormItem2.disabled.value;
          }
          return false;
        });
        const mergedStatusRef = vue.computed(() => {
          const {
            status
          } = props;
          if (status) return status;
          return NFormItem2 === null || NFormItem2 === void 0 ? void 0 : NFormItem2.mergedValidationStatus.value;
        });
        vue.onBeforeUnmount(() => {
          if (NFormItem2) {
            NFormItem2.restoreValidation();
          }
        });
        return {
          mergedSizeRef,
          mergedDisabledRef,
          mergedStatusRef,
          nTriggerFormBlur() {
            if (NFormItem2) {
              NFormItem2.handleContentBlur();
            }
          },
          nTriggerFormChange() {
            if (NFormItem2) {
              NFormItem2.handleContentChange();
            }
          },
          nTriggerFormFocus() {
            if (NFormItem2) {
              NFormItem2.handleContentFocus();
            }
          },
          nTriggerFormInput() {
            if (NFormItem2) {
              NFormItem2.handleContentInput();
            }
          }
        };
      }
      var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
      var freeSelf = typeof self == "object" && self && self.Object === Object && self;
      var root = freeGlobal || freeSelf || Function("return this")();
      var Symbol$1 = root.Symbol;
      var objectProto$e = Object.prototype;
      var hasOwnProperty$b = objectProto$e.hasOwnProperty;
      var nativeObjectToString$1 = objectProto$e.toString;
      var symToStringTag$1 = Symbol$1 ? Symbol$1.toStringTag : void 0;
      function getRawTag(value) {
        var isOwn = hasOwnProperty$b.call(value, symToStringTag$1), tag = value[symToStringTag$1];
        try {
          value[symToStringTag$1] = void 0;
          var unmasked = true;
        } catch (e) {
        }
        var result = nativeObjectToString$1.call(value);
        if (unmasked) {
          if (isOwn) {
            value[symToStringTag$1] = tag;
          } else {
            delete value[symToStringTag$1];
          }
        }
        return result;
      }
      var objectProto$d = Object.prototype;
      var nativeObjectToString = objectProto$d.toString;
      function objectToString(value) {
        return nativeObjectToString.call(value);
      }
      var nullTag = "[object Null]", undefinedTag = "[object Undefined]";
      var symToStringTag = Symbol$1 ? Symbol$1.toStringTag : void 0;
      function baseGetTag(value) {
        if (value == null) {
          return value === void 0 ? undefinedTag : nullTag;
        }
        return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
      }
      function isObjectLike(value) {
        return value != null && typeof value == "object";
      }
      var symbolTag$1 = "[object Symbol]";
      function isSymbol(value) {
        return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag$1;
      }
      function arrayMap(array, iteratee) {
        var index = -1, length = array == null ? 0 : array.length, result = Array(length);
        while (++index < length) {
          result[index] = iteratee(array[index], index, array);
        }
        return result;
      }
      var isArray = Array.isArray;
      var INFINITY$1 = 1 / 0;
      var symbolProto$1 = Symbol$1 ? Symbol$1.prototype : void 0, symbolToString = symbolProto$1 ? symbolProto$1.toString : void 0;
      function baseToString(value) {
        if (typeof value == "string") {
          return value;
        }
        if (isArray(value)) {
          return arrayMap(value, baseToString) + "";
        }
        if (isSymbol(value)) {
          return symbolToString ? symbolToString.call(value) : "";
        }
        var result = value + "";
        return result == "0" && 1 / value == -INFINITY$1 ? "-0" : result;
      }
      function isObject(value) {
        var type = typeof value;
        return value != null && (type == "object" || type == "function");
      }
      function identity(value) {
        return value;
      }
      var asyncTag = "[object AsyncFunction]", funcTag$1 = "[object Function]", genTag = "[object GeneratorFunction]", proxyTag = "[object Proxy]";
      function isFunction(value) {
        if (!isObject(value)) {
          return false;
        }
        var tag = baseGetTag(value);
        return tag == funcTag$1 || tag == genTag || tag == asyncTag || tag == proxyTag;
      }
      var coreJsData = root["__core-js_shared__"];
      var maskSrcKey = function() {
        var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
        return uid ? "Symbol(src)_1." + uid : "";
      }();
      function isMasked(func) {
        return !!maskSrcKey && maskSrcKey in func;
      }
      var funcProto$2 = Function.prototype;
      var funcToString$2 = funcProto$2.toString;
      function toSource(func) {
        if (func != null) {
          try {
            return funcToString$2.call(func);
          } catch (e) {
          }
          try {
            return func + "";
          } catch (e) {
          }
        }
        return "";
      }
      var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
      var reIsHostCtor = /^\[object .+?Constructor\]$/;
      var funcProto$1 = Function.prototype, objectProto$c = Object.prototype;
      var funcToString$1 = funcProto$1.toString;
      var hasOwnProperty$a = objectProto$c.hasOwnProperty;
      var reIsNative = RegExp(
        "^" + funcToString$1.call(hasOwnProperty$a).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
      );
      function baseIsNative(value) {
        if (!isObject(value) || isMasked(value)) {
          return false;
        }
        var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
        return pattern.test(toSource(value));
      }
      function getValue$1(object, key) {
        return object == null ? void 0 : object[key];
      }
      function getNative(object, key) {
        var value = getValue$1(object, key);
        return baseIsNative(value) ? value : void 0;
      }
      var WeakMap$1 = getNative(root, "WeakMap");
      var objectCreate = Object.create;
      var baseCreate = /* @__PURE__ */ function() {
        function object() {
        }
        return function(proto) {
          if (!isObject(proto)) {
            return {};
          }
          if (objectCreate) {
            return objectCreate(proto);
          }
          object.prototype = proto;
          var result = new object();
          object.prototype = void 0;
          return result;
        };
      }();
      function apply(func, thisArg, args) {
        switch (args.length) {
          case 0:
            return func.call(thisArg);
          case 1:
            return func.call(thisArg, args[0]);
          case 2:
            return func.call(thisArg, args[0], args[1]);
          case 3:
            return func.call(thisArg, args[0], args[1], args[2]);
        }
        return func.apply(thisArg, args);
      }
      function copyArray(source, array) {
        var index = -1, length = source.length;
        array || (array = Array(length));
        while (++index < length) {
          array[index] = source[index];
        }
        return array;
      }
      var HOT_COUNT = 800, HOT_SPAN = 16;
      var nativeNow = Date.now;
      function shortOut(func) {
        var count = 0, lastCalled = 0;
        return function() {
          var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
          lastCalled = stamp;
          if (remaining > 0) {
            if (++count >= HOT_COUNT) {
              return arguments[0];
            }
          } else {
            count = 0;
          }
          return func.apply(void 0, arguments);
        };
      }
      function constant(value) {
        return function() {
          return value;
        };
      }
      var defineProperty = function() {
        try {
          var func = getNative(Object, "defineProperty");
          func({}, "", {});
          return func;
        } catch (e) {
        }
      }();
      var baseSetToString = !defineProperty ? identity : function(func, string2) {
        return defineProperty(func, "toString", {
          "configurable": true,
          "enumerable": false,
          "value": constant(string2),
          "writable": true
        });
      };
      var setToString = shortOut(baseSetToString);
      var MAX_SAFE_INTEGER$1 = 9007199254740991;
      var reIsUint = /^(?:0|[1-9]\d*)$/;
      function isIndex(value, length) {
        var type = typeof value;
        length = length == null ? MAX_SAFE_INTEGER$1 : length;
        return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
      }
      function baseAssignValue(object, key, value) {
        if (key == "__proto__" && defineProperty) {
          defineProperty(object, key, {
            "configurable": true,
            "enumerable": true,
            "value": value,
            "writable": true
          });
        } else {
          object[key] = value;
        }
      }
      function eq(value, other) {
        return value === other || value !== value && other !== other;
      }
      var objectProto$b = Object.prototype;
      var hasOwnProperty$9 = objectProto$b.hasOwnProperty;
      function assignValue(object, key, value) {
        var objValue = object[key];
        if (!(hasOwnProperty$9.call(object, key) && eq(objValue, value)) || value === void 0 && !(key in object)) {
          baseAssignValue(object, key, value);
        }
      }
      function copyObject(source, props, object, customizer) {
        var isNew = !object;
        object || (object = {});
        var index = -1, length = props.length;
        while (++index < length) {
          var key = props[index];
          var newValue = void 0;
          if (newValue === void 0) {
            newValue = source[key];
          }
          if (isNew) {
            baseAssignValue(object, key, newValue);
          } else {
            assignValue(object, key, newValue);
          }
        }
        return object;
      }
      var nativeMax = Math.max;
      function overRest(func, start, transform) {
        start = nativeMax(start === void 0 ? func.length - 1 : start, 0);
        return function() {
          var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array(length);
          while (++index < length) {
            array[index] = args[start + index];
          }
          index = -1;
          var otherArgs = Array(start + 1);
          while (++index < start) {
            otherArgs[index] = args[index];
          }
          otherArgs[start] = transform(array);
          return apply(func, this, otherArgs);
        };
      }
      function baseRest(func, start) {
        return setToString(overRest(func, start, identity), func + "");
      }
      var MAX_SAFE_INTEGER = 9007199254740991;
      function isLength(value) {
        return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
      }
      function isArrayLike(value) {
        return value != null && isLength(value.length) && !isFunction(value);
      }
      function isIterateeCall(value, index, object) {
        if (!isObject(object)) {
          return false;
        }
        var type = typeof index;
        if (type == "number" ? isArrayLike(object) && isIndex(index, object.length) : type == "string" && index in object) {
          return eq(object[index], value);
        }
        return false;
      }
      function createAssigner(assigner) {
        return baseRest(function(object, sources) {
          var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : void 0, guard = length > 2 ? sources[2] : void 0;
          customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : void 0;
          if (guard && isIterateeCall(sources[0], sources[1], guard)) {
            customizer = length < 3 ? void 0 : customizer;
            length = 1;
          }
          object = Object(object);
          while (++index < length) {
            var source = sources[index];
            if (source) {
              assigner(object, source, index, customizer);
            }
          }
          return object;
        });
      }
      var objectProto$a = Object.prototype;
      function isPrototype(value) {
        var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto$a;
        return value === proto;
      }
      function baseTimes(n, iteratee) {
        var index = -1, result = Array(n);
        while (++index < n) {
          result[index] = iteratee(index);
        }
        return result;
      }
      var argsTag$2 = "[object Arguments]";
      function baseIsArguments(value) {
        return isObjectLike(value) && baseGetTag(value) == argsTag$2;
      }
      var objectProto$9 = Object.prototype;
      var hasOwnProperty$8 = objectProto$9.hasOwnProperty;
      var propertyIsEnumerable$1 = objectProto$9.propertyIsEnumerable;
      var isArguments = baseIsArguments(/* @__PURE__ */ function() {
        return arguments;
      }()) ? baseIsArguments : function(value) {
        return isObjectLike(value) && hasOwnProperty$8.call(value, "callee") && !propertyIsEnumerable$1.call(value, "callee");
      };
      function stubFalse() {
        return false;
      }
      var freeExports$2 = typeof exports == "object" && exports && !exports.nodeType && exports;
      var freeModule$2 = freeExports$2 && typeof module == "object" && module && !module.nodeType && module;
      var moduleExports$2 = freeModule$2 && freeModule$2.exports === freeExports$2;
      var Buffer$1 = moduleExports$2 ? root.Buffer : void 0;
      var nativeIsBuffer = Buffer$1 ? Buffer$1.isBuffer : void 0;
      var isBuffer = nativeIsBuffer || stubFalse;
      var argsTag$1 = "[object Arguments]", arrayTag$1 = "[object Array]", boolTag$1 = "[object Boolean]", dateTag$1 = "[object Date]", errorTag$1 = "[object Error]", funcTag = "[object Function]", mapTag$2 = "[object Map]", numberTag$1 = "[object Number]", objectTag$3 = "[object Object]", regexpTag$1 = "[object RegExp]", setTag$2 = "[object Set]", stringTag$1 = "[object String]", weakMapTag$1 = "[object WeakMap]";
      var arrayBufferTag$1 = "[object ArrayBuffer]", dataViewTag$2 = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
      var typedArrayTags = {};
      typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
      typedArrayTags[argsTag$1] = typedArrayTags[arrayTag$1] = typedArrayTags[arrayBufferTag$1] = typedArrayTags[boolTag$1] = typedArrayTags[dataViewTag$2] = typedArrayTags[dateTag$1] = typedArrayTags[errorTag$1] = typedArrayTags[funcTag] = typedArrayTags[mapTag$2] = typedArrayTags[numberTag$1] = typedArrayTags[objectTag$3] = typedArrayTags[regexpTag$1] = typedArrayTags[setTag$2] = typedArrayTags[stringTag$1] = typedArrayTags[weakMapTag$1] = false;
      function baseIsTypedArray(value) {
        return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
      }
      function baseUnary(func) {
        return function(value) {
          return func(value);
        };
      }
      var freeExports$1 = typeof exports == "object" && exports && !exports.nodeType && exports;
      var freeModule$1 = freeExports$1 && typeof module == "object" && module && !module.nodeType && module;
      var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;
      var freeProcess = moduleExports$1 && freeGlobal.process;
      var nodeUtil = function() {
        try {
          var types2 = freeModule$1 && freeModule$1.require && freeModule$1.require("util").types;
          if (types2) {
            return types2;
          }
          return freeProcess && freeProcess.binding && freeProcess.binding("util");
        } catch (e) {
        }
      }();
      var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
      var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
      var objectProto$8 = Object.prototype;
      var hasOwnProperty$7 = objectProto$8.hasOwnProperty;
      function arrayLikeKeys(value, inherited) {
        var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
        for (var key in value) {
          if ((inherited || hasOwnProperty$7.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
          (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
          isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
          isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
          isIndex(key, length)))) {
            result.push(key);
          }
        }
        return result;
      }
      function overArg(func, transform) {
        return function(arg) {
          return func(transform(arg));
        };
      }
      var nativeKeys = overArg(Object.keys, Object);
      var objectProto$7 = Object.prototype;
      var hasOwnProperty$6 = objectProto$7.hasOwnProperty;
      function baseKeys(object) {
        if (!isPrototype(object)) {
          return nativeKeys(object);
        }
        var result = [];
        for (var key in Object(object)) {
          if (hasOwnProperty$6.call(object, key) && key != "constructor") {
            result.push(key);
          }
        }
        return result;
      }
      function keys(object) {
        return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
      }
      function nativeKeysIn(object) {
        var result = [];
        if (object != null) {
          for (var key in Object(object)) {
            result.push(key);
          }
        }
        return result;
      }
      var objectProto$6 = Object.prototype;
      var hasOwnProperty$5 = objectProto$6.hasOwnProperty;
      function baseKeysIn(object) {
        if (!isObject(object)) {
          return nativeKeysIn(object);
        }
        var isProto = isPrototype(object), result = [];
        for (var key in object) {
          if (!(key == "constructor" && (isProto || !hasOwnProperty$5.call(object, key)))) {
            result.push(key);
          }
        }
        return result;
      }
      function keysIn(object) {
        return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
      }
      var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/;
      function isKey(value, object) {
        if (isArray(value)) {
          return false;
        }
        var type = typeof value;
        if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol(value)) {
          return true;
        }
        return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
      }
      var nativeCreate = getNative(Object, "create");
      function hashClear() {
        this.__data__ = nativeCreate ? nativeCreate(null) : {};
        this.size = 0;
      }
      function hashDelete(key) {
        var result = this.has(key) && delete this.__data__[key];
        this.size -= result ? 1 : 0;
        return result;
      }
      var HASH_UNDEFINED$2 = "__lodash_hash_undefined__";
      var objectProto$5 = Object.prototype;
      var hasOwnProperty$4 = objectProto$5.hasOwnProperty;
      function hashGet(key) {
        var data = this.__data__;
        if (nativeCreate) {
          var result = data[key];
          return result === HASH_UNDEFINED$2 ? void 0 : result;
        }
        return hasOwnProperty$4.call(data, key) ? data[key] : void 0;
      }
      var objectProto$4 = Object.prototype;
      var hasOwnProperty$3 = objectProto$4.hasOwnProperty;
      function hashHas(key) {
        var data = this.__data__;
        return nativeCreate ? data[key] !== void 0 : hasOwnProperty$3.call(data, key);
      }
      var HASH_UNDEFINED$1 = "__lodash_hash_undefined__";
      function hashSet(key, value) {
        var data = this.__data__;
        this.size += this.has(key) ? 0 : 1;
        data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED$1 : value;
        return this;
      }
      function Hash(entries) {
        var index = -1, length = entries == null ? 0 : entries.length;
        this.clear();
        while (++index < length) {
          var entry = entries[index];
          this.set(entry[0], entry[1]);
        }
      }
      Hash.prototype.clear = hashClear;
      Hash.prototype["delete"] = hashDelete;
      Hash.prototype.get = hashGet;
      Hash.prototype.has = hashHas;
      Hash.prototype.set = hashSet;
      function listCacheClear() {
        this.__data__ = [];
        this.size = 0;
      }
      function assocIndexOf(array, key) {
        var length = array.length;
        while (length--) {
          if (eq(array[length][0], key)) {
            return length;
          }
        }
        return -1;
      }
      var arrayProto = Array.prototype;
      var splice = arrayProto.splice;
      function listCacheDelete(key) {
        var data = this.__data__, index = assocIndexOf(data, key);
        if (index < 0) {
          return false;
        }
        var lastIndex = data.length - 1;
        if (index == lastIndex) {
          data.pop();
        } else {
          splice.call(data, index, 1);
        }
        --this.size;
        return true;
      }
      function listCacheGet(key) {
        var data = this.__data__, index = assocIndexOf(data, key);
        return index < 0 ? void 0 : data[index][1];
      }
      function listCacheHas(key) {
        return assocIndexOf(this.__data__, key) > -1;
      }
      function listCacheSet(key, value) {
        var data = this.__data__, index = assocIndexOf(data, key);
        if (index < 0) {
          ++this.size;
          data.push([key, value]);
        } else {
          data[index][1] = value;
        }
        return this;
      }
      function ListCache(entries) {
        var index = -1, length = entries == null ? 0 : entries.length;
        this.clear();
        while (++index < length) {
          var entry = entries[index];
          this.set(entry[0], entry[1]);
        }
      }
      ListCache.prototype.clear = listCacheClear;
      ListCache.prototype["delete"] = listCacheDelete;
      ListCache.prototype.get = listCacheGet;
      ListCache.prototype.has = listCacheHas;
      ListCache.prototype.set = listCacheSet;
      var Map$1 = getNative(root, "Map");
      function mapCacheClear() {
        this.size = 0;
        this.__data__ = {
          "hash": new Hash(),
          "map": new (Map$1 || ListCache)(),
          "string": new Hash()
        };
      }
      function isKeyable(value) {
        var type = typeof value;
        return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
      }
      function getMapData(map2, key) {
        var data = map2.__data__;
        return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
      }
      function mapCacheDelete(key) {
        var result = getMapData(this, key)["delete"](key);
        this.size -= result ? 1 : 0;
        return result;
      }
      function mapCacheGet(key) {
        return getMapData(this, key).get(key);
      }
      function mapCacheHas(key) {
        return getMapData(this, key).has(key);
      }
      function mapCacheSet(key, value) {
        var data = getMapData(this, key), size2 = data.size;
        data.set(key, value);
        this.size += data.size == size2 ? 0 : 1;
        return this;
      }
      function MapCache(entries) {
        var index = -1, length = entries == null ? 0 : entries.length;
        this.clear();
        while (++index < length) {
          var entry = entries[index];
          this.set(entry[0], entry[1]);
        }
      }
      MapCache.prototype.clear = mapCacheClear;
      MapCache.prototype["delete"] = mapCacheDelete;
      MapCache.prototype.get = mapCacheGet;
      MapCache.prototype.has = mapCacheHas;
      MapCache.prototype.set = mapCacheSet;
      var FUNC_ERROR_TEXT = "Expected a function";
      function memoize(func, resolver) {
        if (typeof func != "function" || resolver != null && typeof resolver != "function") {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
        var memoized = function() {
          var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache2 = memoized.cache;
          if (cache2.has(key)) {
            return cache2.get(key);
          }
          var result = func.apply(this, args);
          memoized.cache = cache2.set(key, result) || cache2;
          return result;
        };
        memoized.cache = new (memoize.Cache || MapCache)();
        return memoized;
      }
      memoize.Cache = MapCache;
      var MAX_MEMOIZE_SIZE = 500;
      function memoizeCapped(func) {
        var result = memoize(func, function(key) {
          if (cache2.size === MAX_MEMOIZE_SIZE) {
            cache2.clear();
          }
          return key;
        });
        var cache2 = result.cache;
        return result;
      }
      var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
      var reEscapeChar = /\\(\\)?/g;
      var stringToPath = memoizeCapped(function(string2) {
        var result = [];
        if (string2.charCodeAt(0) === 46) {
          result.push("");
        }
        string2.replace(rePropName, function(match2, number, quote, subString) {
          result.push(quote ? subString.replace(reEscapeChar, "$1") : number || match2);
        });
        return result;
      });
      function toString(value) {
        return value == null ? "" : baseToString(value);
      }
      function castPath(value, object) {
        if (isArray(value)) {
          return value;
        }
        return isKey(value, object) ? [value] : stringToPath(toString(value));
      }
      var INFINITY = 1 / 0;
      function toKey(value) {
        if (typeof value == "string" || isSymbol(value)) {
          return value;
        }
        var result = value + "";
        return result == "0" && 1 / value == -INFINITY ? "-0" : result;
      }
      function baseGet(object, path) {
        path = castPath(path, object);
        var index = 0, length = path.length;
        while (object != null && index < length) {
          object = object[toKey(path[index++])];
        }
        return index && index == length ? object : void 0;
      }
      function get(object, path, defaultValue) {
        var result = object == null ? void 0 : baseGet(object, path);
        return result === void 0 ? defaultValue : result;
      }
      function arrayPush(array, values) {
        var index = -1, length = values.length, offset = array.length;
        while (++index < length) {
          array[offset + index] = values[index];
        }
        return array;
      }
      var getPrototype = overArg(Object.getPrototypeOf, Object);
      var objectTag$2 = "[object Object]";
      var funcProto = Function.prototype, objectProto$3 = Object.prototype;
      var funcToString = funcProto.toString;
      var hasOwnProperty$2 = objectProto$3.hasOwnProperty;
      var objectCtorString = funcToString.call(Object);
      function isPlainObject(value) {
        if (!isObjectLike(value) || baseGetTag(value) != objectTag$2) {
          return false;
        }
        var proto = getPrototype(value);
        if (proto === null) {
          return true;
        }
        var Ctor = hasOwnProperty$2.call(proto, "constructor") && proto.constructor;
        return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
      }
      function baseSlice(array, start, end) {
        var index = -1, length = array.length;
        if (start < 0) {
          start = -start > length ? 0 : length + start;
        }
        end = end > length ? length : end;
        if (end < 0) {
          end += length;
        }
        length = start > end ? 0 : end - start >>> 0;
        start >>>= 0;
        var result = Array(length);
        while (++index < length) {
          result[index] = array[index + start];
        }
        return result;
      }
      function castSlice(array, start, end) {
        var length = array.length;
        end = end === void 0 ? length : end;
        return !start && end >= length ? array : baseSlice(array, start, end);
      }
      var rsAstralRange$1 = "\\ud800-\\udfff", rsComboMarksRange$1 = "\\u0300-\\u036f", reComboHalfMarksRange$1 = "\\ufe20-\\ufe2f", rsComboSymbolsRange$1 = "\\u20d0-\\u20ff", rsComboRange$1 = rsComboMarksRange$1 + reComboHalfMarksRange$1 + rsComboSymbolsRange$1, rsVarRange$1 = "\\ufe0e\\ufe0f";
      var rsZWJ$1 = "\\u200d";
      var reHasUnicode = RegExp("[" + rsZWJ$1 + rsAstralRange$1 + rsComboRange$1 + rsVarRange$1 + "]");
      function hasUnicode(string2) {
        return reHasUnicode.test(string2);
      }
      function asciiToArray(string2) {
        return string2.split("");
      }
      var rsAstralRange = "\\ud800-\\udfff", rsComboMarksRange = "\\u0300-\\u036f", reComboHalfMarksRange = "\\ufe20-\\ufe2f", rsComboSymbolsRange = "\\u20d0-\\u20ff", rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange, rsVarRange = "\\ufe0e\\ufe0f";
      var rsAstral = "[" + rsAstralRange + "]", rsCombo = "[" + rsComboRange + "]", rsFitz = "\\ud83c[\\udffb-\\udfff]", rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")", rsNonAstral = "[^" + rsAstralRange + "]", rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}", rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]", rsZWJ = "\\u200d";
      var reOptMod = rsModifier + "?", rsOptVar = "[" + rsVarRange + "]?", rsOptJoin = "(?:" + rsZWJ + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*", rsSeq = rsOptVar + reOptMod + rsOptJoin, rsSymbol = "(?:" + [rsNonAstral + rsCombo + "?", rsCombo, rsRegional, rsSurrPair, rsAstral].join("|") + ")";
      var reUnicode = RegExp(rsFitz + "(?=" + rsFitz + ")|" + rsSymbol + rsSeq, "g");
      function unicodeToArray(string2) {
        return string2.match(reUnicode) || [];
      }
      function stringToArray(string2) {
        return hasUnicode(string2) ? unicodeToArray(string2) : asciiToArray(string2);
      }
      function createCaseFirst(methodName) {
        return function(string2) {
          string2 = toString(string2);
          var strSymbols = hasUnicode(string2) ? stringToArray(string2) : void 0;
          var chr = strSymbols ? strSymbols[0] : string2.charAt(0);
          var trailing = strSymbols ? castSlice(strSymbols, 1).join("") : string2.slice(1);
          return chr[methodName]() + trailing;
        };
      }
      var upperFirst = createCaseFirst("toUpperCase");
      function stackClear() {
        this.__data__ = new ListCache();
        this.size = 0;
      }
      function stackDelete(key) {
        var data = this.__data__, result = data["delete"](key);
        this.size = data.size;
        return result;
      }
      function stackGet(key) {
        return this.__data__.get(key);
      }
      function stackHas(key) {
        return this.__data__.has(key);
      }
      var LARGE_ARRAY_SIZE = 200;
      function stackSet(key, value) {
        var data = this.__data__;
        if (data instanceof ListCache) {
          var pairs = data.__data__;
          if (!Map$1 || pairs.length < LARGE_ARRAY_SIZE - 1) {
            pairs.push([key, value]);
            this.size = ++data.size;
            return this;
          }
          data = this.__data__ = new MapCache(pairs);
        }
        data.set(key, value);
        this.size = data.size;
        return this;
      }
      function Stack(entries) {
        var data = this.__data__ = new ListCache(entries);
        this.size = data.size;
      }
      Stack.prototype.clear = stackClear;
      Stack.prototype["delete"] = stackDelete;
      Stack.prototype.get = stackGet;
      Stack.prototype.has = stackHas;
      Stack.prototype.set = stackSet;
      var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
      var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
      var moduleExports = freeModule && freeModule.exports === freeExports;
      var Buffer2 = moduleExports ? root.Buffer : void 0;
      Buffer2 ? Buffer2.allocUnsafe : void 0;
      function cloneBuffer(buffer, isDeep) {
        {
          return buffer.slice();
        }
      }
      function arrayFilter(array, predicate) {
        var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
        while (++index < length) {
          var value = array[index];
          if (predicate(value, index, array)) {
            result[resIndex++] = value;
          }
        }
        return result;
      }
      function stubArray() {
        return [];
      }
      var objectProto$2 = Object.prototype;
      var propertyIsEnumerable = objectProto$2.propertyIsEnumerable;
      var nativeGetSymbols = Object.getOwnPropertySymbols;
      var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
        if (object == null) {
          return [];
        }
        object = Object(object);
        return arrayFilter(nativeGetSymbols(object), function(symbol) {
          return propertyIsEnumerable.call(object, symbol);
        });
      };
      function baseGetAllKeys(object, keysFunc, symbolsFunc) {
        var result = keysFunc(object);
        return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
      }
      function getAllKeys(object) {
        return baseGetAllKeys(object, keys, getSymbols);
      }
      var DataView = getNative(root, "DataView");
      var Promise$1 = getNative(root, "Promise");
      var Set$1 = getNative(root, "Set");
      var mapTag$1 = "[object Map]", objectTag$1 = "[object Object]", promiseTag = "[object Promise]", setTag$1 = "[object Set]", weakMapTag = "[object WeakMap]";
      var dataViewTag$1 = "[object DataView]";
      var dataViewCtorString = toSource(DataView), mapCtorString = toSource(Map$1), promiseCtorString = toSource(Promise$1), setCtorString = toSource(Set$1), weakMapCtorString = toSource(WeakMap$1);
      var getTag = baseGetTag;
      if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag$1 || Map$1 && getTag(new Map$1()) != mapTag$1 || Promise$1 && getTag(Promise$1.resolve()) != promiseTag || Set$1 && getTag(new Set$1()) != setTag$1 || WeakMap$1 && getTag(new WeakMap$1()) != weakMapTag) {
        getTag = function(value) {
          var result = baseGetTag(value), Ctor = result == objectTag$1 ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
          if (ctorString) {
            switch (ctorString) {
              case dataViewCtorString:
                return dataViewTag$1;
              case mapCtorString:
                return mapTag$1;
              case promiseCtorString:
                return promiseTag;
              case setCtorString:
                return setTag$1;
              case weakMapCtorString:
                return weakMapTag;
            }
          }
          return result;
        };
      }
      var Uint8Array2 = root.Uint8Array;
      function cloneArrayBuffer(arrayBuffer) {
        var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
        new Uint8Array2(result).set(new Uint8Array2(arrayBuffer));
        return result;
      }
      function cloneTypedArray(typedArray, isDeep) {
        var buffer = cloneArrayBuffer(typedArray.buffer);
        return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
      }
      function initCloneObject(object) {
        return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
      }
      var HASH_UNDEFINED = "__lodash_hash_undefined__";
      function setCacheAdd(value) {
        this.__data__.set(value, HASH_UNDEFINED);
        return this;
      }
      function setCacheHas(value) {
        return this.__data__.has(value);
      }
      function SetCache(values) {
        var index = -1, length = values == null ? 0 : values.length;
        this.__data__ = new MapCache();
        while (++index < length) {
          this.add(values[index]);
        }
      }
      SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
      SetCache.prototype.has = setCacheHas;
      function arraySome(array, predicate) {
        var index = -1, length = array == null ? 0 : array.length;
        while (++index < length) {
          if (predicate(array[index], index, array)) {
            return true;
          }
        }
        return false;
      }
      function cacheHas(cache2, key) {
        return cache2.has(key);
      }
      var COMPARE_PARTIAL_FLAG$5 = 1, COMPARE_UNORDERED_FLAG$3 = 2;
      function equalArrays(array, other, bitmask, customizer, equalFunc, stack2) {
        var isPartial = bitmask & COMPARE_PARTIAL_FLAG$5, arrLength = array.length, othLength = other.length;
        if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
          return false;
        }
        var arrStacked = stack2.get(array);
        var othStacked = stack2.get(other);
        if (arrStacked && othStacked) {
          return arrStacked == other && othStacked == array;
        }
        var index = -1, result = true, seen = bitmask & COMPARE_UNORDERED_FLAG$3 ? new SetCache() : void 0;
        stack2.set(array, other);
        stack2.set(other, array);
        while (++index < arrLength) {
          var arrValue = array[index], othValue = other[index];
          if (customizer) {
            var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack2) : customizer(arrValue, othValue, index, array, other, stack2);
          }
          if (compared !== void 0) {
            if (compared) {
              continue;
            }
            result = false;
            break;
          }
          if (seen) {
            if (!arraySome(other, function(othValue2, othIndex) {
              if (!cacheHas(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack2))) {
                return seen.push(othIndex);
              }
            })) {
              result = false;
              break;
            }
          } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack2))) {
            result = false;
            break;
          }
        }
        stack2["delete"](array);
        stack2["delete"](other);
        return result;
      }
      function mapToArray(map2) {
        var index = -1, result = Array(map2.size);
        map2.forEach(function(value, key) {
          result[++index] = [key, value];
        });
        return result;
      }
      function setToArray(set) {
        var index = -1, result = Array(set.size);
        set.forEach(function(value) {
          result[++index] = value;
        });
        return result;
      }
      var COMPARE_PARTIAL_FLAG$4 = 1, COMPARE_UNORDERED_FLAG$2 = 2;
      var boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", mapTag = "[object Map]", numberTag = "[object Number]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]";
      var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]";
      var symbolProto = Symbol$1 ? Symbol$1.prototype : void 0, symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
      function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack2) {
        switch (tag) {
          case dataViewTag:
            if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
              return false;
            }
            object = object.buffer;
            other = other.buffer;
          case arrayBufferTag:
            if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array2(object), new Uint8Array2(other))) {
              return false;
            }
            return true;
          case boolTag:
          case dateTag:
          case numberTag:
            return eq(+object, +other);
          case errorTag:
            return object.name == other.name && object.message == other.message;
          case regexpTag:
          case stringTag:
            return object == other + "";
          case mapTag:
            var convert = mapToArray;
          case setTag:
            var isPartial = bitmask & COMPARE_PARTIAL_FLAG$4;
            convert || (convert = setToArray);
            if (object.size != other.size && !isPartial) {
              return false;
            }
            var stacked = stack2.get(object);
            if (stacked) {
              return stacked == other;
            }
            bitmask |= COMPARE_UNORDERED_FLAG$2;
            stack2.set(object, other);
            var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack2);
            stack2["delete"](object);
            return result;
          case symbolTag:
            if (symbolValueOf) {
              return symbolValueOf.call(object) == symbolValueOf.call(other);
            }
        }
        return false;
      }
      var COMPARE_PARTIAL_FLAG$3 = 1;
      var objectProto$1 = Object.prototype;
      var hasOwnProperty$1 = objectProto$1.hasOwnProperty;
      function equalObjects(object, other, bitmask, customizer, equalFunc, stack2) {
        var isPartial = bitmask & COMPARE_PARTIAL_FLAG$3, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
        if (objLength != othLength && !isPartial) {
          return false;
        }
        var index = objLength;
        while (index--) {
          var key = objProps[index];
          if (!(isPartial ? key in other : hasOwnProperty$1.call(other, key))) {
            return false;
          }
        }
        var objStacked = stack2.get(object);
        var othStacked = stack2.get(other);
        if (objStacked && othStacked) {
          return objStacked == other && othStacked == object;
        }
        var result = true;
        stack2.set(object, other);
        stack2.set(other, object);
        var skipCtor = isPartial;
        while (++index < objLength) {
          key = objProps[index];
          var objValue = object[key], othValue = other[key];
          if (customizer) {
            var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack2) : customizer(objValue, othValue, key, object, other, stack2);
          }
          if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack2) : compared)) {
            result = false;
            break;
          }
          skipCtor || (skipCtor = key == "constructor");
        }
        if (result && !skipCtor) {
          var objCtor = object.constructor, othCtor = other.constructor;
          if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
            result = false;
          }
        }
        stack2["delete"](object);
        stack2["delete"](other);
        return result;
      }
      var COMPARE_PARTIAL_FLAG$2 = 1;
      var argsTag = "[object Arguments]", arrayTag = "[object Array]", objectTag = "[object Object]";
      var objectProto = Object.prototype;
      var hasOwnProperty = objectProto.hasOwnProperty;
      function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack2) {
        var objIsArr = isArray(object), othIsArr = isArray(other), objTag = objIsArr ? arrayTag : getTag(object), othTag = othIsArr ? arrayTag : getTag(other);
        objTag = objTag == argsTag ? objectTag : objTag;
        othTag = othTag == argsTag ? objectTag : othTag;
        var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
        if (isSameTag && isBuffer(object)) {
          if (!isBuffer(other)) {
            return false;
          }
          objIsArr = true;
          objIsObj = false;
        }
        if (isSameTag && !objIsObj) {
          stack2 || (stack2 = new Stack());
          return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack2) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack2);
        }
        if (!(bitmask & COMPARE_PARTIAL_FLAG$2)) {
          var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
          if (objIsWrapped || othIsWrapped) {
            var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
            stack2 || (stack2 = new Stack());
            return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack2);
          }
        }
        if (!isSameTag) {
          return false;
        }
        stack2 || (stack2 = new Stack());
        return equalObjects(object, other, bitmask, customizer, equalFunc, stack2);
      }
      function baseIsEqual(value, other, bitmask, customizer, stack2) {
        if (value === other) {
          return true;
        }
        if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
          return value !== value && other !== other;
        }
        return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack2);
      }
      var COMPARE_PARTIAL_FLAG$1 = 1, COMPARE_UNORDERED_FLAG$1 = 2;
      function baseIsMatch(object, source, matchData, customizer) {
        var index = matchData.length, length = index;
        if (object == null) {
          return !length;
        }
        object = Object(object);
        while (index--) {
          var data = matchData[index];
          if (data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
            return false;
          }
        }
        while (++index < length) {
          data = matchData[index];
          var key = data[0], objValue = object[key], srcValue = data[1];
          if (data[2]) {
            if (objValue === void 0 && !(key in object)) {
              return false;
            }
          } else {
            var stack2 = new Stack();
            var result;
            if (!(result === void 0 ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG$1 | COMPARE_UNORDERED_FLAG$1, customizer, stack2) : result)) {
              return false;
            }
          }
        }
        return true;
      }
      function isStrictComparable(value) {
        return value === value && !isObject(value);
      }
      function getMatchData(object) {
        var result = keys(object), length = result.length;
        while (length--) {
          var key = result[length], value = object[key];
          result[length] = [key, value, isStrictComparable(value)];
        }
        return result;
      }
      function matchesStrictComparable(key, srcValue) {
        return function(object) {
          if (object == null) {
            return false;
          }
          return object[key] === srcValue && (srcValue !== void 0 || key in Object(object));
        };
      }
      function baseMatches(source) {
        var matchData = getMatchData(source);
        if (matchData.length == 1 && matchData[0][2]) {
          return matchesStrictComparable(matchData[0][0], matchData[0][1]);
        }
        return function(object) {
          return object === source || baseIsMatch(object, source, matchData);
        };
      }
      function baseHasIn(object, key) {
        return object != null && key in Object(object);
      }
      function hasPath(object, path, hasFunc) {
        path = castPath(path, object);
        var index = -1, length = path.length, result = false;
        while (++index < length) {
          var key = toKey(path[index]);
          if (!(result = object != null && hasFunc(object, key))) {
            break;
          }
          object = object[key];
        }
        if (result || ++index != length) {
          return result;
        }
        length = object == null ? 0 : object.length;
        return !!length && isLength(length) && isIndex(key, length) && (isArray(object) || isArguments(object));
      }
      function hasIn(object, path) {
        return object != null && hasPath(object, path, baseHasIn);
      }
      var COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2;
      function baseMatchesProperty(path, srcValue) {
        if (isKey(path) && isStrictComparable(srcValue)) {
          return matchesStrictComparable(toKey(path), srcValue);
        }
        return function(object) {
          var objValue = get(object, path);
          return objValue === void 0 && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
        };
      }
      function baseProperty(key) {
        return function(object) {
          return object == null ? void 0 : object[key];
        };
      }
      function basePropertyDeep(path) {
        return function(object) {
          return baseGet(object, path);
        };
      }
      function property(path) {
        return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
      }
      function baseIteratee(value) {
        if (typeof value == "function") {
          return value;
        }
        if (value == null) {
          return identity;
        }
        if (typeof value == "object") {
          return isArray(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
        }
        return property(value);
      }
      function createBaseFor(fromRight) {
        return function(object, iteratee, keysFunc) {
          var index = -1, iterable = Object(object), props = keysFunc(object), length = props.length;
          while (length--) {
            var key = props[++index];
            if (iteratee(iterable[key], key, iterable) === false) {
              break;
            }
          }
          return object;
        };
      }
      var baseFor = createBaseFor();
      function baseForOwn(object, iteratee) {
        return object && baseFor(object, iteratee, keys);
      }
      function createBaseEach(eachFunc, fromRight) {
        return function(collection, iteratee) {
          if (collection == null) {
            return collection;
          }
          if (!isArrayLike(collection)) {
            return eachFunc(collection, iteratee);
          }
          var length = collection.length, index = -1, iterable = Object(collection);
          while (++index < length) {
            if (iteratee(iterable[index], index, iterable) === false) {
              break;
            }
          }
          return collection;
        };
      }
      var baseEach = createBaseEach(baseForOwn);
      function assignMergeValue(object, key, value) {
        if (value !== void 0 && !eq(object[key], value) || value === void 0 && !(key in object)) {
          baseAssignValue(object, key, value);
        }
      }
      function isArrayLikeObject(value) {
        return isObjectLike(value) && isArrayLike(value);
      }
      function safeGet(object, key) {
        if (key === "constructor" && typeof object[key] === "function") {
          return;
        }
        if (key == "__proto__") {
          return;
        }
        return object[key];
      }
      function toPlainObject(value) {
        return copyObject(value, keysIn(value));
      }
      function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack2) {
        var objValue = safeGet(object, key), srcValue = safeGet(source, key), stacked = stack2.get(srcValue);
        if (stacked) {
          assignMergeValue(object, key, stacked);
          return;
        }
        var newValue = customizer ? customizer(objValue, srcValue, key + "", object, source, stack2) : void 0;
        var isCommon = newValue === void 0;
        if (isCommon) {
          var isArr = isArray(srcValue), isBuff = !isArr && isBuffer(srcValue), isTyped = !isArr && !isBuff && isTypedArray(srcValue);
          newValue = srcValue;
          if (isArr || isBuff || isTyped) {
            if (isArray(objValue)) {
              newValue = objValue;
            } else if (isArrayLikeObject(objValue)) {
              newValue = copyArray(objValue);
            } else if (isBuff) {
              isCommon = false;
              newValue = cloneBuffer(srcValue);
            } else if (isTyped) {
              isCommon = false;
              newValue = cloneTypedArray(srcValue);
            } else {
              newValue = [];
            }
          } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
            newValue = objValue;
            if (isArguments(objValue)) {
              newValue = toPlainObject(objValue);
            } else if (!isObject(objValue) || isFunction(objValue)) {
              newValue = initCloneObject(srcValue);
            }
          } else {
            isCommon = false;
          }
        }
        if (isCommon) {
          stack2.set(srcValue, newValue);
          mergeFunc(newValue, srcValue, srcIndex, customizer, stack2);
          stack2["delete"](srcValue);
        }
        assignMergeValue(object, key, newValue);
      }
      function baseMerge(object, source, srcIndex, customizer, stack2) {
        if (object === source) {
          return;
        }
        baseFor(source, function(srcValue, key) {
          stack2 || (stack2 = new Stack());
          if (isObject(srcValue)) {
            baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack2);
          } else {
            var newValue = customizer ? customizer(safeGet(object, key), srcValue, key + "", object, source, stack2) : void 0;
            if (newValue === void 0) {
              newValue = srcValue;
            }
            assignMergeValue(object, key, newValue);
          }
        }, keysIn);
      }
      function baseMap(collection, iteratee) {
        var index = -1, result = isArrayLike(collection) ? Array(collection.length) : [];
        baseEach(collection, function(value, key, collection2) {
          result[++index] = iteratee(value, key, collection2);
        });
        return result;
      }
      function map(collection, iteratee) {
        var func = isArray(collection) ? arrayMap : baseMap;
        return func(collection, baseIteratee(iteratee));
      }
      var merge$1 = createAssigner(function(object, source, srcIndex) {
        baseMerge(object, source, srcIndex);
      });
      const commonVariables$m = {
        fontFamily: 'v-sans, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        fontFamilyMono: "v-mono, SFMono-Regular, Menlo, Consolas, Courier, monospace",
        fontWeight: "400",
        fontWeightStrong: "500",
        cubicBezierEaseInOut: "cubic-bezier(.4, 0, .2, 1)",
        cubicBezierEaseOut: "cubic-bezier(0, 0, .2, 1)",
        cubicBezierEaseIn: "cubic-bezier(.4, 0, 1, 1)",
        borderRadius: "3px",
        borderRadiusSmall: "2px",
        fontSize: "14px",
        fontSizeMini: "12px",
        fontSizeTiny: "12px",
        fontSizeSmall: "14px",
        fontSizeMedium: "14px",
        fontSizeLarge: "15px",
        fontSizeHuge: "16px",
        lineHeight: "1.6",
        heightMini: "16px",
        // private now, it's too small
        heightTiny: "22px",
        heightSmall: "28px",
        heightMedium: "34px",
        heightLarge: "40px",
        heightHuge: "46px"
      };
      const {
        fontSize,
        fontFamily,
        lineHeight
      } = commonVariables$m;
      const globalStyle = c$1("body", `
 margin: 0;
 font-size: ${fontSize};
 font-family: ${fontFamily};
 line-height: ${lineHeight};
 -webkit-text-size-adjust: 100%;
 -webkit-tap-highlight-color: transparent;
`, [c$1("input", `
 font-family: inherit;
 font-size: inherit;
 `)]);
      const configProviderInjectionKey = createInjectionKey("n-config-provider");
      const cssrAnchorMetaName = "naive-ui-style";
      function createTheme(theme) {
        return theme;
      }
      function useTheme(resolveId, mountId, style2, defaultTheme, props, clsPrefixRef) {
        const ssrAdapter2 = useSsrAdapter();
        const NConfigProvider2 = vue.inject(configProviderInjectionKey, null);
        if (style2) {
          const mountStyle = () => {
            const clsPrefix = clsPrefixRef === null || clsPrefixRef === void 0 ? void 0 : clsPrefixRef.value;
            style2.mount({
              id: clsPrefix === void 0 ? mountId : clsPrefix + mountId,
              head: true,
              props: {
                bPrefix: clsPrefix ? `.${clsPrefix}-` : void 0
              },
              anchorMetaName: cssrAnchorMetaName,
              ssr: ssrAdapter2
            });
            if (!(NConfigProvider2 === null || NConfigProvider2 === void 0 ? void 0 : NConfigProvider2.preflightStyleDisabled)) {
              globalStyle.mount({
                id: "n-global",
                head: true,
                anchorMetaName: cssrAnchorMetaName,
                ssr: ssrAdapter2
              });
            }
          };
          if (ssrAdapter2) {
            mountStyle();
          } else {
            vue.onBeforeMount(mountStyle);
          }
        }
        const mergedThemeRef = vue.computed(() => {
          var _a;
          const {
            theme: {
              common: selfCommon,
              self: self2,
              peers = {}
            } = {},
            themeOverrides: selfOverrides = {},
            builtinThemeOverrides: builtinOverrides = {}
          } = props;
          const {
            common: selfCommonOverrides,
            peers: peersOverrides
          } = selfOverrides;
          const {
            common: globalCommon = void 0,
            [resolveId]: {
              common: globalSelfCommon = void 0,
              self: globalSelf = void 0,
              peers: globalPeers = {}
            } = {}
          } = (NConfigProvider2 === null || NConfigProvider2 === void 0 ? void 0 : NConfigProvider2.mergedThemeRef.value) || {};
          const {
            common: globalCommonOverrides = void 0,
            [resolveId]: globalSelfOverrides = {}
          } = (NConfigProvider2 === null || NConfigProvider2 === void 0 ? void 0 : NConfigProvider2.mergedThemeOverridesRef.value) || {};
          const {
            common: globalSelfCommonOverrides,
            peers: globalPeersOverrides = {}
          } = globalSelfOverrides;
          const mergedCommon = merge$1({}, selfCommon || globalSelfCommon || globalCommon || defaultTheme.common, globalCommonOverrides, globalSelfCommonOverrides, selfCommonOverrides);
          const mergedSelf = merge$1(
            // {}, executed every time, no need for empty obj
            (_a = self2 || globalSelf || defaultTheme.self) === null || _a === void 0 ? void 0 : _a(mergedCommon),
            builtinOverrides,
            globalSelfOverrides,
            selfOverrides
          );
          return {
            common: mergedCommon,
            self: mergedSelf,
            peers: merge$1({}, defaultTheme.peers, globalPeers, peers),
            peerOverrides: merge$1({}, builtinOverrides.peers, globalPeersOverrides, peersOverrides)
          };
        });
        return mergedThemeRef;
      }
      useTheme.props = {
        theme: Object,
        themeOverrides: Object,
        builtinThemeOverrides: Object
      };
      const defaultClsPrefix = "n";
      function useConfig(props = {}, options = {
        defaultBordered: true
      }) {
        const NConfigProvider2 = vue.inject(configProviderInjectionKey, null);
        return {
          // NConfigProvider,
          inlineThemeDisabled: NConfigProvider2 === null || NConfigProvider2 === void 0 ? void 0 : NConfigProvider2.inlineThemeDisabled,
          mergedRtlRef: NConfigProvider2 === null || NConfigProvider2 === void 0 ? void 0 : NConfigProvider2.mergedRtlRef,
          mergedComponentPropsRef: NConfigProvider2 === null || NConfigProvider2 === void 0 ? void 0 : NConfigProvider2.mergedComponentPropsRef,
          mergedBreakpointsRef: NConfigProvider2 === null || NConfigProvider2 === void 0 ? void 0 : NConfigProvider2.mergedBreakpointsRef,
          mergedBorderedRef: vue.computed(() => {
            var _a, _b;
            const {
              bordered
            } = props;
            if (bordered !== void 0) return bordered;
            return (_b = (_a = NConfigProvider2 === null || NConfigProvider2 === void 0 ? void 0 : NConfigProvider2.mergedBorderedRef.value) !== null && _a !== void 0 ? _a : options.defaultBordered) !== null && _b !== void 0 ? _b : true;
          }),
          mergedClsPrefixRef: NConfigProvider2 ? NConfigProvider2.mergedClsPrefixRef : vue.shallowRef(defaultClsPrefix),
          namespaceRef: vue.computed(() => NConfigProvider2 === null || NConfigProvider2 === void 0 ? void 0 : NConfigProvider2.mergedNamespaceRef.value)
        };
      }
      const enUS = {
        name: "en-US",
        global: {
          undo: "Undo",
          redo: "Redo",
          confirm: "Confirm",
          clear: "Clear"
        },
        Popconfirm: {
          positiveText: "Confirm",
          negativeText: "Cancel"
        },
        Cascader: {
          placeholder: "Please Select",
          loading: "Loading",
          loadingRequiredMessage: (label) => `Please load all ${label}'s descendants before checking it.`
        },
        Time: {
          dateFormat: "yyyy-MM-dd",
          dateTimeFormat: "yyyy-MM-dd HH:mm:ss"
        },
        DatePicker: {
          yearFormat: "yyyy",
          monthFormat: "MMM",
          dayFormat: "eeeeee",
          yearTypeFormat: "yyyy",
          monthTypeFormat: "yyyy-MM",
          dateFormat: "yyyy-MM-dd",
          dateTimeFormat: "yyyy-MM-dd HH:mm:ss",
          quarterFormat: "yyyy-qqq",
          weekFormat: "RRRR-w",
          clear: "Clear",
          now: "Now",
          confirm: "Confirm",
          selectTime: "Select Time",
          selectDate: "Select Date",
          datePlaceholder: "Select Date",
          datetimePlaceholder: "Select Date and Time",
          monthPlaceholder: "Select Month",
          yearPlaceholder: "Select Year",
          quarterPlaceholder: "Select Quarter",
          weekPlaceholder: "Select Week",
          startDatePlaceholder: "Start Date",
          endDatePlaceholder: "End Date",
          startDatetimePlaceholder: "Start Date and Time",
          endDatetimePlaceholder: "End Date and Time",
          startMonthPlaceholder: "Start Month",
          endMonthPlaceholder: "End Month",
          monthBeforeYear: true,
          firstDayOfWeek: 6,
          today: "Today"
        },
        DataTable: {
          checkTableAll: "Select all in the table",
          uncheckTableAll: "Unselect all in the table",
          confirm: "Confirm",
          clear: "Clear"
        },
        LegacyTransfer: {
          sourceTitle: "Source",
          targetTitle: "Target"
        },
        Transfer: {
          selectAll: "Select all",
          unselectAll: "Unselect all",
          clearAll: "Clear",
          total: (num) => `Total ${num} items`,
          selected: (num) => `${num} items selected`
        },
        Empty: {
          description: "No Data"
        },
        Select: {
          placeholder: "Please Select"
        },
        TimePicker: {
          placeholder: "Select Time",
          positiveText: "OK",
          negativeText: "Cancel",
          now: "Now",
          clear: "Clear"
        },
        Pagination: {
          goto: "Goto",
          selectionSuffix: "page"
        },
        DynamicTags: {
          add: "Add"
        },
        Log: {
          loading: "Loading"
        },
        Input: {
          placeholder: "Please Input"
        },
        InputNumber: {
          placeholder: "Please Input"
        },
        DynamicInput: {
          create: "Create"
        },
        ThemeEditor: {
          title: "Theme Editor",
          clearAllVars: "Clear All Variables",
          clearSearch: "Clear Search",
          filterCompName: "Filter Component Name",
          filterVarName: "Filter Variable Name",
          import: "Import",
          export: "Export",
          restore: "Reset to Default"
        },
        Image: {
          tipPrevious: "Previous picture (←)",
          tipNext: "Next picture (→)",
          tipCounterclockwise: "Counterclockwise",
          tipClockwise: "Clockwise",
          tipZoomOut: "Zoom out",
          tipZoomIn: "Zoom in",
          tipDownload: "Download",
          tipClose: "Close (Esc)",
          // TODO: translation
          tipOriginalSize: "Zoom to original size"
        }
      };
      function buildFormatLongFn(args) {
        return function() {
          var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
          var width = options.width ? String(options.width) : args.defaultWidth;
          var format2 = args.formats[width] || args.formats[args.defaultWidth];
          return format2;
        };
      }
      function buildLocalizeFn(args) {
        return function(dirtyIndex, options) {
          var context = options !== null && options !== void 0 && options.context ? String(options.context) : "standalone";
          var valuesArray;
          if (context === "formatting" && args.formattingValues) {
            var defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
            var width = options !== null && options !== void 0 && options.width ? String(options.width) : defaultWidth;
            valuesArray = args.formattingValues[width] || args.formattingValues[defaultWidth];
          } else {
            var _defaultWidth = args.defaultWidth;
            var _width = options !== null && options !== void 0 && options.width ? String(options.width) : args.defaultWidth;
            valuesArray = args.values[_width] || args.values[_defaultWidth];
          }
          var index = args.argumentCallback ? args.argumentCallback(dirtyIndex) : dirtyIndex;
          return valuesArray[index];
        };
      }
      function buildMatchFn(args) {
        return function(string2) {
          var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
          var width = options.width;
          var matchPattern = width && args.matchPatterns[width] || args.matchPatterns[args.defaultMatchWidth];
          var matchResult = string2.match(matchPattern);
          if (!matchResult) {
            return null;
          }
          var matchedString = matchResult[0];
          var parsePatterns = width && args.parsePatterns[width] || args.parsePatterns[args.defaultParseWidth];
          var key = Array.isArray(parsePatterns) ? findIndex(parsePatterns, function(pattern) {
            return pattern.test(matchedString);
          }) : findKey(parsePatterns, function(pattern) {
            return pattern.test(matchedString);
          });
          var value;
          value = args.valueCallback ? args.valueCallback(key) : key;
          value = options.valueCallback ? options.valueCallback(value) : value;
          var rest = string2.slice(matchedString.length);
          return {
            value,
            rest
          };
        };
      }
      function findKey(object, predicate) {
        for (var key in object) {
          if (object.hasOwnProperty(key) && predicate(object[key])) {
            return key;
          }
        }
        return void 0;
      }
      function findIndex(array, predicate) {
        for (var key = 0; key < array.length; key++) {
          if (predicate(array[key])) {
            return key;
          }
        }
        return void 0;
      }
      function buildMatchPatternFn(args) {
        return function(string2) {
          var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
          var matchResult = string2.match(args.matchPattern);
          if (!matchResult) return null;
          var matchedString = matchResult[0];
          var parseResult = string2.match(args.parsePattern);
          if (!parseResult) return null;
          var value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];
          value = options.valueCallback ? options.valueCallback(value) : value;
          var rest = string2.slice(matchedString.length);
          return {
            value,
            rest
          };
        };
      }
      var formatDistanceLocale = {
        lessThanXSeconds: {
          one: "less than a second",
          other: "less than {{count}} seconds"
        },
        xSeconds: {
          one: "1 second",
          other: "{{count}} seconds"
        },
        halfAMinute: "half a minute",
        lessThanXMinutes: {
          one: "less than a minute",
          other: "less than {{count}} minutes"
        },
        xMinutes: {
          one: "1 minute",
          other: "{{count}} minutes"
        },
        aboutXHours: {
          one: "about 1 hour",
          other: "about {{count}} hours"
        },
        xHours: {
          one: "1 hour",
          other: "{{count}} hours"
        },
        xDays: {
          one: "1 day",
          other: "{{count}} days"
        },
        aboutXWeeks: {
          one: "about 1 week",
          other: "about {{count}} weeks"
        },
        xWeeks: {
          one: "1 week",
          other: "{{count}} weeks"
        },
        aboutXMonths: {
          one: "about 1 month",
          other: "about {{count}} months"
        },
        xMonths: {
          one: "1 month",
          other: "{{count}} months"
        },
        aboutXYears: {
          one: "about 1 year",
          other: "about {{count}} years"
        },
        xYears: {
          one: "1 year",
          other: "{{count}} years"
        },
        overXYears: {
          one: "over 1 year",
          other: "over {{count}} years"
        },
        almostXYears: {
          one: "almost 1 year",
          other: "almost {{count}} years"
        }
      };
      var formatDistance = function formatDistance2(token, count, options) {
        var result;
        var tokenValue = formatDistanceLocale[token];
        if (typeof tokenValue === "string") {
          result = tokenValue;
        } else if (count === 1) {
          result = tokenValue.one;
        } else {
          result = tokenValue.other.replace("{{count}}", count.toString());
        }
        if (options !== null && options !== void 0 && options.addSuffix) {
          if (options.comparison && options.comparison > 0) {
            return "in " + result;
          } else {
            return result + " ago";
          }
        }
        return result;
      };
      var dateFormats = {
        full: "EEEE, MMMM do, y",
        long: "MMMM do, y",
        medium: "MMM d, y",
        short: "MM/dd/yyyy"
      };
      var timeFormats = {
        full: "h:mm:ss a zzzz",
        long: "h:mm:ss a z",
        medium: "h:mm:ss a",
        short: "h:mm a"
      };
      var dateTimeFormats = {
        full: "{{date}} 'at' {{time}}",
        long: "{{date}} 'at' {{time}}",
        medium: "{{date}}, {{time}}",
        short: "{{date}}, {{time}}"
      };
      var formatLong = {
        date: buildFormatLongFn({
          formats: dateFormats,
          defaultWidth: "full"
        }),
        time: buildFormatLongFn({
          formats: timeFormats,
          defaultWidth: "full"
        }),
        dateTime: buildFormatLongFn({
          formats: dateTimeFormats,
          defaultWidth: "full"
        })
      };
      var formatRelativeLocale = {
        lastWeek: "'last' eeee 'at' p",
        yesterday: "'yesterday at' p",
        today: "'today at' p",
        tomorrow: "'tomorrow at' p",
        nextWeek: "eeee 'at' p",
        other: "P"
      };
      var formatRelative = function formatRelative2(token, _date, _baseDate, _options) {
        return formatRelativeLocale[token];
      };
      var eraValues = {
        narrow: ["B", "A"],
        abbreviated: ["BC", "AD"],
        wide: ["Before Christ", "Anno Domini"]
      };
      var quarterValues = {
        narrow: ["1", "2", "3", "4"],
        abbreviated: ["Q1", "Q2", "Q3", "Q4"],
        wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
      };
      var monthValues = {
        narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
        abbreviated: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        wide: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
      };
      var dayValues = {
        narrow: ["S", "M", "T", "W", "T", "F", "S"],
        short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        wide: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
      };
      var dayPeriodValues = {
        narrow: {
          am: "a",
          pm: "p",
          midnight: "mi",
          noon: "n",
          morning: "morning",
          afternoon: "afternoon",
          evening: "evening",
          night: "night"
        },
        abbreviated: {
          am: "AM",
          pm: "PM",
          midnight: "midnight",
          noon: "noon",
          morning: "morning",
          afternoon: "afternoon",
          evening: "evening",
          night: "night"
        },
        wide: {
          am: "a.m.",
          pm: "p.m.",
          midnight: "midnight",
          noon: "noon",
          morning: "morning",
          afternoon: "afternoon",
          evening: "evening",
          night: "night"
        }
      };
      var formattingDayPeriodValues = {
        narrow: {
          am: "a",
          pm: "p",
          midnight: "mi",
          noon: "n",
          morning: "in the morning",
          afternoon: "in the afternoon",
          evening: "in the evening",
          night: "at night"
        },
        abbreviated: {
          am: "AM",
          pm: "PM",
          midnight: "midnight",
          noon: "noon",
          morning: "in the morning",
          afternoon: "in the afternoon",
          evening: "in the evening",
          night: "at night"
        },
        wide: {
          am: "a.m.",
          pm: "p.m.",
          midnight: "midnight",
          noon: "noon",
          morning: "in the morning",
          afternoon: "in the afternoon",
          evening: "in the evening",
          night: "at night"
        }
      };
      var ordinalNumber = function ordinalNumber2(dirtyNumber, _options) {
        var number = Number(dirtyNumber);
        var rem100 = number % 100;
        if (rem100 > 20 || rem100 < 10) {
          switch (rem100 % 10) {
            case 1:
              return number + "st";
            case 2:
              return number + "nd";
            case 3:
              return number + "rd";
          }
        }
        return number + "th";
      };
      var localize = {
        ordinalNumber,
        era: buildLocalizeFn({
          values: eraValues,
          defaultWidth: "wide"
        }),
        quarter: buildLocalizeFn({
          values: quarterValues,
          defaultWidth: "wide",
          argumentCallback: function argumentCallback(quarter) {
            return quarter - 1;
          }
        }),
        month: buildLocalizeFn({
          values: monthValues,
          defaultWidth: "wide"
        }),
        day: buildLocalizeFn({
          values: dayValues,
          defaultWidth: "wide"
        }),
        dayPeriod: buildLocalizeFn({
          values: dayPeriodValues,
          defaultWidth: "wide",
          formattingValues: formattingDayPeriodValues,
          defaultFormattingWidth: "wide"
        })
      };
      var matchOrdinalNumberPattern = /^(\d+)(th|st|nd|rd)?/i;
      var parseOrdinalNumberPattern = /\d+/i;
      var matchEraPatterns = {
        narrow: /^(b|a)/i,
        abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
        wide: /^(before christ|before common era|anno domini|common era)/i
      };
      var parseEraPatterns = {
        any: [/^b/i, /^(a|c)/i]
      };
      var matchQuarterPatterns = {
        narrow: /^[1234]/i,
        abbreviated: /^q[1234]/i,
        wide: /^[1234](th|st|nd|rd)? quarter/i
      };
      var parseQuarterPatterns = {
        any: [/1/i, /2/i, /3/i, /4/i]
      };
      var matchMonthPatterns = {
        narrow: /^[jfmasond]/i,
        abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
        wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
      };
      var parseMonthPatterns = {
        narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
        any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
      };
      var matchDayPatterns = {
        narrow: /^[smtwf]/i,
        short: /^(su|mo|tu|we|th|fr|sa)/i,
        abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
        wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
      };
      var parseDayPatterns = {
        narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
        any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
      };
      var matchDayPeriodPatterns = {
        narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
        any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
      };
      var parseDayPeriodPatterns = {
        any: {
          am: /^a/i,
          pm: /^p/i,
          midnight: /^mi/i,
          noon: /^no/i,
          morning: /morning/i,
          afternoon: /afternoon/i,
          evening: /evening/i,
          night: /night/i
        }
      };
      var match = {
        ordinalNumber: buildMatchPatternFn({
          matchPattern: matchOrdinalNumberPattern,
          parsePattern: parseOrdinalNumberPattern,
          valueCallback: function valueCallback(value) {
            return parseInt(value, 10);
          }
        }),
        era: buildMatchFn({
          matchPatterns: matchEraPatterns,
          defaultMatchWidth: "wide",
          parsePatterns: parseEraPatterns,
          defaultParseWidth: "any"
        }),
        quarter: buildMatchFn({
          matchPatterns: matchQuarterPatterns,
          defaultMatchWidth: "wide",
          parsePatterns: parseQuarterPatterns,
          defaultParseWidth: "any",
          valueCallback: function valueCallback(index) {
            return index + 1;
          }
        }),
        month: buildMatchFn({
          matchPatterns: matchMonthPatterns,
          defaultMatchWidth: "wide",
          parsePatterns: parseMonthPatterns,
          defaultParseWidth: "any"
        }),
        day: buildMatchFn({
          matchPatterns: matchDayPatterns,
          defaultMatchWidth: "wide",
          parsePatterns: parseDayPatterns,
          defaultParseWidth: "any"
        }),
        dayPeriod: buildMatchFn({
          matchPatterns: matchDayPeriodPatterns,
          defaultMatchWidth: "any",
          parsePatterns: parseDayPeriodPatterns,
          defaultParseWidth: "any"
        })
      };
      var locale = {
        code: "en-US",
        formatDistance,
        formatLong,
        formatRelative,
        localize,
        match,
        options: {
          weekStartsOn: 0,
          firstWeekContainsDate: 1
        }
      };
      const dateEnUs = {
        name: "en-US",
        locale
      };
      function useLocale(ns) {
        const {
          mergedLocaleRef,
          mergedDateLocaleRef
        } = vue.inject(configProviderInjectionKey, null) || {};
        const localeRef = vue.computed(() => {
          var _a, _b;
          return (_b = (_a = mergedLocaleRef === null || mergedLocaleRef === void 0 ? void 0 : mergedLocaleRef.value) === null || _a === void 0 ? void 0 : _a[ns]) !== null && _b !== void 0 ? _b : enUS[ns];
        });
        const dateLocaleRef = vue.computed(() => {
          var _a;
          return (_a = mergedDateLocaleRef === null || mergedDateLocaleRef === void 0 ? void 0 : mergedDateLocaleRef.value) !== null && _a !== void 0 ? _a : dateEnUs;
        });
        return {
          dateLocaleRef,
          localeRef
        };
      }
      function useStyle(mountId, style2, clsPrefixRef) {
        if (!style2) {
          return;
        }
        const ssrAdapter2 = useSsrAdapter();
        const NConfigProvider2 = vue.inject(configProviderInjectionKey, null);
        const mountStyle = () => {
          const clsPrefix = clsPrefixRef.value;
          style2.mount({
            id: clsPrefix === void 0 ? mountId : clsPrefix + mountId,
            head: true,
            anchorMetaName: cssrAnchorMetaName,
            props: {
              bPrefix: clsPrefix ? `.${clsPrefix}-` : void 0
            },
            ssr: ssrAdapter2
          });
          if (!(NConfigProvider2 === null || NConfigProvider2 === void 0 ? void 0 : NConfigProvider2.preflightStyleDisabled)) {
            globalStyle.mount({
              id: "n-global",
              head: true,
              anchorMetaName: cssrAnchorMetaName,
              ssr: ssrAdapter2
            });
          }
        };
        if (ssrAdapter2) {
          mountStyle();
        } else {
          vue.onBeforeMount(mountStyle);
        }
      }
      function useThemeClass(componentName, hashRef, cssVarsRef, props) {
        var _a;
        if (!cssVarsRef) throwError("useThemeClass", "cssVarsRef is not passed");
        const mergedThemeHashRef = (_a = vue.inject(configProviderInjectionKey, null)) === null || _a === void 0 ? void 0 : _a.mergedThemeHashRef;
        const themeClassRef = vue.ref("");
        const ssrAdapter2 = useSsrAdapter();
        let renderCallback;
        const hashClassPrefix = `__${componentName}`;
        const mountStyle = () => {
          let finalThemeHash = hashClassPrefix;
          const hashValue = hashRef ? hashRef.value : void 0;
          const themeHash = mergedThemeHashRef === null || mergedThemeHashRef === void 0 ? void 0 : mergedThemeHashRef.value;
          if (themeHash) finalThemeHash += `-${themeHash}`;
          if (hashValue) finalThemeHash += `-${hashValue}`;
          const {
            themeOverrides,
            builtinThemeOverrides
          } = props;
          if (themeOverrides) {
            finalThemeHash += `-${murmur2(JSON.stringify(themeOverrides))}`;
          }
          if (builtinThemeOverrides) {
            finalThemeHash += `-${murmur2(JSON.stringify(builtinThemeOverrides))}`;
          }
          themeClassRef.value = finalThemeHash;
          renderCallback = () => {
            const cssVars = cssVarsRef.value;
            let style2 = "";
            for (const key in cssVars) {
              style2 += `${key}: ${cssVars[key]};`;
            }
            c$1(`.${finalThemeHash}`, style2).mount({
              id: finalThemeHash,
              ssr: ssrAdapter2
            });
            renderCallback = void 0;
          };
        };
        vue.watchEffect(() => {
          mountStyle();
        });
        return {
          themeClass: themeClassRef,
          onRender: () => {
            renderCallback === null || renderCallback === void 0 ? void 0 : renderCallback();
          }
        };
      }
      function useRtl(mountId, rtlStateRef, clsPrefixRef) {
        if (!rtlStateRef) return void 0;
        const ssrAdapter2 = useSsrAdapter();
        const componentRtlStateRef = vue.computed(() => {
          const {
            value: rtlState
          } = rtlStateRef;
          if (!rtlState) {
            return void 0;
          }
          const componentRtlState = rtlState[mountId];
          if (!componentRtlState) {
            return void 0;
          }
          return componentRtlState;
        });
        const mountStyle = () => {
          vue.watchEffect(() => {
            const {
              value: clsPrefix
            } = clsPrefixRef;
            const id = `${clsPrefix}${mountId}Rtl`;
            if (exists(id, ssrAdapter2)) return;
            const {
              value: componentRtlState
            } = componentRtlStateRef;
            if (!componentRtlState) return;
            componentRtlState.style.mount({
              id,
              head: true,
              anchorMetaName: cssrAnchorMetaName,
              props: {
                bPrefix: clsPrefix ? `.${clsPrefix}-` : void 0
              },
              ssr: ssrAdapter2
            });
          });
        };
        if (ssrAdapter2) {
          mountStyle();
        } else {
          vue.onBeforeMount(mountStyle);
        }
        return componentRtlStateRef;
      }
      const AddIcon = vue.defineComponent({
        name: "Add",
        render() {
          return vue.h("svg", {
            width: "512",
            height: "512",
            viewBox: "0 0 512 512",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg"
          }, vue.h("path", {
            d: "M256 112V400M400 256H112",
            stroke: "currentColor",
            "stroke-width": "32",
            "stroke-linecap": "round",
            "stroke-linejoin": "round"
          }));
        }
      });
      const ArrowDownIcon = vue.defineComponent({
        name: "ArrowDown",
        render() {
          return vue.h("svg", {
            viewBox: "0 0 28 28",
            version: "1.1",
            xmlns: "http://www.w3.org/2000/svg"
          }, vue.h("g", {
            stroke: "none",
            "stroke-width": "1",
            "fill-rule": "evenodd"
          }, vue.h("g", {
            "fill-rule": "nonzero"
          }, vue.h("path", {
            d: "M23.7916,15.2664 C24.0788,14.9679 24.0696,14.4931 23.7711,14.206 C23.4726,13.9188 22.9978,13.928 22.7106,14.2265 L14.7511,22.5007 L14.7511,3.74792 C14.7511,3.33371 14.4153,2.99792 14.0011,2.99792 C13.5869,2.99792 13.2511,3.33371 13.2511,3.74793 L13.2511,22.4998 L5.29259,14.2265 C5.00543,13.928 4.53064,13.9188 4.23213,14.206 C3.93361,14.4931 3.9244,14.9679 4.21157,15.2664 L13.2809,24.6944 C13.6743,25.1034 14.3289,25.1034 14.7223,24.6944 L23.7916,15.2664 Z"
          }))));
        }
      });
      const ArrowUpIcon = vue.defineComponent({
        name: "ArrowUp",
        render() {
          return vue.h("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 20 20"
          }, vue.h("g", {
            fill: "none"
          }, vue.h("path", {
            d: "M3.13 9.163a.5.5 0 1 0 .74.674L9.5 3.67V17.5a.5.5 0 0 0 1 0V3.672l5.63 6.165a.5.5 0 0 0 .738-.674l-6.315-6.916a.746.746 0 0 0-.632-.24a.746.746 0 0 0-.476.24L3.131 9.163z",
            fill: "currentColor"
          })));
        }
      });
      function replaceable(name, icon) {
        return vue.defineComponent({
          name: upperFirst(name),
          setup() {
            var _a;
            const mergedIconsRef = (_a = vue.inject(configProviderInjectionKey, null)) === null || _a === void 0 ? void 0 : _a.mergedIconsRef;
            return () => {
              var _a2;
              const iconOverride = (_a2 = mergedIconsRef === null || mergedIconsRef === void 0 ? void 0 : mergedIconsRef.value) === null || _a2 === void 0 ? void 0 : _a2[name];
              return iconOverride ? iconOverride() : icon;
            };
          }
        });
      }
      const FinishedIcon = vue.defineComponent({
        name: "Checkmark",
        render() {
          return vue.h("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 16 16"
          }, vue.h("g", {
            fill: "none"
          }, vue.h("path", {
            d: "M14.046 3.486a.75.75 0 0 1-.032 1.06l-7.93 7.474a.85.85 0 0 1-1.188-.022l-2.68-2.72a.75.75 0 1 1 1.068-1.053l2.234 2.267l7.468-7.038a.75.75 0 0 1 1.06.032z",
            fill: "currentColor"
          })));
        }
      });
      const ErrorIcon = replaceable("close", vue.h("svg", {
        viewBox: "0 0 12 12",
        version: "1.1",
        xmlns: "http://www.w3.org/2000/svg",
        "aria-hidden": true
      }, vue.h("g", {
        stroke: "none",
        "stroke-width": "1",
        fill: "none",
        "fill-rule": "evenodd"
      }, vue.h("g", {
        fill: "currentColor",
        "fill-rule": "nonzero"
      }, vue.h("path", {
        d: "M2.08859116,2.2156945 L2.14644661,2.14644661 C2.32001296,1.97288026 2.58943736,1.95359511 2.7843055,2.08859116 L2.85355339,2.14644661 L6,5.293 L9.14644661,2.14644661 C9.34170876,1.95118446 9.65829124,1.95118446 9.85355339,2.14644661 C10.0488155,2.34170876 10.0488155,2.65829124 9.85355339,2.85355339 L6.707,6 L9.85355339,9.14644661 C10.0271197,9.32001296 10.0464049,9.58943736 9.91140884,9.7843055 L9.85355339,9.85355339 C9.67998704,10.0271197 9.41056264,10.0464049 9.2156945,9.91140884 L9.14644661,9.85355339 L6,6.707 L2.85355339,9.85355339 C2.65829124,10.0488155 2.34170876,10.0488155 2.14644661,9.85355339 C1.95118446,9.65829124 1.95118446,9.34170876 2.14644661,9.14644661 L5.293,6 L2.14644661,2.85355339 C1.97288026,2.67998704 1.95359511,2.41056264 2.08859116,2.2156945 L2.14644661,2.14644661 L2.08859116,2.2156945 Z"
      })))));
      const EyeIcon = vue.defineComponent({
        name: "Eye",
        render() {
          return vue.h("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 512 512"
          }, vue.h("path", {
            d: "M255.66 112c-77.94 0-157.89 45.11-220.83 135.33a16 16 0 0 0-.27 17.77C82.92 340.8 161.8 400 255.66 400c92.84 0 173.34-59.38 221.79-135.25a16.14 16.14 0 0 0 0-17.47C428.89 172.28 347.8 112 255.66 112z",
            fill: "none",
            stroke: "currentColor",
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "32"
          }), vue.h("circle", {
            cx: "256",
            cy: "256",
            r: "80",
            fill: "none",
            stroke: "currentColor",
            "stroke-miterlimit": "10",
            "stroke-width": "32"
          }));
        }
      });
      const EyeOffIcon = vue.defineComponent({
        name: "EyeOff",
        render() {
          return vue.h("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 512 512"
          }, vue.h("path", {
            d: "M432 448a15.92 15.92 0 0 1-11.31-4.69l-352-352a16 16 0 0 1 22.62-22.62l352 352A16 16 0 0 1 432 448z",
            fill: "currentColor"
          }), vue.h("path", {
            d: "M255.66 384c-41.49 0-81.5-12.28-118.92-36.5c-34.07-22-64.74-53.51-88.7-91v-.08c19.94-28.57 41.78-52.73 65.24-72.21a2 2 0 0 0 .14-2.94L93.5 161.38a2 2 0 0 0-2.71-.12c-24.92 21-48.05 46.76-69.08 76.92a31.92 31.92 0 0 0-.64 35.54c26.41 41.33 60.4 76.14 98.28 100.65C162 402 207.9 416 255.66 416a239.13 239.13 0 0 0 75.8-12.58a2 2 0 0 0 .77-3.31l-21.58-21.58a4 4 0 0 0-3.83-1a204.8 204.8 0 0 1-51.16 6.47z",
            fill: "currentColor"
          }), vue.h("path", {
            d: "M490.84 238.6c-26.46-40.92-60.79-75.68-99.27-100.53C349 110.55 302 96 255.66 96a227.34 227.34 0 0 0-74.89 12.83a2 2 0 0 0-.75 3.31l21.55 21.55a4 4 0 0 0 3.88 1a192.82 192.82 0 0 1 50.21-6.69c40.69 0 80.58 12.43 118.55 37c34.71 22.4 65.74 53.88 89.76 91a.13.13 0 0 1 0 .16a310.72 310.72 0 0 1-64.12 72.73a2 2 0 0 0-.15 2.95l19.9 19.89a2 2 0 0 0 2.7.13a343.49 343.49 0 0 0 68.64-78.48a32.2 32.2 0 0 0-.1-34.78z",
            fill: "currentColor"
          }), vue.h("path", {
            d: "M256 160a95.88 95.88 0 0 0-21.37 2.4a2 2 0 0 0-1 3.38l112.59 112.56a2 2 0 0 0 3.38-1A96 96 0 0 0 256 160z",
            fill: "currentColor"
          }), vue.h("path", {
            d: "M165.78 233.66a2 2 0 0 0-3.38 1a96 96 0 0 0 115 115a2 2 0 0 0 1-3.38z",
            fill: "currentColor"
          }));
        }
      });
      const EmptyIcon = vue.defineComponent({
        name: "Empty",
        render() {
          return vue.h("svg", {
            viewBox: "0 0 28 28",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg"
          }, vue.h("path", {
            d: "M26 7.5C26 11.0899 23.0899 14 19.5 14C15.9101 14 13 11.0899 13 7.5C13 3.91015 15.9101 1 19.5 1C23.0899 1 26 3.91015 26 7.5ZM16.8536 4.14645C16.6583 3.95118 16.3417 3.95118 16.1464 4.14645C15.9512 4.34171 15.9512 4.65829 16.1464 4.85355L18.7929 7.5L16.1464 10.1464C15.9512 10.3417 15.9512 10.6583 16.1464 10.8536C16.3417 11.0488 16.6583 11.0488 16.8536 10.8536L19.5 8.20711L22.1464 10.8536C22.3417 11.0488 22.6583 11.0488 22.8536 10.8536C23.0488 10.6583 23.0488 10.3417 22.8536 10.1464L20.2071 7.5L22.8536 4.85355C23.0488 4.65829 23.0488 4.34171 22.8536 4.14645C22.6583 3.95118 22.3417 3.95118 22.1464 4.14645L19.5 6.79289L16.8536 4.14645Z",
            fill: "currentColor"
          }), vue.h("path", {
            d: "M25 22.75V12.5991C24.5572 13.0765 24.053 13.4961 23.5 13.8454V16H17.5L17.3982 16.0068C17.0322 16.0565 16.75 16.3703 16.75 16.75C16.75 18.2688 15.5188 19.5 14 19.5C12.4812 19.5 11.25 18.2688 11.25 16.75L11.2432 16.6482C11.1935 16.2822 10.8797 16 10.5 16H4.5V7.25C4.5 6.2835 5.2835 5.5 6.25 5.5H12.2696C12.4146 4.97463 12.6153 4.47237 12.865 4H6.25C4.45507 4 3 5.45507 3 7.25V22.75C3 24.5449 4.45507 26 6.25 26H21.75C23.5449 26 25 24.5449 25 22.75ZM4.5 22.75V17.5H9.81597L9.85751 17.7041C10.2905 19.5919 11.9808 21 14 21L14.215 20.9947C16.2095 20.8953 17.842 19.4209 18.184 17.5H23.5V22.75C23.5 23.7165 22.7165 24.5 21.75 24.5H6.25C5.2835 24.5 4.5 23.7165 4.5 22.75Z",
            fill: "currentColor"
          }));
        }
      });
      const RemoveIcon = vue.defineComponent({
        name: "Remove",
        render() {
          return vue.h("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 512 512"
          }, vue.h("line", {
            x1: "400",
            y1: "256",
            x2: "112",
            y2: "256",
            style: "\n        fill: none;\n        stroke: currentColor;\n        stroke-linecap: round;\n        stroke-linejoin: round;\n        stroke-width: 32px;\n      "
          }));
        }
      });
      const ChevronDownIcon = vue.defineComponent({
        name: "ChevronDown",
        render() {
          return vue.h("svg", {
            viewBox: "0 0 16 16",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg"
          }, vue.h("path", {
            d: "M3.14645 5.64645C3.34171 5.45118 3.65829 5.45118 3.85355 5.64645L8 9.79289L12.1464 5.64645C12.3417 5.45118 12.6583 5.45118 12.8536 5.64645C13.0488 5.84171 13.0488 6.15829 12.8536 6.35355L8.35355 10.8536C8.15829 11.0488 7.84171 11.0488 7.64645 10.8536L3.14645 6.35355C2.95118 6.15829 2.95118 5.84171 3.14645 5.64645Z",
            fill: "currentColor"
          }));
        }
      });
      const ClearIcon = replaceable("clear", vue.h("svg", {
        viewBox: "0 0 16 16",
        version: "1.1",
        xmlns: "http://www.w3.org/2000/svg"
      }, vue.h("g", {
        stroke: "none",
        "stroke-width": "1",
        fill: "none",
        "fill-rule": "evenodd"
      }, vue.h("g", {
        fill: "currentColor",
        "fill-rule": "nonzero"
      }, vue.h("path", {
        d: "M8,2 C11.3137085,2 14,4.6862915 14,8 C14,11.3137085 11.3137085,14 8,14 C4.6862915,14 2,11.3137085 2,8 C2,4.6862915 4.6862915,2 8,2 Z M6.5343055,5.83859116 C6.33943736,5.70359511 6.07001296,5.72288026 5.89644661,5.89644661 L5.89644661,5.89644661 L5.83859116,5.9656945 C5.70359511,6.16056264 5.72288026,6.42998704 5.89644661,6.60355339 L5.89644661,6.60355339 L7.293,8 L5.89644661,9.39644661 L5.83859116,9.4656945 C5.70359511,9.66056264 5.72288026,9.92998704 5.89644661,10.1035534 L5.89644661,10.1035534 L5.9656945,10.1614088 C6.16056264,10.2964049 6.42998704,10.2771197 6.60355339,10.1035534 L6.60355339,10.1035534 L8,8.707 L9.39644661,10.1035534 L9.4656945,10.1614088 C9.66056264,10.2964049 9.92998704,10.2771197 10.1035534,10.1035534 L10.1035534,10.1035534 L10.1614088,10.0343055 C10.2964049,9.83943736 10.2771197,9.57001296 10.1035534,9.39644661 L10.1035534,9.39644661 L8.707,8 L10.1035534,6.60355339 L10.1614088,6.5343055 C10.2964049,6.33943736 10.2771197,6.07001296 10.1035534,5.89644661 L10.1035534,5.89644661 L10.0343055,5.83859116 C9.83943736,5.70359511 9.57001296,5.72288026 9.39644661,5.89644661 L9.39644661,5.89644661 L8,7.293 L6.60355339,5.89644661 Z"
      })))));
      const NIconSwitchTransition = vue.defineComponent({
        name: "BaseIconSwitchTransition",
        setup(_, {
          slots
        }) {
          const isMountedRef = isMounted();
          return () => vue.h(vue.Transition, {
            name: "icon-switch-transition",
            appear: isMountedRef.value
          }, slots);
        }
      });
      const NFadeInExpandTransition = vue.defineComponent({
        name: "FadeInExpandTransition",
        props: {
          appear: Boolean,
          group: Boolean,
          mode: String,
          onLeave: Function,
          onAfterLeave: Function,
          onAfterEnter: Function,
          width: Boolean,
          // reverse mode is only used in tree
          // it make it from expanded to collapsed after mounted
          reverse: Boolean
        },
        setup(props, {
          slots
        }) {
          function handleBeforeLeave(el) {
            if (props.width) {
              el.style.maxWidth = `${el.offsetWidth}px`;
            } else {
              el.style.maxHeight = `${el.offsetHeight}px`;
            }
            void el.offsetWidth;
          }
          function handleLeave(el) {
            if (props.width) {
              el.style.maxWidth = "0";
            } else {
              el.style.maxHeight = "0";
            }
            void el.offsetWidth;
            const {
              onLeave
            } = props;
            if (onLeave) onLeave();
          }
          function handleAfterLeave(el) {
            if (props.width) {
              el.style.maxWidth = "";
            } else {
              el.style.maxHeight = "";
            }
            const {
              onAfterLeave
            } = props;
            if (onAfterLeave) onAfterLeave();
          }
          function handleEnter(el) {
            el.style.transition = "none";
            if (props.width) {
              const memorizedWidth = el.offsetWidth;
              el.style.maxWidth = "0";
              void el.offsetWidth;
              el.style.transition = "";
              el.style.maxWidth = `${memorizedWidth}px`;
            } else {
              if (props.reverse) {
                el.style.maxHeight = `${el.offsetHeight}px`;
                void el.offsetHeight;
                el.style.transition = "";
                el.style.maxHeight = "0";
              } else {
                const memorizedHeight = el.offsetHeight;
                el.style.maxHeight = "0";
                void el.offsetWidth;
                el.style.transition = "";
                el.style.maxHeight = `${memorizedHeight}px`;
              }
            }
            void el.offsetWidth;
          }
          function handleAfterEnter(el) {
            var _a;
            if (props.width) {
              el.style.maxWidth = "";
            } else {
              if (!props.reverse) {
                el.style.maxHeight = "";
              }
            }
            (_a = props.onAfterEnter) === null || _a === void 0 ? void 0 : _a.call(props);
          }
          return () => {
            const {
              group,
              width,
              appear,
              mode
            } = props;
            const type = group ? vue.TransitionGroup : vue.Transition;
            const resolvedProps = {
              name: width ? "fade-in-width-expand-transition" : "fade-in-height-expand-transition",
              appear,
              onEnter: handleEnter,
              onAfterEnter: handleAfterEnter,
              onBeforeLeave: handleBeforeLeave,
              onLeave: handleLeave,
              onAfterLeave: handleAfterLeave
            };
            if (!group) {
              resolvedProps.mode = mode;
            }
            return vue.h(type, resolvedProps, slots);
          };
        }
      });
      const style$m = cB("base-icon", `
 height: 1em;
 width: 1em;
 line-height: 1em;
 text-align: center;
 display: inline-block;
 position: relative;
 fill: currentColor;
 transform: translateZ(0);
`, [c$1("svg", `
 height: 1em;
 width: 1em;
 `)]);
      const NBaseIcon = vue.defineComponent({
        name: "BaseIcon",
        props: {
          role: String,
          ariaLabel: String,
          ariaDisabled: {
            type: Boolean,
            default: void 0
          },
          ariaHidden: {
            type: Boolean,
            default: void 0
          },
          clsPrefix: {
            type: String,
            required: true
          },
          onClick: Function,
          onMousedown: Function,
          onMouseup: Function
        },
        setup(props) {
          useStyle("-base-icon", style$m, vue.toRef(props, "clsPrefix"));
        },
        render() {
          return vue.h("i", {
            class: `${this.clsPrefix}-base-icon`,
            onClick: this.onClick,
            onMousedown: this.onMousedown,
            onMouseup: this.onMouseup,
            role: this.role,
            "aria-label": this.ariaLabel,
            "aria-hidden": this.ariaHidden,
            "aria-disabled": this.ariaDisabled
          }, this.$slots);
        }
      });
      const style$l = cB("base-close", `
 display: flex;
 align-items: center;
 justify-content: center;
 cursor: pointer;
 background-color: transparent;
 color: var(--n-close-icon-color);
 border-radius: var(--n-close-border-radius);
 height: var(--n-close-size);
 width: var(--n-close-size);
 font-size: var(--n-close-icon-size);
 outline: none;
 border: none;
 position: relative;
 padding: 0;
`, [cM("absolute", `
 height: var(--n-close-icon-size);
 width: var(--n-close-icon-size);
 `), c$1("&::before", `
 content: "";
 position: absolute;
 width: var(--n-close-size);
 height: var(--n-close-size);
 left: 50%;
 top: 50%;
 transform: translateY(-50%) translateX(-50%);
 transition: inherit;
 border-radius: inherit;
 `), cNotM("disabled", [c$1("&:hover", `
 color: var(--n-close-icon-color-hover);
 `), c$1("&:hover::before", `
 background-color: var(--n-close-color-hover);
 `), c$1("&:focus::before", `
 background-color: var(--n-close-color-hover);
 `), c$1("&:active", `
 color: var(--n-close-icon-color-pressed);
 `), c$1("&:active::before", `
 background-color: var(--n-close-color-pressed);
 `)]), cM("disabled", `
 cursor: not-allowed;
 color: var(--n-close-icon-color-disabled);
 background-color: transparent;
 `), cM("round", [c$1("&::before", `
 border-radius: 50%;
 `)])]);
      const NBaseClose = vue.defineComponent({
        name: "BaseClose",
        props: {
          isButtonTag: {
            type: Boolean,
            default: true
          },
          clsPrefix: {
            type: String,
            required: true
          },
          disabled: {
            type: Boolean,
            default: void 0
          },
          focusable: {
            type: Boolean,
            default: true
          },
          round: Boolean,
          onClick: Function,
          absolute: Boolean
        },
        setup(props) {
          useStyle("-base-close", style$l, vue.toRef(props, "clsPrefix"));
          return () => {
            const {
              clsPrefix,
              disabled,
              absolute,
              round,
              isButtonTag
            } = props;
            const Tag = isButtonTag ? "button" : "div";
            return vue.h(Tag, {
              type: isButtonTag ? "button" : void 0,
              tabindex: disabled || !props.focusable ? -1 : 0,
              "aria-disabled": disabled,
              "aria-label": "close",
              role: isButtonTag ? void 0 : "button",
              disabled,
              class: [`${clsPrefix}-base-close`, absolute && `${clsPrefix}-base-close--absolute`, disabled && `${clsPrefix}-base-close--disabled`, round && `${clsPrefix}-base-close--round`],
              onMousedown: (e) => {
                if (!props.focusable) {
                  e.preventDefault();
                }
              },
              onClick: props.onClick
            }, vue.h(NBaseIcon, {
              clsPrefix
            }, {
              default: () => vue.h(ErrorIcon, null)
            }));
          };
        }
      });
      const FocusDetector = vue.defineComponent({
        props: {
          onFocus: Function,
          onBlur: Function
        },
        setup(props) {
          return () => vue.h("div", {
            style: "width: 0; height: 0",
            tabindex: 0,
            onFocus: props.onFocus,
            onBlur: props.onBlur
          });
        }
      });
      const {
        cubicBezierEaseInOut: cubicBezierEaseInOut$3
      } = commonVariables$m;
      function iconSwitchTransition({
        originalTransform = "",
        left = 0,
        top = 0,
        transition = `all .3s ${cubicBezierEaseInOut$3} !important`
      } = {}) {
        return [c$1("&.icon-switch-transition-enter-from, &.icon-switch-transition-leave-to", {
          transform: `${originalTransform} scale(0.75)`,
          left,
          top,
          opacity: 0
        }), c$1("&.icon-switch-transition-enter-to, &.icon-switch-transition-leave-from", {
          transform: `scale(1) ${originalTransform}`,
          left,
          top,
          opacity: 1
        }), c$1("&.icon-switch-transition-enter-active, &.icon-switch-transition-leave-active", {
          transformOrigin: "center",
          position: "absolute",
          left,
          top,
          transition
        })];
      }
      const style$k = c$1([c$1("@keyframes rotator", `
 0% {
 -webkit-transform: rotate(0deg);
 transform: rotate(0deg);
 }
 100% {
 -webkit-transform: rotate(360deg);
 transform: rotate(360deg);
 }`), cB("base-loading", `
 position: relative;
 line-height: 0;
 width: 1em;
 height: 1em;
 `, [cE("transition-wrapper", `
 position: absolute;
 width: 100%;
 height: 100%;
 `, [iconSwitchTransition()]), cE("placeholder", `
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 `, [iconSwitchTransition({
        left: "50%",
        top: "50%",
        originalTransform: "translateX(-50%) translateY(-50%)"
      })]), cE("container", `
 animation: rotator 3s linear infinite both;
 `, [cE("icon", `
 height: 1em;
 width: 1em;
 `)])])]);
      const duration = "1.6s";
      const exposedLoadingProps = {
        strokeWidth: {
          type: Number,
          default: 28
        },
        stroke: {
          type: String,
          default: void 0
        }
      };
      const NBaseLoading = vue.defineComponent({
        name: "BaseLoading",
        props: Object.assign({
          clsPrefix: {
            type: String,
            required: true
          },
          show: {
            type: Boolean,
            default: true
          },
          scale: {
            type: Number,
            default: 1
          },
          radius: {
            type: Number,
            default: 100
          }
        }, exposedLoadingProps),
        setup(props) {
          useStyle("-base-loading", style$k, vue.toRef(props, "clsPrefix"));
        },
        render() {
          const {
            clsPrefix,
            radius,
            strokeWidth,
            stroke,
            scale
          } = this;
          const scaledRadius = radius / scale;
          return vue.h("div", {
            class: `${clsPrefix}-base-loading`,
            role: "img",
            "aria-label": "loading"
          }, vue.h(NIconSwitchTransition, null, {
            default: () => this.show ? vue.h("div", {
              key: "icon",
              class: `${clsPrefix}-base-loading__transition-wrapper`
            }, vue.h("div", {
              class: `${clsPrefix}-base-loading__container`
            }, vue.h("svg", {
              class: `${clsPrefix}-base-loading__icon`,
              viewBox: `0 0 ${2 * scaledRadius} ${2 * scaledRadius}`,
              xmlns: "http://www.w3.org/2000/svg",
              style: {
                color: stroke
              }
            }, vue.h("g", null, vue.h("animateTransform", {
              attributeName: "transform",
              type: "rotate",
              values: `0 ${scaledRadius} ${scaledRadius};270 ${scaledRadius} ${scaledRadius}`,
              begin: "0s",
              dur: duration,
              fill: "freeze",
              repeatCount: "indefinite"
            }), vue.h("circle", {
              class: `${clsPrefix}-base-loading__icon`,
              fill: "none",
              stroke: "currentColor",
              "stroke-width": strokeWidth,
              "stroke-linecap": "round",
              cx: scaledRadius,
              cy: scaledRadius,
              r: radius - strokeWidth / 2,
              "stroke-dasharray": 5.67 * radius,
              "stroke-dashoffset": 18.48 * radius
            }, vue.h("animateTransform", {
              attributeName: "transform",
              type: "rotate",
              values: `0 ${scaledRadius} ${scaledRadius};135 ${scaledRadius} ${scaledRadius};450 ${scaledRadius} ${scaledRadius}`,
              begin: "0s",
              dur: duration,
              fill: "freeze",
              repeatCount: "indefinite"
            }), vue.h("animate", {
              attributeName: "stroke-dashoffset",
              values: `${5.67 * radius};${1.42 * radius};${5.67 * radius}`,
              begin: "0s",
              dur: duration,
              fill: "freeze",
              repeatCount: "indefinite"
            })))))) : vue.h("div", {
              key: "placeholder",
              class: `${clsPrefix}-base-loading__placeholder`
            }, this.$slots)
          }));
        }
      });
      function toArray(arg) {
        if (Array.isArray(arg))
          return arg;
        return [arg];
      }
      const TRAVERSE_COMMAND = {
        STOP: "STOP"
      };
      function traverseWithCb(treeNode, callback) {
        const command = callback(treeNode);
        if (treeNode.children !== void 0 && command !== TRAVERSE_COMMAND.STOP) {
          treeNode.children.forEach((childNode) => traverseWithCb(childNode, callback));
        }
      }
      function getNonLeafKeys(treeNodes, options = {}) {
        const { preserveGroup = false } = options;
        const keys2 = [];
        const cb = preserveGroup ? (node) => {
          if (!node.isLeaf) {
            keys2.push(node.key);
            traverse(node.children);
          }
        } : (node) => {
          if (!node.isLeaf) {
            if (!node.isGroup)
              keys2.push(node.key);
            traverse(node.children);
          }
        };
        function traverse(nodes) {
          nodes.forEach(cb);
        }
        traverse(treeNodes);
        return keys2;
      }
      function isLeaf(rawNode, getChildren) {
        const { isLeaf: isLeaf2 } = rawNode;
        if (isLeaf2 !== void 0)
          return isLeaf2;
        else if (!getChildren(rawNode))
          return true;
        return false;
      }
      function defaultGetChildren(node) {
        return node.children;
      }
      function defaultGetKey(node) {
        return node.key;
      }
      function isIgnored() {
        return false;
      }
      function isShallowLoaded(rawNode, getChildren) {
        const { isLeaf: isLeaf2 } = rawNode;
        if (isLeaf2 === false && !Array.isArray(getChildren(rawNode)))
          return false;
        return true;
      }
      function isDisabled(rawNode) {
        return rawNode.disabled === true;
      }
      function isExpilicitlyNotLoaded(rawNode, getChildren) {
        return rawNode.isLeaf === false && !Array.isArray(getChildren(rawNode));
      }
      function unwrapCheckedKeys(result) {
        var _a;
        if (result === void 0 || result === null)
          return [];
        if (Array.isArray(result))
          return result;
        return (_a = result.checkedKeys) !== null && _a !== void 0 ? _a : [];
      }
      function unwrapIndeterminateKeys(result) {
        var _a;
        if (result === void 0 || result === null || Array.isArray(result)) {
          return [];
        }
        return (_a = result.indeterminateKeys) !== null && _a !== void 0 ? _a : [];
      }
      function merge(originalKeys, keysToAdd) {
        const set = new Set(originalKeys);
        keysToAdd.forEach((key) => {
          if (!set.has(key)) {
            set.add(key);
          }
        });
        return Array.from(set);
      }
      function minus(originalKeys, keysToRemove) {
        const set = new Set(originalKeys);
        keysToRemove.forEach((key) => {
          if (set.has(key)) {
            set.delete(key);
          }
        });
        return Array.from(set);
      }
      function isGroup(rawNode) {
        return (rawNode === null || rawNode === void 0 ? void 0 : rawNode.type) === "group";
      }
      function createIndexGetter(treeNodes) {
        const map2 = /* @__PURE__ */ new Map();
        treeNodes.forEach((treeNode, i) => {
          map2.set(treeNode.key, i);
        });
        return (key) => {
          var _a;
          return (_a = map2.get(key)) !== null && _a !== void 0 ? _a : null;
        };
      }
      class SubtreeNotLoadedError extends Error {
        constructor() {
          super();
          this.message = "SubtreeNotLoadedError: checking a subtree whose required nodes are not fully loaded.";
        }
      }
      function getExtendedCheckedKeySetAfterCheck(checkKeys, currentCheckedKeys, treeMate, allowNotLoaded) {
        return getExtendedCheckedKeySet(currentCheckedKeys.concat(checkKeys), treeMate, allowNotLoaded, false);
      }
      function getAvailableAscendantNodeSet(uncheckedKeys, treeMate) {
        const visitedKeys = /* @__PURE__ */ new Set();
        uncheckedKeys.forEach((uncheckedKey) => {
          const uncheckedTreeNode = treeMate.treeNodeMap.get(uncheckedKey);
          if (uncheckedTreeNode !== void 0) {
            let nodeCursor = uncheckedTreeNode.parent;
            while (nodeCursor !== null) {
              if (nodeCursor.disabled)
                break;
              if (visitedKeys.has(nodeCursor.key))
                break;
              else {
                visitedKeys.add(nodeCursor.key);
              }
              nodeCursor = nodeCursor.parent;
            }
          }
        });
        return visitedKeys;
      }
      function getExtendedCheckedKeySetAfterUncheck(uncheckedKeys, currentCheckedKeys, treeMate, allowNotLoaded) {
        const extendedCheckedKeySet = getExtendedCheckedKeySet(currentCheckedKeys, treeMate, allowNotLoaded, false);
        const extendedKeySetToUncheck = getExtendedCheckedKeySet(uncheckedKeys, treeMate, allowNotLoaded, true);
        const ascendantKeySet = getAvailableAscendantNodeSet(uncheckedKeys, treeMate);
        const keysToRemove = [];
        extendedCheckedKeySet.forEach((key) => {
          if (extendedKeySetToUncheck.has(key) || ascendantKeySet.has(key)) {
            keysToRemove.push(key);
          }
        });
        keysToRemove.forEach((key) => extendedCheckedKeySet.delete(key));
        return extendedCheckedKeySet;
      }
      function getCheckedKeys(options, treeMate) {
        const { checkedKeys, keysToCheck, keysToUncheck, indeterminateKeys, cascade, leafOnly, checkStrategy, allowNotLoaded } = options;
        if (!cascade) {
          if (keysToCheck !== void 0) {
            return {
              checkedKeys: merge(checkedKeys, keysToCheck),
              indeterminateKeys: Array.from(indeterminateKeys)
            };
          } else if (keysToUncheck !== void 0) {
            return {
              checkedKeys: minus(checkedKeys, keysToUncheck),
              indeterminateKeys: Array.from(indeterminateKeys)
            };
          } else {
            return {
              checkedKeys: Array.from(checkedKeys),
              indeterminateKeys: Array.from(indeterminateKeys)
            };
          }
        }
        const { levelTreeNodeMap } = treeMate;
        let extendedCheckedKeySet;
        if (keysToUncheck !== void 0) {
          extendedCheckedKeySet = getExtendedCheckedKeySetAfterUncheck(keysToUncheck, checkedKeys, treeMate, allowNotLoaded);
        } else if (keysToCheck !== void 0) {
          extendedCheckedKeySet = getExtendedCheckedKeySetAfterCheck(keysToCheck, checkedKeys, treeMate, allowNotLoaded);
        } else {
          extendedCheckedKeySet = getExtendedCheckedKeySet(checkedKeys, treeMate, allowNotLoaded, false);
        }
        const checkStrategyIsParent = checkStrategy === "parent";
        const checkStrategyIsChild = checkStrategy === "child" || leafOnly;
        const syntheticCheckedKeySet = extendedCheckedKeySet;
        const syntheticIndeterminateKeySet = /* @__PURE__ */ new Set();
        const maxLevel = Math.max.apply(null, Array.from(levelTreeNodeMap.keys()));
        for (let level = maxLevel; level >= 0; level -= 1) {
          const levelIsZero = level === 0;
          const levelTreeNodes = levelTreeNodeMap.get(level);
          for (const levelTreeNode of levelTreeNodes) {
            if (levelTreeNode.isLeaf)
              continue;
            const { key: levelTreeNodeKey, shallowLoaded } = levelTreeNode;
            if (checkStrategyIsChild && shallowLoaded) {
              levelTreeNode.children.forEach((v) => {
                if (!v.disabled && !v.isLeaf && v.shallowLoaded && syntheticCheckedKeySet.has(v.key)) {
                  syntheticCheckedKeySet.delete(v.key);
                }
              });
            }
            if (levelTreeNode.disabled || !shallowLoaded) {
              continue;
            }
            let fullyChecked = true;
            let partialChecked = false;
            let allDisabled = true;
            for (const childNode of levelTreeNode.children) {
              const childKey = childNode.key;
              if (childNode.disabled)
                continue;
              if (allDisabled)
                allDisabled = false;
              if (syntheticCheckedKeySet.has(childKey)) {
                partialChecked = true;
              } else if (syntheticIndeterminateKeySet.has(childKey)) {
                partialChecked = true;
                fullyChecked = false;
                break;
              } else {
                fullyChecked = false;
                if (partialChecked) {
                  break;
                }
              }
            }
            if (fullyChecked && !allDisabled) {
              if (checkStrategyIsParent) {
                levelTreeNode.children.forEach((v) => {
                  if (!v.disabled && syntheticCheckedKeySet.has(v.key)) {
                    syntheticCheckedKeySet.delete(v.key);
                  }
                });
              }
              syntheticCheckedKeySet.add(levelTreeNodeKey);
            } else if (partialChecked) {
              syntheticIndeterminateKeySet.add(levelTreeNodeKey);
            }
            if (levelIsZero && checkStrategyIsChild && syntheticCheckedKeySet.has(levelTreeNodeKey)) {
              syntheticCheckedKeySet.delete(levelTreeNodeKey);
            }
          }
        }
        return {
          checkedKeys: Array.from(syntheticCheckedKeySet),
          indeterminateKeys: Array.from(syntheticIndeterminateKeySet)
        };
      }
      function getExtendedCheckedKeySet(checkedKeys, treeMate, allowNotLoaded, isUnchecking) {
        const { treeNodeMap, getChildren } = treeMate;
        const visitedKeySet = /* @__PURE__ */ new Set();
        const extendedKeySet = new Set(checkedKeys);
        checkedKeys.forEach((checkedKey) => {
          const checkedTreeNode = treeNodeMap.get(checkedKey);
          if (checkedTreeNode !== void 0) {
            traverseWithCb(checkedTreeNode, (treeNode) => {
              if (treeNode.disabled) {
                return TRAVERSE_COMMAND.STOP;
              }
              const { key } = treeNode;
              if (visitedKeySet.has(key))
                return;
              visitedKeySet.add(key);
              extendedKeySet.add(key);
              if (isExpilicitlyNotLoaded(treeNode.rawNode, getChildren)) {
                if (isUnchecking) {
                  return TRAVERSE_COMMAND.STOP;
                } else if (!allowNotLoaded) {
                  throw new SubtreeNotLoadedError();
                }
              }
            });
          }
        });
        return extendedKeySet;
      }
      function getPath(key, { includeGroup = false, includeSelf = true }, treeMate) {
        var _a;
        const treeNodeMap = treeMate.treeNodeMap;
        let treeNode = key === null || key === void 0 ? null : (_a = treeNodeMap.get(key)) !== null && _a !== void 0 ? _a : null;
        const mergedPath = {
          keyPath: [],
          treeNodePath: [],
          treeNode
        };
        if (treeNode === null || treeNode === void 0 ? void 0 : treeNode.ignored) {
          mergedPath.treeNode = null;
          return mergedPath;
        }
        while (treeNode) {
          if (!treeNode.ignored && (includeGroup || !treeNode.isGroup)) {
            mergedPath.treeNodePath.push(treeNode);
          }
          treeNode = treeNode.parent;
        }
        mergedPath.treeNodePath.reverse();
        if (!includeSelf)
          mergedPath.treeNodePath.pop();
        mergedPath.keyPath = mergedPath.treeNodePath.map((treeNode2) => treeNode2.key);
        return mergedPath;
      }
      function getFirstAvailableNode(nodes) {
        if (nodes.length === 0)
          return null;
        const node = nodes[0];
        if (node.isGroup || node.ignored || node.disabled) {
          return node.getNext();
        }
        return node;
      }
      function rawGetNext(node, loop) {
        const sibs = node.siblings;
        const l = sibs.length;
        const { index } = node;
        if (loop) {
          return sibs[(index + 1) % l];
        } else {
          if (index === sibs.length - 1)
            return null;
          return sibs[index + 1];
        }
      }
      function move(fromNode, dir, { loop = false, includeDisabled = false } = {}) {
        const iterate = dir === "prev" ? rawGetPrev : rawGetNext;
        const getChildOptions = {
          reverse: dir === "prev"
        };
        let meet = false;
        let endNode = null;
        function traverse(node) {
          if (node === null)
            return;
          if (node === fromNode) {
            if (!meet) {
              meet = true;
            } else if (!fromNode.disabled && !fromNode.isGroup) {
              endNode = fromNode;
              return;
            }
          } else {
            if ((!node.disabled || includeDisabled) && !node.ignored && !node.isGroup) {
              endNode = node;
              return;
            }
          }
          if (node.isGroup) {
            const child = getChild(node, getChildOptions);
            if (child !== null) {
              endNode = child;
            } else {
              traverse(iterate(node, loop));
            }
          } else {
            const nextNode = iterate(node, false);
            if (nextNode !== null) {
              traverse(nextNode);
            } else {
              const parent = rawGetParent(node);
              if (parent === null || parent === void 0 ? void 0 : parent.isGroup) {
                traverse(iterate(parent, loop));
              } else if (loop) {
                traverse(iterate(node, true));
              }
            }
          }
        }
        traverse(fromNode);
        return endNode;
      }
      function rawGetPrev(node, loop) {
        const sibs = node.siblings;
        const l = sibs.length;
        const { index } = node;
        if (loop) {
          return sibs[(index - 1 + l) % l];
        } else {
          if (index === 0)
            return null;
          return sibs[index - 1];
        }
      }
      function rawGetParent(node) {
        return node.parent;
      }
      function getChild(node, options = {}) {
        const { reverse = false } = options;
        const { children } = node;
        if (children) {
          const { length } = children;
          const start = reverse ? length - 1 : 0;
          const end = reverse ? -1 : length;
          const delta = reverse ? -1 : 1;
          for (let i = start; i !== end; i += delta) {
            const child = children[i];
            if (!child.disabled && !child.ignored) {
              if (child.isGroup) {
                const childInGroup = getChild(child, options);
                if (childInGroup !== null)
                  return childInGroup;
              } else {
                return child;
              }
            }
          }
        }
        return null;
      }
      const moveMethods = {
        getChild() {
          if (this.ignored)
            return null;
          return getChild(this);
        },
        getParent() {
          const { parent } = this;
          if (parent === null || parent === void 0 ? void 0 : parent.isGroup) {
            return parent.getParent();
          }
          return parent;
        },
        getNext(options = {}) {
          return move(this, "next", options);
        },
        getPrev(options = {}) {
          return move(this, "prev", options);
        }
      };
      function flatten(treeNodes, expandedKeys) {
        const expandedKeySet = expandedKeys ? new Set(expandedKeys) : void 0;
        const flattenedNodes = [];
        function traverse(treeNodes2) {
          treeNodes2.forEach((treeNode) => {
            flattenedNodes.push(treeNode);
            if (treeNode.isLeaf || !treeNode.children || treeNode.ignored)
              return;
            if (treeNode.isGroup) {
              traverse(treeNode.children);
            } else if (
              // normal non-leaf node
              expandedKeySet === void 0 || expandedKeySet.has(treeNode.key)
            ) {
              traverse(treeNode.children);
            }
          });
        }
        traverse(treeNodes);
        return flattenedNodes;
      }
      function contains(parent, child) {
        const parentKey = parent.key;
        while (child) {
          if (child.key === parentKey)
            return true;
          child = child.parent;
        }
        return false;
      }
      function createTreeNodes(rawNodes, treeNodeMap, levelTreeNodeMap, nodeProto, getChildren, parent = null, level = 0) {
        const treeNodes = [];
        rawNodes.forEach((rawNode, index) => {
          var _a;
          const treeNode = Object.create(nodeProto);
          treeNode.rawNode = rawNode;
          treeNode.siblings = treeNodes;
          treeNode.level = level;
          treeNode.index = index;
          treeNode.isFirstChild = index === 0;
          treeNode.isLastChild = index + 1 === rawNodes.length;
          treeNode.parent = parent;
          if (!treeNode.ignored) {
            const rawChildren = getChildren(rawNode);
            if (Array.isArray(rawChildren)) {
              treeNode.children = createTreeNodes(rawChildren, treeNodeMap, levelTreeNodeMap, nodeProto, getChildren, treeNode, level + 1);
            }
          }
          treeNodes.push(treeNode);
          treeNodeMap.set(treeNode.key, treeNode);
          if (!levelTreeNodeMap.has(level))
            levelTreeNodeMap.set(level, []);
          (_a = levelTreeNodeMap.get(level)) === null || _a === void 0 ? void 0 : _a.push(treeNode);
        });
        return treeNodes;
      }
      function createTreeMate(rawNodes, options = {}) {
        var _a;
        const treeNodeMap = /* @__PURE__ */ new Map();
        const levelTreeNodeMap = /* @__PURE__ */ new Map();
        const { getDisabled = isDisabled, getIgnored: getIgnored2 = isIgnored, getIsGroup: getIsGroup2 = isGroup, getKey = defaultGetKey } = options;
        const _getChildren = (_a = options.getChildren) !== null && _a !== void 0 ? _a : defaultGetChildren;
        const getChildren = options.ignoreEmptyChildren ? (node) => {
          const children = _getChildren(node);
          if (Array.isArray(children)) {
            if (!children.length)
              return null;
            return children;
          }
          return children;
        } : _getChildren;
        const nodeProto = Object.assign({
          get key() {
            return getKey(this.rawNode);
          },
          get disabled() {
            return getDisabled(this.rawNode);
          },
          get isGroup() {
            return getIsGroup2(this.rawNode);
          },
          get isLeaf() {
            return isLeaf(this.rawNode, getChildren);
          },
          get shallowLoaded() {
            return isShallowLoaded(this.rawNode, getChildren);
          },
          get ignored() {
            return getIgnored2(this.rawNode);
          },
          contains(node) {
            return contains(this, node);
          }
        }, moveMethods);
        const treeNodes = createTreeNodes(rawNodes, treeNodeMap, levelTreeNodeMap, nodeProto, getChildren);
        function getNode(key) {
          if (key === null || key === void 0)
            return null;
          const tmNode = treeNodeMap.get(key);
          if (tmNode && !tmNode.isGroup && !tmNode.ignored) {
            return tmNode;
          }
          return null;
        }
        function _getNode(key) {
          if (key === null || key === void 0)
            return null;
          const tmNode = treeNodeMap.get(key);
          if (tmNode && !tmNode.ignored) {
            return tmNode;
          }
          return null;
        }
        function getPrev(key, options2) {
          const node = _getNode(key);
          if (!node)
            return null;
          return node.getPrev(options2);
        }
        function getNext(key, options2) {
          const node = _getNode(key);
          if (!node)
            return null;
          return node.getNext(options2);
        }
        function getParent(key) {
          const node = _getNode(key);
          if (!node)
            return null;
          return node.getParent();
        }
        function getChild2(key) {
          const node = _getNode(key);
          if (!node)
            return null;
          return node.getChild();
        }
        const treemate = {
          treeNodes,
          treeNodeMap,
          levelTreeNodeMap,
          maxLevel: Math.max(...levelTreeNodeMap.keys()),
          getChildren,
          getFlattenedNodes(expandedKeys) {
            return flatten(treeNodes, expandedKeys);
          },
          getNode,
          getPrev,
          getNext,
          getParent,
          getChild: getChild2,
          getFirstAvailableNode() {
            return getFirstAvailableNode(treeNodes);
          },
          getPath(key, options2 = {}) {
            return getPath(key, options2, treemate);
          },
          getCheckedKeys(checkedKeys, options2 = {}) {
            const { cascade = true, leafOnly = false, checkStrategy = "all", allowNotLoaded = false } = options2;
            return getCheckedKeys({
              checkedKeys: unwrapCheckedKeys(checkedKeys),
              indeterminateKeys: unwrapIndeterminateKeys(checkedKeys),
              cascade,
              leafOnly,
              checkStrategy,
              allowNotLoaded
            }, treemate);
          },
          check(keysToCheck, checkedKeys, options2 = {}) {
            const { cascade = true, leafOnly = false, checkStrategy = "all", allowNotLoaded = false } = options2;
            return getCheckedKeys({
              checkedKeys: unwrapCheckedKeys(checkedKeys),
              indeterminateKeys: unwrapIndeterminateKeys(checkedKeys),
              keysToCheck: keysToCheck === void 0 || keysToCheck === null ? [] : toArray(keysToCheck),
              cascade,
              leafOnly,
              checkStrategy,
              allowNotLoaded
            }, treemate);
          },
          uncheck(keysToUncheck, checkedKeys, options2 = {}) {
            const { cascade = true, leafOnly = false, checkStrategy = "all", allowNotLoaded = false } = options2;
            return getCheckedKeys({
              checkedKeys: unwrapCheckedKeys(checkedKeys),
              indeterminateKeys: unwrapIndeterminateKeys(checkedKeys),
              keysToUncheck: keysToUncheck === null || keysToUncheck === void 0 ? [] : toArray(keysToUncheck),
              cascade,
              leafOnly,
              checkStrategy,
              allowNotLoaded
            }, treemate);
          },
          getNonLeafKeys(options2 = {}) {
            return getNonLeafKeys(treeNodes, options2);
          }
        };
        return treemate;
      }
      const base$1 = {
        neutralBase: "#000",
        neutralInvertBase: "#fff",
        neutralTextBase: "#fff",
        neutralPopover: "rgb(72, 72, 78)",
        neutralCard: "rgb(24, 24, 28)",
        neutralModal: "rgb(44, 44, 50)",
        neutralBody: "rgb(16, 16, 20)",
        alpha1: "0.9",
        alpha2: "0.82",
        alpha3: "0.52",
        alpha4: "0.38",
        alpha5: "0.28",
        alphaClose: "0.52",
        alphaDisabled: "0.38",
        alphaDisabledInput: "0.06",
        alphaPending: "0.09",
        alphaTablePending: "0.06",
        alphaTableStriped: "0.05",
        alphaPressed: "0.05",
        alphaAvatar: "0.18",
        alphaRail: "0.2",
        alphaProgressRail: "0.12",
        alphaBorder: "0.24",
        alphaDivider: "0.09",
        alphaInput: "0.1",
        alphaAction: "0.06",
        alphaTab: "0.04",
        alphaScrollbar: "0.2",
        alphaScrollbarHover: "0.3",
        alphaCode: "0.12",
        alphaTag: "0.2",
        // primary
        primaryHover: "#7fe7c4",
        primaryDefault: "#63e2b7",
        primaryActive: "#5acea7",
        primarySuppl: "rgb(42, 148, 125)",
        // info
        infoHover: "#8acbec",
        infoDefault: "#70c0e8",
        infoActive: "#66afd3",
        infoSuppl: "rgb(56, 137, 197)",
        // error
        errorHover: "#e98b8b",
        errorDefault: "#e88080",
        errorActive: "#e57272",
        errorSuppl: "rgb(208, 58, 82)",
        // warning
        warningHover: "#f5d599",
        warningDefault: "#f2c97d",
        warningActive: "#e6c260",
        warningSuppl: "rgb(240, 138, 0)",
        // success
        successHover: "#7fe7c4",
        successDefault: "#63e2b7",
        successActive: "#5acea7",
        successSuppl: "rgb(42, 148, 125)"
      };
      const baseBackgroundRgb$1 = rgba(base$1.neutralBase);
      const baseInvertBackgroundRgb$1 = rgba(base$1.neutralInvertBase);
      const overlayPrefix$1 = `rgba(${baseInvertBackgroundRgb$1.slice(0, 3).join(", ")}, `;
      function overlay$1(alpha) {
        return `${overlayPrefix$1 + String(alpha)})`;
      }
      function neutral$1(alpha) {
        const overlayRgba = Array.from(baseInvertBackgroundRgb$1);
        overlayRgba[3] = Number(alpha);
        return composite(baseBackgroundRgb$1, overlayRgba);
      }
      const derived$1 = Object.assign(Object.assign({
        name: "common"
      }, commonVariables$m), {
        baseColor: base$1.neutralBase,
        // primary color
        primaryColor: base$1.primaryDefault,
        primaryColorHover: base$1.primaryHover,
        primaryColorPressed: base$1.primaryActive,
        primaryColorSuppl: base$1.primarySuppl,
        // info color
        infoColor: base$1.infoDefault,
        infoColorHover: base$1.infoHover,
        infoColorPressed: base$1.infoActive,
        infoColorSuppl: base$1.infoSuppl,
        // success color
        successColor: base$1.successDefault,
        successColorHover: base$1.successHover,
        successColorPressed: base$1.successActive,
        successColorSuppl: base$1.successSuppl,
        // warning color
        warningColor: base$1.warningDefault,
        warningColorHover: base$1.warningHover,
        warningColorPressed: base$1.warningActive,
        warningColorSuppl: base$1.warningSuppl,
        // error color
        errorColor: base$1.errorDefault,
        errorColorHover: base$1.errorHover,
        errorColorPressed: base$1.errorActive,
        errorColorSuppl: base$1.errorSuppl,
        // text color
        textColorBase: base$1.neutralTextBase,
        textColor1: overlay$1(base$1.alpha1),
        textColor2: overlay$1(base$1.alpha2),
        textColor3: overlay$1(base$1.alpha3),
        // textColor4: overlay(base.alpha4), // disabled, placeholder, icon
        // textColor5: overlay(base.alpha5),
        textColorDisabled: overlay$1(base$1.alpha4),
        placeholderColor: overlay$1(base$1.alpha4),
        placeholderColorDisabled: overlay$1(base$1.alpha5),
        iconColor: overlay$1(base$1.alpha4),
        iconColorDisabled: overlay$1(base$1.alpha5),
        iconColorHover: overlay$1(Number(base$1.alpha4) * 1.25),
        iconColorPressed: overlay$1(Number(base$1.alpha4) * 0.8),
        opacity1: base$1.alpha1,
        opacity2: base$1.alpha2,
        opacity3: base$1.alpha3,
        opacity4: base$1.alpha4,
        opacity5: base$1.alpha5,
        dividerColor: overlay$1(base$1.alphaDivider),
        borderColor: overlay$1(base$1.alphaBorder),
        // close
        closeIconColorHover: overlay$1(Number(base$1.alphaClose)),
        closeIconColor: overlay$1(Number(base$1.alphaClose)),
        closeIconColorPressed: overlay$1(Number(base$1.alphaClose)),
        closeColorHover: "rgba(255, 255, 255, .12)",
        closeColorPressed: "rgba(255, 255, 255, .08)",
        // clear
        clearColor: overlay$1(base$1.alpha4),
        clearColorHover: scaleColor(overlay$1(base$1.alpha4), {
          alpha: 1.25
        }),
        clearColorPressed: scaleColor(overlay$1(base$1.alpha4), {
          alpha: 0.8
        }),
        scrollbarColor: overlay$1(base$1.alphaScrollbar),
        scrollbarColorHover: overlay$1(base$1.alphaScrollbarHover),
        scrollbarWidth: "5px",
        scrollbarHeight: "5px",
        scrollbarBorderRadius: "5px",
        progressRailColor: overlay$1(base$1.alphaProgressRail),
        railColor: overlay$1(base$1.alphaRail),
        popoverColor: base$1.neutralPopover,
        tableColor: base$1.neutralCard,
        cardColor: base$1.neutralCard,
        modalColor: base$1.neutralModal,
        bodyColor: base$1.neutralBody,
        tagColor: neutral$1(base$1.alphaTag),
        avatarColor: overlay$1(base$1.alphaAvatar),
        invertedColor: base$1.neutralBase,
        inputColor: overlay$1(base$1.alphaInput),
        codeColor: overlay$1(base$1.alphaCode),
        tabColor: overlay$1(base$1.alphaTab),
        actionColor: overlay$1(base$1.alphaAction),
        tableHeaderColor: overlay$1(base$1.alphaAction),
        hoverColor: overlay$1(base$1.alphaPending),
        tableColorHover: overlay$1(base$1.alphaTablePending),
        tableColorStriped: overlay$1(base$1.alphaTableStriped),
        pressedColor: overlay$1(base$1.alphaPressed),
        opacityDisabled: base$1.alphaDisabled,
        inputColorDisabled: overlay$1(base$1.alphaDisabledInput),
        buttonColor2: "rgba(255, 255, 255, .08)",
        buttonColor2Hover: "rgba(255, 255, 255, .12)",
        buttonColor2Pressed: "rgba(255, 255, 255, .08)",
        boxShadow1: "0 1px 2px -2px rgba(0, 0, 0, .24), 0 3px 6px 0 rgba(0, 0, 0, .18), 0 5px 12px 4px rgba(0, 0, 0, .12)",
        boxShadow2: "0 3px 6px -4px rgba(0, 0, 0, .24), 0 6px 12px 0 rgba(0, 0, 0, .16), 0 9px 18px 8px rgba(0, 0, 0, .10)",
        boxShadow3: "0 6px 16px -9px rgba(0, 0, 0, .08), 0 9px 28px 0 rgba(0, 0, 0, .05), 0 12px 48px 16px rgba(0, 0, 0, .03)"
      });
      const base = {
        neutralBase: "#FFF",
        neutralInvertBase: "#000",
        neutralTextBase: "#000",
        neutralPopover: "#fff",
        neutralCard: "#fff",
        neutralModal: "#fff",
        neutralBody: "#fff",
        alpha1: "0.82",
        alpha2: "0.72",
        alpha3: "0.38",
        alpha4: "0.24",
        // disabled text, placeholder, icon
        alpha5: "0.18",
        // disabled placeholder
        alphaClose: "0.6",
        alphaDisabled: "0.5",
        alphaDisabledInput: "0.02",
        alphaPending: "0.05",
        alphaTablePending: "0.02",
        alphaPressed: "0.07",
        alphaAvatar: "0.2",
        alphaRail: "0.14",
        alphaProgressRail: ".08",
        alphaBorder: "0.12",
        alphaDivider: "0.06",
        alphaInput: "0",
        alphaAction: "0.02",
        alphaTab: "0.04",
        alphaScrollbar: "0.25",
        alphaScrollbarHover: "0.4",
        alphaCode: "0.05",
        alphaTag: "0.02",
        // primary
        primaryHover: "#36ad6a",
        primaryDefault: "#18a058",
        primaryActive: "#0c7a43",
        primarySuppl: "#36ad6a",
        // info
        infoHover: "#4098fc",
        infoDefault: "#2080f0",
        infoActive: "#1060c9",
        infoSuppl: "#4098fc",
        // error
        errorHover: "#de576d",
        errorDefault: "#d03050",
        errorActive: "#ab1f3f",
        errorSuppl: "#de576d",
        // warning
        warningHover: "#fcb040",
        warningDefault: "#f0a020",
        warningActive: "#c97c10",
        warningSuppl: "#fcb040",
        // success
        successHover: "#36ad6a",
        successDefault: "#18a058",
        successActive: "#0c7a43",
        successSuppl: "#36ad6a"
      };
      const baseBackgroundRgb = rgba(base.neutralBase);
      const baseInvertBackgroundRgb = rgba(base.neutralInvertBase);
      const overlayPrefix = `rgba(${baseInvertBackgroundRgb.slice(0, 3).join(", ")}, `;
      function overlay(alpha) {
        return `${overlayPrefix + String(alpha)})`;
      }
      function neutral(alpha) {
        const overlayRgba = Array.from(baseInvertBackgroundRgb);
        overlayRgba[3] = Number(alpha);
        return composite(baseBackgroundRgb, overlayRgba);
      }
      const derived = Object.assign(Object.assign({
        name: "common"
      }, commonVariables$m), {
        baseColor: base.neutralBase,
        // primary color
        primaryColor: base.primaryDefault,
        primaryColorHover: base.primaryHover,
        primaryColorPressed: base.primaryActive,
        primaryColorSuppl: base.primarySuppl,
        // info color
        infoColor: base.infoDefault,
        infoColorHover: base.infoHover,
        infoColorPressed: base.infoActive,
        infoColorSuppl: base.infoSuppl,
        // success color
        successColor: base.successDefault,
        successColorHover: base.successHover,
        successColorPressed: base.successActive,
        successColorSuppl: base.successSuppl,
        // warning color
        warningColor: base.warningDefault,
        warningColorHover: base.warningHover,
        warningColorPressed: base.warningActive,
        warningColorSuppl: base.warningSuppl,
        // error color
        errorColor: base.errorDefault,
        errorColorHover: base.errorHover,
        errorColorPressed: base.errorActive,
        errorColorSuppl: base.errorSuppl,
        // text color
        textColorBase: base.neutralTextBase,
        textColor1: "rgb(31, 34, 37)",
        textColor2: "rgb(51, 54, 57)",
        textColor3: "rgb(118, 124, 130)",
        // textColor4: neutral(base.alpha4), // disabled, placeholder, icon
        // textColor5: neutral(base.alpha5),
        textColorDisabled: neutral(base.alpha4),
        placeholderColor: neutral(base.alpha4),
        placeholderColorDisabled: neutral(base.alpha5),
        iconColor: neutral(base.alpha4),
        iconColorHover: scaleColor(neutral(base.alpha4), {
          lightness: 0.75
        }),
        iconColorPressed: scaleColor(neutral(base.alpha4), {
          lightness: 0.9
        }),
        iconColorDisabled: neutral(base.alpha5),
        opacity1: base.alpha1,
        opacity2: base.alpha2,
        opacity3: base.alpha3,
        opacity4: base.alpha4,
        opacity5: base.alpha5,
        dividerColor: "rgb(239, 239, 245)",
        borderColor: "rgb(224, 224, 230)",
        // close
        closeIconColor: neutral(Number(base.alphaClose)),
        closeIconColorHover: neutral(Number(base.alphaClose)),
        closeIconColorPressed: neutral(Number(base.alphaClose)),
        closeColorHover: "rgba(0, 0, 0, .09)",
        closeColorPressed: "rgba(0, 0, 0, .13)",
        // clear
        clearColor: neutral(base.alpha4),
        clearColorHover: scaleColor(neutral(base.alpha4), {
          lightness: 0.75
        }),
        clearColorPressed: scaleColor(neutral(base.alpha4), {
          lightness: 0.9
        }),
        scrollbarColor: overlay(base.alphaScrollbar),
        scrollbarColorHover: overlay(base.alphaScrollbarHover),
        scrollbarWidth: "5px",
        scrollbarHeight: "5px",
        scrollbarBorderRadius: "5px",
        progressRailColor: neutral(base.alphaProgressRail),
        railColor: "rgb(219, 219, 223)",
        popoverColor: base.neutralPopover,
        tableColor: base.neutralCard,
        cardColor: base.neutralCard,
        modalColor: base.neutralModal,
        bodyColor: base.neutralBody,
        tagColor: "#eee",
        avatarColor: neutral(base.alphaAvatar),
        invertedColor: "rgb(0, 20, 40)",
        inputColor: neutral(base.alphaInput),
        codeColor: "rgb(244, 244, 248)",
        tabColor: "rgb(247, 247, 250)",
        actionColor: "rgb(250, 250, 252)",
        tableHeaderColor: "rgb(250, 250, 252)",
        hoverColor: "rgb(243, 243, 245)",
        // use color with alpha since it can be nested with header filter & sorter effect
        tableColorHover: "rgba(0, 0, 100, 0.03)",
        tableColorStriped: "rgba(0, 0, 100, 0.02)",
        pressedColor: "rgb(237, 237, 239)",
        opacityDisabled: base.alphaDisabled,
        inputColorDisabled: "rgb(250, 250, 252)",
        // secondary button color
        // can also be used in tertiary button & quaternary button
        buttonColor2: "rgba(46, 51, 56, .05)",
        buttonColor2Hover: "rgba(46, 51, 56, .09)",
        buttonColor2Pressed: "rgba(46, 51, 56, .13)",
        boxShadow1: "0 1px 2px -2px rgba(0, 0, 0, .08), 0 3px 6px 0 rgba(0, 0, 0, .06), 0 5px 12px 4px rgba(0, 0, 0, .04)",
        boxShadow2: "0 3px 6px -4px rgba(0, 0, 0, .12), 0 6px 16px 0 rgba(0, 0, 0, .08), 0 9px 28px 8px rgba(0, 0, 0, .05)",
        boxShadow3: "0 6px 16px -9px rgba(0, 0, 0, .08), 0 9px 28px 0 rgba(0, 0, 0, .05), 0 12px 48px 16px rgba(0, 0, 0, .03)"
      });
      const commonVars$e = {
        iconSizeSmall: "34px",
        iconSizeMedium: "40px",
        iconSizeLarge: "46px",
        iconSizeHuge: "52px"
      };
      function self$1i(vars) {
        const {
          textColorDisabled,
          iconColor,
          textColor2,
          fontSizeSmall,
          fontSizeMedium,
          fontSizeLarge,
          fontSizeHuge
        } = vars;
        return Object.assign(Object.assign({}, commonVars$e), {
          fontSizeSmall,
          fontSizeMedium,
          fontSizeLarge,
          fontSizeHuge,
          textColor: textColorDisabled,
          iconColor,
          extraTextColor: textColor2
        });
      }
      const emptyLight = {
        name: "Empty",
        common: derived,
        self: self$1i
      };
      const emptyDark = {
        name: "Empty",
        common: derived$1,
        self: self$1i
      };
      const style$j = cB("empty", `
 display: flex;
 flex-direction: column;
 align-items: center;
 font-size: var(--n-font-size);
`, [cE("icon", `
 width: var(--n-icon-size);
 height: var(--n-icon-size);
 font-size: var(--n-icon-size);
 line-height: var(--n-icon-size);
 color: var(--n-icon-color);
 transition:
 color .3s var(--n-bezier);
 `, [c$1("+", [cE("description", `
 margin-top: 8px;
 `)])]), cE("description", `
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 `), cE("extra", `
 text-align: center;
 transition: color .3s var(--n-bezier);
 margin-top: 12px;
 color: var(--n-extra-text-color);
 `)]);
      const emptyProps = Object.assign(Object.assign({}, useTheme.props), {
        description: String,
        showDescription: {
          type: Boolean,
          default: true
        },
        showIcon: {
          type: Boolean,
          default: true
        },
        size: {
          type: String,
          default: "medium"
        },
        renderIcon: Function
      });
      const NEmpty = vue.defineComponent({
        name: "Empty",
        props: emptyProps,
        setup(props) {
          const {
            mergedClsPrefixRef,
            inlineThemeDisabled
          } = useConfig(props);
          const themeRef = useTheme("Empty", "-empty", style$j, emptyLight, props, mergedClsPrefixRef);
          const {
            localeRef
          } = useLocale("Empty");
          const NConfigProvider2 = vue.inject(configProviderInjectionKey, null);
          const mergedDescriptionRef = vue.computed(() => {
            var _a, _b, _c;
            return (_a = props.description) !== null && _a !== void 0 ? _a : (_c = (_b = NConfigProvider2 === null || NConfigProvider2 === void 0 ? void 0 : NConfigProvider2.mergedComponentPropsRef.value) === null || _b === void 0 ? void 0 : _b.Empty) === null || _c === void 0 ? void 0 : _c.description;
          });
          const mergedRenderIconRef = vue.computed(() => {
            var _a, _b;
            return ((_b = (_a = NConfigProvider2 === null || NConfigProvider2 === void 0 ? void 0 : NConfigProvider2.mergedComponentPropsRef.value) === null || _a === void 0 ? void 0 : _a.Empty) === null || _b === void 0 ? void 0 : _b.renderIcon) || (() => vue.h(EmptyIcon, null));
          });
          const cssVarsRef = vue.computed(() => {
            const {
              size: size2
            } = props;
            const {
              common: {
                cubicBezierEaseInOut: cubicBezierEaseInOut2
              },
              self: {
                [createKey("iconSize", size2)]: iconSize,
                [createKey("fontSize", size2)]: fontSize2,
                textColor,
                iconColor,
                extraTextColor
              }
            } = themeRef.value;
            return {
              "--n-icon-size": iconSize,
              "--n-font-size": fontSize2,
              "--n-bezier": cubicBezierEaseInOut2,
              "--n-text-color": textColor,
              "--n-icon-color": iconColor,
              "--n-extra-text-color": extraTextColor
            };
          });
          const themeClassHandle = inlineThemeDisabled ? useThemeClass("empty", vue.computed(() => {
            let hash = "";
            const {
              size: size2
            } = props;
            hash += size2[0];
            return hash;
          }), cssVarsRef, props) : void 0;
          return {
            mergedClsPrefix: mergedClsPrefixRef,
            mergedRenderIcon: mergedRenderIconRef,
            localizedDescription: vue.computed(() => {
              return mergedDescriptionRef.value || localeRef.value.description;
            }),
            cssVars: inlineThemeDisabled ? void 0 : cssVarsRef,
            themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
            onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
          };
        },
        render() {
          const {
            $slots,
            mergedClsPrefix,
            onRender
          } = this;
          onRender === null || onRender === void 0 ? void 0 : onRender();
          return vue.h("div", {
            class: [`${mergedClsPrefix}-empty`, this.themeClass],
            style: this.cssVars
          }, this.showIcon ? vue.h("div", {
            class: `${mergedClsPrefix}-empty__icon`
          }, $slots.icon ? $slots.icon() : vue.h(NBaseIcon, {
            clsPrefix: mergedClsPrefix
          }, {
            default: this.mergedRenderIcon
          })) : null, this.showDescription ? vue.h("div", {
            class: `${mergedClsPrefix}-empty__description`
          }, $slots.default ? $slots.default() : this.localizedDescription) : null, $slots.extra ? vue.h("div", {
            class: `${mergedClsPrefix}-empty__extra`
          }, $slots.extra()) : null);
        }
      });
      const commonVars$d = {
        railInsetHorizontal: "auto 2px 4px 2px",
        railInsetVertical: "2px 4px 2px auto",
        railColor: "transparent"
      };
      function self$1h(vars) {
        const {
          scrollbarColor,
          scrollbarColorHover,
          scrollbarHeight,
          scrollbarWidth,
          scrollbarBorderRadius
        } = vars;
        return Object.assign(Object.assign({}, commonVars$d), {
          height: scrollbarHeight,
          width: scrollbarWidth,
          borderRadius: scrollbarBorderRadius,
          color: scrollbarColor,
          colorHover: scrollbarColorHover
        });
      }
      const scrollbarLight = {
        name: "Scrollbar",
        common: derived,
        self: self$1h
      };
      const scrollbarDark = {
        name: "Scrollbar",
        common: derived$1,
        self: self$1h
      };
      const {
        cubicBezierEaseInOut: cubicBezierEaseInOut$2
      } = commonVariables$m;
      function fadeInTransition({
        name = "fade-in",
        enterDuration = "0.2s",
        leaveDuration = "0.2s",
        enterCubicBezier = cubicBezierEaseInOut$2,
        leaveCubicBezier = cubicBezierEaseInOut$2
      } = {}) {
        return [c$1(`&.${name}-transition-enter-active`, {
          transition: `all ${enterDuration} ${enterCubicBezier}!important`
        }), c$1(`&.${name}-transition-leave-active`, {
          transition: `all ${leaveDuration} ${leaveCubicBezier}!important`
        }), c$1(`&.${name}-transition-enter-from, &.${name}-transition-leave-to`, {
          opacity: 0
        }), c$1(`&.${name}-transition-leave-from, &.${name}-transition-enter-to`, {
          opacity: 1
        })];
      }
      const style$i = cB("scrollbar", `
 overflow: hidden;
 position: relative;
 z-index: auto;
 height: 100%;
 width: 100%;
`, [c$1(">", [cB("scrollbar-container", `
 width: 100%;
 overflow: scroll;
 height: 100%;
 min-height: inherit;
 max-height: inherit;
 scrollbar-width: none;
 `, [c$1("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb", `
 width: 0;
 height: 0;
 display: none;
 `), c$1(">", [
        // We can't set overflow hidden since it affects positioning.
        cB("scrollbar-content", `
 box-sizing: border-box;
 min-width: 100%;
 `)
      ])])]), c$1(">, +", [cB("scrollbar-rail", `
 position: absolute;
 pointer-events: none;
 user-select: none;
 background: var(--n-scrollbar-rail-color);
 -webkit-user-select: none;
 `, [cM("horizontal", `
 inset: var(--n-scrollbar-rail-inset-horizontal);
 height: var(--n-scrollbar-height);
 `, [c$1(">", [cE("scrollbar", `
 height: var(--n-scrollbar-height);
 border-radius: var(--n-scrollbar-border-radius);
 right: 0;
 `)])]), cM("vertical", `
 inset: var(--n-scrollbar-rail-inset-vertical);
 width: var(--n-scrollbar-width);
 `, [c$1(">", [cE("scrollbar", `
 width: var(--n-scrollbar-width);
 border-radius: var(--n-scrollbar-border-radius);
 bottom: 0;
 `)])]), cM("disabled", [c$1(">", [cE("scrollbar", "pointer-events: none;")])]), c$1(">", [cE("scrollbar", `
 z-index: 1;
 position: absolute;
 cursor: pointer;
 pointer-events: all;
 background-color: var(--n-scrollbar-color);
 transition: background-color .2s var(--n-scrollbar-bezier);
 `, [fadeInTransition(), c$1("&:hover", "background-color: var(--n-scrollbar-color-hover);")])])])])]);
      const scrollbarProps = Object.assign(Object.assign({}, useTheme.props), {
        duration: {
          type: Number,
          default: 0
        },
        scrollable: {
          type: Boolean,
          default: true
        },
        xScrollable: Boolean,
        trigger: {
          type: String,
          default: "hover"
        },
        useUnifiedContainer: Boolean,
        triggerDisplayManually: Boolean,
        // If container is set, resize observer won't not attached
        container: Function,
        content: Function,
        containerClass: String,
        containerStyle: [String, Object],
        contentClass: [String, Array],
        contentStyle: [String, Object],
        horizontalRailStyle: [String, Object],
        verticalRailStyle: [String, Object],
        onScroll: Function,
        onWheel: Function,
        onResize: Function,
        internalOnUpdateScrollLeft: Function,
        internalHoistYRail: Boolean
      });
      const Scrollbar = vue.defineComponent({
        name: "Scrollbar",
        props: scrollbarProps,
        inheritAttrs: false,
        setup(props) {
          const {
            mergedClsPrefixRef,
            inlineThemeDisabled,
            mergedRtlRef
          } = useConfig(props);
          const rtlEnabledRef = useRtl("Scrollbar", mergedRtlRef, mergedClsPrefixRef);
          const wrapperRef = vue.ref(null);
          const containerRef = vue.ref(null);
          const contentRef = vue.ref(null);
          const yRailRef = vue.ref(null);
          const xRailRef = vue.ref(null);
          const contentHeightRef = vue.ref(null);
          const contentWidthRef = vue.ref(null);
          const containerHeightRef = vue.ref(null);
          const containerWidthRef = vue.ref(null);
          const yRailSizeRef = vue.ref(null);
          const xRailSizeRef = vue.ref(null);
          const containerScrollTopRef = vue.ref(0);
          const containerScrollLeftRef = vue.ref(0);
          const isShowXBarRef = vue.ref(false);
          const isShowYBarRef = vue.ref(false);
          let yBarPressed = false;
          let xBarPressed = false;
          let xBarVanishTimerId;
          let yBarVanishTimerId;
          let memoYTop = 0;
          let memoXLeft = 0;
          let memoMouseX = 0;
          let memoMouseY = 0;
          const isIos2 = useIsIos();
          const themeRef = useTheme("Scrollbar", "-scrollbar", style$i, scrollbarLight, props, mergedClsPrefixRef);
          const yBarSizeRef = vue.computed(() => {
            const {
              value: containerHeight
            } = containerHeightRef;
            const {
              value: contentHeight
            } = contentHeightRef;
            const {
              value: yRailSize
            } = yRailSizeRef;
            if (containerHeight === null || contentHeight === null || yRailSize === null) {
              return 0;
            } else {
              return Math.min(containerHeight, yRailSize * containerHeight / contentHeight + depx(themeRef.value.self.width) * 1.5);
            }
          });
          const yBarSizePxRef = vue.computed(() => {
            return `${yBarSizeRef.value}px`;
          });
          const xBarSizeRef = vue.computed(() => {
            const {
              value: containerWidth
            } = containerWidthRef;
            const {
              value: contentWidth
            } = contentWidthRef;
            const {
              value: xRailSize
            } = xRailSizeRef;
            if (containerWidth === null || contentWidth === null || xRailSize === null) {
              return 0;
            } else {
              return xRailSize * containerWidth / contentWidth + depx(themeRef.value.self.height) * 1.5;
            }
          });
          const xBarSizePxRef = vue.computed(() => {
            return `${xBarSizeRef.value}px`;
          });
          const yBarTopRef = vue.computed(() => {
            const {
              value: containerHeight
            } = containerHeightRef;
            const {
              value: containerScrollTop
            } = containerScrollTopRef;
            const {
              value: contentHeight
            } = contentHeightRef;
            const {
              value: yRailSize
            } = yRailSizeRef;
            if (containerHeight === null || contentHeight === null || yRailSize === null) {
              return 0;
            } else {
              const heightDiff = contentHeight - containerHeight;
              if (!heightDiff) return 0;
              return containerScrollTop / heightDiff * (yRailSize - yBarSizeRef.value);
            }
          });
          const yBarTopPxRef = vue.computed(() => {
            return `${yBarTopRef.value}px`;
          });
          const xBarLeftRef = vue.computed(() => {
            const {
              value: containerWidth
            } = containerWidthRef;
            const {
              value: containerScrollLeft
            } = containerScrollLeftRef;
            const {
              value: contentWidth
            } = contentWidthRef;
            const {
              value: xRailSize
            } = xRailSizeRef;
            if (containerWidth === null || contentWidth === null || xRailSize === null) {
              return 0;
            } else {
              const widthDiff = contentWidth - containerWidth;
              if (!widthDiff) return 0;
              return containerScrollLeft / widthDiff * (xRailSize - xBarSizeRef.value);
            }
          });
          const xBarLeftPxRef = vue.computed(() => {
            return `${xBarLeftRef.value}px`;
          });
          const needYBarRef = vue.computed(() => {
            const {
              value: containerHeight
            } = containerHeightRef;
            const {
              value: contentHeight
            } = contentHeightRef;
            return containerHeight !== null && contentHeight !== null && contentHeight > containerHeight;
          });
          const needXBarRef = vue.computed(() => {
            const {
              value: containerWidth
            } = containerWidthRef;
            const {
              value: contentWidth
            } = contentWidthRef;
            return containerWidth !== null && contentWidth !== null && contentWidth > containerWidth;
          });
          const mergedShowXBarRef = vue.computed(() => {
            const {
              trigger: trigger2
            } = props;
            return trigger2 === "none" || isShowXBarRef.value;
          });
          const mergedShowYBarRef = vue.computed(() => {
            const {
              trigger: trigger2
            } = props;
            return trigger2 === "none" || isShowYBarRef.value;
          });
          const mergedContainerRef = vue.computed(() => {
            const {
              container
            } = props;
            if (container) return container();
            return containerRef.value;
          });
          const mergedContentRef = vue.computed(() => {
            const {
              content
            } = props;
            if (content) return content();
            return contentRef.value;
          });
          const scrollTo = (options, y) => {
            if (!props.scrollable) return;
            if (typeof options === "number") {
              scrollToPosition(options, y !== null && y !== void 0 ? y : 0, 0, false, "auto");
              return;
            }
            const {
              left,
              top,
              index,
              elSize,
              position,
              behavior,
              el,
              debounce = true
            } = options;
            if (left !== void 0 || top !== void 0) {
              scrollToPosition(left !== null && left !== void 0 ? left : 0, top !== null && top !== void 0 ? top : 0, 0, false, behavior);
            }
            if (el !== void 0) {
              scrollToPosition(0, el.offsetTop, el.offsetHeight, debounce, behavior);
            } else if (index !== void 0 && elSize !== void 0) {
              scrollToPosition(0, index * elSize, elSize, debounce, behavior);
            } else if (position === "bottom") {
              scrollToPosition(0, Number.MAX_SAFE_INTEGER, 0, false, behavior);
            } else if (position === "top") {
              scrollToPosition(0, 0, 0, false, behavior);
            }
          };
          const activateState = useReactivated(() => {
            if (!props.container) {
              scrollTo({
                top: containerScrollTopRef.value,
                left: containerScrollLeftRef.value
              });
            }
          });
          const handleContentResize = () => {
            if (activateState.isDeactivated) return;
            sync();
          };
          const handleContainerResize = (e) => {
            if (activateState.isDeactivated) return;
            const {
              onResize
            } = props;
            if (onResize) onResize(e);
            sync();
          };
          const scrollBy = (options, y) => {
            if (!props.scrollable) return;
            const {
              value: container
            } = mergedContainerRef;
            if (!container) return;
            if (typeof options === "object") {
              container.scrollBy(options);
            } else {
              container.scrollBy(options, y || 0);
            }
          };
          function scrollToPosition(left, top, elSize, debounce, behavior) {
            const {
              value: container
            } = mergedContainerRef;
            if (!container) return;
            if (debounce) {
              const {
                scrollTop,
                offsetHeight
              } = container;
              if (top > scrollTop) {
                if (top + elSize <= scrollTop + offsetHeight) ;
                else {
                  container.scrollTo({
                    left,
                    top: top + elSize - offsetHeight,
                    behavior
                  });
                }
                return;
              }
            }
            container.scrollTo({
              left,
              top,
              behavior
            });
          }
          function handleMouseEnterWrapper() {
            showXBar();
            showYBar();
            sync();
          }
          function handleMouseLeaveWrapper() {
            hideBar();
          }
          function hideBar() {
            hideYBar();
            hideXBar();
          }
          function hideYBar() {
            if (yBarVanishTimerId !== void 0) {
              window.clearTimeout(yBarVanishTimerId);
            }
            yBarVanishTimerId = window.setTimeout(() => {
              isShowYBarRef.value = false;
            }, props.duration);
          }
          function hideXBar() {
            if (xBarVanishTimerId !== void 0) {
              window.clearTimeout(xBarVanishTimerId);
            }
            xBarVanishTimerId = window.setTimeout(() => {
              isShowXBarRef.value = false;
            }, props.duration);
          }
          function showXBar() {
            if (xBarVanishTimerId !== void 0) {
              window.clearTimeout(xBarVanishTimerId);
            }
            isShowXBarRef.value = true;
          }
          function showYBar() {
            if (yBarVanishTimerId !== void 0) {
              window.clearTimeout(yBarVanishTimerId);
            }
            isShowYBarRef.value = true;
          }
          function handleScroll(e) {
            const {
              onScroll
            } = props;
            if (onScroll) onScroll(e);
            syncScrollState();
          }
          function syncScrollState() {
            const {
              value: container
            } = mergedContainerRef;
            if (container) {
              containerScrollTopRef.value = container.scrollTop;
              containerScrollLeftRef.value = container.scrollLeft * ((rtlEnabledRef === null || rtlEnabledRef === void 0 ? void 0 : rtlEnabledRef.value) ? -1 : 1);
            }
          }
          function syncPositionState() {
            const {
              value: content
            } = mergedContentRef;
            if (content) {
              contentHeightRef.value = content.offsetHeight;
              contentWidthRef.value = content.offsetWidth;
            }
            const {
              value: container
            } = mergedContainerRef;
            if (container) {
              containerHeightRef.value = container.offsetHeight;
              containerWidthRef.value = container.offsetWidth;
            }
            const {
              value: xRailEl
            } = xRailRef;
            const {
              value: yRailEl
            } = yRailRef;
            if (xRailEl) {
              xRailSizeRef.value = xRailEl.offsetWidth;
            }
            if (yRailEl) {
              yRailSizeRef.value = yRailEl.offsetHeight;
            }
          }
          function syncUnifiedContainer() {
            const {
              value: container
            } = mergedContainerRef;
            if (container) {
              containerScrollTopRef.value = container.scrollTop;
              containerScrollLeftRef.value = container.scrollLeft * ((rtlEnabledRef === null || rtlEnabledRef === void 0 ? void 0 : rtlEnabledRef.value) ? -1 : 1);
              containerHeightRef.value = container.offsetHeight;
              containerWidthRef.value = container.offsetWidth;
              contentHeightRef.value = container.scrollHeight;
              contentWidthRef.value = container.scrollWidth;
            }
            const {
              value: xRailEl
            } = xRailRef;
            const {
              value: yRailEl
            } = yRailRef;
            if (xRailEl) {
              xRailSizeRef.value = xRailEl.offsetWidth;
            }
            if (yRailEl) {
              yRailSizeRef.value = yRailEl.offsetHeight;
            }
          }
          function sync() {
            if (!props.scrollable) return;
            if (props.useUnifiedContainer) {
              syncUnifiedContainer();
            } else {
              syncPositionState();
              syncScrollState();
            }
          }
          function isMouseUpAway(e) {
            var _a;
            return !((_a = wrapperRef.value) === null || _a === void 0 ? void 0 : _a.contains(getPreciseEventTarget(e)));
          }
          function handleXScrollMouseDown(e) {
            e.preventDefault();
            e.stopPropagation();
            xBarPressed = true;
            on("mousemove", window, handleXScrollMouseMove, true);
            on("mouseup", window, handleXScrollMouseUp, true);
            memoXLeft = containerScrollLeftRef.value;
            memoMouseX = (rtlEnabledRef === null || rtlEnabledRef === void 0 ? void 0 : rtlEnabledRef.value) ? window.innerWidth - e.clientX : e.clientX;
          }
          function handleXScrollMouseMove(e) {
            if (!xBarPressed) return;
            if (xBarVanishTimerId !== void 0) {
              window.clearTimeout(xBarVanishTimerId);
            }
            if (yBarVanishTimerId !== void 0) {
              window.clearTimeout(yBarVanishTimerId);
            }
            const {
              value: containerWidth
            } = containerWidthRef;
            const {
              value: contentWidth
            } = contentWidthRef;
            const {
              value: xBarSize
            } = xBarSizeRef;
            if (containerWidth === null || contentWidth === null) return;
            const dX = (rtlEnabledRef === null || rtlEnabledRef === void 0 ? void 0 : rtlEnabledRef.value) ? window.innerWidth - e.clientX - memoMouseX : e.clientX - memoMouseX;
            const dScrollLeft = dX * (contentWidth - containerWidth) / (containerWidth - xBarSize);
            const toScrollLeftUpperBound = contentWidth - containerWidth;
            let toScrollLeft = memoXLeft + dScrollLeft;
            toScrollLeft = Math.min(toScrollLeftUpperBound, toScrollLeft);
            toScrollLeft = Math.max(toScrollLeft, 0);
            const {
              value: container
            } = mergedContainerRef;
            if (container) {
              container.scrollLeft = toScrollLeft * ((rtlEnabledRef === null || rtlEnabledRef === void 0 ? void 0 : rtlEnabledRef.value) ? -1 : 1);
              const {
                internalOnUpdateScrollLeft
              } = props;
              if (internalOnUpdateScrollLeft) internalOnUpdateScrollLeft(toScrollLeft);
            }
          }
          function handleXScrollMouseUp(e) {
            e.preventDefault();
            e.stopPropagation();
            off("mousemove", window, handleXScrollMouseMove, true);
            off("mouseup", window, handleXScrollMouseUp, true);
            xBarPressed = false;
            sync();
            if (isMouseUpAway(e)) {
              hideBar();
            }
          }
          function handleYScrollMouseDown(e) {
            e.preventDefault();
            e.stopPropagation();
            yBarPressed = true;
            on("mousemove", window, handleYScrollMouseMove, true);
            on("mouseup", window, handleYScrollMouseUp, true);
            memoYTop = containerScrollTopRef.value;
            memoMouseY = e.clientY;
          }
          function handleYScrollMouseMove(e) {
            if (!yBarPressed) return;
            if (xBarVanishTimerId !== void 0) {
              window.clearTimeout(xBarVanishTimerId);
            }
            if (yBarVanishTimerId !== void 0) {
              window.clearTimeout(yBarVanishTimerId);
            }
            const {
              value: containerHeight
            } = containerHeightRef;
            const {
              value: contentHeight
            } = contentHeightRef;
            const {
              value: yBarSize
            } = yBarSizeRef;
            if (containerHeight === null || contentHeight === null) return;
            const dY = e.clientY - memoMouseY;
            const dScrollTop = dY * (contentHeight - containerHeight) / (containerHeight - yBarSize);
            const toScrollTopUpperBound = contentHeight - containerHeight;
            let toScrollTop = memoYTop + dScrollTop;
            toScrollTop = Math.min(toScrollTopUpperBound, toScrollTop);
            toScrollTop = Math.max(toScrollTop, 0);
            const {
              value: container
            } = mergedContainerRef;
            if (container) {
              container.scrollTop = toScrollTop;
            }
          }
          function handleYScrollMouseUp(e) {
            e.preventDefault();
            e.stopPropagation();
            off("mousemove", window, handleYScrollMouseMove, true);
            off("mouseup", window, handleYScrollMouseUp, true);
            yBarPressed = false;
            sync();
            if (isMouseUpAway(e)) {
              hideBar();
            }
          }
          vue.watchEffect(() => {
            const {
              value: needXBar
            } = needXBarRef;
            const {
              value: needYBar
            } = needYBarRef;
            const {
              value: mergedClsPrefix
            } = mergedClsPrefixRef;
            const {
              value: xRailEl
            } = xRailRef;
            const {
              value: yRailEl
            } = yRailRef;
            if (xRailEl) {
              if (!needXBar) {
                xRailEl.classList.add(`${mergedClsPrefix}-scrollbar-rail--disabled`);
              } else {
                xRailEl.classList.remove(`${mergedClsPrefix}-scrollbar-rail--disabled`);
              }
            }
            if (yRailEl) {
              if (!needYBar) {
                yRailEl.classList.add(`${mergedClsPrefix}-scrollbar-rail--disabled`);
              } else {
                yRailEl.classList.remove(`${mergedClsPrefix}-scrollbar-rail--disabled`);
              }
            }
          });
          vue.onMounted(() => {
            if (props.container) return;
            sync();
          });
          vue.onBeforeUnmount(() => {
            if (xBarVanishTimerId !== void 0) {
              window.clearTimeout(xBarVanishTimerId);
            }
            if (yBarVanishTimerId !== void 0) {
              window.clearTimeout(yBarVanishTimerId);
            }
            off("mousemove", window, handleYScrollMouseMove, true);
            off("mouseup", window, handleYScrollMouseUp, true);
          });
          const cssVarsRef = vue.computed(() => {
            const {
              common: {
                cubicBezierEaseInOut: cubicBezierEaseInOut2
              },
              self: {
                color,
                colorHover,
                height,
                width,
                borderRadius,
                railInsetHorizontal,
                railInsetVertical,
                railColor
              }
            } = themeRef.value;
            return {
              "--n-scrollbar-bezier": cubicBezierEaseInOut2,
              "--n-scrollbar-color": color,
              "--n-scrollbar-color-hover": colorHover,
              "--n-scrollbar-border-radius": borderRadius,
              "--n-scrollbar-width": width,
              "--n-scrollbar-height": height,
              "--n-scrollbar-rail-inset-horizontal": railInsetHorizontal,
              "--n-scrollbar-rail-inset-vertical": (rtlEnabledRef === null || rtlEnabledRef === void 0 ? void 0 : rtlEnabledRef.value) ? rtlInset(railInsetVertical) : railInsetVertical,
              "--n-scrollbar-rail-color": railColor
            };
          });
          const themeClassHandle = inlineThemeDisabled ? useThemeClass("scrollbar", void 0, cssVarsRef, props) : void 0;
          const exposedMethods = {
            scrollTo,
            scrollBy,
            sync,
            syncUnifiedContainer,
            handleMouseEnterWrapper,
            handleMouseLeaveWrapper
          };
          return Object.assign(Object.assign({}, exposedMethods), {
            mergedClsPrefix: mergedClsPrefixRef,
            rtlEnabled: rtlEnabledRef,
            containerScrollTop: containerScrollTopRef,
            wrapperRef,
            containerRef,
            contentRef,
            yRailRef,
            xRailRef,
            needYBar: needYBarRef,
            needXBar: needXBarRef,
            yBarSizePx: yBarSizePxRef,
            xBarSizePx: xBarSizePxRef,
            yBarTopPx: yBarTopPxRef,
            xBarLeftPx: xBarLeftPxRef,
            isShowXBar: mergedShowXBarRef,
            isShowYBar: mergedShowYBarRef,
            isIos: isIos2,
            handleScroll,
            handleContentResize,
            handleContainerResize,
            handleYScrollMouseDown,
            handleXScrollMouseDown,
            cssVars: inlineThemeDisabled ? void 0 : cssVarsRef,
            themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
            onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
          });
        },
        render() {
          var _a;
          const {
            $slots,
            mergedClsPrefix,
            triggerDisplayManually,
            rtlEnabled,
            internalHoistYRail
          } = this;
          if (!this.scrollable) return (_a = $slots.default) === null || _a === void 0 ? void 0 : _a.call($slots);
          const triggerIsNone = this.trigger === "none";
          const createYRail = (className, style2) => {
            return vue.h("div", {
              ref: "yRailRef",
              class: [`${mergedClsPrefix}-scrollbar-rail`, `${mergedClsPrefix}-scrollbar-rail--vertical`, className],
              "data-scrollbar-rail": true,
              style: [style2 || "", this.verticalRailStyle],
              "aria-hidden": true
            }, vue.h(triggerIsNone ? Wrapper : vue.Transition, triggerIsNone ? null : {
              name: "fade-in-transition"
            }, {
              default: () => this.needYBar && this.isShowYBar && !this.isIos ? vue.h("div", {
                class: `${mergedClsPrefix}-scrollbar-rail__scrollbar`,
                style: {
                  height: this.yBarSizePx,
                  top: this.yBarTopPx
                },
                onMousedown: this.handleYScrollMouseDown
              }) : null
            }));
          };
          const createChildren = () => {
            var _a2, _b;
            (_a2 = this.onRender) === null || _a2 === void 0 ? void 0 : _a2.call(this);
            return vue.h("div", vue.mergeProps(this.$attrs, {
              role: "none",
              ref: "wrapperRef",
              class: [`${mergedClsPrefix}-scrollbar`, this.themeClass, rtlEnabled && `${mergedClsPrefix}-scrollbar--rtl`],
              style: this.cssVars,
              onMouseenter: triggerDisplayManually ? void 0 : this.handleMouseEnterWrapper,
              onMouseleave: triggerDisplayManually ? void 0 : this.handleMouseLeaveWrapper
            }), [this.container ? (_b = $slots.default) === null || _b === void 0 ? void 0 : _b.call($slots) : vue.h("div", {
              role: "none",
              ref: "containerRef",
              class: [`${mergedClsPrefix}-scrollbar-container`, this.containerClass],
              style: this.containerStyle,
              onScroll: this.handleScroll,
              onWheel: this.onWheel
            }, vue.h(VResizeObserver, {
              onResize: this.handleContentResize
            }, {
              default: () => vue.h("div", {
                ref: "contentRef",
                role: "none",
                style: [{
                  width: this.xScrollable ? "fit-content" : null
                }, this.contentStyle],
                class: [`${mergedClsPrefix}-scrollbar-content`, this.contentClass]
              }, $slots)
            })), internalHoistYRail ? null : createYRail(void 0, void 0), this.xScrollable && vue.h("div", {
              ref: "xRailRef",
              class: [`${mergedClsPrefix}-scrollbar-rail`, `${mergedClsPrefix}-scrollbar-rail--horizontal`],
              style: this.horizontalRailStyle,
              "data-scrollbar-rail": true,
              "aria-hidden": true
            }, vue.h(triggerIsNone ? Wrapper : vue.Transition, triggerIsNone ? null : {
              name: "fade-in-transition"
            }, {
              default: () => this.needXBar && this.isShowXBar && !this.isIos ? vue.h("div", {
                class: `${mergedClsPrefix}-scrollbar-rail__scrollbar`,
                style: {
                  width: this.xBarSizePx,
                  right: rtlEnabled ? this.xBarLeftPx : void 0,
                  left: rtlEnabled ? void 0 : this.xBarLeftPx
                },
                onMousedown: this.handleXScrollMouseDown
              }) : null
            }))]);
          };
          const scrollbarNode = this.container ? createChildren() : vue.h(VResizeObserver, {
            onResize: this.handleContainerResize
          }, {
            default: createChildren
          });
          if (internalHoistYRail) {
            return vue.h(vue.Fragment, null, scrollbarNode, createYRail(this.themeClass, this.cssVars));
          } else {
            return scrollbarNode;
          }
        }
      });
      const XScrollbar = Scrollbar;
      const commonVariables$l = {
        height: "calc(var(--n-option-height) * 7.6)",
        paddingSmall: "4px 0",
        paddingMedium: "4px 0",
        paddingLarge: "4px 0",
        paddingHuge: "4px 0",
        optionPaddingSmall: "0 12px",
        optionPaddingMedium: "0 12px",
        optionPaddingLarge: "0 12px",
        optionPaddingHuge: "0 12px",
        loadingSize: "18px"
      };
      function self$1g(vars) {
        const {
          borderRadius,
          popoverColor,
          textColor3,
          dividerColor,
          textColor2,
          primaryColorPressed,
          textColorDisabled,
          primaryColor,
          opacityDisabled,
          hoverColor,
          fontSizeSmall,
          fontSizeMedium,
          fontSizeLarge,
          fontSizeHuge,
          heightSmall,
          heightMedium,
          heightLarge,
          heightHuge
        } = vars;
        return Object.assign(Object.assign({}, commonVariables$l), {
          optionFontSizeSmall: fontSizeSmall,
          optionFontSizeMedium: fontSizeMedium,
          optionFontSizeLarge: fontSizeLarge,
          optionFontSizeHuge: fontSizeHuge,
          optionHeightSmall: heightSmall,
          optionHeightMedium: heightMedium,
          optionHeightLarge: heightLarge,
          optionHeightHuge: heightHuge,
          borderRadius,
          color: popoverColor,
          groupHeaderTextColor: textColor3,
          actionDividerColor: dividerColor,
          optionTextColor: textColor2,
          optionTextColorPressed: primaryColorPressed,
          optionTextColorDisabled: textColorDisabled,
          optionTextColorActive: primaryColor,
          optionOpacityDisabled: opacityDisabled,
          optionCheckColor: primaryColor,
          optionColorPending: hoverColor,
          optionColorActive: "rgba(0, 0, 0, 0)",
          optionColorActivePending: hoverColor,
          actionTextColor: textColor2,
          loadingColor: primaryColor
        });
      }
      const internalSelectMenuLight = createTheme({
        name: "InternalSelectMenu",
        common: derived,
        peers: {
          Scrollbar: scrollbarLight,
          Empty: emptyLight
        },
        self: self$1g
      });
      const internalSelectMenuDark = {
        name: "InternalSelectMenu",
        common: derived$1,
        peers: {
          Scrollbar: scrollbarDark,
          Empty: emptyDark
        },
        self: self$1g
      };
      function renderCheckMark(show, clsPrefix) {
        return vue.h(vue.Transition, {
          name: "fade-in-scale-up-transition"
        }, {
          default: () => show ? vue.h(NBaseIcon, {
            clsPrefix,
            class: `${clsPrefix}-base-select-option__check`
          }, {
            default: () => vue.h(FinishedIcon)
          }) : null
        });
      }
      const NSelectOption = vue.defineComponent({
        name: "NBaseSelectOption",
        props: {
          clsPrefix: {
            type: String,
            required: true
          },
          tmNode: {
            type: Object,
            required: true
          }
        },
        setup(props) {
          const {
            valueRef,
            pendingTmNodeRef,
            multipleRef,
            valueSetRef,
            renderLabelRef,
            renderOptionRef,
            labelFieldRef,
            valueFieldRef,
            showCheckmarkRef,
            nodePropsRef,
            handleOptionClick,
            handleOptionMouseEnter
          } = vue.inject(internalSelectionMenuInjectionKey);
          const isPendingRef = useMemo(() => {
            const {
              value: pendingTmNode
            } = pendingTmNodeRef;
            if (!pendingTmNode) return false;
            return props.tmNode.key === pendingTmNode.key;
          });
          function handleClick(e) {
            const {
              tmNode
            } = props;
            if (tmNode.disabled) return;
            handleOptionClick(e, tmNode);
          }
          function handleMouseEnter(e) {
            const {
              tmNode
            } = props;
            if (tmNode.disabled) return;
            handleOptionMouseEnter(e, tmNode);
          }
          function handleMouseMove(e) {
            const {
              tmNode
            } = props;
            const {
              value: isPending
            } = isPendingRef;
            if (tmNode.disabled || isPending) return;
            handleOptionMouseEnter(e, tmNode);
          }
          return {
            multiple: multipleRef,
            isGrouped: useMemo(() => {
              const {
                tmNode
              } = props;
              const {
                parent
              } = tmNode;
              return parent && parent.rawNode.type === "group";
            }),
            showCheckmark: showCheckmarkRef,
            nodeProps: nodePropsRef,
            isPending: isPendingRef,
            isSelected: useMemo(() => {
              const {
                value
              } = valueRef;
              const {
                value: multiple
              } = multipleRef;
              if (value === null) return false;
              const optionValue = props.tmNode.rawNode[valueFieldRef.value];
              if (multiple) {
                const {
                  value: valueSet
                } = valueSetRef;
                return valueSet.has(optionValue);
              } else {
                return value === optionValue;
              }
            }),
            labelField: labelFieldRef,
            renderLabel: renderLabelRef,
            renderOption: renderOptionRef,
            handleMouseMove,
            handleMouseEnter,
            handleClick
          };
        },
        render() {
          const {
            clsPrefix,
            tmNode: {
              rawNode
            },
            isSelected,
            isPending,
            isGrouped,
            showCheckmark,
            nodeProps,
            renderOption,
            renderLabel,
            handleClick,
            handleMouseEnter,
            handleMouseMove
          } = this;
          const checkmark = renderCheckMark(isSelected, clsPrefix);
          const children = renderLabel ? [renderLabel(rawNode, isSelected), showCheckmark && checkmark] : [render$1(rawNode[this.labelField], rawNode, isSelected), showCheckmark && checkmark];
          const attrs = nodeProps === null || nodeProps === void 0 ? void 0 : nodeProps(rawNode);
          const node = vue.h("div", Object.assign({}, attrs, {
            class: [`${clsPrefix}-base-select-option`, rawNode.class, attrs === null || attrs === void 0 ? void 0 : attrs.class, {
              [`${clsPrefix}-base-select-option--disabled`]: rawNode.disabled,
              [`${clsPrefix}-base-select-option--selected`]: isSelected,
              [`${clsPrefix}-base-select-option--grouped`]: isGrouped,
              [`${clsPrefix}-base-select-option--pending`]: isPending,
              [`${clsPrefix}-base-select-option--show-checkmark`]: showCheckmark
            }],
            style: [(attrs === null || attrs === void 0 ? void 0 : attrs.style) || "", rawNode.style || ""],
            onClick: mergeEventHandlers([handleClick, attrs === null || attrs === void 0 ? void 0 : attrs.onClick]),
            onMouseenter: mergeEventHandlers([handleMouseEnter, attrs === null || attrs === void 0 ? void 0 : attrs.onMouseenter]),
            onMousemove: mergeEventHandlers([handleMouseMove, attrs === null || attrs === void 0 ? void 0 : attrs.onMousemove])
          }), vue.h("div", {
            class: `${clsPrefix}-base-select-option__content`
          }, children));
          return rawNode.render ? rawNode.render({
            node,
            option: rawNode,
            selected: isSelected
          }) : renderOption ? renderOption({
            node,
            option: rawNode,
            selected: isSelected
          }) : node;
        }
      });
      const NSelectGroupHeader = vue.defineComponent({
        name: "NBaseSelectGroupHeader",
        props: {
          clsPrefix: {
            type: String,
            required: true
          },
          tmNode: {
            type: Object,
            required: true
          }
        },
        setup() {
          const {
            renderLabelRef,
            renderOptionRef,
            labelFieldRef,
            nodePropsRef
          } = vue.inject(internalSelectionMenuInjectionKey);
          return {
            labelField: labelFieldRef,
            nodeProps: nodePropsRef,
            renderLabel: renderLabelRef,
            renderOption: renderOptionRef
          };
        },
        render() {
          const {
            clsPrefix,
            renderLabel,
            renderOption,
            nodeProps,
            tmNode: {
              rawNode
            }
          } = this;
          const attrs = nodeProps === null || nodeProps === void 0 ? void 0 : nodeProps(rawNode);
          const children = renderLabel ? renderLabel(rawNode, false) : render$1(rawNode[this.labelField], rawNode, false);
          const node = vue.h("div", Object.assign({}, attrs, {
            class: [`${clsPrefix}-base-select-group-header`, attrs === null || attrs === void 0 ? void 0 : attrs.class]
          }), children);
          return rawNode.render ? rawNode.render({
            node,
            option: rawNode
          }) : renderOption ? renderOption({
            node,
            option: rawNode,
            selected: false
          }) : node;
        }
      });
      const {
        cubicBezierEaseIn: cubicBezierEaseIn$4,
        cubicBezierEaseOut: cubicBezierEaseOut$4
      } = commonVariables$m;
      function fadeInScaleUpTransition({
        transformOrigin = "inherit",
        duration: duration2 = ".2s",
        enterScale = ".9",
        originalTransform = "",
        originalTransition = ""
      } = {}) {
        return [c$1("&.fade-in-scale-up-transition-leave-active", {
          transformOrigin,
          transition: `opacity ${duration2} ${cubicBezierEaseIn$4}, transform ${duration2} ${cubicBezierEaseIn$4} ${originalTransition && `,${originalTransition}`}`
        }), c$1("&.fade-in-scale-up-transition-enter-active", {
          transformOrigin,
          transition: `opacity ${duration2} ${cubicBezierEaseOut$4}, transform ${duration2} ${cubicBezierEaseOut$4} ${originalTransition && `,${originalTransition}`}`
        }), c$1("&.fade-in-scale-up-transition-enter-from, &.fade-in-scale-up-transition-leave-to", {
          opacity: 0,
          transform: `${originalTransform} scale(${enterScale})`
        }), c$1("&.fade-in-scale-up-transition-leave-from, &.fade-in-scale-up-transition-enter-to", {
          opacity: 1,
          transform: `${originalTransform} scale(1)`
        })];
      }
      const style$h = cB("base-select-menu", `
 line-height: 1.5;
 outline: none;
 z-index: 0;
 position: relative;
 border-radius: var(--n-border-radius);
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 background-color: var(--n-color);
`, [cB("scrollbar", `
 max-height: var(--n-height);
 `), cB("virtual-list", `
 max-height: var(--n-height);
 `), cB("base-select-option", `
 min-height: var(--n-option-height);
 font-size: var(--n-option-font-size);
 display: flex;
 align-items: center;
 `, [cE("content", `
 z-index: 1;
 white-space: nowrap;
 text-overflow: ellipsis;
 overflow: hidden;
 `)]), cB("base-select-group-header", `
 min-height: var(--n-option-height);
 font-size: .93em;
 display: flex;
 align-items: center;
 `), cB("base-select-menu-option-wrapper", `
 position: relative;
 width: 100%;
 `), cE("loading, empty", `
 display: flex;
 padding: 12px 32px;
 flex: 1;
 justify-content: center;
 `), cE("loading", `
 color: var(--n-loading-color);
 font-size: var(--n-loading-size);
 `), cE("header", `
 padding: 8px var(--n-option-padding-left);
 font-size: var(--n-option-font-size);
 transition: 
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-action-divider-color);
 color: var(--n-action-text-color);
 `), cE("action", `
 padding: 8px var(--n-option-padding-left);
 font-size: var(--n-option-font-size);
 transition: 
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 border-top: 1px solid var(--n-action-divider-color);
 color: var(--n-action-text-color);
 `), cB("base-select-group-header", `
 position: relative;
 cursor: default;
 padding: var(--n-option-padding);
 color: var(--n-group-header-text-color);
 `), cB("base-select-option", `
 cursor: pointer;
 position: relative;
 padding: var(--n-option-padding);
 transition:
 color .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 box-sizing: border-box;
 color: var(--n-option-text-color);
 opacity: 1;
 `, [cM("show-checkmark", `
 padding-right: calc(var(--n-option-padding-right) + 20px);
 `), c$1("&::before", `
 content: "";
 position: absolute;
 left: 4px;
 right: 4px;
 top: 0;
 bottom: 0;
 border-radius: var(--n-border-radius);
 transition: background-color .3s var(--n-bezier);
 `), c$1("&:active", `
 color: var(--n-option-text-color-pressed);
 `), cM("grouped", `
 padding-left: calc(var(--n-option-padding-left) * 1.5);
 `), cM("pending", [c$1("&::before", `
 background-color: var(--n-option-color-pending);
 `)]), cM("selected", `
 color: var(--n-option-text-color-active);
 `, [c$1("&::before", `
 background-color: var(--n-option-color-active);
 `), cM("pending", [c$1("&::before", `
 background-color: var(--n-option-color-active-pending);
 `)])]), cM("disabled", `
 cursor: not-allowed;
 `, [cNotM("selected", `
 color: var(--n-option-text-color-disabled);
 `), cM("selected", `
 opacity: var(--n-option-opacity-disabled);
 `)]), cE("check", `
 font-size: 16px;
 position: absolute;
 right: calc(var(--n-option-padding-right) - 4px);
 top: calc(50% - 7px);
 color: var(--n-option-check-color);
 transition: color .3s var(--n-bezier);
 `, [fadeInScaleUpTransition({
        enterScale: "0.5"
      })])])]);
      const NInternalSelectMenu = vue.defineComponent({
        name: "InternalSelectMenu",
        props: Object.assign(Object.assign({}, useTheme.props), {
          clsPrefix: {
            type: String,
            required: true
          },
          scrollable: {
            type: Boolean,
            default: true
          },
          treeMate: {
            type: Object,
            required: true
          },
          multiple: Boolean,
          size: {
            type: String,
            default: "medium"
          },
          value: {
            type: [String, Number, Array],
            default: null
          },
          autoPending: Boolean,
          virtualScroll: {
            type: Boolean,
            default: true
          },
          // show is used to toggle pending state initialization
          show: {
            type: Boolean,
            default: true
          },
          labelField: {
            type: String,
            default: "label"
          },
          valueField: {
            type: String,
            default: "value"
          },
          loading: Boolean,
          focusable: Boolean,
          renderLabel: Function,
          renderOption: Function,
          nodeProps: Function,
          showCheckmark: {
            type: Boolean,
            default: true
          },
          onMousedown: Function,
          onScroll: Function,
          onFocus: Function,
          onBlur: Function,
          onKeyup: Function,
          onKeydown: Function,
          onTabOut: Function,
          onMouseenter: Function,
          onMouseleave: Function,
          onResize: Function,
          resetMenuOnOptionsChange: {
            type: Boolean,
            default: true
          },
          inlineThemeDisabled: Boolean,
          // deprecated
          onToggle: Function
        }),
        setup(props) {
          const {
            mergedClsPrefixRef,
            mergedRtlRef
          } = useConfig(props);
          const rtlEnabledRef = useRtl("InternalSelectMenu", mergedRtlRef, mergedClsPrefixRef);
          const themeRef = useTheme("InternalSelectMenu", "-internal-select-menu", style$h, internalSelectMenuLight, props, vue.toRef(props, "clsPrefix"));
          const selfRef = vue.ref(null);
          const virtualListRef = vue.ref(null);
          const scrollbarRef = vue.ref(null);
          const flattenedNodesRef = vue.computed(() => props.treeMate.getFlattenedNodes());
          const fIndexGetterRef = vue.computed(() => createIndexGetter(flattenedNodesRef.value));
          const pendingNodeRef = vue.ref(null);
          function initPendingNode() {
            const {
              treeMate
            } = props;
            let defaultPendingNode = null;
            const {
              value
            } = props;
            if (value === null) {
              defaultPendingNode = treeMate.getFirstAvailableNode();
            } else {
              if (props.multiple) {
                defaultPendingNode = treeMate.getNode((value || [])[(value || []).length - 1]);
              } else {
                defaultPendingNode = treeMate.getNode(value);
              }
              if (!defaultPendingNode || defaultPendingNode.disabled) {
                defaultPendingNode = treeMate.getFirstAvailableNode();
              }
            }
            if (defaultPendingNode) {
              setPendingTmNode(defaultPendingNode);
            } else {
              setPendingTmNode(null);
            }
          }
          function clearPendingNodeIfInvalid() {
            const {
              value: pendingNode
            } = pendingNodeRef;
            if (pendingNode && !props.treeMate.getNode(pendingNode.key)) {
              pendingNodeRef.value = null;
            }
          }
          let initPendingNodeWatchStopHandle;
          vue.watch(() => props.show, (show) => {
            if (show) {
              initPendingNodeWatchStopHandle = vue.watch(() => props.treeMate, () => {
                if (props.resetMenuOnOptionsChange) {
                  if (props.autoPending) {
                    initPendingNode();
                  } else {
                    clearPendingNodeIfInvalid();
                  }
                  void vue.nextTick(scrollToPendingNode);
                } else {
                  clearPendingNodeIfInvalid();
                }
              }, {
                immediate: true
              });
            } else {
              initPendingNodeWatchStopHandle === null || initPendingNodeWatchStopHandle === void 0 ? void 0 : initPendingNodeWatchStopHandle();
            }
          }, {
            immediate: true
          });
          vue.onBeforeUnmount(() => {
            initPendingNodeWatchStopHandle === null || initPendingNodeWatchStopHandle === void 0 ? void 0 : initPendingNodeWatchStopHandle();
          });
          const itemSizeRef = vue.computed(() => {
            return depx(themeRef.value.self[createKey("optionHeight", props.size)]);
          });
          const paddingRef = vue.computed(() => {
            return getMargin(themeRef.value.self[createKey("padding", props.size)]);
          });
          const valueSetRef = vue.computed(() => {
            if (props.multiple && Array.isArray(props.value)) {
              return new Set(props.value);
            }
            return /* @__PURE__ */ new Set();
          });
          const emptyRef = vue.computed(() => {
            const tmNodes = flattenedNodesRef.value;
            return tmNodes && tmNodes.length === 0;
          });
          function doToggle(tmNode) {
            const {
              onToggle
            } = props;
            if (onToggle) onToggle(tmNode);
          }
          function doScroll(e) {
            const {
              onScroll
            } = props;
            if (onScroll) onScroll(e);
          }
          function handleVirtualListScroll(e) {
            var _a;
            (_a = scrollbarRef.value) === null || _a === void 0 ? void 0 : _a.sync();
            doScroll(e);
          }
          function handleVirtualListResize() {
            var _a;
            (_a = scrollbarRef.value) === null || _a === void 0 ? void 0 : _a.sync();
          }
          function getPendingTmNode() {
            const {
              value: pendingTmNode
            } = pendingNodeRef;
            if (pendingTmNode) return pendingTmNode;
            return null;
          }
          function handleOptionMouseEnter(e, tmNode) {
            if (tmNode.disabled) return;
            setPendingTmNode(tmNode, false);
          }
          function handleOptionClick(e, tmNode) {
            if (tmNode.disabled) return;
            doToggle(tmNode);
          }
          function handleKeyUp(e) {
            var _a;
            if (happensIn(e, "action")) return;
            (_a = props.onKeyup) === null || _a === void 0 ? void 0 : _a.call(props, e);
          }
          function handleKeyDown(e) {
            var _a;
            if (happensIn(e, "action")) return;
            (_a = props.onKeydown) === null || _a === void 0 ? void 0 : _a.call(props, e);
          }
          function handleMouseDown(e) {
            var _a;
            (_a = props.onMousedown) === null || _a === void 0 ? void 0 : _a.call(props, e);
            if (props.focusable) return;
            e.preventDefault();
          }
          function next() {
            const {
              value: pendingTmNode
            } = pendingNodeRef;
            if (pendingTmNode) {
              setPendingTmNode(pendingTmNode.getNext({
                loop: true
              }), true);
            }
          }
          function prev() {
            const {
              value: pendingTmNode
            } = pendingNodeRef;
            if (pendingTmNode) {
              setPendingTmNode(pendingTmNode.getPrev({
                loop: true
              }), true);
            }
          }
          function setPendingTmNode(tmNode, doScroll2 = false) {
            pendingNodeRef.value = tmNode;
            if (doScroll2) scrollToPendingNode();
          }
          function scrollToPendingNode() {
            var _a, _b;
            const tmNode = pendingNodeRef.value;
            if (!tmNode) return;
            const fIndex = fIndexGetterRef.value(tmNode.key);
            if (fIndex === null) return;
            if (props.virtualScroll) {
              (_a = virtualListRef.value) === null || _a === void 0 ? void 0 : _a.scrollTo({
                index: fIndex
              });
            } else {
              (_b = scrollbarRef.value) === null || _b === void 0 ? void 0 : _b.scrollTo({
                index: fIndex,
                elSize: itemSizeRef.value
              });
            }
          }
          function handleFocusin(e) {
            var _a, _b;
            if ((_a = selfRef.value) === null || _a === void 0 ? void 0 : _a.contains(e.target)) {
              (_b = props.onFocus) === null || _b === void 0 ? void 0 : _b.call(props, e);
            }
          }
          function handleFocusout(e) {
            var _a, _b;
            if (!((_a = selfRef.value) === null || _a === void 0 ? void 0 : _a.contains(e.relatedTarget))) {
              (_b = props.onBlur) === null || _b === void 0 ? void 0 : _b.call(props, e);
            }
          }
          vue.provide(internalSelectionMenuInjectionKey, {
            handleOptionMouseEnter,
            handleOptionClick,
            valueSetRef,
            pendingTmNodeRef: pendingNodeRef,
            nodePropsRef: vue.toRef(props, "nodeProps"),
            showCheckmarkRef: vue.toRef(props, "showCheckmark"),
            multipleRef: vue.toRef(props, "multiple"),
            valueRef: vue.toRef(props, "value"),
            renderLabelRef: vue.toRef(props, "renderLabel"),
            renderOptionRef: vue.toRef(props, "renderOption"),
            labelFieldRef: vue.toRef(props, "labelField"),
            valueFieldRef: vue.toRef(props, "valueField")
          });
          vue.provide(internalSelectionMenuBodyInjectionKey, selfRef);
          vue.onMounted(() => {
            const {
              value
            } = scrollbarRef;
            if (value) value.sync();
          });
          const cssVarsRef = vue.computed(() => {
            const {
              size: size2
            } = props;
            const {
              common: {
                cubicBezierEaseInOut: cubicBezierEaseInOut2
              },
              self: {
                height,
                borderRadius,
                color,
                groupHeaderTextColor,
                actionDividerColor,
                optionTextColorPressed,
                optionTextColor,
                optionTextColorDisabled,
                optionTextColorActive,
                optionOpacityDisabled,
                optionCheckColor,
                actionTextColor,
                optionColorPending,
                optionColorActive,
                loadingColor,
                loadingSize,
                optionColorActivePending,
                [createKey("optionFontSize", size2)]: fontSize2,
                [createKey("optionHeight", size2)]: optionHeight,
                [createKey("optionPadding", size2)]: optionPadding
              }
            } = themeRef.value;
            return {
              "--n-height": height,
              "--n-action-divider-color": actionDividerColor,
              "--n-action-text-color": actionTextColor,
              "--n-bezier": cubicBezierEaseInOut2,
              "--n-border-radius": borderRadius,
              "--n-color": color,
              "--n-option-font-size": fontSize2,
              "--n-group-header-text-color": groupHeaderTextColor,
              "--n-option-check-color": optionCheckColor,
              "--n-option-color-pending": optionColorPending,
              "--n-option-color-active": optionColorActive,
              "--n-option-color-active-pending": optionColorActivePending,
              "--n-option-height": optionHeight,
              "--n-option-opacity-disabled": optionOpacityDisabled,
              "--n-option-text-color": optionTextColor,
              "--n-option-text-color-active": optionTextColorActive,
              "--n-option-text-color-disabled": optionTextColorDisabled,
              "--n-option-text-color-pressed": optionTextColorPressed,
              "--n-option-padding": optionPadding,
              "--n-option-padding-left": getMargin(optionPadding, "left"),
              "--n-option-padding-right": getMargin(optionPadding, "right"),
              "--n-loading-color": loadingColor,
              "--n-loading-size": loadingSize
            };
          });
          const {
            inlineThemeDisabled
          } = props;
          const themeClassHandle = inlineThemeDisabled ? useThemeClass("internal-select-menu", vue.computed(() => props.size[0]), cssVarsRef, props) : void 0;
          const exposedProps = {
            selfRef,
            next,
            prev,
            getPendingTmNode
          };
          useOnResize(selfRef, props.onResize);
          return Object.assign({
            mergedTheme: themeRef,
            mergedClsPrefix: mergedClsPrefixRef,
            rtlEnabled: rtlEnabledRef,
            virtualListRef,
            scrollbarRef,
            itemSize: itemSizeRef,
            padding: paddingRef,
            flattenedNodes: flattenedNodesRef,
            empty: emptyRef,
            virtualListContainer() {
              const {
                value
              } = virtualListRef;
              return value === null || value === void 0 ? void 0 : value.listElRef;
            },
            virtualListContent() {
              const {
                value
              } = virtualListRef;
              return value === null || value === void 0 ? void 0 : value.itemsElRef;
            },
            doScroll,
            handleFocusin,
            handleFocusout,
            handleKeyUp,
            handleKeyDown,
            handleMouseDown,
            handleVirtualListResize,
            handleVirtualListScroll,
            cssVars: inlineThemeDisabled ? void 0 : cssVarsRef,
            themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
            onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
          }, exposedProps);
        },
        render() {
          const {
            $slots,
            virtualScroll,
            clsPrefix,
            mergedTheme,
            themeClass,
            onRender
          } = this;
          onRender === null || onRender === void 0 ? void 0 : onRender();
          return vue.h("div", {
            ref: "selfRef",
            tabindex: this.focusable ? 0 : -1,
            class: [`${clsPrefix}-base-select-menu`, this.rtlEnabled && `${clsPrefix}-base-select-menu--rtl`, themeClass, this.multiple && `${clsPrefix}-base-select-menu--multiple`],
            style: this.cssVars,
            onFocusin: this.handleFocusin,
            onFocusout: this.handleFocusout,
            onKeyup: this.handleKeyUp,
            onKeydown: this.handleKeyDown,
            onMousedown: this.handleMouseDown,
            onMouseenter: this.onMouseenter,
            onMouseleave: this.onMouseleave
          }, resolveWrappedSlot($slots.header, (children) => children && vue.h("div", {
            class: `${clsPrefix}-base-select-menu__header`,
            "data-header": true,
            key: "header"
          }, children)), this.loading ? vue.h("div", {
            class: `${clsPrefix}-base-select-menu__loading`
          }, vue.h(NBaseLoading, {
            clsPrefix,
            strokeWidth: 20
          })) : !this.empty ? vue.h(Scrollbar, {
            ref: "scrollbarRef",
            theme: mergedTheme.peers.Scrollbar,
            themeOverrides: mergedTheme.peerOverrides.Scrollbar,
            scrollable: this.scrollable,
            container: virtualScroll ? this.virtualListContainer : void 0,
            content: virtualScroll ? this.virtualListContent : void 0,
            onScroll: virtualScroll ? void 0 : this.doScroll
          }, {
            default: () => {
              return virtualScroll ? vue.h(VVirtualList, {
                ref: "virtualListRef",
                class: `${clsPrefix}-virtual-list`,
                items: this.flattenedNodes,
                itemSize: this.itemSize,
                showScrollbar: false,
                paddingTop: this.padding.top,
                paddingBottom: this.padding.bottom,
                onResize: this.handleVirtualListResize,
                onScroll: this.handleVirtualListScroll,
                itemResizable: true
              }, {
                default: ({
                  item: tmNode
                }) => {
                  return tmNode.isGroup ? vue.h(NSelectGroupHeader, {
                    key: tmNode.key,
                    clsPrefix,
                    tmNode
                  }) : tmNode.ignored ? null : vue.h(NSelectOption, {
                    clsPrefix,
                    key: tmNode.key,
                    tmNode
                  });
                }
              }) : vue.h("div", {
                class: `${clsPrefix}-base-select-menu-option-wrapper`,
                style: {
                  paddingTop: this.padding.top,
                  paddingBottom: this.padding.bottom
                }
              }, this.flattenedNodes.map((tmNode) => tmNode.isGroup ? vue.h(NSelectGroupHeader, {
                key: tmNode.key,
                clsPrefix,
                tmNode
              }) : vue.h(NSelectOption, {
                clsPrefix,
                key: tmNode.key,
                tmNode
              })));
            }
          }) : vue.h("div", {
            class: `${clsPrefix}-base-select-menu__empty`,
            "data-empty": true
          }, resolveSlot($slots.empty, () => [vue.h(NEmpty, {
            theme: mergedTheme.peers.Empty,
            themeOverrides: mergedTheme.peerOverrides.Empty
          })])), resolveWrappedSlot($slots.action, (children) => children && [vue.h("div", {
            class: `${clsPrefix}-base-select-menu__action`,
            "data-action": true,
            key: "action"
          }, children), vue.h(FocusDetector, {
            onFocus: this.onTabOut,
            key: "focus-detector"
          })]));
        }
      });
      const style$g = cB("base-wave", `
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
`);
      const NBaseWave = vue.defineComponent({
        name: "BaseWave",
        props: {
          clsPrefix: {
            type: String,
            required: true
          }
        },
        setup(props) {
          useStyle("-base-wave", style$g, vue.toRef(props, "clsPrefix"));
          const selfRef = vue.ref(null);
          const activeRef = vue.ref(false);
          let animationTimerId = null;
          vue.onBeforeUnmount(() => {
            if (animationTimerId !== null) {
              window.clearTimeout(animationTimerId);
            }
          });
          return {
            active: activeRef,
            selfRef,
            play() {
              if (animationTimerId !== null) {
                window.clearTimeout(animationTimerId);
                activeRef.value = false;
                animationTimerId = null;
              }
              void vue.nextTick(() => {
                var _a;
                void ((_a = selfRef.value) === null || _a === void 0 ? void 0 : _a.offsetHeight);
                activeRef.value = true;
                animationTimerId = window.setTimeout(() => {
                  activeRef.value = false;
                  animationTimerId = null;
                }, 1e3);
              });
            }
          };
        },
        render() {
          const {
            clsPrefix
          } = this;
          return vue.h("div", {
            ref: "selfRef",
            "aria-hidden": true,
            class: [`${clsPrefix}-base-wave`, this.active && `${clsPrefix}-base-wave--active`]
          });
        }
      });
      const commonVariables$k = {
        space: "6px",
        spaceArrow: "10px",
        arrowOffset: "10px",
        arrowOffsetVertical: "10px",
        arrowHeight: "6px",
        padding: "8px 14px"
      };
      function self$1f(vars) {
        const {
          boxShadow2,
          popoverColor,
          textColor2,
          borderRadius,
          fontSize: fontSize2,
          dividerColor
        } = vars;
        return Object.assign(Object.assign({}, commonVariables$k), {
          fontSize: fontSize2,
          borderRadius,
          color: popoverColor,
          dividerColor,
          textColor: textColor2,
          boxShadow: boxShadow2
        });
      }
      const popoverLight = {
        name: "Popover",
        common: derived,
        self: self$1f
      };
      const popoverDark = {
        name: "Popover",
        common: derived$1,
        self: self$1f
      };
      const oppositePlacement = {
        top: "bottom",
        bottom: "top",
        left: "right",
        right: "left"
      };
      const arrowSize = "var(--n-arrow-height) * 1.414";
      const style$f = c$1([cB("popover", `
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 position: relative;
 font-size: var(--n-font-size);
 color: var(--n-text-color);
 box-shadow: var(--n-box-shadow);
 word-break: break-word;
 `, [c$1(">", [cB("scrollbar", `
 height: inherit;
 max-height: inherit;
 `)]), cNotM("raw", `
 background-color: var(--n-color);
 border-radius: var(--n-border-radius);
 `, [cNotM("scrollable", [cNotM("show-header-or-footer", "padding: var(--n-padding);")])]), cE("header", `
 padding: var(--n-padding);
 border-bottom: 1px solid var(--n-divider-color);
 transition: border-color .3s var(--n-bezier);
 `), cE("footer", `
 padding: var(--n-padding);
 border-top: 1px solid var(--n-divider-color);
 transition: border-color .3s var(--n-bezier);
 `), cM("scrollable, show-header-or-footer", [cE("content", `
 padding: var(--n-padding);
 `)])]), cB("popover-shared", `
 transform-origin: inherit;
 `, [
        cB("popover-arrow-wrapper", `
 position: absolute;
 overflow: hidden;
 pointer-events: none;
 `, [cB("popover-arrow", `
 transition: background-color .3s var(--n-bezier);
 position: absolute;
 display: block;
 width: calc(${arrowSize});
 height: calc(${arrowSize});
 box-shadow: 0 0 8px 0 rgba(0, 0, 0, .12);
 transform: rotate(45deg);
 background-color: var(--n-color);
 pointer-events: all;
 `)]),
        // body transition
        c$1("&.popover-transition-enter-from, &.popover-transition-leave-to", `
 opacity: 0;
 transform: scale(.85);
 `),
        c$1("&.popover-transition-enter-to, &.popover-transition-leave-from", `
 transform: scale(1);
 opacity: 1;
 `),
        c$1("&.popover-transition-enter-active", `
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 opacity .15s var(--n-bezier-ease-out),
 transform .15s var(--n-bezier-ease-out);
 `),
        c$1("&.popover-transition-leave-active", `
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 opacity .15s var(--n-bezier-ease-in),
 transform .15s var(--n-bezier-ease-in);
 `)
      ]), placementStyle("top-start", `
 top: calc(${arrowSize} / -2);
 left: calc(${getArrowOffset("top-start")} - var(--v-offset-left));
 `), placementStyle("top", `
 top: calc(${arrowSize} / -2);
 transform: translateX(calc(${arrowSize} / -2)) rotate(45deg);
 left: 50%;
 `), placementStyle("top-end", `
 top: calc(${arrowSize} / -2);
 right: calc(${getArrowOffset("top-end")} + var(--v-offset-left));
 `), placementStyle("bottom-start", `
 bottom: calc(${arrowSize} / -2);
 left: calc(${getArrowOffset("bottom-start")} - var(--v-offset-left));
 `), placementStyle("bottom", `
 bottom: calc(${arrowSize} / -2);
 transform: translateX(calc(${arrowSize} / -2)) rotate(45deg);
 left: 50%;
 `), placementStyle("bottom-end", `
 bottom: calc(${arrowSize} / -2);
 right: calc(${getArrowOffset("bottom-end")} + var(--v-offset-left));
 `), placementStyle("left-start", `
 left: calc(${arrowSize} / -2);
 top: calc(${getArrowOffset("left-start")} - var(--v-offset-top));
 `), placementStyle("left", `
 left: calc(${arrowSize} / -2);
 transform: translateY(calc(${arrowSize} / -2)) rotate(45deg);
 top: 50%;
 `), placementStyle("left-end", `
 left: calc(${arrowSize} / -2);
 bottom: calc(${getArrowOffset("left-end")} + var(--v-offset-top));
 `), placementStyle("right-start", `
 right: calc(${arrowSize} / -2);
 top: calc(${getArrowOffset("right-start")} - var(--v-offset-top));
 `), placementStyle("right", `
 right: calc(${arrowSize} / -2);
 transform: translateY(calc(${arrowSize} / -2)) rotate(45deg);
 top: 50%;
 `), placementStyle("right-end", `
 right: calc(${arrowSize} / -2);
 bottom: calc(${getArrowOffset("right-end")} + var(--v-offset-top));
 `), ...map({
        top: ["right-start", "left-start"],
        right: ["top-end", "bottom-end"],
        bottom: ["right-end", "left-end"],
        left: ["top-start", "bottom-start"]
      }, (placements, direction) => {
        const isVertical = ["right", "left"].includes(direction);
        const sizeType = isVertical ? "width" : "height";
        return placements.map((placement) => {
          const isReverse = placement.split("-")[1] === "end";
          const targetSize = `var(--v-target-${sizeType}, 0px)`;
          const centerOffset = `calc((${targetSize} - ${arrowSize}) / 2)`;
          const offset = getArrowOffset(placement);
          return c$1(`[v-placement="${placement}"] >`, [cB("popover-shared", [cM("center-arrow", [cB("popover-arrow", `${direction}: calc(max(${centerOffset}, ${offset}) ${isReverse ? "+" : "-"} var(--v-offset-${isVertical ? "left" : "top"}));`)])])]);
        });
      })]);
      function getArrowOffset(placement) {
        return ["top", "bottom"].includes(placement.split("-")[0]) ? "var(--n-arrow-offset)" : "var(--n-arrow-offset-vertical)";
      }
      function placementStyle(placement, arrowStyleLiteral) {
        const position = placement.split("-")[0];
        const sizeStyle = ["top", "bottom"].includes(position) ? "height: var(--n-space-arrow);" : "width: var(--n-space-arrow);";
        return c$1(`[v-placement="${placement}"] >`, [cB("popover-shared", `
 margin-${oppositePlacement[position]}: var(--n-space);
 `, [cM("show-arrow", `
 margin-${oppositePlacement[position]}: var(--n-space-arrow);
 `), cM("overlap", `
 margin: 0;
 `), cCB("popover-arrow-wrapper", `
 right: 0;
 left: 0;
 top: 0;
 bottom: 0;
 ${position}: 100%;
 ${oppositePlacement[position]}: auto;
 ${sizeStyle}
 `, [cB("popover-arrow", arrowStyleLiteral)])])]);
      }
      const popoverBodyProps = Object.assign(Object.assign({}, useTheme.props), {
        to: useAdjustedTo.propTo,
        show: Boolean,
        trigger: String,
        showArrow: Boolean,
        delay: Number,
        duration: Number,
        raw: Boolean,
        arrowPointToCenter: Boolean,
        arrowClass: String,
        arrowStyle: [String, Object],
        arrowWrapperClass: String,
        arrowWrapperStyle: [String, Object],
        displayDirective: String,
        x: Number,
        y: Number,
        flip: Boolean,
        overlap: Boolean,
        placement: String,
        width: [Number, String],
        keepAliveOnHover: Boolean,
        scrollable: Boolean,
        contentClass: String,
        contentStyle: [Object, String],
        headerClass: String,
        headerStyle: [Object, String],
        footerClass: String,
        footerStyle: [Object, String],
        // private
        internalDeactivateImmediately: Boolean,
        animated: Boolean,
        onClickoutside: Function,
        internalTrapFocus: Boolean,
        internalOnAfterLeave: Function,
        // deprecated
        minWidth: Number,
        maxWidth: Number
      });
      function renderArrow({
        arrowClass,
        arrowStyle,
        arrowWrapperClass,
        arrowWrapperStyle,
        clsPrefix
      }) {
        return vue.h("div", {
          key: "__popover-arrow__",
          style: arrowWrapperStyle,
          class: [`${clsPrefix}-popover-arrow-wrapper`, arrowWrapperClass]
        }, vue.h("div", {
          class: [`${clsPrefix}-popover-arrow`, arrowClass],
          style: arrowStyle
        }));
      }
      const NPopoverBody = vue.defineComponent({
        name: "PopoverBody",
        inheritAttrs: false,
        props: popoverBodyProps,
        setup(props, {
          slots,
          attrs
        }) {
          const {
            namespaceRef,
            mergedClsPrefixRef,
            inlineThemeDisabled
          } = useConfig(props);
          const themeRef = useTheme("Popover", "-popover", style$f, popoverLight, props, mergedClsPrefixRef);
          const followerRef = vue.ref(null);
          const NPopover2 = vue.inject("NPopover");
          const bodyRef = vue.ref(null);
          const followerEnabledRef = vue.ref(props.show);
          const displayedRef = vue.ref(false);
          vue.watchEffect(() => {
            const {
              show
            } = props;
            if (show && !isJsdom() && !props.internalDeactivateImmediately) {
              displayedRef.value = true;
            }
          });
          const directivesRef = vue.computed(() => {
            const {
              trigger: trigger2,
              onClickoutside
            } = props;
            const directives = [];
            const {
              positionManuallyRef: {
                value: positionManually
              }
            } = NPopover2;
            if (!positionManually) {
              if (trigger2 === "click" && !onClickoutside) {
                directives.push([clickoutside, handleClickOutside, void 0, {
                  capture: true
                }]);
              }
              if (trigger2 === "hover") {
                directives.push([mousemoveoutside, handleMouseMoveOutside]);
              }
            }
            if (onClickoutside) {
              directives.push([clickoutside, handleClickOutside, void 0, {
                capture: true
              }]);
            }
            if (props.displayDirective === "show" || props.animated && displayedRef.value) {
              directives.push([vue.vShow, props.show]);
            }
            return directives;
          });
          const cssVarsRef = vue.computed(() => {
            const {
              common: {
                cubicBezierEaseInOut: cubicBezierEaseInOut2,
                cubicBezierEaseIn: cubicBezierEaseIn2,
                cubicBezierEaseOut: cubicBezierEaseOut2
              },
              self: {
                space,
                spaceArrow,
                padding,
                fontSize: fontSize2,
                textColor,
                dividerColor,
                color,
                boxShadow,
                borderRadius,
                arrowHeight,
                arrowOffset,
                arrowOffsetVertical
              }
            } = themeRef.value;
            return {
              "--n-box-shadow": boxShadow,
              "--n-bezier": cubicBezierEaseInOut2,
              "--n-bezier-ease-in": cubicBezierEaseIn2,
              "--n-bezier-ease-out": cubicBezierEaseOut2,
              "--n-font-size": fontSize2,
              "--n-text-color": textColor,
              "--n-color": color,
              "--n-divider-color": dividerColor,
              "--n-border-radius": borderRadius,
              "--n-arrow-height": arrowHeight,
              "--n-arrow-offset": arrowOffset,
              "--n-arrow-offset-vertical": arrowOffsetVertical,
              "--n-padding": padding,
              "--n-space": space,
              "--n-space-arrow": spaceArrow
            };
          });
          const styleRef = vue.computed(() => {
            const width = props.width === "trigger" ? void 0 : formatLength(props.width);
            const style2 = [];
            if (width) {
              style2.push({
                width
              });
            }
            const {
              maxWidth,
              minWidth
            } = props;
            if (maxWidth) {
              style2.push({
                maxWidth: formatLength(maxWidth)
              });
            }
            if (minWidth) {
              style2.push({
                maxWidth: formatLength(minWidth)
              });
            }
            if (!inlineThemeDisabled) {
              style2.push(cssVarsRef.value);
            }
            return style2;
          });
          const themeClassHandle = inlineThemeDisabled ? useThemeClass("popover", void 0, cssVarsRef, props) : void 0;
          NPopover2.setBodyInstance({
            syncPosition
          });
          vue.onBeforeUnmount(() => {
            NPopover2.setBodyInstance(null);
          });
          vue.watch(vue.toRef(props, "show"), (value) => {
            if (props.animated) return;
            if (value) {
              followerEnabledRef.value = true;
            } else {
              followerEnabledRef.value = false;
            }
          });
          function syncPosition() {
            var _a;
            (_a = followerRef.value) === null || _a === void 0 ? void 0 : _a.syncPosition();
          }
          function handleMouseEnter(e) {
            if (props.trigger === "hover" && props.keepAliveOnHover && props.show) {
              NPopover2.handleMouseEnter(e);
            }
          }
          function handleMouseLeave(e) {
            if (props.trigger === "hover" && props.keepAliveOnHover) {
              NPopover2.handleMouseLeave(e);
            }
          }
          function handleMouseMoveOutside(e) {
            if (props.trigger === "hover" && !getTriggerElement().contains(getPreciseEventTarget(e))) {
              NPopover2.handleMouseMoveOutside(e);
            }
          }
          function handleClickOutside(e) {
            if (props.trigger === "click" && !getTriggerElement().contains(getPreciseEventTarget(e)) || props.onClickoutside) {
              NPopover2.handleClickOutside(e);
            }
          }
          function getTriggerElement() {
            return NPopover2.getTriggerElement();
          }
          vue.provide(popoverBodyInjectionKey, bodyRef);
          vue.provide(drawerBodyInjectionKey, null);
          vue.provide(modalBodyInjectionKey, null);
          function renderContentNode() {
            themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender();
            const shouldRenderDom = props.displayDirective === "show" || props.show || props.animated && displayedRef.value;
            if (!shouldRenderDom) {
              return null;
            }
            let contentNode;
            const renderBody = NPopover2.internalRenderBodyRef.value;
            const {
              value: mergedClsPrefix
            } = mergedClsPrefixRef;
            if (!renderBody) {
              const {
                value: extraClass
              } = NPopover2.extraClassRef;
              const {
                internalTrapFocus
              } = props;
              const hasHeaderOrFooter = !isSlotEmpty(slots.header) || !isSlotEmpty(slots.footer);
              const renderContentInnerNode = () => {
                var _a, _b;
                const body = hasHeaderOrFooter ? vue.h(vue.Fragment, null, resolveWrappedSlot(slots.header, (children) => {
                  return children ? vue.h("div", {
                    class: [`${mergedClsPrefix}-popover__header`, props.headerClass],
                    style: props.headerStyle
                  }, children) : null;
                }), resolveWrappedSlot(slots.default, (children) => {
                  return children ? vue.h("div", {
                    class: [`${mergedClsPrefix}-popover__content`, props.contentClass],
                    style: props.contentStyle
                  }, slots) : null;
                }), resolveWrappedSlot(slots.footer, (children) => {
                  return children ? vue.h("div", {
                    class: [`${mergedClsPrefix}-popover__footer`, props.footerClass],
                    style: props.footerStyle
                  }, children) : null;
                })) : props.scrollable ? (_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots) : vue.h("div", {
                  class: [`${mergedClsPrefix}-popover__content`, props.contentClass],
                  style: props.contentStyle
                }, slots);
                const maybeScrollableBody = props.scrollable ? vue.h(XScrollbar, {
                  contentClass: hasHeaderOrFooter ? void 0 : `${mergedClsPrefix}-popover__content ${(_b = props.contentClass) !== null && _b !== void 0 ? _b : ""}`,
                  contentStyle: hasHeaderOrFooter ? void 0 : props.contentStyle
                }, {
                  default: () => body
                }) : body;
                const arrow = props.showArrow ? renderArrow({
                  arrowClass: props.arrowClass,
                  arrowStyle: props.arrowStyle,
                  arrowWrapperClass: props.arrowWrapperClass,
                  arrowWrapperStyle: props.arrowWrapperStyle,
                  clsPrefix: mergedClsPrefix
                }) : null;
                return [maybeScrollableBody, arrow];
              };
              contentNode = vue.h("div", vue.mergeProps({
                class: [`${mergedClsPrefix}-popover`, `${mergedClsPrefix}-popover-shared`, themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass.value, extraClass.map((v) => `${mergedClsPrefix}-${v}`), {
                  [`${mergedClsPrefix}-popover--scrollable`]: props.scrollable,
                  [`${mergedClsPrefix}-popover--show-header-or-footer`]: hasHeaderOrFooter,
                  [`${mergedClsPrefix}-popover--raw`]: props.raw,
                  [`${mergedClsPrefix}-popover-shared--overlap`]: props.overlap,
                  [`${mergedClsPrefix}-popover-shared--show-arrow`]: props.showArrow,
                  [`${mergedClsPrefix}-popover-shared--center-arrow`]: props.arrowPointToCenter
                }],
                ref: bodyRef,
                style: styleRef.value,
                onKeydown: NPopover2.handleKeydown,
                onMouseenter: handleMouseEnter,
                onMouseleave: handleMouseLeave
              }, attrs), internalTrapFocus ? vue.h(FocusTrap, {
                active: props.show,
                autoFocus: true
              }, {
                default: renderContentInnerNode
              }) : renderContentInnerNode());
            } else {
              contentNode = renderBody(
                // The popover class and overlap class must exists, they will be used
                // to place the body & transition animation.
                // Shadow class exists for reuse box-shadow.
                [`${mergedClsPrefix}-popover-shared`, themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass.value, props.overlap && `${mergedClsPrefix}-popover-shared--overlap`, props.showArrow && `${mergedClsPrefix}-popover-shared--show-arrow`, props.arrowPointToCenter && `${mergedClsPrefix}-popover-shared--center-arrow`],
                bodyRef,
                styleRef.value,
                handleMouseEnter,
                handleMouseLeave
              );
            }
            return vue.withDirectives(contentNode, directivesRef.value);
          }
          return {
            displayed: displayedRef,
            namespace: namespaceRef,
            isMounted: NPopover2.isMountedRef,
            zIndex: NPopover2.zIndexRef,
            followerRef,
            adjustedTo: useAdjustedTo(props),
            followerEnabled: followerEnabledRef,
            renderContentNode
          };
        },
        render() {
          return vue.h(VFollower, {
            ref: "followerRef",
            zIndex: this.zIndex,
            show: this.show,
            enabled: this.followerEnabled,
            to: this.adjustedTo,
            x: this.x,
            y: this.y,
            flip: this.flip,
            placement: this.placement,
            containerClass: this.namespace,
            overlap: this.overlap,
            width: this.width === "trigger" ? "target" : void 0,
            teleportDisabled: this.adjustedTo === useAdjustedTo.tdkey
          }, {
            default: () => {
              return this.animated ? vue.h(vue.Transition, {
                name: "popover-transition",
                appear: this.isMounted,
                // Don't use watch to enable follower, since the transition may
                // make position sync timing very subtle and buggy.
                onEnter: () => {
                  this.followerEnabled = true;
                },
                onAfterLeave: () => {
                  var _a;
                  (_a = this.internalOnAfterLeave) === null || _a === void 0 ? void 0 : _a.call(this);
                  this.followerEnabled = false;
                  this.displayed = false;
                }
              }, {
                default: this.renderContentNode
              }) : this.renderContentNode();
            }
          });
        }
      });
      const bodyPropKeys = Object.keys(popoverBodyProps);
      const triggerEventMap = {
        focus: ["onFocus", "onBlur"],
        click: ["onClick"],
        hover: ["onMouseenter", "onMouseleave"],
        manual: [],
        nested: ["onFocus", "onBlur", "onMouseenter", "onMouseleave", "onClick"]
      };
      function appendEvents(vNode, trigger2, events2) {
        triggerEventMap[trigger2].forEach((eventName) => {
          if (!vNode.props) {
            vNode.props = {};
          } else {
            vNode.props = Object.assign({}, vNode.props);
          }
          const originalHandler = vNode.props[eventName];
          const handler = events2[eventName];
          if (!originalHandler) {
            vNode.props[eventName] = handler;
          } else {
            vNode.props[eventName] = (...args) => {
              originalHandler(...args);
              handler(...args);
            };
          }
        });
      }
      const popoverBaseProps = {
        show: {
          type: Boolean,
          default: void 0
        },
        defaultShow: Boolean,
        showArrow: {
          type: Boolean,
          default: true
        },
        trigger: {
          type: String,
          default: "hover"
        },
        delay: {
          type: Number,
          default: 100
        },
        duration: {
          type: Number,
          default: 100
        },
        raw: Boolean,
        placement: {
          type: String,
          default: "top"
        },
        x: Number,
        y: Number,
        arrowPointToCenter: Boolean,
        disabled: Boolean,
        getDisabled: Function,
        displayDirective: {
          type: String,
          default: "if"
        },
        arrowClass: String,
        arrowStyle: [String, Object],
        arrowWrapperClass: String,
        arrowWrapperStyle: [String, Object],
        flip: {
          type: Boolean,
          default: true
        },
        animated: {
          type: Boolean,
          default: true
        },
        width: {
          type: [Number, String],
          default: void 0
        },
        overlap: Boolean,
        keepAliveOnHover: {
          type: Boolean,
          default: true
        },
        zIndex: Number,
        to: useAdjustedTo.propTo,
        scrollable: Boolean,
        contentClass: String,
        contentStyle: [Object, String],
        headerClass: String,
        headerStyle: [Object, String],
        footerClass: String,
        footerStyle: [Object, String],
        // events
        onClickoutside: Function,
        "onUpdate:show": [Function, Array],
        onUpdateShow: [Function, Array],
        // internal
        internalDeactivateImmediately: Boolean,
        internalSyncTargetWithParent: Boolean,
        internalInheritedEventHandlers: {
          type: Array,
          default: () => []
        },
        internalTrapFocus: Boolean,
        internalExtraClass: {
          type: Array,
          default: () => []
        },
        // deprecated
        onShow: [Function, Array],
        onHide: [Function, Array],
        arrow: {
          type: Boolean,
          default: void 0
        },
        minWidth: Number,
        maxWidth: Number
      };
      const popoverProps = Object.assign(Object.assign(Object.assign({}, useTheme.props), popoverBaseProps), {
        internalOnAfterLeave: Function,
        internalRenderBody: Function
      });
      const NPopover = vue.defineComponent({
        name: "Popover",
        inheritAttrs: false,
        props: popoverProps,
        __popover__: true,
        setup(props) {
          const isMountedRef = isMounted();
          const binderInstRef = vue.ref(null);
          const controlledShowRef = vue.computed(() => props.show);
          const uncontrolledShowRef = vue.ref(props.defaultShow);
          const mergedShowWithoutDisabledRef = useMergedState(controlledShowRef, uncontrolledShowRef);
          const mergedShowConsideringDisabledPropRef = useMemo(() => {
            if (props.disabled) return false;
            return mergedShowWithoutDisabledRef.value;
          });
          const getMergedDisabled = () => {
            if (props.disabled) return true;
            const {
              getDisabled
            } = props;
            if (getDisabled === null || getDisabled === void 0 ? void 0 : getDisabled()) return true;
            return false;
          };
          const getMergedShow = () => {
            if (getMergedDisabled()) return false;
            return mergedShowWithoutDisabledRef.value;
          };
          const compatibleShowArrowRef = useCompitable(props, ["arrow", "showArrow"]);
          const mergedShowArrowRef = vue.computed(() => {
            if (props.overlap) return false;
            return compatibleShowArrowRef.value;
          });
          let bodyInstance = null;
          const showTimerIdRef = vue.ref(null);
          const hideTimerIdRef = vue.ref(null);
          const positionManuallyRef = useMemo(() => {
            return props.x !== void 0 && props.y !== void 0;
          });
          function doUpdateShow(value) {
            const {
              "onUpdate:show": _onUpdateShow,
              onUpdateShow,
              onShow,
              onHide
            } = props;
            uncontrolledShowRef.value = value;
            if (_onUpdateShow) {
              call(_onUpdateShow, value);
            }
            if (onUpdateShow) {
              call(onUpdateShow, value);
            }
            if (value && onShow) {
              call(onShow, true);
            }
            if (value && onHide) {
              call(onHide, false);
            }
          }
          function syncPosition() {
            if (bodyInstance) {
              bodyInstance.syncPosition();
            }
          }
          function clearShowTimer() {
            const {
              value: showTimerId
            } = showTimerIdRef;
            if (showTimerId) {
              window.clearTimeout(showTimerId);
              showTimerIdRef.value = null;
            }
          }
          function clearHideTimer() {
            const {
              value: hideTimerId
            } = hideTimerIdRef;
            if (hideTimerId) {
              window.clearTimeout(hideTimerId);
              hideTimerIdRef.value = null;
            }
          }
          function handleFocus() {
            const mergedDisabled = getMergedDisabled();
            if (props.trigger === "focus" && !mergedDisabled) {
              if (getMergedShow()) return;
              doUpdateShow(true);
            }
          }
          function handleBlur() {
            const mergedDisabled = getMergedDisabled();
            if (props.trigger === "focus" && !mergedDisabled) {
              if (!getMergedShow()) return;
              doUpdateShow(false);
            }
          }
          function handleMouseEnter() {
            const mergedDisabled = getMergedDisabled();
            if (props.trigger === "hover" && !mergedDisabled) {
              clearHideTimer();
              if (showTimerIdRef.value !== null) return;
              if (getMergedShow()) return;
              const delayCallback = () => {
                doUpdateShow(true);
                showTimerIdRef.value = null;
              };
              const {
                delay
              } = props;
              if (delay === 0) {
                delayCallback();
              } else {
                showTimerIdRef.value = window.setTimeout(delayCallback, delay);
              }
            }
          }
          function handleMouseLeave() {
            const mergedDisabled = getMergedDisabled();
            if (props.trigger === "hover" && !mergedDisabled) {
              clearShowTimer();
              if (hideTimerIdRef.value !== null) return;
              if (!getMergedShow()) return;
              const delayedCallback = () => {
                doUpdateShow(false);
                hideTimerIdRef.value = null;
              };
              const {
                duration: duration2
              } = props;
              if (duration2 === 0) {
                delayedCallback();
              } else {
                hideTimerIdRef.value = window.setTimeout(delayedCallback, duration2);
              }
            }
          }
          function handleMouseMoveOutside() {
            handleMouseLeave();
          }
          function handleClickOutside(e) {
            var _a;
            if (!getMergedShow()) return;
            if (props.trigger === "click") {
              clearShowTimer();
              clearHideTimer();
              doUpdateShow(false);
            }
            (_a = props.onClickoutside) === null || _a === void 0 ? void 0 : _a.call(props, e);
          }
          function handleClick() {
            if (props.trigger === "click" && !getMergedDisabled()) {
              clearShowTimer();
              clearHideTimer();
              const nextShow = !getMergedShow();
              doUpdateShow(nextShow);
            }
          }
          function handleKeydown(e) {
            if (!props.internalTrapFocus) return;
            if (e.key === "Escape") {
              clearShowTimer();
              clearHideTimer();
              doUpdateShow(false);
            }
          }
          function setShow(value) {
            uncontrolledShowRef.value = value;
          }
          function getTriggerElement() {
            var _a;
            return (_a = binderInstRef.value) === null || _a === void 0 ? void 0 : _a.targetRef;
          }
          function setBodyInstance(value) {
            bodyInstance = value;
          }
          vue.provide("NPopover", {
            getTriggerElement,
            handleKeydown,
            handleMouseEnter,
            handleMouseLeave,
            handleClickOutside,
            handleMouseMoveOutside,
            setBodyInstance,
            positionManuallyRef,
            isMountedRef,
            zIndexRef: vue.toRef(props, "zIndex"),
            extraClassRef: vue.toRef(props, "internalExtraClass"),
            internalRenderBodyRef: vue.toRef(props, "internalRenderBody")
          });
          vue.watchEffect(() => {
            if (mergedShowWithoutDisabledRef.value && getMergedDisabled()) {
              doUpdateShow(false);
            }
          });
          const returned = {
            binderInstRef,
            positionManually: positionManuallyRef,
            mergedShowConsideringDisabledProp: mergedShowConsideringDisabledPropRef,
            // if to show popover body
            uncontrolledShow: uncontrolledShowRef,
            mergedShowArrow: mergedShowArrowRef,
            getMergedShow,
            setShow,
            handleClick,
            handleMouseEnter,
            handleMouseLeave,
            handleFocus,
            handleBlur,
            syncPosition
          };
          return returned;
        },
        render() {
          var _a;
          const {
            positionManually,
            $slots: slots
          } = this;
          let triggerVNode;
          let popoverInside = false;
          if (!positionManually) {
            if (slots.activator) {
              triggerVNode = getFirstSlotVNode(slots, "activator");
            } else {
              triggerVNode = getFirstSlotVNode(slots, "trigger");
            }
            if (triggerVNode) {
              triggerVNode = vue.cloneVNode(triggerVNode);
              triggerVNode = triggerVNode.type === vue.Text ? vue.h("span", [triggerVNode]) : triggerVNode;
              const handlers = {
                onClick: this.handleClick,
                onMouseenter: this.handleMouseEnter,
                onMouseleave: this.handleMouseLeave,
                onFocus: this.handleFocus,
                onBlur: this.handleBlur
              };
              if ((_a = triggerVNode.type) === null || _a === void 0 ? void 0 : _a.__popover__) {
                popoverInside = true;
                if (!triggerVNode.props) {
                  triggerVNode.props = {
                    internalSyncTargetWithParent: true,
                    internalInheritedEventHandlers: []
                  };
                }
                triggerVNode.props.internalSyncTargetWithParent = true;
                if (!triggerVNode.props.internalInheritedEventHandlers) {
                  triggerVNode.props.internalInheritedEventHandlers = [handlers];
                } else {
                  triggerVNode.props.internalInheritedEventHandlers = [handlers, ...triggerVNode.props.internalInheritedEventHandlers];
                }
              } else {
                const {
                  internalInheritedEventHandlers
                } = this;
                const ascendantAndCurrentHandlers = [handlers, ...internalInheritedEventHandlers];
                const mergedHandlers = {
                  onBlur: (e) => {
                    ascendantAndCurrentHandlers.forEach((_handlers) => {
                      _handlers.onBlur(e);
                    });
                  },
                  onFocus: (e) => {
                    ascendantAndCurrentHandlers.forEach((_handlers) => {
                      _handlers.onFocus(e);
                    });
                  },
                  onClick: (e) => {
                    ascendantAndCurrentHandlers.forEach((_handlers) => {
                      _handlers.onClick(e);
                    });
                  },
                  onMouseenter: (e) => {
                    ascendantAndCurrentHandlers.forEach((_handlers) => {
                      _handlers.onMouseenter(e);
                    });
                  },
                  onMouseleave: (e) => {
                    ascendantAndCurrentHandlers.forEach((_handlers) => {
                      _handlers.onMouseleave(e);
                    });
                  }
                };
                appendEvents(triggerVNode, internalInheritedEventHandlers ? "nested" : positionManually ? "manual" : this.trigger, mergedHandlers);
              }
            }
          }
          return vue.h(Binder, {
            ref: "binderInstRef",
            syncTarget: !popoverInside,
            syncTargetWithParent: this.internalSyncTargetWithParent
          }, {
            default: () => {
              void this.mergedShowConsideringDisabledProp;
              const mergedShow = this.getMergedShow();
              return [this.internalTrapFocus && mergedShow ? vue.withDirectives(vue.h("div", {
                style: {
                  position: "fixed",
                  inset: 0
                }
              }), [[zindexable, {
                enabled: mergedShow,
                zIndex: this.zIndex
              }]]) : null, positionManually ? null : vue.h(VTarget, null, {
                default: () => triggerVNode
              }), vue.h(NPopoverBody, keep(this.$props, bodyPropKeys, Object.assign(Object.assign({}, this.$attrs), {
                showArrow: this.mergedShowArrow,
                show: mergedShow
              })), {
                default: () => {
                  var _a2, _b;
                  return (_b = (_a2 = this.$slots).default) === null || _b === void 0 ? void 0 : _b.call(_a2);
                },
                header: () => {
                  var _a2, _b;
                  return (_b = (_a2 = this.$slots).header) === null || _b === void 0 ? void 0 : _b.call(_a2);
                },
                footer: () => {
                  var _a2, _b;
                  return (_b = (_a2 = this.$slots).footer) === null || _b === void 0 ? void 0 : _b.call(_a2);
                }
              })];
            }
          });
        }
      });
      const commonVariables$j = {
        closeIconSizeTiny: "12px",
        closeIconSizeSmall: "12px",
        closeIconSizeMedium: "14px",
        closeIconSizeLarge: "14px",
        closeSizeTiny: "16px",
        closeSizeSmall: "16px",
        closeSizeMedium: "18px",
        closeSizeLarge: "18px",
        padding: "0 7px",
        closeMargin: "0 0 0 4px"
      };
      const tagDark = {
        name: "Tag",
        common: derived$1,
        self(vars) {
          const {
            textColor2,
            primaryColorHover,
            primaryColorPressed,
            primaryColor,
            infoColor,
            successColor,
            warningColor,
            errorColor,
            baseColor,
            borderColor,
            tagColor,
            opacityDisabled,
            closeIconColor,
            closeIconColorHover,
            closeIconColorPressed,
            closeColorHover,
            closeColorPressed,
            borderRadiusSmall: borderRadius,
            fontSizeMini,
            fontSizeTiny,
            fontSizeSmall,
            fontSizeMedium,
            heightMini,
            heightTiny,
            heightSmall,
            heightMedium,
            buttonColor2Hover,
            buttonColor2Pressed,
            fontWeightStrong
          } = vars;
          return Object.assign(Object.assign({}, commonVariables$j), {
            closeBorderRadius: borderRadius,
            heightTiny: heightMini,
            heightSmall: heightTiny,
            heightMedium: heightSmall,
            heightLarge: heightMedium,
            borderRadius,
            opacityDisabled,
            fontSizeTiny: fontSizeMini,
            fontSizeSmall: fontSizeTiny,
            fontSizeMedium: fontSizeSmall,
            fontSizeLarge: fontSizeMedium,
            fontWeightStrong,
            // checked
            textColorCheckable: textColor2,
            textColorHoverCheckable: textColor2,
            textColorPressedCheckable: textColor2,
            textColorChecked: baseColor,
            colorCheckable: "#0000",
            colorHoverCheckable: buttonColor2Hover,
            colorPressedCheckable: buttonColor2Pressed,
            colorChecked: primaryColor,
            colorCheckedHover: primaryColorHover,
            colorCheckedPressed: primaryColorPressed,
            // default
            border: `1px solid ${borderColor}`,
            textColor: textColor2,
            color: tagColor,
            colorBordered: "#0000",
            closeIconColor,
            closeIconColorHover,
            closeIconColorPressed,
            closeColorHover,
            closeColorPressed,
            borderPrimary: `1px solid ${changeColor(primaryColor, {
            alpha: 0.3
          })}`,
            textColorPrimary: primaryColor,
            colorPrimary: changeColor(primaryColor, {
              alpha: 0.16
            }),
            colorBorderedPrimary: "#0000",
            closeIconColorPrimary: scaleColor(primaryColor, {
              lightness: 0.7
            }),
            closeIconColorHoverPrimary: scaleColor(primaryColor, {
              lightness: 0.7
            }),
            closeIconColorPressedPrimary: scaleColor(primaryColor, {
              lightness: 0.7
            }),
            closeColorHoverPrimary: changeColor(primaryColor, {
              alpha: 0.16
            }),
            closeColorPressedPrimary: changeColor(primaryColor, {
              alpha: 0.12
            }),
            borderInfo: `1px solid ${changeColor(infoColor, {
            alpha: 0.3
          })}`,
            textColorInfo: infoColor,
            colorInfo: changeColor(infoColor, {
              alpha: 0.16
            }),
            colorBorderedInfo: "#0000",
            closeIconColorInfo: scaleColor(infoColor, {
              alpha: 0.7
            }),
            closeIconColorHoverInfo: scaleColor(infoColor, {
              alpha: 0.7
            }),
            closeIconColorPressedInfo: scaleColor(infoColor, {
              alpha: 0.7
            }),
            closeColorHoverInfo: changeColor(infoColor, {
              alpha: 0.16
            }),
            closeColorPressedInfo: changeColor(infoColor, {
              alpha: 0.12
            }),
            borderSuccess: `1px solid ${changeColor(successColor, {
            alpha: 0.3
          })}`,
            textColorSuccess: successColor,
            colorSuccess: changeColor(successColor, {
              alpha: 0.16
            }),
            colorBorderedSuccess: "#0000",
            closeIconColorSuccess: scaleColor(successColor, {
              alpha: 0.7
            }),
            closeIconColorHoverSuccess: scaleColor(successColor, {
              alpha: 0.7
            }),
            closeIconColorPressedSuccess: scaleColor(successColor, {
              alpha: 0.7
            }),
            closeColorHoverSuccess: changeColor(successColor, {
              alpha: 0.16
            }),
            closeColorPressedSuccess: changeColor(successColor, {
              alpha: 0.12
            }),
            borderWarning: `1px solid ${changeColor(warningColor, {
            alpha: 0.3
          })}`,
            textColorWarning: warningColor,
            colorWarning: changeColor(warningColor, {
              alpha: 0.16
            }),
            colorBorderedWarning: "#0000",
            closeIconColorWarning: scaleColor(warningColor, {
              alpha: 0.7
            }),
            closeIconColorHoverWarning: scaleColor(warningColor, {
              alpha: 0.7
            }),
            closeIconColorPressedWarning: scaleColor(warningColor, {
              alpha: 0.7
            }),
            closeColorHoverWarning: changeColor(warningColor, {
              alpha: 0.16
            }),
            closeColorPressedWarning: changeColor(warningColor, {
              alpha: 0.11
            }),
            borderError: `1px solid ${changeColor(errorColor, {
            alpha: 0.3
          })}`,
            textColorError: errorColor,
            colorError: changeColor(errorColor, {
              alpha: 0.16
            }),
            colorBorderedError: "#0000",
            closeIconColorError: scaleColor(errorColor, {
              alpha: 0.7
            }),
            closeIconColorHoverError: scaleColor(errorColor, {
              alpha: 0.7
            }),
            closeIconColorPressedError: scaleColor(errorColor, {
              alpha: 0.7
            }),
            closeColorHoverError: changeColor(errorColor, {
              alpha: 0.16
            }),
            closeColorPressedError: changeColor(errorColor, {
              alpha: 0.12
            })
          });
        }
      };
      function self$1e(vars) {
        const {
          textColor2,
          primaryColorHover,
          primaryColorPressed,
          primaryColor,
          infoColor,
          successColor,
          warningColor,
          errorColor,
          baseColor,
          borderColor,
          opacityDisabled,
          tagColor,
          closeIconColor,
          closeIconColorHover,
          closeIconColorPressed,
          borderRadiusSmall: borderRadius,
          fontSizeMini,
          fontSizeTiny,
          fontSizeSmall,
          fontSizeMedium,
          heightMini,
          heightTiny,
          heightSmall,
          heightMedium,
          closeColorHover,
          closeColorPressed,
          buttonColor2Hover,
          buttonColor2Pressed,
          fontWeightStrong
        } = vars;
        return Object.assign(Object.assign({}, commonVariables$j), {
          closeBorderRadius: borderRadius,
          heightTiny: heightMini,
          heightSmall: heightTiny,
          heightMedium: heightSmall,
          heightLarge: heightMedium,
          borderRadius,
          opacityDisabled,
          fontSizeTiny: fontSizeMini,
          fontSizeSmall: fontSizeTiny,
          fontSizeMedium: fontSizeSmall,
          fontSizeLarge: fontSizeMedium,
          fontWeightStrong,
          // checked
          textColorCheckable: textColor2,
          textColorHoverCheckable: textColor2,
          textColorPressedCheckable: textColor2,
          textColorChecked: baseColor,
          colorCheckable: "#0000",
          colorHoverCheckable: buttonColor2Hover,
          colorPressedCheckable: buttonColor2Pressed,
          colorChecked: primaryColor,
          colorCheckedHover: primaryColorHover,
          colorCheckedPressed: primaryColorPressed,
          // default
          border: `1px solid ${borderColor}`,
          textColor: textColor2,
          color: tagColor,
          colorBordered: "rgb(250, 250, 252)",
          closeIconColor,
          closeIconColorHover,
          closeIconColorPressed,
          closeColorHover,
          closeColorPressed,
          borderPrimary: `1px solid ${changeColor(primaryColor, {
          alpha: 0.3
        })}`,
          textColorPrimary: primaryColor,
          colorPrimary: changeColor(primaryColor, {
            alpha: 0.12
          }),
          colorBorderedPrimary: changeColor(primaryColor, {
            alpha: 0.1
          }),
          closeIconColorPrimary: primaryColor,
          closeIconColorHoverPrimary: primaryColor,
          closeIconColorPressedPrimary: primaryColor,
          closeColorHoverPrimary: changeColor(primaryColor, {
            alpha: 0.12
          }),
          closeColorPressedPrimary: changeColor(primaryColor, {
            alpha: 0.18
          }),
          borderInfo: `1px solid ${changeColor(infoColor, {
          alpha: 0.3
        })}`,
          textColorInfo: infoColor,
          colorInfo: changeColor(infoColor, {
            alpha: 0.12
          }),
          colorBorderedInfo: changeColor(infoColor, {
            alpha: 0.1
          }),
          closeIconColorInfo: infoColor,
          closeIconColorHoverInfo: infoColor,
          closeIconColorPressedInfo: infoColor,
          closeColorHoverInfo: changeColor(infoColor, {
            alpha: 0.12
          }),
          closeColorPressedInfo: changeColor(infoColor, {
            alpha: 0.18
          }),
          borderSuccess: `1px solid ${changeColor(successColor, {
          alpha: 0.3
        })}`,
          textColorSuccess: successColor,
          colorSuccess: changeColor(successColor, {
            alpha: 0.12
          }),
          colorBorderedSuccess: changeColor(successColor, {
            alpha: 0.1
          }),
          closeIconColorSuccess: successColor,
          closeIconColorHoverSuccess: successColor,
          closeIconColorPressedSuccess: successColor,
          closeColorHoverSuccess: changeColor(successColor, {
            alpha: 0.12
          }),
          closeColorPressedSuccess: changeColor(successColor, {
            alpha: 0.18
          }),
          borderWarning: `1px solid ${changeColor(warningColor, {
          alpha: 0.35
        })}`,
          textColorWarning: warningColor,
          colorWarning: changeColor(warningColor, {
            alpha: 0.15
          }),
          colorBorderedWarning: changeColor(warningColor, {
            alpha: 0.12
          }),
          closeIconColorWarning: warningColor,
          closeIconColorHoverWarning: warningColor,
          closeIconColorPressedWarning: warningColor,
          closeColorHoverWarning: changeColor(warningColor, {
            alpha: 0.12
          }),
          closeColorPressedWarning: changeColor(warningColor, {
            alpha: 0.18
          }),
          borderError: `1px solid ${changeColor(errorColor, {
          alpha: 0.23
        })}`,
          textColorError: errorColor,
          colorError: changeColor(errorColor, {
            alpha: 0.1
          }),
          colorBorderedError: changeColor(errorColor, {
            alpha: 0.08
          }),
          closeIconColorError: errorColor,
          closeIconColorHoverError: errorColor,
          closeIconColorPressedError: errorColor,
          closeColorHoverError: changeColor(errorColor, {
            alpha: 0.12
          }),
          closeColorPressedError: changeColor(errorColor, {
            alpha: 0.18
          })
        });
      }
      const tagLight = {
        name: "Tag",
        common: derived,
        self: self$1e
      };
      const commonProps = {
        color: Object,
        type: {
          type: String,
          default: "default"
        },
        round: Boolean,
        size: {
          type: String,
          default: "medium"
        },
        closable: Boolean,
        disabled: {
          type: Boolean,
          default: void 0
        }
      };
      const style$e = cB("tag", `
 --n-close-margin: var(--n-close-margin-top) var(--n-close-margin-right) var(--n-close-margin-bottom) var(--n-close-margin-left);
 white-space: nowrap;
 position: relative;
 box-sizing: border-box;
 cursor: default;
 display: inline-flex;
 align-items: center;
 flex-wrap: nowrap;
 padding: var(--n-padding);
 border-radius: var(--n-border-radius);
 color: var(--n-text-color);
 background-color: var(--n-color);
 transition: 
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 line-height: 1;
 height: var(--n-height);
 font-size: var(--n-font-size);
`, [cM("strong", `
 font-weight: var(--n-font-weight-strong);
 `), cE("border", `
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
 border: var(--n-border);
 transition: border-color .3s var(--n-bezier);
 `), cE("icon", `
 display: flex;
 margin: 0 4px 0 0;
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 font-size: var(--n-avatar-size-override);
 `), cE("avatar", `
 display: flex;
 margin: 0 6px 0 0;
 `), cE("close", `
 margin: var(--n-close-margin);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `), cM("round", `
 padding: 0 calc(var(--n-height) / 3);
 border-radius: calc(var(--n-height) / 2);
 `, [cE("icon", `
 margin: 0 4px 0 calc((var(--n-height) - 8px) / -2);
 `), cE("avatar", `
 margin: 0 6px 0 calc((var(--n-height) - 8px) / -2);
 `), cM("closable", `
 padding: 0 calc(var(--n-height) / 4) 0 calc(var(--n-height) / 3);
 `)]), cM("icon, avatar", [cM("round", `
 padding: 0 calc(var(--n-height) / 3) 0 calc(var(--n-height) / 2);
 `)]), cM("disabled", `
 cursor: not-allowed !important;
 opacity: var(--n-opacity-disabled);
 `), cM("checkable", `
 cursor: pointer;
 box-shadow: none;
 color: var(--n-text-color-checkable);
 background-color: var(--n-color-checkable);
 `, [cNotM("disabled", [c$1("&:hover", "background-color: var(--n-color-hover-checkable);", [cNotM("checked", "color: var(--n-text-color-hover-checkable);")]), c$1("&:active", "background-color: var(--n-color-pressed-checkable);", [cNotM("checked", "color: var(--n-text-color-pressed-checkable);")])]), cM("checked", `
 color: var(--n-text-color-checked);
 background-color: var(--n-color-checked);
 `, [cNotM("disabled", [c$1("&:hover", "background-color: var(--n-color-checked-hover);"), c$1("&:active", "background-color: var(--n-color-checked-pressed);")])])])]);
      const tagProps = Object.assign(Object.assign(Object.assign({}, useTheme.props), commonProps), {
        bordered: {
          type: Boolean,
          default: void 0
        },
        checked: Boolean,
        checkable: Boolean,
        strong: Boolean,
        triggerClickOnClose: Boolean,
        onClose: [Array, Function],
        onMouseenter: Function,
        onMouseleave: Function,
        "onUpdate:checked": Function,
        onUpdateChecked: Function,
        // private
        internalCloseFocusable: {
          type: Boolean,
          default: true
        },
        internalCloseIsButtonTag: {
          type: Boolean,
          default: true
        },
        // deprecated
        onCheckedChange: Function
      });
      const tagInjectionKey = createInjectionKey("n-tag");
      const NTag = vue.defineComponent({
        name: "Tag",
        props: tagProps,
        setup(props) {
          const contentRef = vue.ref(null);
          const {
            mergedBorderedRef,
            mergedClsPrefixRef,
            inlineThemeDisabled,
            mergedRtlRef
          } = useConfig(props);
          const themeRef = useTheme("Tag", "-tag", style$e, tagLight, props, mergedClsPrefixRef);
          vue.provide(tagInjectionKey, {
            roundRef: vue.toRef(props, "round")
          });
          function handleClick() {
            if (!props.disabled) {
              if (props.checkable) {
                const {
                  checked,
                  onCheckedChange,
                  onUpdateChecked,
                  "onUpdate:checked": _onUpdateChecked
                } = props;
                if (onUpdateChecked) onUpdateChecked(!checked);
                if (_onUpdateChecked) _onUpdateChecked(!checked);
                if (onCheckedChange) onCheckedChange(!checked);
              }
            }
          }
          function handleCloseClick(e) {
            if (!props.triggerClickOnClose) {
              e.stopPropagation();
            }
            if (!props.disabled) {
              const {
                onClose
              } = props;
              if (onClose) call(onClose, e);
            }
          }
          const tagPublicMethods = {
            setTextContent(textContent) {
              const {
                value
              } = contentRef;
              if (value) value.textContent = textContent;
            }
          };
          const rtlEnabledRef = useRtl("Tag", mergedRtlRef, mergedClsPrefixRef);
          const cssVarsRef = vue.computed(() => {
            const {
              type,
              size: size2,
              color: {
                color,
                textColor
              } = {}
            } = props;
            const {
              common: {
                cubicBezierEaseInOut: cubicBezierEaseInOut2
              },
              self: {
                padding,
                closeMargin,
                borderRadius,
                opacityDisabled,
                textColorCheckable,
                textColorHoverCheckable,
                textColorPressedCheckable,
                textColorChecked,
                colorCheckable,
                colorHoverCheckable,
                colorPressedCheckable,
                colorChecked,
                colorCheckedHover,
                colorCheckedPressed,
                closeBorderRadius,
                fontWeightStrong,
                [createKey("colorBordered", type)]: colorBordered,
                [createKey("closeSize", size2)]: closeSize,
                [createKey("closeIconSize", size2)]: closeIconSize,
                [createKey("fontSize", size2)]: fontSize2,
                [createKey("height", size2)]: height,
                [createKey("color", type)]: typedColor,
                [createKey("textColor", type)]: typeTextColor,
                [createKey("border", type)]: border,
                [createKey("closeIconColor", type)]: closeIconColor,
                [createKey("closeIconColorHover", type)]: closeIconColorHover,
                [createKey("closeIconColorPressed", type)]: closeIconColorPressed,
                [createKey("closeColorHover", type)]: closeColorHover,
                [createKey("closeColorPressed", type)]: closeColorPressed
              }
            } = themeRef.value;
            const closeMarginDiscrete = getMargin(closeMargin);
            return {
              "--n-font-weight-strong": fontWeightStrong,
              "--n-avatar-size-override": `calc(${height} - 8px)`,
              "--n-bezier": cubicBezierEaseInOut2,
              "--n-border-radius": borderRadius,
              "--n-border": border,
              "--n-close-icon-size": closeIconSize,
              "--n-close-color-pressed": closeColorPressed,
              "--n-close-color-hover": closeColorHover,
              "--n-close-border-radius": closeBorderRadius,
              "--n-close-icon-color": closeIconColor,
              "--n-close-icon-color-hover": closeIconColorHover,
              "--n-close-icon-color-pressed": closeIconColorPressed,
              "--n-close-icon-color-disabled": closeIconColor,
              "--n-close-margin-top": closeMarginDiscrete.top,
              "--n-close-margin-right": closeMarginDiscrete.right,
              "--n-close-margin-bottom": closeMarginDiscrete.bottom,
              "--n-close-margin-left": closeMarginDiscrete.left,
              "--n-close-size": closeSize,
              "--n-color": color || (mergedBorderedRef.value ? colorBordered : typedColor),
              "--n-color-checkable": colorCheckable,
              "--n-color-checked": colorChecked,
              "--n-color-checked-hover": colorCheckedHover,
              "--n-color-checked-pressed": colorCheckedPressed,
              "--n-color-hover-checkable": colorHoverCheckable,
              "--n-color-pressed-checkable": colorPressedCheckable,
              "--n-font-size": fontSize2,
              "--n-height": height,
              "--n-opacity-disabled": opacityDisabled,
              "--n-padding": padding,
              "--n-text-color": textColor || typeTextColor,
              "--n-text-color-checkable": textColorCheckable,
              "--n-text-color-checked": textColorChecked,
              "--n-text-color-hover-checkable": textColorHoverCheckable,
              "--n-text-color-pressed-checkable": textColorPressedCheckable
            };
          });
          const themeClassHandle = inlineThemeDisabled ? useThemeClass("tag", vue.computed(() => {
            let hash = "";
            const {
              type,
              size: size2,
              color: {
                color,
                textColor
              } = {}
            } = props;
            hash += type[0];
            hash += size2[0];
            if (color) {
              hash += `a${color2Class(color)}`;
            }
            if (textColor) {
              hash += `b${color2Class(textColor)}`;
            }
            if (mergedBorderedRef.value) {
              hash += "c";
            }
            return hash;
          }), cssVarsRef, props) : void 0;
          return Object.assign(Object.assign({}, tagPublicMethods), {
            rtlEnabled: rtlEnabledRef,
            mergedClsPrefix: mergedClsPrefixRef,
            contentRef,
            mergedBordered: mergedBorderedRef,
            handleClick,
            handleCloseClick,
            cssVars: inlineThemeDisabled ? void 0 : cssVarsRef,
            themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
            onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
          });
        },
        render() {
          var _a, _b;
          const {
            mergedClsPrefix,
            rtlEnabled,
            closable,
            color: {
              borderColor
            } = {},
            round,
            onRender,
            $slots
          } = this;
          onRender === null || onRender === void 0 ? void 0 : onRender();
          const avatarNode = resolveWrappedSlot($slots.avatar, (children) => children && vue.h("div", {
            class: `${mergedClsPrefix}-tag__avatar`
          }, children));
          const iconNode = resolveWrappedSlot($slots.icon, (children) => children && vue.h("div", {
            class: `${mergedClsPrefix}-tag__icon`
          }, children));
          return vue.h("div", {
            class: [`${mergedClsPrefix}-tag`, this.themeClass, {
              [`${mergedClsPrefix}-tag--rtl`]: rtlEnabled,
              [`${mergedClsPrefix}-tag--strong`]: this.strong,
              [`${mergedClsPrefix}-tag--disabled`]: this.disabled,
              [`${mergedClsPrefix}-tag--checkable`]: this.checkable,
              [`${mergedClsPrefix}-tag--checked`]: this.checkable && this.checked,
              [`${mergedClsPrefix}-tag--round`]: round,
              [`${mergedClsPrefix}-tag--avatar`]: avatarNode,
              [`${mergedClsPrefix}-tag--icon`]: iconNode,
              [`${mergedClsPrefix}-tag--closable`]: closable
            }],
            style: this.cssVars,
            onClick: this.handleClick,
            onMouseenter: this.onMouseenter,
            onMouseleave: this.onMouseleave
          }, iconNode || avatarNode, vue.h("span", {
            class: `${mergedClsPrefix}-tag__content`,
            ref: "contentRef"
          }, (_b = (_a = this.$slots).default) === null || _b === void 0 ? void 0 : _b.call(_a)), !this.checkable && closable ? vue.h(NBaseClose, {
            clsPrefix: mergedClsPrefix,
            class: `${mergedClsPrefix}-tag__close`,
            disabled: this.disabled,
            onClick: this.handleCloseClick,
            focusable: this.internalCloseFocusable,
            round,
            isButtonTag: this.internalCloseIsButtonTag,
            absolute: true
          }) : null, !this.checkable && this.mergedBordered ? vue.h("div", {
            class: `${mergedClsPrefix}-tag__border`,
            style: {
              borderColor
            }
          }) : null);
        }
      });
      const style$d = cB("base-clear", `
 flex-shrink: 0;
 height: 1em;
 width: 1em;
 position: relative;
`, [c$1(">", [cE("clear", `
 font-size: var(--n-clear-size);
 height: 1em;
 width: 1em;
 cursor: pointer;
 color: var(--n-clear-color);
 transition: color .3s var(--n-bezier);
 display: flex;
 `, [c$1("&:hover", `
 color: var(--n-clear-color-hover)!important;
 `), c$1("&:active", `
 color: var(--n-clear-color-pressed)!important;
 `)]), cE("placeholder", `
 display: flex;
 `), cE("clear, placeholder", `
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 `, [iconSwitchTransition({
        originalTransform: "translateX(-50%) translateY(-50%)",
        left: "50%",
        top: "50%"
      })])])]);
      const NBaseClear = vue.defineComponent({
        name: "BaseClear",
        props: {
          clsPrefix: {
            type: String,
            required: true
          },
          show: Boolean,
          onClear: Function
        },
        setup(props) {
          useStyle("-base-clear", style$d, vue.toRef(props, "clsPrefix"));
          return {
            handleMouseDown(e) {
              e.preventDefault();
            }
          };
        },
        render() {
          const {
            clsPrefix
          } = this;
          return vue.h("div", {
            class: `${clsPrefix}-base-clear`
          }, vue.h(NIconSwitchTransition, null, {
            default: () => {
              var _a, _b;
              return this.show ? vue.h("div", {
                key: "dismiss",
                class: `${clsPrefix}-base-clear__clear`,
                onClick: this.onClear,
                onMousedown: this.handleMouseDown,
                "data-clear": true
              }, resolveSlot(this.$slots.icon, () => [vue.h(NBaseIcon, {
                clsPrefix
              }, {
                default: () => vue.h(ClearIcon, null)
              })])) : vue.h("div", {
                key: "icon",
                class: `${clsPrefix}-base-clear__placeholder`
              }, (_b = (_a = this.$slots).placeholder) === null || _b === void 0 ? void 0 : _b.call(_a));
            }
          }));
        }
      });
      const NBaseSuffix = vue.defineComponent({
        name: "InternalSelectionSuffix",
        props: {
          clsPrefix: {
            type: String,
            required: true
          },
          showArrow: {
            type: Boolean,
            default: void 0
          },
          showClear: {
            type: Boolean,
            default: void 0
          },
          loading: {
            type: Boolean,
            default: false
          },
          onClear: Function
        },
        setup(props, {
          slots
        }) {
          return () => {
            const {
              clsPrefix
            } = props;
            return vue.h(NBaseLoading, {
              clsPrefix,
              class: `${clsPrefix}-base-suffix`,
              strokeWidth: 24,
              scale: 0.85,
              show: props.loading
            }, {
              default: () => props.showArrow ? vue.h(NBaseClear, {
                clsPrefix,
                show: props.showClear,
                onClear: props.onClear
              }, {
                placeholder: () => vue.h(NBaseIcon, {
                  clsPrefix,
                  class: `${clsPrefix}-base-suffix__arrow`
                }, {
                  default: () => resolveSlot(slots.default, () => [vue.h(ChevronDownIcon, null)])
                })
              }) : null
            });
          };
        }
      });
      const commonVars$c = {
        paddingSingle: "0 26px 0 12px",
        paddingMultiple: "3px 26px 0 12px",
        clearSize: "16px",
        arrowSize: "16px"
      };
      function self$1d(vars) {
        const {
          borderRadius,
          textColor2,
          textColorDisabled,
          inputColor,
          inputColorDisabled,
          primaryColor,
          primaryColorHover,
          warningColor,
          warningColorHover,
          errorColor,
          errorColorHover,
          borderColor,
          iconColor,
          iconColorDisabled,
          clearColor,
          clearColorHover,
          clearColorPressed,
          placeholderColor,
          placeholderColorDisabled,
          fontSizeTiny,
          fontSizeSmall,
          fontSizeMedium,
          fontSizeLarge,
          heightTiny,
          heightSmall,
          heightMedium,
          heightLarge
        } = vars;
        return Object.assign(Object.assign({}, commonVars$c), {
          fontSizeTiny,
          fontSizeSmall,
          fontSizeMedium,
          fontSizeLarge,
          heightTiny,
          heightSmall,
          heightMedium,
          heightLarge,
          borderRadius,
          // default
          textColor: textColor2,
          textColorDisabled,
          placeholderColor,
          placeholderColorDisabled,
          color: inputColor,
          colorDisabled: inputColorDisabled,
          colorActive: inputColor,
          border: `1px solid ${borderColor}`,
          borderHover: `1px solid ${primaryColorHover}`,
          borderActive: `1px solid ${primaryColor}`,
          borderFocus: `1px solid ${primaryColorHover}`,
          boxShadowHover: "none",
          boxShadowActive: `0 0 0 2px ${changeColor(primaryColor, {
          alpha: 0.2
        })}`,
          boxShadowFocus: `0 0 0 2px ${changeColor(primaryColor, {
          alpha: 0.2
        })}`,
          caretColor: primaryColor,
          arrowColor: iconColor,
          arrowColorDisabled: iconColorDisabled,
          loadingColor: primaryColor,
          // warning
          borderWarning: `1px solid ${warningColor}`,
          borderHoverWarning: `1px solid ${warningColorHover}`,
          borderActiveWarning: `1px solid ${warningColor}`,
          borderFocusWarning: `1px solid ${warningColorHover}`,
          boxShadowHoverWarning: "none",
          boxShadowActiveWarning: `0 0 0 2px ${changeColor(warningColor, {
          alpha: 0.2
        })}`,
          boxShadowFocusWarning: `0 0 0 2px ${changeColor(warningColor, {
          alpha: 0.2
        })}`,
          colorActiveWarning: inputColor,
          caretColorWarning: warningColor,
          // error
          borderError: `1px solid ${errorColor}`,
          borderHoverError: `1px solid ${errorColorHover}`,
          borderActiveError: `1px solid ${errorColor}`,
          borderFocusError: `1px solid ${errorColorHover}`,
          boxShadowHoverError: "none",
          boxShadowActiveError: `0 0 0 2px ${changeColor(errorColor, {
          alpha: 0.2
        })}`,
          boxShadowFocusError: `0 0 0 2px ${changeColor(errorColor, {
          alpha: 0.2
        })}`,
          colorActiveError: inputColor,
          caretColorError: errorColor,
          clearColor,
          clearColorHover,
          clearColorPressed
        });
      }
      const internalSelectionLight = createTheme({
        name: "InternalSelection",
        common: derived,
        peers: {
          Popover: popoverLight
        },
        self: self$1d
      });
      const internalSelectionDark = {
        name: "InternalSelection",
        common: derived$1,
        peers: {
          Popover: popoverDark
        },
        self(vars) {
          const {
            borderRadius,
            textColor2,
            textColorDisabled,
            inputColor,
            inputColorDisabled,
            primaryColor,
            primaryColorHover,
            warningColor,
            warningColorHover,
            errorColor,
            errorColorHover,
            iconColor,
            iconColorDisabled,
            clearColor,
            clearColorHover,
            clearColorPressed,
            placeholderColor,
            placeholderColorDisabled,
            fontSizeTiny,
            fontSizeSmall,
            fontSizeMedium,
            fontSizeLarge,
            heightTiny,
            heightSmall,
            heightMedium,
            heightLarge
          } = vars;
          return Object.assign(Object.assign({}, commonVars$c), {
            fontSizeTiny,
            fontSizeSmall,
            fontSizeMedium,
            fontSizeLarge,
            heightTiny,
            heightSmall,
            heightMedium,
            heightLarge,
            borderRadius,
            // default
            textColor: textColor2,
            textColorDisabled,
            placeholderColor,
            placeholderColorDisabled,
            color: inputColor,
            colorDisabled: inputColorDisabled,
            colorActive: changeColor(primaryColor, {
              alpha: 0.1
            }),
            border: "1px solid #0000",
            borderHover: `1px solid ${primaryColorHover}`,
            borderActive: `1px solid ${primaryColor}`,
            borderFocus: `1px solid ${primaryColorHover}`,
            boxShadowHover: "none",
            boxShadowActive: `0 0 8px 0 ${changeColor(primaryColor, {
            alpha: 0.4
          })}`,
            boxShadowFocus: `0 0 8px 0 ${changeColor(primaryColor, {
            alpha: 0.4
          })}`,
            caretColor: primaryColor,
            arrowColor: iconColor,
            arrowColorDisabled: iconColorDisabled,
            loadingColor: primaryColor,
            // warning
            borderWarning: `1px solid ${warningColor}`,
            borderHoverWarning: `1px solid ${warningColorHover}`,
            borderActiveWarning: `1px solid ${warningColor}`,
            borderFocusWarning: `1px solid ${warningColorHover}`,
            boxShadowHoverWarning: "none",
            boxShadowActiveWarning: `0 0 8px 0 ${changeColor(warningColor, {
            alpha: 0.4
          })}`,
            boxShadowFocusWarning: `0 0 8px 0 ${changeColor(warningColor, {
            alpha: 0.4
          })}`,
            colorActiveWarning: changeColor(warningColor, {
              alpha: 0.1
            }),
            caretColorWarning: warningColor,
            // error
            borderError: `1px solid ${errorColor}`,
            borderHoverError: `1px solid ${errorColorHover}`,
            borderActiveError: `1px solid ${errorColor}`,
            borderFocusError: `1px solid ${errorColorHover}`,
            boxShadowHoverError: "none",
            boxShadowActiveError: `0 0 8px 0 ${changeColor(errorColor, {
            alpha: 0.4
          })}`,
            boxShadowFocusError: `0 0 8px 0 ${changeColor(errorColor, {
            alpha: 0.4
          })}`,
            colorActiveError: changeColor(errorColor, {
              alpha: 0.1
            }),
            caretColorError: errorColor,
            clearColor,
            clearColorHover,
            clearColorPressed
          });
        }
      };
      const style$c = c$1([cB("base-selection", `
 --n-padding-single: var(--n-padding-single-top) var(--n-padding-single-right) var(--n-padding-single-bottom) var(--n-padding-single-left);
 --n-padding-multiple: var(--n-padding-multiple-top) var(--n-padding-multiple-right) var(--n-padding-multiple-bottom) var(--n-padding-multiple-left);
 position: relative;
 z-index: auto;
 box-shadow: none;
 width: 100%;
 max-width: 100%;
 display: inline-block;
 vertical-align: bottom;
 border-radius: var(--n-border-radius);
 min-height: var(--n-height);
 line-height: 1.5;
 font-size: var(--n-font-size);
 `, [cB("base-loading", `
 color: var(--n-loading-color);
 `), cB("base-selection-tags", "min-height: var(--n-height);"), cE("border, state-border", `
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 pointer-events: none;
 border: var(--n-border);
 border-radius: inherit;
 transition:
 box-shadow .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `), cE("state-border", `
 z-index: 1;
 border-color: #0000;
 `), cB("base-suffix", `
 cursor: pointer;
 position: absolute;
 top: 50%;
 transform: translateY(-50%);
 right: 10px;
 `, [cE("arrow", `
 font-size: var(--n-arrow-size);
 color: var(--n-arrow-color);
 transition: color .3s var(--n-bezier);
 `)]), cB("base-selection-overlay", `
 display: flex;
 align-items: center;
 white-space: nowrap;
 pointer-events: none;
 position: absolute;
 top: 0;
 right: 0;
 bottom: 0;
 left: 0;
 padding: var(--n-padding-single);
 transition: color .3s var(--n-bezier);
 `, [cE("wrapper", `
 flex-basis: 0;
 flex-grow: 1;
 overflow: hidden;
 text-overflow: ellipsis;
 `)]), cB("base-selection-placeholder", `
 color: var(--n-placeholder-color);
 `, [cE("inner", `
 max-width: 100%;
 overflow: hidden;
 `)]), cB("base-selection-tags", `
 cursor: pointer;
 outline: none;
 box-sizing: border-box;
 position: relative;
 z-index: auto;
 display: flex;
 padding: var(--n-padding-multiple);
 flex-wrap: wrap;
 align-items: center;
 width: 100%;
 vertical-align: bottom;
 background-color: var(--n-color);
 border-radius: inherit;
 transition:
 color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `), cB("base-selection-label", `
 height: var(--n-height);
 display: inline-flex;
 width: 100%;
 vertical-align: bottom;
 cursor: pointer;
 outline: none;
 z-index: auto;
 box-sizing: border-box;
 position: relative;
 transition:
 color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 border-radius: inherit;
 background-color: var(--n-color);
 align-items: center;
 `, [cB("base-selection-input", `
 font-size: inherit;
 line-height: inherit;
 outline: none;
 cursor: pointer;
 box-sizing: border-box;
 border:none;
 width: 100%;
 padding: var(--n-padding-single);
 background-color: #0000;
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 caret-color: var(--n-caret-color);
 `, [cE("content", `
 text-overflow: ellipsis;
 overflow: hidden;
 white-space: nowrap; 
 `)]), cE("render-label", `
 color: var(--n-text-color);
 `)]), cNotM("disabled", [c$1("&:hover", [cE("state-border", `
 box-shadow: var(--n-box-shadow-hover);
 border: var(--n-border-hover);
 `)]), cM("focus", [cE("state-border", `
 box-shadow: var(--n-box-shadow-focus);
 border: var(--n-border-focus);
 `)]), cM("active", [cE("state-border", `
 box-shadow: var(--n-box-shadow-active);
 border: var(--n-border-active);
 `), cB("base-selection-label", "background-color: var(--n-color-active);"), cB("base-selection-tags", "background-color: var(--n-color-active);")])]), cM("disabled", "cursor: not-allowed;", [cE("arrow", `
 color: var(--n-arrow-color-disabled);
 `), cB("base-selection-label", `
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `, [cB("base-selection-input", `
 cursor: not-allowed;
 color: var(--n-text-color-disabled);
 `), cE("render-label", `
 color: var(--n-text-color-disabled);
 `)]), cB("base-selection-tags", `
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `), cB("base-selection-placeholder", `
 cursor: not-allowed;
 color: var(--n-placeholder-color-disabled);
 `)]), cB("base-selection-input-tag", `
 height: calc(var(--n-height) - 6px);
 line-height: calc(var(--n-height) - 6px);
 outline: none;
 display: none;
 position: relative;
 margin-bottom: 3px;
 max-width: 100%;
 vertical-align: bottom;
 `, [cE("input", `
 font-size: inherit;
 font-family: inherit;
 min-width: 1px;
 padding: 0;
 background-color: #0000;
 outline: none;
 border: none;
 max-width: 100%;
 overflow: hidden;
 width: 1em;
 line-height: inherit;
 cursor: pointer;
 color: var(--n-text-color);
 caret-color: var(--n-caret-color);
 `), cE("mirror", `
 position: absolute;
 left: 0;
 top: 0;
 white-space: pre;
 visibility: hidden;
 user-select: none;
 -webkit-user-select: none;
 opacity: 0;
 `)]), ["warning", "error"].map((status) => cM(`${status}-status`, [cE("state-border", `border: var(--n-border-${status});`), cNotM("disabled", [c$1("&:hover", [cE("state-border", `
 box-shadow: var(--n-box-shadow-hover-${status});
 border: var(--n-border-hover-${status});
 `)]), cM("active", [cE("state-border", `
 box-shadow: var(--n-box-shadow-active-${status});
 border: var(--n-border-active-${status});
 `), cB("base-selection-label", `background-color: var(--n-color-active-${status});`), cB("base-selection-tags", `background-color: var(--n-color-active-${status});`)]), cM("focus", [cE("state-border", `
 box-shadow: var(--n-box-shadow-focus-${status});
 border: var(--n-border-focus-${status});
 `)])])]))]), cB("base-selection-popover", `
 margin-bottom: -3px;
 display: flex;
 flex-wrap: wrap;
 margin-right: -8px;
 `), cB("base-selection-tag-wrapper", `
 max-width: 100%;
 display: inline-flex;
 padding: 0 7px 3px 0;
 `, [c$1("&:last-child", "padding-right: 0;"), cB("tag", `
 font-size: 14px;
 max-width: 100%;
 `, [cE("content", `
 line-height: 1.25;
 text-overflow: ellipsis;
 overflow: hidden;
 `)])])]);
      const NInternalSelection = vue.defineComponent({
        name: "InternalSelection",
        props: Object.assign(Object.assign({}, useTheme.props), {
          clsPrefix: {
            type: String,
            required: true
          },
          bordered: {
            type: Boolean,
            default: void 0
          },
          active: Boolean,
          pattern: {
            type: String,
            default: ""
          },
          placeholder: String,
          selectedOption: {
            type: Object,
            default: null
          },
          selectedOptions: {
            type: Array,
            default: null
          },
          labelField: {
            type: String,
            default: "label"
          },
          valueField: {
            type: String,
            default: "value"
          },
          multiple: Boolean,
          filterable: Boolean,
          clearable: Boolean,
          disabled: Boolean,
          size: {
            type: String,
            default: "medium"
          },
          loading: Boolean,
          autofocus: Boolean,
          showArrow: {
            type: Boolean,
            default: true
          },
          inputProps: Object,
          focused: Boolean,
          renderTag: Function,
          onKeydown: Function,
          onClick: Function,
          onBlur: Function,
          onFocus: Function,
          onDeleteOption: Function,
          maxTagCount: [String, Number],
          ellipsisTagPopoverProps: Object,
          onClear: Function,
          onPatternInput: Function,
          onPatternFocus: Function,
          onPatternBlur: Function,
          renderLabel: Function,
          status: String,
          inlineThemeDisabled: Boolean,
          ignoreComposition: {
            type: Boolean,
            default: true
          },
          onResize: Function
        }),
        setup(props) {
          const {
            mergedClsPrefixRef,
            mergedRtlRef
          } = useConfig(props);
          const rtlEnabledRef = useRtl("InternalSelection", mergedRtlRef, mergedClsPrefixRef);
          const patternInputMirrorRef = vue.ref(null);
          const patternInputRef = vue.ref(null);
          const selfRef = vue.ref(null);
          const multipleElRef = vue.ref(null);
          const singleElRef = vue.ref(null);
          const patternInputWrapperRef = vue.ref(null);
          const counterRef = vue.ref(null);
          const counterWrapperRef = vue.ref(null);
          const overflowRef = vue.ref(null);
          const inputTagElRef = vue.ref(null);
          const showTagsPopoverRef = vue.ref(false);
          const patternInputFocusedRef = vue.ref(false);
          const hoverRef = vue.ref(false);
          const themeRef = useTheme("InternalSelection", "-internal-selection", style$c, internalSelectionLight, props, vue.toRef(props, "clsPrefix"));
          const mergedClearableRef = vue.computed(() => {
            return props.clearable && !props.disabled && (hoverRef.value || props.active);
          });
          const filterablePlaceholderRef = vue.computed(() => {
            return props.selectedOption ? props.renderTag ? props.renderTag({
              option: props.selectedOption,
              handleClose: () => {
              }
            }) : props.renderLabel ? props.renderLabel(props.selectedOption, true) : render$1(props.selectedOption[props.labelField], props.selectedOption, true) : props.placeholder;
          });
          const labelRef = vue.computed(() => {
            const option = props.selectedOption;
            if (!option) return void 0;
            return option[props.labelField];
          });
          const selectedRef = vue.computed(() => {
            if (props.multiple) {
              return !!(Array.isArray(props.selectedOptions) && props.selectedOptions.length);
            } else {
              return props.selectedOption !== null;
            }
          });
          function syncMirrorWidth() {
            var _a;
            const {
              value: patternInputMirrorEl
            } = patternInputMirrorRef;
            if (patternInputMirrorEl) {
              const {
                value: patternInputEl
              } = patternInputRef;
              if (patternInputEl) {
                patternInputEl.style.width = `${patternInputMirrorEl.offsetWidth}px`;
                if (props.maxTagCount !== "responsive") {
                  (_a = overflowRef.value) === null || _a === void 0 ? void 0 : _a.sync({
                    showAllItemsBeforeCalculate: false
                  });
                }
              }
            }
          }
          function hideInputTag() {
            const {
              value: inputTagEl
            } = inputTagElRef;
            if (inputTagEl) inputTagEl.style.display = "none";
          }
          function showInputTag() {
            const {
              value: inputTagEl
            } = inputTagElRef;
            if (inputTagEl) inputTagEl.style.display = "inline-block";
          }
          vue.watch(vue.toRef(props, "active"), (value) => {
            if (!value) hideInputTag();
          });
          vue.watch(vue.toRef(props, "pattern"), () => {
            if (props.multiple) {
              void vue.nextTick(syncMirrorWidth);
            }
          });
          function doFocus(e) {
            const {
              onFocus
            } = props;
            if (onFocus) onFocus(e);
          }
          function doBlur(e) {
            const {
              onBlur
            } = props;
            if (onBlur) onBlur(e);
          }
          function doDeleteOption(value) {
            const {
              onDeleteOption
            } = props;
            if (onDeleteOption) onDeleteOption(value);
          }
          function doClear(e) {
            const {
              onClear
            } = props;
            if (onClear) onClear(e);
          }
          function doPatternInput(value) {
            const {
              onPatternInput
            } = props;
            if (onPatternInput) onPatternInput(value);
          }
          function handleFocusin(e) {
            var _a;
            if (!e.relatedTarget || !((_a = selfRef.value) === null || _a === void 0 ? void 0 : _a.contains(e.relatedTarget))) {
              doFocus(e);
            }
          }
          function handleFocusout(e) {
            var _a;
            if ((_a = selfRef.value) === null || _a === void 0 ? void 0 : _a.contains(e.relatedTarget)) return;
            doBlur(e);
          }
          function handleClear(e) {
            doClear(e);
          }
          function handleMouseEnter() {
            hoverRef.value = true;
          }
          function handleMouseLeave() {
            hoverRef.value = false;
          }
          function handleMouseDown(e) {
            if (!props.active || !props.filterable) return;
            if (e.target === patternInputRef.value) return;
            e.preventDefault();
          }
          function handleDeleteOption(option) {
            doDeleteOption(option);
          }
          const isComposingRef2 = vue.ref(false);
          function handlePatternKeyDown(e) {
            if (e.key === "Backspace" && !isComposingRef2.value) {
              if (!props.pattern.length) {
                const {
                  selectedOptions
                } = props;
                if (selectedOptions === null || selectedOptions === void 0 ? void 0 : selectedOptions.length) {
                  handleDeleteOption(selectedOptions[selectedOptions.length - 1]);
                }
              }
            }
          }
          let cachedInputEvent = null;
          function handlePatternInputInput(e) {
            const {
              value: patternInputMirrorEl
            } = patternInputMirrorRef;
            if (patternInputMirrorEl) {
              const inputText = e.target.value;
              patternInputMirrorEl.textContent = inputText;
              syncMirrorWidth();
            }
            if (props.ignoreComposition) {
              if (!isComposingRef2.value) {
                doPatternInput(e);
              } else {
                cachedInputEvent = e;
              }
            } else {
              doPatternInput(e);
            }
          }
          function handleCompositionStart() {
            isComposingRef2.value = true;
          }
          function handleCompositionEnd() {
            isComposingRef2.value = false;
            if (props.ignoreComposition) {
              doPatternInput(cachedInputEvent);
            }
            cachedInputEvent = null;
          }
          function handlePatternInputFocus(e) {
            var _a;
            patternInputFocusedRef.value = true;
            (_a = props.onPatternFocus) === null || _a === void 0 ? void 0 : _a.call(props, e);
          }
          function handlePatternInputBlur(e) {
            var _a;
            patternInputFocusedRef.value = false;
            (_a = props.onPatternBlur) === null || _a === void 0 ? void 0 : _a.call(props, e);
          }
          function blur() {
            var _a, _b;
            if (props.filterable) {
              patternInputFocusedRef.value = false;
              (_a = patternInputWrapperRef.value) === null || _a === void 0 ? void 0 : _a.blur();
              (_b = patternInputRef.value) === null || _b === void 0 ? void 0 : _b.blur();
            } else if (props.multiple) {
              const {
                value: multipleEl
              } = multipleElRef;
              multipleEl === null || multipleEl === void 0 ? void 0 : multipleEl.blur();
            } else {
              const {
                value: singleEl
              } = singleElRef;
              singleEl === null || singleEl === void 0 ? void 0 : singleEl.blur();
            }
          }
          function focus() {
            var _a, _b, _c;
            if (props.filterable) {
              patternInputFocusedRef.value = false;
              (_a = patternInputWrapperRef.value) === null || _a === void 0 ? void 0 : _a.focus();
            } else if (props.multiple) {
              (_b = multipleElRef.value) === null || _b === void 0 ? void 0 : _b.focus();
            } else {
              (_c = singleElRef.value) === null || _c === void 0 ? void 0 : _c.focus();
            }
          }
          function focusInput() {
            const {
              value: patternInputEl
            } = patternInputRef;
            if (patternInputEl) {
              showInputTag();
              patternInputEl.focus();
            }
          }
          function blurInput() {
            const {
              value: patternInputEl
            } = patternInputRef;
            if (patternInputEl) {
              patternInputEl.blur();
            }
          }
          function updateCounter(count) {
            const {
              value
            } = counterRef;
            if (value) {
              value.setTextContent(`+${count}`);
            }
          }
          function getCounter() {
            const {
              value
            } = counterWrapperRef;
            return value;
          }
          function getTail() {
            return patternInputRef.value;
          }
          let enterTimerId = null;
          function clearEnterTimer() {
            if (enterTimerId !== null) window.clearTimeout(enterTimerId);
          }
          function handleMouseEnterCounter() {
            if (props.active) return;
            clearEnterTimer();
            enterTimerId = window.setTimeout(() => {
              if (selectedRef.value) {
                showTagsPopoverRef.value = true;
              }
            }, 100);
          }
          function handleMouseLeaveCounter() {
            clearEnterTimer();
          }
          function onPopoverUpdateShow(show) {
            if (!show) {
              clearEnterTimer();
              showTagsPopoverRef.value = false;
            }
          }
          vue.watch(selectedRef, (value) => {
            if (!value) {
              showTagsPopoverRef.value = false;
            }
          });
          vue.onMounted(() => {
            vue.watchEffect(() => {
              const patternInputWrapperEl = patternInputWrapperRef.value;
              if (!patternInputWrapperEl) return;
              if (props.disabled) {
                patternInputWrapperEl.removeAttribute("tabindex");
              } else {
                patternInputWrapperEl.tabIndex = patternInputFocusedRef.value ? -1 : 0;
              }
            });
          });
          useOnResize(selfRef, props.onResize);
          const {
            inlineThemeDisabled
          } = props;
          const cssVarsRef = vue.computed(() => {
            const {
              size: size2
            } = props;
            const {
              common: {
                cubicBezierEaseInOut: cubicBezierEaseInOut2
              },
              self: {
                borderRadius,
                color,
                placeholderColor,
                textColor,
                paddingSingle,
                paddingMultiple,
                caretColor,
                colorDisabled,
                textColorDisabled,
                placeholderColorDisabled,
                colorActive,
                boxShadowFocus,
                boxShadowActive,
                boxShadowHover,
                border,
                borderFocus,
                borderHover,
                borderActive,
                arrowColor,
                arrowColorDisabled,
                loadingColor,
                // form warning
                colorActiveWarning,
                boxShadowFocusWarning,
                boxShadowActiveWarning,
                boxShadowHoverWarning,
                borderWarning,
                borderFocusWarning,
                borderHoverWarning,
                borderActiveWarning,
                // form error
                colorActiveError,
                boxShadowFocusError,
                boxShadowActiveError,
                boxShadowHoverError,
                borderError,
                borderFocusError,
                borderHoverError,
                borderActiveError,
                // clear
                clearColor,
                clearColorHover,
                clearColorPressed,
                clearSize,
                // arrow
                arrowSize: arrowSize2,
                [createKey("height", size2)]: height,
                [createKey("fontSize", size2)]: fontSize2
              }
            } = themeRef.value;
            const paddingSingleDiscrete = getMargin(paddingSingle);
            const paddingMultipleDiscrete = getMargin(paddingMultiple);
            return {
              "--n-bezier": cubicBezierEaseInOut2,
              "--n-border": border,
              "--n-border-active": borderActive,
              "--n-border-focus": borderFocus,
              "--n-border-hover": borderHover,
              "--n-border-radius": borderRadius,
              "--n-box-shadow-active": boxShadowActive,
              "--n-box-shadow-focus": boxShadowFocus,
              "--n-box-shadow-hover": boxShadowHover,
              "--n-caret-color": caretColor,
              "--n-color": color,
              "--n-color-active": colorActive,
              "--n-color-disabled": colorDisabled,
              "--n-font-size": fontSize2,
              "--n-height": height,
              "--n-padding-single-top": paddingSingleDiscrete.top,
              "--n-padding-multiple-top": paddingMultipleDiscrete.top,
              "--n-padding-single-right": paddingSingleDiscrete.right,
              "--n-padding-multiple-right": paddingMultipleDiscrete.right,
              "--n-padding-single-left": paddingSingleDiscrete.left,
              "--n-padding-multiple-left": paddingMultipleDiscrete.left,
              "--n-padding-single-bottom": paddingSingleDiscrete.bottom,
              "--n-padding-multiple-bottom": paddingMultipleDiscrete.bottom,
              "--n-placeholder-color": placeholderColor,
              "--n-placeholder-color-disabled": placeholderColorDisabled,
              "--n-text-color": textColor,
              "--n-text-color-disabled": textColorDisabled,
              "--n-arrow-color": arrowColor,
              "--n-arrow-color-disabled": arrowColorDisabled,
              "--n-loading-color": loadingColor,
              // form warning
              "--n-color-active-warning": colorActiveWarning,
              "--n-box-shadow-focus-warning": boxShadowFocusWarning,
              "--n-box-shadow-active-warning": boxShadowActiveWarning,
              "--n-box-shadow-hover-warning": boxShadowHoverWarning,
              "--n-border-warning": borderWarning,
              "--n-border-focus-warning": borderFocusWarning,
              "--n-border-hover-warning": borderHoverWarning,
              "--n-border-active-warning": borderActiveWarning,
              // form error
              "--n-color-active-error": colorActiveError,
              "--n-box-shadow-focus-error": boxShadowFocusError,
              "--n-box-shadow-active-error": boxShadowActiveError,
              "--n-box-shadow-hover-error": boxShadowHoverError,
              "--n-border-error": borderError,
              "--n-border-focus-error": borderFocusError,
              "--n-border-hover-error": borderHoverError,
              "--n-border-active-error": borderActiveError,
              // clear
              "--n-clear-size": clearSize,
              "--n-clear-color": clearColor,
              "--n-clear-color-hover": clearColorHover,
              "--n-clear-color-pressed": clearColorPressed,
              // arrow-size
              "--n-arrow-size": arrowSize2
            };
          });
          const themeClassHandle = inlineThemeDisabled ? useThemeClass("internal-selection", vue.computed(() => {
            return props.size[0];
          }), cssVarsRef, props) : void 0;
          return {
            mergedTheme: themeRef,
            mergedClearable: mergedClearableRef,
            mergedClsPrefix: mergedClsPrefixRef,
            rtlEnabled: rtlEnabledRef,
            patternInputFocused: patternInputFocusedRef,
            filterablePlaceholder: filterablePlaceholderRef,
            label: labelRef,
            selected: selectedRef,
            showTagsPanel: showTagsPopoverRef,
            isComposing: isComposingRef2,
            // dom ref
            counterRef,
            counterWrapperRef,
            patternInputMirrorRef,
            patternInputRef,
            selfRef,
            multipleElRef,
            singleElRef,
            patternInputWrapperRef,
            overflowRef,
            inputTagElRef,
            handleMouseDown,
            handleFocusin,
            handleClear,
            handleMouseEnter,
            handleMouseLeave,
            handleDeleteOption,
            handlePatternKeyDown,
            handlePatternInputInput,
            handlePatternInputBlur,
            handlePatternInputFocus,
            handleMouseEnterCounter,
            handleMouseLeaveCounter,
            handleFocusout,
            handleCompositionEnd,
            handleCompositionStart,
            onPopoverUpdateShow,
            focus,
            focusInput,
            blur,
            blurInput,
            updateCounter,
            getCounter,
            getTail,
            renderLabel: props.renderLabel,
            cssVars: inlineThemeDisabled ? void 0 : cssVarsRef,
            themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
            onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
          };
        },
        render() {
          const {
            status,
            multiple,
            size: size2,
            disabled,
            filterable,
            maxTagCount,
            bordered,
            clsPrefix,
            ellipsisTagPopoverProps,
            onRender,
            renderTag,
            renderLabel
          } = this;
          onRender === null || onRender === void 0 ? void 0 : onRender();
          const maxTagCountResponsive = maxTagCount === "responsive";
          const maxTagCountNumeric = typeof maxTagCount === "number";
          const useMaxTagCount = maxTagCountResponsive || maxTagCountNumeric;
          const suffix2 = vue.h(Wrapper, null, {
            default: () => vue.h(NBaseSuffix, {
              clsPrefix,
              loading: this.loading,
              showArrow: this.showArrow,
              showClear: this.mergedClearable && this.selected,
              onClear: this.handleClear
            }, {
              default: () => {
                var _a, _b;
                return (_b = (_a = this.$slots).arrow) === null || _b === void 0 ? void 0 : _b.call(_a);
              }
            })
          });
          let body;
          if (multiple) {
            const {
              labelField
            } = this;
            const createTag = (option) => vue.h("div", {
              class: `${clsPrefix}-base-selection-tag-wrapper`,
              key: option.value
            }, renderTag ? renderTag({
              option,
              handleClose: () => {
                this.handleDeleteOption(option);
              }
            }) : vue.h(NTag, {
              size: size2,
              closable: !option.disabled,
              disabled,
              onClose: () => {
                this.handleDeleteOption(option);
              },
              internalCloseIsButtonTag: false,
              internalCloseFocusable: false
            }, {
              default: () => renderLabel ? renderLabel(option, true) : render$1(option[labelField], option, true)
            }));
            const createOriginalTagNodes = () => (maxTagCountNumeric ? this.selectedOptions.slice(0, maxTagCount) : this.selectedOptions).map(createTag);
            const input = filterable ? vue.h("div", {
              class: `${clsPrefix}-base-selection-input-tag`,
              ref: "inputTagElRef",
              key: "__input-tag__"
            }, vue.h("input", Object.assign({}, this.inputProps, {
              ref: "patternInputRef",
              tabindex: -1,
              disabled,
              value: this.pattern,
              autofocus: this.autofocus,
              class: `${clsPrefix}-base-selection-input-tag__input`,
              onBlur: this.handlePatternInputBlur,
              onFocus: this.handlePatternInputFocus,
              onKeydown: this.handlePatternKeyDown,
              onInput: this.handlePatternInputInput,
              onCompositionstart: this.handleCompositionStart,
              onCompositionend: this.handleCompositionEnd
            })), vue.h("span", {
              ref: "patternInputMirrorRef",
              class: `${clsPrefix}-base-selection-input-tag__mirror`
            }, this.pattern)) : null;
            const renderCounter = maxTagCountResponsive ? () => vue.h("div", {
              class: `${clsPrefix}-base-selection-tag-wrapper`,
              ref: "counterWrapperRef"
            }, vue.h(NTag, {
              size: size2,
              ref: "counterRef",
              onMouseenter: this.handleMouseEnterCounter,
              onMouseleave: this.handleMouseLeaveCounter,
              disabled
            })) : void 0;
            let counter;
            if (maxTagCountNumeric) {
              const rest = this.selectedOptions.length - maxTagCount;
              if (rest > 0) {
                counter = vue.h("div", {
                  class: `${clsPrefix}-base-selection-tag-wrapper`,
                  key: "__counter__"
                }, vue.h(NTag, {
                  size: size2,
                  ref: "counterRef",
                  onMouseenter: this.handleMouseEnterCounter,
                  disabled
                }, {
                  default: () => `+${rest}`
                }));
              }
            }
            const tags = maxTagCountResponsive ? filterable ? vue.h(VOverflow, {
              ref: "overflowRef",
              updateCounter: this.updateCounter,
              getCounter: this.getCounter,
              getTail: this.getTail,
              style: {
                width: "100%",
                display: "flex",
                overflow: "hidden"
              }
            }, {
              default: createOriginalTagNodes,
              counter: renderCounter,
              tail: () => input
            }) : vue.h(VOverflow, {
              ref: "overflowRef",
              updateCounter: this.updateCounter,
              getCounter: this.getCounter,
              style: {
                width: "100%",
                display: "flex",
                overflow: "hidden"
              }
            }, {
              default: createOriginalTagNodes,
              counter: renderCounter
            }) : maxTagCountNumeric && counter ? createOriginalTagNodes().concat(counter) : createOriginalTagNodes();
            const renderPopover = useMaxTagCount ? () => vue.h("div", {
              class: `${clsPrefix}-base-selection-popover`
            }, maxTagCountResponsive ? createOriginalTagNodes() : this.selectedOptions.map(createTag)) : void 0;
            const popoverProps2 = useMaxTagCount ? Object.assign({
              show: this.showTagsPanel,
              trigger: "hover",
              overlap: true,
              placement: "top",
              width: "trigger",
              onUpdateShow: this.onPopoverUpdateShow,
              theme: this.mergedTheme.peers.Popover,
              themeOverrides: this.mergedTheme.peerOverrides.Popover
            }, ellipsisTagPopoverProps) : null;
            const showPlaceholder = this.selected ? false : this.active ? !this.pattern && !this.isComposing : true;
            const placeholder = showPlaceholder ? vue.h("div", {
              class: `${clsPrefix}-base-selection-placeholder ${clsPrefix}-base-selection-overlay`
            }, vue.h("div", {
              class: `${clsPrefix}-base-selection-placeholder__inner`
            }, this.placeholder)) : null;
            const popoverTrigger = filterable ? vue.h("div", {
              ref: "patternInputWrapperRef",
              class: `${clsPrefix}-base-selection-tags`
            }, tags, maxTagCountResponsive ? null : input, suffix2) : vue.h("div", {
              ref: "multipleElRef",
              class: `${clsPrefix}-base-selection-tags`,
              tabindex: disabled ? void 0 : 0
            }, tags, suffix2);
            body = vue.h(vue.Fragment, null, useMaxTagCount ? vue.h(NPopover, Object.assign({}, popoverProps2, {
              scrollable: true,
              style: "max-height: calc(var(--v-target-height) * 6.6);"
            }), {
              trigger: () => popoverTrigger,
              default: renderPopover
            }) : popoverTrigger, placeholder);
          } else {
            if (filterable) {
              const hasInput = this.pattern || this.isComposing;
              const showPlaceholder = this.active ? !hasInput : !this.selected;
              const showSelectedLabel = this.active ? false : this.selected;
              body = vue.h("div", {
                ref: "patternInputWrapperRef",
                class: `${clsPrefix}-base-selection-label`,
                title: this.patternInputFocused ? void 0 : getTitleAttribute(this.label)
              }, vue.h("input", Object.assign({}, this.inputProps, {
                ref: "patternInputRef",
                class: `${clsPrefix}-base-selection-input`,
                value: this.active ? this.pattern : "",
                placeholder: "",
                readonly: disabled,
                disabled,
                tabindex: -1,
                autofocus: this.autofocus,
                onFocus: this.handlePatternInputFocus,
                onBlur: this.handlePatternInputBlur,
                onInput: this.handlePatternInputInput,
                onCompositionstart: this.handleCompositionStart,
                onCompositionend: this.handleCompositionEnd
              })), showSelectedLabel ? vue.h("div", {
                class: `${clsPrefix}-base-selection-label__render-label ${clsPrefix}-base-selection-overlay`,
                key: "input"
              }, vue.h("div", {
                class: `${clsPrefix}-base-selection-overlay__wrapper`
              }, renderTag ? renderTag({
                option: this.selectedOption,
                handleClose: () => {
                }
              }) : renderLabel ? renderLabel(this.selectedOption, true) : render$1(this.label, this.selectedOption, true))) : null, showPlaceholder ? vue.h("div", {
                class: `${clsPrefix}-base-selection-placeholder ${clsPrefix}-base-selection-overlay`,
                key: "placeholder"
              }, vue.h("div", {
                class: `${clsPrefix}-base-selection-overlay__wrapper`
              }, this.filterablePlaceholder)) : null, suffix2);
            } else {
              body = vue.h("div", {
                ref: "singleElRef",
                class: `${clsPrefix}-base-selection-label`,
                tabindex: this.disabled ? void 0 : 0
              }, this.label !== void 0 ? vue.h("div", {
                class: `${clsPrefix}-base-selection-input`,
                title: getTitleAttribute(this.label),
                key: "input"
              }, vue.h("div", {
                class: `${clsPrefix}-base-selection-input__content`
              }, renderTag ? renderTag({
                option: this.selectedOption,
                handleClose: () => {
                }
              }) : renderLabel ? renderLabel(this.selectedOption, true) : render$1(this.label, this.selectedOption, true))) : vue.h("div", {
                class: `${clsPrefix}-base-selection-placeholder ${clsPrefix}-base-selection-overlay`,
                key: "placeholder"
              }, vue.h("div", {
                class: `${clsPrefix}-base-selection-placeholder__inner`
              }, this.placeholder)), suffix2);
            }
          }
          return vue.h("div", {
            ref: "selfRef",
            class: [`${clsPrefix}-base-selection`, this.rtlEnabled && `${clsPrefix}-base-selection--rtl`, this.themeClass, status && `${clsPrefix}-base-selection--${status}-status`, {
              [`${clsPrefix}-base-selection--active`]: this.active,
              [`${clsPrefix}-base-selection--selected`]: this.selected || this.active && this.pattern,
              [`${clsPrefix}-base-selection--disabled`]: this.disabled,
              [`${clsPrefix}-base-selection--multiple`]: this.multiple,
              // focus is not controlled by selection itself since it always need
              // to be managed together with menu. provide :focus style will cause
              // many redundant codes.
              [`${clsPrefix}-base-selection--focus`]: this.focused
            }],
            style: this.cssVars,
            onClick: this.onClick,
            onMouseenter: this.handleMouseEnter,
            onMouseleave: this.handleMouseLeave,
            onKeydown: this.onKeydown,
            onFocusin: this.handleFocusin,
            onFocusout: this.handleFocusout,
            onMousedown: this.handleMouseDown
          }, body, bordered ? vue.h("div", {
            class: `${clsPrefix}-base-selection__border`
          }) : null, bordered ? vue.h("div", {
            class: `${clsPrefix}-base-selection__state-border`
          }) : null);
        }
      });
      const {
        cubicBezierEaseInOut: cubicBezierEaseInOut$1
      } = commonVariables$m;
      function fadeInWidthExpandTransition({
        duration: duration2 = ".2s",
        delay = ".1s"
      } = {}) {
        return [c$1("&.fade-in-width-expand-transition-leave-from, &.fade-in-width-expand-transition-enter-to", {
          opacity: 1
        }), c$1("&.fade-in-width-expand-transition-leave-to, &.fade-in-width-expand-transition-enter-from", `
 opacity: 0!important;
 margin-left: 0!important;
 margin-right: 0!important;
 `), c$1("&.fade-in-width-expand-transition-leave-active", `
 overflow: hidden;
 transition:
 opacity ${duration2} ${cubicBezierEaseInOut$1},
 max-width ${duration2} ${cubicBezierEaseInOut$1} ${delay},
 margin-left ${duration2} ${cubicBezierEaseInOut$1} ${delay},
 margin-right ${duration2} ${cubicBezierEaseInOut$1} ${delay};
 `), c$1("&.fade-in-width-expand-transition-enter-active", `
 overflow: hidden;
 transition:
 opacity ${duration2} ${cubicBezierEaseInOut$1} ${delay},
 max-width ${duration2} ${cubicBezierEaseInOut$1},
 margin-left ${duration2} ${cubicBezierEaseInOut$1},
 margin-right ${duration2} ${cubicBezierEaseInOut$1};
 `)];
      }
      const commonVars$b = {
        iconMargin: "11px 8px 0 12px",
        iconMarginRtl: "11px 12px 0 8px",
        iconSize: "24px",
        closeIconSize: "16px",
        closeSize: "20px",
        closeMargin: "13px 14px 0 0",
        closeMarginRtl: "13px 0 0 14px",
        padding: "13px"
      };
      const alertDark = {
        name: "Alert",
        common: derived$1,
        self(vars) {
          const {
            lineHeight: lineHeight2,
            borderRadius,
            fontWeightStrong,
            dividerColor,
            inputColor,
            textColor1,
            textColor2,
            closeColorHover,
            closeColorPressed,
            closeIconColor,
            closeIconColorHover,
            closeIconColorPressed,
            infoColorSuppl,
            successColorSuppl,
            warningColorSuppl,
            errorColorSuppl,
            fontSize: fontSize2
          } = vars;
          return Object.assign(Object.assign({}, commonVars$b), {
            fontSize: fontSize2,
            lineHeight: lineHeight2,
            titleFontWeight: fontWeightStrong,
            borderRadius,
            border: `1px solid ${dividerColor}`,
            color: inputColor,
            titleTextColor: textColor1,
            iconColor: textColor2,
            contentTextColor: textColor2,
            closeBorderRadius: borderRadius,
            closeColorHover,
            closeColorPressed,
            closeIconColor,
            closeIconColorHover,
            closeIconColorPressed,
            borderInfo: `1px solid ${changeColor(infoColorSuppl, {
            alpha: 0.35
          })}`,
            colorInfo: changeColor(infoColorSuppl, {
              alpha: 0.25
            }),
            titleTextColorInfo: textColor1,
            iconColorInfo: infoColorSuppl,
            contentTextColorInfo: textColor2,
            closeColorHoverInfo: closeColorHover,
            closeColorPressedInfo: closeColorPressed,
            closeIconColorInfo: closeIconColor,
            closeIconColorHoverInfo: closeIconColorHover,
            closeIconColorPressedInfo: closeIconColorPressed,
            borderSuccess: `1px solid ${changeColor(successColorSuppl, {
            alpha: 0.35
          })}`,
            colorSuccess: changeColor(successColorSuppl, {
              alpha: 0.25
            }),
            titleTextColorSuccess: textColor1,
            iconColorSuccess: successColorSuppl,
            contentTextColorSuccess: textColor2,
            closeColorHoverSuccess: closeColorHover,
            closeColorPressedSuccess: closeColorPressed,
            closeIconColorSuccess: closeIconColor,
            closeIconColorHoverSuccess: closeIconColorHover,
            closeIconColorPressedSuccess: closeIconColorPressed,
            borderWarning: `1px solid ${changeColor(warningColorSuppl, {
            alpha: 0.35
          })}`,
            colorWarning: changeColor(warningColorSuppl, {
              alpha: 0.25
            }),
            titleTextColorWarning: textColor1,
            iconColorWarning: warningColorSuppl,
            contentTextColorWarning: textColor2,
            closeColorHoverWarning: closeColorHover,
            closeColorPressedWarning: closeColorPressed,
            closeIconColorWarning: closeIconColor,
            closeIconColorHoverWarning: closeIconColorHover,
            closeIconColorPressedWarning: closeIconColorPressed,
            borderError: `1px solid ${changeColor(errorColorSuppl, {
            alpha: 0.35
          })}`,
            colorError: changeColor(errorColorSuppl, {
              alpha: 0.25
            }),
            titleTextColorError: textColor1,
            iconColorError: errorColorSuppl,
            contentTextColorError: textColor2,
            closeColorHoverError: closeColorHover,
            closeColorPressedError: closeColorPressed,
            closeIconColorError: closeIconColor,
            closeIconColorHoverError: closeIconColorHover,
            closeIconColorPressedError: closeIconColorPressed
          });
        }
      };
      function self$1c(vars) {
        const {
          lineHeight: lineHeight2,
          borderRadius,
          fontWeightStrong,
          baseColor,
          dividerColor,
          actionColor,
          textColor1,
          textColor2,
          closeColorHover,
          closeColorPressed,
          closeIconColor,
          closeIconColorHover,
          closeIconColorPressed,
          infoColor,
          successColor,
          warningColor,
          errorColor,
          fontSize: fontSize2
        } = vars;
        return Object.assign(Object.assign({}, commonVars$b), {
          fontSize: fontSize2,
          lineHeight: lineHeight2,
          titleFontWeight: fontWeightStrong,
          borderRadius,
          border: `1px solid ${dividerColor}`,
          color: actionColor,
          titleTextColor: textColor1,
          iconColor: textColor2,
          contentTextColor: textColor2,
          closeBorderRadius: borderRadius,
          closeColorHover,
          closeColorPressed,
          closeIconColor,
          closeIconColorHover,
          closeIconColorPressed,
          borderInfo: `1px solid ${composite(baseColor, changeColor(infoColor, {
          alpha: 0.25
        }))}`,
          colorInfo: composite(baseColor, changeColor(infoColor, {
            alpha: 0.08
          })),
          titleTextColorInfo: textColor1,
          iconColorInfo: infoColor,
          contentTextColorInfo: textColor2,
          closeColorHoverInfo: closeColorHover,
          closeColorPressedInfo: closeColorPressed,
          closeIconColorInfo: closeIconColor,
          closeIconColorHoverInfo: closeIconColorHover,
          closeIconColorPressedInfo: closeIconColorPressed,
          borderSuccess: `1px solid ${composite(baseColor, changeColor(successColor, {
          alpha: 0.25
        }))}`,
          colorSuccess: composite(baseColor, changeColor(successColor, {
            alpha: 0.08
          })),
          titleTextColorSuccess: textColor1,
          iconColorSuccess: successColor,
          contentTextColorSuccess: textColor2,
          closeColorHoverSuccess: closeColorHover,
          closeColorPressedSuccess: closeColorPressed,
          closeIconColorSuccess: closeIconColor,
          closeIconColorHoverSuccess: closeIconColorHover,
          closeIconColorPressedSuccess: closeIconColorPressed,
          borderWarning: `1px solid ${composite(baseColor, changeColor(warningColor, {
          alpha: 0.33
        }))}`,
          colorWarning: composite(baseColor, changeColor(warningColor, {
            alpha: 0.08
          })),
          titleTextColorWarning: textColor1,
          iconColorWarning: warningColor,
          contentTextColorWarning: textColor2,
          closeColorHoverWarning: closeColorHover,
          closeColorPressedWarning: closeColorPressed,
          closeIconColorWarning: closeIconColor,
          closeIconColorHoverWarning: closeIconColorHover,
          closeIconColorPressedWarning: closeIconColorPressed,
          borderError: `1px solid ${composite(baseColor, changeColor(errorColor, {
          alpha: 0.25
        }))}`,
          colorError: composite(baseColor, changeColor(errorColor, {
            alpha: 0.08
          })),
          titleTextColorError: textColor1,
          iconColorError: errorColor,
          contentTextColorError: textColor2,
          closeColorHoverError: closeColorHover,
          closeColorPressedError: closeColorPressed,
          closeIconColorError: closeIconColor,
          closeIconColorHoverError: closeIconColorHover,
          closeIconColorPressedError: closeIconColorPressed
        });
      }
      const alertLight = {
        name: "Alert",
        common: derived,
        self: self$1c
      };
      const commonVars$a = {
        linkFontSize: "13px",
        linkPadding: "0 0 0 16px",
        railWidth: "4px"
      };
      function self$1b(vars) {
        const {
          borderRadius,
          railColor,
          primaryColor,
          primaryColorHover,
          primaryColorPressed,
          textColor2
        } = vars;
        return Object.assign(Object.assign({}, commonVars$a), {
          borderRadius,
          railColor,
          railColorActive: primaryColor,
          linkColor: changeColor(primaryColor, {
            alpha: 0.15
          }),
          linkTextColor: textColor2,
          linkTextColorHover: primaryColorHover,
          linkTextColorPressed: primaryColorPressed,
          linkTextColorActive: primaryColor
        });
      }
      const anchorLight = {
        name: "Anchor",
        common: derived,
        self: self$1b
      };
      const anchorDark = {
        name: "Anchor",
        common: derived$1,
        self: self$1b
      };
      function getIsGroup(option) {
        return option.type === "group";
      }
      function getIgnored(option) {
        return option.type === "ignored";
      }
      function patternMatched(pattern, value) {
        try {
          return !!(1 + value.toString().toLowerCase().indexOf(pattern.trim().toLowerCase()));
        } catch (_a) {
          return false;
        }
      }
      function createTmOptions(valueField, childrenField) {
        const options = {
          getIsGroup,
          getIgnored,
          getKey(option) {
            if (getIsGroup(option)) {
              return option.name || option.key || "key-required";
            }
            return option[valueField];
          },
          getChildren(option) {
            return option[childrenField];
          }
        };
        return options;
      }
      function filterOptions(originalOpts, filter, pattern, childrenField) {
        if (!filter) return originalOpts;
        function traverse(options) {
          if (!Array.isArray(options)) return [];
          const filteredOptions = [];
          for (const option of options) {
            if (getIsGroup(option)) {
              const children = traverse(option[childrenField]);
              if (children.length) {
                filteredOptions.push(Object.assign({}, option, {
                  [childrenField]: children
                }));
              }
            } else if (getIgnored(option)) {
              continue;
            } else if (filter(pattern, option)) {
              filteredOptions.push(option);
            }
          }
          return filteredOptions;
        }
        return traverse(originalOpts);
      }
      function createValOptMap(options, valueField, childrenField) {
        const valOptMap = /* @__PURE__ */ new Map();
        options.forEach((option) => {
          if (getIsGroup(option)) {
            option[childrenField].forEach((selectGroupOption) => {
              valOptMap.set(selectGroupOption[valueField], selectGroupOption);
            });
          } else {
            valOptMap.set(option[valueField], option);
          }
        });
        return valOptMap;
      }
      const isChrome = isBrowser$2 && "chrome" in window;
      isBrowser$2 && navigator.userAgent.includes("Firefox");
      const isSafari = isBrowser$2 && navigator.userAgent.includes("Safari") && !isChrome;
      const commonVariables$i = {
        paddingTiny: "0 8px",
        paddingSmall: "0 10px",
        paddingMedium: "0 12px",
        paddingLarge: "0 14px",
        clearSize: "16px"
      };
      const inputDark = {
        name: "Input",
        common: derived$1,
        self(vars) {
          const {
            textColor2,
            textColor3,
            textColorDisabled,
            primaryColor,
            primaryColorHover,
            inputColor,
            inputColorDisabled,
            warningColor,
            warningColorHover,
            errorColor,
            errorColorHover,
            borderRadius,
            lineHeight: lineHeight2,
            fontSizeTiny,
            fontSizeSmall,
            fontSizeMedium,
            fontSizeLarge,
            heightTiny,
            heightSmall,
            heightMedium,
            heightLarge,
            clearColor,
            clearColorHover,
            clearColorPressed,
            placeholderColor,
            placeholderColorDisabled,
            iconColor,
            iconColorDisabled,
            iconColorHover,
            iconColorPressed
          } = vars;
          return Object.assign(Object.assign({}, commonVariables$i), {
            countTextColorDisabled: textColorDisabled,
            countTextColor: textColor3,
            heightTiny,
            heightSmall,
            heightMedium,
            heightLarge,
            fontSizeTiny,
            fontSizeSmall,
            fontSizeMedium,
            fontSizeLarge,
            lineHeight: lineHeight2,
            lineHeightTextarea: lineHeight2,
            borderRadius,
            iconSize: "16px",
            groupLabelColor: inputColor,
            textColor: textColor2,
            textColorDisabled,
            textDecorationColor: textColor2,
            groupLabelTextColor: textColor2,
            caretColor: primaryColor,
            placeholderColor,
            placeholderColorDisabled,
            color: inputColor,
            colorDisabled: inputColorDisabled,
            colorFocus: changeColor(primaryColor, {
              alpha: 0.1
            }),
            groupLabelBorder: "1px solid #0000",
            border: "1px solid #0000",
            borderHover: `1px solid ${primaryColorHover}`,
            borderDisabled: "1px solid #0000",
            borderFocus: `1px solid ${primaryColorHover}`,
            boxShadowFocus: `0 0 8px 0 ${changeColor(primaryColor, {
            alpha: 0.3
          })}`,
            loadingColor: primaryColor,
            // warning
            loadingColorWarning: warningColor,
            borderWarning: `1px solid ${warningColor}`,
            borderHoverWarning: `1px solid ${warningColorHover}`,
            colorFocusWarning: changeColor(warningColor, {
              alpha: 0.1
            }),
            borderFocusWarning: `1px solid ${warningColorHover}`,
            boxShadowFocusWarning: `0 0 8px 0 ${changeColor(warningColor, {
            alpha: 0.3
          })}`,
            caretColorWarning: warningColor,
            // error
            loadingColorError: errorColor,
            borderError: `1px solid ${errorColor}`,
            borderHoverError: `1px solid ${errorColorHover}`,
            colorFocusError: changeColor(errorColor, {
              alpha: 0.1
            }),
            borderFocusError: `1px solid ${errorColorHover}`,
            boxShadowFocusError: `0 0 8px 0 ${changeColor(errorColor, {
            alpha: 0.3
          })}`,
            caretColorError: errorColor,
            clearColor,
            clearColorHover,
            clearColorPressed,
            iconColor,
            iconColorDisabled,
            iconColorHover,
            iconColorPressed,
            suffixTextColor: textColor2
          });
        }
      };
      function self$1a(vars) {
        const {
          textColor2,
          textColor3,
          textColorDisabled,
          primaryColor,
          primaryColorHover,
          inputColor,
          inputColorDisabled,
          borderColor,
          warningColor,
          warningColorHover,
          errorColor,
          errorColorHover,
          borderRadius,
          lineHeight: lineHeight2,
          fontSizeTiny,
          fontSizeSmall,
          fontSizeMedium,
          fontSizeLarge,
          heightTiny,
          heightSmall,
          heightMedium,
          heightLarge,
          actionColor,
          clearColor,
          clearColorHover,
          clearColorPressed,
          placeholderColor,
          placeholderColorDisabled,
          iconColor,
          iconColorDisabled,
          iconColorHover,
          iconColorPressed
        } = vars;
        return Object.assign(Object.assign({}, commonVariables$i), {
          countTextColorDisabled: textColorDisabled,
          countTextColor: textColor3,
          heightTiny,
          heightSmall,
          heightMedium,
          heightLarge,
          fontSizeTiny,
          fontSizeSmall,
          fontSizeMedium,
          fontSizeLarge,
          lineHeight: lineHeight2,
          lineHeightTextarea: lineHeight2,
          borderRadius,
          iconSize: "16px",
          groupLabelColor: actionColor,
          groupLabelTextColor: textColor2,
          textColor: textColor2,
          textColorDisabled,
          textDecorationColor: textColor2,
          caretColor: primaryColor,
          placeholderColor,
          placeholderColorDisabled,
          color: inputColor,
          colorDisabled: inputColorDisabled,
          colorFocus: inputColor,
          groupLabelBorder: `1px solid ${borderColor}`,
          border: `1px solid ${borderColor}`,
          borderHover: `1px solid ${primaryColorHover}`,
          borderDisabled: `1px solid ${borderColor}`,
          borderFocus: `1px solid ${primaryColorHover}`,
          boxShadowFocus: `0 0 0 2px ${changeColor(primaryColor, {
          alpha: 0.2
        })}`,
          loadingColor: primaryColor,
          // warning
          loadingColorWarning: warningColor,
          borderWarning: `1px solid ${warningColor}`,
          borderHoverWarning: `1px solid ${warningColorHover}`,
          colorFocusWarning: inputColor,
          borderFocusWarning: `1px solid ${warningColorHover}`,
          boxShadowFocusWarning: `0 0 0 2px ${changeColor(warningColor, {
          alpha: 0.2
        })}`,
          caretColorWarning: warningColor,
          // error
          loadingColorError: errorColor,
          borderError: `1px solid ${errorColor}`,
          borderHoverError: `1px solid ${errorColorHover}`,
          colorFocusError: inputColor,
          borderFocusError: `1px solid ${errorColorHover}`,
          boxShadowFocusError: `0 0 0 2px ${changeColor(errorColor, {
          alpha: 0.2
        })}`,
          caretColorError: errorColor,
          clearColor,
          clearColorHover,
          clearColorPressed,
          iconColor,
          iconColorDisabled,
          iconColorHover,
          iconColorPressed,
          suffixTextColor: textColor2
        });
      }
      const inputLight = {
        name: "Input",
        common: derived,
        self: self$1a
      };
      const inputInjectionKey = createInjectionKey("n-input");
      function len(s) {
        let count = 0;
        for (const _ of s) {
          count++;
        }
        return count;
      }
      function isEmptyInputValue(value) {
        return value === "" || value == null;
      }
      function useCursor(inputElRef) {
        const selectionRef = vue.ref(null);
        function recordCursor() {
          const {
            value: input
          } = inputElRef;
          if (!(input === null || input === void 0 ? void 0 : input.focus)) {
            reset();
            return;
          }
          const {
            selectionStart,
            selectionEnd,
            value
          } = input;
          if (selectionStart == null || selectionEnd == null) {
            reset();
            return;
          }
          selectionRef.value = {
            start: selectionStart,
            end: selectionEnd,
            beforeText: value.slice(0, selectionStart),
            afterText: value.slice(selectionEnd)
          };
        }
        function restoreCursor() {
          var _a;
          const {
            value: selection
          } = selectionRef;
          const {
            value: inputEl
          } = inputElRef;
          if (!selection || !inputEl) {
            return;
          }
          const {
            value
          } = inputEl;
          const {
            start,
            beforeText,
            afterText
          } = selection;
          let startPos = value.length;
          if (value.endsWith(afterText)) {
            startPos = value.length - afterText.length;
          } else if (value.startsWith(beforeText)) {
            startPos = beforeText.length;
          } else {
            const beforeLastChar = beforeText[start - 1];
            const newIndex = value.indexOf(beforeLastChar, start - 1);
            if (newIndex !== -1) {
              startPos = newIndex + 1;
            }
          }
          (_a = inputEl.setSelectionRange) === null || _a === void 0 ? void 0 : _a.call(inputEl, startPos, startPos);
        }
        function reset() {
          selectionRef.value = null;
        }
        vue.watch(inputElRef, reset);
        return {
          recordCursor,
          restoreCursor
        };
      }
      const WordCount = vue.defineComponent({
        name: "InputWordCount",
        setup(_, {
          slots
        }) {
          const {
            mergedValueRef,
            maxlengthRef,
            mergedClsPrefixRef,
            countGraphemesRef
          } = vue.inject(inputInjectionKey);
          const wordCountRef = vue.computed(() => {
            const {
              value: mergedValue
            } = mergedValueRef;
            if (mergedValue === null || Array.isArray(mergedValue)) return 0;
            return (countGraphemesRef.value || len)(mergedValue);
          });
          return () => {
            const {
              value: maxlength
            } = maxlengthRef;
            const {
              value: mergedValue
            } = mergedValueRef;
            return vue.h("span", {
              class: `${mergedClsPrefixRef.value}-input-word-count`
            }, resolveSlotWithProps(slots.default, {
              value: mergedValue === null || Array.isArray(mergedValue) ? "" : mergedValue
            }, () => [maxlength === void 0 ? wordCountRef.value : `${wordCountRef.value} / ${maxlength}`]));
          };
        }
      });
      const style$b = cB("input", `
 max-width: 100%;
 cursor: text;
 line-height: 1.5;
 z-index: auto;
 outline: none;
 box-sizing: border-box;
 position: relative;
 display: inline-flex;
 border-radius: var(--n-border-radius);
 background-color: var(--n-color);
 transition: background-color .3s var(--n-bezier);
 font-size: var(--n-font-size);
 --n-padding-vertical: calc((var(--n-height) - 1.5 * var(--n-font-size)) / 2);
`, [
        // common
        cE("input, textarea", `
 overflow: hidden;
 flex-grow: 1;
 position: relative;
 `),
        cE("input-el, textarea-el, input-mirror, textarea-mirror, separator, placeholder", `
 box-sizing: border-box;
 font-size: inherit;
 line-height: 1.5;
 font-family: inherit;
 border: none;
 outline: none;
 background-color: #0000;
 text-align: inherit;
 transition:
 -webkit-text-fill-color .3s var(--n-bezier),
 caret-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 text-decoration-color .3s var(--n-bezier);
 `),
        cE("input-el, textarea-el", `
 -webkit-appearance: none;
 scrollbar-width: none;
 width: 100%;
 min-width: 0;
 text-decoration-color: var(--n-text-decoration-color);
 color: var(--n-text-color);
 caret-color: var(--n-caret-color);
 background-color: transparent;
 `, [c$1("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb", `
 width: 0;
 height: 0;
 display: none;
 `), c$1("&::placeholder", `
 color: #0000;
 -webkit-text-fill-color: transparent !important;
 `), c$1("&:-webkit-autofill ~", [cE("placeholder", "display: none;")])]),
        cM("round", [cNotM("textarea", "border-radius: calc(var(--n-height) / 2);")]),
        cE("placeholder", `
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 overflow: hidden;
 color: var(--n-placeholder-color);
 `, [c$1("span", `
 width: 100%;
 display: inline-block;
 `)]),
        cM("textarea", [cE("placeholder", "overflow: visible;")]),
        cNotM("autosize", "width: 100%;"),
        cM("autosize", [cE("textarea-el, input-el", `
 position: absolute;
 top: 0;
 left: 0;
 height: 100%;
 `)]),
        // input
        cB("input-wrapper", `
 overflow: hidden;
 display: inline-flex;
 flex-grow: 1;
 position: relative;
 padding-left: var(--n-padding-left);
 padding-right: var(--n-padding-right);
 `),
        cE("input-mirror", `
 padding: 0;
 height: var(--n-height);
 line-height: var(--n-height);
 overflow: hidden;
 visibility: hidden;
 position: static;
 white-space: pre;
 pointer-events: none;
 `),
        cE("input-el", `
 padding: 0;
 height: var(--n-height);
 line-height: var(--n-height);
 `, [c$1("&[type=password]::-ms-reveal", "display: none;"), c$1("+", [cE("placeholder", `
 display: flex;
 align-items: center; 
 `)])]),
        cNotM("textarea", [cE("placeholder", "white-space: nowrap;")]),
        cE("eye", `
 display: flex;
 align-items: center;
 justify-content: center;
 transition: color .3s var(--n-bezier);
 `),
        // textarea
        cM("textarea", "width: 100%;", [cB("input-word-count", `
 position: absolute;
 right: var(--n-padding-right);
 bottom: var(--n-padding-vertical);
 `), cM("resizable", [cB("input-wrapper", `
 resize: vertical;
 min-height: var(--n-height);
 `)]), cE("textarea-el, textarea-mirror, placeholder", `
 height: 100%;
 padding-left: 0;
 padding-right: 0;
 padding-top: var(--n-padding-vertical);
 padding-bottom: var(--n-padding-vertical);
 word-break: break-word;
 display: inline-block;
 vertical-align: bottom;
 box-sizing: border-box;
 line-height: var(--n-line-height-textarea);
 margin: 0;
 resize: none;
 white-space: pre-wrap;
 scroll-padding-block-end: var(--n-padding-vertical);
 `), cE("textarea-mirror", `
 width: 100%;
 pointer-events: none;
 overflow: hidden;
 visibility: hidden;
 position: static;
 white-space: pre-wrap;
 overflow-wrap: break-word;
 `)]),
        // pair
        cM("pair", [cE("input-el, placeholder", "text-align: center;"), cE("separator", `
 display: flex;
 align-items: center;
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 white-space: nowrap;
 `, [cB("icon", `
 color: var(--n-icon-color);
 `), cB("base-icon", `
 color: var(--n-icon-color);
 `)])]),
        cM("disabled", `
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `, [cE("border", "border: var(--n-border-disabled);"), cE("input-el, textarea-el", `
 cursor: not-allowed;
 color: var(--n-text-color-disabled);
 text-decoration-color: var(--n-text-color-disabled);
 `), cE("placeholder", "color: var(--n-placeholder-color-disabled);"), cE("separator", "color: var(--n-text-color-disabled);", [cB("icon", `
 color: var(--n-icon-color-disabled);
 `), cB("base-icon", `
 color: var(--n-icon-color-disabled);
 `)]), cB("input-word-count", `
 color: var(--n-count-text-color-disabled);
 `), cE("suffix, prefix", "color: var(--n-text-color-disabled);", [cB("icon", `
 color: var(--n-icon-color-disabled);
 `), cB("internal-icon", `
 color: var(--n-icon-color-disabled);
 `)])]),
        cNotM("disabled", [cE("eye", `
 color: var(--n-icon-color);
 cursor: pointer;
 `, [c$1("&:hover", `
 color: var(--n-icon-color-hover);
 `), c$1("&:active", `
 color: var(--n-icon-color-pressed);
 `)]), c$1("&:hover", [cE("state-border", "border: var(--n-border-hover);")]), cM("focus", "background-color: var(--n-color-focus);", [cE("state-border", `
 border: var(--n-border-focus);
 box-shadow: var(--n-box-shadow-focus);
 `)])]),
        cE("border, state-border", `
 box-sizing: border-box;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 pointer-events: none;
 border-radius: inherit;
 border: var(--n-border);
 transition:
 box-shadow .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `),
        cE("state-border", `
 border-color: #0000;
 z-index: 1;
 `),
        cE("prefix", "margin-right: 4px;"),
        cE("suffix", `
 margin-left: 4px;
 `),
        cE("suffix, prefix", `
 transition: color .3s var(--n-bezier);
 flex-wrap: nowrap;
 flex-shrink: 0;
 line-height: var(--n-height);
 white-space: nowrap;
 display: inline-flex;
 align-items: center;
 justify-content: center;
 color: var(--n-suffix-text-color);
 `, [cB("base-loading", `
 font-size: var(--n-icon-size);
 margin: 0 2px;
 color: var(--n-loading-color);
 `), cB("base-clear", `
 font-size: var(--n-icon-size);
 `, [cE("placeholder", [cB("base-icon", `
 transition: color .3s var(--n-bezier);
 color: var(--n-icon-color);
 font-size: var(--n-icon-size);
 `)])]), c$1(">", [cB("icon", `
 transition: color .3s var(--n-bezier);
 color: var(--n-icon-color);
 font-size: var(--n-icon-size);
 `)]), cB("base-icon", `
 font-size: var(--n-icon-size);
 `)]),
        cB("input-word-count", `
 pointer-events: none;
 line-height: 1.5;
 font-size: .85em;
 color: var(--n-count-text-color);
 transition: color .3s var(--n-bezier);
 margin-left: 4px;
 font-variant: tabular-nums;
 `),
        ["warning", "error"].map((status) => cM(`${status}-status`, [cNotM("disabled", [cB("base-loading", `
 color: var(--n-loading-color-${status})
 `), cE("input-el, textarea-el", `
 caret-color: var(--n-caret-color-${status});
 `), cE("state-border", `
 border: var(--n-border-${status});
 `), c$1("&:hover", [cE("state-border", `
 border: var(--n-border-hover-${status});
 `)]), c$1("&:focus", `
 background-color: var(--n-color-focus-${status});
 `, [cE("state-border", `
 box-shadow: var(--n-box-shadow-focus-${status});
 border: var(--n-border-focus-${status});
 `)]), cM("focus", `
 background-color: var(--n-color-focus-${status});
 `, [cE("state-border", `
 box-shadow: var(--n-box-shadow-focus-${status});
 border: var(--n-border-focus-${status});
 `)])])]))
      ]);
      const safariStyle = cB("input", [cM("disabled", [cE("input-el, textarea-el", `
 -webkit-text-fill-color: var(--n-text-color-disabled);
 `)])]);
      const inputProps = Object.assign(Object.assign({}, useTheme.props), {
        bordered: {
          type: Boolean,
          default: void 0
        },
        type: {
          type: String,
          default: "text"
        },
        placeholder: [Array, String],
        defaultValue: {
          type: [String, Array],
          default: null
        },
        value: [String, Array],
        disabled: {
          type: Boolean,
          default: void 0
        },
        size: String,
        rows: {
          type: [Number, String],
          default: 3
        },
        round: Boolean,
        minlength: [String, Number],
        maxlength: [String, Number],
        clearable: Boolean,
        autosize: {
          type: [Boolean, Object],
          default: false
        },
        pair: Boolean,
        separator: String,
        readonly: {
          type: [String, Boolean],
          default: false
        },
        passivelyActivated: Boolean,
        showPasswordOn: String,
        stateful: {
          type: Boolean,
          default: true
        },
        autofocus: Boolean,
        inputProps: Object,
        resizable: {
          type: Boolean,
          default: true
        },
        showCount: Boolean,
        loading: {
          type: Boolean,
          default: void 0
        },
        allowInput: Function,
        renderCount: Function,
        onMousedown: Function,
        onKeydown: Function,
        onKeyup: [Function, Array],
        onInput: [Function, Array],
        onFocus: [Function, Array],
        onBlur: [Function, Array],
        onClick: [Function, Array],
        onChange: [Function, Array],
        onClear: [Function, Array],
        countGraphemes: Function,
        status: String,
        "onUpdate:value": [Function, Array],
        onUpdateValue: [Function, Array],
        /** private */
        textDecoration: [String, Array],
        attrSize: {
          type: Number,
          default: 20
        },
        onInputBlur: [Function, Array],
        onInputFocus: [Function, Array],
        onDeactivate: [Function, Array],
        onActivate: [Function, Array],
        onWrapperFocus: [Function, Array],
        onWrapperBlur: [Function, Array],
        internalDeactivateOnEnter: Boolean,
        internalForceFocus: Boolean,
        internalLoadingBeforeSuffix: {
          type: Boolean,
          default: true
        },
        /** deprecated */
        showPasswordToggle: Boolean
      });
      const NInput = vue.defineComponent({
        name: "Input",
        props: inputProps,
        setup(props) {
          const {
            mergedClsPrefixRef,
            mergedBorderedRef,
            inlineThemeDisabled,
            mergedRtlRef
          } = useConfig(props);
          const themeRef = useTheme("Input", "-input", style$b, inputLight, props, mergedClsPrefixRef);
          if (isSafari) {
            useStyle("-input-safari", safariStyle, mergedClsPrefixRef);
          }
          const wrapperElRef = vue.ref(null);
          const textareaElRef = vue.ref(null);
          const textareaMirrorElRef = vue.ref(null);
          const inputMirrorElRef = vue.ref(null);
          const inputElRef = vue.ref(null);
          const inputEl2Ref = vue.ref(null);
          const currentFocusedInputRef = vue.ref(null);
          const focusedInputCursorControl = useCursor(currentFocusedInputRef);
          const textareaScrollbarInstRef = vue.ref(null);
          const {
            localeRef
          } = useLocale("Input");
          const uncontrolledValueRef = vue.ref(props.defaultValue);
          const controlledValueRef = vue.toRef(props, "value");
          const mergedValueRef = useMergedState(controlledValueRef, uncontrolledValueRef);
          const formItem = useFormItem(props);
          const {
            mergedSizeRef,
            mergedDisabledRef,
            mergedStatusRef
          } = formItem;
          const focusedRef = vue.ref(false);
          const hoverRef = vue.ref(false);
          const isComposingRef2 = vue.ref(false);
          const activatedRef = vue.ref(false);
          let syncSource = null;
          const mergedPlaceholderRef = vue.computed(() => {
            const {
              placeholder,
              pair
            } = props;
            if (pair) {
              if (Array.isArray(placeholder)) {
                return placeholder;
              } else if (placeholder === void 0) {
                return ["", ""];
              }
              return [placeholder, placeholder];
            } else if (placeholder === void 0) {
              return [localeRef.value.placeholder];
            } else {
              return [placeholder];
            }
          });
          const showPlaceholder1Ref = vue.computed(() => {
            const {
              value: isComposing
            } = isComposingRef2;
            const {
              value: mergedValue
            } = mergedValueRef;
            const {
              value: mergedPlaceholder
            } = mergedPlaceholderRef;
            return !isComposing && (isEmptyInputValue(mergedValue) || Array.isArray(mergedValue) && isEmptyInputValue(mergedValue[0])) && mergedPlaceholder[0];
          });
          const showPlaceholder2Ref = vue.computed(() => {
            const {
              value: isComposing
            } = isComposingRef2;
            const {
              value: mergedValue
            } = mergedValueRef;
            const {
              value: mergedPlaceholder
            } = mergedPlaceholderRef;
            return !isComposing && mergedPlaceholder[1] && (isEmptyInputValue(mergedValue) || Array.isArray(mergedValue) && isEmptyInputValue(mergedValue[1]));
          });
          const mergedFocusRef = useMemo(() => {
            return props.internalForceFocus || focusedRef.value;
          });
          const showClearButton = useMemo(() => {
            if (mergedDisabledRef.value || props.readonly || !props.clearable || !mergedFocusRef.value && !hoverRef.value) {
              return false;
            }
            const {
              value: mergedValue
            } = mergedValueRef;
            const {
              value: mergedFocus
            } = mergedFocusRef;
            if (props.pair) {
              return !!(Array.isArray(mergedValue) && (mergedValue[0] || mergedValue[1])) && (hoverRef.value || mergedFocus);
            } else {
              return !!mergedValue && (hoverRef.value || mergedFocus);
            }
          });
          const mergedShowPasswordOnRef = vue.computed(() => {
            const {
              showPasswordOn
            } = props;
            if (showPasswordOn) {
              return showPasswordOn;
            }
            if (props.showPasswordToggle) return "click";
            return void 0;
          });
          const passwordVisibleRef = vue.ref(false);
          const textDecorationStyleRef = vue.computed(() => {
            const {
              textDecoration
            } = props;
            if (!textDecoration) return ["", ""];
            if (Array.isArray(textDecoration)) {
              return textDecoration.map((v) => ({
                textDecoration: v
              }));
            }
            return [{
              textDecoration
            }];
          });
          const textAreaScrollContainerWidthRef = vue.ref(void 0);
          const updateTextAreaStyle = () => {
            var _a, _b;
            if (props.type === "textarea") {
              const {
                autosize
              } = props;
              if (autosize) {
                textAreaScrollContainerWidthRef.value = (_b = (_a = textareaScrollbarInstRef.value) === null || _a === void 0 ? void 0 : _a.$el) === null || _b === void 0 ? void 0 : _b.offsetWidth;
              }
              if (!textareaElRef.value) return;
              if (typeof autosize === "boolean") return;
              const {
                paddingTop: stylePaddingTop,
                paddingBottom: stylePaddingBottom,
                lineHeight: styleLineHeight
              } = window.getComputedStyle(textareaElRef.value);
              const paddingTop = Number(stylePaddingTop.slice(0, -2));
              const paddingBottom = Number(stylePaddingBottom.slice(0, -2));
              const lineHeight2 = Number(styleLineHeight.slice(0, -2));
              const {
                value: textareaMirrorEl
              } = textareaMirrorElRef;
              if (!textareaMirrorEl) return;
              if (autosize.minRows) {
                const minRows = Math.max(autosize.minRows, 1);
                const styleMinHeight = `${paddingTop + paddingBottom + lineHeight2 * minRows}px`;
                textareaMirrorEl.style.minHeight = styleMinHeight;
              }
              if (autosize.maxRows) {
                const styleMaxHeight = `${paddingTop + paddingBottom + lineHeight2 * autosize.maxRows}px`;
                textareaMirrorEl.style.maxHeight = styleMaxHeight;
              }
            }
          };
          const maxlengthRef = vue.computed(() => {
            const {
              maxlength
            } = props;
            return maxlength === void 0 ? void 0 : Number(maxlength);
          });
          vue.onMounted(() => {
            const {
              value
            } = mergedValueRef;
            if (!Array.isArray(value)) {
              syncMirror(value);
            }
          });
          const vm = vue.getCurrentInstance().proxy;
          function doUpdateValue(value, meta) {
            const {
              onUpdateValue,
              "onUpdate:value": _onUpdateValue,
              onInput
            } = props;
            const {
              nTriggerFormInput
            } = formItem;
            if (onUpdateValue) call(onUpdateValue, value, meta);
            if (_onUpdateValue) call(_onUpdateValue, value, meta);
            if (onInput) call(onInput, value, meta);
            uncontrolledValueRef.value = value;
            nTriggerFormInput();
          }
          function doChange(value, meta) {
            const {
              onChange
            } = props;
            const {
              nTriggerFormChange
            } = formItem;
            if (onChange) call(onChange, value, meta);
            uncontrolledValueRef.value = value;
            nTriggerFormChange();
          }
          function doBlur(e) {
            const {
              onBlur
            } = props;
            const {
              nTriggerFormBlur
            } = formItem;
            if (onBlur) call(onBlur, e);
            nTriggerFormBlur();
          }
          function doFocus(e) {
            const {
              onFocus
            } = props;
            const {
              nTriggerFormFocus
            } = formItem;
            if (onFocus) call(onFocus, e);
            nTriggerFormFocus();
          }
          function doClear(e) {
            const {
              onClear
            } = props;
            if (onClear) call(onClear, e);
          }
          function doUpdateValueBlur(e) {
            const {
              onInputBlur
            } = props;
            if (onInputBlur) call(onInputBlur, e);
          }
          function doUpdateValueFocus(e) {
            const {
              onInputFocus
            } = props;
            if (onInputFocus) call(onInputFocus, e);
          }
          function doDeactivate() {
            const {
              onDeactivate
            } = props;
            if (onDeactivate) call(onDeactivate);
          }
          function doActivate() {
            const {
              onActivate
            } = props;
            if (onActivate) call(onActivate);
          }
          function doClick(e) {
            const {
              onClick
            } = props;
            if (onClick) call(onClick, e);
          }
          function doWrapperFocus(e) {
            const {
              onWrapperFocus
            } = props;
            if (onWrapperFocus) call(onWrapperFocus, e);
          }
          function doWrapperBlur(e) {
            const {
              onWrapperBlur
            } = props;
            if (onWrapperBlur) call(onWrapperBlur, e);
          }
          function handleCompositionStart() {
            isComposingRef2.value = true;
          }
          function handleCompositionEnd(e) {
            isComposingRef2.value = false;
            if (e.target === inputEl2Ref.value) {
              handleInput(e, 1);
            } else {
              handleInput(e, 0);
            }
          }
          function handleInput(e, index = 0, event = "input") {
            const targetValue = e.target.value;
            syncMirror(targetValue);
            if (e instanceof InputEvent && !e.isComposing) {
              isComposingRef2.value = false;
            }
            if (props.type === "textarea") {
              const {
                value: textareaScrollbarInst
              } = textareaScrollbarInstRef;
              if (textareaScrollbarInst) {
                textareaScrollbarInst.syncUnifiedContainer();
              }
            }
            syncSource = targetValue;
            if (isComposingRef2.value) return;
            focusedInputCursorControl.recordCursor();
            const isIncomingValueValid = allowInput(targetValue);
            if (isIncomingValueValid) {
              if (!props.pair) {
                if (event === "input") {
                  doUpdateValue(targetValue, {
                    source: index
                  });
                } else {
                  doChange(targetValue, {
                    source: index
                  });
                }
              } else {
                let {
                  value
                } = mergedValueRef;
                if (!Array.isArray(value)) {
                  value = ["", ""];
                } else {
                  value = [value[0], value[1]];
                }
                value[index] = targetValue;
                if (event === "input") {
                  doUpdateValue(value, {
                    source: index
                  });
                } else {
                  doChange(value, {
                    source: index
                  });
                }
              }
            }
            vm.$forceUpdate();
            if (!isIncomingValueValid) {
              void vue.nextTick(focusedInputCursorControl.restoreCursor);
            }
          }
          function allowInput(value) {
            const {
              countGraphemes,
              maxlength,
              minlength
            } = props;
            if (countGraphemes) {
              let graphemesCount;
              if (maxlength !== void 0) {
                if (graphemesCount === void 0) {
                  graphemesCount = countGraphemes(value);
                }
                if (graphemesCount > Number(maxlength)) return false;
              }
              if (minlength !== void 0) {
                if (graphemesCount === void 0) {
                  graphemesCount = countGraphemes(value);
                }
                if (graphemesCount < Number(maxlength)) return false;
              }
            }
            const {
              allowInput: allowInput2
            } = props;
            if (typeof allowInput2 === "function") {
              return allowInput2(value);
            }
            return true;
          }
          function handleInputBlur(e) {
            doUpdateValueBlur(e);
            if (e.relatedTarget === wrapperElRef.value) {
              doDeactivate();
            }
            if (!(e.relatedTarget !== null && (e.relatedTarget === inputElRef.value || e.relatedTarget === inputEl2Ref.value || e.relatedTarget === textareaElRef.value))) {
              activatedRef.value = false;
            }
            dealWithEvent(e, "blur");
            currentFocusedInputRef.value = null;
          }
          function handleInputFocus(e, index) {
            doUpdateValueFocus(e);
            focusedRef.value = true;
            activatedRef.value = true;
            doActivate();
            dealWithEvent(e, "focus");
            if (index === 0) {
              currentFocusedInputRef.value = inputElRef.value;
            } else if (index === 1) {
              currentFocusedInputRef.value = inputEl2Ref.value;
            } else if (index === 2) {
              currentFocusedInputRef.value = textareaElRef.value;
            }
          }
          function handleWrapperBlur(e) {
            if (props.passivelyActivated) {
              doWrapperBlur(e);
              dealWithEvent(e, "blur");
            }
          }
          function handleWrapperFocus(e) {
            if (props.passivelyActivated) {
              focusedRef.value = true;
              doWrapperFocus(e);
              dealWithEvent(e, "focus");
            }
          }
          function dealWithEvent(e, type) {
            if (e.relatedTarget !== null && (e.relatedTarget === inputElRef.value || e.relatedTarget === inputEl2Ref.value || e.relatedTarget === textareaElRef.value || e.relatedTarget === wrapperElRef.value)) ;
            else {
              if (type === "focus") {
                doFocus(e);
                focusedRef.value = true;
              } else if (type === "blur") {
                doBlur(e);
                focusedRef.value = false;
              }
            }
          }
          function handleChange(e, index) {
            handleInput(e, index, "change");
          }
          function handleClick(e) {
            doClick(e);
          }
          function handleClear(e) {
            doClear(e);
            clearValue();
          }
          function clearValue() {
            if (props.pair) {
              doUpdateValue(["", ""], {
                source: "clear"
              });
              doChange(["", ""], {
                source: "clear"
              });
            } else {
              doUpdateValue("", {
                source: "clear"
              });
              doChange("", {
                source: "clear"
              });
            }
          }
          function handleMouseDown(e) {
            const {
              onMousedown
            } = props;
            if (onMousedown) onMousedown(e);
            const {
              tagName
            } = e.target;
            if (tagName !== "INPUT" && tagName !== "TEXTAREA") {
              if (props.resizable) {
                const {
                  value: wrapperEl
                } = wrapperElRef;
                if (wrapperEl) {
                  const {
                    left,
                    top,
                    width,
                    height
                  } = wrapperEl.getBoundingClientRect();
                  const resizeHandleSize = 14;
                  if (left + width - resizeHandleSize < e.clientX && e.clientX < left + width && top + height - resizeHandleSize < e.clientY && e.clientY < top + height) {
                    return;
                  }
                }
              }
              e.preventDefault();
              if (!focusedRef.value) {
                focus();
              }
            }
          }
          function handleMouseEnter() {
            var _a;
            hoverRef.value = true;
            if (props.type === "textarea") {
              (_a = textareaScrollbarInstRef.value) === null || _a === void 0 ? void 0 : _a.handleMouseEnterWrapper();
            }
          }
          function handleMouseLeave() {
            var _a;
            hoverRef.value = false;
            if (props.type === "textarea") {
              (_a = textareaScrollbarInstRef.value) === null || _a === void 0 ? void 0 : _a.handleMouseLeaveWrapper();
            }
          }
          function handlePasswordToggleClick() {
            if (mergedDisabledRef.value) return;
            if (mergedShowPasswordOnRef.value !== "click") return;
            passwordVisibleRef.value = !passwordVisibleRef.value;
          }
          function handlePasswordToggleMousedown(e) {
            if (mergedDisabledRef.value) return;
            e.preventDefault();
            const preventDefaultOnce = (e2) => {
              e2.preventDefault();
              off("mouseup", document, preventDefaultOnce);
            };
            on("mouseup", document, preventDefaultOnce);
            if (mergedShowPasswordOnRef.value !== "mousedown") return;
            passwordVisibleRef.value = true;
            const hidePassword = () => {
              passwordVisibleRef.value = false;
              off("mouseup", document, hidePassword);
            };
            on("mouseup", document, hidePassword);
          }
          function handleWrapperKeyup(e) {
            if (props.onKeyup) call(props.onKeyup, e);
          }
          function handleWrapperKeydown(e) {
            if (props.onKeydown) call(props.onKeydown, e);
            switch (e.key) {
              case "Escape":
                handleWrapperKeydownEsc();
                break;
              case "Enter":
                handleWrapperKeydownEnter(e);
                break;
            }
          }
          function handleWrapperKeydownEnter(e) {
            var _a, _b;
            if (props.passivelyActivated) {
              const {
                value: focused
              } = activatedRef;
              if (focused) {
                if (props.internalDeactivateOnEnter) {
                  handleWrapperKeydownEsc();
                }
                return;
              }
              e.preventDefault();
              if (props.type === "textarea") {
                (_a = textareaElRef.value) === null || _a === void 0 ? void 0 : _a.focus();
              } else {
                (_b = inputElRef.value) === null || _b === void 0 ? void 0 : _b.focus();
              }
            }
          }
          function handleWrapperKeydownEsc() {
            if (props.passivelyActivated) {
              activatedRef.value = false;
              void vue.nextTick(() => {
                var _a;
                (_a = wrapperElRef.value) === null || _a === void 0 ? void 0 : _a.focus();
              });
            }
          }
          function focus() {
            var _a, _b, _c;
            if (mergedDisabledRef.value) return;
            if (props.passivelyActivated) {
              (_a = wrapperElRef.value) === null || _a === void 0 ? void 0 : _a.focus();
            } else {
              (_b = textareaElRef.value) === null || _b === void 0 ? void 0 : _b.focus();
              (_c = inputElRef.value) === null || _c === void 0 ? void 0 : _c.focus();
            }
          }
          function blur() {
            var _a;
            if ((_a = wrapperElRef.value) === null || _a === void 0 ? void 0 : _a.contains(document.activeElement)) {
              document.activeElement.blur();
            }
          }
          function select() {
            var _a, _b;
            (_a = textareaElRef.value) === null || _a === void 0 ? void 0 : _a.select();
            (_b = inputElRef.value) === null || _b === void 0 ? void 0 : _b.select();
          }
          function activate() {
            if (mergedDisabledRef.value) return;
            if (textareaElRef.value) textareaElRef.value.focus();
            else if (inputElRef.value) inputElRef.value.focus();
          }
          function deactivate() {
            const {
              value: wrapperEl
            } = wrapperElRef;
            if ((wrapperEl === null || wrapperEl === void 0 ? void 0 : wrapperEl.contains(document.activeElement)) && wrapperEl !== document.activeElement) {
              handleWrapperKeydownEsc();
            }
          }
          function scrollTo(options) {
            if (props.type === "textarea") {
              const {
                value: textareaEl
              } = textareaElRef;
              textareaEl === null || textareaEl === void 0 ? void 0 : textareaEl.scrollTo(options);
            } else {
              const {
                value: inputEl
              } = inputElRef;
              inputEl === null || inputEl === void 0 ? void 0 : inputEl.scrollTo(options);
            }
          }
          function syncMirror(value) {
            const {
              type,
              pair,
              autosize
            } = props;
            if (!pair && autosize) {
              if (type === "textarea") {
                const {
                  value: textareaMirrorEl
                } = textareaMirrorElRef;
                if (textareaMirrorEl) {
                  textareaMirrorEl.textContent = `${value !== null && value !== void 0 ? value : ""}\r
`;
                }
              } else {
                const {
                  value: inputMirrorEl
                } = inputMirrorElRef;
                if (inputMirrorEl) {
                  if (value) {
                    inputMirrorEl.textContent = value;
                  } else {
                    inputMirrorEl.innerHTML = "&nbsp;";
                  }
                }
              }
            }
          }
          function handleTextAreaMirrorResize() {
            updateTextAreaStyle();
          }
          const placeholderStyleRef = vue.ref({
            top: "0"
          });
          function handleTextAreaScroll(e) {
            var _a;
            const {
              scrollTop
            } = e.target;
            placeholderStyleRef.value.top = `${-scrollTop}px`;
            (_a = textareaScrollbarInstRef.value) === null || _a === void 0 ? void 0 : _a.syncUnifiedContainer();
          }
          let stopWatchMergedValue1 = null;
          vue.watchEffect(() => {
            const {
              autosize,
              type
            } = props;
            if (autosize && type === "textarea") {
              stopWatchMergedValue1 = vue.watch(mergedValueRef, (value) => {
                if (!Array.isArray(value) && value !== syncSource) {
                  syncMirror(value);
                }
              });
            } else {
              stopWatchMergedValue1 === null || stopWatchMergedValue1 === void 0 ? void 0 : stopWatchMergedValue1();
            }
          });
          let stopWatchMergedValue2 = null;
          vue.watchEffect(() => {
            if (props.type === "textarea") {
              stopWatchMergedValue2 = vue.watch(mergedValueRef, (value) => {
                var _a;
                if (!Array.isArray(value) && value !== syncSource) {
                  (_a = textareaScrollbarInstRef.value) === null || _a === void 0 ? void 0 : _a.syncUnifiedContainer();
                }
              });
            } else {
              stopWatchMergedValue2 === null || stopWatchMergedValue2 === void 0 ? void 0 : stopWatchMergedValue2();
            }
          });
          vue.provide(inputInjectionKey, {
            mergedValueRef,
            maxlengthRef,
            mergedClsPrefixRef,
            countGraphemesRef: vue.toRef(props, "countGraphemes")
          });
          const exposedProps = {
            wrapperElRef,
            inputElRef,
            textareaElRef,
            isCompositing: isComposingRef2,
            clear: clearValue,
            focus,
            blur,
            select,
            deactivate,
            activate,
            scrollTo
          };
          const rtlEnabledRef = useRtl("Input", mergedRtlRef, mergedClsPrefixRef);
          const cssVarsRef = vue.computed(() => {
            const {
              value: size2
            } = mergedSizeRef;
            const {
              common: {
                cubicBezierEaseInOut: cubicBezierEaseInOut2
              },
              self: {
                color,
                borderRadius,
                textColor,
                caretColor,
                caretColorError,
                caretColorWarning,
                textDecorationColor,
                border,
                borderDisabled,
                borderHover,
                borderFocus,
                placeholderColor,
                placeholderColorDisabled,
                lineHeightTextarea,
                colorDisabled,
                colorFocus,
                textColorDisabled,
                boxShadowFocus,
                iconSize,
                colorFocusWarning,
                boxShadowFocusWarning,
                borderWarning,
                borderFocusWarning,
                borderHoverWarning,
                colorFocusError,
                boxShadowFocusError,
                borderError,
                borderFocusError,
                borderHoverError,
                clearSize,
                clearColor,
                clearColorHover,
                clearColorPressed,
                iconColor,
                iconColorDisabled,
                suffixTextColor,
                countTextColor,
                countTextColorDisabled,
                iconColorHover,
                iconColorPressed,
                loadingColor,
                loadingColorError,
                loadingColorWarning,
                [createKey("padding", size2)]: padding,
                [createKey("fontSize", size2)]: fontSize2,
                [createKey("height", size2)]: height
              }
            } = themeRef.value;
            const {
              left: paddingLeft,
              right: paddingRight
            } = getMargin(padding);
            return {
              "--n-bezier": cubicBezierEaseInOut2,
              "--n-count-text-color": countTextColor,
              "--n-count-text-color-disabled": countTextColorDisabled,
              "--n-color": color,
              "--n-font-size": fontSize2,
              "--n-border-radius": borderRadius,
              "--n-height": height,
              "--n-padding-left": paddingLeft,
              "--n-padding-right": paddingRight,
              "--n-text-color": textColor,
              "--n-caret-color": caretColor,
              "--n-text-decoration-color": textDecorationColor,
              "--n-border": border,
              "--n-border-disabled": borderDisabled,
              "--n-border-hover": borderHover,
              "--n-border-focus": borderFocus,
              "--n-placeholder-color": placeholderColor,
              "--n-placeholder-color-disabled": placeholderColorDisabled,
              "--n-icon-size": iconSize,
              "--n-line-height-textarea": lineHeightTextarea,
              "--n-color-disabled": colorDisabled,
              "--n-color-focus": colorFocus,
              "--n-text-color-disabled": textColorDisabled,
              "--n-box-shadow-focus": boxShadowFocus,
              "--n-loading-color": loadingColor,
              // form warning
              "--n-caret-color-warning": caretColorWarning,
              "--n-color-focus-warning": colorFocusWarning,
              "--n-box-shadow-focus-warning": boxShadowFocusWarning,
              "--n-border-warning": borderWarning,
              "--n-border-focus-warning": borderFocusWarning,
              "--n-border-hover-warning": borderHoverWarning,
              "--n-loading-color-warning": loadingColorWarning,
              // form error
              "--n-caret-color-error": caretColorError,
              "--n-color-focus-error": colorFocusError,
              "--n-box-shadow-focus-error": boxShadowFocusError,
              "--n-border-error": borderError,
              "--n-border-focus-error": borderFocusError,
              "--n-border-hover-error": borderHoverError,
              "--n-loading-color-error": loadingColorError,
              // clear-button
              "--n-clear-color": clearColor,
              "--n-clear-size": clearSize,
              "--n-clear-color-hover": clearColorHover,
              "--n-clear-color-pressed": clearColorPressed,
              "--n-icon-color": iconColor,
              "--n-icon-color-hover": iconColorHover,
              "--n-icon-color-pressed": iconColorPressed,
              "--n-icon-color-disabled": iconColorDisabled,
              "--n-suffix-text-color": suffixTextColor
            };
          });
          const themeClassHandle = inlineThemeDisabled ? useThemeClass("input", vue.computed(() => {
            const {
              value: size2
            } = mergedSizeRef;
            return size2[0];
          }), cssVarsRef, props) : void 0;
          return Object.assign(Object.assign({}, exposedProps), {
            // DOM ref
            wrapperElRef,
            inputElRef,
            inputMirrorElRef,
            inputEl2Ref,
            textareaElRef,
            textareaMirrorElRef,
            textareaScrollbarInstRef,
            // value
            rtlEnabled: rtlEnabledRef,
            uncontrolledValue: uncontrolledValueRef,
            mergedValue: mergedValueRef,
            passwordVisible: passwordVisibleRef,
            mergedPlaceholder: mergedPlaceholderRef,
            showPlaceholder1: showPlaceholder1Ref,
            showPlaceholder2: showPlaceholder2Ref,
            mergedFocus: mergedFocusRef,
            isComposing: isComposingRef2,
            activated: activatedRef,
            showClearButton,
            mergedSize: mergedSizeRef,
            mergedDisabled: mergedDisabledRef,
            textDecorationStyle: textDecorationStyleRef,
            mergedClsPrefix: mergedClsPrefixRef,
            mergedBordered: mergedBorderedRef,
            mergedShowPasswordOn: mergedShowPasswordOnRef,
            placeholderStyle: placeholderStyleRef,
            mergedStatus: mergedStatusRef,
            textAreaScrollContainerWidth: textAreaScrollContainerWidthRef,
            // methods
            handleTextAreaScroll,
            handleCompositionStart,
            handleCompositionEnd,
            handleInput,
            handleInputBlur,
            handleInputFocus,
            handleWrapperBlur,
            handleWrapperFocus,
            handleMouseEnter,
            handleMouseLeave,
            handleMouseDown,
            handleChange,
            handleClick,
            handleClear,
            handlePasswordToggleClick,
            handlePasswordToggleMousedown,
            handleWrapperKeydown,
            handleWrapperKeyup,
            handleTextAreaMirrorResize,
            getTextareaScrollContainer: () => {
              return textareaElRef.value;
            },
            mergedTheme: themeRef,
            cssVars: inlineThemeDisabled ? void 0 : cssVarsRef,
            themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
            onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
          });
        },
        render() {
          var _a, _b;
          const {
            mergedClsPrefix,
            mergedStatus,
            themeClass,
            type,
            countGraphemes,
            onRender
          } = this;
          const $slots = this.$slots;
          onRender === null || onRender === void 0 ? void 0 : onRender();
          return vue.h("div", {
            ref: "wrapperElRef",
            class: [`${mergedClsPrefix}-input`, themeClass, mergedStatus && `${mergedClsPrefix}-input--${mergedStatus}-status`, {
              [`${mergedClsPrefix}-input--rtl`]: this.rtlEnabled,
              [`${mergedClsPrefix}-input--disabled`]: this.mergedDisabled,
              [`${mergedClsPrefix}-input--textarea`]: type === "textarea",
              [`${mergedClsPrefix}-input--resizable`]: this.resizable && !this.autosize,
              [`${mergedClsPrefix}-input--autosize`]: this.autosize,
              [`${mergedClsPrefix}-input--round`]: this.round && !(type === "textarea"),
              [`${mergedClsPrefix}-input--pair`]: this.pair,
              [`${mergedClsPrefix}-input--focus`]: this.mergedFocus,
              [`${mergedClsPrefix}-input--stateful`]: this.stateful
            }],
            style: this.cssVars,
            tabindex: !this.mergedDisabled && this.passivelyActivated && !this.activated ? 0 : void 0,
            onFocus: this.handleWrapperFocus,
            onBlur: this.handleWrapperBlur,
            onClick: this.handleClick,
            onMousedown: this.handleMouseDown,
            onMouseenter: this.handleMouseEnter,
            onMouseleave: this.handleMouseLeave,
            onCompositionstart: this.handleCompositionStart,
            onCompositionend: this.handleCompositionEnd,
            onKeyup: this.handleWrapperKeyup,
            onKeydown: this.handleWrapperKeydown
          }, vue.h("div", {
            class: `${mergedClsPrefix}-input-wrapper`
          }, resolveWrappedSlot($slots.prefix, (children) => children && vue.h("div", {
            class: `${mergedClsPrefix}-input__prefix`
          }, children)), type === "textarea" ? vue.h(Scrollbar, {
            ref: "textareaScrollbarInstRef",
            class: `${mergedClsPrefix}-input__textarea`,
            container: this.getTextareaScrollContainer,
            triggerDisplayManually: true,
            useUnifiedContainer: true,
            internalHoistYRail: true
          }, {
            default: () => {
              var _a2, _b2;
              const {
                textAreaScrollContainerWidth
              } = this;
              const scrollContainerWidthStyle = {
                width: this.autosize && textAreaScrollContainerWidth && `${textAreaScrollContainerWidth}px`
              };
              return vue.h(vue.Fragment, null, vue.h("textarea", Object.assign({}, this.inputProps, {
                ref: "textareaElRef",
                class: [`${mergedClsPrefix}-input__textarea-el`, (_a2 = this.inputProps) === null || _a2 === void 0 ? void 0 : _a2.class],
                autofocus: this.autofocus,
                rows: Number(this.rows),
                placeholder: this.placeholder,
                value: this.mergedValue,
                disabled: this.mergedDisabled,
                maxlength: countGraphemes ? void 0 : this.maxlength,
                minlength: countGraphemes ? void 0 : this.minlength,
                readonly: this.readonly,
                tabindex: this.passivelyActivated && !this.activated ? -1 : void 0,
                style: [this.textDecorationStyle[0], (_b2 = this.inputProps) === null || _b2 === void 0 ? void 0 : _b2.style, scrollContainerWidthStyle],
                onBlur: this.handleInputBlur,
                onFocus: (e) => {
                  this.handleInputFocus(e, 2);
                },
                onInput: this.handleInput,
                onChange: this.handleChange,
                onScroll: this.handleTextAreaScroll
              })), this.showPlaceholder1 ? vue.h("div", {
                class: `${mergedClsPrefix}-input__placeholder`,
                style: [this.placeholderStyle, scrollContainerWidthStyle],
                key: "placeholder"
              }, this.mergedPlaceholder[0]) : null, this.autosize ? vue.h(VResizeObserver, {
                onResize: this.handleTextAreaMirrorResize
              }, {
                default: () => vue.h("div", {
                  ref: "textareaMirrorElRef",
                  class: `${mergedClsPrefix}-input__textarea-mirror`,
                  key: "mirror"
                })
              }) : null);
            }
          }) : vue.h("div", {
            class: `${mergedClsPrefix}-input__input`
          }, vue.h("input", Object.assign({
            type: type === "password" && this.mergedShowPasswordOn && this.passwordVisible ? "text" : type
          }, this.inputProps, {
            ref: "inputElRef",
            class: [`${mergedClsPrefix}-input__input-el`, (_a = this.inputProps) === null || _a === void 0 ? void 0 : _a.class],
            style: [this.textDecorationStyle[0], (_b = this.inputProps) === null || _b === void 0 ? void 0 : _b.style],
            tabindex: this.passivelyActivated && !this.activated ? -1 : void 0,
            placeholder: this.mergedPlaceholder[0],
            disabled: this.mergedDisabled,
            maxlength: countGraphemes ? void 0 : this.maxlength,
            minlength: countGraphemes ? void 0 : this.minlength,
            value: Array.isArray(this.mergedValue) ? this.mergedValue[0] : this.mergedValue,
            readonly: this.readonly,
            autofocus: this.autofocus,
            size: this.attrSize,
            onBlur: this.handleInputBlur,
            onFocus: (e) => {
              this.handleInputFocus(e, 0);
            },
            onInput: (e) => {
              this.handleInput(e, 0);
            },
            onChange: (e) => {
              this.handleChange(e, 0);
            }
          })), this.showPlaceholder1 ? vue.h("div", {
            class: `${mergedClsPrefix}-input__placeholder`
          }, vue.h("span", null, this.mergedPlaceholder[0])) : null, this.autosize ? vue.h("div", {
            class: `${mergedClsPrefix}-input__input-mirror`,
            key: "mirror",
            ref: "inputMirrorElRef"
          }, " ") : null), !this.pair && resolveWrappedSlot($slots.suffix, (children) => {
            return children || this.clearable || this.showCount || this.mergedShowPasswordOn || this.loading !== void 0 ? vue.h("div", {
              class: `${mergedClsPrefix}-input__suffix`
            }, [resolveWrappedSlot($slots["clear-icon-placeholder"], (children2) => {
              return (this.clearable || children2) && vue.h(NBaseClear, {
                clsPrefix: mergedClsPrefix,
                show: this.showClearButton,
                onClear: this.handleClear
              }, {
                placeholder: () => children2,
                icon: () => {
                  var _a2, _b2;
                  return (_b2 = (_a2 = this.$slots)["clear-icon"]) === null || _b2 === void 0 ? void 0 : _b2.call(_a2);
                }
              });
            }), !this.internalLoadingBeforeSuffix ? children : null, this.loading !== void 0 ? vue.h(NBaseSuffix, {
              clsPrefix: mergedClsPrefix,
              loading: this.loading,
              showArrow: false,
              showClear: false,
              style: this.cssVars
            }) : null, this.internalLoadingBeforeSuffix ? children : null, this.showCount && this.type !== "textarea" ? vue.h(WordCount, null, {
              default: (props) => {
                var _a2;
                return (_a2 = $slots.count) === null || _a2 === void 0 ? void 0 : _a2.call($slots, props);
              }
            }) : null, this.mergedShowPasswordOn && this.type === "password" ? vue.h("div", {
              class: `${mergedClsPrefix}-input__eye`,
              onMousedown: this.handlePasswordToggleMousedown,
              onClick: this.handlePasswordToggleClick
            }, this.passwordVisible ? resolveSlot($slots["password-visible-icon"], () => [vue.h(NBaseIcon, {
              clsPrefix: mergedClsPrefix
            }, {
              default: () => vue.h(EyeIcon, null)
            })]) : resolveSlot($slots["password-invisible-icon"], () => [vue.h(NBaseIcon, {
              clsPrefix: mergedClsPrefix
            }, {
              default: () => vue.h(EyeOffIcon, null)
            })])) : null]) : null;
          })), this.pair ? vue.h("span", {
            class: `${mergedClsPrefix}-input__separator`
          }, resolveSlot($slots.separator, () => [this.separator])) : null, this.pair ? vue.h("div", {
            class: `${mergedClsPrefix}-input-wrapper`
          }, vue.h("div", {
            class: `${mergedClsPrefix}-input__input`
          }, vue.h("input", {
            ref: "inputEl2Ref",
            type: this.type,
            class: `${mergedClsPrefix}-input__input-el`,
            tabindex: this.passivelyActivated && !this.activated ? -1 : void 0,
            placeholder: this.mergedPlaceholder[1],
            disabled: this.mergedDisabled,
            maxlength: countGraphemes ? void 0 : this.maxlength,
            minlength: countGraphemes ? void 0 : this.minlength,
            value: Array.isArray(this.mergedValue) ? this.mergedValue[1] : void 0,
            readonly: this.readonly,
            style: this.textDecorationStyle[1],
            onBlur: this.handleInputBlur,
            onFocus: (e) => {
              this.handleInputFocus(e, 1);
            },
            onInput: (e) => {
              this.handleInput(e, 1);
            },
            onChange: (e) => {
              this.handleChange(e, 1);
            }
          }), this.showPlaceholder2 ? vue.h("div", {
            class: `${mergedClsPrefix}-input__placeholder`
          }, vue.h("span", null, this.mergedPlaceholder[1])) : null), resolveWrappedSlot($slots.suffix, (children) => {
            return (this.clearable || children) && vue.h("div", {
              class: `${mergedClsPrefix}-input__suffix`
            }, [this.clearable && vue.h(NBaseClear, {
              clsPrefix: mergedClsPrefix,
              show: this.showClearButton,
              onClear: this.handleClear
            }, {
              icon: () => {
                var _a2;
                return (_a2 = $slots["clear-icon"]) === null || _a2 === void 0 ? void 0 : _a2.call($slots);
              },
              placeholder: () => {
                var _a2;
                return (_a2 = $slots["clear-icon-placeholder"]) === null || _a2 === void 0 ? void 0 : _a2.call($slots);
              }
            }), children]);
          })) : null, this.mergedBordered ? vue.h("div", {
            class: `${mergedClsPrefix}-input__border`
          }) : null, this.mergedBordered ? vue.h("div", {
            class: `${mergedClsPrefix}-input__state-border`
          }) : null, this.showCount && type === "textarea" ? vue.h(WordCount, null, {
            default: (props) => {
              var _a2;
              const {
                renderCount
              } = this;
              if (renderCount) {
                return renderCount(props);
              }
              return (_a2 = $slots.count) === null || _a2 === void 0 ? void 0 : _a2.call($slots, props);
            }
          }) : null);
        }
      });
      function self$19(vars) {
        const {
          boxShadow2
        } = vars;
        return {
          menuBoxShadow: boxShadow2
        };
      }
      const autoCompleteLight = createTheme({
        name: "AutoComplete",
        common: derived,
        peers: {
          InternalSelectMenu: internalSelectMenuLight,
          Input: inputLight
        },
        self: self$19
      });
      const autoCompleteDark = {
        name: "AutoComplete",
        common: derived$1,
        peers: {
          InternalSelectMenu: internalSelectMenuDark,
          Input: inputDark
        },
        self: self$19
      };
      function self$18(vars) {
        const {
          borderRadius,
          avatarColor,
          cardColor,
          fontSize: fontSize2,
          heightTiny,
          heightSmall,
          heightMedium,
          heightLarge,
          heightHuge,
          modalColor,
          popoverColor
        } = vars;
        return {
          borderRadius,
          fontSize: fontSize2,
          border: `2px solid ${cardColor}`,
          heightTiny,
          heightSmall,
          heightMedium,
          heightLarge,
          heightHuge,
          color: composite(cardColor, avatarColor),
          colorModal: composite(modalColor, avatarColor),
          colorPopover: composite(popoverColor, avatarColor)
        };
      }
      const avatarLight = {
        name: "Avatar",
        common: derived,
        self: self$18
      };
      const avatarDark = {
        name: "Avatar",
        common: derived$1,
        self: self$18
      };
      function self$17() {
        return {
          gap: "-12px"
        };
      }
      const avatarGroupLight = createTheme({
        name: "AvatarGroup",
        common: derived,
        peers: {
          Avatar: avatarLight
        },
        self: self$17
      });
      const avatarGroupDark = {
        name: "AvatarGroup",
        common: derived$1,
        peers: {
          Avatar: avatarDark
        },
        self: self$17
      };
      const commonVariables$h = {
        width: "44px",
        height: "44px",
        borderRadius: "22px",
        iconSize: "26px"
      };
      const backTopDark = {
        name: "BackTop",
        common: derived$1,
        self(vars) {
          const {
            popoverColor,
            textColor2,
            primaryColorHover,
            primaryColorPressed
          } = vars;
          return Object.assign(Object.assign({}, commonVariables$h), {
            color: popoverColor,
            textColor: textColor2,
            iconColor: textColor2,
            iconColorHover: primaryColorHover,
            iconColorPressed: primaryColorPressed,
            boxShadow: "0 2px 8px 0px rgba(0, 0, 0, .12)",
            boxShadowHover: "0 2px 12px 0px rgba(0, 0, 0, .18)",
            boxShadowPressed: "0 2px 12px 0px rgba(0, 0, 0, .18)"
          });
        }
      };
      function self$16(vars) {
        const {
          popoverColor,
          textColor2,
          primaryColorHover,
          primaryColorPressed
        } = vars;
        return Object.assign(Object.assign({}, commonVariables$h), {
          color: popoverColor,
          textColor: textColor2,
          iconColor: textColor2,
          iconColorHover: primaryColorHover,
          iconColorPressed: primaryColorPressed,
          boxShadow: "0 2px 8px 0px rgba(0, 0, 0, .12)",
          boxShadowHover: "0 2px 12px 0px rgba(0, 0, 0, .18)",
          boxShadowPressed: "0 2px 12px 0px rgba(0, 0, 0, .18)"
        });
      }
      const backTopLight = {
        name: "BackTop",
        common: derived,
        self: self$16
      };
      const badgeDark = {
        name: "Badge",
        common: derived$1,
        self(vars) {
          const {
            errorColorSuppl,
            infoColorSuppl,
            successColorSuppl,
            warningColorSuppl,
            fontFamily: fontFamily2
          } = vars;
          return {
            color: errorColorSuppl,
            colorInfo: infoColorSuppl,
            colorSuccess: successColorSuppl,
            colorError: errorColorSuppl,
            colorWarning: warningColorSuppl,
            fontSize: "12px",
            fontFamily: fontFamily2
          };
        }
      };
      function self$15(vars) {
        const {
          errorColor,
          infoColor,
          successColor,
          warningColor,
          fontFamily: fontFamily2
        } = vars;
        return {
          color: errorColor,
          colorInfo: infoColor,
          colorSuccess: successColor,
          colorError: errorColor,
          colorWarning: warningColor,
          fontSize: "12px",
          fontFamily: fontFamily2
        };
      }
      const badgeLight = {
        name: "Badge",
        common: derived,
        self: self$15
      };
      const commonVariables$g = {
        fontWeightActive: "400"
      };
      function self$14(vars) {
        const {
          fontSize: fontSize2,
          textColor3,
          textColor2,
          borderRadius,
          buttonColor2Hover,
          buttonColor2Pressed
        } = vars;
        return Object.assign(Object.assign({}, commonVariables$g), {
          fontSize: fontSize2,
          itemLineHeight: "1.25",
          itemTextColor: textColor3,
          itemTextColorHover: textColor2,
          itemTextColorPressed: textColor2,
          itemTextColorActive: textColor2,
          itemBorderRadius: borderRadius,
          itemColorHover: buttonColor2Hover,
          itemColorPressed: buttonColor2Pressed,
          separatorColor: textColor3
        });
      }
      const breadcrumbLight = {
        name: "Breadcrumb",
        common: derived,
        self: self$14
      };
      const breadcrumbDark = {
        name: "Breadcrumb",
        common: derived$1,
        self: self$14
      };
      function createHoverColor(rgb) {
        return composite(rgb, [255, 255, 255, 0.16]);
      }
      function createPressedColor(rgb) {
        return composite(rgb, [0, 0, 0, 0.12]);
      }
      const buttonGroupInjectionKey = createInjectionKey("n-button-group");
      const commonVariables$f = {
        paddingTiny: "0 6px",
        paddingSmall: "0 10px",
        paddingMedium: "0 14px",
        paddingLarge: "0 18px",
        paddingRoundTiny: "0 10px",
        paddingRoundSmall: "0 14px",
        paddingRoundMedium: "0 18px",
        paddingRoundLarge: "0 22px",
        iconMarginTiny: "6px",
        iconMarginSmall: "6px",
        iconMarginMedium: "6px",
        iconMarginLarge: "6px",
        iconSizeTiny: "14px",
        iconSizeSmall: "18px",
        iconSizeMedium: "18px",
        iconSizeLarge: "20px",
        rippleDuration: ".6s"
      };
      function self$13(vars) {
        const {
          heightTiny,
          heightSmall,
          heightMedium,
          heightLarge,
          borderRadius,
          fontSizeTiny,
          fontSizeSmall,
          fontSizeMedium,
          fontSizeLarge,
          opacityDisabled,
          textColor2,
          textColor3,
          primaryColorHover,
          primaryColorPressed,
          borderColor,
          primaryColor,
          baseColor,
          infoColor,
          infoColorHover,
          infoColorPressed,
          successColor,
          successColorHover,
          successColorPressed,
          warningColor,
          warningColorHover,
          warningColorPressed,
          errorColor,
          errorColorHover,
          errorColorPressed,
          fontWeight,
          buttonColor2,
          buttonColor2Hover,
          buttonColor2Pressed,
          fontWeightStrong
        } = vars;
        return Object.assign(Object.assign({}, commonVariables$f), {
          heightTiny,
          heightSmall,
          heightMedium,
          heightLarge,
          borderRadiusTiny: borderRadius,
          borderRadiusSmall: borderRadius,
          borderRadiusMedium: borderRadius,
          borderRadiusLarge: borderRadius,
          fontSizeTiny,
          fontSizeSmall,
          fontSizeMedium,
          fontSizeLarge,
          opacityDisabled,
          // secondary
          colorOpacitySecondary: "0.16",
          colorOpacitySecondaryHover: "0.22",
          colorOpacitySecondaryPressed: "0.28",
          colorSecondary: buttonColor2,
          colorSecondaryHover: buttonColor2Hover,
          colorSecondaryPressed: buttonColor2Pressed,
          // tertiary
          colorTertiary: buttonColor2,
          colorTertiaryHover: buttonColor2Hover,
          colorTertiaryPressed: buttonColor2Pressed,
          // quaternary
          colorQuaternary: "#0000",
          colorQuaternaryHover: buttonColor2Hover,
          colorQuaternaryPressed: buttonColor2Pressed,
          // default type
          color: "#0000",
          colorHover: "#0000",
          colorPressed: "#0000",
          colorFocus: "#0000",
          colorDisabled: "#0000",
          textColor: textColor2,
          textColorTertiary: textColor3,
          textColorHover: primaryColorHover,
          textColorPressed: primaryColorPressed,
          textColorFocus: primaryColorHover,
          textColorDisabled: textColor2,
          textColorText: textColor2,
          textColorTextHover: primaryColorHover,
          textColorTextPressed: primaryColorPressed,
          textColorTextFocus: primaryColorHover,
          textColorTextDisabled: textColor2,
          textColorGhost: textColor2,
          textColorGhostHover: primaryColorHover,
          textColorGhostPressed: primaryColorPressed,
          textColorGhostFocus: primaryColorHover,
          textColorGhostDisabled: textColor2,
          border: `1px solid ${borderColor}`,
          borderHover: `1px solid ${primaryColorHover}`,
          borderPressed: `1px solid ${primaryColorPressed}`,
          borderFocus: `1px solid ${primaryColorHover}`,
          borderDisabled: `1px solid ${borderColor}`,
          rippleColor: primaryColor,
          // primary
          colorPrimary: primaryColor,
          colorHoverPrimary: primaryColorHover,
          colorPressedPrimary: primaryColorPressed,
          colorFocusPrimary: primaryColorHover,
          colorDisabledPrimary: primaryColor,
          textColorPrimary: baseColor,
          textColorHoverPrimary: baseColor,
          textColorPressedPrimary: baseColor,
          textColorFocusPrimary: baseColor,
          textColorDisabledPrimary: baseColor,
          textColorTextPrimary: primaryColor,
          textColorTextHoverPrimary: primaryColorHover,
          textColorTextPressedPrimary: primaryColorPressed,
          textColorTextFocusPrimary: primaryColorHover,
          textColorTextDisabledPrimary: textColor2,
          textColorGhostPrimary: primaryColor,
          textColorGhostHoverPrimary: primaryColorHover,
          textColorGhostPressedPrimary: primaryColorPressed,
          textColorGhostFocusPrimary: primaryColorHover,
          textColorGhostDisabledPrimary: primaryColor,
          borderPrimary: `1px solid ${primaryColor}`,
          borderHoverPrimary: `1px solid ${primaryColorHover}`,
          borderPressedPrimary: `1px solid ${primaryColorPressed}`,
          borderFocusPrimary: `1px solid ${primaryColorHover}`,
          borderDisabledPrimary: `1px solid ${primaryColor}`,
          rippleColorPrimary: primaryColor,
          // info
          colorInfo: infoColor,
          colorHoverInfo: infoColorHover,
          colorPressedInfo: infoColorPressed,
          colorFocusInfo: infoColorHover,
          colorDisabledInfo: infoColor,
          textColorInfo: baseColor,
          textColorHoverInfo: baseColor,
          textColorPressedInfo: baseColor,
          textColorFocusInfo: baseColor,
          textColorDisabledInfo: baseColor,
          textColorTextInfo: infoColor,
          textColorTextHoverInfo: infoColorHover,
          textColorTextPressedInfo: infoColorPressed,
          textColorTextFocusInfo: infoColorHover,
          textColorTextDisabledInfo: textColor2,
          textColorGhostInfo: infoColor,
          textColorGhostHoverInfo: infoColorHover,
          textColorGhostPressedInfo: infoColorPressed,
          textColorGhostFocusInfo: infoColorHover,
          textColorGhostDisabledInfo: infoColor,
          borderInfo: `1px solid ${infoColor}`,
          borderHoverInfo: `1px solid ${infoColorHover}`,
          borderPressedInfo: `1px solid ${infoColorPressed}`,
          borderFocusInfo: `1px solid ${infoColorHover}`,
          borderDisabledInfo: `1px solid ${infoColor}`,
          rippleColorInfo: infoColor,
          // success
          colorSuccess: successColor,
          colorHoverSuccess: successColorHover,
          colorPressedSuccess: successColorPressed,
          colorFocusSuccess: successColorHover,
          colorDisabledSuccess: successColor,
          textColorSuccess: baseColor,
          textColorHoverSuccess: baseColor,
          textColorPressedSuccess: baseColor,
          textColorFocusSuccess: baseColor,
          textColorDisabledSuccess: baseColor,
          textColorTextSuccess: successColor,
          textColorTextHoverSuccess: successColorHover,
          textColorTextPressedSuccess: successColorPressed,
          textColorTextFocusSuccess: successColorHover,
          textColorTextDisabledSuccess: textColor2,
          textColorGhostSuccess: successColor,
          textColorGhostHoverSuccess: successColorHover,
          textColorGhostPressedSuccess: successColorPressed,
          textColorGhostFocusSuccess: successColorHover,
          textColorGhostDisabledSuccess: successColor,
          borderSuccess: `1px solid ${successColor}`,
          borderHoverSuccess: `1px solid ${successColorHover}`,
          borderPressedSuccess: `1px solid ${successColorPressed}`,
          borderFocusSuccess: `1px solid ${successColorHover}`,
          borderDisabledSuccess: `1px solid ${successColor}`,
          rippleColorSuccess: successColor,
          // warning
          colorWarning: warningColor,
          colorHoverWarning: warningColorHover,
          colorPressedWarning: warningColorPressed,
          colorFocusWarning: warningColorHover,
          colorDisabledWarning: warningColor,
          textColorWarning: baseColor,
          textColorHoverWarning: baseColor,
          textColorPressedWarning: baseColor,
          textColorFocusWarning: baseColor,
          textColorDisabledWarning: baseColor,
          textColorTextWarning: warningColor,
          textColorTextHoverWarning: warningColorHover,
          textColorTextPressedWarning: warningColorPressed,
          textColorTextFocusWarning: warningColorHover,
          textColorTextDisabledWarning: textColor2,
          textColorGhostWarning: warningColor,
          textColorGhostHoverWarning: warningColorHover,
          textColorGhostPressedWarning: warningColorPressed,
          textColorGhostFocusWarning: warningColorHover,
          textColorGhostDisabledWarning: warningColor,
          borderWarning: `1px solid ${warningColor}`,
          borderHoverWarning: `1px solid ${warningColorHover}`,
          borderPressedWarning: `1px solid ${warningColorPressed}`,
          borderFocusWarning: `1px solid ${warningColorHover}`,
          borderDisabledWarning: `1px solid ${warningColor}`,
          rippleColorWarning: warningColor,
          // error
          colorError: errorColor,
          colorHoverError: errorColorHover,
          colorPressedError: errorColorPressed,
          colorFocusError: errorColorHover,
          colorDisabledError: errorColor,
          textColorError: baseColor,
          textColorHoverError: baseColor,
          textColorPressedError: baseColor,
          textColorFocusError: baseColor,
          textColorDisabledError: baseColor,
          textColorTextError: errorColor,
          textColorTextHoverError: errorColorHover,
          textColorTextPressedError: errorColorPressed,
          textColorTextFocusError: errorColorHover,
          textColorTextDisabledError: textColor2,
          textColorGhostError: errorColor,
          textColorGhostHoverError: errorColorHover,
          textColorGhostPressedError: errorColorPressed,
          textColorGhostFocusError: errorColorHover,
          textColorGhostDisabledError: errorColor,
          borderError: `1px solid ${errorColor}`,
          borderHoverError: `1px solid ${errorColorHover}`,
          borderPressedError: `1px solid ${errorColorPressed}`,
          borderFocusError: `1px solid ${errorColorHover}`,
          borderDisabledError: `1px solid ${errorColor}`,
          rippleColorError: errorColor,
          waveOpacity: "0.6",
          fontWeight,
          fontWeightStrong
        });
      }
      const buttonLight = {
        name: "Button",
        common: derived,
        self: self$13
      };
      const buttonDark = {
        name: "Button",
        common: derived$1,
        self(vars) {
          const commonSelf = self$13(vars);
          commonSelf.waveOpacity = "0.8";
          commonSelf.colorOpacitySecondary = "0.16";
          commonSelf.colorOpacitySecondaryHover = "0.2";
          commonSelf.colorOpacitySecondaryPressed = "0.12";
          return commonSelf;
        }
      };
      const style$a = c$1([cB("button", `
 margin: 0;
 font-weight: var(--n-font-weight);
 line-height: 1;
 font-family: inherit;
 padding: var(--n-padding);
 height: var(--n-height);
 font-size: var(--n-font-size);
 border-radius: var(--n-border-radius);
 color: var(--n-text-color);
 background-color: var(--n-color);
 width: var(--n-width);
 white-space: nowrap;
 outline: none;
 position: relative;
 z-index: auto;
 border: none;
 display: inline-flex;
 flex-wrap: nowrap;
 flex-shrink: 0;
 align-items: center;
 justify-content: center;
 user-select: none;
 -webkit-user-select: none;
 text-align: center;
 cursor: pointer;
 text-decoration: none;
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 opacity .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `, [cM("color", [cE("border", {
        borderColor: "var(--n-border-color)"
      }), cM("disabled", [cE("border", {
        borderColor: "var(--n-border-color-disabled)"
      })]), cNotM("disabled", [c$1("&:focus", [cE("state-border", {
        borderColor: "var(--n-border-color-focus)"
      })]), c$1("&:hover", [cE("state-border", {
        borderColor: "var(--n-border-color-hover)"
      })]), c$1("&:active", [cE("state-border", {
        borderColor: "var(--n-border-color-pressed)"
      })]), cM("pressed", [cE("state-border", {
        borderColor: "var(--n-border-color-pressed)"
      })])])]), cM("disabled", {
        backgroundColor: "var(--n-color-disabled)",
        color: "var(--n-text-color-disabled)"
      }, [cE("border", {
        border: "var(--n-border-disabled)"
      })]), cNotM("disabled", [c$1("&:focus", {
        backgroundColor: "var(--n-color-focus)",
        color: "var(--n-text-color-focus)"
      }, [cE("state-border", {
        border: "var(--n-border-focus)"
      })]), c$1("&:hover", {
        backgroundColor: "var(--n-color-hover)",
        color: "var(--n-text-color-hover)"
      }, [cE("state-border", {
        border: "var(--n-border-hover)"
      })]), c$1("&:active", {
        backgroundColor: "var(--n-color-pressed)",
        color: "var(--n-text-color-pressed)"
      }, [cE("state-border", {
        border: "var(--n-border-pressed)"
      })]), cM("pressed", {
        backgroundColor: "var(--n-color-pressed)",
        color: "var(--n-text-color-pressed)"
      }, [cE("state-border", {
        border: "var(--n-border-pressed)"
      })])]), cM("loading", "cursor: wait;"), cB("base-wave", `
 pointer-events: none;
 top: 0;
 right: 0;
 bottom: 0;
 left: 0;
 animation-iteration-count: 1;
 animation-duration: var(--n-ripple-duration);
 animation-timing-function: var(--n-bezier-ease-out), var(--n-bezier-ease-out);
 `, [cM("active", {
        zIndex: 1,
        animationName: "button-wave-spread, button-wave-opacity"
      })]), isBrowser$2 && "MozBoxSizing" in document.createElement("div").style ? c$1("&::moz-focus-inner", {
        border: 0
      }) : null, cE("border, state-border", `
 position: absolute;
 left: 0;
 top: 0;
 right: 0;
 bottom: 0;
 border-radius: inherit;
 transition: border-color .3s var(--n-bezier);
 pointer-events: none;
 `), cE("border", {
        border: "var(--n-border)"
      }), cE("state-border", {
        border: "var(--n-border)",
        borderColor: "#0000",
        zIndex: 1
      }), cE("icon", `
 margin: var(--n-icon-margin);
 margin-left: 0;
 height: var(--n-icon-size);
 width: var(--n-icon-size);
 max-width: var(--n-icon-size);
 font-size: var(--n-icon-size);
 position: relative;
 flex-shrink: 0;
 `, [cB("icon-slot", `
 height: var(--n-icon-size);
 width: var(--n-icon-size);
 position: absolute;
 left: 0;
 top: 50%;
 transform: translateY(-50%);
 display: flex;
 align-items: center;
 justify-content: center;
 `, [iconSwitchTransition({
        top: "50%",
        originalTransform: "translateY(-50%)"
      })]), fadeInWidthExpandTransition()]), cE("content", `
 display: flex;
 align-items: center;
 flex-wrap: nowrap;
 min-width: 0;
 `, [c$1("~", [cE("icon", {
        margin: "var(--n-icon-margin)",
        marginRight: 0
      })])]), cM("block", `
 display: flex;
 width: 100%;
 `), cM("dashed", [cE("border, state-border", {
        borderStyle: "dashed !important"
      })]), cM("disabled", {
        cursor: "not-allowed",
        opacity: "var(--n-opacity-disabled)"
      })]), c$1("@keyframes button-wave-spread", {
        from: {
          boxShadow: "0 0 0.5px 0 var(--n-ripple-color)"
        },
        to: {
          // don't use exact 5px since chrome will display the animation with glitches
          boxShadow: "0 0 0.5px 4.5px var(--n-ripple-color)"
        }
      }), c$1("@keyframes button-wave-opacity", {
        from: {
          opacity: "var(--n-wave-opacity)"
        },
        to: {
          opacity: 0
        }
      })]);
      const buttonProps = Object.assign(Object.assign({}, useTheme.props), {
        color: String,
        textColor: String,
        text: Boolean,
        block: Boolean,
        loading: Boolean,
        disabled: Boolean,
        circle: Boolean,
        size: String,
        ghost: Boolean,
        round: Boolean,
        secondary: Boolean,
        tertiary: Boolean,
        quaternary: Boolean,
        strong: Boolean,
        focusable: {
          type: Boolean,
          default: true
        },
        keyboard: {
          type: Boolean,
          default: true
        },
        tag: {
          type: String,
          default: "button"
        },
        type: {
          type: String,
          default: "default"
        },
        dashed: Boolean,
        renderIcon: Function,
        iconPlacement: {
          type: String,
          default: "left"
        },
        attrType: {
          type: String,
          default: "button"
        },
        bordered: {
          type: Boolean,
          default: true
        },
        onClick: [Function, Array],
        nativeFocusBehavior: {
          type: Boolean,
          default: !isSafari
        }
      });
      const Button = vue.defineComponent({
        name: "Button",
        props: buttonProps,
        setup(props) {
          const selfElRef = vue.ref(null);
          const waveElRef = vue.ref(null);
          const enterPressedRef = vue.ref(false);
          const showBorderRef = useMemo(() => {
            return !props.quaternary && !props.tertiary && !props.secondary && !props.text && (!props.color || props.ghost || props.dashed) && props.bordered;
          });
          const NButtonGroup2 = vue.inject(buttonGroupInjectionKey, {});
          const {
            mergedSizeRef
          } = useFormItem({}, {
            defaultSize: "medium",
            mergedSize: (NFormItem2) => {
              const {
                size: size2
              } = props;
              if (size2) return size2;
              const {
                size: buttonGroupSize
              } = NButtonGroup2;
              if (buttonGroupSize) return buttonGroupSize;
              const {
                mergedSize: formItemSize2
              } = NFormItem2 || {};
              if (formItemSize2) {
                return formItemSize2.value;
              }
              return "medium";
            }
          });
          const mergedFocusableRef = vue.computed(() => {
            return props.focusable && !props.disabled;
          });
          const handleMousedown = (e) => {
            var _a;
            if (!mergedFocusableRef.value) {
              e.preventDefault();
            }
            if (props.nativeFocusBehavior) {
              return;
            }
            e.preventDefault();
            if (props.disabled) {
              return;
            }
            if (mergedFocusableRef.value) {
              (_a = selfElRef.value) === null || _a === void 0 ? void 0 : _a.focus({
                preventScroll: true
              });
            }
          };
          const handleClick = (e) => {
            var _a;
            if (!props.disabled && !props.loading) {
              const {
                onClick
              } = props;
              if (onClick) call(onClick, e);
              if (!props.text) {
                (_a = waveElRef.value) === null || _a === void 0 ? void 0 : _a.play();
              }
            }
          };
          const handleKeyup = (e) => {
            switch (e.key) {
              case "Enter":
                if (!props.keyboard) {
                  return;
                }
                enterPressedRef.value = false;
            }
          };
          const handleKeydown = (e) => {
            switch (e.key) {
              case "Enter":
                if (!props.keyboard || props.loading) {
                  e.preventDefault();
                  return;
                }
                enterPressedRef.value = true;
            }
          };
          const handleBlur = () => {
            enterPressedRef.value = false;
          };
          const {
            inlineThemeDisabled,
            mergedClsPrefixRef,
            mergedRtlRef
          } = useConfig(props);
          const themeRef = useTheme("Button", "-button", style$a, buttonLight, props, mergedClsPrefixRef);
          const rtlEnabledRef = useRtl("Button", mergedRtlRef, mergedClsPrefixRef);
          const cssVarsRef = vue.computed(() => {
            const theme = themeRef.value;
            const {
              common: {
                cubicBezierEaseInOut: cubicBezierEaseInOut2,
                cubicBezierEaseOut: cubicBezierEaseOut2
              },
              self: self2
            } = theme;
            const {
              rippleDuration,
              opacityDisabled,
              fontWeight,
              fontWeightStrong
            } = self2;
            const size2 = mergedSizeRef.value;
            const {
              dashed,
              type,
              ghost,
              text,
              color,
              round,
              circle,
              textColor,
              secondary,
              tertiary,
              quaternary,
              strong
            } = props;
            const fontProps = {
              "font-weight": strong ? fontWeightStrong : fontWeight
            };
            let colorProps = {
              "--n-color": "initial",
              "--n-color-hover": "initial",
              "--n-color-pressed": "initial",
              "--n-color-focus": "initial",
              "--n-color-disabled": "initial",
              "--n-ripple-color": "initial",
              "--n-text-color": "initial",
              "--n-text-color-hover": "initial",
              "--n-text-color-pressed": "initial",
              "--n-text-color-focus": "initial",
              "--n-text-color-disabled": "initial"
            };
            const typeIsTertiary = type === "tertiary";
            const typeIsDefault = type === "default";
            const mergedType = typeIsTertiary ? "default" : type;
            if (text) {
              const propTextColor = textColor || color;
              const mergedTextColor = propTextColor || self2[createKey("textColorText", mergedType)];
              colorProps = {
                "--n-color": "#0000",
                "--n-color-hover": "#0000",
                "--n-color-pressed": "#0000",
                "--n-color-focus": "#0000",
                "--n-color-disabled": "#0000",
                "--n-ripple-color": "#0000",
                "--n-text-color": mergedTextColor,
                "--n-text-color-hover": propTextColor ? createHoverColor(propTextColor) : self2[createKey("textColorTextHover", mergedType)],
                "--n-text-color-pressed": propTextColor ? createPressedColor(propTextColor) : self2[createKey("textColorTextPressed", mergedType)],
                "--n-text-color-focus": propTextColor ? createHoverColor(propTextColor) : self2[createKey("textColorTextHover", mergedType)],
                "--n-text-color-disabled": propTextColor || self2[createKey("textColorTextDisabled", mergedType)]
              };
            } else if (ghost || dashed) {
              const mergedTextColor = textColor || color;
              colorProps = {
                "--n-color": "#0000",
                "--n-color-hover": "#0000",
                "--n-color-pressed": "#0000",
                "--n-color-focus": "#0000",
                "--n-color-disabled": "#0000",
                "--n-ripple-color": color || self2[createKey("rippleColor", mergedType)],
                "--n-text-color": mergedTextColor || self2[createKey("textColorGhost", mergedType)],
                "--n-text-color-hover": mergedTextColor ? createHoverColor(mergedTextColor) : self2[createKey("textColorGhostHover", mergedType)],
                "--n-text-color-pressed": mergedTextColor ? createPressedColor(mergedTextColor) : self2[createKey("textColorGhostPressed", mergedType)],
                "--n-text-color-focus": mergedTextColor ? createHoverColor(mergedTextColor) : self2[createKey("textColorGhostHover", mergedType)],
                "--n-text-color-disabled": mergedTextColor || self2[createKey("textColorGhostDisabled", mergedType)]
              };
            } else if (secondary) {
              const typeTextColor = typeIsDefault ? self2.textColor : typeIsTertiary ? self2.textColorTertiary : self2[createKey("color", mergedType)];
              const mergedTextColor = color || typeTextColor;
              const isColoredType = type !== "default" && type !== "tertiary";
              colorProps = {
                "--n-color": isColoredType ? changeColor(mergedTextColor, {
                  alpha: Number(self2.colorOpacitySecondary)
                }) : self2.colorSecondary,
                "--n-color-hover": isColoredType ? changeColor(mergedTextColor, {
                  alpha: Number(self2.colorOpacitySecondaryHover)
                }) : self2.colorSecondaryHover,
                "--n-color-pressed": isColoredType ? changeColor(mergedTextColor, {
                  alpha: Number(self2.colorOpacitySecondaryPressed)
                }) : self2.colorSecondaryPressed,
                "--n-color-focus": isColoredType ? changeColor(mergedTextColor, {
                  alpha: Number(self2.colorOpacitySecondaryHover)
                }) : self2.colorSecondaryHover,
                "--n-color-disabled": self2.colorSecondary,
                "--n-ripple-color": "#0000",
                "--n-text-color": mergedTextColor,
                "--n-text-color-hover": mergedTextColor,
                "--n-text-color-pressed": mergedTextColor,
                "--n-text-color-focus": mergedTextColor,
                "--n-text-color-disabled": mergedTextColor
              };
            } else if (tertiary || quaternary) {
              const typeColor = typeIsDefault ? self2.textColor : typeIsTertiary ? self2.textColorTertiary : self2[createKey("color", mergedType)];
              const mergedColor = color || typeColor;
              if (tertiary) {
                colorProps["--n-color"] = self2.colorTertiary;
                colorProps["--n-color-hover"] = self2.colorTertiaryHover;
                colorProps["--n-color-pressed"] = self2.colorTertiaryPressed;
                colorProps["--n-color-focus"] = self2.colorSecondaryHover;
                colorProps["--n-color-disabled"] = self2.colorTertiary;
              } else {
                colorProps["--n-color"] = self2.colorQuaternary;
                colorProps["--n-color-hover"] = self2.colorQuaternaryHover;
                colorProps["--n-color-pressed"] = self2.colorQuaternaryPressed;
                colorProps["--n-color-focus"] = self2.colorQuaternaryHover;
                colorProps["--n-color-disabled"] = self2.colorQuaternary;
              }
              colorProps["--n-ripple-color"] = "#0000";
              colorProps["--n-text-color"] = mergedColor;
              colorProps["--n-text-color-hover"] = mergedColor;
              colorProps["--n-text-color-pressed"] = mergedColor;
              colorProps["--n-text-color-focus"] = mergedColor;
              colorProps["--n-text-color-disabled"] = mergedColor;
            } else {
              colorProps = {
                "--n-color": color || self2[createKey("color", mergedType)],
                "--n-color-hover": color ? createHoverColor(color) : self2[createKey("colorHover", mergedType)],
                "--n-color-pressed": color ? createPressedColor(color) : self2[createKey("colorPressed", mergedType)],
                "--n-color-focus": color ? createHoverColor(color) : self2[createKey("colorFocus", mergedType)],
                "--n-color-disabled": color || self2[createKey("colorDisabled", mergedType)],
                "--n-ripple-color": color || self2[createKey("rippleColor", mergedType)],
                "--n-text-color": textColor || (color ? self2.textColorPrimary : typeIsTertiary ? self2.textColorTertiary : self2[createKey("textColor", mergedType)]),
                "--n-text-color-hover": textColor || (color ? self2.textColorHoverPrimary : self2[createKey("textColorHover", mergedType)]),
                "--n-text-color-pressed": textColor || (color ? self2.textColorPressedPrimary : self2[createKey("textColorPressed", mergedType)]),
                "--n-text-color-focus": textColor || (color ? self2.textColorFocusPrimary : self2[createKey("textColorFocus", mergedType)]),
                "--n-text-color-disabled": textColor || (color ? self2.textColorDisabledPrimary : self2[createKey("textColorDisabled", mergedType)])
              };
            }
            let borderProps = {
              "--n-border": "initial",
              "--n-border-hover": "initial",
              "--n-border-pressed": "initial",
              "--n-border-focus": "initial",
              "--n-border-disabled": "initial"
            };
            if (text) {
              borderProps = {
                "--n-border": "none",
                "--n-border-hover": "none",
                "--n-border-pressed": "none",
                "--n-border-focus": "none",
                "--n-border-disabled": "none"
              };
            } else {
              borderProps = {
                "--n-border": self2[createKey("border", mergedType)],
                "--n-border-hover": self2[createKey("borderHover", mergedType)],
                "--n-border-pressed": self2[createKey("borderPressed", mergedType)],
                "--n-border-focus": self2[createKey("borderFocus", mergedType)],
                "--n-border-disabled": self2[createKey("borderDisabled", mergedType)]
              };
            }
            const {
              [createKey("height", size2)]: height,
              [createKey("fontSize", size2)]: fontSize2,
              [createKey("padding", size2)]: padding,
              [createKey("paddingRound", size2)]: paddingRound,
              [createKey("iconSize", size2)]: iconSize,
              [createKey("borderRadius", size2)]: borderRadius,
              [createKey("iconMargin", size2)]: iconMargin,
              waveOpacity
            } = self2;
            const sizeProps = {
              "--n-width": circle && !text ? height : "initial",
              "--n-height": text ? "initial" : height,
              "--n-font-size": fontSize2,
              "--n-padding": circle ? "initial" : text ? "initial" : round ? paddingRound : padding,
              "--n-icon-size": iconSize,
              "--n-icon-margin": iconMargin,
              "--n-border-radius": text ? "initial" : circle || round ? height : borderRadius
            };
            return Object.assign(Object.assign(Object.assign(Object.assign({
              "--n-bezier": cubicBezierEaseInOut2,
              "--n-bezier-ease-out": cubicBezierEaseOut2,
              "--n-ripple-duration": rippleDuration,
              "--n-opacity-disabled": opacityDisabled,
              "--n-wave-opacity": waveOpacity
            }, fontProps), colorProps), borderProps), sizeProps);
          });
          const themeClassHandle = inlineThemeDisabled ? useThemeClass("button", vue.computed(() => {
            let hash = "";
            const {
              dashed,
              type,
              ghost,
              text,
              color,
              round,
              circle,
              textColor,
              secondary,
              tertiary,
              quaternary,
              strong
            } = props;
            if (dashed) hash += "a";
            if (ghost) hash += "b";
            if (text) hash += "c";
            if (round) hash += "d";
            if (circle) hash += "e";
            if (secondary) hash += "f";
            if (tertiary) hash += "g";
            if (quaternary) hash += "h";
            if (strong) hash += "i";
            if (color) hash += `j${color2Class(color)}`;
            if (textColor) hash += `k${color2Class(textColor)}`;
            const {
              value: size2
            } = mergedSizeRef;
            hash += `l${size2[0]}`;
            hash += `m${type[0]}`;
            return hash;
          }), cssVarsRef, props) : void 0;
          return {
            selfElRef,
            waveElRef,
            mergedClsPrefix: mergedClsPrefixRef,
            mergedFocusable: mergedFocusableRef,
            mergedSize: mergedSizeRef,
            showBorder: showBorderRef,
            enterPressed: enterPressedRef,
            rtlEnabled: rtlEnabledRef,
            handleMousedown,
            handleKeydown,
            handleBlur,
            handleKeyup,
            handleClick,
            customColorCssVars: vue.computed(() => {
              const {
                color
              } = props;
              if (!color) return null;
              const hoverColor = createHoverColor(color);
              return {
                "--n-border-color": color,
                "--n-border-color-hover": hoverColor,
                "--n-border-color-pressed": createPressedColor(color),
                "--n-border-color-focus": hoverColor,
                "--n-border-color-disabled": color
              };
            }),
            cssVars: inlineThemeDisabled ? void 0 : cssVarsRef,
            themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
            onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
          };
        },
        render() {
          const {
            mergedClsPrefix,
            tag: Component,
            onRender
          } = this;
          onRender === null || onRender === void 0 ? void 0 : onRender();
          const children = resolveWrappedSlot(this.$slots.default, (children2) => children2 && vue.h("span", {
            class: `${mergedClsPrefix}-button__content`
          }, children2));
          return vue.h(Component, {
            ref: "selfElRef",
            class: [
              this.themeClass,
              `${mergedClsPrefix}-button`,
              `${mergedClsPrefix}-button--${this.type}-type`,
              `${mergedClsPrefix}-button--${this.mergedSize}-type`,
              this.rtlEnabled && `${mergedClsPrefix}-button--rtl`,
              this.disabled && `${mergedClsPrefix}-button--disabled`,
              this.block && `${mergedClsPrefix}-button--block`,
              this.enterPressed && `${mergedClsPrefix}-button--pressed`,
              !this.text && this.dashed && `${mergedClsPrefix}-button--dashed`,
              this.color && `${mergedClsPrefix}-button--color`,
              this.secondary && `${mergedClsPrefix}-button--secondary`,
              this.loading && `${mergedClsPrefix}-button--loading`,
              this.ghost && `${mergedClsPrefix}-button--ghost`
              // required for button group border collapse
            ],
            tabindex: this.mergedFocusable ? 0 : -1,
            type: this.attrType,
            style: this.cssVars,
            disabled: this.disabled,
            onClick: this.handleClick,
            onBlur: this.handleBlur,
            onMousedown: this.handleMousedown,
            onKeyup: this.handleKeyup,
            onKeydown: this.handleKeydown
          }, this.iconPlacement === "right" && children, vue.h(NFadeInExpandTransition, {
            width: true
          }, {
            default: () => resolveWrappedSlot(this.$slots.icon, (children2) => (this.loading || this.renderIcon || children2) && vue.h("span", {
              class: `${mergedClsPrefix}-button__icon`,
              style: {
                margin: isSlotEmpty(this.$slots.default) ? "0" : ""
              }
            }, vue.h(NIconSwitchTransition, null, {
              default: () => this.loading ? vue.h(NBaseLoading, {
                clsPrefix: mergedClsPrefix,
                key: "loading",
                class: `${mergedClsPrefix}-icon-slot`,
                strokeWidth: 20
              }) : vue.h("div", {
                key: "icon",
                class: `${mergedClsPrefix}-icon-slot`,
                role: "none"
              }, this.renderIcon ? this.renderIcon() : children2)
            })))
          }), this.iconPlacement === "left" && children, !this.text ? vue.h(NBaseWave, {
            ref: "waveElRef",
            clsPrefix: mergedClsPrefix
          }) : null, this.showBorder ? vue.h("div", {
            "aria-hidden": true,
            class: `${mergedClsPrefix}-button__border`,
            style: this.customColorCssVars
          }) : null, this.showBorder ? vue.h("div", {
            "aria-hidden": true,
            class: `${mergedClsPrefix}-button__state-border`,
            style: this.customColorCssVars
          }) : null);
        }
      });
      const zero = "0!important";
      const n1 = "-1px!important";
      function createLeftBorderStyle(type) {
        return cM(`${type}-type`, [c$1("& +", [cB("button", {}, [cM(`${type}-type`, [cE("border", {
          borderLeftWidth: zero
        }), cE("state-border", {
          left: n1
        })])])])]);
      }
      function createTopBorderStyle(type) {
        return cM(`${type}-type`, [c$1("& +", [cB("button", [cM(`${type}-type`, [cE("border", {
          borderTopWidth: zero
        }), cE("state-border", {
          top: n1
        })])])])]);
      }
      const style$9 = cB("button-group", `
 flex-wrap: nowrap;
 display: inline-flex;
 position: relative;
`, [cNotM("vertical", {
        flexDirection: "row"
      }, [cNotM("rtl", [cB("button", [c$1("&:first-child:not(:last-child)", `
 margin-right: ${zero};
 border-top-right-radius: ${zero};
 border-bottom-right-radius: ${zero};
 `), c$1("&:last-child:not(:first-child)", `
 margin-left: ${zero};
 border-top-left-radius: ${zero};
 border-bottom-left-radius: ${zero};
 `), c$1("&:not(:first-child):not(:last-child)", `
 margin-left: ${zero};
 margin-right: ${zero};
 border-radius: ${zero};
 `), createLeftBorderStyle("default"), cM("ghost", [createLeftBorderStyle("primary"), createLeftBorderStyle("info"), createLeftBorderStyle("success"), createLeftBorderStyle("warning"), createLeftBorderStyle("error")])])])]), cM("vertical", {
        flexDirection: "column"
      }, [cB("button", [c$1("&:first-child:not(:last-child)", `
 margin-bottom: ${zero};
 margin-left: ${zero};
 margin-right: ${zero};
 border-bottom-left-radius: ${zero};
 border-bottom-right-radius: ${zero};
 `), c$1("&:last-child:not(:first-child)", `
 margin-top: ${zero};
 margin-left: ${zero};
 margin-right: ${zero};
 border-top-left-radius: ${zero};
 border-top-right-radius: ${zero};
 `), c$1("&:not(:first-child):not(:last-child)", `
 margin: ${zero};
 border-radius: ${zero};
 `), createTopBorderStyle("default"), cM("ghost", [createTopBorderStyle("primary"), createTopBorderStyle("info"), createTopBorderStyle("success"), createTopBorderStyle("warning"), createTopBorderStyle("error")])])])]);
      const buttonGroupProps = {
        size: {
          type: String,
          default: void 0
        },
        vertical: Boolean
      };
      const NButtonGroup = vue.defineComponent({
        name: "ButtonGroup",
        props: buttonGroupProps,
        setup(props) {
          const {
            mergedClsPrefixRef,
            mergedRtlRef
          } = useConfig(props);
          useStyle("-button-group", style$9, mergedClsPrefixRef);
          vue.provide(buttonGroupInjectionKey, props);
          const rtlEnabledRef = useRtl("ButtonGroup", mergedRtlRef, mergedClsPrefixRef);
          return {
            rtlEnabled: rtlEnabledRef,
            mergedClsPrefix: mergedClsPrefixRef
          };
        },
        render() {
          const {
            mergedClsPrefix
          } = this;
          return vue.h("div", {
            class: [`${mergedClsPrefix}-button-group`, this.rtlEnabled && `${mergedClsPrefix}-button-group--rtl`, this.vertical && `${mergedClsPrefix}-button-group--vertical`],
            role: "group"
          }, this.$slots);
        }
      });
      const commonVariables$e = {
        titleFontSize: "22px"
      };
      function self$12(vars) {
        const {
          borderRadius,
          fontSize: fontSize2,
          lineHeight: lineHeight2,
          textColor2,
          textColor1,
          textColorDisabled,
          dividerColor,
          fontWeightStrong,
          primaryColor,
          baseColor,
          hoverColor,
          cardColor,
          modalColor,
          popoverColor
        } = vars;
        return Object.assign(Object.assign({}, commonVariables$e), {
          borderRadius,
          borderColor: composite(cardColor, dividerColor),
          borderColorModal: composite(modalColor, dividerColor),
          borderColorPopover: composite(popoverColor, dividerColor),
          textColor: textColor2,
          titleFontWeight: fontWeightStrong,
          titleTextColor: textColor1,
          dayTextColor: textColorDisabled,
          fontSize: fontSize2,
          lineHeight: lineHeight2,
          dateColorCurrent: primaryColor,
          dateTextColorCurrent: baseColor,
          cellColorHover: composite(cardColor, hoverColor),
          cellColorHoverModal: composite(modalColor, hoverColor),
          cellColorHoverPopover: composite(popoverColor, hoverColor),
          cellColor: cardColor,
          cellColorModal: modalColor,
          cellColorPopover: popoverColor,
          barColor: primaryColor
        });
      }
      const calendarLight = createTheme({
        name: "Calendar",
        common: derived,
        peers: {
          Button: buttonLight
        },
        self: self$12
      });
      const calendarDark = {
        name: "Calendar",
        common: derived$1,
        peers: {
          Button: buttonDark
        },
        self: self$12
      };
      function self$11(vars) {
        const {
          fontSize: fontSize2,
          boxShadow2,
          popoverColor,
          textColor2,
          borderRadius,
          borderColor,
          heightSmall,
          heightMedium,
          heightLarge,
          fontSizeSmall,
          fontSizeMedium,
          fontSizeLarge,
          dividerColor
        } = vars;
        return {
          panelFontSize: fontSize2,
          boxShadow: boxShadow2,
          color: popoverColor,
          textColor: textColor2,
          borderRadius,
          border: `1px solid ${borderColor}`,
          heightSmall,
          heightMedium,
          heightLarge,
          fontSizeSmall,
          fontSizeMedium,
          fontSizeLarge,
          dividerColor
        };
      }
      const colorPickerLight = createTheme({
        name: "ColorPicker",
        common: derived,
        peers: {
          Input: inputLight,
          Button: buttonLight
        },
        self: self$11
      });
      const colorPickerDark = {
        name: "ColorPicker",
        common: derived$1,
        peers: {
          Input: inputDark,
          Button: buttonDark
        },
        self: self$11
      };
      const commonVariables$d = {
        paddingSmall: "12px 16px 12px",
        paddingMedium: "19px 24px 20px",
        paddingLarge: "23px 32px 24px",
        paddingHuge: "27px 40px 28px",
        titleFontSizeSmall: "16px",
        titleFontSizeMedium: "18px",
        titleFontSizeLarge: "18px",
        titleFontSizeHuge: "18px",
        closeIconSize: "18px",
        closeSize: "22px"
      };
      function self$10(vars) {
        const {
          primaryColor,
          borderRadius,
          lineHeight: lineHeight2,
          fontSize: fontSize2,
          cardColor,
          textColor2,
          textColor1,
          dividerColor,
          fontWeightStrong,
          closeIconColor,
          closeIconColorHover,
          closeIconColorPressed,
          closeColorHover,
          closeColorPressed,
          modalColor,
          boxShadow1,
          popoverColor,
          actionColor
        } = vars;
        return Object.assign(Object.assign({}, commonVariables$d), {
          lineHeight: lineHeight2,
          color: cardColor,
          colorModal: modalColor,
          colorPopover: popoverColor,
          colorTarget: primaryColor,
          colorEmbedded: actionColor,
          colorEmbeddedModal: actionColor,
          colorEmbeddedPopover: actionColor,
          textColor: textColor2,
          titleTextColor: textColor1,
          borderColor: dividerColor,
          actionColor,
          titleFontWeight: fontWeightStrong,
          closeColorHover,
          closeColorPressed,
          closeBorderRadius: borderRadius,
          closeIconColor,
          closeIconColorHover,
          closeIconColorPressed,
          fontSizeSmall: fontSize2,
          fontSizeMedium: fontSize2,
          fontSizeLarge: fontSize2,
          fontSizeHuge: fontSize2,
          boxShadow: boxShadow1,
          borderRadius
        });
      }
      const cardLight = {
        name: "Card",
        common: derived,
        self: self$10
      };
      const cardDark = {
        name: "Card",
        common: derived$1,
        self(vars) {
          const commonSelf = self$10(vars);
          const {
            cardColor,
            modalColor,
            popoverColor
          } = vars;
          commonSelf.colorEmbedded = cardColor;
          commonSelf.colorEmbeddedModal = modalColor;
          commonSelf.colorEmbeddedPopover = popoverColor;
          return commonSelf;
        }
      };
      function self$$() {
        return {
          dotSize: "8px",
          dotColor: "rgba(255, 255, 255, .3)",
          dotColorActive: "rgba(255, 255, 255, 1)",
          dotColorFocus: "rgba(255, 255, 255, .5)",
          dotLineWidth: "16px",
          dotLineWidthActive: "24px",
          arrowColor: "#eee"
        };
      }
      const carouselLight = {
        name: "Carousel",
        common: derived,
        self: self$$
      };
      const carouselDark = {
        name: "Carousel",
        common: derived$1,
        self: self$$
      };
      const commonVariables$c = {
        sizeSmall: "14px",
        sizeMedium: "16px",
        sizeLarge: "18px",
        labelPadding: "0 8px",
        labelFontWeight: "400"
      };
      function self$_(vars) {
        const {
          baseColor,
          inputColorDisabled,
          cardColor,
          modalColor,
          popoverColor,
          textColorDisabled,
          borderColor,
          primaryColor,
          textColor2,
          fontSizeSmall,
          fontSizeMedium,
          fontSizeLarge,
          borderRadiusSmall,
          lineHeight: lineHeight2
        } = vars;
        return Object.assign(Object.assign({}, commonVariables$c), {
          labelLineHeight: lineHeight2,
          fontSizeSmall,
          fontSizeMedium,
          fontSizeLarge,
          borderRadius: borderRadiusSmall,
          color: baseColor,
          colorChecked: primaryColor,
          colorDisabled: inputColorDisabled,
          colorDisabledChecked: inputColorDisabled,
          colorTableHeader: cardColor,
          colorTableHeaderModal: modalColor,
          colorTableHeaderPopover: popoverColor,
          checkMarkColor: baseColor,
          checkMarkColorDisabled: textColorDisabled,
          checkMarkColorDisabledChecked: textColorDisabled,
          border: `1px solid ${borderColor}`,
          borderDisabled: `1px solid ${borderColor}`,
          borderDisabledChecked: `1px solid ${borderColor}`,
          borderChecked: `1px solid ${primaryColor}`,
          borderFocus: `1px solid ${primaryColor}`,
          boxShadowFocus: `0 0 0 2px ${changeColor(primaryColor, {
          alpha: 0.3
        })}`,
          textColor: textColor2,
          textColorDisabled
        });
      }
      const checkboxLight = {
        name: "Checkbox",
        common: derived,
        self: self$_
      };
      const checkboxDark = {
        name: "Checkbox",
        common: derived$1,
        self(vars) {
          const {
            cardColor
          } = vars;
          const commonSelf = self$_(vars);
          commonSelf.color = "#0000";
          commonSelf.checkMarkColor = cardColor;
          return commonSelf;
        }
      };
      function self$Z(vars) {
        const {
          borderRadius,
          boxShadow2,
          popoverColor,
          textColor2,
          textColor3,
          primaryColor,
          textColorDisabled,
          dividerColor,
          hoverColor,
          fontSizeMedium,
          heightMedium
        } = vars;
        return {
          menuBorderRadius: borderRadius,
          menuColor: popoverColor,
          menuBoxShadow: boxShadow2,
          menuDividerColor: dividerColor,
          menuHeight: "calc(var(--n-option-height) * 6.6)",
          optionArrowColor: textColor3,
          optionHeight: heightMedium,
          optionFontSize: fontSizeMedium,
          optionColorHover: hoverColor,
          optionTextColor: textColor2,
          optionTextColorActive: primaryColor,
          optionTextColorDisabled: textColorDisabled,
          optionCheckMarkColor: primaryColor,
          loadingColor: primaryColor,
          columnWidth: "180px"
        };
      }
      const cascaderLight = createTheme({
        name: "Cascader",
        common: derived,
        peers: {
          InternalSelectMenu: internalSelectMenuLight,
          InternalSelection: internalSelectionLight,
          Scrollbar: scrollbarLight,
          Checkbox: checkboxLight,
          Empty: emptyLight
        },
        self: self$Z
      });
      const cascaderDark = {
        name: "Cascader",
        common: derived$1,
        peers: {
          InternalSelectMenu: internalSelectMenuDark,
          InternalSelection: internalSelectionDark,
          Scrollbar: scrollbarDark,
          Checkbox: checkboxDark,
          Empty: emptyLight
        },
        self: self$Z
      };
      const CheckMark = vue.h("svg", {
        viewBox: "0 0 64 64",
        class: "check-icon"
      }, vue.h("path", {
        d: "M50.42,16.76L22.34,39.45l-8.1-11.46c-1.12-1.58-3.3-1.96-4.88-0.84c-1.58,1.12-1.95,3.3-0.84,4.88l10.26,14.51  c0.56,0.79,1.42,1.31,2.38,1.45c0.16,0.02,0.32,0.03,0.48,0.03c0.8,0,1.57-0.27,2.2-0.78l30.99-25.03c1.5-1.21,1.74-3.42,0.52-4.92  C54.13,15.78,51.93,15.55,50.42,16.76z"
      }));
      const LineMark = vue.h("svg", {
        viewBox: "0 0 100 100",
        class: "line-icon"
      }, vue.h("path", {
        d: "M80.2,55.5H21.4c-2.8,0-5.1-2.5-5.1-5.5l0,0c0-3,2.3-5.5,5.1-5.5h58.7c2.8,0,5.1,2.5,5.1,5.5l0,0C85.2,53.1,82.9,55.5,80.2,55.5z"
      }));
      const checkboxGroupInjectionKey = createInjectionKey("n-checkbox-group");
      const checkboxGroupProps = {
        min: Number,
        max: Number,
        size: String,
        value: Array,
        defaultValue: {
          type: Array,
          default: null
        },
        disabled: {
          type: Boolean,
          default: void 0
        },
        "onUpdate:value": [Function, Array],
        onUpdateValue: [Function, Array],
        // deprecated
        onChange: [Function, Array]
      };
      vue.defineComponent({
        name: "CheckboxGroup",
        props: checkboxGroupProps,
        setup(props) {
          const {
            mergedClsPrefixRef
          } = useConfig(props);
          const formItem = useFormItem(props);
          const {
            mergedSizeRef,
            mergedDisabledRef
          } = formItem;
          const uncontrolledValueRef = vue.ref(props.defaultValue);
          const controlledValueRef = vue.computed(() => props.value);
          const mergedValueRef = useMergedState(controlledValueRef, uncontrolledValueRef);
          const checkedCount = vue.computed(() => {
            var _a;
            return ((_a = mergedValueRef.value) === null || _a === void 0 ? void 0 : _a.length) || 0;
          });
          const valueSetRef = vue.computed(() => {
            if (Array.isArray(mergedValueRef.value)) {
              return new Set(mergedValueRef.value);
            }
            return /* @__PURE__ */ new Set();
          });
          function toggleCheckbox(checked, checkboxValue) {
            const {
              nTriggerFormInput,
              nTriggerFormChange
            } = formItem;
            const {
              onChange,
              "onUpdate:value": _onUpdateValue,
              onUpdateValue
            } = props;
            if (Array.isArray(mergedValueRef.value)) {
              const groupValue = Array.from(mergedValueRef.value);
              const index = groupValue.findIndex((value) => value === checkboxValue);
              if (checked) {
                if (!~index) {
                  groupValue.push(checkboxValue);
                  if (onUpdateValue) {
                    call(onUpdateValue, groupValue, {
                      actionType: "check",
                      value: checkboxValue
                    });
                  }
                  if (_onUpdateValue) {
                    call(_onUpdateValue, groupValue, {
                      actionType: "check",
                      value: checkboxValue
                    });
                  }
                  nTriggerFormInput();
                  nTriggerFormChange();
                  uncontrolledValueRef.value = groupValue;
                  if (onChange) call(onChange, groupValue);
                }
              } else {
                if (~index) {
                  groupValue.splice(index, 1);
                  if (onUpdateValue) {
                    call(onUpdateValue, groupValue, {
                      actionType: "uncheck",
                      value: checkboxValue
                    });
                  }
                  if (_onUpdateValue) {
                    call(_onUpdateValue, groupValue, {
                      actionType: "uncheck",
                      value: checkboxValue
                    });
                  }
                  if (onChange) call(onChange, groupValue);
                  uncontrolledValueRef.value = groupValue;
                  nTriggerFormInput();
                  nTriggerFormChange();
                }
              }
            } else {
              if (checked) {
                if (onUpdateValue) {
                  call(onUpdateValue, [checkboxValue], {
                    actionType: "check",
                    value: checkboxValue
                  });
                }
                if (_onUpdateValue) {
                  call(_onUpdateValue, [checkboxValue], {
                    actionType: "check",
                    value: checkboxValue
                  });
                }
                if (onChange) call(onChange, [checkboxValue]);
                uncontrolledValueRef.value = [checkboxValue];
                nTriggerFormInput();
                nTriggerFormChange();
              } else {
                if (onUpdateValue) {
                  call(onUpdateValue, [], {
                    actionType: "uncheck",
                    value: checkboxValue
                  });
                }
                if (_onUpdateValue) {
                  call(_onUpdateValue, [], {
                    actionType: "uncheck",
                    value: checkboxValue
                  });
                }
                if (onChange) call(onChange, []);
                uncontrolledValueRef.value = [];
                nTriggerFormInput();
                nTriggerFormChange();
              }
            }
          }
          vue.provide(checkboxGroupInjectionKey, {
            checkedCountRef: checkedCount,
            maxRef: vue.toRef(props, "max"),
            minRef: vue.toRef(props, "min"),
            valueSetRef,
            disabledRef: mergedDisabledRef,
            mergedSizeRef,
            toggleCheckbox
          });
          return {
            mergedClsPrefix: mergedClsPrefixRef
          };
        },
        render() {
          return vue.h("div", {
            class: `${this.mergedClsPrefix}-checkbox-group`,
            role: "group"
          }, this.$slots);
        }
      });
      const style$8 = c$1([
        cB("checkbox", `
 font-size: var(--n-font-size);
 outline: none;
 cursor: pointer;
 display: inline-flex;
 flex-wrap: nowrap;
 align-items: flex-start;
 word-break: break-word;
 line-height: var(--n-size);
 --n-merged-color-table: var(--n-color-table);
 `, [cM("show-label", "line-height: var(--n-label-line-height);"), c$1("&:hover", [cB("checkbox-box", [cE("border", "border: var(--n-border-checked);")])]), c$1("&:focus:not(:active)", [cB("checkbox-box", [cE("border", `
 border: var(--n-border-focus);
 box-shadow: var(--n-box-shadow-focus);
 `)])]), cM("inside-table", [cB("checkbox-box", `
 background-color: var(--n-merged-color-table);
 `)]), cM("checked", [cB("checkbox-box", `
 background-color: var(--n-color-checked);
 `, [cB("checkbox-icon", [
          // if not set width to 100%, safari & old chrome won't display the icon
          c$1(".check-icon", `
 opacity: 1;
 transform: scale(1);
 `)
        ])])]), cM("indeterminate", [cB("checkbox-box", [cB("checkbox-icon", [c$1(".check-icon", `
 opacity: 0;
 transform: scale(.5);
 `), c$1(".line-icon", `
 opacity: 1;
 transform: scale(1);
 `)])])]), cM("checked, indeterminate", [c$1("&:focus:not(:active)", [cB("checkbox-box", [cE("border", `
 border: var(--n-border-checked);
 box-shadow: var(--n-box-shadow-focus);
 `)])]), cB("checkbox-box", `
 background-color: var(--n-color-checked);
 border-left: 0;
 border-top: 0;
 `, [cE("border", {
          border: "var(--n-border-checked)"
        })])]), cM("disabled", {
          cursor: "not-allowed"
        }, [cM("checked", [cB("checkbox-box", `
 background-color: var(--n-color-disabled-checked);
 `, [cE("border", {
          border: "var(--n-border-disabled-checked)"
        }), cB("checkbox-icon", [c$1(".check-icon, .line-icon", {
          fill: "var(--n-check-mark-color-disabled-checked)"
        })])])]), cB("checkbox-box", `
 background-color: var(--n-color-disabled);
 `, [cE("border", `
 border: var(--n-border-disabled);
 `), cB("checkbox-icon", [c$1(".check-icon, .line-icon", `
 fill: var(--n-check-mark-color-disabled);
 `)])]), cE("label", `
 color: var(--n-text-color-disabled);
 `)]), cB("checkbox-box-wrapper", `
 position: relative;
 width: var(--n-size);
 flex-shrink: 0;
 flex-grow: 0;
 user-select: none;
 -webkit-user-select: none;
 `), cB("checkbox-box", `
 position: absolute;
 left: 0;
 top: 50%;
 transform: translateY(-50%);
 height: var(--n-size);
 width: var(--n-size);
 display: inline-block;
 box-sizing: border-box;
 border-radius: var(--n-border-radius);
 background-color: var(--n-color);
 transition: background-color 0.3s var(--n-bezier);
 `, [cE("border", `
 transition:
 border-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 border-radius: inherit;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border: var(--n-border);
 `), cB("checkbox-icon", `
 display: flex;
 align-items: center;
 justify-content: center;
 position: absolute;
 left: 1px;
 right: 1px;
 top: 1px;
 bottom: 1px;
 `, [c$1(".check-icon, .line-icon", `
 width: 100%;
 fill: var(--n-check-mark-color);
 opacity: 0;
 transform: scale(0.5);
 transform-origin: center;
 transition:
 fill 0.3s var(--n-bezier),
 transform 0.3s var(--n-bezier),
 opacity 0.3s var(--n-bezier),
 border-color 0.3s var(--n-bezier);
 `), iconSwitchTransition({
          left: "1px",
          top: "1px"
        })])]), cE("label", `
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 user-select: none;
 -webkit-user-select: none;
 padding: var(--n-label-padding);
 font-weight: var(--n-label-font-weight);
 `, [c$1("&:empty", {
          display: "none"
        })])]),
        // modal table header checkbox
        insideModal(cB("checkbox", `
 --n-merged-color-table: var(--n-color-table-modal);
 `)),
        // popover table header checkbox
        insidePopover(cB("checkbox", `
 --n-merged-color-table: var(--n-color-table-popover);
 `))
      ]);
      const checkboxProps = Object.assign(Object.assign({}, useTheme.props), {
        size: String,
        checked: {
          type: [Boolean, String, Number],
          default: void 0
        },
        defaultChecked: {
          type: [Boolean, String, Number],
          default: false
        },
        value: [String, Number],
        disabled: {
          type: Boolean,
          default: void 0
        },
        indeterminate: Boolean,
        label: String,
        focusable: {
          type: Boolean,
          default: true
        },
        checkedValue: {
          type: [Boolean, String, Number],
          default: true
        },
        uncheckedValue: {
          type: [Boolean, String, Number],
          default: false
        },
        "onUpdate:checked": [Function, Array],
        onUpdateChecked: [Function, Array],
        // private
        privateInsideTable: Boolean,
        // deprecated
        onChange: [Function, Array]
      });
      const NCheckbox = vue.defineComponent({
        name: "Checkbox",
        props: checkboxProps,
        setup(props) {
          const NCheckboxGroup = vue.inject(checkboxGroupInjectionKey, null);
          const selfRef = vue.ref(null);
          const {
            mergedClsPrefixRef,
            inlineThemeDisabled,
            mergedRtlRef
          } = useConfig(props);
          const uncontrolledCheckedRef = vue.ref(props.defaultChecked);
          const controlledCheckedRef = vue.toRef(props, "checked");
          const mergedCheckedRef = useMergedState(controlledCheckedRef, uncontrolledCheckedRef);
          const renderedCheckedRef = useMemo(() => {
            if (NCheckboxGroup) {
              const groupValueSet = NCheckboxGroup.valueSetRef.value;
              if (groupValueSet && props.value !== void 0) {
                return groupValueSet.has(props.value);
              }
              return false;
            } else {
              return mergedCheckedRef.value === props.checkedValue;
            }
          });
          const formItem = useFormItem(props, {
            mergedSize(NFormItem2) {
              const {
                size: size2
              } = props;
              if (size2 !== void 0) return size2;
              if (NCheckboxGroup) {
                const {
                  value: mergedSize
                } = NCheckboxGroup.mergedSizeRef;
                if (mergedSize !== void 0) {
                  return mergedSize;
                }
              }
              if (NFormItem2) {
                const {
                  mergedSize
                } = NFormItem2;
                if (mergedSize !== void 0) return mergedSize.value;
              }
              return "medium";
            },
            mergedDisabled(NFormItem2) {
              const {
                disabled
              } = props;
              if (disabled !== void 0) return disabled;
              if (NCheckboxGroup) {
                if (NCheckboxGroup.disabledRef.value) return true;
                const {
                  maxRef: {
                    value: max
                  },
                  checkedCountRef
                } = NCheckboxGroup;
                if (max !== void 0 && checkedCountRef.value >= max && !renderedCheckedRef.value) {
                  return true;
                }
                const {
                  minRef: {
                    value: min
                  }
                } = NCheckboxGroup;
                if (min !== void 0 && checkedCountRef.value <= min && renderedCheckedRef.value) {
                  return true;
                }
              }
              if (NFormItem2) {
                return NFormItem2.disabled.value;
              }
              return false;
            }
          });
          const {
            mergedDisabledRef,
            mergedSizeRef
          } = formItem;
          const themeRef = useTheme("Checkbox", "-checkbox", style$8, checkboxLight, props, mergedClsPrefixRef);
          function toggle(e) {
            if (NCheckboxGroup && props.value !== void 0) {
              NCheckboxGroup.toggleCheckbox(!renderedCheckedRef.value, props.value);
            } else {
              const {
                onChange,
                "onUpdate:checked": _onUpdateCheck,
                onUpdateChecked
              } = props;
              const {
                nTriggerFormInput,
                nTriggerFormChange
              } = formItem;
              const nextChecked = renderedCheckedRef.value ? props.uncheckedValue : props.checkedValue;
              if (_onUpdateCheck) {
                call(_onUpdateCheck, nextChecked, e);
              }
              if (onUpdateChecked) {
                call(onUpdateChecked, nextChecked, e);
              }
              if (onChange) call(onChange, nextChecked, e);
              nTriggerFormInput();
              nTriggerFormChange();
              uncontrolledCheckedRef.value = nextChecked;
            }
          }
          function handleClick(e) {
            if (!mergedDisabledRef.value) {
              toggle(e);
            }
          }
          function handleKeyUp(e) {
            if (mergedDisabledRef.value) return;
            switch (e.key) {
              case " ":
              case "Enter":
                toggle(e);
            }
          }
          function handleKeyDown(e) {
            switch (e.key) {
              case " ":
                e.preventDefault();
            }
          }
          const exposedMethods = {
            focus: () => {
              var _a;
              (_a = selfRef.value) === null || _a === void 0 ? void 0 : _a.focus();
            },
            blur: () => {
              var _a;
              (_a = selfRef.value) === null || _a === void 0 ? void 0 : _a.blur();
            }
          };
          const rtlEnabledRef = useRtl("Checkbox", mergedRtlRef, mergedClsPrefixRef);
          const cssVarsRef = vue.computed(() => {
            const {
              value: mergedSize
            } = mergedSizeRef;
            const {
              common: {
                cubicBezierEaseInOut: cubicBezierEaseInOut2
              },
              self: {
                borderRadius,
                color,
                colorChecked,
                colorDisabled,
                colorTableHeader,
                colorTableHeaderModal,
                colorTableHeaderPopover,
                checkMarkColor,
                checkMarkColorDisabled,
                border,
                borderFocus,
                borderDisabled,
                borderChecked,
                boxShadowFocus,
                textColor,
                textColorDisabled,
                checkMarkColorDisabledChecked,
                colorDisabledChecked,
                borderDisabledChecked,
                labelPadding,
                labelLineHeight,
                labelFontWeight,
                [createKey("fontSize", mergedSize)]: fontSize2,
                [createKey("size", mergedSize)]: size2
              }
            } = themeRef.value;
            return {
              "--n-label-line-height": labelLineHeight,
              "--n-label-font-weight": labelFontWeight,
              "--n-size": size2,
              "--n-bezier": cubicBezierEaseInOut2,
              "--n-border-radius": borderRadius,
              "--n-border": border,
              "--n-border-checked": borderChecked,
              "--n-border-focus": borderFocus,
              "--n-border-disabled": borderDisabled,
              "--n-border-disabled-checked": borderDisabledChecked,
              "--n-box-shadow-focus": boxShadowFocus,
              "--n-color": color,
              "--n-color-checked": colorChecked,
              "--n-color-table": colorTableHeader,
              "--n-color-table-modal": colorTableHeaderModal,
              "--n-color-table-popover": colorTableHeaderPopover,
              "--n-color-disabled": colorDisabled,
              "--n-color-disabled-checked": colorDisabledChecked,
              "--n-text-color": textColor,
              "--n-text-color-disabled": textColorDisabled,
              "--n-check-mark-color": checkMarkColor,
              "--n-check-mark-color-disabled": checkMarkColorDisabled,
              "--n-check-mark-color-disabled-checked": checkMarkColorDisabledChecked,
              "--n-font-size": fontSize2,
              "--n-label-padding": labelPadding
            };
          });
          const themeClassHandle = inlineThemeDisabled ? useThemeClass("checkbox", vue.computed(() => mergedSizeRef.value[0]), cssVarsRef, props) : void 0;
          return Object.assign(formItem, exposedMethods, {
            rtlEnabled: rtlEnabledRef,
            selfRef,
            mergedClsPrefix: mergedClsPrefixRef,
            mergedDisabled: mergedDisabledRef,
            renderedChecked: renderedCheckedRef,
            mergedTheme: themeRef,
            labelId: createId(),
            handleClick,
            handleKeyUp,
            handleKeyDown,
            cssVars: inlineThemeDisabled ? void 0 : cssVarsRef,
            themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
            onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
          });
        },
        render() {
          var _a;
          const {
            $slots,
            renderedChecked,
            mergedDisabled,
            indeterminate,
            privateInsideTable,
            cssVars,
            labelId,
            label,
            mergedClsPrefix,
            focusable,
            handleKeyUp,
            handleKeyDown,
            handleClick
          } = this;
          (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
          const labelNode = resolveWrappedSlot($slots.default, (children) => {
            if (label || children) {
              return vue.h("span", {
                class: `${mergedClsPrefix}-checkbox__label`,
                id: labelId
              }, label || children);
            }
            return null;
          });
          return vue.h("div", {
            ref: "selfRef",
            class: [`${mergedClsPrefix}-checkbox`, this.themeClass, this.rtlEnabled && `${mergedClsPrefix}-checkbox--rtl`, renderedChecked && `${mergedClsPrefix}-checkbox--checked`, mergedDisabled && `${mergedClsPrefix}-checkbox--disabled`, indeterminate && `${mergedClsPrefix}-checkbox--indeterminate`, privateInsideTable && `${mergedClsPrefix}-checkbox--inside-table`, labelNode && `${mergedClsPrefix}-checkbox--show-label`],
            tabindex: mergedDisabled || !focusable ? void 0 : 0,
            role: "checkbox",
            "aria-checked": indeterminate ? "mixed" : renderedChecked,
            "aria-labelledby": labelId,
            style: cssVars,
            onKeyup: handleKeyUp,
            onKeydown: handleKeyDown,
            onClick: handleClick,
            onMousedown: () => {
              on("selectstart", window, (e) => {
                e.preventDefault();
              }, {
                once: true
              });
            }
          }, vue.h("div", {
            class: `${mergedClsPrefix}-checkbox-box-wrapper`
          }, " ", vue.h("div", {
            class: `${mergedClsPrefix}-checkbox-box`
          }, vue.h(NIconSwitchTransition, null, {
            default: () => this.indeterminate ? vue.h("div", {
              key: "indeterminate",
              class: `${mergedClsPrefix}-checkbox-icon`
            }, LineMark) : vue.h("div", {
              key: "check",
              class: `${mergedClsPrefix}-checkbox-icon`
            }, CheckMark)
          }), vue.h("div", {
            class: `${mergedClsPrefix}-checkbox-box__border`
          }))), labelNode);
        }
      });
      const codeDark = {
        name: "Code",
        common: derived$1,
        self(vars) {
          const {
            textColor2,
            fontSize: fontSize2,
            fontWeightStrong,
            textColor3
          } = vars;
          return {
            textColor: textColor2,
            fontSize: fontSize2,
            fontWeightStrong,
            // extracted from hljs atom-one-dark.scss
            "mono-3": "#5c6370",
            "hue-1": "#56b6c2",
            "hue-2": "#61aeee",
            "hue-3": "#c678dd",
            "hue-4": "#98c379",
            "hue-5": "#e06c75",
            "hue-5-2": "#be5046",
            "hue-6": "#d19a66",
            "hue-6-2": "#e6c07b",
            // line-number styles
            lineNumberTextColor: textColor3
          };
        }
      };
      function self$Y(vars) {
        const {
          textColor2,
          fontSize: fontSize2,
          fontWeightStrong,
          textColor3
        } = vars;
        return {
          textColor: textColor2,
          fontSize: fontSize2,
          fontWeightStrong,
          // extracted from hljs atom-one-light.scss
          "mono-3": "#a0a1a7",
          "hue-1": "#0184bb",
          "hue-2": "#4078f2",
          "hue-3": "#a626a4",
          "hue-4": "#50a14f",
          "hue-5": "#e45649",
          "hue-5-2": "#c91243",
          "hue-6": "#986801",
          "hue-6-2": "#c18401",
          // line-number styles
          lineNumberTextColor: textColor3
        };
      }
      const codeLight = {
        name: "Code",
        common: derived,
        self: self$Y
      };
      function self$X(vars) {
        const {
          fontWeight,
          textColor1,
          textColor2,
          textColorDisabled,
          dividerColor,
          fontSize: fontSize2
        } = vars;
        return {
          titleFontSize: fontSize2,
          titleFontWeight: fontWeight,
          dividerColor,
          titleTextColor: textColor1,
          titleTextColorDisabled: textColorDisabled,
          fontSize: fontSize2,
          textColor: textColor2,
          arrowColor: textColor2,
          arrowColorDisabled: textColorDisabled,
          itemMargin: "16px 0 0 0",
          titlePadding: "16px 0 0 0"
        };
      }
      const collapseLight = {
        name: "Collapse",
        common: derived,
        self: self$X
      };
      const collapseDark = {
        name: "Collapse",
        common: derived$1,
        self: self$X
      };
      function self$W(vars) {
        const {
          cubicBezierEaseInOut: cubicBezierEaseInOut2
        } = vars;
        return {
          bezier: cubicBezierEaseInOut2
        };
      }
      const collapseTransitionLight = {
        name: "CollapseTransition",
        common: derived,
        self: self$W
      };
      const collapseTransitionDark = {
        name: "CollapseTransition",
        common: derived$1,
        self: self$W
      };
      const configProviderProps = {
        abstract: Boolean,
        bordered: {
          type: Boolean,
          default: void 0
        },
        clsPrefix: {
          type: String,
          default: defaultClsPrefix
        },
        locale: Object,
        dateLocale: Object,
        namespace: String,
        rtl: Array,
        tag: {
          type: String,
          default: "div"
        },
        hljs: Object,
        katex: Object,
        theme: Object,
        themeOverrides: Object,
        componentOptions: Object,
        icons: Object,
        breakpoints: Object,
        preflightStyleDisabled: Boolean,
        inlineThemeDisabled: {
          type: Boolean,
          default: void 0
        },
        // deprecated
        as: {
          type: String,
          validator: () => {
            warn$2("config-provider", "`as` is deprecated, please use `tag` instead.");
            return true;
          },
          default: void 0
        }
      };
      const NConfigProvider = vue.defineComponent({
        name: "ConfigProvider",
        alias: ["App"],
        props: configProviderProps,
        setup(props) {
          const NConfigProvider2 = vue.inject(configProviderInjectionKey, null);
          const mergedThemeRef = vue.computed(() => {
            const {
              theme
            } = props;
            if (theme === null) return void 0;
            const inheritedTheme = NConfigProvider2 === null || NConfigProvider2 === void 0 ? void 0 : NConfigProvider2.mergedThemeRef.value;
            return theme === void 0 ? inheritedTheme : inheritedTheme === void 0 ? theme : Object.assign({}, inheritedTheme, theme);
          });
          const mergedThemeOverridesRef = vue.computed(() => {
            const {
              themeOverrides
            } = props;
            if (themeOverrides === null) return void 0;
            if (themeOverrides === void 0) {
              return NConfigProvider2 === null || NConfigProvider2 === void 0 ? void 0 : NConfigProvider2.mergedThemeOverridesRef.value;
            } else {
              const inheritedThemeOverrides = NConfigProvider2 === null || NConfigProvider2 === void 0 ? void 0 : NConfigProvider2.mergedThemeOverridesRef.value;
              if (inheritedThemeOverrides === void 0) {
                return themeOverrides;
              } else {
                return merge$1({}, inheritedThemeOverrides, themeOverrides);
              }
            }
          });
          const mergedNamespaceRef = useMemo(() => {
            const {
              namespace: namespace2
            } = props;
            return namespace2 === void 0 ? NConfigProvider2 === null || NConfigProvider2 === void 0 ? void 0 : NConfigProvider2.mergedNamespaceRef.value : namespace2;
          });
          const mergedBorderedRef = useMemo(() => {
            const {
              bordered
            } = props;
            return bordered === void 0 ? NConfigProvider2 === null || NConfigProvider2 === void 0 ? void 0 : NConfigProvider2.mergedBorderedRef.value : bordered;
          });
          const mergedIconsRef = vue.computed(() => {
            const {
              icons
            } = props;
            return icons === void 0 ? NConfigProvider2 === null || NConfigProvider2 === void 0 ? void 0 : NConfigProvider2.mergedIconsRef.value : icons;
          });
          const mergedComponentPropsRef = vue.computed(() => {
            const {
              componentOptions
            } = props;
            if (componentOptions !== void 0) return componentOptions;
            return NConfigProvider2 === null || NConfigProvider2 === void 0 ? void 0 : NConfigProvider2.mergedComponentPropsRef.value;
          });
          const mergedClsPrefixRef = vue.computed(() => {
            const {
              clsPrefix
            } = props;
            if (clsPrefix !== void 0) return clsPrefix;
            if (NConfigProvider2) return NConfigProvider2.mergedClsPrefixRef.value;
            return defaultClsPrefix;
          });
          const mergedRtlRef = vue.computed(() => {
            var _a;
            const {
              rtl
            } = props;
            if (rtl === void 0) {
              return NConfigProvider2 === null || NConfigProvider2 === void 0 ? void 0 : NConfigProvider2.mergedRtlRef.value;
            }
            const rtlEnabledState = {};
            for (const rtlInfo of rtl) {
              rtlEnabledState[rtlInfo.name] = vue.markRaw(rtlInfo);
              (_a = rtlInfo.peers) === null || _a === void 0 ? void 0 : _a.forEach((peerRtlInfo) => {
                if (!(peerRtlInfo.name in rtlEnabledState)) {
                  rtlEnabledState[peerRtlInfo.name] = vue.markRaw(peerRtlInfo);
                }
              });
            }
            return rtlEnabledState;
          });
          const mergedBreakpointsRef = vue.computed(() => {
            return props.breakpoints || (NConfigProvider2 === null || NConfigProvider2 === void 0 ? void 0 : NConfigProvider2.mergedBreakpointsRef.value);
          });
          const inlineThemeDisabled = props.inlineThemeDisabled || (NConfigProvider2 === null || NConfigProvider2 === void 0 ? void 0 : NConfigProvider2.inlineThemeDisabled);
          const preflightStyleDisabled = props.preflightStyleDisabled || (NConfigProvider2 === null || NConfigProvider2 === void 0 ? void 0 : NConfigProvider2.preflightStyleDisabled);
          const mergedThemeHashRef = vue.computed(() => {
            const {
              value: theme
            } = mergedThemeRef;
            const {
              value: mergedThemeOverrides
            } = mergedThemeOverridesRef;
            const hasThemeOverrides = mergedThemeOverrides && Object.keys(mergedThemeOverrides).length !== 0;
            const themeName = theme === null || theme === void 0 ? void 0 : theme.name;
            if (themeName) {
              if (hasThemeOverrides) {
                return `${themeName}-${murmur2(JSON.stringify(mergedThemeOverridesRef.value))}`;
              }
              return themeName;
            } else {
              if (hasThemeOverrides) {
                return murmur2(JSON.stringify(mergedThemeOverridesRef.value));
              }
              return "";
            }
          });
          vue.provide(configProviderInjectionKey, {
            mergedThemeHashRef,
            mergedBreakpointsRef,
            mergedRtlRef,
            mergedIconsRef,
            mergedComponentPropsRef,
            mergedBorderedRef,
            mergedNamespaceRef,
            mergedClsPrefixRef,
            mergedLocaleRef: vue.computed(() => {
              const {
                locale: locale2
              } = props;
              if (locale2 === null) return void 0;
              return locale2 === void 0 ? NConfigProvider2 === null || NConfigProvider2 === void 0 ? void 0 : NConfigProvider2.mergedLocaleRef.value : locale2;
            }),
            mergedDateLocaleRef: vue.computed(() => {
              const {
                dateLocale
              } = props;
              if (dateLocale === null) return void 0;
              return dateLocale === void 0 ? NConfigProvider2 === null || NConfigProvider2 === void 0 ? void 0 : NConfigProvider2.mergedDateLocaleRef.value : dateLocale;
            }),
            mergedHljsRef: vue.computed(() => {
              const {
                hljs
              } = props;
              return hljs === void 0 ? NConfigProvider2 === null || NConfigProvider2 === void 0 ? void 0 : NConfigProvider2.mergedHljsRef.value : hljs;
            }),
            mergedKatexRef: vue.computed(() => {
              const {
                katex
              } = props;
              return katex === void 0 ? NConfigProvider2 === null || NConfigProvider2 === void 0 ? void 0 : NConfigProvider2.mergedKatexRef.value : katex;
            }),
            mergedThemeRef,
            mergedThemeOverridesRef,
            inlineThemeDisabled: inlineThemeDisabled || false,
            preflightStyleDisabled: preflightStyleDisabled || false
          });
          return {
            mergedClsPrefix: mergedClsPrefixRef,
            mergedBordered: mergedBorderedRef,
            mergedNamespace: mergedNamespaceRef,
            mergedTheme: mergedThemeRef,
            mergedThemeOverrides: mergedThemeOverridesRef
          };
        },
        render() {
          var _a, _b, _c, _d;
          return !this.abstract ? vue.h(this.as || this.tag, {
            class: `${this.mergedClsPrefix || defaultClsPrefix}-config-provider`
          }, (_b = (_a = this.$slots).default) === null || _b === void 0 ? void 0 : _b.call(_a)) : (_d = (_c = this.$slots).default) === null || _d === void 0 ? void 0 : _d.call(_c);
        }
      });
      const popselect = {
        name: "Popselect",
        common: derived$1,
        peers: {
          Popover: popoverDark,
          InternalSelectMenu: internalSelectMenuDark
        }
      };
      function self$V(vars) {
        const {
          boxShadow2
        } = vars;
        return {
          menuBoxShadow: boxShadow2
        };
      }
      const popselectLight = createTheme({
        name: "Popselect",
        common: derived,
        peers: {
          Popover: popoverLight,
          InternalSelectMenu: internalSelectMenuLight
        },
        self: self$V
      });
      function self$U(vars) {
        const {
          boxShadow2
        } = vars;
        return {
          menuBoxShadow: boxShadow2
        };
      }
      const selectLight = createTheme({
        name: "Select",
        common: derived,
        peers: {
          InternalSelection: internalSelectionLight,
          InternalSelectMenu: internalSelectMenuLight
        },
        self: self$U
      });
      const selectDark = {
        name: "Select",
        common: derived$1,
        peers: {
          InternalSelection: internalSelectionDark,
          InternalSelectMenu: internalSelectMenuDark
        },
        self: self$U
      };
      const style$7 = c$1([cB("select", `
 z-index: auto;
 outline: none;
 width: 100%;
 position: relative;
 `), cB("select-menu", `
 margin: 4px 0;
 box-shadow: var(--n-menu-box-shadow);
 `, [fadeInScaleUpTransition({
        originalTransition: "background-color .3s var(--n-bezier), box-shadow .3s var(--n-bezier)"
      })])]);
      const selectProps = Object.assign(Object.assign({}, useTheme.props), {
        to: useAdjustedTo.propTo,
        bordered: {
          type: Boolean,
          default: void 0
        },
        clearable: Boolean,
        clearFilterAfterSelect: {
          type: Boolean,
          default: true
        },
        options: {
          type: Array,
          default: () => []
        },
        defaultValue: {
          type: [String, Number, Array],
          default: null
        },
        keyboard: {
          type: Boolean,
          default: true
        },
        value: [String, Number, Array],
        placeholder: String,
        menuProps: Object,
        multiple: Boolean,
        size: String,
        filterable: Boolean,
        disabled: {
          type: Boolean,
          default: void 0
        },
        remote: Boolean,
        loading: Boolean,
        filter: Function,
        placement: {
          type: String,
          default: "bottom-start"
        },
        widthMode: {
          type: String,
          default: "trigger"
        },
        tag: Boolean,
        onCreate: Function,
        fallbackOption: {
          type: [Function, Boolean],
          default: void 0
        },
        show: {
          type: Boolean,
          default: void 0
        },
        showArrow: {
          type: Boolean,
          default: true
        },
        maxTagCount: [Number, String],
        ellipsisTagPopoverProps: Object,
        consistentMenuWidth: {
          type: Boolean,
          default: true
        },
        virtualScroll: {
          type: Boolean,
          default: true
        },
        labelField: {
          type: String,
          default: "label"
        },
        valueField: {
          type: String,
          default: "value"
        },
        childrenField: {
          type: String,
          default: "children"
        },
        renderLabel: Function,
        renderOption: Function,
        renderTag: Function,
        "onUpdate:value": [Function, Array],
        inputProps: Object,
        nodeProps: Function,
        ignoreComposition: {
          type: Boolean,
          default: true
        },
        showOnFocus: Boolean,
        // for jsx
        onUpdateValue: [Function, Array],
        onBlur: [Function, Array],
        onClear: [Function, Array],
        onFocus: [Function, Array],
        onScroll: [Function, Array],
        onSearch: [Function, Array],
        onUpdateShow: [Function, Array],
        "onUpdate:show": [Function, Array],
        displayDirective: {
          type: String,
          default: "show"
        },
        resetMenuOnOptionsChange: {
          type: Boolean,
          default: true
        },
        status: String,
        showCheckmark: {
          type: Boolean,
          default: true
        },
        /** deprecated */
        onChange: [Function, Array],
        items: Array
      });
      const NSelect = vue.defineComponent({
        name: "Select",
        props: selectProps,
        setup(props) {
          const {
            mergedClsPrefixRef,
            mergedBorderedRef,
            namespaceRef,
            inlineThemeDisabled
          } = useConfig(props);
          const themeRef = useTheme("Select", "-select", style$7, selectLight, props, mergedClsPrefixRef);
          const uncontrolledValueRef = vue.ref(props.defaultValue);
          const controlledValueRef = vue.toRef(props, "value");
          const mergedValueRef = useMergedState(controlledValueRef, uncontrolledValueRef);
          const focusedRef = vue.ref(false);
          const patternRef = vue.ref("");
          const compitableOptionsRef = useCompitable(props, ["items", "options"]);
          const createdOptionsRef = vue.ref([]);
          const beingCreatedOptionsRef = vue.ref([]);
          const localOptionsRef = vue.computed(() => {
            return beingCreatedOptionsRef.value.concat(createdOptionsRef.value).concat(compitableOptionsRef.value);
          });
          const resolvedFilterRef = vue.computed(() => {
            const {
              filter
            } = props;
            if (filter) return filter;
            const {
              labelField,
              valueField
            } = props;
            return (pattern, option) => {
              if (!option) return false;
              const label = option[labelField];
              if (typeof label === "string") {
                return patternMatched(pattern, label);
              }
              const value = option[valueField];
              if (typeof value === "string") {
                return patternMatched(pattern, value);
              }
              if (typeof value === "number") {
                return patternMatched(pattern, String(value));
              }
              return false;
            };
          });
          const filteredOptionsRef = vue.computed(() => {
            if (props.remote) {
              return compitableOptionsRef.value;
            } else {
              const {
                value: localOptions
              } = localOptionsRef;
              const {
                value: pattern
              } = patternRef;
              if (!pattern.length || !props.filterable) {
                return localOptions;
              } else {
                return filterOptions(localOptions, resolvedFilterRef.value, pattern, props.childrenField);
              }
            }
          });
          const treeMateRef = vue.computed(() => {
            const {
              valueField,
              childrenField
            } = props;
            const options = createTmOptions(valueField, childrenField);
            return createTreeMate(filteredOptionsRef.value, options);
          });
          const valOptMapRef = vue.computed(() => createValOptMap(localOptionsRef.value, props.valueField, props.childrenField));
          const uncontrolledShowRef = vue.ref(false);
          const mergedShowRef = useMergedState(vue.toRef(props, "show"), uncontrolledShowRef);
          const triggerRef = vue.ref(null);
          const followerRef = vue.ref(null);
          const menuRef = vue.ref(null);
          const {
            localeRef
          } = useLocale("Select");
          const localizedPlaceholderRef = vue.computed(() => {
            var _a;
            return (_a = props.placeholder) !== null && _a !== void 0 ? _a : localeRef.value.placeholder;
          });
          const emptyArray = [];
          const memoValOptMapRef = vue.ref(/* @__PURE__ */ new Map());
          const wrappedFallbackOptionRef = vue.computed(() => {
            const {
              fallbackOption
            } = props;
            if (fallbackOption === void 0) {
              const {
                labelField,
                valueField
              } = props;
              return (value) => ({
                [labelField]: String(value),
                [valueField]: value
              });
            }
            if (fallbackOption === false) return false;
            return (value) => {
              return Object.assign(fallbackOption(value), {
                value
              });
            };
          });
          function getMergedOptions(values) {
            const remote = props.remote;
            const {
              value: memoValOptMap
            } = memoValOptMapRef;
            const {
              value: valOptMap
            } = valOptMapRef;
            const {
              value: wrappedFallbackOption
            } = wrappedFallbackOptionRef;
            const options = [];
            values.forEach((value) => {
              if (valOptMap.has(value)) {
                options.push(valOptMap.get(value));
              } else if (remote && memoValOptMap.has(value)) {
                options.push(memoValOptMap.get(value));
              } else if (wrappedFallbackOption) {
                const option = wrappedFallbackOption(value);
                if (option) {
                  options.push(option);
                }
              }
            });
            return options;
          }
          const selectedOptionsRef = vue.computed(() => {
            if (props.multiple) {
              const {
                value: values
              } = mergedValueRef;
              if (!Array.isArray(values)) return [];
              return getMergedOptions(values);
            }
            return null;
          });
          const selectedOptionRef = vue.computed(() => {
            const {
              value: mergedValue
            } = mergedValueRef;
            if (!props.multiple && !Array.isArray(mergedValue)) {
              if (mergedValue === null) return null;
              return getMergedOptions([mergedValue])[0] || null;
            }
            return null;
          });
          const formItem = useFormItem(props);
          const {
            mergedSizeRef,
            mergedDisabledRef,
            mergedStatusRef
          } = formItem;
          function doUpdateValue(value, option) {
            const {
              onChange,
              "onUpdate:value": _onUpdateValue,
              onUpdateValue
            } = props;
            const {
              nTriggerFormChange,
              nTriggerFormInput
            } = formItem;
            if (onChange) call(onChange, value, option);
            if (onUpdateValue) call(onUpdateValue, value, option);
            if (_onUpdateValue) {
              call(_onUpdateValue, value, option);
            }
            uncontrolledValueRef.value = value;
            nTriggerFormChange();
            nTriggerFormInput();
          }
          function doBlur(e) {
            const {
              onBlur
            } = props;
            const {
              nTriggerFormBlur
            } = formItem;
            if (onBlur) call(onBlur, e);
            nTriggerFormBlur();
          }
          function doClear() {
            const {
              onClear
            } = props;
            if (onClear) call(onClear);
          }
          function doFocus(e) {
            const {
              onFocus,
              showOnFocus
            } = props;
            const {
              nTriggerFormFocus
            } = formItem;
            if (onFocus) call(onFocus, e);
            nTriggerFormFocus();
            if (showOnFocus) {
              openMenu();
            }
          }
          function doSearch(value) {
            const {
              onSearch
            } = props;
            if (onSearch) call(onSearch, value);
          }
          function doScroll(e) {
            const {
              onScroll
            } = props;
            if (onScroll) call(onScroll, e);
          }
          function updateMemorizedOptions() {
            var _a;
            const {
              remote,
              multiple
            } = props;
            if (remote) {
              const {
                value: memoValOptMap
              } = memoValOptMapRef;
              if (multiple) {
                const {
                  valueField
                } = props;
                (_a = selectedOptionsRef.value) === null || _a === void 0 ? void 0 : _a.forEach((option) => {
                  memoValOptMap.set(option[valueField], option);
                });
              } else {
                const option = selectedOptionRef.value;
                if (option) {
                  memoValOptMap.set(option[props.valueField], option);
                }
              }
            }
          }
          function doUpdateShow(value) {
            const {
              onUpdateShow,
              "onUpdate:show": _onUpdateShow
            } = props;
            if (onUpdateShow) call(onUpdateShow, value);
            if (_onUpdateShow) call(_onUpdateShow, value);
            uncontrolledShowRef.value = value;
          }
          function openMenu() {
            if (!mergedDisabledRef.value) {
              doUpdateShow(true);
              uncontrolledShowRef.value = true;
              if (props.filterable) {
                focusSelectionInput();
              }
            }
          }
          function closeMenu() {
            doUpdateShow(false);
          }
          function handleMenuAfterLeave() {
            patternRef.value = "";
            beingCreatedOptionsRef.value = emptyArray;
          }
          const activeWithoutMenuOpenRef = vue.ref(false);
          function onTriggerInputFocus() {
            if (props.filterable) {
              activeWithoutMenuOpenRef.value = true;
            }
          }
          function onTriggerInputBlur() {
            if (props.filterable) {
              activeWithoutMenuOpenRef.value = false;
              if (!mergedShowRef.value) {
                handleMenuAfterLeave();
              }
            }
          }
          function handleTriggerClick() {
            if (mergedDisabledRef.value) return;
            if (!mergedShowRef.value) {
              openMenu();
            } else {
              if (!props.filterable) {
                closeMenu();
              } else {
                focusSelectionInput();
              }
            }
          }
          function handleTriggerBlur(e) {
            var _a, _b;
            if ((_b = (_a = menuRef.value) === null || _a === void 0 ? void 0 : _a.selfRef) === null || _b === void 0 ? void 0 : _b.contains(e.relatedTarget)) {
              return;
            }
            focusedRef.value = false;
            doBlur(e);
            closeMenu();
          }
          function handleTriggerFocus(e) {
            doFocus(e);
            focusedRef.value = true;
          }
          function handleMenuFocus() {
            focusedRef.value = true;
          }
          function handleMenuBlur(e) {
            var _a;
            if ((_a = triggerRef.value) === null || _a === void 0 ? void 0 : _a.$el.contains(e.relatedTarget)) return;
            focusedRef.value = false;
            doBlur(e);
            closeMenu();
          }
          function handleMenuTabOut() {
            var _a;
            (_a = triggerRef.value) === null || _a === void 0 ? void 0 : _a.focus();
            closeMenu();
          }
          function handleMenuClickOutside(e) {
            var _a;
            if (mergedShowRef.value) {
              if (!((_a = triggerRef.value) === null || _a === void 0 ? void 0 : _a.$el.contains(getPreciseEventTarget(e)))) {
                closeMenu();
              }
            }
          }
          function createClearedMultipleSelectValue(value) {
            if (!Array.isArray(value)) return [];
            if (wrappedFallbackOptionRef.value) {
              return Array.from(value);
            } else {
              const {
                remote
              } = props;
              const {
                value: valOptMap
              } = valOptMapRef;
              if (remote) {
                const {
                  value: memoValOptMap
                } = memoValOptMapRef;
                return value.filter((v) => valOptMap.has(v) || memoValOptMap.has(v));
              } else {
                return value.filter((v) => valOptMap.has(v));
              }
            }
          }
          function handleToggleByTmNode(tmNode) {
            handleToggleByOption(tmNode.rawNode);
          }
          function handleToggleByOption(option) {
            if (mergedDisabledRef.value) return;
            const {
              tag,
              remote,
              clearFilterAfterSelect,
              valueField
            } = props;
            if (tag && !remote) {
              const {
                value: beingCreatedOptions
              } = beingCreatedOptionsRef;
              const beingCreatedOption = beingCreatedOptions[0] || null;
              if (beingCreatedOption) {
                const createdOptions = createdOptionsRef.value;
                if (!createdOptions.length) {
                  createdOptionsRef.value = [beingCreatedOption];
                } else {
                  createdOptions.push(beingCreatedOption);
                }
                beingCreatedOptionsRef.value = emptyArray;
              }
            }
            if (remote) {
              memoValOptMapRef.value.set(option[valueField], option);
            }
            if (props.multiple) {
              const changedValue = createClearedMultipleSelectValue(mergedValueRef.value);
              const index = changedValue.findIndex((value) => value === option[valueField]);
              if (~index) {
                changedValue.splice(index, 1);
                if (tag && !remote) {
                  const createdOptionIndex = getCreatedOptionIndex(option[valueField]);
                  if (~createdOptionIndex) {
                    createdOptionsRef.value.splice(createdOptionIndex, 1);
                    if (clearFilterAfterSelect) patternRef.value = "";
                  }
                }
              } else {
                changedValue.push(option[valueField]);
                if (clearFilterAfterSelect) patternRef.value = "";
              }
              doUpdateValue(changedValue, getMergedOptions(changedValue));
            } else {
              if (tag && !remote) {
                const createdOptionIndex = getCreatedOptionIndex(option[valueField]);
                if (~createdOptionIndex) {
                  createdOptionsRef.value = [createdOptionsRef.value[createdOptionIndex]];
                } else {
                  createdOptionsRef.value = emptyArray;
                }
              }
              focusSelection();
              closeMenu();
              doUpdateValue(option[valueField], option);
            }
          }
          function getCreatedOptionIndex(optionValue) {
            const createdOptions = createdOptionsRef.value;
            return createdOptions.findIndex((createdOption) => createdOption[props.valueField] === optionValue);
          }
          function handlePatternInput(e) {
            if (!mergedShowRef.value) {
              openMenu();
            }
            const {
              value
            } = e.target;
            patternRef.value = value;
            const {
              tag,
              remote
            } = props;
            doSearch(value);
            if (tag && !remote) {
              if (!value) {
                beingCreatedOptionsRef.value = emptyArray;
                return;
              }
              const {
                onCreate
              } = props;
              const optionBeingCreated = onCreate ? onCreate(value) : {
                [props.labelField]: value,
                [props.valueField]: value
              };
              const {
                valueField,
                labelField
              } = props;
              if (compitableOptionsRef.value.some((option) => {
                return option[valueField] === optionBeingCreated[valueField] || option[labelField] === optionBeingCreated[labelField];
              }) || createdOptionsRef.value.some((option) => {
                return option[valueField] === optionBeingCreated[valueField] || option[labelField] === optionBeingCreated[labelField];
              })) {
                beingCreatedOptionsRef.value = emptyArray;
              } else {
                beingCreatedOptionsRef.value = [optionBeingCreated];
              }
            }
          }
          function handleClear(e) {
            e.stopPropagation();
            const {
              multiple
            } = props;
            if (!multiple && props.filterable) {
              closeMenu();
            }
            doClear();
            if (multiple) {
              doUpdateValue([], []);
            } else {
              doUpdateValue(null, null);
            }
          }
          function handleMenuMousedown(e) {
            if (!happensIn(e, "action") && !happensIn(e, "empty") && !happensIn(e, "header")) {
              e.preventDefault();
            }
          }
          function handleMenuScroll(e) {
            doScroll(e);
          }
          function handleKeydown(e) {
            var _a, _b, _c, _d, _e;
            if (!props.keyboard) {
              e.preventDefault();
              return;
            }
            switch (e.key) {
              case " ":
                if (props.filterable) {
                  break;
                } else {
                  e.preventDefault();
                }
              case "Enter":
                if (!((_a = triggerRef.value) === null || _a === void 0 ? void 0 : _a.isComposing)) {
                  if (mergedShowRef.value) {
                    const pendingTmNode = (_b = menuRef.value) === null || _b === void 0 ? void 0 : _b.getPendingTmNode();
                    if (pendingTmNode) {
                      handleToggleByTmNode(pendingTmNode);
                    } else if (!props.filterable) {
                      closeMenu();
                      focusSelection();
                    }
                  } else {
                    openMenu();
                    if (props.tag && activeWithoutMenuOpenRef.value) {
                      const beingCreatedOption = beingCreatedOptionsRef.value[0];
                      if (beingCreatedOption) {
                        const optionValue = beingCreatedOption[props.valueField];
                        const {
                          value: mergedValue
                        } = mergedValueRef;
                        if (props.multiple) {
                          if (Array.isArray(mergedValue) && mergedValue.includes(optionValue)) ;
                          else {
                            handleToggleByOption(beingCreatedOption);
                          }
                        } else {
                          handleToggleByOption(beingCreatedOption);
                        }
                      }
                    }
                  }
                }
                e.preventDefault();
                break;
              case "ArrowUp":
                e.preventDefault();
                if (props.loading) return;
                if (mergedShowRef.value) {
                  (_c = menuRef.value) === null || _c === void 0 ? void 0 : _c.prev();
                }
                break;
              case "ArrowDown":
                e.preventDefault();
                if (props.loading) return;
                if (mergedShowRef.value) {
                  (_d = menuRef.value) === null || _d === void 0 ? void 0 : _d.next();
                } else {
                  openMenu();
                }
                break;
              case "Escape":
                if (mergedShowRef.value) {
                  markEventEffectPerformed(e);
                  closeMenu();
                }
                (_e = triggerRef.value) === null || _e === void 0 ? void 0 : _e.focus();
                break;
            }
          }
          function focusSelection() {
            var _a;
            (_a = triggerRef.value) === null || _a === void 0 ? void 0 : _a.focus();
          }
          function focusSelectionInput() {
            var _a;
            (_a = triggerRef.value) === null || _a === void 0 ? void 0 : _a.focusInput();
          }
          function handleTriggerOrMenuResize() {
            var _a;
            if (!mergedShowRef.value) return;
            (_a = followerRef.value) === null || _a === void 0 ? void 0 : _a.syncPosition();
          }
          updateMemorizedOptions();
          vue.watch(vue.toRef(props, "options"), updateMemorizedOptions);
          const exposedMethods = {
            focus: () => {
              var _a;
              (_a = triggerRef.value) === null || _a === void 0 ? void 0 : _a.focus();
            },
            focusInput: () => {
              var _a;
              (_a = triggerRef.value) === null || _a === void 0 ? void 0 : _a.focusInput();
            },
            blur: () => {
              var _a;
              (_a = triggerRef.value) === null || _a === void 0 ? void 0 : _a.blur();
            },
            blurInput: () => {
              var _a;
              (_a = triggerRef.value) === null || _a === void 0 ? void 0 : _a.blurInput();
            }
          };
          const cssVarsRef = vue.computed(() => {
            const {
              self: {
                menuBoxShadow
              }
            } = themeRef.value;
            return {
              "--n-menu-box-shadow": menuBoxShadow
            };
          });
          const themeClassHandle = inlineThemeDisabled ? useThemeClass("select", void 0, cssVarsRef, props) : void 0;
          return Object.assign(Object.assign({}, exposedMethods), {
            mergedStatus: mergedStatusRef,
            mergedClsPrefix: mergedClsPrefixRef,
            mergedBordered: mergedBorderedRef,
            namespace: namespaceRef,
            treeMate: treeMateRef,
            isMounted: isMounted(),
            triggerRef,
            menuRef,
            pattern: patternRef,
            uncontrolledShow: uncontrolledShowRef,
            mergedShow: mergedShowRef,
            adjustedTo: useAdjustedTo(props),
            uncontrolledValue: uncontrolledValueRef,
            mergedValue: mergedValueRef,
            followerRef,
            localizedPlaceholder: localizedPlaceholderRef,
            selectedOption: selectedOptionRef,
            selectedOptions: selectedOptionsRef,
            mergedSize: mergedSizeRef,
            mergedDisabled: mergedDisabledRef,
            focused: focusedRef,
            activeWithoutMenuOpen: activeWithoutMenuOpenRef,
            inlineThemeDisabled,
            onTriggerInputFocus,
            onTriggerInputBlur,
            handleTriggerOrMenuResize,
            handleMenuFocus,
            handleMenuBlur,
            handleMenuTabOut,
            handleTriggerClick,
            handleToggle: handleToggleByTmNode,
            handleDeleteOption: handleToggleByOption,
            handlePatternInput,
            handleClear,
            handleTriggerBlur,
            handleTriggerFocus,
            handleKeydown,
            handleMenuAfterLeave,
            handleMenuClickOutside,
            handleMenuScroll,
            handleMenuKeydown: handleKeydown,
            handleMenuMousedown,
            mergedTheme: themeRef,
            cssVars: inlineThemeDisabled ? void 0 : cssVarsRef,
            themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
            onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
          });
        },
        render() {
          return vue.h("div", {
            class: `${this.mergedClsPrefix}-select`
          }, vue.h(Binder, null, {
            default: () => [vue.h(VTarget, null, {
              default: () => vue.h(NInternalSelection, {
                ref: "triggerRef",
                inlineThemeDisabled: this.inlineThemeDisabled,
                status: this.mergedStatus,
                inputProps: this.inputProps,
                clsPrefix: this.mergedClsPrefix,
                showArrow: this.showArrow,
                maxTagCount: this.maxTagCount,
                ellipsisTagPopoverProps: this.ellipsisTagPopoverProps,
                bordered: this.mergedBordered,
                active: this.activeWithoutMenuOpen || this.mergedShow,
                pattern: this.pattern,
                placeholder: this.localizedPlaceholder,
                selectedOption: this.selectedOption,
                selectedOptions: this.selectedOptions,
                multiple: this.multiple,
                renderTag: this.renderTag,
                renderLabel: this.renderLabel,
                filterable: this.filterable,
                clearable: this.clearable,
                disabled: this.mergedDisabled,
                size: this.mergedSize,
                theme: this.mergedTheme.peers.InternalSelection,
                labelField: this.labelField,
                valueField: this.valueField,
                themeOverrides: this.mergedTheme.peerOverrides.InternalSelection,
                loading: this.loading,
                focused: this.focused,
                onClick: this.handleTriggerClick,
                onDeleteOption: this.handleDeleteOption,
                onPatternInput: this.handlePatternInput,
                onClear: this.handleClear,
                onBlur: this.handleTriggerBlur,
                onFocus: this.handleTriggerFocus,
                onKeydown: this.handleKeydown,
                onPatternBlur: this.onTriggerInputBlur,
                onPatternFocus: this.onTriggerInputFocus,
                onResize: this.handleTriggerOrMenuResize,
                ignoreComposition: this.ignoreComposition
              }, {
                arrow: () => {
                  var _a, _b;
                  return [(_b = (_a = this.$slots).arrow) === null || _b === void 0 ? void 0 : _b.call(_a)];
                }
              })
            }), vue.h(VFollower, {
              ref: "followerRef",
              show: this.mergedShow,
              to: this.adjustedTo,
              teleportDisabled: this.adjustedTo === useAdjustedTo.tdkey,
              containerClass: this.namespace,
              width: this.consistentMenuWidth ? "target" : void 0,
              minWidth: "target",
              placement: this.placement
            }, {
              default: () => vue.h(vue.Transition, {
                name: "fade-in-scale-up-transition",
                appear: this.isMounted,
                onAfterLeave: this.handleMenuAfterLeave
              }, {
                default: () => {
                  var _a, _b, _c;
                  if (!(this.mergedShow || this.displayDirective === "show")) {
                    return null;
                  }
                  (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
                  return vue.withDirectives(vue.h(NInternalSelectMenu, Object.assign({}, this.menuProps, {
                    ref: "menuRef",
                    onResize: this.handleTriggerOrMenuResize,
                    inlineThemeDisabled: this.inlineThemeDisabled,
                    virtualScroll: this.consistentMenuWidth && this.virtualScroll,
                    class: [`${this.mergedClsPrefix}-select-menu`, this.themeClass, (_b = this.menuProps) === null || _b === void 0 ? void 0 : _b.class],
                    clsPrefix: this.mergedClsPrefix,
                    focusable: true,
                    labelField: this.labelField,
                    valueField: this.valueField,
                    autoPending: true,
                    nodeProps: this.nodeProps,
                    theme: this.mergedTheme.peers.InternalSelectMenu,
                    themeOverrides: this.mergedTheme.peerOverrides.InternalSelectMenu,
                    treeMate: this.treeMate,
                    multiple: this.multiple,
                    size: "medium",
                    renderOption: this.renderOption,
                    renderLabel: this.renderLabel,
                    value: this.mergedValue,
                    style: [(_c = this.menuProps) === null || _c === void 0 ? void 0 : _c.style, this.cssVars],
                    onToggle: this.handleToggle,
                    onScroll: this.handleMenuScroll,
                    onFocus: this.handleMenuFocus,
                    onBlur: this.handleMenuBlur,
                    onKeydown: this.handleMenuKeydown,
                    onTabOut: this.handleMenuTabOut,
                    onMousedown: this.handleMenuMousedown,
                    show: this.mergedShow,
                    showCheckmark: this.showCheckmark,
                    resetMenuOnOptionsChange: this.resetMenuOnOptionsChange
                  }), {
                    empty: () => {
                      var _a2, _b2;
                      return [(_b2 = (_a2 = this.$slots).empty) === null || _b2 === void 0 ? void 0 : _b2.call(_a2)];
                    },
                    header: () => {
                      var _a2, _b2;
                      return [(_b2 = (_a2 = this.$slots).header) === null || _b2 === void 0 ? void 0 : _b2.call(_a2)];
                    },
                    action: () => {
                      var _a2, _b2;
                      return [(_b2 = (_a2 = this.$slots).action) === null || _b2 === void 0 ? void 0 : _b2.call(_a2)];
                    }
                  }), this.displayDirective === "show" ? [[vue.vShow, this.mergedShow], [clickoutside, this.handleMenuClickOutside, void 0, {
                    capture: true
                  }]] : [[clickoutside, this.handleMenuClickOutside, void 0, {
                    capture: true
                  }]]);
                }
              })
            })]
          }));
        }
      });
      const commonVariables$b = {
        itemPaddingSmall: "0 4px",
        itemMarginSmall: "0 0 0 8px",
        itemMarginSmallRtl: "0 8px 0 0",
        itemPaddingMedium: "0 4px",
        itemMarginMedium: "0 0 0 8px",
        itemMarginMediumRtl: "0 8px 0 0",
        itemPaddingLarge: "0 4px",
        itemMarginLarge: "0 0 0 8px",
        itemMarginLargeRtl: "0 8px 0 0",
        buttonIconSizeSmall: "14px",
        buttonIconSizeMedium: "16px",
        buttonIconSizeLarge: "18px",
        inputWidthSmall: "60px",
        selectWidthSmall: "unset",
        inputMarginSmall: "0 0 0 8px",
        inputMarginSmallRtl: "0 8px 0 0",
        selectMarginSmall: "0 0 0 8px",
        prefixMarginSmall: "0 8px 0 0",
        suffixMarginSmall: "0 0 0 8px",
        inputWidthMedium: "60px",
        selectWidthMedium: "unset",
        inputMarginMedium: "0 0 0 8px",
        inputMarginMediumRtl: "0 8px 0 0",
        selectMarginMedium: "0 0 0 8px",
        prefixMarginMedium: "0 8px 0 0",
        suffixMarginMedium: "0 0 0 8px",
        inputWidthLarge: "60px",
        selectWidthLarge: "unset",
        inputMarginLarge: "0 0 0 8px",
        inputMarginLargeRtl: "0 8px 0 0",
        selectMarginLarge: "0 0 0 8px",
        prefixMarginLarge: "0 8px 0 0",
        suffixMarginLarge: "0 0 0 8px"
      };
      function self$T(vars) {
        const {
          textColor2,
          primaryColor,
          primaryColorHover,
          primaryColorPressed,
          inputColorDisabled,
          textColorDisabled,
          borderColor,
          borderRadius,
          // item font size
          fontSizeTiny,
          fontSizeSmall,
          fontSizeMedium,
          // item size
          heightTiny,
          heightSmall,
          heightMedium
        } = vars;
        return Object.assign(Object.assign({}, commonVariables$b), {
          buttonColor: "#0000",
          buttonColorHover: "#0000",
          buttonColorPressed: "#0000",
          buttonBorder: `1px solid ${borderColor}`,
          buttonBorderHover: `1px solid ${borderColor}`,
          buttonBorderPressed: `1px solid ${borderColor}`,
          buttonIconColor: textColor2,
          buttonIconColorHover: textColor2,
          buttonIconColorPressed: textColor2,
          itemTextColor: textColor2,
          itemTextColorHover: primaryColorHover,
          itemTextColorPressed: primaryColorPressed,
          itemTextColorActive: primaryColor,
          itemTextColorDisabled: textColorDisabled,
          itemColor: "#0000",
          itemColorHover: "#0000",
          itemColorPressed: "#0000",
          itemColorActive: "#0000",
          itemColorActiveHover: "#0000",
          itemColorDisabled: inputColorDisabled,
          itemBorder: "1px solid #0000",
          itemBorderHover: "1px solid #0000",
          itemBorderPressed: "1px solid #0000",
          itemBorderActive: `1px solid ${primaryColor}`,
          itemBorderDisabled: `1px solid ${borderColor}`,
          itemBorderRadius: borderRadius,
          itemSizeSmall: heightTiny,
          itemSizeMedium: heightSmall,
          itemSizeLarge: heightMedium,
          itemFontSizeSmall: fontSizeTiny,
          itemFontSizeMedium: fontSizeSmall,
          itemFontSizeLarge: fontSizeMedium,
          jumperFontSizeSmall: fontSizeTiny,
          jumperFontSizeMedium: fontSizeSmall,
          jumperFontSizeLarge: fontSizeMedium,
          jumperTextColor: textColor2,
          jumperTextColorDisabled: textColorDisabled
        });
      }
      const paginationLight = createTheme({
        name: "Pagination",
        common: derived,
        peers: {
          Select: selectLight,
          Input: inputLight,
          Popselect: popselectLight
        },
        self: self$T
      });
      const paginationDark = {
        name: "Pagination",
        common: derived$1,
        peers: {
          Select: selectDark,
          Input: inputDark,
          Popselect: popselect
        },
        self(vars) {
          const {
            primaryColor,
            opacity3
          } = vars;
          const borderColorActive = changeColor(primaryColor, {
            alpha: Number(opacity3)
          });
          const commonSelf = self$T(vars);
          commonSelf.itemBorderActive = `1px solid ${borderColorActive}`;
          commonSelf.itemBorderDisabled = "1px solid #0000";
          return commonSelf;
        }
      };
      const commonVars$9 = {
        padding: "8px 14px"
      };
      const tooltipDark = {
        name: "Tooltip",
        common: derived$1,
        peers: {
          Popover: popoverDark
        },
        self(vars) {
          const {
            borderRadius,
            boxShadow2,
            popoverColor,
            textColor2
          } = vars;
          return Object.assign(Object.assign({}, commonVars$9), {
            borderRadius,
            boxShadow: boxShadow2,
            color: popoverColor,
            textColor: textColor2
          });
        }
      };
      function self$S(vars) {
        const {
          borderRadius,
          boxShadow2,
          baseColor
        } = vars;
        return Object.assign(Object.assign({}, commonVars$9), {
          borderRadius,
          boxShadow: boxShadow2,
          color: composite(baseColor, "rgba(0, 0, 0, .85)"),
          textColor: baseColor
        });
      }
      const tooltipLight = createTheme({
        name: "Tooltip",
        common: derived,
        peers: {
          Popover: popoverLight
        },
        self: self$S
      });
      const ellipsisDark = {
        name: "Ellipsis",
        common: derived$1,
        peers: {
          Tooltip: tooltipDark
        }
      };
      const ellipsisLight = createTheme({
        name: "Ellipsis",
        common: derived,
        peers: {
          Tooltip: tooltipLight
        }
      });
      const commonVariables$a = {
        radioSizeSmall: "14px",
        radioSizeMedium: "16px",
        radioSizeLarge: "18px",
        labelPadding: "0 8px",
        labelFontWeight: "400"
      };
      const radioDark = {
        name: "Radio",
        common: derived$1,
        self(vars) {
          const {
            borderColor,
            primaryColor,
            baseColor,
            textColorDisabled,
            inputColorDisabled,
            textColor2,
            opacityDisabled,
            borderRadius,
            fontSizeSmall,
            fontSizeMedium,
            fontSizeLarge,
            heightSmall,
            heightMedium,
            heightLarge,
            lineHeight: lineHeight2
          } = vars;
          return Object.assign(Object.assign({}, commonVariables$a), {
            labelLineHeight: lineHeight2,
            buttonHeightSmall: heightSmall,
            buttonHeightMedium: heightMedium,
            buttonHeightLarge: heightLarge,
            fontSizeSmall,
            fontSizeMedium,
            fontSizeLarge,
            boxShadow: `inset 0 0 0 1px ${borderColor}`,
            boxShadowActive: `inset 0 0 0 1px ${primaryColor}`,
            boxShadowFocus: `inset 0 0 0 1px ${primaryColor}, 0 0 0 2px ${changeColor(primaryColor, {
            alpha: 0.3
          })}`,
            boxShadowHover: `inset 0 0 0 1px ${primaryColor}`,
            boxShadowDisabled: `inset 0 0 0 1px ${borderColor}`,
            color: "#0000",
            colorDisabled: inputColorDisabled,
            colorActive: "#0000",
            textColor: textColor2,
            textColorDisabled,
            dotColorActive: primaryColor,
            dotColorDisabled: borderColor,
            buttonBorderColor: borderColor,
            buttonBorderColorActive: primaryColor,
            buttonBorderColorHover: primaryColor,
            buttonColor: "#0000",
            buttonColorActive: primaryColor,
            buttonTextColor: textColor2,
            buttonTextColorActive: baseColor,
            buttonTextColorHover: primaryColor,
            opacityDisabled,
            buttonBoxShadowFocus: `inset 0 0 0 1px ${primaryColor}, 0 0 0 2px ${changeColor(primaryColor, {
            alpha: 0.3
          })}`,
            buttonBoxShadowHover: `inset 0 0 0 1px ${primaryColor}`,
            buttonBoxShadow: "inset 0 0 0 1px #0000",
            buttonBorderRadius: borderRadius
          });
        }
      };
      function self$R(vars) {
        const {
          borderColor,
          primaryColor,
          baseColor,
          textColorDisabled,
          inputColorDisabled,
          textColor2,
          opacityDisabled,
          borderRadius,
          fontSizeSmall,
          fontSizeMedium,
          fontSizeLarge,
          heightSmall,
          heightMedium,
          heightLarge,
          lineHeight: lineHeight2
        } = vars;
        return Object.assign(Object.assign({}, commonVariables$a), {
          labelLineHeight: lineHeight2,
          buttonHeightSmall: heightSmall,
          buttonHeightMedium: heightMedium,
          buttonHeightLarge: heightLarge,
          fontSizeSmall,
          fontSizeMedium,
          fontSizeLarge,
          boxShadow: `inset 0 0 0 1px ${borderColor}`,
          boxShadowActive: `inset 0 0 0 1px ${primaryColor}`,
          boxShadowFocus: `inset 0 0 0 1px ${primaryColor}, 0 0 0 2px ${changeColor(primaryColor, {
          alpha: 0.2
        })}`,
          boxShadowHover: `inset 0 0 0 1px ${primaryColor}`,
          boxShadowDisabled: `inset 0 0 0 1px ${borderColor}`,
          color: baseColor,
          colorDisabled: inputColorDisabled,
          colorActive: "#0000",
          textColor: textColor2,
          textColorDisabled,
          dotColorActive: primaryColor,
          dotColorDisabled: borderColor,
          buttonBorderColor: borderColor,
          buttonBorderColorActive: primaryColor,
          buttonBorderColorHover: borderColor,
          buttonColor: baseColor,
          buttonColorActive: baseColor,
          buttonTextColor: textColor2,
          buttonTextColorActive: primaryColor,
          buttonTextColorHover: primaryColor,
          opacityDisabled,
          buttonBoxShadowFocus: `inset 0 0 0 1px ${primaryColor}, 0 0 0 2px ${changeColor(primaryColor, {
          alpha: 0.3
        })}`,
          buttonBoxShadowHover: "inset 0 0 0 1px #0000",
          buttonBoxShadow: "inset 0 0 0 1px #0000",
          buttonBorderRadius: borderRadius
        });
      }
      const radioLight = {
        name: "Radio",
        common: derived,
        self: self$R
      };
      const commonVariables$9 = {
        padding: "4px 0",
        optionIconSizeSmall: "14px",
        optionIconSizeMedium: "16px",
        optionIconSizeLarge: "16px",
        optionIconSizeHuge: "18px",
        optionSuffixWidthSmall: "14px",
        optionSuffixWidthMedium: "14px",
        optionSuffixWidthLarge: "16px",
        optionSuffixWidthHuge: "16px",
        optionIconSuffixWidthSmall: "32px",
        optionIconSuffixWidthMedium: "32px",
        optionIconSuffixWidthLarge: "36px",
        optionIconSuffixWidthHuge: "36px",
        optionPrefixWidthSmall: "14px",
        optionPrefixWidthMedium: "14px",
        optionPrefixWidthLarge: "16px",
        optionPrefixWidthHuge: "16px",
        optionIconPrefixWidthSmall: "36px",
        optionIconPrefixWidthMedium: "36px",
        optionIconPrefixWidthLarge: "40px",
        optionIconPrefixWidthHuge: "40px"
      };
      function self$Q(vars) {
        const {
          primaryColor,
          textColor2,
          dividerColor,
          hoverColor,
          popoverColor,
          invertedColor,
          borderRadius,
          fontSizeSmall,
          fontSizeMedium,
          fontSizeLarge,
          fontSizeHuge,
          heightSmall,
          heightMedium,
          heightLarge,
          heightHuge,
          textColor3,
          opacityDisabled
        } = vars;
        return Object.assign(Object.assign({}, commonVariables$9), {
          optionHeightSmall: heightSmall,
          optionHeightMedium: heightMedium,
          optionHeightLarge: heightLarge,
          optionHeightHuge: heightHuge,
          borderRadius,
          fontSizeSmall,
          fontSizeMedium,
          fontSizeLarge,
          fontSizeHuge,
          // non-inverted
          optionTextColor: textColor2,
          optionTextColorHover: textColor2,
          optionTextColorActive: primaryColor,
          optionTextColorChildActive: primaryColor,
          color: popoverColor,
          dividerColor,
          suffixColor: textColor2,
          prefixColor: textColor2,
          optionColorHover: hoverColor,
          optionColorActive: changeColor(primaryColor, {
            alpha: 0.1
          }),
          groupHeaderTextColor: textColor3,
          // inverted
          optionTextColorInverted: "#BBB",
          optionTextColorHoverInverted: "#FFF",
          optionTextColorActiveInverted: "#FFF",
          optionTextColorChildActiveInverted: "#FFF",
          colorInverted: invertedColor,
          dividerColorInverted: "#BBB",
          suffixColorInverted: "#BBB",
          prefixColorInverted: "#BBB",
          optionColorHoverInverted: primaryColor,
          optionColorActiveInverted: primaryColor,
          groupHeaderTextColorInverted: "#AAA",
          optionOpacityDisabled: opacityDisabled
        });
      }
      const dropdownLight = createTheme({
        name: "Dropdown",
        common: derived,
        peers: {
          Popover: popoverLight
        },
        self: self$Q
      });
      const dropdownDark = {
        name: "Dropdown",
        common: derived$1,
        peers: {
          Popover: popoverDark
        },
        self(vars) {
          const {
            primaryColorSuppl,
            primaryColor,
            popoverColor
          } = vars;
          const commonSelf = self$Q(vars);
          commonSelf.colorInverted = popoverColor;
          commonSelf.optionColorActive = changeColor(primaryColor, {
            alpha: 0.15
          });
          commonSelf.optionColorActiveInverted = primaryColorSuppl;
          commonSelf.optionColorHoverInverted = primaryColorSuppl;
          return commonSelf;
        }
      };
      const commonVariables$8 = {
        thPaddingSmall: "8px",
        thPaddingMedium: "12px",
        thPaddingLarge: "12px",
        tdPaddingSmall: "8px",
        tdPaddingMedium: "12px",
        tdPaddingLarge: "12px",
        sorterSize: "15px",
        resizableContainerSize: "8px",
        resizableSize: "2px",
        filterSize: "15px",
        paginationMargin: "12px 0 0 0",
        emptyPadding: "48px 0",
        actionPadding: "8px 12px",
        actionButtonMargin: "0 8px 0 0"
      };
      function self$P(vars) {
        const {
          cardColor,
          modalColor,
          popoverColor,
          textColor2,
          textColor1,
          tableHeaderColor,
          tableColorHover,
          iconColor,
          primaryColor,
          fontWeightStrong,
          borderRadius,
          lineHeight: lineHeight2,
          fontSizeSmall,
          fontSizeMedium,
          fontSizeLarge,
          dividerColor,
          heightSmall,
          opacityDisabled,
          tableColorStriped
        } = vars;
        return Object.assign(Object.assign({}, commonVariables$8), {
          actionDividerColor: dividerColor,
          lineHeight: lineHeight2,
          borderRadius,
          fontSizeSmall,
          fontSizeMedium,
          fontSizeLarge,
          borderColor: composite(cardColor, dividerColor),
          tdColorHover: composite(cardColor, tableColorHover),
          tdColorSorting: composite(cardColor, tableColorHover),
          tdColorStriped: composite(cardColor, tableColorStriped),
          thColor: composite(cardColor, tableHeaderColor),
          thColorHover: composite(composite(cardColor, tableHeaderColor), tableColorHover),
          thColorSorting: composite(composite(cardColor, tableHeaderColor), tableColorHover),
          tdColor: cardColor,
          tdTextColor: textColor2,
          thTextColor: textColor1,
          thFontWeight: fontWeightStrong,
          thButtonColorHover: tableColorHover,
          thIconColor: iconColor,
          thIconColorActive: primaryColor,
          // modal
          borderColorModal: composite(modalColor, dividerColor),
          tdColorHoverModal: composite(modalColor, tableColorHover),
          tdColorSortingModal: composite(modalColor, tableColorHover),
          tdColorStripedModal: composite(modalColor, tableColorStriped),
          thColorModal: composite(modalColor, tableHeaderColor),
          thColorHoverModal: composite(composite(modalColor, tableHeaderColor), tableColorHover),
          thColorSortingModal: composite(composite(modalColor, tableHeaderColor), tableColorHover),
          tdColorModal: modalColor,
          // popover
          borderColorPopover: composite(popoverColor, dividerColor),
          tdColorHoverPopover: composite(popoverColor, tableColorHover),
          tdColorSortingPopover: composite(popoverColor, tableColorHover),
          tdColorStripedPopover: composite(popoverColor, tableColorStriped),
          thColorPopover: composite(popoverColor, tableHeaderColor),
          thColorHoverPopover: composite(composite(popoverColor, tableHeaderColor), tableColorHover),
          thColorSortingPopover: composite(composite(popoverColor, tableHeaderColor), tableColorHover),
          tdColorPopover: popoverColor,
          boxShadowBefore: "inset -12px 0 8px -12px rgba(0, 0, 0, .18)",
          boxShadowAfter: "inset 12px 0 8px -12px rgba(0, 0, 0, .18)",
          // loading
          loadingColor: primaryColor,
          loadingSize: heightSmall,
          opacityLoading: opacityDisabled
        });
      }
      const dataTableLight = createTheme({
        name: "DataTable",
        common: derived,
        peers: {
          Button: buttonLight,
          Checkbox: checkboxLight,
          Radio: radioLight,
          Pagination: paginationLight,
          Scrollbar: scrollbarLight,
          Empty: emptyLight,
          Popover: popoverLight,
          Ellipsis: ellipsisLight,
          Dropdown: dropdownLight
        },
        self: self$P
      });
      const dataTableDark = {
        name: "DataTable",
        common: derived$1,
        peers: {
          Button: buttonDark,
          Checkbox: checkboxDark,
          Radio: radioDark,
          Pagination: paginationDark,
          Scrollbar: scrollbarDark,
          Empty: emptyDark,
          Popover: popoverDark,
          Ellipsis: ellipsisDark,
          Dropdown: dropdownDark
        },
        self(vars) {
          const commonSelf = self$P(vars);
          commonSelf.boxShadowAfter = "inset 12px 0 8px -12px rgba(0, 0, 0, .36)";
          commonSelf.boxShadowBefore = "inset -12px 0 8px -12px rgba(0, 0, 0, .36)";
          return commonSelf;
        }
      };
      function self$O(vars) {
        const {
          textColorBase,
          opacity1,
          opacity2,
          opacity3,
          opacity4,
          opacity5
        } = vars;
        return {
          color: textColorBase,
          opacity1Depth: opacity1,
          opacity2Depth: opacity2,
          opacity3Depth: opacity3,
          opacity4Depth: opacity4,
          opacity5Depth: opacity5
        };
      }
      const iconLight = {
        name: "Icon",
        common: derived,
        self: self$O
      };
      const iconDark$1 = {
        name: "Icon",
        common: derived$1,
        self: self$O
      };
      const commonVars$8 = {
        itemFontSize: "12px",
        itemHeight: "36px",
        itemWidth: "52px",
        panelActionPadding: "8px 0"
      };
      function self$N(vars) {
        const {
          popoverColor,
          textColor2,
          primaryColor,
          hoverColor,
          dividerColor,
          opacityDisabled,
          boxShadow2,
          borderRadius,
          iconColor,
          iconColorDisabled
        } = vars;
        return Object.assign(Object.assign({}, commonVars$8), {
          panelColor: popoverColor,
          panelBoxShadow: boxShadow2,
          panelDividerColor: dividerColor,
          itemTextColor: textColor2,
          itemTextColorActive: primaryColor,
          itemColorHover: hoverColor,
          itemOpacityDisabled: opacityDisabled,
          itemBorderRadius: borderRadius,
          borderRadius,
          iconColor,
          iconColorDisabled
        });
      }
      const timePickerLight = createTheme({
        name: "TimePicker",
        common: derived,
        peers: {
          Scrollbar: scrollbarLight,
          Button: buttonLight,
          Input: inputLight
        },
        self: self$N
      });
      const timePickerDark = {
        name: "TimePicker",
        common: derived$1,
        peers: {
          Scrollbar: scrollbarDark,
          Button: buttonDark,
          Input: inputDark
        },
        self: self$N
      };
      const commonVars$7 = {
        itemSize: "24px",
        itemCellWidth: "38px",
        itemCellHeight: "32px",
        scrollItemWidth: "80px",
        scrollItemHeight: "40px",
        panelExtraFooterPadding: "8px 12px",
        panelActionPadding: "8px 12px",
        calendarTitlePadding: "0",
        calendarTitleHeight: "28px",
        arrowSize: "14px",
        panelHeaderPadding: "8px 12px",
        calendarDaysHeight: "32px",
        calendarTitleGridTempateColumns: "28px 28px 1fr 28px 28px",
        // type
        calendarLeftPaddingDate: "6px 12px 4px 12px",
        calendarLeftPaddingDatetime: "4px 12px",
        calendarLeftPaddingDaterange: "6px 12px 4px 12px",
        calendarLeftPaddingDatetimerange: "4px 12px",
        calendarLeftPaddingMonth: "0",
        // TODO: make it actually effective
        calendarLeftPaddingYear: "0",
        calendarLeftPaddingQuarter: "0",
        calendarLeftPaddingMonthrange: "0",
        calendarLeftPaddingQuarterrange: "0",
        calendarLeftPaddingYearrange: "0",
        calendarLeftPaddingWeek: "6px 12px 4px 12px",
        calendarRightPaddingDate: "6px 12px 4px 12px",
        calendarRightPaddingDatetime: "4px 12px",
        calendarRightPaddingDaterange: "6px 12px 4px 12px",
        calendarRightPaddingDatetimerange: "4px 12px",
        calendarRightPaddingMonth: "0",
        calendarRightPaddingYear: "0",
        calendarRightPaddingQuarter: "0",
        calendarRightPaddingMonthrange: "0",
        calendarRightPaddingQuarterrange: "0",
        calendarRightPaddingYearrange: "0",
        calendarRightPaddingWeek: "0"
      };
      function self$M(vars) {
        const {
          hoverColor,
          fontSize: fontSize2,
          textColor2,
          textColorDisabled,
          popoverColor,
          primaryColor,
          borderRadiusSmall,
          iconColor,
          iconColorDisabled,
          textColor1,
          dividerColor,
          boxShadow2,
          borderRadius,
          fontWeightStrong
        } = vars;
        return Object.assign(Object.assign({}, commonVars$7), {
          itemFontSize: fontSize2,
          calendarDaysFontSize: fontSize2,
          calendarTitleFontSize: fontSize2,
          itemTextColor: textColor2,
          itemTextColorDisabled: textColorDisabled,
          itemTextColorActive: popoverColor,
          itemTextColorCurrent: primaryColor,
          itemColorIncluded: changeColor(primaryColor, {
            alpha: 0.1
          }),
          itemColorHover: hoverColor,
          itemColorDisabled: hoverColor,
          itemColorActive: primaryColor,
          itemBorderRadius: borderRadiusSmall,
          panelColor: popoverColor,
          panelTextColor: textColor2,
          arrowColor: iconColor,
          calendarTitleTextColor: textColor1,
          calendarTitleColorHover: hoverColor,
          calendarDaysTextColor: textColor2,
          panelHeaderDividerColor: dividerColor,
          calendarDaysDividerColor: dividerColor,
          calendarDividerColor: dividerColor,
          panelActionDividerColor: dividerColor,
          panelBoxShadow: boxShadow2,
          panelBorderRadius: borderRadius,
          calendarTitleFontWeight: fontWeightStrong,
          scrollItemBorderRadius: borderRadius,
          iconColor,
          iconColorDisabled
        });
      }
      const datePickerLight = createTheme({
        name: "DatePicker",
        common: derived,
        peers: {
          Input: inputLight,
          Button: buttonLight,
          TimePicker: timePickerLight,
          Scrollbar: scrollbarLight
        },
        self: self$M
      });
      const datePickerDark = {
        name: "DatePicker",
        common: derived$1,
        peers: {
          Input: inputDark,
          Button: buttonDark,
          TimePicker: timePickerDark,
          Scrollbar: scrollbarDark
        },
        self(vars) {
          const {
            popoverColor,
            hoverColor,
            primaryColor
          } = vars;
          const commonSelf = self$M(vars);
          commonSelf.itemColorDisabled = composite(popoverColor, hoverColor);
          commonSelf.itemColorIncluded = changeColor(primaryColor, {
            alpha: 0.15
          });
          commonSelf.itemColorHover = composite(popoverColor, hoverColor);
          return commonSelf;
        }
      };
      const commonVariables$7 = {
        thPaddingBorderedSmall: "8px 12px",
        thPaddingBorderedMedium: "12px 16px",
        thPaddingBorderedLarge: "16px 24px",
        thPaddingSmall: "0",
        thPaddingMedium: "0",
        thPaddingLarge: "0",
        tdPaddingBorderedSmall: "8px 12px",
        tdPaddingBorderedMedium: "12px 16px",
        tdPaddingBorderedLarge: "16px 24px",
        tdPaddingSmall: "0 0 8px 0",
        tdPaddingMedium: "0 0 12px 0",
        tdPaddingLarge: "0 0 16px 0"
      };
      function self$L(vars) {
        const {
          tableHeaderColor,
          textColor2,
          textColor1,
          cardColor,
          modalColor,
          popoverColor,
          dividerColor,
          borderRadius,
          fontWeightStrong,
          lineHeight: lineHeight2,
          fontSizeSmall,
          fontSizeMedium,
          fontSizeLarge
        } = vars;
        return Object.assign(Object.assign({}, commonVariables$7), {
          lineHeight: lineHeight2,
          fontSizeSmall,
          fontSizeMedium,
          fontSizeLarge,
          titleTextColor: textColor1,
          thColor: composite(cardColor, tableHeaderColor),
          thColorModal: composite(modalColor, tableHeaderColor),
          thColorPopover: composite(popoverColor, tableHeaderColor),
          thTextColor: textColor1,
          thFontWeight: fontWeightStrong,
          tdTextColor: textColor2,
          tdColor: cardColor,
          tdColorModal: modalColor,
          tdColorPopover: popoverColor,
          borderColor: composite(cardColor, dividerColor),
          borderColorModal: composite(modalColor, dividerColor),
          borderColorPopover: composite(popoverColor, dividerColor),
          borderRadius
        });
      }
      const descriptionsLight = {
        name: "Descriptions",
        common: derived,
        self: self$L
      };
      const descriptionsDark = {
        name: "Descriptions",
        common: derived$1,
        self: self$L
      };
      const commonVars$6 = {
        titleFontSize: "18px",
        padding: "16px 28px 20px 28px",
        iconSize: "28px",
        actionSpace: "12px",
        contentMargin: "8px 0 16px 0",
        iconMargin: "0 4px 0 0",
        iconMarginIconTop: "4px 0 8px 0",
        closeSize: "22px",
        closeIconSize: "18px",
        closeMargin: "20px 26px 0 0",
        closeMarginIconTop: "10px 16px 0 0"
      };
      function self$K(vars) {
        const {
          textColor1,
          textColor2,
          modalColor,
          closeIconColor,
          closeIconColorHover,
          closeIconColorPressed,
          closeColorHover,
          closeColorPressed,
          infoColor,
          successColor,
          warningColor,
          errorColor,
          primaryColor,
          dividerColor,
          borderRadius,
          fontWeightStrong,
          lineHeight: lineHeight2,
          fontSize: fontSize2
        } = vars;
        return Object.assign(Object.assign({}, commonVars$6), {
          fontSize: fontSize2,
          lineHeight: lineHeight2,
          border: `1px solid ${dividerColor}`,
          titleTextColor: textColor1,
          textColor: textColor2,
          color: modalColor,
          closeColorHover,
          closeColorPressed,
          closeIconColor,
          closeIconColorHover,
          closeIconColorPressed,
          closeBorderRadius: borderRadius,
          iconColor: primaryColor,
          iconColorInfo: infoColor,
          iconColorSuccess: successColor,
          iconColorWarning: warningColor,
          iconColorError: errorColor,
          borderRadius,
          titleFontWeight: fontWeightStrong
        });
      }
      const dialogLight = createTheme({
        name: "Dialog",
        common: derived,
        peers: {
          Button: buttonLight
        },
        self: self$K
      });
      const dialogDark = {
        name: "Dialog",
        common: derived$1,
        peers: {
          Button: buttonDark
        },
        self: self$K
      };
      function self$J(vars) {
        const {
          modalColor,
          textColor2,
          boxShadow3
        } = vars;
        return {
          color: modalColor,
          textColor: textColor2,
          boxShadow: boxShadow3
        };
      }
      const modalLight = createTheme({
        name: "Modal",
        common: derived,
        peers: {
          Scrollbar: scrollbarLight,
          Dialog: dialogLight,
          Card: cardLight
        },
        self: self$J
      });
      const modalDark = {
        name: "Modal",
        common: derived$1,
        peers: {
          Scrollbar: scrollbarDark,
          Dialog: dialogDark,
          Card: cardDark
        },
        self: self$J
      };
      function self$I(vars) {
        const {
          textColor1,
          dividerColor,
          fontWeightStrong
        } = vars;
        return {
          textColor: textColor1,
          color: dividerColor,
          fontWeight: fontWeightStrong
        };
      }
      const dividerLight = {
        name: "Divider",
        common: derived,
        self: self$I
      };
      const dividerDark = {
        name: "Divider",
        common: derived$1,
        self: self$I
      };
      function self$H(vars) {
        const {
          modalColor,
          textColor1,
          textColor2,
          boxShadow3,
          lineHeight: lineHeight2,
          fontWeightStrong,
          dividerColor,
          closeColorHover,
          closeColorPressed,
          closeIconColor,
          closeIconColorHover,
          closeIconColorPressed,
          borderRadius,
          primaryColorHover
        } = vars;
        return {
          bodyPadding: "16px 24px",
          borderRadius,
          headerPadding: "16px 24px",
          footerPadding: "16px 24px",
          color: modalColor,
          textColor: textColor2,
          titleTextColor: textColor1,
          titleFontSize: "18px",
          titleFontWeight: fontWeightStrong,
          boxShadow: boxShadow3,
          lineHeight: lineHeight2,
          headerBorderBottom: `1px solid ${dividerColor}`,
          footerBorderTop: `1px solid ${dividerColor}`,
          closeIconColor,
          closeIconColorHover,
          closeIconColorPressed,
          closeSize: "22px",
          closeIconSize: "18px",
          closeColorHover,
          closeColorPressed,
          closeBorderRadius: borderRadius,
          resizableTriggerColorHover: primaryColorHover
        };
      }
      const drawerLight = createTheme({
        name: "Drawer",
        common: derived,
        peers: {
          Scrollbar: scrollbarLight
        },
        self: self$H
      });
      const drawerDark = {
        name: "Drawer",
        common: derived$1,
        peers: {
          Scrollbar: scrollbarDark
        },
        self: self$H
      };
      const NDrawerBodyWrapper = vue.defineComponent({
        name: "NDrawerContent",
        inheritAttrs: false,
        props: {
          blockScroll: Boolean,
          show: {
            type: Boolean,
            default: void 0
          },
          displayDirective: {
            type: String,
            required: true
          },
          placement: {
            type: String,
            required: true
          },
          contentClass: String,
          contentStyle: [Object, String],
          nativeScrollbar: {
            type: Boolean,
            required: true
          },
          scrollbarProps: Object,
          trapFocus: {
            type: Boolean,
            default: true
          },
          autoFocus: {
            type: Boolean,
            default: true
          },
          showMask: {
            type: [Boolean, String],
            required: true
          },
          maxWidth: Number,
          maxHeight: Number,
          minWidth: Number,
          minHeight: Number,
          resizable: Boolean,
          onClickoutside: Function,
          onAfterLeave: Function,
          onAfterEnter: Function,
          onEsc: Function
        },
        setup(props) {
          const displayedRef = vue.ref(!!props.show);
          const bodyRef = vue.ref(null);
          const NDrawer2 = vue.inject(drawerInjectionKey);
          let startPosition = 0;
          let memoizedBodyStyleCursor = "";
          let hoverTimerId = null;
          const isHoverOnResizeTriggerRef = vue.ref(false);
          const isDraggingRef = vue.ref(false);
          const isVertical = vue.computed(() => {
            return props.placement === "top" || props.placement === "bottom";
          });
          const {
            mergedClsPrefixRef,
            mergedRtlRef
          } = useConfig(props);
          const rtlEnabledRef = useRtl("Drawer", mergedRtlRef, mergedClsPrefixRef);
          const handleBodyMouseleave = handleBodyMouseup;
          const handleMousedownResizeTrigger = (e) => {
            isDraggingRef.value = true;
            startPosition = isVertical.value ? e.clientY : e.clientX;
            memoizedBodyStyleCursor = document.body.style.cursor;
            document.body.style.cursor = isVertical.value ? "ns-resize" : "ew-resize";
            document.body.addEventListener("mousemove", handleBodyMousemove);
            document.body.addEventListener("mouseleave", handleBodyMouseleave);
            document.body.addEventListener("mouseup", handleBodyMouseup);
          };
          const handleMouseenterResizeTrigger = () => {
            if (hoverTimerId !== null) {
              window.clearTimeout(hoverTimerId);
              hoverTimerId = null;
            }
            if (isDraggingRef.value) {
              isHoverOnResizeTriggerRef.value = true;
            } else {
              hoverTimerId = window.setTimeout(() => {
                isHoverOnResizeTriggerRef.value = true;
              }, 300);
            }
          };
          const handleMouseleaveResizeTrigger = () => {
            if (hoverTimerId !== null) {
              window.clearTimeout(hoverTimerId);
              hoverTimerId = null;
            }
            isHoverOnResizeTriggerRef.value = false;
          };
          const {
            doUpdateHeight,
            doUpdateWidth
          } = NDrawer2;
          const regulateWidth = (size2) => {
            const {
              maxWidth
            } = props;
            if (maxWidth && size2 > maxWidth) return maxWidth;
            const {
              minWidth
            } = props;
            if (minWidth && size2 < minWidth) return minWidth;
            return size2;
          };
          const regulateHeight = (size2) => {
            const {
              maxHeight
            } = props;
            if (maxHeight && size2 > maxHeight) return maxHeight;
            const {
              minHeight
            } = props;
            if (minHeight && size2 < minHeight) return minHeight;
            return size2;
          };
          function handleBodyMousemove(e) {
            var _a, _b;
            if (isDraggingRef.value) {
              if (isVertical.value) {
                let height = ((_a = bodyRef.value) === null || _a === void 0 ? void 0 : _a.offsetHeight) || 0;
                const increment = startPosition - e.clientY;
                height += props.placement === "bottom" ? increment : -increment;
                height = regulateHeight(height);
                doUpdateHeight(height);
                startPosition = e.clientY;
              } else {
                let width = ((_b = bodyRef.value) === null || _b === void 0 ? void 0 : _b.offsetWidth) || 0;
                const increment = startPosition - e.clientX;
                width += props.placement === "right" ? increment : -increment;
                width = regulateWidth(width);
                doUpdateWidth(width);
                startPosition = e.clientX;
              }
            }
          }
          function handleBodyMouseup() {
            if (isDraggingRef.value) {
              startPosition = 0;
              isDraggingRef.value = false;
              document.body.style.cursor = memoizedBodyStyleCursor;
              document.body.removeEventListener("mousemove", handleBodyMousemove);
              document.body.removeEventListener("mouseup", handleBodyMouseup);
              document.body.removeEventListener("mouseleave", handleBodyMouseleave);
            }
          }
          vue.watchEffect(() => {
            if (props.show) displayedRef.value = true;
          });
          vue.watch(() => props.show, (value) => {
            if (!value) {
              handleBodyMouseup();
            }
          });
          vue.onBeforeUnmount(() => {
            handleBodyMouseup();
          });
          const bodyDirectivesRef = vue.computed(() => {
            const {
              show
            } = props;
            const directives = [[vue.vShow, show]];
            if (!props.showMask) {
              directives.push([clickoutside, props.onClickoutside, void 0, {
                capture: true
              }]);
            }
            return directives;
          });
          function handleAfterLeave() {
            var _a;
            displayedRef.value = false;
            (_a = props.onAfterLeave) === null || _a === void 0 ? void 0 : _a.call(props);
          }
          useLockHtmlScroll(vue.computed(() => props.blockScroll && displayedRef.value));
          vue.provide(drawerBodyInjectionKey, bodyRef);
          vue.provide(popoverBodyInjectionKey, null);
          vue.provide(modalBodyInjectionKey, null);
          return {
            bodyRef,
            rtlEnabled: rtlEnabledRef,
            mergedClsPrefix: NDrawer2.mergedClsPrefixRef,
            isMounted: NDrawer2.isMountedRef,
            mergedTheme: NDrawer2.mergedThemeRef,
            displayed: displayedRef,
            transitionName: vue.computed(() => {
              return {
                right: "slide-in-from-right-transition",
                left: "slide-in-from-left-transition",
                top: "slide-in-from-top-transition",
                bottom: "slide-in-from-bottom-transition"
              }[props.placement];
            }),
            handleAfterLeave,
            bodyDirectives: bodyDirectivesRef,
            handleMousedownResizeTrigger,
            handleMouseenterResizeTrigger,
            handleMouseleaveResizeTrigger,
            isDragging: isDraggingRef,
            isHoverOnResizeTrigger: isHoverOnResizeTriggerRef
          };
        },
        render() {
          const {
            $slots,
            mergedClsPrefix
          } = this;
          return this.displayDirective === "show" || this.displayed || this.show ? vue.withDirectives(
            /* Keep the wrapper dom. Make sure the drawer has a host.
              Nor the detached content will disappear without transition */
            vue.h("div", {
              role: "none"
            }, vue.h(FocusTrap, {
              disabled: !this.showMask || !this.trapFocus,
              active: this.show,
              autoFocus: this.autoFocus,
              onEsc: this.onEsc
            }, {
              default: () => vue.h(vue.Transition, {
                name: this.transitionName,
                appear: this.isMounted,
                onAfterEnter: this.onAfterEnter,
                onAfterLeave: this.handleAfterLeave
              }, {
                default: () => vue.withDirectives(vue.h("div", vue.mergeProps(this.$attrs, {
                  role: "dialog",
                  ref: "bodyRef",
                  "aria-modal": "true",
                  class: [
                    `${mergedClsPrefix}-drawer`,
                    this.rtlEnabled && `${mergedClsPrefix}-drawer--rtl`,
                    `${mergedClsPrefix}-drawer--${this.placement}-placement`,
                    /**
                     * When the mouse is pressed to resize the drawer,
                     * disable text selection
                     */
                    this.isDragging && `${mergedClsPrefix}-drawer--unselectable`,
                    this.nativeScrollbar && `${mergedClsPrefix}-drawer--native-scrollbar`
                  ]
                }), [this.resizable ? vue.h("div", {
                  class: [`${mergedClsPrefix}-drawer__resize-trigger`, (this.isDragging || this.isHoverOnResizeTrigger) && `${mergedClsPrefix}-drawer__resize-trigger--hover`],
                  onMouseenter: this.handleMouseenterResizeTrigger,
                  onMouseleave: this.handleMouseleaveResizeTrigger,
                  onMousedown: this.handleMousedownResizeTrigger
                }) : null, this.nativeScrollbar ? vue.h("div", {
                  class: [`${mergedClsPrefix}-drawer-content-wrapper`, this.contentClass],
                  style: this.contentStyle,
                  role: "none"
                }, $slots) : vue.h(Scrollbar, Object.assign({}, this.scrollbarProps, {
                  contentStyle: this.contentStyle,
                  contentClass: [`${mergedClsPrefix}-drawer-content-wrapper`, this.contentClass],
                  theme: this.mergedTheme.peers.Scrollbar,
                  themeOverrides: this.mergedTheme.peerOverrides.Scrollbar
                }), $slots)]), this.bodyDirectives)
              })
            })),
            [[vue.vShow, this.displayDirective === "if" || this.displayed || this.show]]
          ) : null;
        }
      });
      const {
        cubicBezierEaseIn: cubicBezierEaseIn$3,
        cubicBezierEaseOut: cubicBezierEaseOut$3
      } = commonVariables$m;
      function slideInFromRightTransition({
        duration: duration2 = "0.3s",
        leaveDuration = "0.2s",
        name = "slide-in-from-right"
      } = {}) {
        return [c$1(`&.${name}-transition-leave-active`, {
          transition: `transform ${leaveDuration} ${cubicBezierEaseIn$3}`
        }), c$1(`&.${name}-transition-enter-active`, {
          transition: `transform ${duration2} ${cubicBezierEaseOut$3}`
        }), c$1(`&.${name}-transition-enter-to`, {
          transform: "translateX(0)"
        }), c$1(`&.${name}-transition-enter-from`, {
          transform: "translateX(100%)"
        }), c$1(`&.${name}-transition-leave-from`, {
          transform: "translateX(0)"
        }), c$1(`&.${name}-transition-leave-to`, {
          transform: "translateX(100%)"
        })];
      }
      const {
        cubicBezierEaseIn: cubicBezierEaseIn$2,
        cubicBezierEaseOut: cubicBezierEaseOut$2
      } = commonVariables$m;
      function slideInFromLeftTransition({
        duration: duration2 = "0.3s",
        leaveDuration = "0.2s",
        name = "slide-in-from-left"
      } = {}) {
        return [c$1(`&.${name}-transition-leave-active`, {
          transition: `transform ${leaveDuration} ${cubicBezierEaseIn$2}`
        }), c$1(`&.${name}-transition-enter-active`, {
          transition: `transform ${duration2} ${cubicBezierEaseOut$2}`
        }), c$1(`&.${name}-transition-enter-to`, {
          transform: "translateX(0)"
        }), c$1(`&.${name}-transition-enter-from`, {
          transform: "translateX(-100%)"
        }), c$1(`&.${name}-transition-leave-from`, {
          transform: "translateX(0)"
        }), c$1(`&.${name}-transition-leave-to`, {
          transform: "translateX(-100%)"
        })];
      }
      const {
        cubicBezierEaseIn: cubicBezierEaseIn$1,
        cubicBezierEaseOut: cubicBezierEaseOut$1
      } = commonVariables$m;
      function slideInFromTopTransition({
        duration: duration2 = "0.3s",
        leaveDuration = "0.2s",
        name = "slide-in-from-top"
      } = {}) {
        return [c$1(`&.${name}-transition-leave-active`, {
          transition: `transform ${leaveDuration} ${cubicBezierEaseIn$1}`
        }), c$1(`&.${name}-transition-enter-active`, {
          transition: `transform ${duration2} ${cubicBezierEaseOut$1}`
        }), c$1(`&.${name}-transition-enter-to`, {
          transform: "translateY(0)"
        }), c$1(`&.${name}-transition-enter-from`, {
          transform: "translateY(-100%)"
        }), c$1(`&.${name}-transition-leave-from`, {
          transform: "translateY(0)"
        }), c$1(`&.${name}-transition-leave-to`, {
          transform: "translateY(-100%)"
        })];
      }
      const {
        cubicBezierEaseIn,
        cubicBezierEaseOut
      } = commonVariables$m;
      function slideInFromBottomTransition({
        duration: duration2 = "0.3s",
        leaveDuration = "0.2s",
        name = "slide-in-from-bottom"
      } = {}) {
        return [c$1(`&.${name}-transition-leave-active`, {
          transition: `transform ${leaveDuration} ${cubicBezierEaseIn}`
        }), c$1(`&.${name}-transition-enter-active`, {
          transition: `transform ${duration2} ${cubicBezierEaseOut}`
        }), c$1(`&.${name}-transition-enter-to`, {
          transform: "translateY(0)"
        }), c$1(`&.${name}-transition-enter-from`, {
          transform: "translateY(100%)"
        }), c$1(`&.${name}-transition-leave-from`, {
          transform: "translateY(0)"
        }), c$1(`&.${name}-transition-leave-to`, {
          transform: "translateY(100%)"
        })];
      }
      const style$6 = c$1([cB("drawer", `
 word-break: break-word;
 line-height: var(--n-line-height);
 position: absolute;
 pointer-events: all;
 box-shadow: var(--n-box-shadow);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 background-color: var(--n-color);
 color: var(--n-text-color);
 box-sizing: border-box;
 `, [slideInFromRightTransition(), slideInFromLeftTransition(), slideInFromTopTransition(), slideInFromBottomTransition(), cM("unselectable", `
 user-select: none; 
 -webkit-user-select: none;
 `), cM("native-scrollbar", [cB("drawer-content-wrapper", `
 overflow: auto;
 height: 100%;
 `)]), cE("resize-trigger", `
 position: absolute;
 background-color: #0000;
 transition: background-color .3s var(--n-bezier);
 `, [cM("hover", `
 background-color: var(--n-resize-trigger-color-hover);
 `)]), cB("drawer-content-wrapper", `
 box-sizing: border-box;
 `), cB("drawer-content", `
 height: 100%;
 display: flex;
 flex-direction: column;
 `, [cM("native-scrollbar", [cB("drawer-body-content-wrapper", `
 height: 100%;
 overflow: auto;
 `)]), cB("drawer-body", `
 flex: 1 0 0;
 overflow: hidden;
 `), cB("drawer-body-content-wrapper", `
 box-sizing: border-box;
 padding: var(--n-body-padding);
 `), cB("drawer-header", `
 font-weight: var(--n-title-font-weight);
 line-height: 1;
 font-size: var(--n-title-font-size);
 color: var(--n-title-text-color);
 padding: var(--n-header-padding);
 transition: border .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-divider-color);
 border-bottom: var(--n-header-border-bottom);
 display: flex;
 justify-content: space-between;
 align-items: center;
 `, [cE("close", `
 margin-left: 6px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `)]), cB("drawer-footer", `
 display: flex;
 justify-content: flex-end;
 border-top: var(--n-footer-border-top);
 transition: border .3s var(--n-bezier);
 padding: var(--n-footer-padding);
 `)]), cM("right-placement", `
 top: 0;
 bottom: 0;
 right: 0;
 border-top-left-radius: var(--n-border-radius);
 border-bottom-left-radius: var(--n-border-radius);
 `, [cE("resize-trigger", `
 width: 3px;
 height: 100%;
 top: 0;
 left: 0;
 transform: translateX(-1.5px);
 cursor: ew-resize;
 `)]), cM("left-placement", `
 top: 0;
 bottom: 0;
 left: 0;
 border-top-right-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 `, [cE("resize-trigger", `
 width: 3px;
 height: 100%;
 top: 0;
 right: 0;
 transform: translateX(1.5px);
 cursor: ew-resize;
 `)]), cM("top-placement", `
 top: 0;
 left: 0;
 right: 0;
 border-bottom-left-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 `, [cE("resize-trigger", `
 width: 100%;
 height: 3px;
 bottom: 0;
 left: 0;
 transform: translateY(1.5px);
 cursor: ns-resize;
 `)]), cM("bottom-placement", `
 left: 0;
 bottom: 0;
 right: 0;
 border-top-left-radius: var(--n-border-radius);
 border-top-right-radius: var(--n-border-radius);
 `, [cE("resize-trigger", `
 width: 100%;
 height: 3px;
 top: 0;
 left: 0;
 transform: translateY(-1.5px);
 cursor: ns-resize;
 `)])]), c$1("body", [c$1(">", [cB("drawer-container", `
 position: fixed;
 `)])]), cB("drawer-container", `
 position: relative;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 pointer-events: none;
 `, [c$1("> *", `
 pointer-events: all;
 `)]), cB("drawer-mask", `
 background-color: rgba(0, 0, 0, .3);
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `, [cM("invisible", `
 background-color: rgba(0, 0, 0, 0)
 `), fadeInTransition({
        enterDuration: "0.2s",
        leaveDuration: "0.2s",
        enterCubicBezier: "var(--n-bezier-in)",
        leaveCubicBezier: "var(--n-bezier-out)"
      })])]);
      const drawerProps = Object.assign(Object.assign({}, useTheme.props), {
        show: Boolean,
        width: [Number, String],
        height: [Number, String],
        placement: {
          type: String,
          default: "right"
        },
        maskClosable: {
          type: Boolean,
          default: true
        },
        showMask: {
          type: [Boolean, String],
          default: true
        },
        to: [String, Object],
        displayDirective: {
          type: String,
          default: "if"
        },
        nativeScrollbar: {
          type: Boolean,
          default: true
        },
        zIndex: Number,
        onMaskClick: Function,
        scrollbarProps: Object,
        contentClass: String,
        contentStyle: [Object, String],
        trapFocus: {
          type: Boolean,
          default: true
        },
        onEsc: Function,
        autoFocus: {
          type: Boolean,
          default: true
        },
        closeOnEsc: {
          type: Boolean,
          default: true
        },
        blockScroll: {
          type: Boolean,
          default: true
        },
        maxWidth: Number,
        maxHeight: Number,
        minWidth: Number,
        minHeight: Number,
        resizable: Boolean,
        defaultWidth: {
          type: [Number, String],
          default: 251
        },
        defaultHeight: {
          type: [Number, String],
          default: 251
        },
        onUpdateWidth: [Function, Array],
        onUpdateHeight: [Function, Array],
        "onUpdate:width": [Function, Array],
        "onUpdate:height": [Function, Array],
        "onUpdate:show": [Function, Array],
        onUpdateShow: [Function, Array],
        onAfterEnter: Function,
        onAfterLeave: Function,
        /** @deprecated */
        drawerStyle: [String, Object],
        drawerClass: String,
        target: null,
        onShow: Function,
        onHide: Function
      });
      const NDrawer = vue.defineComponent({
        name: "Drawer",
        inheritAttrs: false,
        props: drawerProps,
        setup(props) {
          const {
            mergedClsPrefixRef,
            namespaceRef,
            inlineThemeDisabled
          } = useConfig(props);
          const isMountedRef = isMounted();
          const themeRef = useTheme("Drawer", "-drawer", style$6, drawerLight, props, mergedClsPrefixRef);
          const uncontrolledWidthRef = vue.ref(props.defaultWidth);
          const uncontrolledHeightRef = vue.ref(props.defaultHeight);
          const mergedWidthRef = useMergedState(vue.toRef(props, "width"), uncontrolledWidthRef);
          const mergedHeightRef = useMergedState(vue.toRef(props, "height"), uncontrolledHeightRef);
          const styleWidthRef = vue.computed(() => {
            const {
              placement
            } = props;
            if (placement === "top" || placement === "bottom") return "";
            return formatLength(mergedWidthRef.value);
          });
          const styleHeightRef = vue.computed(() => {
            const {
              placement
            } = props;
            if (placement === "left" || placement === "right") return "";
            return formatLength(mergedHeightRef.value);
          });
          const doUpdateWidth = (value) => {
            const {
              onUpdateWidth,
              "onUpdate:width": _onUpdateWidth
            } = props;
            if (onUpdateWidth) call(onUpdateWidth, value);
            if (_onUpdateWidth) call(_onUpdateWidth, value);
            uncontrolledWidthRef.value = value;
          };
          const doUpdateHeight = (value) => {
            const {
              onUpdateHeight,
              "onUpdate:width": _onUpdateHeight
            } = props;
            if (onUpdateHeight) call(onUpdateHeight, value);
            if (_onUpdateHeight) call(_onUpdateHeight, value);
            uncontrolledHeightRef.value = value;
          };
          const mergedBodyStyleRef = vue.computed(() => {
            return [{
              width: styleWidthRef.value,
              height: styleHeightRef.value
            }, props.drawerStyle || ""];
          });
          function handleMaskClick(e) {
            const {
              onMaskClick,
              maskClosable
            } = props;
            if (maskClosable) {
              doUpdateShow(false);
            }
            if (onMaskClick) onMaskClick(e);
          }
          function handleOutsideClick(e) {
            handleMaskClick(e);
          }
          const isComposingRef2 = useIsComposing();
          function handleEsc(e) {
            var _a;
            (_a = props.onEsc) === null || _a === void 0 ? void 0 : _a.call(props);
            if (props.show && props.closeOnEsc && eventEffectNotPerformed(e)) {
              if (!isComposingRef2.value) {
                doUpdateShow(false);
              }
            }
          }
          function doUpdateShow(show) {
            const {
              onHide,
              onUpdateShow,
              "onUpdate:show": _onUpdateShow
            } = props;
            if (onUpdateShow) call(onUpdateShow, show);
            if (_onUpdateShow) call(_onUpdateShow, show);
            if (onHide && !show) call(onHide, show);
          }
          vue.provide(drawerInjectionKey, {
            isMountedRef,
            mergedThemeRef: themeRef,
            mergedClsPrefixRef,
            doUpdateShow,
            doUpdateHeight,
            doUpdateWidth
          });
          const cssVarsRef = vue.computed(() => {
            const {
              common: {
                cubicBezierEaseInOut: cubicBezierEaseInOut2,
                cubicBezierEaseIn: cubicBezierEaseIn2,
                cubicBezierEaseOut: cubicBezierEaseOut2
              },
              self: {
                color,
                textColor,
                boxShadow,
                lineHeight: lineHeight2,
                headerPadding,
                footerPadding,
                borderRadius,
                bodyPadding,
                titleFontSize,
                titleTextColor,
                titleFontWeight,
                headerBorderBottom,
                footerBorderTop,
                closeIconColor,
                closeIconColorHover,
                closeIconColorPressed,
                closeColorHover,
                closeColorPressed,
                closeIconSize,
                closeSize,
                closeBorderRadius,
                resizableTriggerColorHover
              }
            } = themeRef.value;
            return {
              "--n-line-height": lineHeight2,
              "--n-color": color,
              "--n-border-radius": borderRadius,
              "--n-text-color": textColor,
              "--n-box-shadow": boxShadow,
              "--n-bezier": cubicBezierEaseInOut2,
              "--n-bezier-out": cubicBezierEaseOut2,
              "--n-bezier-in": cubicBezierEaseIn2,
              "--n-header-padding": headerPadding,
              "--n-body-padding": bodyPadding,
              "--n-footer-padding": footerPadding,
              "--n-title-text-color": titleTextColor,
              "--n-title-font-size": titleFontSize,
              "--n-title-font-weight": titleFontWeight,
              "--n-header-border-bottom": headerBorderBottom,
              "--n-footer-border-top": footerBorderTop,
              "--n-close-icon-color": closeIconColor,
              "--n-close-icon-color-hover": closeIconColorHover,
              "--n-close-icon-color-pressed": closeIconColorPressed,
              "--n-close-size": closeSize,
              "--n-close-color-hover": closeColorHover,
              "--n-close-color-pressed": closeColorPressed,
              "--n-close-icon-size": closeIconSize,
              "--n-close-border-radius": closeBorderRadius,
              "--n-resize-trigger-color-hover": resizableTriggerColorHover
            };
          });
          const themeClassHandle = inlineThemeDisabled ? useThemeClass("drawer", void 0, cssVarsRef, props) : void 0;
          return {
            mergedClsPrefix: mergedClsPrefixRef,
            namespace: namespaceRef,
            mergedBodyStyle: mergedBodyStyleRef,
            handleOutsideClick,
            handleMaskClick,
            handleEsc,
            mergedTheme: themeRef,
            cssVars: inlineThemeDisabled ? void 0 : cssVarsRef,
            themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
            onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender,
            isMounted: isMountedRef
          };
        },
        render() {
          const {
            mergedClsPrefix
          } = this;
          return vue.h(LazyTeleport, {
            to: this.to,
            show: this.show
          }, {
            default: () => {
              var _a;
              (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
              return vue.withDirectives(vue.h("div", {
                class: [`${mergedClsPrefix}-drawer-container`, this.namespace, this.themeClass],
                style: this.cssVars,
                role: "none"
              }, this.showMask ? vue.h(vue.Transition, {
                name: "fade-in-transition",
                appear: this.isMounted
              }, {
                default: () => this.show ? vue.h("div", {
                  "aria-hidden": true,
                  class: [`${mergedClsPrefix}-drawer-mask`, this.showMask === "transparent" && `${mergedClsPrefix}-drawer-mask--invisible`],
                  onClick: this.handleMaskClick
                }) : null
              }) : null, vue.h(NDrawerBodyWrapper, Object.assign({}, this.$attrs, {
                class: [this.drawerClass, this.$attrs.class],
                style: [this.mergedBodyStyle, this.$attrs.style],
                blockScroll: this.blockScroll,
                contentStyle: this.contentStyle,
                contentClass: this.contentClass,
                placement: this.placement,
                scrollbarProps: this.scrollbarProps,
                show: this.show,
                displayDirective: this.displayDirective,
                nativeScrollbar: this.nativeScrollbar,
                onAfterEnter: this.onAfterEnter,
                onAfterLeave: this.onAfterLeave,
                trapFocus: this.trapFocus,
                autoFocus: this.autoFocus,
                resizable: this.resizable,
                maxHeight: this.maxHeight,
                minHeight: this.minHeight,
                maxWidth: this.maxWidth,
                minWidth: this.minWidth,
                showMask: this.showMask,
                onEsc: this.handleEsc,
                onClickoutside: this.handleOutsideClick
              }), this.$slots)), [[zindexable, {
                zIndex: this.zIndex,
                enabled: this.show
              }]]);
            }
          });
        }
      });
      const drawerContentProps = {
        title: String,
        headerClass: String,
        headerStyle: [Object, String],
        footerClass: String,
        footerStyle: [Object, String],
        bodyClass: String,
        bodyStyle: [Object, String],
        bodyContentClass: String,
        bodyContentStyle: [Object, String],
        nativeScrollbar: {
          type: Boolean,
          default: true
        },
        scrollbarProps: Object,
        closable: Boolean
      };
      const NDrawerContent = vue.defineComponent({
        name: "DrawerContent",
        props: drawerContentProps,
        setup() {
          const NDrawer2 = vue.inject(drawerInjectionKey, null);
          if (!NDrawer2) {
            throwError("drawer-content", "`n-drawer-content` must be placed inside `n-drawer`.");
          }
          const {
            doUpdateShow
          } = NDrawer2;
          function handleCloseClick() {
            doUpdateShow(false);
          }
          return {
            handleCloseClick,
            mergedTheme: NDrawer2.mergedThemeRef,
            mergedClsPrefix: NDrawer2.mergedClsPrefixRef
          };
        },
        render() {
          const {
            title,
            mergedClsPrefix,
            nativeScrollbar,
            mergedTheme,
            bodyClass,
            bodyStyle,
            bodyContentClass,
            bodyContentStyle,
            headerClass,
            headerStyle,
            footerClass,
            footerStyle,
            scrollbarProps: scrollbarProps2,
            closable,
            $slots
          } = this;
          return vue.h("div", {
            role: "none",
            class: [`${mergedClsPrefix}-drawer-content`, nativeScrollbar && `${mergedClsPrefix}-drawer-content--native-scrollbar`]
          }, $slots.header || title || closable ? vue.h("div", {
            class: [`${mergedClsPrefix}-drawer-header`, headerClass],
            style: headerStyle,
            role: "none"
          }, vue.h("div", {
            class: `${mergedClsPrefix}-drawer-header__main`,
            role: "heading",
            "aria-level": "1"
          }, $slots.header !== void 0 ? $slots.header() : title), closable && vue.h(NBaseClose, {
            onClick: this.handleCloseClick,
            clsPrefix: mergedClsPrefix,
            class: `${mergedClsPrefix}-drawer-header__close`,
            absolute: true
          })) : null, nativeScrollbar ? vue.h("div", {
            class: [`${mergedClsPrefix}-drawer-body`, bodyClass],
            style: bodyStyle,
            role: "none"
          }, vue.h("div", {
            class: [`${mergedClsPrefix}-drawer-body-content-wrapper`, bodyContentClass],
            style: bodyContentStyle,
            role: "none"
          }, $slots)) : vue.h(Scrollbar, Object.assign({
            themeOverrides: mergedTheme.peerOverrides.Scrollbar,
            theme: mergedTheme.peers.Scrollbar
          }, scrollbarProps2, {
            class: `${mergedClsPrefix}-drawer-body`,
            contentClass: [`${mergedClsPrefix}-drawer-body-content-wrapper`, bodyContentClass],
            contentStyle: bodyContentStyle
          }), $slots), $slots.footer ? vue.h("div", {
            class: [`${mergedClsPrefix}-drawer-footer`, footerClass],
            style: footerStyle,
            role: "none"
          }, $slots.footer()) : null);
        }
      });
      const commonVariables$6 = {
        actionMargin: "0 0 0 20px",
        actionMarginRtl: "0 20px 0 0"
      };
      const dynamicInputDark = {
        name: "DynamicInput",
        common: derived$1,
        peers: {
          Input: inputDark,
          Button: buttonDark
        },
        self() {
          return commonVariables$6;
        }
      };
      function self$G() {
        return commonVariables$6;
      }
      const dynamicInputLight = createTheme({
        name: "DynamicInput",
        common: derived,
        peers: {
          Input: inputLight,
          Button: buttonLight
        },
        self: self$G
      });
      const dynamicInputInjectionKey = createInjectionKey("n-dynamic-input");
      const NDynamicInputInputPreset = vue.defineComponent({
        name: "DynamicInputInputPreset",
        props: {
          clsPrefix: {
            type: String,
            required: true
          },
          value: {
            type: String,
            default: ""
          },
          disabled: Boolean,
          parentPath: String,
          path: String,
          onUpdateValue: {
            type: Function,
            required: true
          }
        },
        setup() {
          const {
            mergedThemeRef,
            placeholderRef
          } = vue.inject(dynamicInputInjectionKey);
          return {
            mergedTheme: mergedThemeRef,
            placeholder: placeholderRef
          };
        },
        render() {
          const {
            mergedTheme,
            placeholder,
            value,
            clsPrefix,
            onUpdateValue,
            disabled
          } = this;
          return vue.h("div", {
            class: `${clsPrefix}-dynamic-input-preset-input`
          }, vue.h(NInput, {
            theme: mergedTheme.peers.Input,
            "theme-overrides": mergedTheme.peerOverrides.Input,
            value,
            placeholder,
            onUpdateValue,
            disabled
          }));
        }
      });
      const NDynamicInputPairPreset = vue.defineComponent({
        name: "DynamicInputPairPreset",
        props: {
          clsPrefix: {
            type: String,
            required: true
          },
          value: {
            type: Object,
            default: () => ({
              key: "",
              value: ""
            })
          },
          disabled: Boolean,
          parentPath: String,
          path: String,
          onUpdateValue: {
            type: Function,
            required: true
          }
        },
        setup(props) {
          const {
            mergedThemeRef,
            keyPlaceholderRef,
            valuePlaceholderRef
          } = vue.inject(dynamicInputInjectionKey);
          return {
            mergedTheme: mergedThemeRef,
            keyPlaceholder: keyPlaceholderRef,
            valuePlaceholder: valuePlaceholderRef,
            handleKeyInput(key) {
              props.onUpdateValue({
                key,
                value: props.value.value
              });
            },
            handleValueInput(value) {
              props.onUpdateValue({
                key: props.value.key,
                value
              });
            }
          };
        },
        render() {
          const {
            mergedTheme,
            keyPlaceholder,
            valuePlaceholder,
            value,
            clsPrefix,
            disabled
          } = this;
          return vue.h("div", {
            class: `${clsPrefix}-dynamic-input-preset-pair`
          }, vue.h(NInput, {
            theme: mergedTheme.peers.Input,
            "theme-overrides": mergedTheme.peerOverrides.Input,
            value: value.key,
            class: `${clsPrefix}-dynamic-input-pair-input`,
            placeholder: keyPlaceholder,
            onUpdateValue: this.handleKeyInput,
            disabled
          }), vue.h(NInput, {
            theme: mergedTheme.peers.Input,
            "theme-overrides": mergedTheme.peerOverrides.Input,
            value: value.value,
            class: `${clsPrefix}-dynamic-input-pair-input`,
            placeholder: valuePlaceholder,
            onUpdateValue: this.handleValueInput,
            disabled
          }));
        }
      });
      const style$5 = cB("dynamic-input", {
        width: "100%"
      }, [cB("dynamic-input-item", `
 margin-bottom: 10px;
 display: flex;
 flex-wrap: nowrap;
 `, [cB("dynamic-input-preset-input", {
        flex: 1,
        alignItems: "center"
      }), cB("dynamic-input-preset-pair", `
 flex: 1;
 display: flex;
 align-items: center;
 `, [cB("dynamic-input-pair-input", [c$1("&:first-child", {
        "margin-right": "12px"
      })])]), cE("action", `
 align-self: flex-start;
 display: flex;
 justify-content: flex-end;
 flex-shrink: 0;
 flex-grow: 0;
 margin: var(--action-margin);
 `, [cM("icon", {
        cursor: "pointer"
      })]), c$1("&:last-child", {
        marginBottom: 0
      })]), cB("form-item", `
 padding-top: 0 !important;
 margin-right: 0 !important;
 `, [cB("form-item-blank", {
        paddingTop: "0 !important"
      })])]);
      const globalDataKeyMap = /* @__PURE__ */ new WeakMap();
      const dynamicInputProps = Object.assign(Object.assign({}, useTheme.props), {
        max: Number,
        min: {
          type: Number,
          default: 0
        },
        value: Array,
        // TODO: make it robust for different types
        defaultValue: {
          type: Array,
          default: () => []
        },
        preset: {
          type: String,
          default: "input"
        },
        keyField: String,
        itemClass: String,
        itemStyle: [String, Object],
        // for preset pair
        keyPlaceholder: {
          type: String,
          default: ""
        },
        valuePlaceholder: {
          type: String,
          default: ""
        },
        // for preset input
        placeholder: {
          type: String,
          default: ""
        },
        disabled: Boolean,
        showSortButton: Boolean,
        createButtonProps: Object,
        onCreate: Function,
        onRemove: Function,
        "onUpdate:value": [Function, Array],
        onUpdateValue: [Function, Array],
        // deprecated
        onClear: Function,
        onInput: [Function, Array]
      });
      const NDynamicInput = vue.defineComponent({
        name: "DynamicInput",
        props: dynamicInputProps,
        setup(props, {
          slots
        }) {
          const {
            mergedComponentPropsRef,
            mergedClsPrefixRef,
            mergedRtlRef,
            inlineThemeDisabled
          } = useConfig();
          const NFormItem2 = vue.inject(formItemInjectionKey, null);
          const uncontrolledValueRef = vue.ref(props.defaultValue);
          const controlledValueRef = vue.toRef(props, "value");
          const mergedValueRef = useMergedState(controlledValueRef, uncontrolledValueRef);
          const themeRef = useTheme("DynamicInput", "-dynamic-input", style$5, dynamicInputLight, props, mergedClsPrefixRef);
          const insertionDisabledRef = vue.computed(() => {
            const {
              value: mergedValue
            } = mergedValueRef;
            if (Array.isArray(mergedValue)) {
              const {
                max
              } = props;
              return max !== void 0 && mergedValue.length >= max;
            }
            return false;
          });
          const removeDisabledRef = vue.computed(() => {
            const {
              value: mergedValue
            } = mergedValueRef;
            if (Array.isArray(mergedValue)) return mergedValue.length <= props.min;
            return true;
          });
          const buttonSizeRef = vue.computed(() => {
            var _a, _b;
            return (_b = (_a = mergedComponentPropsRef === null || mergedComponentPropsRef === void 0 ? void 0 : mergedComponentPropsRef.value) === null || _a === void 0 ? void 0 : _a.DynamicInput) === null || _b === void 0 ? void 0 : _b.buttonSize;
          });
          function doUpdateValue(value) {
            const {
              onInput,
              "onUpdate:value": _onUpdateValue,
              onUpdateValue
            } = props;
            if (onInput) call(onInput, value);
            if (_onUpdateValue) call(_onUpdateValue, value);
            if (onUpdateValue) call(onUpdateValue, value);
            uncontrolledValueRef.value = value;
          }
          function ensureKey(value, index) {
            if (value === void 0 || value === null) return index;
            if (typeof value !== "object") return index;
            const rawValue = vue.isProxy(value) ? vue.toRaw(value) : value;
            let key = globalDataKeyMap.get(rawValue);
            if (key === void 0) {
              globalDataKeyMap.set(rawValue, key = createId());
            }
            return key;
          }
          function handleValueChange(index, value) {
            const {
              value: mergedValue
            } = mergedValueRef;
            const newValue = Array.from(mergedValue !== null && mergedValue !== void 0 ? mergedValue : []);
            const originalItem = newValue[index];
            newValue[index] = value;
            if (originalItem && value && typeof originalItem === "object" && typeof value === "object") {
              const rawOriginal = vue.isProxy(originalItem) ? vue.toRaw(originalItem) : originalItem;
              const rawNew = vue.isProxy(value) ? vue.toRaw(value) : value;
              const originalKey = globalDataKeyMap.get(rawOriginal);
              if (originalKey !== void 0) {
                globalDataKeyMap.set(rawNew, originalKey);
              }
            }
            doUpdateValue(newValue);
          }
          function handleCreateClick() {
            createItem(-1);
          }
          function createItem(index) {
            const {
              value: mergedValue
            } = mergedValueRef;
            const {
              onCreate
            } = props;
            const newValue = Array.from(mergedValue !== null && mergedValue !== void 0 ? mergedValue : []);
            if (onCreate) {
              newValue.splice(index + 1, 0, onCreate(index + 1));
              doUpdateValue(newValue);
            } else if (slots.default) {
              newValue.splice(index + 1, 0, null);
              doUpdateValue(newValue);
            } else {
              switch (props.preset) {
                case "input":
                  newValue.splice(index + 1, 0, "");
                  doUpdateValue(newValue);
                  break;
                case "pair":
                  newValue.splice(index + 1, 0, {
                    key: "",
                    value: ""
                  });
                  doUpdateValue(newValue);
                  break;
              }
            }
          }
          function remove(index) {
            const {
              value: mergedValue
            } = mergedValueRef;
            if (!Array.isArray(mergedValue)) return;
            const {
              min
            } = props;
            if (mergedValue.length <= min) return;
            const {
              onRemove
            } = props;
            if (onRemove) {
              onRemove(index);
            }
            const newValue = Array.from(mergedValue);
            newValue.splice(index, 1);
            doUpdateValue(newValue);
          }
          function swap(array, currentIndex, targetIndex) {
            if (currentIndex < 0 || targetIndex < 0 || currentIndex >= array.length || targetIndex >= array.length) {
              return;
            }
            if (currentIndex === targetIndex) return;
            const currentItem = array[currentIndex];
            array[currentIndex] = array[targetIndex];
            array[targetIndex] = currentItem;
          }
          function move2(type, index) {
            const {
              value: mergedValue
            } = mergedValueRef;
            if (!Array.isArray(mergedValue)) return;
            const newValue = Array.from(mergedValue);
            if (type === "up") {
              swap(newValue, index, index - 1);
            }
            if (type === "down") {
              swap(newValue, index, index + 1);
            }
            doUpdateValue(newValue);
          }
          vue.provide(dynamicInputInjectionKey, {
            mergedThemeRef: themeRef,
            keyPlaceholderRef: vue.toRef(props, "keyPlaceholder"),
            valuePlaceholderRef: vue.toRef(props, "valuePlaceholder"),
            placeholderRef: vue.toRef(props, "placeholder")
          });
          const rtlEnabledRef = useRtl("DynamicInput", mergedRtlRef, mergedClsPrefixRef);
          const cssVarsRef = vue.computed(() => {
            const {
              self: {
                actionMargin,
                actionMarginRtl
              }
            } = themeRef.value;
            return {
              "--action-margin": actionMargin,
              "--action-margin-rtl": actionMarginRtl
            };
          });
          const themeClassHandle = inlineThemeDisabled ? useThemeClass("dynamic-input", void 0, cssVarsRef, props) : void 0;
          return {
            locale: useLocale("DynamicInput").localeRef,
            rtlEnabled: rtlEnabledRef,
            buttonSize: buttonSizeRef,
            mergedClsPrefix: mergedClsPrefixRef,
            NFormItem: NFormItem2,
            uncontrolledValue: uncontrolledValueRef,
            mergedValue: mergedValueRef,
            insertionDisabled: insertionDisabledRef,
            removeDisabled: removeDisabledRef,
            handleCreateClick,
            ensureKey,
            handleValueChange,
            remove,
            move: move2,
            createItem,
            mergedTheme: themeRef,
            cssVars: inlineThemeDisabled ? void 0 : cssVarsRef,
            themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
            onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
          };
        },
        render() {
          const {
            $slots,
            itemClass,
            buttonSize,
            mergedClsPrefix,
            mergedValue,
            locale: locale2,
            mergedTheme,
            keyField,
            itemStyle,
            preset,
            showSortButton,
            NFormItem: NFormItem2,
            ensureKey,
            handleValueChange,
            remove,
            createItem,
            move: move2,
            onRender,
            disabled
          } = this;
          onRender === null || onRender === void 0 ? void 0 : onRender();
          return vue.h("div", {
            class: [`${mergedClsPrefix}-dynamic-input`, this.rtlEnabled && `${mergedClsPrefix}-dynamic-input--rtl`, this.themeClass],
            style: this.cssVars
          }, !Array.isArray(mergedValue) || mergedValue.length === 0 ? vue.h(Button, Object.assign({
            block: true,
            ghost: true,
            dashed: true,
            size: buttonSize
          }, this.createButtonProps, {
            disabled: this.insertionDisabled || disabled,
            theme: mergedTheme.peers.Button,
            themeOverrides: mergedTheme.peerOverrides.Button,
            onClick: this.handleCreateClick
          }), {
            default: () => resolveSlot($slots["create-button-default"], () => [locale2.create]),
            icon: () => resolveSlot($slots["create-button-icon"], () => [vue.h(NBaseIcon, {
              clsPrefix: mergedClsPrefix
            }, {
              default: () => vue.h(AddIcon, null)
            })])
          }) : mergedValue.map((_, index) => vue.h("div", {
            key: keyField ? _[keyField] : ensureKey(_, index),
            "data-key": keyField ? _[keyField] : ensureKey(_, index),
            class: [`${mergedClsPrefix}-dynamic-input-item`, itemClass],
            style: itemStyle
          }, resolveSlotWithProps($slots.default, {
            value: mergedValue[index],
            index
          }, () => {
            return [preset === "input" ? vue.h(NDynamicInputInputPreset, {
              disabled,
              clsPrefix: mergedClsPrefix,
              value: mergedValue[index],
              parentPath: NFormItem2 ? NFormItem2.path.value : void 0,
              path: (NFormItem2 === null || NFormItem2 === void 0 ? void 0 : NFormItem2.path.value) ? `${NFormItem2.path.value}[${index}]` : void 0,
              onUpdateValue: (v) => {
                handleValueChange(index, v);
              }
            }) : preset === "pair" ? vue.h(NDynamicInputPairPreset, {
              disabled,
              clsPrefix: mergedClsPrefix,
              value: mergedValue[index],
              parentPath: NFormItem2 ? NFormItem2.path.value : void 0,
              path: (NFormItem2 === null || NFormItem2 === void 0 ? void 0 : NFormItem2.path.value) ? `${NFormItem2.path.value}[${index}]` : void 0,
              onUpdateValue: (v) => {
                handleValueChange(index, v);
              }
            }) : null];
          }), resolveSlotWithProps($slots.action, {
            value: mergedValue[index],
            index,
            create: createItem,
            remove,
            move: move2
          }, () => [vue.h("div", {
            class: `${mergedClsPrefix}-dynamic-input-item__action`
          }, vue.h(NButtonGroup, {
            size: buttonSize
          }, {
            default: () => [vue.h(Button, {
              disabled: this.removeDisabled || disabled,
              theme: mergedTheme.peers.Button,
              themeOverrides: mergedTheme.peerOverrides.Button,
              circle: true,
              onClick: () => {
                remove(index);
              }
            }, {
              icon: () => vue.h(NBaseIcon, {
                clsPrefix: mergedClsPrefix
              }, {
                default: () => vue.h(RemoveIcon, null)
              })
            }), vue.h(Button, {
              disabled: this.insertionDisabled || disabled,
              circle: true,
              theme: mergedTheme.peers.Button,
              themeOverrides: mergedTheme.peerOverrides.Button,
              onClick: () => {
                createItem(index);
              }
            }, {
              icon: () => vue.h(NBaseIcon, {
                clsPrefix: mergedClsPrefix
              }, {
                default: () => vue.h(AddIcon, null)
              })
            }), showSortButton ? vue.h(Button, {
              disabled: index === 0 || disabled,
              circle: true,
              theme: mergedTheme.peers.Button,
              themeOverrides: mergedTheme.peerOverrides.Button,
              onClick: () => {
                move2("up", index);
              }
            }, {
              icon: () => vue.h(NBaseIcon, {
                clsPrefix: mergedClsPrefix
              }, {
                default: () => vue.h(ArrowUpIcon, null)
              })
            }) : null, showSortButton ? vue.h(Button, {
              disabled: index === mergedValue.length - 1 || disabled,
              circle: true,
              theme: mergedTheme.peers.Button,
              themeOverrides: mergedTheme.peerOverrides.Button,
              onClick: () => {
                move2("down", index);
              }
            }, {
              icon: () => vue.h(NBaseIcon, {
                clsPrefix: mergedClsPrefix
              }, {
                default: () => vue.h(ArrowDownIcon, null)
              })
            }) : null]
          }))]))));
        }
      });
      const commonVars$5 = {
        gapSmall: "4px 8px",
        gapMedium: "8px 12px",
        gapLarge: "12px 16px"
      };
      const spaceDark = {
        name: "Space",
        self() {
          return commonVars$5;
        }
      };
      function self$F() {
        return commonVars$5;
      }
      const spaceLight = {
        name: "Space",
        self: self$F
      };
      let supportFlexGap;
      function ensureSupportFlexGap() {
        if (!isBrowser$2) return true;
        if (supportFlexGap === void 0) {
          const flex = document.createElement("div");
          flex.style.display = "flex";
          flex.style.flexDirection = "column";
          flex.style.rowGap = "1px";
          flex.appendChild(document.createElement("div"));
          flex.appendChild(document.createElement("div"));
          document.body.appendChild(flex);
          const isSupported = flex.scrollHeight === 1;
          document.body.removeChild(flex);
          return supportFlexGap = isSupported;
        }
        return supportFlexGap;
      }
      const spaceProps = Object.assign(Object.assign({}, useTheme.props), {
        align: String,
        justify: {
          type: String,
          default: "start"
        },
        inline: Boolean,
        vertical: Boolean,
        reverse: Boolean,
        size: {
          type: [String, Number, Array],
          default: "medium"
        },
        wrapItem: {
          type: Boolean,
          default: true
        },
        itemClass: String,
        itemStyle: [String, Object],
        wrap: {
          type: Boolean,
          default: true
        },
        // internal
        internalUseGap: {
          type: Boolean,
          default: void 0
        }
      });
      const NSpace = vue.defineComponent({
        name: "Space",
        props: spaceProps,
        setup(props) {
          const {
            mergedClsPrefixRef,
            mergedRtlRef
          } = useConfig(props);
          const themeRef = useTheme("Space", "-space", void 0, spaceLight, props, mergedClsPrefixRef);
          const rtlEnabledRef = useRtl("Space", mergedRtlRef, mergedClsPrefixRef);
          return {
            useGap: ensureSupportFlexGap(),
            rtlEnabled: rtlEnabledRef,
            mergedClsPrefix: mergedClsPrefixRef,
            margin: vue.computed(() => {
              const {
                size: size2
              } = props;
              if (Array.isArray(size2)) {
                return {
                  horizontal: size2[0],
                  vertical: size2[1]
                };
              }
              if (typeof size2 === "number") {
                return {
                  horizontal: size2,
                  vertical: size2
                };
              }
              const {
                self: {
                  [createKey("gap", size2)]: gap
                }
              } = themeRef.value;
              const {
                row,
                col
              } = getGap(gap);
              return {
                horizontal: depx(col),
                vertical: depx(row)
              };
            })
          };
        },
        render() {
          const {
            vertical,
            reverse,
            align,
            inline,
            justify,
            itemClass,
            itemStyle,
            margin,
            wrap,
            mergedClsPrefix,
            rtlEnabled,
            useGap,
            wrapItem,
            internalUseGap
          } = this;
          const children = flatten$2(getSlot$1(this), false);
          if (!children.length) return null;
          const horizontalMargin = `${margin.horizontal}px`;
          const semiHorizontalMargin = `${margin.horizontal / 2}px`;
          const verticalMargin = `${margin.vertical}px`;
          const semiVerticalMargin = `${margin.vertical / 2}px`;
          const lastIndex = children.length - 1;
          const isJustifySpace = justify.startsWith("space-");
          return vue.h("div", {
            role: "none",
            class: [`${mergedClsPrefix}-space`, rtlEnabled && `${mergedClsPrefix}-space--rtl`],
            style: {
              display: inline ? "inline-flex" : "flex",
              flexDirection: (() => {
                if (vertical && !reverse) return "column";
                if (vertical && reverse) return "column-reverse";
                if (!vertical && reverse) return "row-reverse";
                else return "row";
              })(),
              justifyContent: ["start", "end"].includes(justify) ? `flex-${justify}` : justify,
              flexWrap: !wrap || vertical ? "nowrap" : "wrap",
              marginTop: useGap || vertical ? "" : `-${semiVerticalMargin}`,
              marginBottom: useGap || vertical ? "" : `-${semiVerticalMargin}`,
              alignItems: align,
              gap: useGap ? `${margin.vertical}px ${margin.horizontal}px` : ""
            }
          }, !wrapItem && (useGap || internalUseGap) ? children : children.map((child, index) => child.type === vue.Comment ? child : vue.h("div", {
            role: "none",
            class: itemClass,
            style: [itemStyle, {
              maxWidth: "100%"
            }, useGap ? "" : vertical ? {
              marginBottom: index !== lastIndex ? verticalMargin : ""
            } : rtlEnabled ? {
              marginLeft: isJustifySpace ? justify === "space-between" && index === lastIndex ? "" : semiHorizontalMargin : index !== lastIndex ? horizontalMargin : "",
              marginRight: isJustifySpace ? justify === "space-between" && index === 0 ? "" : semiHorizontalMargin : "",
              paddingTop: semiVerticalMargin,
              paddingBottom: semiVerticalMargin
            } : {
              marginRight: isJustifySpace ? justify === "space-between" && index === lastIndex ? "" : semiHorizontalMargin : index !== lastIndex ? horizontalMargin : "",
              marginLeft: isJustifySpace ? justify === "space-between" && index === 0 ? "" : semiHorizontalMargin : "",
              paddingTop: semiVerticalMargin,
              paddingBottom: semiVerticalMargin
            }]
          }, child)));
        }
      });
      const dynamicTagsDark = {
        name: "DynamicTags",
        common: derived$1,
        peers: {
          Input: inputDark,
          Button: buttonDark,
          Tag: tagDark,
          Space: spaceDark
        },
        self() {
          return {
            inputWidth: "64px"
          };
        }
      };
      const dynamicTagsLight = createTheme({
        name: "DynamicTags",
        common: derived,
        peers: {
          Input: inputLight,
          Button: buttonLight,
          Tag: tagLight,
          Space: spaceLight
        },
        self() {
          return {
            inputWidth: "64px"
          };
        }
      });
      const elementDark = {
        name: "Element",
        common: derived$1
      };
      const elementLight = {
        name: "Element",
        common: derived
      };
      const commonVars$4 = {
        gapSmall: "4px 8px",
        gapMedium: "8px 12px",
        gapLarge: "12px 16px"
      };
      const flexDark = {
        name: "Flex",
        self() {
          return commonVars$4;
        }
      };
      function self$E() {
        return commonVars$4;
      }
      const flexLight = {
        name: "Flex",
        self: self$E
      };
      const commonVariables$5 = {
        feedbackPadding: "4px 0 0 2px",
        feedbackHeightSmall: "24px",
        feedbackHeightMedium: "24px",
        feedbackHeightLarge: "26px",
        feedbackFontSizeSmall: "13px",
        feedbackFontSizeMedium: "14px",
        feedbackFontSizeLarge: "14px",
        labelFontSizeLeftSmall: "14px",
        labelFontSizeLeftMedium: "14px",
        labelFontSizeLeftLarge: "15px",
        labelFontSizeTopSmall: "13px",
        labelFontSizeTopMedium: "14px",
        labelFontSizeTopLarge: "14px",
        labelHeightSmall: "24px",
        labelHeightMedium: "26px",
        labelHeightLarge: "28px",
        labelPaddingVertical: "0 0 6px 2px",
        labelPaddingHorizontal: "0 12px 0 0",
        labelTextAlignVertical: "left",
        labelTextAlignHorizontal: "right",
        labelFontWeight: "400"
      };
      function self$D(vars) {
        const {
          heightSmall,
          heightMedium,
          heightLarge,
          textColor1,
          errorColor,
          warningColor,
          lineHeight: lineHeight2,
          textColor3
        } = vars;
        return Object.assign(Object.assign({}, commonVariables$5), {
          blankHeightSmall: heightSmall,
          blankHeightMedium: heightMedium,
          blankHeightLarge: heightLarge,
          lineHeight: lineHeight2,
          labelTextColor: textColor1,
          asteriskColor: errorColor,
          feedbackTextColorError: errorColor,
          feedbackTextColorWarning: warningColor,
          feedbackTextColor: textColor3
        });
      }
      const formLight = {
        name: "Form",
        common: derived,
        self: self$D
      };
      const formItemDark = {
        name: "Form",
        common: derived$1,
        self: self$D
      };
      const style$4 = cB("form", [cM("inline", `
 width: 100%;
 display: inline-flex;
 align-items: flex-start;
 align-content: space-around;
 `, [cB("form-item", {
        width: "auto",
        marginRight: "18px"
      }, [c$1("&:last-child", {
        marginRight: 0
      })])])]);
      const formInjectionKey = createInjectionKey("n-form");
      const formItemInstsInjectionKey = createInjectionKey("n-form-item-insts");
      var __awaiter$1 = function(thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
          });
        }
        return new (P || (P = Promise))(function(resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      const formProps = Object.assign(Object.assign({}, useTheme.props), {
        inline: Boolean,
        labelWidth: [Number, String],
        labelAlign: String,
        labelPlacement: {
          type: String,
          default: "top"
        },
        model: {
          type: Object,
          default: () => {
          }
        },
        rules: Object,
        disabled: Boolean,
        size: String,
        showRequireMark: {
          type: Boolean,
          default: void 0
        },
        requireMarkPlacement: String,
        showFeedback: {
          type: Boolean,
          default: true
        },
        onSubmit: {
          type: Function,
          default: (e) => {
            e.preventDefault();
          }
        },
        showLabel: {
          type: Boolean,
          default: void 0
        },
        validateMessages: Object
      });
      const NForm = vue.defineComponent({
        name: "Form",
        props: formProps,
        setup(props) {
          const {
            mergedClsPrefixRef
          } = useConfig(props);
          useTheme("Form", "-form", style$4, formLight, props, mergedClsPrefixRef);
          const formItems = {};
          const maxChildLabelWidthRef = vue.ref(void 0);
          const deriveMaxChildLabelWidth = (currentWidth) => {
            const currentMaxChildLabelWidth = maxChildLabelWidthRef.value;
            if (currentMaxChildLabelWidth === void 0 || currentWidth >= currentMaxChildLabelWidth) {
              maxChildLabelWidthRef.value = currentWidth;
            }
          };
          function validate(validateCallback_1) {
            return __awaiter$1(this, arguments, void 0, function* (validateCallback, shouldRuleBeApplied = () => true) {
              return yield new Promise((resolve, reject) => {
                const formItemValidationPromises = [];
                for (const key of keysOf(formItems)) {
                  const formItemInstances = formItems[key];
                  for (const formItemInstance of formItemInstances) {
                    if (formItemInstance.path) {
                      formItemValidationPromises.push(formItemInstance.internalValidate(null, shouldRuleBeApplied));
                    }
                  }
                }
                void Promise.all(formItemValidationPromises).then((results) => {
                  const formInvalid = results.some((result) => !result.valid);
                  const errors = [];
                  const warnings = [];
                  results.forEach((result) => {
                    var _a, _b;
                    if ((_a = result.errors) === null || _a === void 0 ? void 0 : _a.length) {
                      errors.push(result.errors);
                    }
                    if ((_b = result.warnings) === null || _b === void 0 ? void 0 : _b.length) {
                      warnings.push(result.warnings);
                    }
                  });
                  if (validateCallback) {
                    validateCallback(errors.length ? errors : void 0, {
                      warnings: warnings.length ? warnings : void 0
                    });
                  }
                  if (formInvalid) {
                    reject(errors.length ? errors : void 0);
                  } else {
                    resolve({
                      warnings: warnings.length ? warnings : void 0
                    });
                  }
                });
              });
            });
          }
          function restoreValidation() {
            for (const key of keysOf(formItems)) {
              const formItemInstances = formItems[key];
              for (const formItemInstance of formItemInstances) {
                formItemInstance.restoreValidation();
              }
            }
          }
          vue.provide(formInjectionKey, {
            props,
            maxChildLabelWidthRef,
            deriveMaxChildLabelWidth
          });
          vue.provide(formItemInstsInjectionKey, {
            formItems
          });
          const formExposedMethod = {
            validate,
            restoreValidation
          };
          return Object.assign(formExposedMethod, {
            mergedClsPrefix: mergedClsPrefixRef
          });
        },
        render() {
          const {
            mergedClsPrefix
          } = this;
          return vue.h("form", {
            class: [`${mergedClsPrefix}-form`, this.inline && `${mergedClsPrefix}-form--inline`],
            onSubmit: this.onSubmit
          }, this.$slots);
        }
      });
      var define_process_env_default = {};
      function _extends() {
        _extends = Object.assign ? Object.assign.bind() : function(target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }
          return target;
        };
        return _extends.apply(this, arguments);
      }
      function _inheritsLoose(subClass, superClass) {
        subClass.prototype = Object.create(superClass.prototype);
        subClass.prototype.constructor = subClass;
        _setPrototypeOf(subClass, superClass);
      }
      function _getPrototypeOf(o) {
        _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o2) {
          return o2.__proto__ || Object.getPrototypeOf(o2);
        };
        return _getPrototypeOf(o);
      }
      function _setPrototypeOf(o, p) {
        _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
          o2.__proto__ = p2;
          return o2;
        };
        return _setPrototypeOf(o, p);
      }
      function _isNativeReflectConstruct() {
        if (typeof Reflect === "undefined" || !Reflect.construct) return false;
        if (Reflect.construct.sham) return false;
        if (typeof Proxy === "function") return true;
        try {
          Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
          return true;
        } catch (e) {
          return false;
        }
      }
      function _construct(Parent, args, Class) {
        if (_isNativeReflectConstruct()) {
          _construct = Reflect.construct.bind();
        } else {
          _construct = function _construct2(Parent2, args2, Class2) {
            var a = [null];
            a.push.apply(a, args2);
            var Constructor = Function.bind.apply(Parent2, a);
            var instance = new Constructor();
            if (Class2) _setPrototypeOf(instance, Class2.prototype);
            return instance;
          };
        }
        return _construct.apply(null, arguments);
      }
      function _isNativeFunction(fn) {
        return Function.toString.call(fn).indexOf("[native code]") !== -1;
      }
      function _wrapNativeSuper(Class) {
        var _cache = typeof Map === "function" ? /* @__PURE__ */ new Map() : void 0;
        _wrapNativeSuper = function _wrapNativeSuper2(Class2) {
          if (Class2 === null || !_isNativeFunction(Class2)) return Class2;
          if (typeof Class2 !== "function") {
            throw new TypeError("Super expression must either be null or a function");
          }
          if (typeof _cache !== "undefined") {
            if (_cache.has(Class2)) return _cache.get(Class2);
            _cache.set(Class2, Wrapper2);
          }
          function Wrapper2() {
            return _construct(Class2, arguments, _getPrototypeOf(this).constructor);
          }
          Wrapper2.prototype = Object.create(Class2.prototype, {
            constructor: {
              value: Wrapper2,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
          return _setPrototypeOf(Wrapper2, Class2);
        };
        return _wrapNativeSuper(Class);
      }
      var formatRegExp = /%[sdj%]/g;
      var warning = function warning2() {
      };
      if (typeof process !== "undefined" && define_process_env_default && false) {
        warning = function warning3(type4, errors) {
          if (typeof console !== "undefined" && console.warn && typeof ASYNC_VALIDATOR_NO_WARNING === "undefined") {
            if (errors.every(function(e) {
              return typeof e === "string";
            })) {
              console.warn(type4, errors);
            }
          }
        };
      }
      function convertFieldsError(errors) {
        if (!errors || !errors.length) return null;
        var fields = {};
        errors.forEach(function(error) {
          var field = error.field;
          fields[field] = fields[field] || [];
          fields[field].push(error);
        });
        return fields;
      }
      function format(template) {
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }
        var i = 0;
        var len2 = args.length;
        if (typeof template === "function") {
          return template.apply(null, args);
        }
        if (typeof template === "string") {
          var str = template.replace(formatRegExp, function(x) {
            if (x === "%%") {
              return "%";
            }
            if (i >= len2) {
              return x;
            }
            switch (x) {
              case "%s":
                return String(args[i++]);
              case "%d":
                return Number(args[i++]);
              case "%j":
                try {
                  return JSON.stringify(args[i++]);
                } catch (_) {
                  return "[Circular]";
                }
                break;
              default:
                return x;
            }
          });
          return str;
        }
        return template;
      }
      function isNativeStringType(type4) {
        return type4 === "string" || type4 === "url" || type4 === "hex" || type4 === "email" || type4 === "date" || type4 === "pattern";
      }
      function isEmptyValue(value, type4) {
        if (value === void 0 || value === null) {
          return true;
        }
        if (type4 === "array" && Array.isArray(value) && !value.length) {
          return true;
        }
        if (isNativeStringType(type4) && typeof value === "string" && !value) {
          return true;
        }
        return false;
      }
      function asyncParallelArray(arr, func, callback) {
        var results = [];
        var total = 0;
        var arrLength = arr.length;
        function count(errors) {
          results.push.apply(results, errors || []);
          total++;
          if (total === arrLength) {
            callback(results);
          }
        }
        arr.forEach(function(a) {
          func(a, count);
        });
      }
      function asyncSerialArray(arr, func, callback) {
        var index = 0;
        var arrLength = arr.length;
        function next(errors) {
          if (errors && errors.length) {
            callback(errors);
            return;
          }
          var original = index;
          index = index + 1;
          if (original < arrLength) {
            func(arr[original], next);
          } else {
            callback([]);
          }
        }
        next([]);
      }
      function flattenObjArr(objArr) {
        var ret = [];
        Object.keys(objArr).forEach(function(k) {
          ret.push.apply(ret, objArr[k] || []);
        });
        return ret;
      }
      var AsyncValidationError = /* @__PURE__ */ function(_Error) {
        _inheritsLoose(AsyncValidationError2, _Error);
        function AsyncValidationError2(errors, fields) {
          var _this;
          _this = _Error.call(this, "Async Validation Error") || this;
          _this.errors = errors;
          _this.fields = fields;
          return _this;
        }
        return AsyncValidationError2;
      }(/* @__PURE__ */ _wrapNativeSuper(Error));
      function asyncMap(objArr, option, func, callback, source) {
        if (option.first) {
          var _pending = new Promise(function(resolve, reject) {
            var next = function next2(errors) {
              callback(errors);
              return errors.length ? reject(new AsyncValidationError(errors, convertFieldsError(errors))) : resolve(source);
            };
            var flattenArr = flattenObjArr(objArr);
            asyncSerialArray(flattenArr, func, next);
          });
          _pending["catch"](function(e) {
            return e;
          });
          return _pending;
        }
        var firstFields = option.firstFields === true ? Object.keys(objArr) : option.firstFields || [];
        var objArrKeys = Object.keys(objArr);
        var objArrLength = objArrKeys.length;
        var total = 0;
        var results = [];
        var pending = new Promise(function(resolve, reject) {
          var next = function next2(errors) {
            results.push.apply(results, errors);
            total++;
            if (total === objArrLength) {
              callback(results);
              return results.length ? reject(new AsyncValidationError(results, convertFieldsError(results))) : resolve(source);
            }
          };
          if (!objArrKeys.length) {
            callback(results);
            resolve(source);
          }
          objArrKeys.forEach(function(key) {
            var arr = objArr[key];
            if (firstFields.indexOf(key) !== -1) {
              asyncSerialArray(arr, func, next);
            } else {
              asyncParallelArray(arr, func, next);
            }
          });
        });
        pending["catch"](function(e) {
          return e;
        });
        return pending;
      }
      function isErrorObj(obj) {
        return !!(obj && obj.message !== void 0);
      }
      function getValue(value, path) {
        var v = value;
        for (var i = 0; i < path.length; i++) {
          if (v == void 0) {
            return v;
          }
          v = v[path[i]];
        }
        return v;
      }
      function complementError(rule, source) {
        return function(oe) {
          var fieldValue;
          if (rule.fullFields) {
            fieldValue = getValue(source, rule.fullFields);
          } else {
            fieldValue = source[oe.field || rule.fullField];
          }
          if (isErrorObj(oe)) {
            oe.field = oe.field || rule.fullField;
            oe.fieldValue = fieldValue;
            return oe;
          }
          return {
            message: typeof oe === "function" ? oe() : oe,
            fieldValue,
            field: oe.field || rule.fullField
          };
        };
      }
      function deepMerge(target, source) {
        if (source) {
          for (var s in source) {
            if (source.hasOwnProperty(s)) {
              var value = source[s];
              if (typeof value === "object" && typeof target[s] === "object") {
                target[s] = _extends({}, target[s], value);
              } else {
                target[s] = value;
              }
            }
          }
        }
        return target;
      }
      var required$1 = function required(rule, value, source, errors, options, type4) {
        if (rule.required && (!source.hasOwnProperty(rule.field) || isEmptyValue(value, type4 || rule.type))) {
          errors.push(format(options.messages.required, rule.fullField));
        }
      };
      var whitespace = function whitespace2(rule, value, source, errors, options) {
        if (/^\s+$/.test(value) || value === "") {
          errors.push(format(options.messages.whitespace, rule.fullField));
        }
      };
      var urlReg;
      var getUrlRegex = function() {
        if (urlReg) {
          return urlReg;
        }
        var word = "[a-fA-F\\d:]";
        var b = function b2(options) {
          return options && options.includeBoundaries ? "(?:(?<=\\s|^)(?=" + word + ")|(?<=" + word + ")(?=\\s|$))" : "";
        };
        var v4 = "(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}";
        var v6seg = "[a-fA-F\\d]{1,4}";
        var v6 = ("\n(?:\n(?:" + v6seg + ":){7}(?:" + v6seg + "|:)|                                    // 1:2:3:4:5:6:7::  1:2:3:4:5:6:7:8\n(?:" + v6seg + ":){6}(?:" + v4 + "|:" + v6seg + "|:)|                             // 1:2:3:4:5:6::    1:2:3:4:5:6::8   1:2:3:4:5:6::8  1:2:3:4:5:6::1.2.3.4\n(?:" + v6seg + ":){5}(?::" + v4 + "|(?::" + v6seg + "){1,2}|:)|                   // 1:2:3:4:5::      1:2:3:4:5::7:8   1:2:3:4:5::8    1:2:3:4:5::7:1.2.3.4\n(?:" + v6seg + ":){4}(?:(?::" + v6seg + "){0,1}:" + v4 + "|(?::" + v6seg + "){1,3}|:)| // 1:2:3:4::        1:2:3:4::6:7:8   1:2:3:4::8      1:2:3:4::6:7:1.2.3.4\n(?:" + v6seg + ":){3}(?:(?::" + v6seg + "){0,2}:" + v4 + "|(?::" + v6seg + "){1,4}|:)| // 1:2:3::          1:2:3::5:6:7:8   1:2:3::8        1:2:3::5:6:7:1.2.3.4\n(?:" + v6seg + ":){2}(?:(?::" + v6seg + "){0,3}:" + v4 + "|(?::" + v6seg + "){1,5}|:)| // 1:2::            1:2::4:5:6:7:8   1:2::8          1:2::4:5:6:7:1.2.3.4\n(?:" + v6seg + ":){1}(?:(?::" + v6seg + "){0,4}:" + v4 + "|(?::" + v6seg + "){1,6}|:)| // 1::              1::3:4:5:6:7:8   1::8            1::3:4:5:6:7:1.2.3.4\n(?::(?:(?::" + v6seg + "){0,5}:" + v4 + "|(?::" + v6seg + "){1,7}|:))             // ::2:3:4:5:6:7:8  ::2:3:4:5:6:7:8  ::8             ::1.2.3.4\n)(?:%[0-9a-zA-Z]{1,})?                                             // %eth0            %1\n").replace(/\s*\/\/.*$/gm, "").replace(/\n/g, "").trim();
        var v46Exact = new RegExp("(?:^" + v4 + "$)|(?:^" + v6 + "$)");
        var v4exact = new RegExp("^" + v4 + "$");
        var v6exact = new RegExp("^" + v6 + "$");
        var ip = function ip2(options) {
          return options && options.exact ? v46Exact : new RegExp("(?:" + b(options) + v4 + b(options) + ")|(?:" + b(options) + v6 + b(options) + ")", "g");
        };
        ip.v4 = function(options) {
          return options && options.exact ? v4exact : new RegExp("" + b(options) + v4 + b(options), "g");
        };
        ip.v6 = function(options) {
          return options && options.exact ? v6exact : new RegExp("" + b(options) + v6 + b(options), "g");
        };
        var protocol = "(?:(?:[a-z]+:)?//)";
        var auth = "(?:\\S+(?::\\S*)?@)?";
        var ipv4 = ip.v4().source;
        var ipv6 = ip.v6().source;
        var host = "(?:(?:[a-z\\u00a1-\\uffff0-9][-_]*)*[a-z\\u00a1-\\uffff0-9]+)";
        var domain = "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*";
        var tld = "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))";
        var port = "(?::\\d{2,5})?";
        var path = '(?:[/?#][^\\s"]*)?';
        var regex = "(?:" + protocol + "|www\\.)" + auth + "(?:localhost|" + ipv4 + "|" + ipv6 + "|" + host + domain + tld + ")" + port + path;
        urlReg = new RegExp("(?:^" + regex + "$)", "i");
        return urlReg;
      };
      var pattern$2 = {
        // http://emailregex.com/
        email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+\.)+[a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}))$/,
        // url: new RegExp(
        //   '^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$',
        //   'i',
        // ),
        hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i
      };
      var types = {
        integer: function integer(value) {
          return types.number(value) && parseInt(value, 10) === value;
        },
        "float": function float2(value) {
          return types.number(value) && !types.integer(value);
        },
        array: function array(value) {
          return Array.isArray(value);
        },
        regexp: function regexp(value) {
          if (value instanceof RegExp) {
            return true;
          }
          try {
            return !!new RegExp(value);
          } catch (e) {
            return false;
          }
        },
        date: function date(value) {
          return typeof value.getTime === "function" && typeof value.getMonth === "function" && typeof value.getYear === "function" && !isNaN(value.getTime());
        },
        number: function number(value) {
          if (isNaN(value)) {
            return false;
          }
          return typeof value === "number";
        },
        object: function object(value) {
          return typeof value === "object" && !types.array(value);
        },
        method: function method(value) {
          return typeof value === "function";
        },
        email: function email(value) {
          return typeof value === "string" && value.length <= 320 && !!value.match(pattern$2.email);
        },
        url: function url(value) {
          return typeof value === "string" && value.length <= 2048 && !!value.match(getUrlRegex());
        },
        hex: function hex2(value) {
          return typeof value === "string" && !!value.match(pattern$2.hex);
        }
      };
      var type$1 = function type(rule, value, source, errors, options) {
        if (rule.required && value === void 0) {
          required$1(rule, value, source, errors, options);
          return;
        }
        var custom = ["integer", "float", "array", "regexp", "object", "method", "email", "number", "date", "url", "hex"];
        var ruleType = rule.type;
        if (custom.indexOf(ruleType) > -1) {
          if (!types[ruleType](value)) {
            errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
          }
        } else if (ruleType && typeof value !== rule.type) {
          errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
        }
      };
      var range = function range2(rule, value, source, errors, options) {
        var len2 = typeof rule.len === "number";
        var min = typeof rule.min === "number";
        var max = typeof rule.max === "number";
        var spRegexp = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
        var val = value;
        var key = null;
        var num = typeof value === "number";
        var str = typeof value === "string";
        var arr = Array.isArray(value);
        if (num) {
          key = "number";
        } else if (str) {
          key = "string";
        } else if (arr) {
          key = "array";
        }
        if (!key) {
          return false;
        }
        if (arr) {
          val = value.length;
        }
        if (str) {
          val = value.replace(spRegexp, "_").length;
        }
        if (len2) {
          if (val !== rule.len) {
            errors.push(format(options.messages[key].len, rule.fullField, rule.len));
          }
        } else if (min && !max && val < rule.min) {
          errors.push(format(options.messages[key].min, rule.fullField, rule.min));
        } else if (max && !min && val > rule.max) {
          errors.push(format(options.messages[key].max, rule.fullField, rule.max));
        } else if (min && max && (val < rule.min || val > rule.max)) {
          errors.push(format(options.messages[key].range, rule.fullField, rule.min, rule.max));
        }
      };
      var ENUM$1 = "enum";
      var enumerable$1 = function enumerable(rule, value, source, errors, options) {
        rule[ENUM$1] = Array.isArray(rule[ENUM$1]) ? rule[ENUM$1] : [];
        if (rule[ENUM$1].indexOf(value) === -1) {
          errors.push(format(options.messages[ENUM$1], rule.fullField, rule[ENUM$1].join(", ")));
        }
      };
      var pattern$1 = function pattern(rule, value, source, errors, options) {
        if (rule.pattern) {
          if (rule.pattern instanceof RegExp) {
            rule.pattern.lastIndex = 0;
            if (!rule.pattern.test(value)) {
              errors.push(format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
            }
          } else if (typeof rule.pattern === "string") {
            var _pattern = new RegExp(rule.pattern);
            if (!_pattern.test(value)) {
              errors.push(format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
            }
          }
        }
      };
      var rules = {
        required: required$1,
        whitespace,
        type: type$1,
        range,
        "enum": enumerable$1,
        pattern: pattern$1
      };
      var string = function string2(rule, value, callback, source, options) {
        var errors = [];
        var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
        if (validate) {
          if (isEmptyValue(value, "string") && !rule.required) {
            return callback();
          }
          rules.required(rule, value, source, errors, options, "string");
          if (!isEmptyValue(value, "string")) {
            rules.type(rule, value, source, errors, options);
            rules.range(rule, value, source, errors, options);
            rules.pattern(rule, value, source, errors, options);
            if (rule.whitespace === true) {
              rules.whitespace(rule, value, source, errors, options);
            }
          }
        }
        callback(errors);
      };
      var method2 = function method3(rule, value, callback, source, options) {
        var errors = [];
        var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
        if (validate) {
          if (isEmptyValue(value) && !rule.required) {
            return callback();
          }
          rules.required(rule, value, source, errors, options);
          if (value !== void 0) {
            rules.type(rule, value, source, errors, options);
          }
        }
        callback(errors);
      };
      var number2 = function number3(rule, value, callback, source, options) {
        var errors = [];
        var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
        if (validate) {
          if (value === "") {
            value = void 0;
          }
          if (isEmptyValue(value) && !rule.required) {
            return callback();
          }
          rules.required(rule, value, source, errors, options);
          if (value !== void 0) {
            rules.type(rule, value, source, errors, options);
            rules.range(rule, value, source, errors, options);
          }
        }
        callback(errors);
      };
      var _boolean = function _boolean2(rule, value, callback, source, options) {
        var errors = [];
        var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
        if (validate) {
          if (isEmptyValue(value) && !rule.required) {
            return callback();
          }
          rules.required(rule, value, source, errors, options);
          if (value !== void 0) {
            rules.type(rule, value, source, errors, options);
          }
        }
        callback(errors);
      };
      var regexp2 = function regexp3(rule, value, callback, source, options) {
        var errors = [];
        var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
        if (validate) {
          if (isEmptyValue(value) && !rule.required) {
            return callback();
          }
          rules.required(rule, value, source, errors, options);
          if (!isEmptyValue(value)) {
            rules.type(rule, value, source, errors, options);
          }
        }
        callback(errors);
      };
      var integer2 = function integer3(rule, value, callback, source, options) {
        var errors = [];
        var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
        if (validate) {
          if (isEmptyValue(value) && !rule.required) {
            return callback();
          }
          rules.required(rule, value, source, errors, options);
          if (value !== void 0) {
            rules.type(rule, value, source, errors, options);
            rules.range(rule, value, source, errors, options);
          }
        }
        callback(errors);
      };
      var floatFn = function floatFn2(rule, value, callback, source, options) {
        var errors = [];
        var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
        if (validate) {
          if (isEmptyValue(value) && !rule.required) {
            return callback();
          }
          rules.required(rule, value, source, errors, options);
          if (value !== void 0) {
            rules.type(rule, value, source, errors, options);
            rules.range(rule, value, source, errors, options);
          }
        }
        callback(errors);
      };
      var array2 = function array3(rule, value, callback, source, options) {
        var errors = [];
        var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
        if (validate) {
          if ((value === void 0 || value === null) && !rule.required) {
            return callback();
          }
          rules.required(rule, value, source, errors, options, "array");
          if (value !== void 0 && value !== null) {
            rules.type(rule, value, source, errors, options);
            rules.range(rule, value, source, errors, options);
          }
        }
        callback(errors);
      };
      var object2 = function object3(rule, value, callback, source, options) {
        var errors = [];
        var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
        if (validate) {
          if (isEmptyValue(value) && !rule.required) {
            return callback();
          }
          rules.required(rule, value, source, errors, options);
          if (value !== void 0) {
            rules.type(rule, value, source, errors, options);
          }
        }
        callback(errors);
      };
      var ENUM = "enum";
      var enumerable2 = function enumerable3(rule, value, callback, source, options) {
        var errors = [];
        var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
        if (validate) {
          if (isEmptyValue(value) && !rule.required) {
            return callback();
          }
          rules.required(rule, value, source, errors, options);
          if (value !== void 0) {
            rules[ENUM](rule, value, source, errors, options);
          }
        }
        callback(errors);
      };
      var pattern2 = function pattern3(rule, value, callback, source, options) {
        var errors = [];
        var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
        if (validate) {
          if (isEmptyValue(value, "string") && !rule.required) {
            return callback();
          }
          rules.required(rule, value, source, errors, options);
          if (!isEmptyValue(value, "string")) {
            rules.pattern(rule, value, source, errors, options);
          }
        }
        callback(errors);
      };
      var date2 = function date3(rule, value, callback, source, options) {
        var errors = [];
        var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
        if (validate) {
          if (isEmptyValue(value, "date") && !rule.required) {
            return callback();
          }
          rules.required(rule, value, source, errors, options);
          if (!isEmptyValue(value, "date")) {
            var dateObject;
            if (value instanceof Date) {
              dateObject = value;
            } else {
              dateObject = new Date(value);
            }
            rules.type(rule, dateObject, source, errors, options);
            if (dateObject) {
              rules.range(rule, dateObject.getTime(), source, errors, options);
            }
          }
        }
        callback(errors);
      };
      var required2 = function required3(rule, value, callback, source, options) {
        var errors = [];
        var type4 = Array.isArray(value) ? "array" : typeof value;
        rules.required(rule, value, source, errors, options, type4);
        callback(errors);
      };
      var type2 = function type3(rule, value, callback, source, options) {
        var ruleType = rule.type;
        var errors = [];
        var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
        if (validate) {
          if (isEmptyValue(value, ruleType) && !rule.required) {
            return callback();
          }
          rules.required(rule, value, source, errors, options, ruleType);
          if (!isEmptyValue(value, ruleType)) {
            rules.type(rule, value, source, errors, options);
          }
        }
        callback(errors);
      };
      var any = function any2(rule, value, callback, source, options) {
        var errors = [];
        var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
        if (validate) {
          if (isEmptyValue(value) && !rule.required) {
            return callback();
          }
          rules.required(rule, value, source, errors, options);
        }
        callback(errors);
      };
      var validators = {
        string,
        method: method2,
        number: number2,
        "boolean": _boolean,
        regexp: regexp2,
        integer: integer2,
        "float": floatFn,
        array: array2,
        object: object2,
        "enum": enumerable2,
        pattern: pattern2,
        date: date2,
        url: type2,
        hex: type2,
        email: type2,
        required: required2,
        any
      };
      function newMessages() {
        return {
          "default": "Validation error on field %s",
          required: "%s is required",
          "enum": "%s must be one of %s",
          whitespace: "%s cannot be empty",
          date: {
            format: "%s date %s is invalid for format %s",
            parse: "%s date could not be parsed, %s is invalid ",
            invalid: "%s date %s is invalid"
          },
          types: {
            string: "%s is not a %s",
            method: "%s is not a %s (function)",
            array: "%s is not an %s",
            object: "%s is not an %s",
            number: "%s is not a %s",
            date: "%s is not a %s",
            "boolean": "%s is not a %s",
            integer: "%s is not an %s",
            "float": "%s is not a %s",
            regexp: "%s is not a valid %s",
            email: "%s is not a valid %s",
            url: "%s is not a valid %s",
            hex: "%s is not a valid %s"
          },
          string: {
            len: "%s must be exactly %s characters",
            min: "%s must be at least %s characters",
            max: "%s cannot be longer than %s characters",
            range: "%s must be between %s and %s characters"
          },
          number: {
            len: "%s must equal %s",
            min: "%s cannot be less than %s",
            max: "%s cannot be greater than %s",
            range: "%s must be between %s and %s"
          },
          array: {
            len: "%s must be exactly %s in length",
            min: "%s cannot be less than %s in length",
            max: "%s cannot be greater than %s in length",
            range: "%s must be between %s and %s in length"
          },
          pattern: {
            mismatch: "%s value %s does not match pattern %s"
          },
          clone: function clone() {
            var cloned = JSON.parse(JSON.stringify(this));
            cloned.clone = this.clone;
            return cloned;
          }
        };
      }
      var messages = newMessages();
      var Schema = /* @__PURE__ */ function() {
        function Schema2(descriptor) {
          this.rules = null;
          this._messages = messages;
          this.define(descriptor);
        }
        var _proto = Schema2.prototype;
        _proto.define = function define(rules2) {
          var _this = this;
          if (!rules2) {
            throw new Error("Cannot configure a schema with no rules");
          }
          if (typeof rules2 !== "object" || Array.isArray(rules2)) {
            throw new Error("Rules must be an object");
          }
          this.rules = {};
          Object.keys(rules2).forEach(function(name) {
            var item = rules2[name];
            _this.rules[name] = Array.isArray(item) ? item : [item];
          });
        };
        _proto.messages = function messages2(_messages) {
          if (_messages) {
            this._messages = deepMerge(newMessages(), _messages);
          }
          return this._messages;
        };
        _proto.validate = function validate(source_, o, oc) {
          var _this2 = this;
          if (o === void 0) {
            o = {};
          }
          if (oc === void 0) {
            oc = function oc2() {
            };
          }
          var source = source_;
          var options = o;
          var callback = oc;
          if (typeof options === "function") {
            callback = options;
            options = {};
          }
          if (!this.rules || Object.keys(this.rules).length === 0) {
            if (callback) {
              callback(null, source);
            }
            return Promise.resolve(source);
          }
          function complete(results) {
            var errors = [];
            var fields = {};
            function add(e) {
              if (Array.isArray(e)) {
                var _errors;
                errors = (_errors = errors).concat.apply(_errors, e);
              } else {
                errors.push(e);
              }
            }
            for (var i = 0; i < results.length; i++) {
              add(results[i]);
            }
            if (!errors.length) {
              callback(null, source);
            } else {
              fields = convertFieldsError(errors);
              callback(errors, fields);
            }
          }
          if (options.messages) {
            var messages$1 = this.messages();
            if (messages$1 === messages) {
              messages$1 = newMessages();
            }
            deepMerge(messages$1, options.messages);
            options.messages = messages$1;
          } else {
            options.messages = this.messages();
          }
          var series = {};
          var keys2 = options.keys || Object.keys(this.rules);
          keys2.forEach(function(z) {
            var arr = _this2.rules[z];
            var value = source[z];
            arr.forEach(function(r) {
              var rule = r;
              if (typeof rule.transform === "function") {
                if (source === source_) {
                  source = _extends({}, source);
                }
                value = source[z] = rule.transform(value);
              }
              if (typeof rule === "function") {
                rule = {
                  validator: rule
                };
              } else {
                rule = _extends({}, rule);
              }
              rule.validator = _this2.getValidationMethod(rule);
              if (!rule.validator) {
                return;
              }
              rule.field = z;
              rule.fullField = rule.fullField || z;
              rule.type = _this2.getType(rule);
              series[z] = series[z] || [];
              series[z].push({
                rule,
                value,
                source,
                field: z
              });
            });
          });
          var errorFields = {};
          return asyncMap(series, options, function(data, doIt) {
            var rule = data.rule;
            var deep = (rule.type === "object" || rule.type === "array") && (typeof rule.fields === "object" || typeof rule.defaultField === "object");
            deep = deep && (rule.required || !rule.required && data.value);
            rule.field = data.field;
            function addFullField(key, schema) {
              return _extends({}, schema, {
                fullField: rule.fullField + "." + key,
                fullFields: rule.fullFields ? [].concat(rule.fullFields, [key]) : [key]
              });
            }
            function cb(e) {
              if (e === void 0) {
                e = [];
              }
              var errorList = Array.isArray(e) ? e : [e];
              if (!options.suppressWarning && errorList.length) {
                Schema2.warning("async-validator:", errorList);
              }
              if (errorList.length && rule.message !== void 0) {
                errorList = [].concat(rule.message);
              }
              var filledErrors = errorList.map(complementError(rule, source));
              if (options.first && filledErrors.length) {
                errorFields[rule.field] = 1;
                return doIt(filledErrors);
              }
              if (!deep) {
                doIt(filledErrors);
              } else {
                if (rule.required && !data.value) {
                  if (rule.message !== void 0) {
                    filledErrors = [].concat(rule.message).map(complementError(rule, source));
                  } else if (options.error) {
                    filledErrors = [options.error(rule, format(options.messages.required, rule.field))];
                  }
                  return doIt(filledErrors);
                }
                var fieldsSchema = {};
                if (rule.defaultField) {
                  Object.keys(data.value).map(function(key) {
                    fieldsSchema[key] = rule.defaultField;
                  });
                }
                fieldsSchema = _extends({}, fieldsSchema, data.rule.fields);
                var paredFieldsSchema = {};
                Object.keys(fieldsSchema).forEach(function(field) {
                  var fieldSchema = fieldsSchema[field];
                  var fieldSchemaList = Array.isArray(fieldSchema) ? fieldSchema : [fieldSchema];
                  paredFieldsSchema[field] = fieldSchemaList.map(addFullField.bind(null, field));
                });
                var schema = new Schema2(paredFieldsSchema);
                schema.messages(options.messages);
                if (data.rule.options) {
                  data.rule.options.messages = options.messages;
                  data.rule.options.error = options.error;
                }
                schema.validate(data.value, data.rule.options || options, function(errs) {
                  var finalErrors = [];
                  if (filledErrors && filledErrors.length) {
                    finalErrors.push.apply(finalErrors, filledErrors);
                  }
                  if (errs && errs.length) {
                    finalErrors.push.apply(finalErrors, errs);
                  }
                  doIt(finalErrors.length ? finalErrors : null);
                });
              }
            }
            var res;
            if (rule.asyncValidator) {
              res = rule.asyncValidator(rule, data.value, cb, data.source, options);
            } else if (rule.validator) {
              try {
                res = rule.validator(rule, data.value, cb, data.source, options);
              } catch (error) {
                console.error == null ? void 0 : console.error(error);
                if (!options.suppressValidatorError) {
                  setTimeout(function() {
                    throw error;
                  }, 0);
                }
                cb(error.message);
              }
              if (res === true) {
                cb();
              } else if (res === false) {
                cb(typeof rule.message === "function" ? rule.message(rule.fullField || rule.field) : rule.message || (rule.fullField || rule.field) + " fails");
              } else if (res instanceof Array) {
                cb(res);
              } else if (res instanceof Error) {
                cb(res.message);
              }
            }
            if (res && res.then) {
              res.then(function() {
                return cb();
              }, function(e) {
                return cb(e);
              });
            }
          }, function(results) {
            complete(results);
          }, source);
        };
        _proto.getType = function getType(rule) {
          if (rule.type === void 0 && rule.pattern instanceof RegExp) {
            rule.type = "pattern";
          }
          if (typeof rule.validator !== "function" && rule.type && !validators.hasOwnProperty(rule.type)) {
            throw new Error(format("Unknown rule type %s", rule.type));
          }
          return rule.type || "string";
        };
        _proto.getValidationMethod = function getValidationMethod(rule) {
          if (typeof rule.validator === "function") {
            return rule.validator;
          }
          var keys2 = Object.keys(rule);
          var messageIndex = keys2.indexOf("message");
          if (messageIndex !== -1) {
            keys2.splice(messageIndex, 1);
          }
          if (keys2.length === 1 && keys2[0] === "required") {
            return validators.required;
          }
          return validators[this.getType(rule)] || void 0;
        };
        return Schema2;
      }();
      Schema.register = function register(type4, validator) {
        if (typeof validator !== "function") {
          throw new Error("Cannot register a validator by type, validator is not a function");
        }
        validators[type4] = validator;
      };
      Schema.warning = warning;
      Schema.messages = messages;
      Schema.validators = validators;
      function formItemSize(props) {
        const NForm2 = vue.inject(formInjectionKey, null);
        return {
          mergedSize: vue.computed(() => {
            if (props.size !== void 0) return props.size;
            if ((NForm2 === null || NForm2 === void 0 ? void 0 : NForm2.props.size) !== void 0) return NForm2.props.size;
            return "medium";
          })
        };
      }
      function formItemMisc(props) {
        const NForm2 = vue.inject(formInjectionKey, null);
        const mergedLabelPlacementRef = vue.computed(() => {
          const {
            labelPlacement
          } = props;
          if (labelPlacement !== void 0) return labelPlacement;
          if (NForm2 === null || NForm2 === void 0 ? void 0 : NForm2.props.labelPlacement) return NForm2.props.labelPlacement;
          return "top";
        });
        const isAutoLabelWidthRef = vue.computed(() => {
          return mergedLabelPlacementRef.value === "left" && (props.labelWidth === "auto" || (NForm2 === null || NForm2 === void 0 ? void 0 : NForm2.props.labelWidth) === "auto");
        });
        const mergedLabelWidthRef = vue.computed(() => {
          if (mergedLabelPlacementRef.value === "top") return;
          const {
            labelWidth
          } = props;
          if (labelWidth !== void 0 && labelWidth !== "auto") {
            return formatLength(labelWidth);
          }
          if (isAutoLabelWidthRef.value) {
            const autoComputedWidth = NForm2 === null || NForm2 === void 0 ? void 0 : NForm2.maxChildLabelWidthRef.value;
            if (autoComputedWidth !== void 0) {
              return formatLength(autoComputedWidth);
            } else {
              return void 0;
            }
          }
          if ((NForm2 === null || NForm2 === void 0 ? void 0 : NForm2.props.labelWidth) !== void 0) {
            return formatLength(NForm2.props.labelWidth);
          }
          return void 0;
        });
        const mergedLabelAlignRef = vue.computed(() => {
          const {
            labelAlign
          } = props;
          if (labelAlign) return labelAlign;
          if (NForm2 === null || NForm2 === void 0 ? void 0 : NForm2.props.labelAlign) return NForm2.props.labelAlign;
          return void 0;
        });
        const mergedLabelStyleRef = vue.computed(() => {
          var _a;
          return [(_a = props.labelProps) === null || _a === void 0 ? void 0 : _a.style, props.labelStyle, {
            width: mergedLabelWidthRef.value
          }];
        });
        const mergedShowRequireMarkRef = vue.computed(() => {
          const {
            showRequireMark
          } = props;
          if (showRequireMark !== void 0) return showRequireMark;
          return NForm2 === null || NForm2 === void 0 ? void 0 : NForm2.props.showRequireMark;
        });
        const mergedRequireMarkPlacementRef = vue.computed(() => {
          const {
            requireMarkPlacement
          } = props;
          if (requireMarkPlacement !== void 0) return requireMarkPlacement;
          return (NForm2 === null || NForm2 === void 0 ? void 0 : NForm2.props.requireMarkPlacement) || "right";
        });
        const validationErroredRef = vue.ref(false);
        const validationWarnedRef = vue.ref(false);
        const mergedValidationStatusRef = vue.computed(() => {
          const {
            validationStatus
          } = props;
          if (validationStatus !== void 0) return validationStatus;
          if (validationErroredRef.value) return "error";
          if (validationWarnedRef.value) return "warning";
          return void 0;
        });
        const mergedShowFeedbackRef = vue.computed(() => {
          const {
            showFeedback
          } = props;
          if (showFeedback !== void 0) return showFeedback;
          if ((NForm2 === null || NForm2 === void 0 ? void 0 : NForm2.props.showFeedback) !== void 0) return NForm2.props.showFeedback;
          return true;
        });
        const mergedShowLabelRef = vue.computed(() => {
          const {
            showLabel
          } = props;
          if (showLabel !== void 0) return showLabel;
          if ((NForm2 === null || NForm2 === void 0 ? void 0 : NForm2.props.showLabel) !== void 0) return NForm2.props.showLabel;
          return true;
        });
        return {
          validationErrored: validationErroredRef,
          validationWarned: validationWarnedRef,
          mergedLabelStyle: mergedLabelStyleRef,
          mergedLabelPlacement: mergedLabelPlacementRef,
          mergedLabelAlign: mergedLabelAlignRef,
          mergedShowRequireMark: mergedShowRequireMarkRef,
          mergedRequireMarkPlacement: mergedRequireMarkPlacementRef,
          mergedValidationStatus: mergedValidationStatusRef,
          mergedShowFeedback: mergedShowFeedbackRef,
          mergedShowLabel: mergedShowLabelRef,
          isAutoLabelWidth: isAutoLabelWidthRef
        };
      }
      function formItemRule(props) {
        const NForm2 = vue.inject(formInjectionKey, null);
        const compatibleRulePathRef = vue.computed(() => {
          const {
            rulePath
          } = props;
          if (rulePath !== void 0) return rulePath;
          const {
            path
          } = props;
          if (path !== void 0) return path;
          return void 0;
        });
        const mergedRulesRef = vue.computed(() => {
          const rules2 = [];
          const {
            rule
          } = props;
          if (rule !== void 0) {
            if (Array.isArray(rule)) rules2.push(...rule);
            else rules2.push(rule);
          }
          if (NForm2) {
            const {
              rules: formRules
            } = NForm2.props;
            const {
              value: rulePath
            } = compatibleRulePathRef;
            if (formRules !== void 0 && rulePath !== void 0) {
              const formRule = get(formRules, rulePath);
              if (formRule !== void 0) {
                if (Array.isArray(formRule)) {
                  rules2.push(...formRule);
                } else {
                  rules2.push(formRule);
                }
              }
            }
          }
          return rules2;
        });
        const hasRequiredRuleRef = vue.computed(() => {
          return mergedRulesRef.value.some((rule) => rule.required);
        });
        const mergedRequiredRef = vue.computed(() => {
          return hasRequiredRuleRef.value || props.required;
        });
        return {
          mergedRules: mergedRulesRef,
          mergedRequired: mergedRequiredRef
        };
      }
      const {
        cubicBezierEaseInOut
      } = commonVariables$m;
      function fadeDownTransition({
        name = "fade-down",
        fromOffset = "-4px",
        enterDuration = ".3s",
        leaveDuration = ".3s",
        enterCubicBezier = cubicBezierEaseInOut,
        leaveCubicBezier = cubicBezierEaseInOut
      } = {}) {
        return [c$1(`&.${name}-transition-enter-from, &.${name}-transition-leave-to`, {
          opacity: 0,
          transform: `translateY(${fromOffset})`
        }), c$1(`&.${name}-transition-enter-to, &.${name}-transition-leave-from`, {
          opacity: 1,
          transform: "translateY(0)"
        }), c$1(`&.${name}-transition-leave-active`, {
          transition: `opacity ${leaveDuration} ${leaveCubicBezier}, transform ${leaveDuration} ${leaveCubicBezier}`
        }), c$1(`&.${name}-transition-enter-active`, {
          transition: `opacity ${enterDuration} ${enterCubicBezier}, transform ${enterDuration} ${enterCubicBezier}`
        })];
      }
      const style$3 = cB("form-item", `
 display: grid;
 line-height: var(--n-line-height);
`, [cB("form-item-label", `
 grid-area: label;
 align-items: center;
 line-height: 1.25;
 text-align: var(--n-label-text-align);
 font-size: var(--n-label-font-size);
 min-height: var(--n-label-height);
 padding: var(--n-label-padding);
 color: var(--n-label-text-color);
 transition: color .3s var(--n-bezier);
 box-sizing: border-box;
 font-weight: var(--n-label-font-weight);
 `, [cE("asterisk", `
 white-space: nowrap;
 user-select: none;
 -webkit-user-select: none;
 color: var(--n-asterisk-color);
 transition: color .3s var(--n-bezier);
 `), cE("asterisk-placeholder", `
 grid-area: mark;
 user-select: none;
 -webkit-user-select: none;
 visibility: hidden; 
 `)]), cB("form-item-blank", `
 grid-area: blank;
 min-height: var(--n-blank-height);
 `), cM("auto-label-width", [cB("form-item-label", "white-space: nowrap;")]), cM("left-labelled", `
 grid-template-areas:
 "label blank"
 "label feedback";
 grid-template-columns: auto minmax(0, 1fr);
 grid-template-rows: auto 1fr;
 align-items: flex-start;
 `, [cB("form-item-label", `
 display: grid;
 grid-template-columns: 1fr auto;
 min-height: var(--n-blank-height);
 height: auto;
 box-sizing: border-box;
 flex-shrink: 0;
 flex-grow: 0;
 `, [cM("reverse-columns-space", `
 grid-template-columns: auto 1fr;
 `), cM("left-mark", `
 grid-template-areas:
 "mark text"
 ". text";
 `), cM("right-mark", `
 grid-template-areas: 
 "text mark"
 "text .";
 `), cM("right-hanging-mark", `
 grid-template-areas: 
 "text mark"
 "text .";
 `), cE("text", `
 grid-area: text; 
 `), cE("asterisk", `
 grid-area: mark; 
 align-self: end;
 `)])]), cM("top-labelled", `
 grid-template-areas:
 "label"
 "blank"
 "feedback";
 grid-template-rows: minmax(var(--n-label-height), auto) 1fr;
 grid-template-columns: minmax(0, 100%);
 `, [cM("no-label", `
 grid-template-areas:
 "blank"
 "feedback";
 grid-template-rows: 1fr;
 `), cB("form-item-label", `
 display: flex;
 align-items: flex-start;
 justify-content: var(--n-label-text-align);
 `)]), cB("form-item-blank", `
 box-sizing: border-box;
 display: flex;
 align-items: center;
 position: relative;
 `), cB("form-item-feedback-wrapper", `
 grid-area: feedback;
 box-sizing: border-box;
 min-height: var(--n-feedback-height);
 font-size: var(--n-feedback-font-size);
 line-height: 1.25;
 transform-origin: top left;
 `, [c$1("&:not(:empty)", `
 padding: var(--n-feedback-padding);
 `), cB("form-item-feedback", {
        transition: "color .3s var(--n-bezier)",
        color: "var(--n-feedback-text-color)"
      }, [cM("warning", {
        color: "var(--n-feedback-text-color-warning)"
      }), cM("error", {
        color: "var(--n-feedback-text-color-error)"
      }), fadeDownTransition({
        fromOffset: "-3px",
        enterDuration: ".3s",
        leaveDuration: ".2s"
      })])])]);
      var __awaiter = function(thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
          });
        }
        return new (P || (P = Promise))(function(resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      const formItemProps = Object.assign(Object.assign({}, useTheme.props), {
        label: String,
        labelWidth: [Number, String],
        labelStyle: [String, Object],
        labelAlign: String,
        labelPlacement: String,
        path: String,
        first: Boolean,
        rulePath: String,
        required: Boolean,
        showRequireMark: {
          type: Boolean,
          default: void 0
        },
        requireMarkPlacement: String,
        showFeedback: {
          type: Boolean,
          default: void 0
        },
        rule: [Object, Array],
        size: String,
        ignorePathChange: Boolean,
        validationStatus: String,
        feedback: String,
        feedbackClass: String,
        feedbackStyle: [String, Object],
        showLabel: {
          type: Boolean,
          default: void 0
        },
        labelProps: Object
      });
      function wrapValidator(validator, async) {
        return (...args) => {
          try {
            const validateResult = validator(...args);
            if (!async && (typeof validateResult === "boolean" || validateResult instanceof Error || Array.isArray(validateResult)) || (validateResult === null || validateResult === void 0 ? void 0 : validateResult.then)) {
              return validateResult;
            } else if (validateResult === void 0) {
              return true;
            } else {
              warn$2("form-item/validate", `You return a ${typeof validateResult} typed value in the validator method, which is not recommended. Please use ${async ? "`Promise`" : "`boolean`, `Error` or `Promise`"} typed value instead.`);
              return true;
            }
          } catch (err) {
            warn$2("form-item/validate", "An error is catched in the validation, so the validation won't be done. Your callback in `validate` method of `n-form` or `n-form-item` won't be called in this validation.");
            console.error(err);
            return void 0;
          }
        };
      }
      const NFormItem = vue.defineComponent({
        name: "FormItem",
        props: formItemProps,
        setup(props) {
          useInjectionInstanceCollection(formItemInstsInjectionKey, "formItems", vue.toRef(props, "path"));
          const {
            mergedClsPrefixRef,
            inlineThemeDisabled
          } = useConfig(props);
          const NForm2 = vue.inject(formInjectionKey, null);
          const formItemSizeRefs = formItemSize(props);
          const formItemMiscRefs = formItemMisc(props);
          const {
            validationErrored: validationErroredRef,
            validationWarned: validationWarnedRef
          } = formItemMiscRefs;
          const {
            mergedRequired: mergedRequiredRef,
            mergedRules: mergedRulesRef
          } = formItemRule(props);
          const {
            mergedSize: mergedSizeRef
          } = formItemSizeRefs;
          const {
            mergedLabelPlacement: labelPlacementRef,
            mergedLabelAlign: labelTextAlignRef,
            mergedRequireMarkPlacement: mergedRequireMarkPlacementRef
          } = formItemMiscRefs;
          const renderExplainsRef = vue.ref([]);
          const feedbackIdRef = vue.ref(createId());
          const mergedDisabledRef = NForm2 ? vue.toRef(NForm2.props, "disabled") : vue.ref(false);
          const themeRef = useTheme("Form", "-form-item", style$3, formLight, props, mergedClsPrefixRef);
          vue.watch(vue.toRef(props, "path"), () => {
            if (props.ignorePathChange) return;
            restoreValidation();
          });
          function restoreValidation() {
            renderExplainsRef.value = [];
            validationErroredRef.value = false;
            validationWarnedRef.value = false;
            if (props.feedback) {
              feedbackIdRef.value = createId();
            }
          }
          const internalValidate = (...args_1) => __awaiter(this, [...args_1], void 0, function* (trigger2 = null, shouldRuleBeApplied = () => true, options = {
            suppressWarning: true
          }) {
            const {
              path
            } = props;
            if (!options) {
              options = {};
            } else {
              if (!options.first) options.first = props.first;
            }
            const {
              value: rules2
            } = mergedRulesRef;
            const value = NForm2 ? get(NForm2.props.model, path || "") : void 0;
            const messageRenderers = {};
            const originalMessageRendersMessage = {};
            const activeRules = (!trigger2 ? rules2 : rules2.filter((rule) => {
              if (Array.isArray(rule.trigger)) {
                return rule.trigger.includes(trigger2);
              } else {
                return rule.trigger === trigger2;
              }
            })).filter(shouldRuleBeApplied).map((rule, i) => {
              const shallowClonedRule = Object.assign({}, rule);
              if (shallowClonedRule.validator) {
                shallowClonedRule.validator = wrapValidator(shallowClonedRule.validator, false);
              }
              if (shallowClonedRule.asyncValidator) {
                shallowClonedRule.asyncValidator = wrapValidator(shallowClonedRule.asyncValidator, true);
              }
              if (shallowClonedRule.renderMessage) {
                const rendererKey = `__renderMessage__${i}`;
                originalMessageRendersMessage[rendererKey] = shallowClonedRule.message;
                shallowClonedRule.message = rendererKey;
                messageRenderers[rendererKey] = shallowClonedRule.renderMessage;
              }
              return shallowClonedRule;
            });
            const activeErrorRules = activeRules.filter((r) => r.level !== "warning");
            const activeWarningRules = activeRules.filter((r) => r.level === "warning");
            const validationResult = {
              valid: true,
              errors: void 0,
              warnings: void 0
            };
            if (!activeRules.length) return validationResult;
            const mergedPath = path !== null && path !== void 0 ? path : "__n_no_path__";
            const validator = new Schema({
              [mergedPath]: activeErrorRules
            });
            const warningValidator = new Schema({
              [mergedPath]: activeWarningRules
            });
            const {
              validateMessages
            } = (NForm2 === null || NForm2 === void 0 ? void 0 : NForm2.props) || {};
            if (validateMessages) {
              validator.messages(validateMessages);
              warningValidator.messages(validateMessages);
            }
            const renderMessages = (errors) => {
              renderExplainsRef.value = errors.map((error) => {
                const transformedMessage = (error === null || error === void 0 ? void 0 : error.message) || "";
                return {
                  key: transformedMessage,
                  render: () => {
                    if (transformedMessage.startsWith("__renderMessage__")) {
                      return messageRenderers[transformedMessage]();
                    }
                    return transformedMessage;
                  }
                };
              });
              errors.forEach((error) => {
                var _a;
                if ((_a = error.message) === null || _a === void 0 ? void 0 : _a.startsWith("__renderMessage__")) {
                  error.message = originalMessageRendersMessage[error.message];
                }
              });
            };
            if (activeErrorRules.length) {
              const errors = yield new Promise((resolve) => {
                void validator.validate({
                  [mergedPath]: value
                }, options, resolve);
              });
              if (errors === null || errors === void 0 ? void 0 : errors.length) {
                validationResult.valid = false;
                validationResult.errors = errors;
                renderMessages(errors);
              }
            }
            if (activeWarningRules.length && !validationResult.errors) {
              const warnings = yield new Promise((resolve) => {
                void warningValidator.validate({
                  [mergedPath]: value
                }, options, resolve);
              });
              if (warnings === null || warnings === void 0 ? void 0 : warnings.length) {
                renderMessages(warnings);
                validationResult.warnings = warnings;
              }
            }
            if (!validationResult.errors && !validationResult.warnings) {
              restoreValidation();
            } else {
              validationErroredRef.value = !!validationResult.errors;
              validationWarnedRef.value = !!validationResult.warnings;
            }
            return validationResult;
          });
          function handleContentBlur() {
            void internalValidate("blur");
          }
          function handleContentChange() {
            void internalValidate("change");
          }
          function handleContentFocus() {
            void internalValidate("focus");
          }
          function handleContentInput() {
            void internalValidate("input");
          }
          function validate(options, callback) {
            return __awaiter(this, void 0, void 0, function* () {
              let trigger2;
              let validateCallback;
              let shouldRuleBeApplied;
              let asyncValidatorOptions;
              if (typeof options === "string") {
                trigger2 = options;
                validateCallback = callback;
              } else if (options !== null && typeof options === "object") {
                trigger2 = options.trigger;
                validateCallback = options.callback;
                shouldRuleBeApplied = options.shouldRuleBeApplied;
                asyncValidatorOptions = options.options;
              }
              return yield new Promise((resolve, reject) => {
                void internalValidate(trigger2, shouldRuleBeApplied, asyncValidatorOptions).then(({
                  valid,
                  errors,
                  warnings
                }) => {
                  if (valid) {
                    if (validateCallback) {
                      validateCallback(void 0, {
                        warnings
                      });
                    }
                    resolve({
                      warnings
                    });
                  } else {
                    if (validateCallback) {
                      validateCallback(errors, {
                        warnings
                      });
                    }
                    reject(errors);
                  }
                });
              });
            });
          }
          vue.provide(formItemInjectionKey, {
            path: vue.toRef(props, "path"),
            disabled: mergedDisabledRef,
            mergedSize: formItemSizeRefs.mergedSize,
            mergedValidationStatus: formItemMiscRefs.mergedValidationStatus,
            restoreValidation,
            handleContentBlur,
            handleContentChange,
            handleContentFocus,
            handleContentInput
          });
          const exposedRef = {
            validate,
            restoreValidation,
            internalValidate
          };
          const labelElementRef = vue.ref(null);
          vue.onMounted(() => {
            if (!formItemMiscRefs.isAutoLabelWidth.value) return;
            const labelElement = labelElementRef.value;
            if (labelElement !== null) {
              const memoizedWhitespace = labelElement.style.whiteSpace;
              labelElement.style.whiteSpace = "nowrap";
              labelElement.style.width = "";
              NForm2 === null || NForm2 === void 0 ? void 0 : NForm2.deriveMaxChildLabelWidth(Number(getComputedStyle(labelElement).width.slice(0, -2)));
              labelElement.style.whiteSpace = memoizedWhitespace;
            }
          });
          const cssVarsRef = vue.computed(() => {
            var _a;
            const {
              value: size2
            } = mergedSizeRef;
            const {
              value: labelPlacement
            } = labelPlacementRef;
            const direction = labelPlacement === "top" ? "vertical" : "horizontal";
            const {
              common: {
                cubicBezierEaseInOut: cubicBezierEaseInOut2
              },
              self: {
                labelTextColor,
                asteriskColor,
                lineHeight: lineHeight2,
                feedbackTextColor,
                feedbackTextColorWarning,
                feedbackTextColorError,
                feedbackPadding,
                labelFontWeight,
                [createKey("labelHeight", size2)]: labelHeight,
                [createKey("blankHeight", size2)]: blankHeight,
                [createKey("feedbackFontSize", size2)]: feedbackFontSize,
                [createKey("feedbackHeight", size2)]: feedbackHeight,
                [createKey("labelPadding", direction)]: labelPadding,
                [createKey("labelTextAlign", direction)]: labelTextAlign,
                [createKey(createKey("labelFontSize", labelPlacement), size2)]: labelFontSize
              }
            } = themeRef.value;
            let mergedLabelTextAlign = (_a = labelTextAlignRef.value) !== null && _a !== void 0 ? _a : labelTextAlign;
            if (labelPlacement === "top") {
              mergedLabelTextAlign = mergedLabelTextAlign === "right" ? "flex-end" : "flex-start";
            }
            const cssVars = {
              "--n-bezier": cubicBezierEaseInOut2,
              "--n-line-height": lineHeight2,
              "--n-blank-height": blankHeight,
              "--n-label-font-size": labelFontSize,
              "--n-label-text-align": mergedLabelTextAlign,
              "--n-label-height": labelHeight,
              "--n-label-padding": labelPadding,
              "--n-label-font-weight": labelFontWeight,
              "--n-asterisk-color": asteriskColor,
              "--n-label-text-color": labelTextColor,
              "--n-feedback-padding": feedbackPadding,
              "--n-feedback-font-size": feedbackFontSize,
              "--n-feedback-height": feedbackHeight,
              "--n-feedback-text-color": feedbackTextColor,
              "--n-feedback-text-color-warning": feedbackTextColorWarning,
              "--n-feedback-text-color-error": feedbackTextColorError
            };
            return cssVars;
          });
          const themeClassHandle = inlineThemeDisabled ? useThemeClass("form-item", vue.computed(() => {
            var _a;
            return `${mergedSizeRef.value[0]}${labelPlacementRef.value[0]}${((_a = labelTextAlignRef.value) === null || _a === void 0 ? void 0 : _a[0]) || ""}`;
          }), cssVarsRef, props) : void 0;
          const reverseColSpaceRef = vue.computed(() => {
            return labelPlacementRef.value === "left" && mergedRequireMarkPlacementRef.value === "left" && labelTextAlignRef.value === "left";
          });
          return Object.assign(Object.assign(Object.assign(Object.assign({
            labelElementRef,
            mergedClsPrefix: mergedClsPrefixRef,
            mergedRequired: mergedRequiredRef,
            feedbackId: feedbackIdRef,
            renderExplains: renderExplainsRef,
            reverseColSpace: reverseColSpaceRef
          }, formItemMiscRefs), formItemSizeRefs), exposedRef), {
            cssVars: inlineThemeDisabled ? void 0 : cssVarsRef,
            themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
            onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
          });
        },
        render() {
          const {
            $slots,
            mergedClsPrefix,
            mergedShowLabel,
            mergedShowRequireMark,
            mergedRequireMarkPlacement,
            onRender
          } = this;
          const renderedShowRequireMark = mergedShowRequireMark !== void 0 ? mergedShowRequireMark : this.mergedRequired;
          onRender === null || onRender === void 0 ? void 0 : onRender();
          const renderLabel = () => {
            const labelText = this.$slots.label ? this.$slots.label() : this.label;
            if (!labelText) return null;
            const textNode = vue.h("span", {
              class: `${mergedClsPrefix}-form-item-label__text`
            }, labelText);
            const markNode = renderedShowRequireMark ? vue.h("span", {
              class: `${mergedClsPrefix}-form-item-label__asterisk`
            }, mergedRequireMarkPlacement !== "left" ? " *" : "* ") : mergedRequireMarkPlacement === "right-hanging" && vue.h("span", {
              class: `${mergedClsPrefix}-form-item-label__asterisk-placeholder`
            }, " *");
            const {
              labelProps
            } = this;
            return vue.h("label", Object.assign({}, labelProps, {
              class: [labelProps === null || labelProps === void 0 ? void 0 : labelProps.class, `${mergedClsPrefix}-form-item-label`, `${mergedClsPrefix}-form-item-label--${mergedRequireMarkPlacement}-mark`, this.reverseColSpace && `${mergedClsPrefix}-form-item-label--reverse-columns-space`],
              style: this.mergedLabelStyle,
              ref: "labelElementRef"
            }), mergedRequireMarkPlacement === "left" ? [markNode, textNode] : [textNode, markNode]);
          };
          return vue.h("div", {
            class: [`${mergedClsPrefix}-form-item`, this.themeClass, `${mergedClsPrefix}-form-item--${this.mergedSize}-size`, `${mergedClsPrefix}-form-item--${this.mergedLabelPlacement}-labelled`, this.isAutoLabelWidth && `${mergedClsPrefix}-form-item--auto-label-width`, !mergedShowLabel && `${mergedClsPrefix}-form-item--no-label`],
            style: this.cssVars
          }, mergedShowLabel && renderLabel(), vue.h("div", {
            class: [`${mergedClsPrefix}-form-item-blank`, this.mergedValidationStatus && `${mergedClsPrefix}-form-item-blank--${this.mergedValidationStatus}`]
          }, $slots), this.mergedShowFeedback ? vue.h("div", {
            key: this.feedbackId,
            style: this.feedbackStyle,
            class: [`${mergedClsPrefix}-form-item-feedback-wrapper`, this.feedbackClass]
          }, vue.h(vue.Transition, {
            name: "fade-down-transition",
            mode: "out-in"
          }, {
            default: () => {
              const {
                mergedValidationStatus
              } = this;
              return resolveWrappedSlot($slots.feedback, (children) => {
                var _a;
                const {
                  feedback
                } = this;
                const feedbackNodes = children || feedback ? vue.h("div", {
                  key: "__feedback__",
                  class: `${mergedClsPrefix}-form-item-feedback__line`
                }, children || feedback) : this.renderExplains.length ? (_a = this.renderExplains) === null || _a === void 0 ? void 0 : _a.map(({
                  key,
                  render: render2
                }) => vue.h("div", {
                  key,
                  class: `${mergedClsPrefix}-form-item-feedback__line`
                }, render2())) : null;
                return feedbackNodes ? mergedValidationStatus === "warning" ? vue.h("div", {
                  key: "controlled-warning",
                  class: `${mergedClsPrefix}-form-item-feedback ${mergedClsPrefix}-form-item-feedback--warning`
                }, feedbackNodes) : mergedValidationStatus === "error" ? vue.h("div", {
                  key: "controlled-error",
                  class: `${mergedClsPrefix}-form-item-feedback ${mergedClsPrefix}-form-item-feedback--error`
                }, feedbackNodes) : mergedValidationStatus === "success" ? vue.h("div", {
                  key: "controlled-success",
                  class: `${mergedClsPrefix}-form-item-feedback ${mergedClsPrefix}-form-item-feedback--success`
                }, feedbackNodes) : vue.h("div", {
                  key: "controlled-default",
                  class: `${mergedClsPrefix}-form-item-feedback`
                }, feedbackNodes) : null;
              });
            }
          })) : null);
        }
      });
      const commonVars$3 = {
        closeMargin: "16px 12px",
        closeSize: "20px",
        closeIconSize: "16px",
        width: "365px",
        padding: "16px",
        titleFontSize: "16px",
        metaFontSize: "12px",
        descriptionFontSize: "12px"
      };
      function self$C(vars) {
        const {
          textColor2,
          successColor,
          infoColor,
          warningColor,
          errorColor,
          popoverColor,
          closeIconColor,
          closeIconColorHover,
          closeIconColorPressed,
          closeColorHover,
          closeColorPressed,
          textColor1,
          textColor3,
          borderRadius,
          fontWeightStrong,
          boxShadow2,
          lineHeight: lineHeight2,
          fontSize: fontSize2
        } = vars;
        return Object.assign(Object.assign({}, commonVars$3), {
          borderRadius,
          lineHeight: lineHeight2,
          fontSize: fontSize2,
          headerFontWeight: fontWeightStrong,
          iconColor: textColor2,
          iconColorSuccess: successColor,
          iconColorInfo: infoColor,
          iconColorWarning: warningColor,
          iconColorError: errorColor,
          color: popoverColor,
          textColor: textColor2,
          closeIconColor,
          closeIconColorHover,
          closeIconColorPressed,
          closeBorderRadius: borderRadius,
          closeColorHover,
          closeColorPressed,
          headerTextColor: textColor1,
          descriptionTextColor: textColor3,
          actionTextColor: textColor2,
          boxShadow: boxShadow2
        });
      }
      const notificationLight = createTheme({
        name: "Notification",
        common: derived,
        peers: {
          Scrollbar: scrollbarLight
        },
        self: self$C
      });
      const notificationDark = {
        name: "Notification",
        common: derived$1,
        peers: {
          Scrollbar: scrollbarDark
        },
        self: self$C
      };
      const commonVariables$4 = {
        margin: "0 0 8px 0",
        padding: "10px 20px",
        maxWidth: "720px",
        minWidth: "420px",
        iconMargin: "0 10px 0 0",
        closeMargin: "0 0 0 10px",
        closeSize: "20px",
        closeIconSize: "16px",
        iconSize: "20px",
        fontSize: "14px"
      };
      function self$B(vars) {
        const {
          textColor2,
          closeIconColor,
          closeIconColorHover,
          closeIconColorPressed,
          infoColor,
          successColor,
          errorColor,
          warningColor,
          popoverColor,
          boxShadow2,
          primaryColor,
          lineHeight: lineHeight2,
          borderRadius,
          closeColorHover,
          closeColorPressed
        } = vars;
        return Object.assign(Object.assign({}, commonVariables$4), {
          closeBorderRadius: borderRadius,
          textColor: textColor2,
          textColorInfo: textColor2,
          textColorSuccess: textColor2,
          textColorError: textColor2,
          textColorWarning: textColor2,
          textColorLoading: textColor2,
          color: popoverColor,
          colorInfo: popoverColor,
          colorSuccess: popoverColor,
          colorError: popoverColor,
          colorWarning: popoverColor,
          colorLoading: popoverColor,
          boxShadow: boxShadow2,
          boxShadowInfo: boxShadow2,
          boxShadowSuccess: boxShadow2,
          boxShadowError: boxShadow2,
          boxShadowWarning: boxShadow2,
          boxShadowLoading: boxShadow2,
          iconColor: textColor2,
          iconColorInfo: infoColor,
          iconColorSuccess: successColor,
          iconColorWarning: warningColor,
          iconColorError: errorColor,
          iconColorLoading: primaryColor,
          closeColorHover,
          closeColorPressed,
          closeIconColor,
          closeIconColorHover,
          closeIconColorPressed,
          closeColorHoverInfo: closeColorHover,
          closeColorPressedInfo: closeColorPressed,
          closeIconColorInfo: closeIconColor,
          closeIconColorHoverInfo: closeIconColorHover,
          closeIconColorPressedInfo: closeIconColorPressed,
          closeColorHoverSuccess: closeColorHover,
          closeColorPressedSuccess: closeColorPressed,
          closeIconColorSuccess: closeIconColor,
          closeIconColorHoverSuccess: closeIconColorHover,
          closeIconColorPressedSuccess: closeIconColorPressed,
          closeColorHoverError: closeColorHover,
          closeColorPressedError: closeColorPressed,
          closeIconColorError: closeIconColor,
          closeIconColorHoverError: closeIconColorHover,
          closeIconColorPressedError: closeIconColorPressed,
          closeColorHoverWarning: closeColorHover,
          closeColorPressedWarning: closeColorPressed,
          closeIconColorWarning: closeIconColor,
          closeIconColorHoverWarning: closeIconColorHover,
          closeIconColorPressedWarning: closeIconColorPressed,
          closeColorHoverLoading: closeColorHover,
          closeColorPressedLoading: closeColorPressed,
          closeIconColorLoading: closeIconColor,
          closeIconColorHoverLoading: closeIconColorHover,
          closeIconColorPressedLoading: closeIconColorPressed,
          loadingColor: primaryColor,
          lineHeight: lineHeight2,
          borderRadius
        });
      }
      const messageLight = {
        name: "Message",
        common: derived,
        self: self$B
      };
      const messageDark = {
        name: "Message",
        common: derived$1,
        self: self$B
      };
      const buttonGroupDark = {
        name: "ButtonGroup",
        common: derived$1
      };
      const buttonGroupLight = {
        name: "ButtonGroup",
        common: derived
      };
      const gradientTextDark = {
        name: "GradientText",
        common: derived$1,
        self(vars) {
          const {
            primaryColor,
            successColor,
            warningColor,
            errorColor,
            infoColor,
            primaryColorSuppl,
            successColorSuppl,
            warningColorSuppl,
            errorColorSuppl,
            infoColorSuppl,
            fontWeightStrong
          } = vars;
          return {
            fontWeight: fontWeightStrong,
            rotate: "252deg",
            colorStartPrimary: primaryColor,
            colorEndPrimary: primaryColorSuppl,
            colorStartInfo: infoColor,
            colorEndInfo: infoColorSuppl,
            colorStartWarning: warningColor,
            colorEndWarning: warningColorSuppl,
            colorStartError: errorColor,
            colorEndError: errorColorSuppl,
            colorStartSuccess: successColor,
            colorEndSuccess: successColorSuppl
          };
        }
      };
      function self$A(vars) {
        const {
          primaryColor,
          successColor,
          warningColor,
          errorColor,
          infoColor,
          fontWeightStrong
        } = vars;
        return {
          fontWeight: fontWeightStrong,
          rotate: "252deg",
          colorStartPrimary: changeColor(primaryColor, {
            alpha: 0.6
          }),
          colorEndPrimary: primaryColor,
          colorStartInfo: changeColor(infoColor, {
            alpha: 0.6
          }),
          colorEndInfo: infoColor,
          colorStartWarning: changeColor(warningColor, {
            alpha: 0.6
          }),
          colorEndWarning: warningColor,
          colorStartError: changeColor(errorColor, {
            alpha: 0.6
          }),
          colorEndError: errorColor,
          colorStartSuccess: changeColor(successColor, {
            alpha: 0.6
          }),
          colorEndSuccess: successColor
        };
      }
      const gradientTextLight = {
        name: "GradientText",
        common: derived,
        self: self$A
      };
      const inputNumberDark = {
        name: "InputNumber",
        common: derived$1,
        peers: {
          Button: buttonDark,
          Input: inputDark
        },
        self(vars) {
          const {
            textColorDisabled
          } = vars;
          return {
            iconColorDisabled: textColorDisabled
          };
        }
      };
      function self$z(vars) {
        const {
          textColorDisabled
        } = vars;
        return {
          iconColorDisabled: textColorDisabled
        };
      }
      const inputNumberLight = createTheme({
        name: "InputNumber",
        common: derived,
        peers: {
          Button: buttonLight,
          Input: inputLight
        },
        self: self$z
      });
      const layoutDark = {
        name: "Layout",
        common: derived$1,
        peers: {
          Scrollbar: scrollbarDark
        },
        self(vars) {
          const {
            textColor2,
            bodyColor,
            popoverColor,
            cardColor,
            dividerColor,
            scrollbarColor,
            scrollbarColorHover
          } = vars;
          return {
            textColor: textColor2,
            textColorInverted: textColor2,
            color: bodyColor,
            colorEmbedded: bodyColor,
            headerColor: cardColor,
            headerColorInverted: cardColor,
            footerColor: cardColor,
            footerColorInverted: cardColor,
            headerBorderColor: dividerColor,
            headerBorderColorInverted: dividerColor,
            footerBorderColor: dividerColor,
            footerBorderColorInverted: dividerColor,
            siderBorderColor: dividerColor,
            siderBorderColorInverted: dividerColor,
            siderColor: cardColor,
            siderColorInverted: cardColor,
            siderToggleButtonBorder: "1px solid transparent",
            siderToggleButtonColor: popoverColor,
            siderToggleButtonIconColor: textColor2,
            siderToggleButtonIconColorInverted: textColor2,
            siderToggleBarColor: composite(bodyColor, scrollbarColor),
            siderToggleBarColorHover: composite(bodyColor, scrollbarColorHover),
            __invertScrollbar: "false"
          };
        }
      };
      function self$y(vars) {
        const {
          baseColor,
          textColor2,
          bodyColor,
          cardColor,
          dividerColor,
          actionColor,
          scrollbarColor,
          scrollbarColorHover,
          invertedColor
        } = vars;
        return {
          textColor: textColor2,
          textColorInverted: "#FFF",
          color: bodyColor,
          colorEmbedded: actionColor,
          headerColor: cardColor,
          headerColorInverted: invertedColor,
          footerColor: actionColor,
          footerColorInverted: invertedColor,
          headerBorderColor: dividerColor,
          headerBorderColorInverted: invertedColor,
          footerBorderColor: dividerColor,
          footerBorderColorInverted: invertedColor,
          siderBorderColor: dividerColor,
          siderBorderColorInverted: invertedColor,
          siderColor: cardColor,
          siderColorInverted: invertedColor,
          siderToggleButtonBorder: `1px solid ${dividerColor}`,
          siderToggleButtonColor: baseColor,
          siderToggleButtonIconColor: textColor2,
          siderToggleButtonIconColorInverted: textColor2,
          siderToggleBarColor: composite(bodyColor, scrollbarColor),
          siderToggleBarColorHover: composite(bodyColor, scrollbarColorHover),
          // hack for inverted background
          __invertScrollbar: "true"
        };
      }
      const layoutLight = createTheme({
        name: "Layout",
        common: derived,
        peers: {
          Scrollbar: scrollbarLight
        },
        self: self$y
      });
      function self$x(vars) {
        const {
          textColor2,
          cardColor,
          modalColor,
          popoverColor,
          dividerColor,
          borderRadius,
          fontSize: fontSize2,
          hoverColor
        } = vars;
        return {
          textColor: textColor2,
          color: cardColor,
          colorHover: hoverColor,
          colorModal: modalColor,
          colorHoverModal: composite(modalColor, hoverColor),
          colorPopover: popoverColor,
          colorHoverPopover: composite(popoverColor, hoverColor),
          borderColor: dividerColor,
          borderColorModal: composite(modalColor, dividerColor),
          borderColorPopover: composite(popoverColor, dividerColor),
          borderRadius,
          fontSize: fontSize2
        };
      }
      const listLight = {
        name: "List",
        common: derived,
        self: self$x
      };
      const listDark$1 = {
        name: "List",
        common: derived$1,
        self: self$x
      };
      const loadingBarDark = {
        name: "LoadingBar",
        common: derived$1,
        self(vars) {
          const {
            primaryColor
          } = vars;
          return {
            colorError: "red",
            colorLoading: primaryColor,
            height: "2px"
          };
        }
      };
      function self$w(vars) {
        const {
          primaryColor,
          errorColor
        } = vars;
        return {
          colorError: errorColor,
          colorLoading: primaryColor,
          height: "2px"
        };
      }
      const loadingBarLight = {
        name: "LoadingBar",
        common: derived,
        self: self$w
      };
      const logDark = {
        name: "Log",
        common: derived$1,
        peers: {
          Scrollbar: scrollbarDark,
          Code: codeDark
        },
        self(vars) {
          const {
            textColor2,
            inputColor,
            fontSize: fontSize2,
            primaryColor
          } = vars;
          return {
            loaderFontSize: fontSize2,
            loaderTextColor: textColor2,
            loaderColor: inputColor,
            loaderBorder: "1px solid #0000",
            loadingColor: primaryColor
          };
        }
      };
      function self$v(vars) {
        const {
          textColor2,
          modalColor,
          borderColor,
          fontSize: fontSize2,
          primaryColor
        } = vars;
        return {
          loaderFontSize: fontSize2,
          loaderTextColor: textColor2,
          loaderColor: modalColor,
          loaderBorder: `1px solid ${borderColor}`,
          loadingColor: primaryColor
        };
      }
      const logLight = createTheme({
        name: "Log",
        common: derived,
        peers: {
          Scrollbar: scrollbarLight,
          Code: codeLight
        },
        self: self$v
      });
      const listDark = {
        name: "Mention",
        common: derived$1,
        peers: {
          InternalSelectMenu: internalSelectMenuDark,
          Input: inputDark
        },
        self(vars) {
          const {
            boxShadow2
          } = vars;
          return {
            menuBoxShadow: boxShadow2
          };
        }
      };
      function self$u(vars) {
        const {
          boxShadow2
        } = vars;
        return {
          menuBoxShadow: boxShadow2
        };
      }
      const mentionLight = createTheme({
        name: "Mention",
        common: derived,
        peers: {
          InternalSelectMenu: internalSelectMenuLight,
          Input: inputLight
        },
        self: self$u
      });
      function createPartialInvertedVars(color, activeItemColor, activeTextColor, groupTextColor) {
        return {
          itemColorHoverInverted: "#0000",
          itemColorActiveInverted: activeItemColor,
          itemColorActiveHoverInverted: activeItemColor,
          itemColorActiveCollapsedInverted: activeItemColor,
          itemTextColorInverted: color,
          itemTextColorHoverInverted: activeTextColor,
          itemTextColorChildActiveInverted: activeTextColor,
          itemTextColorChildActiveHoverInverted: activeTextColor,
          itemTextColorActiveInverted: activeTextColor,
          itemTextColorActiveHoverInverted: activeTextColor,
          itemTextColorHorizontalInverted: color,
          itemTextColorHoverHorizontalInverted: activeTextColor,
          itemTextColorChildActiveHorizontalInverted: activeTextColor,
          itemTextColorChildActiveHoverHorizontalInverted: activeTextColor,
          itemTextColorActiveHorizontalInverted: activeTextColor,
          itemTextColorActiveHoverHorizontalInverted: activeTextColor,
          itemIconColorInverted: color,
          itemIconColorHoverInverted: activeTextColor,
          itemIconColorActiveInverted: activeTextColor,
          itemIconColorActiveHoverInverted: activeTextColor,
          itemIconColorChildActiveInverted: activeTextColor,
          itemIconColorChildActiveHoverInverted: activeTextColor,
          itemIconColorCollapsedInverted: color,
          itemIconColorHorizontalInverted: color,
          itemIconColorHoverHorizontalInverted: activeTextColor,
          itemIconColorActiveHorizontalInverted: activeTextColor,
          itemIconColorActiveHoverHorizontalInverted: activeTextColor,
          itemIconColorChildActiveHorizontalInverted: activeTextColor,
          itemIconColorChildActiveHoverHorizontalInverted: activeTextColor,
          arrowColorInverted: color,
          arrowColorHoverInverted: activeTextColor,
          arrowColorActiveInverted: activeTextColor,
          arrowColorActiveHoverInverted: activeTextColor,
          arrowColorChildActiveInverted: activeTextColor,
          arrowColorChildActiveHoverInverted: activeTextColor,
          groupTextColorInverted: groupTextColor
        };
      }
      function self$t(vars) {
        const {
          borderRadius,
          textColor3,
          primaryColor,
          textColor2,
          textColor1,
          fontSize: fontSize2,
          dividerColor,
          hoverColor,
          primaryColorHover
        } = vars;
        return Object.assign({
          borderRadius,
          color: "#0000",
          groupTextColor: textColor3,
          itemColorHover: hoverColor,
          itemColorActive: changeColor(primaryColor, {
            alpha: 0.1
          }),
          itemColorActiveHover: changeColor(primaryColor, {
            alpha: 0.1
          }),
          itemColorActiveCollapsed: changeColor(primaryColor, {
            alpha: 0.1
          }),
          itemTextColor: textColor2,
          itemTextColorHover: textColor2,
          itemTextColorActive: primaryColor,
          itemTextColorActiveHover: primaryColor,
          itemTextColorChildActive: primaryColor,
          itemTextColorChildActiveHover: primaryColor,
          itemTextColorHorizontal: textColor2,
          itemTextColorHoverHorizontal: primaryColorHover,
          itemTextColorActiveHorizontal: primaryColor,
          itemTextColorActiveHoverHorizontal: primaryColor,
          itemTextColorChildActiveHorizontal: primaryColor,
          itemTextColorChildActiveHoverHorizontal: primaryColor,
          itemIconColor: textColor1,
          itemIconColorHover: textColor1,
          itemIconColorActive: primaryColor,
          itemIconColorActiveHover: primaryColor,
          itemIconColorChildActive: primaryColor,
          itemIconColorChildActiveHover: primaryColor,
          itemIconColorCollapsed: textColor1,
          itemIconColorHorizontal: textColor1,
          itemIconColorHoverHorizontal: primaryColorHover,
          itemIconColorActiveHorizontal: primaryColor,
          itemIconColorActiveHoverHorizontal: primaryColor,
          itemIconColorChildActiveHorizontal: primaryColor,
          itemIconColorChildActiveHoverHorizontal: primaryColor,
          itemHeight: "42px",
          arrowColor: textColor2,
          arrowColorHover: textColor2,
          arrowColorActive: primaryColor,
          arrowColorActiveHover: primaryColor,
          arrowColorChildActive: primaryColor,
          arrowColorChildActiveHover: primaryColor,
          colorInverted: "#0000",
          borderColorHorizontal: "#0000",
          fontSize: fontSize2,
          dividerColor
        }, createPartialInvertedVars("#BBB", primaryColor, "#FFF", "#AAA"));
      }
      const menuLight = createTheme({
        name: "Menu",
        common: derived,
        peers: {
          Tooltip: tooltipLight,
          Dropdown: dropdownLight
        },
        self: self$t
      });
      const menuDark = {
        name: "Menu",
        common: derived$1,
        peers: {
          Tooltip: tooltipDark,
          Dropdown: dropdownDark
        },
        self(vars) {
          const {
            primaryColor,
            primaryColorSuppl
          } = vars;
          const commonSelf = self$t(vars);
          commonSelf.itemColorActive = changeColor(primaryColor, {
            alpha: 0.15
          });
          commonSelf.itemColorActiveHover = changeColor(primaryColor, {
            alpha: 0.15
          });
          commonSelf.itemColorActiveCollapsed = changeColor(primaryColor, {
            alpha: 0.15
          });
          commonSelf.itemColorActiveInverted = primaryColorSuppl;
          commonSelf.itemColorActiveHoverInverted = primaryColorSuppl;
          commonSelf.itemColorActiveCollapsedInverted = primaryColorSuppl;
          return commonSelf;
        }
      };
      const common = {
        titleFontSize: "18px",
        backSize: "22px"
      };
      function self$s(vars) {
        const {
          textColor1,
          textColor2,
          textColor3,
          fontSize: fontSize2,
          fontWeightStrong,
          primaryColorHover,
          primaryColorPressed
        } = vars;
        return Object.assign(Object.assign({}, common), {
          titleFontWeight: fontWeightStrong,
          fontSize: fontSize2,
          titleTextColor: textColor1,
          backColor: textColor2,
          backColorHover: primaryColorHover,
          backColorPressed: primaryColorPressed,
          subtitleTextColor: textColor3
        });
      }
      const pageHeaderLight = createTheme({
        name: "PageHeader",
        common: derived,
        self: self$s
      });
      const pageHeaderDark = {
        name: "PageHeader",
        common: derived$1,
        self: self$s
      };
      const commonVars$2 = {
        iconSize: "22px"
      };
      function self$r(vars) {
        const {
          fontSize: fontSize2,
          warningColor
        } = vars;
        return Object.assign(Object.assign({}, commonVars$2), {
          fontSize: fontSize2,
          iconColor: warningColor
        });
      }
      const popconfirmLight = createTheme({
        name: "Popconfirm",
        common: derived,
        peers: {
          Button: buttonLight,
          Popover: popoverLight
        },
        self: self$r
      });
      const popconfirmDark = {
        name: "Popconfirm",
        common: derived$1,
        peers: {
          Button: buttonDark,
          Popover: popoverDark
        },
        self: self$r
      };
      function self$q(vars) {
        const {
          infoColor,
          successColor,
          warningColor,
          errorColor,
          textColor2,
          progressRailColor,
          fontSize: fontSize2,
          fontWeight
        } = vars;
        return {
          fontSize: fontSize2,
          fontSizeCircle: "28px",
          fontWeightCircle: fontWeight,
          railColor: progressRailColor,
          railHeight: "8px",
          iconSizeCircle: "36px",
          iconSizeLine: "18px",
          iconColor: infoColor,
          iconColorInfo: infoColor,
          iconColorSuccess: successColor,
          iconColorWarning: warningColor,
          iconColorError: errorColor,
          textColorCircle: textColor2,
          textColorLineInner: "rgb(255, 255, 255)",
          textColorLineOuter: textColor2,
          fillColor: infoColor,
          fillColorInfo: infoColor,
          fillColorSuccess: successColor,
          fillColorWarning: warningColor,
          fillColorError: errorColor,
          lineBgProcessing: "linear-gradient(90deg, rgba(255, 255, 255, .3) 0%, rgba(255, 255, 255, .5) 100%)"
        };
      }
      const progressLight = {
        name: "Progress",
        common: derived,
        self: self$q
      };
      const progressDark = {
        name: "Progress",
        common: derived$1,
        self(vars) {
          const commonSelf = self$q(vars);
          commonSelf.textColorLineInner = "rgb(0, 0, 0)";
          commonSelf.lineBgProcessing = "linear-gradient(90deg, rgba(255, 255, 255, .3) 0%, rgba(255, 255, 255, .5) 100%)";
          return commonSelf;
        }
      };
      const rateDark = {
        name: "Rate",
        common: derived$1,
        self(vars) {
          const {
            railColor
          } = vars;
          return {
            itemColor: railColor,
            itemColorActive: "#CCAA33",
            itemSize: "20px",
            sizeSmall: "16px",
            sizeMedium: "20px",
            sizeLarge: "24px"
          };
        }
      };
      function self$p(vars) {
        const {
          railColor
        } = vars;
        return {
          itemColor: railColor,
          itemColorActive: "#FFCC33",
          sizeSmall: "16px",
          sizeMedium: "20px",
          sizeLarge: "24px"
        };
      }
      const themeLight$4 = {
        name: "Rate",
        common: derived,
        self: self$p
      };
      const commonVariables$3 = {
        titleFontSizeSmall: "26px",
        titleFontSizeMedium: "32px",
        titleFontSizeLarge: "40px",
        titleFontSizeHuge: "48px",
        fontSizeSmall: "14px",
        fontSizeMedium: "14px",
        fontSizeLarge: "15px",
        fontSizeHuge: "16px",
        iconSizeSmall: "64px",
        iconSizeMedium: "80px",
        iconSizeLarge: "100px",
        iconSizeHuge: "125px",
        iconColor418: void 0,
        iconColor404: void 0,
        iconColor403: void 0,
        iconColor500: void 0
      };
      function self$o(vars) {
        const {
          textColor2,
          textColor1,
          errorColor,
          successColor,
          infoColor,
          warningColor,
          lineHeight: lineHeight2,
          fontWeightStrong
        } = vars;
        return Object.assign(Object.assign({}, commonVariables$3), {
          lineHeight: lineHeight2,
          titleFontWeight: fontWeightStrong,
          titleTextColor: textColor1,
          textColor: textColor2,
          iconColorError: errorColor,
          iconColorSuccess: successColor,
          iconColorInfo: infoColor,
          iconColorWarning: warningColor
        });
      }
      const resultLight = {
        name: "Result",
        common: derived,
        self: self$o
      };
      const resultDark = {
        name: "Result",
        common: derived$1,
        self: self$o
      };
      const sizeVariables$3 = {
        railHeight: "4px",
        railWidthVertical: "4px",
        handleSize: "18px",
        dotHeight: "8px",
        dotWidth: "8px",
        dotBorderRadius: "4px"
      };
      const sliderDark = {
        name: "Slider",
        common: derived$1,
        self(vars) {
          const boxShadow = "0 2px 8px 0 rgba(0, 0, 0, 0.12)";
          const {
            railColor,
            modalColor,
            primaryColorSuppl,
            popoverColor,
            textColor2,
            cardColor,
            borderRadius,
            fontSize: fontSize2,
            opacityDisabled
          } = vars;
          return Object.assign(Object.assign({}, sizeVariables$3), {
            fontSize: fontSize2,
            markFontSize: fontSize2,
            railColor,
            railColorHover: railColor,
            fillColor: primaryColorSuppl,
            fillColorHover: primaryColorSuppl,
            opacityDisabled,
            handleColor: "#FFF",
            dotColor: cardColor,
            dotColorModal: modalColor,
            dotColorPopover: popoverColor,
            handleBoxShadow: "0px 2px 4px 0 rgba(0, 0, 0, 0.4)",
            handleBoxShadowHover: "0px 2px 4px 0 rgba(0, 0, 0, 0.4)",
            handleBoxShadowActive: "0px 2px 4px 0 rgba(0, 0, 0, 0.4)",
            handleBoxShadowFocus: "0px 2px 4px 0 rgba(0, 0, 0, 0.4)",
            indicatorColor: popoverColor,
            indicatorBoxShadow: boxShadow,
            indicatorTextColor: textColor2,
            indicatorBorderRadius: borderRadius,
            dotBorder: `2px solid ${railColor}`,
            dotBorderActive: `2px solid ${primaryColorSuppl}`,
            dotBoxShadow: ""
          });
        }
      };
      function self$n(vars) {
        const indicatorColor = "rgba(0, 0, 0, .85)";
        const boxShadow = "0 2px 8px 0 rgba(0, 0, 0, 0.12)";
        const {
          railColor,
          primaryColor,
          baseColor,
          cardColor,
          modalColor,
          popoverColor,
          borderRadius,
          fontSize: fontSize2,
          opacityDisabled
        } = vars;
        return Object.assign(Object.assign({}, sizeVariables$3), {
          fontSize: fontSize2,
          markFontSize: fontSize2,
          railColor,
          railColorHover: railColor,
          fillColor: primaryColor,
          fillColorHover: primaryColor,
          opacityDisabled,
          handleColor: "#FFF",
          dotColor: cardColor,
          dotColorModal: modalColor,
          dotColorPopover: popoverColor,
          handleBoxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)",
          handleBoxShadowHover: "0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)",
          handleBoxShadowActive: "0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)",
          handleBoxShadowFocus: "0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)",
          indicatorColor,
          indicatorBoxShadow: boxShadow,
          indicatorTextColor: baseColor,
          indicatorBorderRadius: borderRadius,
          dotBorder: `2px solid ${railColor}`,
          dotBorderActive: `2px solid ${primaryColor}`,
          dotBoxShadow: ""
        });
      }
      const sliderLight = {
        name: "Slider",
        common: derived,
        self: self$n
      };
      function self$m(vars) {
        const {
          opacityDisabled,
          heightTiny,
          heightSmall,
          heightMedium,
          heightLarge,
          heightHuge,
          primaryColor,
          fontSize: fontSize2
        } = vars;
        return {
          fontSize: fontSize2,
          textColor: primaryColor,
          sizeTiny: heightTiny,
          sizeSmall: heightSmall,
          sizeMedium: heightMedium,
          sizeLarge: heightLarge,
          sizeHuge: heightHuge,
          color: primaryColor,
          opacitySpinning: opacityDisabled
        };
      }
      const spinLight = {
        name: "Spin",
        common: derived,
        self: self$m
      };
      const spinDark = {
        name: "Spin",
        common: derived$1,
        self: self$m
      };
      function self$l(vars) {
        const {
          textColor2,
          textColor3,
          fontSize: fontSize2,
          fontWeight
        } = vars;
        return {
          labelFontSize: fontSize2,
          labelFontWeight: fontWeight,
          valueFontWeight: fontWeight,
          valueFontSize: "24px",
          labelTextColor: textColor3,
          valuePrefixTextColor: textColor2,
          valueSuffixTextColor: textColor2,
          valueTextColor: textColor2
        };
      }
      const statisticLight = {
        name: "Statistic",
        common: derived,
        self: self$l
      };
      const statisticDark = {
        name: "Statistic",
        common: derived$1,
        self: self$l
      };
      const commonVariables$2 = {
        stepHeaderFontSizeSmall: "14px",
        stepHeaderFontSizeMedium: "16px",
        indicatorIndexFontSizeSmall: "14px",
        indicatorIndexFontSizeMedium: "16px",
        indicatorSizeSmall: "22px",
        indicatorSizeMedium: "28px",
        indicatorIconSizeSmall: "14px",
        indicatorIconSizeMedium: "18px"
      };
      function self$k(vars) {
        const {
          fontWeightStrong,
          baseColor,
          textColorDisabled,
          primaryColor,
          errorColor,
          textColor1,
          textColor2
        } = vars;
        return Object.assign(Object.assign({}, commonVariables$2), {
          stepHeaderFontWeight: fontWeightStrong,
          indicatorTextColorProcess: baseColor,
          indicatorTextColorWait: textColorDisabled,
          indicatorTextColorFinish: primaryColor,
          indicatorTextColorError: errorColor,
          indicatorBorderColorProcess: primaryColor,
          indicatorBorderColorWait: textColorDisabled,
          indicatorBorderColorFinish: primaryColor,
          indicatorBorderColorError: errorColor,
          indicatorColorProcess: primaryColor,
          indicatorColorWait: "#0000",
          indicatorColorFinish: "#0000",
          indicatorColorError: "#0000",
          splitorColorProcess: textColorDisabled,
          splitorColorWait: textColorDisabled,
          splitorColorFinish: primaryColor,
          splitorColorError: textColorDisabled,
          headerTextColorProcess: textColor1,
          headerTextColorWait: textColorDisabled,
          headerTextColorFinish: textColorDisabled,
          headerTextColorError: errorColor,
          descriptionTextColorProcess: textColor2,
          descriptionTextColorWait: textColorDisabled,
          descriptionTextColorFinish: textColorDisabled,
          descriptionTextColorError: errorColor
        });
      }
      const stepsLight = {
        name: "Steps",
        common: derived,
        self: self$k
      };
      const stepsDark = {
        name: "Steps",
        common: derived$1,
        self: self$k
      };
      const commonVars$1 = {
        buttonHeightSmall: "14px",
        buttonHeightMedium: "18px",
        buttonHeightLarge: "22px",
        buttonWidthSmall: "14px",
        buttonWidthMedium: "18px",
        buttonWidthLarge: "22px",
        buttonWidthPressedSmall: "20px",
        buttonWidthPressedMedium: "24px",
        buttonWidthPressedLarge: "28px",
        railHeightSmall: "18px",
        railHeightMedium: "22px",
        railHeightLarge: "26px",
        railWidthSmall: "32px",
        railWidthMedium: "40px",
        railWidthLarge: "48px"
      };
      const switchDark = {
        name: "Switch",
        common: derived$1,
        self(vars) {
          const {
            primaryColorSuppl,
            opacityDisabled,
            borderRadius,
            primaryColor,
            textColor2,
            baseColor
          } = vars;
          const railOverlayColor = "rgba(255, 255, 255, .20)";
          return Object.assign(Object.assign({}, commonVars$1), {
            iconColor: baseColor,
            textColor: textColor2,
            loadingColor: primaryColorSuppl,
            opacityDisabled,
            railColor: railOverlayColor,
            railColorActive: primaryColorSuppl,
            buttonBoxShadow: "0px 2px 4px 0 rgba(0, 0, 0, 0.4)",
            buttonColor: "#FFF",
            railBorderRadiusSmall: borderRadius,
            railBorderRadiusMedium: borderRadius,
            railBorderRadiusLarge: borderRadius,
            buttonBorderRadiusSmall: borderRadius,
            buttonBorderRadiusMedium: borderRadius,
            buttonBorderRadiusLarge: borderRadius,
            boxShadowFocus: `0 0 8px 0 ${changeColor(primaryColor, {
            alpha: 0.3
          })}`
          });
        }
      };
      function self$j(vars) {
        const {
          primaryColor,
          opacityDisabled,
          borderRadius,
          textColor3
        } = vars;
        const railOverlayColor = "rgba(0, 0, 0, .14)";
        return Object.assign(Object.assign({}, commonVars$1), {
          iconColor: textColor3,
          textColor: "white",
          loadingColor: primaryColor,
          opacityDisabled,
          railColor: railOverlayColor,
          railColorActive: primaryColor,
          buttonBoxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)",
          buttonColor: "#FFF",
          railBorderRadiusSmall: borderRadius,
          railBorderRadiusMedium: borderRadius,
          railBorderRadiusLarge: borderRadius,
          buttonBorderRadiusSmall: borderRadius,
          buttonBorderRadiusMedium: borderRadius,
          buttonBorderRadiusLarge: borderRadius,
          boxShadowFocus: `0 0 0 2px ${changeColor(primaryColor, {
          alpha: 0.2
        })}`
        });
      }
      const switchLight = {
        name: "Switch",
        common: derived,
        self: self$j
      };
      const sizeVariables$2 = {
        thPaddingSmall: "6px",
        thPaddingMedium: "12px",
        thPaddingLarge: "12px",
        tdPaddingSmall: "6px",
        tdPaddingMedium: "12px",
        tdPaddingLarge: "12px"
      };
      function self$i(vars) {
        const {
          dividerColor,
          cardColor,
          modalColor,
          popoverColor,
          tableHeaderColor,
          tableColorStriped,
          textColor1,
          textColor2,
          borderRadius,
          fontWeightStrong,
          lineHeight: lineHeight2,
          fontSizeSmall,
          fontSizeMedium,
          fontSizeLarge
        } = vars;
        return Object.assign(Object.assign({}, sizeVariables$2), {
          fontSizeSmall,
          fontSizeMedium,
          fontSizeLarge,
          lineHeight: lineHeight2,
          borderRadius,
          borderColor: composite(cardColor, dividerColor),
          borderColorModal: composite(modalColor, dividerColor),
          borderColorPopover: composite(popoverColor, dividerColor),
          tdColor: cardColor,
          tdColorModal: modalColor,
          tdColorPopover: popoverColor,
          tdColorStriped: composite(cardColor, tableColorStriped),
          tdColorStripedModal: composite(modalColor, tableColorStriped),
          tdColorStripedPopover: composite(popoverColor, tableColorStriped),
          thColor: composite(cardColor, tableHeaderColor),
          thColorModal: composite(modalColor, tableHeaderColor),
          thColorPopover: composite(popoverColor, tableHeaderColor),
          thTextColor: textColor1,
          tdTextColor: textColor2,
          thFontWeight: fontWeightStrong
        });
      }
      const tableLight = {
        name: "Table",
        common: derived,
        self: self$i
      };
      const tableDark = {
        name: "Table",
        common: derived$1,
        self: self$i
      };
      const sizeVariables$1 = {
        tabFontSizeSmall: "14px",
        tabFontSizeMedium: "14px",
        tabFontSizeLarge: "16px",
        tabGapSmallLine: "36px",
        tabGapMediumLine: "36px",
        tabGapLargeLine: "36px",
        tabGapSmallLineVertical: "8px",
        tabGapMediumLineVertical: "8px",
        tabGapLargeLineVertical: "8px",
        tabPaddingSmallLine: "6px 0",
        tabPaddingMediumLine: "10px 0",
        tabPaddingLargeLine: "14px 0",
        tabPaddingVerticalSmallLine: "6px 12px",
        tabPaddingVerticalMediumLine: "8px 16px",
        tabPaddingVerticalLargeLine: "10px 20px",
        tabGapSmallBar: "36px",
        tabGapMediumBar: "36px",
        tabGapLargeBar: "36px",
        tabGapSmallBarVertical: "8px",
        tabGapMediumBarVertical: "8px",
        tabGapLargeBarVertical: "8px",
        tabPaddingSmallBar: "4px 0",
        tabPaddingMediumBar: "6px 0",
        tabPaddingLargeBar: "10px 0",
        tabPaddingVerticalSmallBar: "6px 12px",
        tabPaddingVerticalMediumBar: "8px 16px",
        tabPaddingVerticalLargeBar: "10px 20px",
        tabGapSmallCard: "4px",
        tabGapMediumCard: "4px",
        tabGapLargeCard: "4px",
        tabGapSmallCardVertical: "4px",
        tabGapMediumCardVertical: "4px",
        tabGapLargeCardVertical: "4px",
        tabPaddingSmallCard: "8px 16px",
        tabPaddingMediumCard: "10px 20px",
        tabPaddingLargeCard: "12px 24px",
        tabPaddingSmallSegment: "4px 0",
        tabPaddingMediumSegment: "6px 0",
        tabPaddingLargeSegment: "8px 0",
        tabPaddingVerticalLargeSegment: "0 8px",
        tabPaddingVerticalSmallCard: "8px 12px",
        tabPaddingVerticalMediumCard: "10px 16px",
        tabPaddingVerticalLargeCard: "12px 20px",
        tabPaddingVerticalSmallSegment: "0 4px",
        tabPaddingVerticalMediumSegment: "0 6px",
        tabGapSmallSegment: "0",
        tabGapMediumSegment: "0",
        tabGapLargeSegment: "0",
        tabGapSmallSegmentVertical: "0",
        tabGapMediumSegmentVertical: "0",
        tabGapLargeSegmentVertical: "0",
        panePaddingSmall: "8px 0 0 0",
        panePaddingMedium: "12px 0 0 0",
        panePaddingLarge: "16px 0 0 0",
        closeSize: "18px",
        closeIconSize: "14px"
      };
      function self$h(vars) {
        const {
          textColor2,
          primaryColor,
          textColorDisabled,
          closeIconColor,
          closeIconColorHover,
          closeIconColorPressed,
          closeColorHover,
          closeColorPressed,
          tabColor,
          baseColor,
          dividerColor,
          fontWeight,
          textColor1,
          borderRadius,
          fontSize: fontSize2,
          fontWeightStrong
        } = vars;
        return Object.assign(Object.assign({}, sizeVariables$1), {
          colorSegment: tabColor,
          tabFontSizeCard: fontSize2,
          tabTextColorLine: textColor1,
          tabTextColorActiveLine: primaryColor,
          tabTextColorHoverLine: primaryColor,
          tabTextColorDisabledLine: textColorDisabled,
          tabTextColorSegment: textColor1,
          tabTextColorActiveSegment: textColor2,
          tabTextColorHoverSegment: textColor2,
          tabTextColorDisabledSegment: textColorDisabled,
          tabTextColorBar: textColor1,
          tabTextColorActiveBar: primaryColor,
          tabTextColorHoverBar: primaryColor,
          tabTextColorDisabledBar: textColorDisabled,
          tabTextColorCard: textColor1,
          tabTextColorHoverCard: textColor1,
          tabTextColorActiveCard: primaryColor,
          tabTextColorDisabledCard: textColorDisabled,
          barColor: primaryColor,
          closeIconColor,
          closeIconColorHover,
          closeIconColorPressed,
          closeColorHover,
          closeColorPressed,
          closeBorderRadius: borderRadius,
          tabColor,
          tabColorSegment: baseColor,
          tabBorderColor: dividerColor,
          tabFontWeightActive: fontWeight,
          tabFontWeight: fontWeight,
          tabBorderRadius: borderRadius,
          paneTextColor: textColor2,
          fontWeightStrong
        });
      }
      const tabsLight = {
        name: "Tabs",
        common: derived,
        self: self$h
      };
      const tabsDark = {
        name: "Tabs",
        common: derived$1,
        self(vars) {
          const commonSelf = self$h(vars);
          const {
            inputColor
          } = vars;
          commonSelf.colorSegment = inputColor;
          commonSelf.tabColorSegment = inputColor;
          return commonSelf;
        }
      };
      function self$g(vars) {
        const {
          textColor1,
          textColor2,
          fontWeightStrong,
          fontSize: fontSize2
        } = vars;
        return {
          fontSize: fontSize2,
          titleTextColor: textColor1,
          textColor: textColor2,
          titleFontWeight: fontWeightStrong
        };
      }
      const thingLight = {
        name: "Thing",
        common: derived,
        self: self$g
      };
      const thingDark = {
        name: "Thing",
        common: derived$1,
        self: self$g
      };
      const sizeVariables = {
        titleMarginMedium: "0 0 6px 0",
        titleMarginLarge: "-2px 0 6px 0",
        titleFontSizeMedium: "14px",
        titleFontSizeLarge: "16px",
        iconSizeMedium: "14px",
        iconSizeLarge: "14px"
      };
      const timelineDark = {
        name: "Timeline",
        common: derived$1,
        self(vars) {
          const {
            textColor3,
            infoColorSuppl,
            errorColorSuppl,
            successColorSuppl,
            warningColorSuppl,
            textColor1,
            textColor2,
            railColor,
            fontWeightStrong,
            fontSize: fontSize2
          } = vars;
          return Object.assign(Object.assign({}, sizeVariables), {
            contentFontSize: fontSize2,
            titleFontWeight: fontWeightStrong,
            circleBorder: `2px solid ${textColor3}`,
            circleBorderInfo: `2px solid ${infoColorSuppl}`,
            circleBorderError: `2px solid ${errorColorSuppl}`,
            circleBorderSuccess: `2px solid ${successColorSuppl}`,
            circleBorderWarning: `2px solid ${warningColorSuppl}`,
            iconColor: textColor3,
            iconColorInfo: infoColorSuppl,
            iconColorError: errorColorSuppl,
            iconColorSuccess: successColorSuppl,
            iconColorWarning: warningColorSuppl,
            titleTextColor: textColor1,
            contentTextColor: textColor2,
            metaTextColor: textColor3,
            lineColor: railColor
          });
        }
      };
      function self$f(vars) {
        const {
          textColor3,
          infoColor,
          errorColor,
          successColor,
          warningColor,
          textColor1,
          textColor2,
          railColor,
          fontWeightStrong,
          fontSize: fontSize2
        } = vars;
        return Object.assign(Object.assign({}, sizeVariables), {
          contentFontSize: fontSize2,
          titleFontWeight: fontWeightStrong,
          circleBorder: `2px solid ${textColor3}`,
          circleBorderInfo: `2px solid ${infoColor}`,
          circleBorderError: `2px solid ${errorColor}`,
          circleBorderSuccess: `2px solid ${successColor}`,
          circleBorderWarning: `2px solid ${warningColor}`,
          iconColor: textColor3,
          iconColorInfo: infoColor,
          iconColorError: errorColor,
          iconColorSuccess: successColor,
          iconColorWarning: warningColor,
          titleTextColor: textColor1,
          contentTextColor: textColor2,
          metaTextColor: textColor3,
          lineColor: railColor
        });
      }
      const timelineLight = {
        name: "Timeline",
        common: derived,
        self: self$f
      };
      const commonVariables$1 = {
        extraFontSizeSmall: "12px",
        extraFontSizeMedium: "12px",
        extraFontSizeLarge: "14px",
        titleFontSizeSmall: "14px",
        titleFontSizeMedium: "16px",
        titleFontSizeLarge: "16px",
        closeSize: "20px",
        closeIconSize: "16px",
        headerHeightSmall: "44px",
        headerHeightMedium: "44px",
        headerHeightLarge: "50px"
      };
      const transferDark$1 = {
        name: "Transfer",
        common: derived$1,
        peers: {
          Checkbox: checkboxDark,
          Scrollbar: scrollbarDark,
          Input: inputDark,
          Empty: emptyDark,
          Button: buttonDark
        },
        self(vars) {
          const {
            fontWeight,
            fontSizeLarge,
            fontSizeMedium,
            fontSizeSmall,
            heightLarge,
            heightMedium,
            borderRadius,
            inputColor,
            tableHeaderColor,
            textColor1,
            textColorDisabled,
            textColor2,
            textColor3,
            hoverColor,
            closeColorHover,
            closeColorPressed,
            closeIconColor,
            closeIconColorHover,
            closeIconColorPressed,
            dividerColor
          } = vars;
          return Object.assign(Object.assign({}, commonVariables$1), {
            itemHeightSmall: heightMedium,
            itemHeightMedium: heightMedium,
            itemHeightLarge: heightLarge,
            fontSizeSmall,
            fontSizeMedium,
            fontSizeLarge,
            borderRadius,
            dividerColor,
            borderColor: "#0000",
            listColor: inputColor,
            headerColor: tableHeaderColor,
            titleTextColor: textColor1,
            titleTextColorDisabled: textColorDisabled,
            extraTextColor: textColor3,
            extraTextColorDisabled: textColorDisabled,
            itemTextColor: textColor2,
            itemTextColorDisabled: textColorDisabled,
            itemColorPending: hoverColor,
            titleFontWeight: fontWeight,
            closeColorHover,
            closeColorPressed,
            closeIconColor,
            closeIconColorHover,
            closeIconColorPressed
          });
        }
      };
      function self$e(vars) {
        const {
          fontWeight,
          fontSizeLarge,
          fontSizeMedium,
          fontSizeSmall,
          heightLarge,
          heightMedium,
          borderRadius,
          cardColor,
          tableHeaderColor,
          textColor1,
          textColorDisabled,
          textColor2,
          textColor3,
          borderColor,
          hoverColor,
          closeColorHover,
          closeColorPressed,
          closeIconColor,
          closeIconColorHover,
          closeIconColorPressed
        } = vars;
        return Object.assign(Object.assign({}, commonVariables$1), {
          itemHeightSmall: heightMedium,
          itemHeightMedium: heightMedium,
          itemHeightLarge: heightLarge,
          fontSizeSmall,
          fontSizeMedium,
          fontSizeLarge,
          borderRadius,
          dividerColor: borderColor,
          borderColor,
          listColor: cardColor,
          headerColor: composite(cardColor, tableHeaderColor),
          titleTextColor: textColor1,
          titleTextColorDisabled: textColorDisabled,
          extraTextColor: textColor3,
          extraTextColorDisabled: textColorDisabled,
          itemTextColor: textColor2,
          itemTextColorDisabled: textColorDisabled,
          itemColorPending: hoverColor,
          titleFontWeight: fontWeight,
          closeColorHover,
          closeColorPressed,
          closeIconColor,
          closeIconColorHover,
          closeIconColorPressed
        });
      }
      const transferLight$1 = createTheme({
        name: "Transfer",
        common: derived,
        peers: {
          Checkbox: checkboxLight,
          Scrollbar: scrollbarLight,
          Input: inputLight,
          Empty: emptyLight,
          Button: buttonLight
        },
        self: self$e
      });
      function self$d(vars) {
        const {
          borderRadiusSmall,
          dividerColor,
          hoverColor,
          pressedColor,
          primaryColor,
          textColor3,
          textColor2,
          textColorDisabled,
          fontSize: fontSize2
        } = vars;
        return {
          fontSize: fontSize2,
          lineHeight: "1.5",
          nodeHeight: "30px",
          nodeWrapperPadding: "3px 0",
          nodeBorderRadius: borderRadiusSmall,
          nodeColorHover: hoverColor,
          nodeColorPressed: pressedColor,
          nodeColorActive: changeColor(primaryColor, {
            alpha: 0.1
          }),
          arrowColor: textColor3,
          nodeTextColor: textColor2,
          nodeTextColorDisabled: textColorDisabled,
          loadingColor: primaryColor,
          dropMarkColor: primaryColor,
          lineColor: dividerColor
        };
      }
      const treeLight = createTheme({
        name: "Tree",
        common: derived,
        peers: {
          Checkbox: checkboxLight,
          Scrollbar: scrollbarLight,
          Empty: emptyLight
        },
        self: self$d
      });
      const treeDark = {
        name: "Tree",
        common: derived$1,
        peers: {
          Checkbox: checkboxDark,
          Scrollbar: scrollbarDark,
          Empty: emptyDark
        },
        self(vars) {
          const {
            primaryColor
          } = vars;
          const commonSelf = self$d(vars);
          commonSelf.nodeColorActive = changeColor(primaryColor, {
            alpha: 0.15
          });
          return commonSelf;
        }
      };
      const treeSelectDark = {
        name: "TreeSelect",
        common: derived$1,
        peers: {
          Tree: treeDark,
          Empty: emptyDark,
          InternalSelection: internalSelectionDark
        }
      };
      function self$c(vars) {
        const {
          popoverColor,
          boxShadow2,
          borderRadius,
          heightMedium,
          dividerColor,
          textColor2
        } = vars;
        return {
          menuPadding: "4px",
          menuColor: popoverColor,
          menuBoxShadow: boxShadow2,
          menuBorderRadius: borderRadius,
          menuHeight: `calc(${heightMedium} * 7.6)`,
          actionDividerColor: dividerColor,
          actionTextColor: textColor2,
          actionPadding: "8px 12px"
        };
      }
      const treeSelectLight = createTheme({
        name: "TreeSelect",
        common: derived,
        peers: {
          Tree: treeLight,
          Empty: emptyLight,
          InternalSelection: internalSelectionLight
        },
        self: self$c
      });
      const commonVars = {
        headerFontSize1: "30px",
        headerFontSize2: "22px",
        headerFontSize3: "18px",
        headerFontSize4: "16px",
        headerFontSize5: "16px",
        headerFontSize6: "16px",
        headerMargin1: "28px 0 20px 0",
        headerMargin2: "28px 0 20px 0",
        headerMargin3: "28px 0 20px 0",
        headerMargin4: "28px 0 18px 0",
        headerMargin5: "28px 0 18px 0",
        headerMargin6: "28px 0 18px 0",
        headerPrefixWidth1: "16px",
        headerPrefixWidth2: "16px",
        headerPrefixWidth3: "12px",
        headerPrefixWidth4: "12px",
        headerPrefixWidth5: "12px",
        headerPrefixWidth6: "12px",
        headerBarWidth1: "4px",
        headerBarWidth2: "4px",
        headerBarWidth3: "3px",
        headerBarWidth4: "3px",
        headerBarWidth5: "3px",
        headerBarWidth6: "3px",
        pMargin: "16px 0 16px 0",
        liMargin: ".25em 0 0 0",
        olPadding: "0 0 0 2em",
        ulPadding: "0 0 0 2em"
      };
      function self$b(vars) {
        const {
          primaryColor,
          textColor2,
          borderColor,
          lineHeight: lineHeight2,
          fontSize: fontSize2,
          borderRadiusSmall,
          dividerColor,
          fontWeightStrong,
          textColor1,
          textColor3,
          infoColor,
          warningColor,
          errorColor,
          successColor,
          codeColor
        } = vars;
        return Object.assign(Object.assign({}, commonVars), {
          aTextColor: primaryColor,
          blockquoteTextColor: textColor2,
          blockquotePrefixColor: borderColor,
          blockquoteLineHeight: lineHeight2,
          blockquoteFontSize: fontSize2,
          codeBorderRadius: borderRadiusSmall,
          liTextColor: textColor2,
          liLineHeight: lineHeight2,
          liFontSize: fontSize2,
          hrColor: dividerColor,
          headerFontWeight: fontWeightStrong,
          headerTextColor: textColor1,
          pTextColor: textColor2,
          pTextColor1Depth: textColor1,
          pTextColor2Depth: textColor2,
          pTextColor3Depth: textColor3,
          pLineHeight: lineHeight2,
          pFontSize: fontSize2,
          headerBarColor: primaryColor,
          headerBarColorPrimary: primaryColor,
          headerBarColorInfo: infoColor,
          headerBarColorError: errorColor,
          headerBarColorWarning: warningColor,
          headerBarColorSuccess: successColor,
          textColor: textColor2,
          textColor1Depth: textColor1,
          textColor2Depth: textColor2,
          textColor3Depth: textColor3,
          textColorPrimary: primaryColor,
          textColorInfo: infoColor,
          textColorSuccess: successColor,
          textColorWarning: warningColor,
          textColorError: errorColor,
          codeTextColor: textColor2,
          codeColor,
          codeBorder: "1px solid #0000"
        });
      }
      const typographyLight = {
        name: "Typography",
        common: derived,
        self: self$b
      };
      const typographyDark = {
        name: "Typography",
        common: derived$1,
        self: self$b
      };
      function self$a(vars) {
        const {
          iconColor,
          primaryColor,
          errorColor,
          textColor2,
          successColor,
          opacityDisabled,
          actionColor,
          borderColor,
          hoverColor,
          lineHeight: lineHeight2,
          borderRadius,
          fontSize: fontSize2
        } = vars;
        return {
          fontSize: fontSize2,
          lineHeight: lineHeight2,
          borderRadius,
          draggerColor: actionColor,
          draggerBorder: `1px dashed ${borderColor}`,
          draggerBorderHover: `1px dashed ${primaryColor}`,
          itemColorHover: hoverColor,
          itemColorHoverError: changeColor(errorColor, {
            alpha: 0.06
          }),
          itemTextColor: textColor2,
          itemTextColorError: errorColor,
          itemTextColorSuccess: successColor,
          itemIconColor: iconColor,
          itemDisabledOpacity: opacityDisabled,
          itemBorderImageCardError: `1px solid ${errorColor}`,
          itemBorderImageCard: `1px solid ${borderColor}`
        };
      }
      const uploadLight = createTheme({
        name: "Upload",
        common: derived,
        peers: {
          Button: buttonLight,
          Progress: progressLight
        },
        self: self$a
      });
      const uploadDark = {
        name: "Upload",
        common: derived$1,
        peers: {
          Button: buttonDark,
          Progress: progressDark
        },
        self(vars) {
          const {
            errorColor
          } = vars;
          const commonSelf = self$a(vars);
          commonSelf.itemColorHoverError = changeColor(errorColor, {
            alpha: 0.09
          });
          return commonSelf;
        }
      };
      const watermarkDark = {
        name: "Watermark",
        common: derived$1,
        self(vars) {
          const {
            fontFamily: fontFamily2
          } = vars;
          return {
            fontFamily: fontFamily2
          };
        }
      };
      const watermarkLight = createTheme({
        name: "Watermark",
        common: derived,
        self(vars) {
          const {
            fontFamily: fontFamily2
          } = vars;
          return {
            fontFamily: fontFamily2
          };
        }
      });
      const rowLight = {
        name: "Row",
        common: derived
      };
      const rowDark = {
        name: "Row",
        common: derived$1
      };
      function self$9(vars) {
        const {
          popoverColor,
          dividerColor,
          borderRadius
        } = vars;
        return {
          color: popoverColor,
          buttonBorderColor: dividerColor,
          borderRadiusSquare: borderRadius,
          boxShadow: "0 2px 8px 0px rgba(0, 0, 0, .12)"
        };
      }
      const themeLight$3 = {
        name: "FloatButtonGroup",
        common: derived,
        self: self$9
      };
      const floatButtonDark = {
        name: "FloatButton",
        common: derived$1,
        self(vars) {
          const {
            popoverColor,
            textColor2,
            buttonColor2Hover,
            buttonColor2Pressed,
            primaryColor,
            primaryColorHover,
            primaryColorPressed,
            baseColor,
            borderRadius
          } = vars;
          return {
            color: popoverColor,
            textColor: textColor2,
            boxShadow: "0 2px 8px 0px rgba(0, 0, 0, .12)",
            boxShadowHover: "0 2px 12px 0px rgba(0, 0, 0, .18)",
            boxShadowPressed: "0 2px 12px 0px rgba(0, 0, 0, .18)",
            colorHover: buttonColor2Hover,
            colorPressed: buttonColor2Pressed,
            colorPrimary: primaryColor,
            colorPrimaryHover: primaryColorHover,
            colorPrimaryPressed: primaryColorPressed,
            textColorPrimary: baseColor,
            borderRadiusSquare: borderRadius
          };
        }
      };
      function self$8(vars) {
        const {
          popoverColor,
          textColor2,
          buttonColor2Hover,
          buttonColor2Pressed,
          primaryColor,
          primaryColorHover,
          primaryColorPressed,
          borderRadius
        } = vars;
        return {
          color: popoverColor,
          colorHover: buttonColor2Hover,
          colorPressed: buttonColor2Pressed,
          colorPrimary: primaryColor,
          colorPrimaryHover: primaryColorHover,
          colorPrimaryPressed: primaryColorPressed,
          textColor: textColor2,
          boxShadow: "0 2px 8px 0px rgba(0, 0, 0, .16)",
          boxShadowHover: "0 2px 12px 0px rgba(0, 0, 0, .24)",
          boxShadowPressed: "0 2px 12px 0px rgba(0, 0, 0, .24)",
          textColorPrimary: "#fff",
          borderRadiusSquare: borderRadius
        };
      }
      const themeLight$2 = {
        name: "FloatButton",
        common: derived,
        self: self$8
      };
      function self$7(vars) {
        const {
          primaryColor,
          baseColor
        } = vars;
        return {
          color: primaryColor,
          iconColor: baseColor
        };
      }
      const iconWrapperLight = {
        name: "IconWrapper",
        common: derived,
        self: self$7
      };
      const iconDark = {
        name: "IconWrapper",
        common: derived$1,
        self: self$7
      };
      function self$6() {
        return {
          toolbarIconColor: "rgba(255, 255, 255, .9)",
          toolbarColor: "rgba(0, 0, 0, .35)",
          toolbarBoxShadow: "none",
          toolbarBorderRadius: "24px"
        };
      }
      const imageLight = createTheme({
        name: "Image",
        common: derived,
        peers: {
          Tooltip: tooltipLight
        },
        self: self$6
      });
      const imageDark = {
        name: "Image",
        common: derived$1,
        peers: {
          Tooltip: tooltipDark
        },
        self: (vars) => {
          const {
            textColor2
          } = vars;
          return {
            toolbarIconColor: textColor2,
            toolbarColor: "rgba(0, 0, 0, .35)",
            toolbarBoxShadow: "none",
            toolbarBorderRadius: "24px"
          };
        }
      };
      const commonVariables = {
        extraFontSize: "12px",
        width: "440px"
      };
      const transferDark = {
        name: "Transfer",
        common: derived$1,
        peers: {
          Checkbox: checkboxDark,
          Scrollbar: scrollbarDark,
          Input: inputDark,
          Empty: emptyDark,
          Button: buttonDark
        },
        self(vars) {
          const {
            iconColorDisabled,
            iconColor,
            fontWeight,
            fontSizeLarge,
            fontSizeMedium,
            fontSizeSmall,
            heightLarge,
            heightMedium,
            heightSmall,
            borderRadius,
            inputColor,
            tableHeaderColor,
            textColor1,
            textColorDisabled,
            textColor2,
            hoverColor
          } = vars;
          return Object.assign(Object.assign({}, commonVariables), {
            itemHeightSmall: heightSmall,
            itemHeightMedium: heightMedium,
            itemHeightLarge: heightLarge,
            fontSizeSmall,
            fontSizeMedium,
            fontSizeLarge,
            borderRadius,
            borderColor: "#0000",
            listColor: inputColor,
            headerColor: tableHeaderColor,
            titleTextColor: textColor1,
            titleTextColorDisabled: textColorDisabled,
            extraTextColor: textColor2,
            filterDividerColor: "#0000",
            itemTextColor: textColor2,
            itemTextColorDisabled: textColorDisabled,
            itemColorPending: hoverColor,
            titleFontWeight: fontWeight,
            iconColor,
            iconColorDisabled
          });
        }
      };
      function self$5(vars) {
        const {
          fontWeight,
          iconColorDisabled,
          iconColor,
          fontSizeLarge,
          fontSizeMedium,
          fontSizeSmall,
          heightLarge,
          heightMedium,
          heightSmall,
          borderRadius,
          cardColor,
          tableHeaderColor,
          textColor1,
          textColorDisabled,
          textColor2,
          borderColor,
          hoverColor
        } = vars;
        return Object.assign(Object.assign({}, commonVariables), {
          itemHeightSmall: heightSmall,
          itemHeightMedium: heightMedium,
          itemHeightLarge: heightLarge,
          fontSizeSmall,
          fontSizeMedium,
          fontSizeLarge,
          borderRadius,
          borderColor,
          listColor: cardColor,
          headerColor: composite(cardColor, tableHeaderColor),
          titleTextColor: textColor1,
          titleTextColorDisabled: textColorDisabled,
          extraTextColor: textColor2,
          filterDividerColor: borderColor,
          itemTextColor: textColor2,
          itemTextColorDisabled: textColorDisabled,
          itemColorPending: hoverColor,
          titleFontWeight: fontWeight,
          iconColor,
          iconColorDisabled
        });
      }
      const transferLight = createTheme({
        name: "Transfer",
        common: derived,
        peers: {
          Checkbox: checkboxLight,
          Scrollbar: scrollbarLight,
          Input: inputLight,
          Empty: emptyLight,
          Button: buttonLight
        },
        self: self$5
      });
      const qrcodeDark = {
        name: "QrCode",
        common: derived$1,
        self: (vars) => {
          return {
            borderRadius: vars.borderRadius
          };
        }
      };
      function self$4(vars) {
        return {
          borderRadius: vars.borderRadius
        };
      }
      const themeLight$1 = {
        name: "QrCode",
        common: derived,
        self: self$4
      };
      const skeletonDark = {
        name: "Skeleton",
        common: derived$1,
        self(vars) {
          const {
            heightSmall,
            heightMedium,
            heightLarge,
            borderRadius
          } = vars;
          return {
            color: "rgba(255, 255, 255, 0.12)",
            colorEnd: "rgba(255, 255, 255, 0.18)",
            borderRadius,
            heightSmall,
            heightMedium,
            heightLarge
          };
        }
      };
      function self$3(vars) {
        const {
          heightSmall,
          heightMedium,
          heightLarge,
          borderRadius
        } = vars;
        return {
          color: "#eee",
          colorEnd: "#ddd",
          borderRadius,
          heightSmall,
          heightMedium,
          heightLarge
        };
      }
      const skeletonLight = {
        name: "Skeleton",
        common: derived,
        self: self$3
      };
      const splitDark = {
        name: "Split",
        common: derived$1
      };
      function self$2(vars) {
        const {
          primaryColorHover,
          borderColor
        } = vars;
        return {
          resizableTriggerColorHover: primaryColorHover,
          resizableTriggerColor: borderColor
        };
      }
      const themeLight = {
        name: "Split",
        common: derived,
        self: self$2
      };
      const style$2 = cB("switch", `
 height: var(--n-height);
 min-width: var(--n-width);
 vertical-align: middle;
 user-select: none;
 -webkit-user-select: none;
 display: inline-flex;
 outline: none;
 justify-content: center;
 align-items: center;
`, [cE("children-placeholder", `
 height: var(--n-rail-height);
 display: flex;
 flex-direction: column;
 overflow: hidden;
 pointer-events: none;
 visibility: hidden;
 `), cE("rail-placeholder", `
 display: flex;
 flex-wrap: none;
 `), cE("button-placeholder", `
 width: calc(1.75 * var(--n-rail-height));
 height: var(--n-rail-height);
 `), cB("base-loading", `
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 font-size: calc(var(--n-button-width) - 4px);
 color: var(--n-loading-color);
 transition: color .3s var(--n-bezier);
 `, [iconSwitchTransition({
        left: "50%",
        top: "50%",
        originalTransform: "translateX(-50%) translateY(-50%)"
      })]), cE("checked, unchecked", `
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 box-sizing: border-box;
 position: absolute;
 white-space: nowrap;
 top: 0;
 bottom: 0;
 display: flex;
 align-items: center;
 line-height: 1;
 `), cE("checked", `
 right: 0;
 padding-right: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `), cE("unchecked", `
 left: 0;
 justify-content: flex-end;
 padding-left: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `), c$1("&:focus", [cE("rail", `
 box-shadow: var(--n-box-shadow-focus);
 `)]), cM("round", [cE("rail", "border-radius: calc(var(--n-rail-height) / 2);", [cE("button", "border-radius: calc(var(--n-button-height) / 2);")])]), cNotM("disabled", [cNotM("icon", [cM("rubber-band", [cM("pressed", [cE("rail", [cE("button", "max-width: var(--n-button-width-pressed);")])]), cE("rail", [c$1("&:active", [cE("button", "max-width: var(--n-button-width-pressed);")])]), cM("active", [cM("pressed", [cE("rail", [cE("button", "left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));")])]), cE("rail", [c$1("&:active", [cE("button", "left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));")])])])])])]), cM("active", [cE("rail", [cE("button", "left: calc(100% - var(--n-button-width) - var(--n-offset))")])]), cE("rail", `
 overflow: hidden;
 height: var(--n-rail-height);
 min-width: var(--n-rail-width);
 border-radius: var(--n-rail-border-radius);
 cursor: pointer;
 position: relative;
 transition:
 opacity .3s var(--n-bezier),
 background .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 background-color: var(--n-rail-color);
 `, [cE("button-icon", `
 color: var(--n-icon-color);
 transition: color .3s var(--n-bezier);
 font-size: calc(var(--n-button-height) - 4px);
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 display: flex;
 justify-content: center;
 align-items: center;
 line-height: 1;
 `, [iconSwitchTransition()]), cE("button", `
 align-items: center; 
 top: var(--n-offset);
 left: var(--n-offset);
 height: var(--n-button-height);
 width: var(--n-button-width-pressed);
 max-width: var(--n-button-width);
 border-radius: var(--n-button-border-radius);
 background-color: var(--n-button-color);
 box-shadow: var(--n-button-box-shadow);
 box-sizing: border-box;
 cursor: inherit;
 content: "";
 position: absolute;
 transition:
 background-color .3s var(--n-bezier),
 left .3s var(--n-bezier),
 opacity .3s var(--n-bezier),
 max-width .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 `)]), cM("active", [cE("rail", "background-color: var(--n-rail-color-active);")]), cM("loading", [cE("rail", `
 cursor: wait;
 `)]), cM("disabled", [cE("rail", `
 cursor: not-allowed;
 opacity: .5;
 `)])]);
      const switchProps = Object.assign(Object.assign({}, useTheme.props), {
        size: {
          type: String,
          default: "medium"
        },
        value: {
          type: [String, Number, Boolean],
          default: void 0
        },
        loading: Boolean,
        defaultValue: {
          type: [String, Number, Boolean],
          default: false
        },
        disabled: {
          type: Boolean,
          default: void 0
        },
        round: {
          type: Boolean,
          default: true
        },
        "onUpdate:value": [Function, Array],
        onUpdateValue: [Function, Array],
        checkedValue: {
          type: [String, Number, Boolean],
          default: true
        },
        uncheckedValue: {
          type: [String, Number, Boolean],
          default: false
        },
        railStyle: Function,
        rubberBand: {
          type: Boolean,
          default: true
        },
        /** @deprecated */
        onChange: [Function, Array]
      });
      let supportCssMax;
      const NSwitch = vue.defineComponent({
        name: "Switch",
        props: switchProps,
        setup(props) {
          if (supportCssMax === void 0) {
            if (typeof CSS !== "undefined") {
              if (typeof CSS.supports !== "undefined") {
                supportCssMax = CSS.supports("width", "max(1px)");
              } else {
                supportCssMax = false;
              }
            } else {
              supportCssMax = true;
            }
          }
          const {
            mergedClsPrefixRef,
            inlineThemeDisabled
          } = useConfig(props);
          const themeRef = useTheme("Switch", "-switch", style$2, switchLight, props, mergedClsPrefixRef);
          const formItem = useFormItem(props);
          const {
            mergedSizeRef,
            mergedDisabledRef
          } = formItem;
          const uncontrolledValueRef = vue.ref(props.defaultValue);
          const controlledValueRef = vue.toRef(props, "value");
          const mergedValueRef = useMergedState(controlledValueRef, uncontrolledValueRef);
          const checkedRef = vue.computed(() => {
            return mergedValueRef.value === props.checkedValue;
          });
          const pressedRef = vue.ref(false);
          const focusedRef = vue.ref(false);
          const mergedRailStyleRef = vue.computed(() => {
            const {
              railStyle
            } = props;
            if (!railStyle) return void 0;
            return railStyle({
              focused: focusedRef.value,
              checked: checkedRef.value
            });
          });
          function doUpdateValue(value) {
            const {
              "onUpdate:value": _onUpdateValue,
              onChange,
              onUpdateValue
            } = props;
            const {
              nTriggerFormInput,
              nTriggerFormChange
            } = formItem;
            if (_onUpdateValue) call(_onUpdateValue, value);
            if (onUpdateValue) call(onUpdateValue, value);
            if (onChange) call(onChange, value);
            uncontrolledValueRef.value = value;
            nTriggerFormInput();
            nTriggerFormChange();
          }
          function doFocus() {
            const {
              nTriggerFormFocus
            } = formItem;
            nTriggerFormFocus();
          }
          function doBlur() {
            const {
              nTriggerFormBlur
            } = formItem;
            nTriggerFormBlur();
          }
          function handleClick() {
            if (props.loading || mergedDisabledRef.value) return;
            if (mergedValueRef.value !== props.checkedValue) {
              doUpdateValue(props.checkedValue);
            } else {
              doUpdateValue(props.uncheckedValue);
            }
          }
          function handleFocus() {
            focusedRef.value = true;
            doFocus();
          }
          function handleBlur() {
            focusedRef.value = false;
            doBlur();
            pressedRef.value = false;
          }
          function handleKeyup(e) {
            if (props.loading || mergedDisabledRef.value) return;
            if (e.key === " ") {
              if (mergedValueRef.value !== props.checkedValue) {
                doUpdateValue(props.checkedValue);
              } else {
                doUpdateValue(props.uncheckedValue);
              }
              pressedRef.value = false;
            }
          }
          function handleKeydown(e) {
            if (props.loading || mergedDisabledRef.value) return;
            if (e.key === " ") {
              e.preventDefault();
              pressedRef.value = true;
            }
          }
          const cssVarsRef = vue.computed(() => {
            const {
              value: size2
            } = mergedSizeRef;
            const {
              self: {
                opacityDisabled,
                railColor,
                railColorActive,
                buttonBoxShadow,
                buttonColor,
                boxShadowFocus,
                loadingColor,
                textColor,
                iconColor,
                [createKey("buttonHeight", size2)]: buttonHeight,
                [createKey("buttonWidth", size2)]: buttonWidth,
                [createKey("buttonWidthPressed", size2)]: buttonWidthPressed,
                [createKey("railHeight", size2)]: railHeight,
                [createKey("railWidth", size2)]: railWidth,
                [createKey("railBorderRadius", size2)]: railBorderRadius,
                [createKey("buttonBorderRadius", size2)]: buttonBorderRadius
              },
              common: {
                cubicBezierEaseInOut: cubicBezierEaseInOut2
              }
            } = themeRef.value;
            let offset;
            let height;
            let width;
            if (supportCssMax) {
              offset = `calc((${railHeight} - ${buttonHeight}) / 2)`;
              height = `max(${railHeight}, ${buttonHeight})`;
              width = `max(${railWidth}, calc(${railWidth} + ${buttonHeight} - ${railHeight}))`;
            } else {
              offset = pxfy((depx(railHeight) - depx(buttonHeight)) / 2);
              height = pxfy(Math.max(depx(railHeight), depx(buttonHeight)));
              width = depx(railHeight) > depx(buttonHeight) ? railWidth : pxfy(depx(railWidth) + depx(buttonHeight) - depx(railHeight));
            }
            return {
              "--n-bezier": cubicBezierEaseInOut2,
              "--n-button-border-radius": buttonBorderRadius,
              "--n-button-box-shadow": buttonBoxShadow,
              "--n-button-color": buttonColor,
              "--n-button-width": buttonWidth,
              "--n-button-width-pressed": buttonWidthPressed,
              "--n-button-height": buttonHeight,
              "--n-height": height,
              "--n-offset": offset,
              "--n-opacity-disabled": opacityDisabled,
              "--n-rail-border-radius": railBorderRadius,
              "--n-rail-color": railColor,
              "--n-rail-color-active": railColorActive,
              "--n-rail-height": railHeight,
              "--n-rail-width": railWidth,
              "--n-width": width,
              "--n-box-shadow-focus": boxShadowFocus,
              "--n-loading-color": loadingColor,
              "--n-text-color": textColor,
              "--n-icon-color": iconColor
            };
          });
          const themeClassHandle = inlineThemeDisabled ? useThemeClass("switch", vue.computed(() => {
            return mergedSizeRef.value[0];
          }), cssVarsRef, props) : void 0;
          return {
            handleClick,
            handleBlur,
            handleFocus,
            handleKeyup,
            handleKeydown,
            mergedRailStyle: mergedRailStyleRef,
            pressed: pressedRef,
            mergedClsPrefix: mergedClsPrefixRef,
            mergedValue: mergedValueRef,
            checked: checkedRef,
            mergedDisabled: mergedDisabledRef,
            cssVars: inlineThemeDisabled ? void 0 : cssVarsRef,
            themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
            onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
          };
        },
        render() {
          const {
            mergedClsPrefix,
            mergedDisabled,
            checked,
            mergedRailStyle,
            onRender,
            $slots
          } = this;
          onRender === null || onRender === void 0 ? void 0 : onRender();
          const {
            checked: checkedSlot,
            unchecked: uncheckedSlot,
            icon: iconSlot,
            "checked-icon": checkedIconSlot,
            "unchecked-icon": uncheckedIconSlot
          } = $slots;
          const hasIcon = !(isSlotEmpty(iconSlot) && isSlotEmpty(checkedIconSlot) && isSlotEmpty(uncheckedIconSlot));
          return vue.h("div", {
            role: "switch",
            "aria-checked": checked,
            class: [`${mergedClsPrefix}-switch`, this.themeClass, hasIcon && `${mergedClsPrefix}-switch--icon`, checked && `${mergedClsPrefix}-switch--active`, mergedDisabled && `${mergedClsPrefix}-switch--disabled`, this.round && `${mergedClsPrefix}-switch--round`, this.loading && `${mergedClsPrefix}-switch--loading`, this.pressed && `${mergedClsPrefix}-switch--pressed`, this.rubberBand && `${mergedClsPrefix}-switch--rubber-band`],
            tabindex: !this.mergedDisabled ? 0 : void 0,
            style: this.cssVars,
            onClick: this.handleClick,
            onFocus: this.handleFocus,
            onBlur: this.handleBlur,
            onKeyup: this.handleKeyup,
            onKeydown: this.handleKeydown
          }, vue.h("div", {
            class: `${mergedClsPrefix}-switch__rail`,
            "aria-hidden": "true",
            style: mergedRailStyle
          }, resolveWrappedSlot(checkedSlot, (checkedSlotChildren) => resolveWrappedSlot(uncheckedSlot, (uncheckedSlotChildren) => {
            if (checkedSlotChildren || uncheckedSlotChildren) {
              return vue.h("div", {
                "aria-hidden": true,
                class: `${mergedClsPrefix}-switch__children-placeholder`
              }, vue.h("div", {
                class: `${mergedClsPrefix}-switch__rail-placeholder`
              }, vue.h("div", {
                class: `${mergedClsPrefix}-switch__button-placeholder`
              }), checkedSlotChildren), vue.h("div", {
                class: `${mergedClsPrefix}-switch__rail-placeholder`
              }, vue.h("div", {
                class: `${mergedClsPrefix}-switch__button-placeholder`
              }), uncheckedSlotChildren));
            }
            return null;
          })), vue.h("div", {
            class: `${mergedClsPrefix}-switch__button`
          }, resolveWrappedSlot(iconSlot, (icon) => resolveWrappedSlot(checkedIconSlot, (checkedIcon) => resolveWrappedSlot(uncheckedIconSlot, (uncheckedIcon) => {
            return vue.h(NIconSwitchTransition, null, {
              default: () => this.loading ? vue.h(NBaseLoading, {
                key: "loading",
                clsPrefix: mergedClsPrefix,
                strokeWidth: 20
              }) : this.checked && (checkedIcon || icon) ? vue.h("div", {
                class: `${mergedClsPrefix}-switch__button-icon`,
                key: checkedIcon ? "checked-icon" : "icon"
              }, checkedIcon || icon) : !this.checked && (uncheckedIcon || icon) ? vue.h("div", {
                class: `${mergedClsPrefix}-switch__button-icon`,
                key: uncheckedIcon ? "unchecked-icon" : "icon"
              }, uncheckedIcon || icon) : null
            });
          }))), resolveWrappedSlot(checkedSlot, (children) => children && vue.h("div", {
            key: "checked",
            class: `${mergedClsPrefix}-switch__checked`
          }, children)), resolveWrappedSlot(uncheckedSlot, (children) => children && vue.h("div", {
            key: "unchecked",
            class: `${mergedClsPrefix}-switch__unchecked`
          }, children)))));
        }
      });
      const style$1 = cB("h", `
 font-size: var(--n-font-size);
 font-weight: var(--n-font-weight);
 margin: var(--n-margin);
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
`, [c$1("&:first-child", {
        marginTop: 0
      }), cM("prefix-bar", {
        position: "relative",
        paddingLeft: "var(--n-prefix-width)"
      }, [cM("align-text", {
        paddingLeft: 0
      }, [c$1("&::before", {
        left: "calc(-1 * var(--n-prefix-width))"
      })]), c$1("&::before", `
 content: "";
 width: var(--n-bar-width);
 border-radius: calc(var(--n-bar-width) / 2);
 transition: background-color .3s var(--n-bezier);
 left: 0;
 top: 0;
 bottom: 0;
 position: absolute;
 `), c$1("&::before", {
        backgroundColor: "var(--n-bar-color)"
      })])]);
      const headerProps = Object.assign(Object.assign({}, useTheme.props), {
        type: {
          type: String,
          default: "default"
        },
        prefix: String,
        alignText: Boolean
      });
      const createHeader = (level) => vue.defineComponent({
        name: `H${level}`,
        props: headerProps,
        setup(props) {
          const {
            mergedClsPrefixRef,
            inlineThemeDisabled
          } = useConfig(props);
          const themeRef = useTheme("Typography", "-h", style$1, typographyLight, props, mergedClsPrefixRef);
          const cssVarsRef = vue.computed(() => {
            const {
              type
            } = props;
            const {
              common: {
                cubicBezierEaseInOut: cubicBezierEaseInOut2
              },
              self: {
                headerFontWeight,
                headerTextColor,
                [createKey("headerPrefixWidth", level)]: prefixWidth,
                [createKey("headerFontSize", level)]: fontSize2,
                [createKey("headerMargin", level)]: margin,
                [createKey("headerBarWidth", level)]: barWidth,
                [createKey("headerBarColor", type)]: barColor
              }
            } = themeRef.value;
            return {
              "--n-bezier": cubicBezierEaseInOut2,
              "--n-font-size": fontSize2,
              "--n-margin": margin,
              "--n-bar-color": barColor,
              "--n-bar-width": barWidth,
              "--n-font-weight": headerFontWeight,
              "--n-text-color": headerTextColor,
              "--n-prefix-width": prefixWidth
            };
          });
          const themeClassHandle = inlineThemeDisabled ? useThemeClass(`h${level}`, vue.computed(() => props.type[0]), cssVarsRef, props) : void 0;
          return {
            mergedClsPrefix: mergedClsPrefixRef,
            cssVars: inlineThemeDisabled ? void 0 : cssVarsRef,
            themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
            onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
          };
        },
        render() {
          var _a;
          const {
            prefix: prefix2,
            alignText,
            mergedClsPrefix,
            cssVars,
            $slots
          } = this;
          (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
          return vue.h(`h${level}`, {
            class: [`${mergedClsPrefix}-h`, `${mergedClsPrefix}-h${level}`, this.themeClass, {
              [`${mergedClsPrefix}-h--prefix-bar`]: prefix2,
              [`${mergedClsPrefix}-h--align-text`]: alignText
            }],
            style: cssVars
          }, $slots);
        }
      });
      createHeader("1");
      createHeader("2");
      const NH3 = createHeader("3");
      createHeader("4");
      createHeader("5");
      createHeader("6");
      const style = cB("text", `
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
`, [cM("strong", `
 font-weight: var(--n-font-weight-strong);
 `), cM("italic", {
        fontStyle: "italic"
      }), cM("underline", {
        textDecoration: "underline"
      }), cM("code", `
 line-height: 1.4;
 display: inline-block;
 font-family: var(--n-font-famliy-mono);
 transition: 
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 box-sizing: border-box;
 padding: .05em .35em 0 .35em;
 border-radius: var(--n-code-border-radius);
 font-size: .9em;
 color: var(--n-code-text-color);
 background-color: var(--n-code-color);
 border: var(--n-code-border);
 `)]);
      const textProps = Object.assign(Object.assign({}, useTheme.props), {
        code: Boolean,
        type: {
          type: String,
          default: "default"
        },
        delete: Boolean,
        strong: Boolean,
        italic: Boolean,
        underline: Boolean,
        depth: [String, Number],
        tag: String,
        // deprecated
        as: {
          type: String,
          validator: () => {
            return true;
          },
          default: void 0
        }
      });
      const NText = vue.defineComponent({
        name: "Text",
        props: textProps,
        setup(props) {
          const {
            mergedClsPrefixRef,
            inlineThemeDisabled
          } = useConfig(props);
          const themeRef = useTheme("Typography", "-text", style, typographyLight, props, mergedClsPrefixRef);
          const cssVarsRef = vue.computed(() => {
            const {
              depth,
              type
            } = props;
            const textColorKey = type === "default" ? depth === void 0 ? "textColor" : `textColor${depth}Depth` : createKey("textColor", type);
            const {
              common: {
                fontWeightStrong,
                fontFamilyMono,
                cubicBezierEaseInOut: cubicBezierEaseInOut2
              },
              self: {
                codeTextColor,
                codeBorderRadius,
                codeColor,
                codeBorder,
                [textColorKey]: textColor
              }
            } = themeRef.value;
            return {
              "--n-bezier": cubicBezierEaseInOut2,
              "--n-text-color": textColor,
              "--n-font-weight-strong": fontWeightStrong,
              "--n-font-famliy-mono": fontFamilyMono,
              "--n-code-border-radius": codeBorderRadius,
              "--n-code-text-color": codeTextColor,
              "--n-code-color": codeColor,
              "--n-code-border": codeBorder
            };
          });
          const themeClassHandle = inlineThemeDisabled ? useThemeClass("text", vue.computed(() => `${props.type[0]}${props.depth || ""}`), cssVarsRef, props) : void 0;
          return {
            mergedClsPrefix: mergedClsPrefixRef,
            compitableTag: useCompitable(props, ["as", "tag"]),
            cssVars: inlineThemeDisabled ? void 0 : cssVarsRef,
            themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
            onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
          };
        },
        render() {
          var _a, _b, _c;
          const {
            mergedClsPrefix
          } = this;
          (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
          const textClass = [`${mergedClsPrefix}-text`, this.themeClass, {
            [`${mergedClsPrefix}-text--code`]: this.code,
            [`${mergedClsPrefix}-text--delete`]: this.delete,
            [`${mergedClsPrefix}-text--strong`]: this.strong,
            [`${mergedClsPrefix}-text--italic`]: this.italic,
            [`${mergedClsPrefix}-text--underline`]: this.underline
          }];
          const children = (_c = (_b = this.$slots).default) === null || _c === void 0 ? void 0 : _c.call(_b);
          return this.code ? vue.h("code", {
            class: textClass,
            style: this.cssVars
          }, this.delete ? vue.h("del", null, children) : children) : this.delete ? vue.h("del", {
            class: textClass,
            style: this.cssVars
          }, children) : vue.h(this.compitableTag || "span", {
            class: textClass,
            style: this.cssVars
          }, children);
        }
      });
      const self$1 = () => ({});
      const equationLight = {
        name: "Equation",
        common: derived,
        self: self$1
      };
      const equationDark = {
        name: "Equation",
        common: derived$1,
        self: self$1
      };
      const floatButtonGroupDark = {
        name: "FloatButtonGroup",
        common: derived$1,
        self(vars) {
          const {
            popoverColor,
            dividerColor,
            borderRadius
          } = vars;
          return {
            color: popoverColor,
            buttonBorderColor: dividerColor,
            borderRadiusSquare: borderRadius,
            boxShadow: "0 2px 8px 0px rgba(0, 0, 0, .12)"
          };
        }
      };
      const darkTheme = {
        name: "dark",
        common: derived$1,
        Alert: alertDark,
        Anchor: anchorDark,
        AutoComplete: autoCompleteDark,
        Avatar: avatarDark,
        AvatarGroup: avatarGroupDark,
        BackTop: backTopDark,
        Badge: badgeDark,
        Breadcrumb: breadcrumbDark,
        Button: buttonDark,
        ButtonGroup: buttonGroupDark,
        Calendar: calendarDark,
        Card: cardDark,
        Carousel: carouselDark,
        Cascader: cascaderDark,
        Checkbox: checkboxDark,
        Code: codeDark,
        Collapse: collapseDark,
        CollapseTransition: collapseTransitionDark,
        ColorPicker: colorPickerDark,
        DataTable: dataTableDark,
        DatePicker: datePickerDark,
        Descriptions: descriptionsDark,
        Dialog: dialogDark,
        Divider: dividerDark,
        Drawer: drawerDark,
        Dropdown: dropdownDark,
        DynamicInput: dynamicInputDark,
        DynamicTags: dynamicTagsDark,
        Element: elementDark,
        Empty: emptyDark,
        Ellipsis: ellipsisDark,
        Equation: equationDark,
        Flex: flexDark,
        Form: formItemDark,
        GradientText: gradientTextDark,
        Icon: iconDark$1,
        IconWrapper: iconDark,
        Image: imageDark,
        Input: inputDark,
        InputNumber: inputNumberDark,
        LegacyTransfer: transferDark,
        Layout: layoutDark,
        List: listDark$1,
        LoadingBar: loadingBarDark,
        Log: logDark,
        Menu: menuDark,
        Mention: listDark,
        Message: messageDark,
        Modal: modalDark,
        Notification: notificationDark,
        PageHeader: pageHeaderDark,
        Pagination: paginationDark,
        Popconfirm: popconfirmDark,
        Popover: popoverDark,
        Popselect: popselect,
        Progress: progressDark,
        QrCode: qrcodeDark,
        Radio: radioDark,
        Rate: rateDark,
        Result: resultDark,
        Row: rowDark,
        Scrollbar: scrollbarDark,
        Select: selectDark,
        Skeleton: skeletonDark,
        Slider: sliderDark,
        Space: spaceDark,
        Spin: spinDark,
        Statistic: statisticDark,
        Steps: stepsDark,
        Switch: switchDark,
        Table: tableDark,
        Tabs: tabsDark,
        Tag: tagDark,
        Thing: thingDark,
        TimePicker: timePickerDark,
        Timeline: timelineDark,
        Tooltip: tooltipDark,
        Transfer: transferDark$1,
        Tree: treeDark,
        TreeSelect: treeSelectDark,
        Typography: typographyDark,
        Upload: uploadDark,
        Watermark: watermarkDark,
        Split: splitDark,
        FloatButton: floatButtonDark,
        FloatButtonGroup: floatButtonGroupDark
      };
      const lightTheme = {
        name: "light",
        common: derived,
        Alert: alertLight,
        Anchor: anchorLight,
        AutoComplete: autoCompleteLight,
        Avatar: avatarLight,
        AvatarGroup: avatarGroupLight,
        BackTop: backTopLight,
        Badge: badgeLight,
        Breadcrumb: breadcrumbLight,
        Button: buttonLight,
        ButtonGroup: buttonGroupLight,
        Calendar: calendarLight,
        Card: cardLight,
        Carousel: carouselLight,
        Cascader: cascaderLight,
        Checkbox: checkboxLight,
        Code: codeLight,
        Collapse: collapseLight,
        CollapseTransition: collapseTransitionLight,
        ColorPicker: colorPickerLight,
        DataTable: dataTableLight,
        DatePicker: datePickerLight,
        Descriptions: descriptionsLight,
        Dialog: dialogLight,
        Divider: dividerLight,
        Drawer: drawerLight,
        Dropdown: dropdownLight,
        DynamicInput: dynamicInputLight,
        DynamicTags: dynamicTagsLight,
        Element: elementLight,
        Empty: emptyLight,
        Equation: equationLight,
        Ellipsis: ellipsisLight,
        Flex: flexLight,
        Form: formLight,
        GradientText: gradientTextLight,
        Icon: iconLight,
        IconWrapper: iconWrapperLight,
        Image: imageLight,
        Input: inputLight,
        InputNumber: inputNumberLight,
        Layout: layoutLight,
        LegacyTransfer: transferLight,
        List: listLight,
        LoadingBar: loadingBarLight,
        Log: logLight,
        Menu: menuLight,
        Mention: mentionLight,
        Message: messageLight,
        Modal: modalLight,
        Notification: notificationLight,
        PageHeader: pageHeaderLight,
        Pagination: paginationLight,
        Popconfirm: popconfirmLight,
        Popover: popoverLight,
        Popselect: popselectLight,
        Progress: progressLight,
        QrCode: themeLight$1,
        Radio: radioLight,
        Rate: themeLight$4,
        Row: rowLight,
        Result: resultLight,
        Scrollbar: scrollbarLight,
        Skeleton: skeletonLight,
        Select: selectLight,
        Slider: sliderLight,
        Space: spaceLight,
        Spin: spinLight,
        Statistic: statisticLight,
        Steps: stepsLight,
        Switch: switchLight,
        Table: tableLight,
        Tabs: tabsLight,
        Tag: tagLight,
        Thing: thingLight,
        TimePicker: timePickerLight,
        Timeline: timelineLight,
        Tooltip: tooltipLight,
        Transfer: transferLight$1,
        Tree: treeLight,
        TreeSelect: treeSelectLight,
        Typography: typographyLight,
        Upload: uploadLight,
        Watermark: watermarkLight,
        Split: themeLight,
        FloatButton: themeLight$2,
        FloatButtonGroup: themeLight$3
      };
      const _hoisted_1 = { class: "centered-content" };
      const _hoisted_2 = { style: { "display": "flex", "align-items": "center", "width": "100%" } };
      const _sfc_main$1 = {
        __name: "GitHub",
        setup(__props) {
          const store = useStore();
          const proxyUrlList = vue.ref([]);
          const projectFileDownloadUrl = vue.ref(null);
          const bypassDownload = vue.ref(false);
          const clone = vue.ref(true);
          const depth = vue.ref(false);
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
          const onCreate = () => {
            return {
              isCheck: true,
              name: "",
              url: ""
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
              depth: depth.value
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
          return (_ctx, _cache) => {
            return vue.openBlock(), vue.createBlock(vue.unref(NDrawer), {
              show: vue.unref(store).showConfig,
              "onUpdate:show": _cache[6] || (_cache[6] = ($event) => vue.unref(store).showConfig = $event),
              width: 502
            }, {
              default: vue.withCtx(() => [
                vue.createVNode(vue.unref(NDrawerContent), {
                  title: "GitHub加速配置",
                  closable: ""
                }, {
                  default: vue.withCtx(() => [
                    vue.createElementVNode("div", _hoisted_1, [
                      vue.createVNode(vue.unref(NForm), {
                        "label-placement": "left",
                        "label-width": "auto"
                      }, {
                        default: vue.withCtx(() => [
                          vue.createVNode(vue.unref(NH3), null, {
                            default: vue.withCtx(() => [
                              vue.createVNode(vue.unref(NText), { type: "primary" }, {
                                default: vue.withCtx(() => [
                                  vue.createTextVNode(" 负载均衡 ")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          vue.createVNode(vue.unref(NFormItem), null, {
                            default: vue.withCtx(() => [
                              vue.createVNode(vue.unref(NSwitch), {
                                value: bypassDownload.value,
                                "onUpdate:value": _cache[0] || (_cache[0] = ($event) => bypassDownload.value = $event),
                                size: "large",
                                round: false
                              }, {
                                checked: vue.withCtx(() => [
                                  vue.createTextVNode(" 开启 ")
                                ]),
                                unchecked: vue.withCtx(() => [
                                  vue.createTextVNode(" 关闭 ")
                                ]),
                                _: 1
                              }, 8, ["value"])
                            ]),
                            _: 1
                          }),
                          vue.createVNode(vue.unref(NH3), null, {
                            default: vue.withCtx(() => [
                              vue.createVNode(vue.unref(NText), { type: "primary" }, {
                                default: vue.withCtx(() => [
                                  vue.createTextVNode(" 克隆 ")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          vue.createVNode(vue.unref(NFormItem), null, {
                            default: vue.withCtx(() => [
                              vue.createVNode(vue.unref(NSpace), { "item-style": "display: flex;" }, {
                                default: vue.withCtx(() => [
                                  vue.createVNode(vue.unref(NCheckbox), {
                                    size: "large",
                                    checked: clone.value,
                                    "onUpdate:checked": [
                                      _cache[1] || (_cache[1] = ($event) => clone.value = $event),
                                      handleUpdateCloneValue
                                    ],
                                    label: "git clone"
                                  }, null, 8, ["checked"]),
                                  vue.createVNode(vue.unref(NCheckbox), {
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
                          vue.createVNode(vue.unref(NH3), null, {
                            default: vue.withCtx(() => [
                              vue.createVNode(vue.unref(NText), { type: "primary" }, {
                                default: vue.withCtx(() => [
                                  vue.createTextVNode(" 列表文件加速 ")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          vue.createVNode(vue.unref(NFormItem), null, {
                            default: vue.withCtx(() => [
                              vue.createVNode(vue.unref(NSelect), {
                                value: projectFileDownloadUrl.value,
                                "onUpdate:value": _cache[3] || (_cache[3] = ($event) => projectFileDownloadUrl.value = $event),
                                options: projectFileUrlList.value,
                                placeholder: "选择加速地址"
                              }, null, 8, ["value", "options"])
                            ]),
                            _: 1
                          }),
                          vue.createVNode(vue.unref(NH3), null, {
                            default: vue.withCtx(() => [
                              vue.createVNode(vue.unref(NText), { type: "primary" }, {
                                default: vue.withCtx(() => [
                                  vue.createTextVNode(" 加速列表 ")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          vue.createVNode(vue.unref(NFormItem), null, {
                            default: vue.withCtx(() => [
                              vue.createVNode(vue.unref(NDynamicInput), {
                                value: proxyUrlList.value,
                                "onUpdate:value": _cache[4] || (_cache[4] = ($event) => proxyUrlList.value = $event),
                                "show-sort-button": "",
                                "on-create": onCreate
                              }, {
                                "create-button-default": vue.withCtx(() => [
                                  vue.createTextVNode(" 添加 ")
                                ]),
                                default: vue.withCtx(({ value }) => [
                                  vue.createElementVNode("div", _hoisted_2, [
                                    vue.createVNode(vue.unref(NCheckbox), {
                                      checked: value.isCheck,
                                      "onUpdate:checked": ($event) => value.isCheck = $event,
                                      style: { "margin-right": "12px" }
                                    }, null, 8, ["checked", "onUpdate:checked"]),
                                    vue.createVNode(vue.unref(NInput), {
                                      class: "mr-2",
                                      value: value.name,
                                      "onUpdate:value": ($event) => value.name = $event,
                                      type: "text",
                                      placeholder: "名称",
                                      style: { "width": "40%" }
                                    }, null, 8, ["value", "onUpdate:value"]),
                                    vue.createVNode(vue.unref(NInput), {
                                      value: value.url,
                                      "onUpdate:value": ($event) => value.url = $event,
                                      type: "text",
                                      placeholder: "加速地址"
                                    }, null, 8, ["value", "onUpdate:value"])
                                  ])
                                ]),
                                _: 1
                              }, 8, ["value"])
                            ]),
                            _: 1
                          }),
                          vue.createVNode(vue.unref(NSpace), { justify: "center" }, {
                            default: vue.withCtx(() => [
                              vue.createVNode(vue.unref(Button), {
                                type: "primary",
                                size: "medium",
                                strong: "",
                                onClick: saveConfig
                              }, {
                                default: vue.withCtx(() => [
                                  vue.createTextVNode(" 保存配置 ")
                                ]),
                                _: 1
                              }),
                              vue.createVNode(vue.unref(Button), {
                                type: "default",
                                size: "medium",
                                strong: "",
                                onClick: _cache[5] || (_cache[5] = ($event) => vue.unref(store).showConfig = false)
                              }, {
                                default: vue.withCtx(() => [
                                  vue.createTextVNode(" 关闭 ")
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
      const currentTheme = vue.ref(lightTheme);
      const updateThemeMode = () => {
        currentTheme.value = mql.matches ? darkTheme : lightTheme;
      };
      const mql = window.matchMedia("(prefers-color-scheme: dark)");
      mql.addEventListener("change", updateThemeMode);
      const initThemeMode = (mode) => {
        if (mode === "dark") {
          currentTheme.value = darkTheme;
        } else if (mode === "auto") {
          updateThemeMode();
        } else {
          currentTheme.value = lightTheme;
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
            return vue.openBlock(), vue.createBlock(vue.unref(NConfigProvider), { theme: vue.unref(currentTheme) }, {
              default: vue.withCtx(() => [
                vue.createVNode(_sfc_main$1)
              ]),
              _: 1
            }, 8, ["theme"]);
          };
        }
      };
      function run() {
        const config = GM_getValue("githubFastConfig");
        const store = useStore();
        GM.registerMenuCommand("加速配置", () => {
          store.showConfig = true;
        });
        var MirrorUrl = pollingUrl();
        if (MirrorUrl.length == 0) {
          return;
        }
        function callback(_mutationList, _observer) {
          new MutationObserver((mutations, self2) => {
            mutations.forEach((mutation) => {
              if (mutation.type == "childList" && mutation.addedNodes.length > 0) {
                mutation.addedNodes.forEach((node) => {
                  if (node.className != void 0 && node.tagName == "TR" && node.className.includes("react-directory-row")) {
                    addListDownBtn($(node));
                  }
                });
              }
            });
          }).observe(document.querySelector("body"), {
            childList: true,
            subtree: true,
            attributes: true
          });
          if (window.location.pathname.split("/")[3] == "releases") {
            if ($('div[class="Box Box--condensed mt-3"]').length > 0) {
              addReleaseList($('div[class="Box Box--condensed mt-3"]'));
            }
            let bodyBox = document.querySelector("body");
            new MutationObserver((mutations, self2) => {
              mutations.forEach((mutation) => {
                if (mutation.type == "childList" && mutation.addedNodes.length > 0) {
                  mutation.addedNodes.forEach((node) => {
                    if (node.className != void 0 && node.className.includes("Box--condensed")) {
                      addReleaseList($(node));
                    }
                  });
                }
              });
            }).observe(bodyBox, { childList: true, subtree: true, attributes: true });
          }
          if (window.location.pathname.split("/")[3] == "blob") {
            addRawBtn();
          } else {
            if ($("#__primerPortalRoot__").length > 0) {
              $(".fast-clone").remove();
              $(".fast-zip").remove();
              addCloneList();
              addDownZipList();
            }
            let bodyBox = document.querySelector("body");
            new MutationObserver((mutations, self2) => {
              mutations.forEach(({ addedNodes, attributeName, target }) => {
                addedNodes.forEach((node) => {
                  if (node.id !== "__primerPortalRoot__") return;
                  let nodeContent = node.innerHTML;
                  if (!nodeContent.includes("Clone using the web URL.")) return;
                  $(".fast-clone").remove();
                  $(".fast-zip").remove();
                  addCloneList();
                  addDownZipList();
                  observeChanges(node);
                });
                if (attributeName == "aria-current" && $(target).attr("aria-current") !== void 0) {
                  $(".fast-clone").remove();
                  if ($(target).attr("aria-keyshortcuts") == "h") {
                    addCloneList();
                  }
                }
              });
            }).observe(bodyBox, { childList: true, subtree: true, attributes: true });
          }
        }
        const observer = new MutationObserver(callback);
        observer.observe(document.querySelector("head"), {
          attributes: true,
          childList: true
        });
        function observeChanges(targetNode) {
          const nodeObserver = new MutationObserver((mutations, self2) => {
            mutations.forEach(({ addedNodes }) => {
              if (addedNodes.length > 0) {
                let hasHttpClone = false;
                let hasDownZipClone = false;
                addedNodes.forEach((node) => {
                  let nodeContent = node.innerHTML;
                  if (nodeContent != void 0 && nodeContent != nodeContent.includes("Clone using the web URL.") && !nodeContent.includes("fast-clone")) {
                    hasHttpClone = true;
                  }
                  if (nodeContent != void 0 && nodeContent != nodeContent.includes("Download ZIP") && !nodeContent.includes("fast-clone")) {
                    hasDownZipClone = true;
                  }
                });
                if (hasHttpClone) {
                  $(".fast-clone").remove();
                  addCloneList();
                }
                if (hasDownZipClone) {
                  $(".fast-zip").remove();
                  addDownZipList();
                }
              }
            });
          });
          nodeObserver.observe(targetNode, { childList: true });
        }
        function addCloneList() {
          var href = window.location.href.split("/");
          var git = href[3] + "/" + href[4] + ".git";
          let inputGit = $("#__primerPortalRoot__").find("input").parent();
          var InputDivClass = inputGit.attr("class");
          var TitleSpanClass = inputGit.parent().find("span:last").attr("class");
          var info = ` <span class="${TitleSpanClass} fast-clone" style="color:palegreen">加速列表</span>`;
          MirrorUrl.forEach((u) => {
            var Url = u.url + "/https://github.com/" + git;
            if (config && config.clone) {
              if (config.depth) {
                Url = "git clone --depth=1 " + Url;
              } else {
                Url = "git clone " + Url;
              }
            }
            info += cloneHtml(InputDivClass, Url);
          });
          function cloneHtml(InputDivClass2, Url) {
            return `
<div class="${InputDivClass2} fast-clone mt-2">
  <input
    type="text"
    class="form-control input-monospace input-sm color-bg-subtle"
    data-autoselect="true"
    aria-label="${Url}"
    readonly=""
    value="${Url}"
    tabindex="0"
    style="flex-grow: 1" />
  <clipboard-copy
    value="${Url}"
    aria-label="Copy url to clipboard"
    class="types__StyledButton-sc-ws60qy-0 eeWJiy ml-1 mr-0 js-clipboard-copy tooltipped-no-delay"
    data-copy-feedback="Copied!"
    data-tooltip-direction="n"
    role="button"
    ><svg
      aria-hidden="true"
      height="16"
      viewBox="0 0 16 16"
      version="1.1"
      width="16"
      data-view-component="true"
      class="octicon octicon-copy js-clipboard-copy-icon d-inline-block">
      <path
        d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path>
      <path
        d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
    </svg>
    <svg
      aria-hidden="true"
      height="16"
      viewBox="0 0 16 16"
      version="1.1"
      width="16"
      data-view-component="true"
      class="octicon octicon-check js-clipboard-check-icon color-fg-success d-inline-block d-sm-none">
      <path
        d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"></path>
    </svg>
  </clipboard-copy>
</div>
           `;
          }
          $("#__primerPortalRoot__").find("input").parent().parent().find("span").filter(function() {
            return $(this).attr("class").includes("Text-sc");
          }).before($(info));
        }
        function addDownZipList() {
          MirrorUrl.forEach((u) => {
            let downZipClone = $("#__primerPortalRoot__").find('ul[role="menu"]:last').find("li:eq(1)").clone();
            downZipClone.addClass("fast-zip");
            var zipPath = downZipClone.find("a").attr("href");
            var Url = u.url + "/https://github.com/" + zipPath;
            var zipText = u.name;
            downZipClone.find("a").attr("href", Url);
            downZipClone.find("span:last").text(`Fast Download Zip [${zipText}]`);
            $("#__primerPortalRoot__").find('ul[role="menu"]:last').append(downZipClone);
          });
        }
        function addReleaseList(target) {
          target.find(".fast-release").remove();
          let releaseLi = target.find("ul").find("li");
          releaseLi.each(function() {
            var releasePath = $(this).find("a:eq(0)").attr("href");
            var urls = new Array();
            MirrorUrl.forEach((u) => {
              var Url = u.url + "/https://github.com" + releasePath;
              urls.push(Url);
            });
            $(this).append(releaseHtml(urls));
          });
          function releaseHtml(urls) {
            var aHtml = "";
            urls.forEach((u, index) => {
              var title = "下载";
              if (urls.length > 1) {
                title = MirrorUrl[index][1];
              }
              aHtml += `<a
    href="${u}"
    rel="nofollow"
    data-turbo="false"
    data-view-component="true"
    class="Truncate ml-1">
    <span data-view-component="true" class="Truncate-text text-bold">${title}</span>
  </a>`;
            });
            return `
        <div data-view-component="true" class="d-flex ml-md-3 fast-release">
  <svg
    t="1668210029451"
    class="icon"
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="2795"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    width="16"
    height="16">
    <path
      d="M508.746667 299.2L485.333333 452.373333a5.333333 5.333333 0 0 0 4 5.973334l217.386667 53.333333a5.333333 5.333333 0 0 1 2.72 8.693333l-184.906667 208.8a5.333333 5.333333 0 0 1-9.28-4.32l23.413334-153.226666a5.333333 5.333333 0 0 0-4-5.973334L317.173333 512a5.333333 5.333333 0 0 1-2.506666-8.48l184.8-208.693333a5.333333 5.333333 0 0 1 9.28 4.373333z m-329.493334 256l271.253334 66.666667a5.333333 5.333333 0 0 1 4 5.973333l-51.04 335.68a5.333333 5.333333 0 0 0 9.226666 4.32l434.773334-490.346667a5.333333 5.333333 0 0 0-2.72-8.693333l-271.253334-66.666667a5.333333 5.333333 0 0 1-4-5.973333l51.04-335.626667a5.333333 5.333333 0 0 0-9.226666-4.373333L176.533333 546.506667a5.333333 5.333333 0 0 0 2.72 8.693333z"
      p-id="2796"
      fill="#57606a"></path>
  </svg>
 ${aHtml}
</div>
        `;
          }
        }
        function addRawBtn() {
          var rawUrl = $('a[data-testid="raw-button"]').attr("href");
          if (rawUrl != void 0) {
            $(".fast-raw").remove();
            MirrorUrl.forEach((u, index) => {
              var url = u.url + "/" + rawUrl;
              var rawCloneBtn = $('a[data-testid="raw-button"]').first().clone();
              rawCloneBtn.addClass("fast-raw");
              rawCloneBtn.text(u.name);
              rawCloneBtn.attr("href", url);
              $('a[data-testid="raw-button"]').eq(index).after(rawCloneBtn);
            });
          }
        }
        function addListDownBtn(target) {
          target.find(".fileDownLink").remove();
          var dLink = target.find('a[class="Link--primary"]').attr("href");
          target.find('div[class="react-directory-filename-column"]').find("svg:first").after(
            listDownHtml(
              (config && config.projectFileDownloadUrl ? config.projectFileDownloadUrl : MirrorUrl[0].url) + "/https://github.com" + dLink,
              "main.go"
            )
          );
          function listDownHtml(Url, Name) {
            return `<a href="${Url}" download="${Name}" target="_blank" rel="noreferrer noopener nofollow" class="fileDownLink" title="${Url}" style='display:none'><svg
    t="1668210029451"
    class="icon"
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="2795"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    width="16"
    height="16">
    <path
      d="M508.746667 299.2L485.333333 452.373333a5.333333 5.333333 0 0 0 4 5.973334l217.386667 53.333333a5.333333 5.333333 0 0 1 2.72 8.693333l-184.906667 208.8a5.333333 5.333333 0 0 1-9.28-4.32l23.413334-153.226666a5.333333 5.333333 0 0 0-4-5.973334L317.173333 512a5.333333 5.333333 0 0 1-2.506666-8.48l184.8-208.693333a5.333333 5.333333 0 0 1 9.28 4.373333z m-329.493334 256l271.253334 66.666667a5.333333 5.333333 0 0 1 4 5.973333l-51.04 335.68a5.333333 5.333333 0 0 0 9.226666 4.32l434.773334-490.346667a5.333333 5.333333 0 0 0-2.72-8.693333l-271.253334-66.666667a5.333333 5.333333 0 0 1-4-5.973333l51.04-335.626667a5.333333 5.333333 0 0 0-9.226666-4.373333L176.533333 546.506667a5.333333 5.333333 0 0 0 2.72 8.693333z"
      p-id="2796"
      fill="#57606a"></path>
  </svg></a>`;
          }
          target.find('div[class="react-directory-filename-column"]').find("svg:first").hover(
            function() {
              $(this).css("display", "none");
              $(this).parent().find(".fileDownLink").css("display", "inline");
            },
            function() {
              $(this).css("display", "inline");
              $(this).parent().find(".fileDownLink").css("display", "none");
            }
          );
          target.find(".fileDownLink").hover(
            function() {
              $(this).css("display", "inline");
              $(this).parent().find("svg:first").css("display", "none");
            },
            function() {
              $(this).css("display", "none");
              $(this).parent().find("svg:first").css("display", "inline");
            }
          );
        }
        function pollingUrl() {
          var proxyUrl = config ? config.proxyUrlList : new Array();
          if (config && config.bypassDownload && proxyUrl.length > 0) {
            var index = GM_getValue("MirrorUrlIndex");
            if (index != null && index != void 0 && index + 1 <= proxyUrl.length - 1) {
              index = index + 1;
            } else {
              index = 0;
            }
            var newUrlArr = new Array();
            newUrlArr[0] = proxyUrl[index];
            GM_setValue("MirrorUrlIndex", index);
            return newUrlArr;
          }
          return proxyUrl;
        }
      }
      const pinia$1 = pinia.createPinia();
      const app = vue.createApp(_sfc_main);
      app.use(pinia$1);
      app.mount(
        (() => {
          const app2 = document.createElement("div");
          document.body.append(app2);
          run();
          return app2;
        })()
      );
    }
  });
  require_main_001();

})(Vue, Pinia, jQuery);