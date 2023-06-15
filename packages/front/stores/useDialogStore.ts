import { defineStore } from "pinia";

const useDialogStore = defineStore("dialog", {
  state: () => ({
    isShow: {
      error: false,
      message: false,
      complete: false,
      confirm: false,
      action: false,
      wallet: false,
      vote: false,
    } as Record<Front.Dialog, boolean>,
    args: {
      error: {},
      message: {},
      complete: {},
      confirm: {},
      action: {},
      wallet: {},
      vote: {},
    } as Record<Front.Dialog, Json>,
  }),
  actions: {
    show(name: Front.Dialog, args?: Json) {
      // document.body.style.top = "0px";
      // Notice! Using url make disable to button action or hide action
      // if (args?.url) {
      //   const url = new URL(window.location.href);
      //   url.searchParams.set("dialog", name);
      //   if (args) {
      //     url.searchParams.set("args", JSON.stringify(args));
      //   }
      //   window.history.pushState(null, "", url.href);
      // }
      this.isShow[name] = true;
      this.args[name] = args ?? {};
    },
    hide(name: Front.Dialog) {
      this.isShow[name] = false;
    },
    hideAll() {
      Object.keys(this.isShow).forEach((key) => {
        this.isShow[key as Front.Dialog] = false;
      });
    },
  },
});
export const $dialog = () => useDialogStore();
