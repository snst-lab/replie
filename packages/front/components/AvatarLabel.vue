<script setup lang="ts">
const props = defineProps<{
  text: string;
  src?: string;
  srcRight?: string;
  size?: number;
  color?: string;
  bgColor?: string;
  shadow?: boolean;
  blockie?: boolean;
}>();

const color = ref<string>(useColor(props.color));
const bgColor = ref<string>(useColor(props.bgColor));
const size = ref<number>(props.size ?? 42);
const shadowColorLight = props.shadow ? "#bbb" : "transparent";
const shadowColorDark = props.shadow ? "#333" : "transparent";
</script>

<template>
  <div
    class="c-avatar-label"
    :style="`color:${color}; background-color: ${bgColor};`"
  >
    <Avatar
      v-if="src"
      class="c-avatar-label__image"
      :src="src"
      :size="size"
      :blockie="blockie"
    />
    <div class="c-avatar-label__text">
      {{ text }}
    </div>
    <Avatar
      v-if="srcRight"
      class="c-avatar-label__image"
      :src="srcRight"
      :size="size"
    />
  </div>
</template>

<style scoped>
.c-avatar-label {
  --size: v-bind(size + "px");
  --radius: v-bind(size * 0.5 +"px");
  --shadowColorLight: v-bind(shadowColorLight);
  --shadowColorDark: v-bind(shadowColorDark);
}
</style>
<style lang="scss" scoped>
@import "assets/css";

.c-avatar-label {
  width: 100%;
  max-width: 320px;
  height: var(--size);
  border-radius: var(--radius);
  padding: 0;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  transition: 0.2s;

  .body--light & {
    box-shadow: 4px 4px 8px var(--shadowColorLight);
  }
  .body--dark & {
    box-shadow: 4px 4px 8px var(--shadowColorDark);
  }

  &__image {
    width: var(--size);
    height: var(--size);

    &:first-of-type {
      // left: -1px;
    }
    &:last-of-type {
      // right: 1px;
    }
  }

  &__text {
    font-size: 16px;
    padding: 0 32px 0 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: auto;
    width: calc(100% - var(--size));
  }
}
</style>
