export function useMount(callback: () => {}) {
  const route = useRoute();
  if (route.path.slice(-1) !== "/") {
    return;
  }
  onMounted(callback);
  window.addEventListener("popstate", callback);
}
