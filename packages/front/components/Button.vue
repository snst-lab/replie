<script setup lang="ts">
import { $loading } from "@stores";

const props = defineProps<{
  icon?: string;
  iconRight?: string;
  color?: string;
}>();

const color = props.color ?? "primary";
const isClicked = ref(false);
const isLoading = computed(() => {
  return $loading().isProcessing && isClicked.value;
});
</script>

<template>
  <q-btn
    class="c-button"
    rounded
    unelevated
    padding="12px 30px"
    size="16px"
    :color="color"
    :disabled="$loading().isProcessing"
    @click="isClicked = true"
  >
    <q-icon class="c-button__icon-left" :name="icon" />
    <q-spinner-ios v-if="isLoading" />
    <slot v-else />
    <q-icon class="c-button__icon-right" :name="iconRight" />
  </q-btn>
</template>

<style lang="scss">
@import "assets/css";

.c-button {
  width: 100%;
  max-width: 320px;
  margin: 6px 8px;
  position: relative;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.2) !important;
  // border: 3px solid white !important;

  &__icon-left {
    position: absolute;
    left: 12px;
  }
  &__icon-right {
    position: absolute;
    right: 12px;
  }

  .q-btn__content {
    font-weight: bold;
    .q-icon {
      font-size: 20px;
    }
  }
}
</style>
