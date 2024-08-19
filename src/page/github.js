import $ from "jquery";
import { useStore } from "../utils/store.js";
export function run() {
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
    new MutationObserver((mutations, self) => {
      mutations.forEach((mutation) => {
        if (mutation.type == "childList" && mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach((node) => {
            if (
              node.className != undefined &&
              node.tagName == "TR" &&
              node.className.includes("react-directory-row")
            ) {
              addListDownBtn($(node));
            }
          });
        }
      });
    }).observe(document.querySelector("body"), {
      childList: true,
      subtree: true,
      attributes: true,
    });

    if (window.location.pathname.split("/")[3] == "releases") {
      if ($('div[class="Box Box--condensed mt-3"]').length > 0) {
        addReleaseList($('div[class="Box Box--condensed mt-3"]'));
      }
      let bodyBox = document.querySelector("body");
      new MutationObserver((mutations, self) => {
        mutations.forEach((mutation) => {
          if (mutation.type == "childList" && mutation.addedNodes.length > 0) {
            mutation.addedNodes.forEach((node) => {
              if (
                node.className != undefined &&
                node.className.includes("Box--condensed")
              ) {
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
      new MutationObserver((mutations, self) => {
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
          if (
            attributeName == "aria-current" &&
            $(target).attr("aria-current") !== undefined
          ) {
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
    childList: true,
  });

  function observeChanges(targetNode) {
    const nodeObserver = new MutationObserver((mutations, self) => {
      mutations.forEach(({ addedNodes }) => {
        if (addedNodes.length > 0) {
          let hasHttpClone = false;
          let hasDownZipClone = false;
          addedNodes.forEach((node) => {
            let nodeContent = node.innerHTML;
            if (
              nodeContent != undefined &&
              nodeContent != nodeContent.includes("Clone using the web URL.") &&
              !nodeContent.includes("fast-clone")
            ) {
              hasHttpClone = true;
            }
            if (
              nodeContent != undefined &&
              nodeContent != nodeContent.includes("Download ZIP") &&
              !nodeContent.includes("fast-clone")
            ) {
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
  //克隆列表
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
    function cloneHtml(InputDivClass, Url) {
      return `
<div class="${InputDivClass} fast-clone mt-2">
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
    $("#__primerPortalRoot__")
      .find("input")
      .parent()
      .parent()
      .find("span")
      .filter(function () {
        return $(this).attr("class").includes("Text-sc");
      })
      .before($(info));
  }
  //源码压缩包下载
  function addDownZipList() {
    MirrorUrl.forEach((u) => {
      let downZipClone = $("#__primerPortalRoot__")
        .find('ul[role="menu"]:last')
        .find("li:eq(1)")
        .clone();
      downZipClone.addClass("fast-zip");
      var zipPath = downZipClone.find("a").attr("href");
      var Url = u.url + "/https://github.com/" + zipPath;
      var zipText = u.name;
      downZipClone.find("a").attr("href", Url);
      downZipClone.find("span:last").text(`Fast Download Zip [${zipText}]`);
      $("#__primerPortalRoot__")
        .find('ul[role="menu"]:last')
        .append(downZipClone);
    });
  }
  //release列表
  function addReleaseList(target) {
    target.find(".fast-release").remove();
    let releaseLi = target.find("ul").find("li");
    releaseLi.each(function () {
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
  //文件raw
  function addRawBtn() {
    var rawUrl = $('a[data-testid="raw-button"]').attr("href");
    if (rawUrl != undefined) {
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
  //项目文件下载
  function addListDownBtn(target) {
    target.find(".fileDownLink").remove();
    var dLink = target.find('a[class="Link--primary"]').attr("href");
    target
      .find('div[class="react-directory-filename-column"]')
      .find("svg:first")
      .after(
        listDownHtml(
          (config && config.projectFileDownloadUrl
            ? config.projectFileDownloadUrl
            : MirrorUrl[0].url) +
            "/https://github.com" +
            dLink,
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
    target
      .find('div[class="react-directory-filename-column"]')
      .find("svg:first")
      .hover(
        function () {
          $(this).css("display", "none");
          $(this).parent().find(".fileDownLink").css("display", "inline");
        },
        function () {
          $(this).css("display", "inline");
          $(this).parent().find(".fileDownLink").css("display", "none");
        }
      );
    target.find(".fileDownLink").hover(
      function () {
        $(this).css("display", "inline");
        $(this).parent().find("svg:first").css("display", "none");
      },
      function () {
        $(this).css("display", "none");
        $(this).parent().find("svg:first").css("display", "inline");
      }
    );
  }
  //轮询下载地址
  function pollingUrl() {
    var proxyUrl = config ? config.proxyUrlList : new Array();
    if (config && config.bypassDownload && proxyUrl.length > 0) {
      var index = GM_getValue("MirrorUrlIndex");
      if (
        index != null &&
        index != undefined &&
        index + 1 <= proxyUrl.length - 1
      ) {
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
