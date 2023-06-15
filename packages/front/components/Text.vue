<script setup lang="ts">
import { Dark } from "quasar";
import { StyleValue } from "vue";

const props = defineProps<{
  bold?: boolean;
  label?: boolean;
  check?: boolean;
}>();

const style = (() => {
  if (props.bold) {
    return {
      fontWeight: "bold",
      fontSize: "16px",
      color: Dark.isActive ? "white" : useColor("grey-9"),
    };
  } else if (props.label) {
    return {
      fontWeight: "normal",
      fontSize: "13px",
      color: useColor("grey-7"),
      letterSpacing: "1px",
    };
  }
})() as StyleValue;
</script>

<template>
  <div class="c-text-label" :style="style">
    <Icon
      v-if="check"
      src="checkmark.svg"
      :size="20"
      style="margin: 0 6px 0 0"
    />
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@import "assets/css";
.c-text-label {
  user-select: none;
  display: flex;
  align-items: center;

  .body--dark & {
    color: white !important;
  }
}
</style>
