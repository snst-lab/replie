import { $auth, $config, $loading, $notification } from "@stores";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("vue:setup", () => {
    $config().call("darkMode");
    $loading().show();
    $notification().showTooltipOnLoad();
    if ($auth().token.accessToken) {
      $notification().fetchNew();
    }
  });
});
