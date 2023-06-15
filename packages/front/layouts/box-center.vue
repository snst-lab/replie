<script setup lang="ts"></script>

<template>
  <NuxtLayout name="default">
    <div class="l-box-center">
      <div class="l-box-center__content q-pa-lg">
        <slot />
      </div>
    </div>
  </NuxtLayout>
</template>

<style lang="scss" scoped>
@import "assets/css";
.l-box-center {
  width: 100%;
  height: 100vh;
  background: url(https://unsplash.it/640) no-repeat center/cover;
  display: flex;
  justify-content: center;
  align-items: center;

  &__content {
    width: 100%;
    max-width: 500px;
    max-height: 100vh;
    min-height: 300px;
    background-color: $grey-10;
    box-shadow: 0 0 30px $grey-5;

    .body--light & {
      background-color: white;
    }
  }
}
</style>
