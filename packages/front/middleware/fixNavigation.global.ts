export default defineNuxtRouteMiddleware((to, from) => {
  const messages = [
    `Uncaught NotFoundError: Failed to execute 'insertBefore' on 'Node': The node before which the new node is to be inserted is not a child of this node.`, // chromium based
    `NotFoundError: The object can not be found here.`, // safari
  ];
  if (typeof window !== "undefined") {
    window.addEventListener("error", (event) => {
      if (messages.includes(event.message)) {
        event.preventDefault();
        window.location.reload();
      }
    });
  }
});
