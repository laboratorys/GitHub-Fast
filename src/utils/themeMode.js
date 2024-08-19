import { ref } from "vue";
import { lightTheme, darkTheme } from "naive-ui";
const colorMode = ref(
  document.querySelector("html").getAttribute("data-color-mode")
);
const currentTheme = ref(lightTheme);
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
    if (
      mutation.type === "attributes" &&
      mutation.attributeName === "data-color-mode"
    ) {
      colorMode.value = document
        .querySelector("html")
        .getAttribute("data-color-mode");
      initThemeMode(colorMode.value);
    }
  }
}).observe(document.querySelector("html"), { attributes: true });
export { currentTheme };
