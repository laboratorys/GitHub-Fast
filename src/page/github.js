import $ from "jquery";
import { useStore } from "../utils/store.js";

export function run(elmGetter) {
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

  // 图标数据
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
    $table.find("tr").each(function () {
      const $row = $(this);
      if ($row.data("has-down-btn")) return;
      const $nameCol = $row.find("div.react-directory-filename-column");
      if ($nameCol.length > 0) {
        const $svg = $nameCol.find("svg:first");
        if (!($svg.attr("class") || "").includes("icon-directory")) {
          $row.data("has-down-btn", true);
          var dLink = $nameCol.find('a[class="Link--primary"]').attr("href");
          if (dLink) {
            const downloadUrl =
              (config?.projectFileDownloadUrl || MirrorUrl[0].url) +
              "/https://github.com" +
              dLink;
            $svg.after(
              `<a href="${downloadUrl}" target="_blank" class="fileDownLink" title="下载文件"><svg viewBox="0 0 1024 1024" width="16" height="16"><path d="M508.746667 299.2L485.333333 452.373333a5.333333 5.333333 0 0 0 4 5.973334l217.386667 53.333333a5.333333 5.333333 0 0 1 2.72 8.693333l-184.906667 208.8a5.333333 5.333333 0 0 1-9.28-4.32l23.413334-153.226666a5.333333 5.333333 0 0 0-4-5.973334L317.173333 512a5.333333 5.333333 0 0 1-2.506666-8.48l184.8-208.693333a5.333333 5.333333 0 0 1 9.28 4.373333z m-329.493334 256l271.253334 66.666667a5.333333 5.333333 0 0 1 4 5.973333l-51.04 335.68a5.333333 5.333333 0 0 0 9.226666 4.32l434.773334-490.346667a5.333333 5.333333 0 0 0-2.72-8.693333l-271.253334-66.666667a5.333333 5.333333 0 0 1-4-5.973333l51.04-335.626667a5.333333 5.333333 0 0 0-9.226666-4.373333L176.533333 546.506667a5.333333 5.333333 0 0 0 2.72 8.693333z" fill="#57606a"></path></svg></a>`,
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
      var rawCloneBtn = $sourceBtn
        .first()
        .clone()
        .addClass("fast-raw")
        .text(u.name)
        .attr("href", url)
        .attr("target", "_blank")
        .css({
          "border-radius": "0",
          "border-left": "none",
          display: "inline-flex",
          "align-items": "center",
        });
      $sourceBtn.last().after(rawCloneBtn);
    });
  }

  function setReleaseBtn() {
    if (
      !window.location.pathname.includes("/releases") &&
      !window.location.pathname.match(/\/releases\/tag\//)
    )
      return;
    $(
      "div.Box--condensed ul li, div[data-testid='check-run-header'] + div ul li",
    ).each(function () {
      const $li = $(this);
      if ($li.data("has-fast-release") || $li.find(".fast-release").length > 0)
        return;
      const $anchor = $li.find("a").first();
      const releasePath = $anchor.attr("href");
      if (
        !releasePath ||
        releasePath.includes("#") ||
        releasePath.includes("archive")
      )
        return;
      $li.data("has-fast-release", true);
      const urls = MirrorUrl.map(
        (u) => u.url + "/https://github.com" + releasePath,
      );
      const aHtml = urls
        .map(
          (u, i) =>
            `<a href="${u}" rel="nofollow" class="Truncate ml-1"><span class="Truncate-text text-bold" style="color:palegreen">${MirrorUrl[i].name}</span></a>`,
        )
        .join("");
      $li.append(
        `<div class="fast-release"><svg width="14" height="14" viewBox="0 0 1024 1024" style="vertical-align: middle; margin-right: 4px;"><path d="M508.746667 299.2L485.333333 452.373333a5.333333 5.333333 0 0 0 4 5.973334l217.386667 53.333333a5.333333 5.333333 0 0 1 2.72 8.693333l-184.906667 208.8a5.333333 5.333333 0 0 1-9.28-4.32l23.413334-153.226666a5.333333 5.333333 0 0 0-4-5.973334L317.173333 512a5.333333 5.333333 0 0 1-2.506666-8.48l184.8-208.693333a5.333333 5.333333 0 0 1 9.28 4.373333z m-329.493334 256l271.253334 66.666667a5.333333 5.333333 0 0 1 4 5.973333l-51.04 335.68a5.333333 5.333333 0 0 0 9.226666 4.32l434.773334-490.346667a5.333333 5.333333 0 0 0-2.72-8.693333l-271.253334-66.666667a5.333333 5.333333 0 0 1-4-5.973333l51.04-335.626667a5.333333 5.333333 0 0 0-9.226666-4.373333L176.533333 546.506667a5.333333 5.333333 0 0 0 2.72 8.693333z" fill="#57606a"></path></svg>${aHtml}</div>`,
      );
    });
  }

  function addCloneList() {
    const $portal = $("#__primerPortalRoot__");
    if (!$portal.length) return;

    const $nativeInput = $portal
      .find('input[value^="https://github.com"]')
      .first();

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

    const $targetText = $portal
      .find("p.color-fg-muted, p.text-normal, p.color-fg-default")
      .first();
    const $html = $(info);

    // 绑定点击复制反馈事件
    $html.find(".fast-copy-btn").on("click", function () {
      const $btn = $(this);
      const url = $btn.data("url");

      navigator.clipboard.writeText(url).then(() => {
        const $svg = $btn.find("svg");
        $btn.addClass("copied");
        $svg.html(ICON_CHECK);

        setTimeout(() => {
          $btn.removeClass("copied");
          $svg.html(ICON_COPY);
        }, 2000);
      });
    });

    $targetText.length
      ? $targetText.before($html)
      : $nativeInput.parent().after($html);
  }

  function addDownZipList() {
    const $portal = $("#__primerPortalRoot__");
    const $ul = $portal.find("ul:last");
    if (!$ul.length || $ul.find(".fast-zip").length > 0) return;

    let $zipLi = $ul
      .find("li")
      .filter((_, el) => $(el).find('a[href$=".zip"]').length)
      .first();
    if (!$zipLi.length) return;

    MirrorUrl.forEach((u) => {
      let $li = $zipLi.clone().addClass("fast-zip");
      var originalHref = $li.find("a").attr("href");
      var Url = u.url + "/https://github.com" + originalHref;
      $li
        .find("a")
        .attr("href", Url)
        .find("span")
        .last()
        .text(`Fast ZIP [${u.name}]`)
        .css("color", "palegreen");
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
      (item) => item.isCheck,
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
    subtree: true,
  });
  callback();
}
