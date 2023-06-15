<script setup lang="ts"></script>

<template>
  <div class="l-blank">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.l-blank {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: inherit;
}
</style>
