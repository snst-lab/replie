<script setup lang="ts">
const props = defineProps<{
  src?: string;
  size?: number;
  external?: boolean;
}>();

const size = props.size ? props.size + "px" : "100%";
</script>

<template>
  <figure v-if="src" class="c-icon">
    <img
      v-if="!external"
      :src="`/_nuxt/assets/icons/${src}`"
      :alt="`icon-${src}`"
    />
    <img v-else :src="src" alt="icon" />
  </figure>
  <figure v-else>
    <img :src="`/_nuxt/assets/images/transparent.png`" />
  </figure>
</template>

<style scoped>
.c-icon {
  --size: v-bind(size);
}
</style>

<style lang="scss" scoped>
.c-icon {
  display: inline-block;
  vertical-align: middle;
  margin: auto 10px;
  overflow: hidden;
  width: var(--size);
  img {
    width: 100%;
    text-align: center;
  }
}
</style>
