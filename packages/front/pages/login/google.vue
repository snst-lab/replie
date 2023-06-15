<script setup lang="ts">
import { $auth, $loading, $notification } from "@stores";

const route = useRoute();
const isButtonShow = ref<boolean>(false);

onMounted(async () => {
  try {
    if (!route.query.code) {
      await $auth().start("google");
    } else {
      await $auth().fetchSocialToken();
      await $auth().login();
      await $auth().restoreUrl();
      await $notification().setTooltip("ログインしました");
    }
  } catch {
    isButtonShow.value = true;
    $loading().hide();
  }
});
</script>

<template>
  <NuxtLayout name="blank">
    <ButtonSocialLogin
      v-show="isButtonShow"
      provider="google"
      @click="$auth().start('google')"
    />
  </NuxtLayout>
</template>

<style lang="scss" scoped></style>
