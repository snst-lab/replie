<script setup lang="ts">
const props = defineProps<{
  size?: number;
  check?: boolean;
  center?: boolean;
  back?: boolean | string | Function;
  forward?: boolean | string | Function;
}>();

const router = useRouter();
const size = props.size ? props.size + "px" : "20px";

const displayNavigation = (direction: "back" | "forward") => {
  if (typeof props[direction] === "string") {
    return true;
  } else if (props[direction] === true) {
    return window.history.length > 0;
  } else {
    return false;
  }
};
const onEvent = {
  clickBack: () => {
    if (typeof props.back === "string") {
      router.push(props.back);
    } else if (typeof props.back === "function") {
      props.back();
    } else {
      router.back();
    }
  },
  clickForward: () => {
    if (typeof props.forward === "string") {
      router.push(props.forward);
    } else if (typeof props.forward === "function") {
      props.forward();
    } else {
      router.forward();
    }
  },
};
</script>

<template>
  <div class="c-text-title row items-center justify-between">
    <q-btn
      v-if="back || forward"
      flat
      icon="chevron_left"
      size="18px"
      @click="onEvent.clickBack"
      :class="`${
        displayNavigation('back') ? '' : 'invisible no-pointer-events'
      }`"
    />
    <div
      class="row items-center no-wrap jusitfy-center q-pa-sm q-py-md"
      :class="{ 'q-mx-auto': center }"
    >
      <Icon
        v-if="check"
        src="checkmark.svg"
        class="col-2"
        :size="props.size ?? 24"
      />
      <slot />
    </div>
    <q-btn
      v-if="back || forward"
      flat
      icon="chevron_right"
      size="18px"
      @click="onEvent.clickForward"
      :class="`${
        displayNavigation('forward') ? '' : 'invisible no-pointer-events'
      }`"
    />
  </div>
</template>

<style scoped>
.c-text-title {
  --size: v-bind(size);
}
</style>

<style lang="scss" scoped>
@import "assets/css";

.c-text-title {
  width: 100%;
  font-size: var(--size);
  font-weight: bold;
  flex-wrap: nowrap;
  user-select: none;
  .body--light & {
    color: $grey-9;
  }
  .body--dark & {
    color: $grey-4;
  }
}
</style>
