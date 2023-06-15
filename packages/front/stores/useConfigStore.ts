import { defineStore } from "pinia";
import { Dark } from "quasar";

const config = {
  darkMode: {
    value: false,
    scope: "local",
    toggle: (value: boolean) => {
      Dark.set(value);
    },
    call: (value: boolean) => {
      Dark.set(value);
    },
  },
  pushNotification: {
    value: true,
    scope: "cloud",
    toggle: (value: boolean) => {},
    call: (value: boolean) => {},
  },
  emailNotification: {
    value: false,
    scope: "cloud",
    toggle: (value: boolean) => {},
    call: (value: boolean) => {},
  },
};

export type StoreConfig = typeof config;

const useConfigStore = defineStore("config", {
  state: () => config,
  persist: {
    enabled: true,
    lifetime: "permanent",
    scope: "global",
  },
  actions: {
    get(key: string) {
      return this[key as keyof StoreConfig].value ?? false;
    },
    set(key: string, value: boolean) {
      this[key as keyof StoreConfig].value = value;
    },
    toggle(key: string) {
      this[key as keyof StoreConfig].value =
        !this[key as keyof StoreConfig].value;
      this[key as keyof StoreConfig].toggle(
        this[key as keyof StoreConfig].value
      );
    },
    call(key: string) {
      this[key as keyof StoreConfig].call(this[key as keyof StoreConfig].value);
    },
  },
});
export const $config = () => useConfigStore();
