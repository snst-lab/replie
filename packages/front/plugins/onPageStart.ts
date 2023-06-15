import { $loading } from "@stores";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("page:start", () => {
    window.scrollY = 0;
    $loading().show();
    window.scrollY = 0;
  });
});
