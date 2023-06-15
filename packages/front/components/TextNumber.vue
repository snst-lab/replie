<script setup lang="ts">
const props = defineProps<{
  value?: number;
  unit?: string;
  locale?: string;
}>();

let value = "0 ";
let unit = props.unit ?? "";
const rawValue = props.value ?? 0;

switch (props.locale) {
  case "us":
    if (rawValue < 1000) {
      value = (Math.floor(rawValue * 10) * 0.1).toLocaleString();
      unit = " " + unit;
    } else if (1000 <= rawValue && rawValue < 1000000) {
      value = (Math.floor(rawValue * 0.01) * 0.1).toLocaleString();
      unit = " k" + unit;
    } else if (1000000 <= rawValue) {
      value = (Math.floor(rawValue * 0.00001) * 0.1).toLocaleString();
      unit = " m" + unit;
    }
    break;
  default:
    if (rawValue < 10000) {
      value = (Math.floor(rawValue * 10) * 0.1).toLocaleString();
      unit = " " + unit;
    } else if (10000 <= rawValue && rawValue < 100000000) {
      value = (Math.floor(rawValue * 0.001) * 0.1).toLocaleString();
      unit = " 万" + unit;
    } else if (100000000 <= rawValue) {
      value = (Math.floor(rawValue * 0.0000001) * 0.1).toLocaleString();
      unit = " 億" + unit;
    }
}
</script>

<template>
  <span class="c-text-number">
    <span class="c-text-number__value">{{ value }}</span>
    <span class="c-text-number__unit">{{ unit }}</span>
  </span>
</template>

<style lang="scss" scoped>
@import "assets/css";

.c-text-number {
  line-height: 1.5;

  &__value {
    font-size: 1em;
  }
  &__unit {
    font-size: 0.8em;
  }
}
</style>
