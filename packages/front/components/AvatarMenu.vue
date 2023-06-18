<script setup lang="ts">
const props = defineProps<{
  src?: string;
  size?: number;
  outline?: boolean;
  shadow?: boolean;
  blockie?: boolean;
  animal?: boolean;
}>();
</script>

<template>
  <Avatar
    class="c-avatar-menu"
    :src="src"
    :size="size"
    :outline="outline"
    :shadow="shadow"
    :blockie="blockie"
    :animal="animal"
  >
    <q-btn fab-mini unelevated flat class="c-avata-menu__btn">
      <q-menu auto-close style="min-width: 200px">
        <q-list> <slot /> </q-list>
      </q-menu>
    </q-btn>
  </Avatar>
</template>

<style lang="scss" scoped>
.c-avatar-menu {
  &__btn {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
}
</style>
