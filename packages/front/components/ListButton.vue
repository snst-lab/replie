<script setup lang="ts">
// const props = defineProps<{}>();
</script>

<template>
  <div class="c-list-button">
    <slot />
  </div>
</template>

<style lang="scss">
.c-list-button {
  display: flex;
  justify-content: center;
  flex-wrap: wrap-reverse;
}
</style>
