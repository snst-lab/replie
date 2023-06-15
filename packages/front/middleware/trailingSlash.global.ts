export default defineNuxtRouteMiddleware((to, _from) => {
  const router = useRouter();

  if (to.path.slice(-1) !== "/") {
    to.path += "/";
    window.history.pushState(null, "", to.path);
    router.replace(to.path);
  }
});
