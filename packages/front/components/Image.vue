<script setup lang="ts">
const props = defineProps<{
  src?: string;
  size?: number;
  external?: boolean;
}>();
const src = props.src ? props.src.replace("~/", "/_nuxt/") : null;
const isLoaded = ref<boolean>(!!src);
const size = props.size ? props.size + "px" : "100%";
</script>

<template>
  <figure class="c-image">
    <img
      v-if="!external"
      v-show="isLoaded"
      :src="`/_nuxt/assets/images/${src}`"
      alt="image"
      @error="isLoaded = false"
      @load="isLoaded = true"
    />
    <img
      v-else
      v-show="isLoaded"
      :src="src"
      alt="image"
      @error="isLoaded = false"
      @load="isLoaded = true"
    />
    <q-skeleton v-show="!isLoaded" :size="size" />
  </figure>
</template>

<style scoped>
.c-image {
  --size: v-bind(size);
}
</style>

<style lang="scss" scoped>
.c-image {
  width: var(--size);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  img {
    width: 100%;
    text-align: center;
  }
}
</style>
