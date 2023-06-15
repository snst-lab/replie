<script setup lang="ts">
const props = defineProps<{
  backgroundImage?: string | null;
  avatarImage?: string | null;
  avatarLink?: string | null;
}>();

const backgroundImage = ref<string>(props.backgroundImage ?? "");
setTimeout(() => {
  if (!backgroundImage.value) {
    backgroundImage.value = "https://unsplash.it/1920/240?random";
  }
}, 3000);
</script>

<template>
  <div class="c-frame-parallax">
    <div
      v-if="backgroundImage"
      class="c-frame-parallax__image"
      :style="{
        'background-image': `url(${backgroundImage})`,
      }"
    />
    <q-skeleton
      v-else
      width="100%"
      height="240px"
      style="position: relative; z-index: -1"
    />
    <div class="c-frame-parallax__content">
      <div class="c-frame-parallax__content__avatar">
        <Avatar :src="props.avatarImage" :size="64" outline shadow />
      </div>
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
@import "assets/css/index.scss";

.c-frame-parallax {
  height: calc(100vh - 60px);
  overflow-x: hidden;
  overflow-y: scroll;
  perspective: 1px;
  position: relative;

  &__image {
    position: absolute;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    min-width: 1280px;
    height: 312px;
    top: -624px;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateZ(-2px) scale(4);

    @include mobile {
      min-width: media("md");
    }
    & + * {
      margin-top: 240px;
      @include mobile {
        margin-top: 200px;
      }
    }
  }

  &__content {
    position: relative;
    padding-top: 0px;
    background: black;
    padding-top: 32px;
    .body--light & {
      background: #fafafa;
    }
    &__avatar {
      position: absolute;
      display: block;
      width: 64px;
      height: 64px;
      top: -32px;
      left: 0;
      right: 0;
      margin: 0 auto -12px auto;
      z-index: 0;
    }
    .q-item__label {
      padding-bottom: 4px;
    }
  }
}
</style>
