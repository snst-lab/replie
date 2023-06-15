import { $auth } from "@stores";

export default defineNuxtRouteMiddleware((to, from) => {
  if (
    !to.name?.toString().match("login") &&
    !to.name?.toString().match("error")
  ) {
    $auth().checkLogin();
  }
});
