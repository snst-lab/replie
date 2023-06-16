<script setup>
import "@includes/prototype";

useHead({
  script: [
    {
      src: "https://accounts.google.com/gsi/client",
      async: false,
      defer: false,
    },
    {
      src: "https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js",
    },
    {
      src: "https://cdn.jsdelivr.net/npm/party-js@latest/bundle/party.min.js",
    },
  ],
});
</script>
<template>
  <NuxtLayout>
    <NuxtPage />
    <DialogMessage />
    <DialogError />
    <DialogAction />
    <DialogConfirm />
    <DialogComplete />
    <DialogWallet />
  </NuxtLayout>
</template>
