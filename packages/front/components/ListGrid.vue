<script setup lang="ts">
const props = defineProps<{
  containerWidth?: number;
  itemWidth?: number;
  marginX?: number;
  marginY?: number;
  center?: boolean;
  marginAuto?: boolean;
}>();
const scss = useScssVars();
const maxColumns = props.center ? 1 : 4;
const itemWidth = props.itemWidth ?? Number(scss.sizeMd) * 0.25;
const marginX = props.marginX ?? 16;
const marginY = props.marginY ?? scss.spaceMd;
const containerWidth = props.containerWidth ?? scss.sizeMd;
const containerMarginX = props.marginAuto ? "auto" : -marginX + "px";
</script>

<template>
  <div class="c-list-grid">
    <slot />
    <div class="c-list-grid__blank" v-for="i in maxColumns - 1" />
  </div>
</template>

<style>
.c-list-grid {
  --containerWidth: v-bind(containerWidth + "px");
  --itemWidth: v-bind(itemWidth - marginX * 2 + "px");
  --marginX: v-bind(marginX + "px");
  --marginY: v-bind(marginY + "px");
  --containerMarginX: v-bind(containerMarginX);
}
</style>

<style lang="scss">
.c-list-grid {
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
  margin-top: var(--marginY);
  margin-bottom: var(--marginY);
  margin-left: var(--containerMarginX);
  margin-right: var(--containerMarginX);
  max-width: var(--containerWidth) !important;
  width: 100%;
}
.c-list-grid > * {
  width: var(--itemWidth) !important;
  margin: var(--marginY) var(--marginX) !important;
}
.c-list-grid__blank {
  margin-top: 0 !important;
  margin-bottom: 0 !important;
  height: 0;
}
</style>
