import { defineStore } from "pinia";

export const useStore = defineStore("main", {
  state: () => ({
    showConfig: false,
  }),
});
