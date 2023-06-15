import { resolve } from "path";
import { constants } from "../@constants/index";

export default defineNuxtConfig({
  ssr: false,
  app: {
    head: {
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { hid: "description", name: "description", content: "" },
        { name: "format-detection", content: "telephone=no" },
      ],
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/icon?family=Material+Icons",
        },
      ],
    },
  },
  runtimeConfig: {
    public: {
      ...constants,
    },
  },
  devServerHandlers: [],
  modules: ["@nuxt/devtools", "@pinia/nuxt"],
  css: [
    "@quasar/extras/material-icons/material-icons.css",
    "quasar/dist/quasar.prod.css",
    "assets/css/reset.scss",
    "assets/css/utility.scss",
    "assets/css/base.scss",
    "assets/css/quasar.scss",
    "assets/css/index.scss",
  ],
  alias: {
    "@images": resolve(__dirname, "./assets/images"),
    "@icons": resolve(__dirname, "./assets/icons"),
    "@stores": resolve(__dirname, "./stores/index"),
    "@tools": resolve(__dirname, "../@tools/index"),
    "@types": resolve(__dirname, "../@types/index"),
    "@includes": resolve(__dirname, "../@includes"),
  },
  imports: {
    dirs: [],
  },
  devtools: {
    // Enable devtools (default: true)
    enabled: false,
    // VS Code Server options
    vscode: {},
    // ...other options
  },
});
