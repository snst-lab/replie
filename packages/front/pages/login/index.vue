<script setup lang="ts">
import { $auth } from "@stores";
definePageMeta({ layout: "dashboard" });
</script>

<template>
  <TextTitle center>ログイン</TextTitle>
  <div
    style="
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: inherit;
      margin-top: -7rem;
    "
  >
    <ButtonSocialLogin provider="google" />
  </div>
</template>

<style lang="scss" scoped></style>
