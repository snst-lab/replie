<script setup lang="ts">
import { tools } from "@tools";

const props = defineProps<{
  src?: string | null;
  size?: number | null;
  outline?: boolean | null;
  shadow?: boolean | null;
  animal?: boolean | null;
  blockie?: boolean | null;
  seed?: string | null;
}>();

const src = ref<string>(
  (() => {
    if (props.src && props.blockie) {
      return useBlockies(props.src);
    } else if (!props.src && !props.animal) {
      return useBlockies();
    } else if (props.seed && props.animal) {
      return `/_nuxt/assets/icons/animal/${tools.random.integer(
        1,
        18,
        props.seed
      )}.png`;
    } else if (!props.seed && props.animal) {
      return `/_nuxt/assets/icons/animal/${tools.random.integer(1, 18)}.png`;
    } else {
      return props.src;
    }
  })()
);

const size = props.size ?? 48;
const borderWidth = props.outline ? 3 : 0;
const shadowColorLight = props.shadow ? "#bbb" : "transparent";
const shadowColorDark = props.shadow ? "#333" : "transparent";
const borderColor1 = useColor("random", props.seed ?? undefined);
const borderColor2 = useColor(
  "random",
  props.seed ? props.seed + 1 : undefined
);
</script>

<template>
  <div
    class="c-avatar"
    :style="`background: linear-gradient(
    125deg,
    ${borderColor1} 0%,
    ${borderColor2} 100%
  )`"
  >
    <Image
      :src="src"
      :size="size - borderWidth"
      class="c-avatar__figure"
      external
    />
    <div class="c-avatar__slot">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.c-avatar {
  --size: v-bind(size + "px");
  --imageSize: v-bind(size - borderWidth * 2 + "px");
  --shadowColorLight: v-bind(shadowColorLight);
  --shadowColorDark: v-bind(shadowColorDark);
}
</style>

<style lang="scss" scoped>
.c-avatar {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: var(--size);
  min-width: var(--size);
  max-height: var(--size);
  min-height: var(--size);
  border-radius: 50%;
  position: relative;

  &__figure {
    z-index: 0;
    margin: auto;
    width: var(--imageSize);
    height: var(--imageSize);
    border-radius: 50%;

    .body--light & {
      box-shadow: 4px 4px 8px var(--shadowColorLight);
    }
    .body--dark & {
      box-shadow: 4px 4px 8px var(--shadowColorDark);
    }
  }

  &__slot {
    position: absolute;
  }
}
</style>
