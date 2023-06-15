import { $config, $notification } from "@stores";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("vue:setup", () => {
    $config().call("darkMode");
    $notification().showTooltipOnLoad();
    $notification().fetchNew();
  });
});
