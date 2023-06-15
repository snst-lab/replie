import { $loading } from "@stores";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("page:finish", () => {
    $loading().hide();
  });
});
