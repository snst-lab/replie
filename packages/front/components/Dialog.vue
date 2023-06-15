<script setup lang="ts">
import { QDialogProps } from "quasar";
import { $dialog } from "@stores";

const props = defineProps<{
  name: Front.Dialog;
  title?: string;
  width?: number;
  padding?: number;
  persist?: boolean;
  onHide?: () => void;
  buttons?: {
    label: string;
    color?: string;
    icon?: string;
    iconRight?: string;
    action: () => void;
  }[];
}>();

// const width = ref<number>(props.width ?? 320);
const width = ref<number>(props.width ?? 960);
const padding = props.padding ?? 20;
const buttons = ref<
  {
    label: string;
    color?: string;
    icon?: string;
    iconRight?: string;
    action: () => void;
  }[]
>(props.buttons ?? []);
const hasButton = computed(() => {
  return buttons.value.length > 0;
});
const position = ref<QDialogProps["position"]>("bottom");

// function watchEventChangeUrl(callback: Function) {
//   callback();
//   let href = window.location.href;
//   const observer = new MutationObserver(function (mutations) {
//     if (href !== window.location.href) {
//       href = window.location.href;
//       callback();
//     }
//   });
//   observer.observe(document, { childList: true, subtree: true });
// }
// function updateDialogState() {
//   const url = new URL(window.location.href);
//   if (url.searchParams.get("dialog") === props.name) {
//     $dialog().isShow[props.name] = true;
//   } else {
//     $dialog().isShow[props.name] = false;
//   }
//   const args = url.searchParams.get("args");
//   if (args) {
//     try {
//       $dialog().args[props.name] = JSON.parse(args);
//     } catch (e) {
//       $dialog().args[props.name] = {};
//     }
//   }
// }

function onHide() {
  if ($dialog().args[props.name].onHide) {
    $dialog().args[props.name].onHide();
  } else if (!$dialog().args[props.name].onHide && props.onHide) {
    props.onHide();
  }
  // const url = new URL(window.location.href);
  // url.searchParams.delete("dialog");
  // url.searchParams.delete("args");
  // window.history.pushState(null, "", url.href);
}

onMounted(() => {
  // watchEventChangeUrl(updateDialogState);
});

watch(
  () => $dialog().args[props.name],
  async (after, before) => {
    // if ($dialog().args[props.name].bottom) {
    //   position.value = "bottom";
    //   width.value = 960;
    // }
    if ($dialog().args[props.name].buttons) {
      buttons.value = $dialog().args[props.name].buttons;
    }
  }
);
</script>

<template>
  <q-dialog
    :model-value="$dialog().isShow[props.name]"
    round
    :persistent="true"
    :position="position"
    @hide="onHide"
  >
    <div
      class="c-dialog-template"
      :style="{
        maxWidth: width + 'px',
        width: '100vw',
        borderRadius: '16px',
      }"
    >
      <div v-if="props.title">
        <div class="row space-between items-center q-py-sm q-px-lg">
          <p class="text-h6 col">{{ props.title }}</p>
          <q-btn
            icon="close"
            class="col-1"
            fab-mini
            unelevated
            flat
            @click="$dialog().hide(props.name)"
          />
        </div>
        <q-separator />
      </div>
      <slot
        :style="{
          padding: padding + 'px',
        }"
      />
      <ListButton class="q-px-sm q-pb-md" v-if="hasButton">
        <Button
          v-for="(v, i) in buttons"
          :color="v.color"
          :icon="v.icon"
          :icon-right="v.iconRight"
          @click="v.action"
        >
          {{ v.label }}
        </Button>
      </ListButton>
    </div>
  </q-dialog>
</template>

<style lang="scss" scoped>
@import "assets/css";
.c-dialog-template {
  background-color: white;
  .body--dark & {
    background-color: $grey-10;
  }
}
</style>
