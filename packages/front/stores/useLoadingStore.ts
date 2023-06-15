import { Axios, AxiosRequestConfig, AxiosResponse } from "axios";
import { defineStore } from "pinia";
import { Loading } from "quasar";

const useLoadingStore = defineStore("loading", {
  state: () => ({
    isProcessing: false,
    apiRunnings: {} as Record<string, boolean>,
    pageRenderKey: 0,
  }),
  getters: {
    isApiProcessing(state) {
      return Object.values(state.apiRunnings).find((v) => v);
    },
  },
  actions: {
    show(hideBody: boolean = true) {
      Loading.show();
      if (hideBody) {
        const main = document.getElementsByTagName("main")[0];
        if (main) {
          main.style.pointerEvents = "none";
          main.style.opacity = "0";
        }
      }
      this.isProcessing = true;
    },
    hide(showBody: boolean = true) {
      if (this.isApiProcessing) {
        return;
      }
      Loading.hide();
      if (showBody) {
        const main = document.getElementsByTagName("main")[0];
        if (main) {
          main.style.pointerEvents = "auto";
          main.style.opacity = "1";
        }
      }
      this.isProcessing = false;
    },
    apiStart(key: string) {
      if (key) {
        this.apiRunnings[key] = true;
      }
    },
    apiEnd(key: string) {
      if (key) {
        this.apiRunnings[key] = false;
      }
    },
    reRenderPage() {
      this.pageRenderKey = Number(!this.pageRenderKey);
    },
  },
});
export const $loading = () => useLoadingStore();
