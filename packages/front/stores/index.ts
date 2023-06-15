export * from "./useAuthStore";
export * from "./useConfigStore";
export * from "./useDialogStore";
export * from "./useLoadingStore";
export * from "./useDtoStore";
export * from "./useNotificationStore";
export * from "./useWalletStore";

import { defineStore } from "pinia";

export type Store = {
  key: string;
  value: any;
  scope?: string;
};

const useStore = defineStore("store", {
  state: () => ({ data: {} as Json }),
  persist: {
    enabled: true,
    lifetime: "permanent",
    scope: "global",
  },
  getters: {},
  actions: {
    get(store?: Omit<Store, "value">) {
      if (!store) {
        return this.data;
      }
      const route = useRoute();
      if (
        store.scope === "global" ||
        route.path.startsWith(store.scope ?? "global")
      ) {
        const index = store.key + "-" + store.scope ?? "global";
        return this.data[index]?.value ?? undefined;
      } else {
        return null;
      }
    },
    set(store: Store) {
      const index = store.key + "-" + store.scope ?? "global";
      this.data[index] = store;
    },
    clear(store?: Omit<Store, "value">) {
      if (!store) {
        this.data = {};
        return;
      }
      const index = store.key + "-" + store.scope ?? "global";
      if (this.data[index]) {
        this.data[index] = undefined;
      }
    },
  },
});
export const $store = () => useStore();
