<script setup lang="ts">
import { $config, StoreConfig } from "@stores";

const props = defineProps<{
  name: keyof StoreConfig;
  icon: string;
}>();

const value = ref<boolean>($config()[props.name].value);
const icon = props.icon ?? "settings";

const onEvent = {
  toggle: () => {
    $config().toggle(props.name);
  },
};

watch(
  () => $config()[props.name].value,
  (newValue) => {
    $config().call(props.name);
    value.value = newValue;
  }
);
</script>

<template>
  <div class="c-card-config row items-center">
    <q-icon color="grey" size="24px" :name="icon" class="col-2" />
    <div class="col-7">
      <slot />
    </div>
    <q-toggle
      :key="name"
      v-model="value"
      color="info"
      size="lg"
      class="q-ma-none col-3"
      @click="onEvent.toggle"
    ></q-toggle>
  </div>
</template>

<style lang="scss" scoped>
@import "assets/css";
.c-card-config {
  height: 64px;
  background-color: white;
  border: 1px solid $grey-2;
  .body--dark & {
    background-color: $grey-10;
    border: 1px solid $grey-9;
  }
}
</style>
