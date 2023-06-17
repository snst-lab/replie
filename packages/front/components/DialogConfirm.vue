<script setup lang="ts">
import { $dialog } from "@stores";

const message = computed(() =>
  $dialog().args.confirm?.message
    ? $dialog().args.confirm.message
    : "実行しますか？"
);
const label = computed(() =>
  $dialog().args.confirm?.label ? $dialog().args.confirm.label : "実行する"
);
const color = computed(() =>
  $dialog().args.confirm?.color ? $dialog().args.confirm.color : "info"
);
const icon = computed(() => $dialog().args.confirm?.icon ?? undefined);
const iconRight = computed(
  () => $dialog().args.confirm?.iconRight ?? undefined
);

const onEvent = {
  proceed: async () => {
    await $dialog().args.confirm?.action();
    await $dialog().hide("confirm");
  },
};
</script>

<template>
  <Dialog
    :key="label"
    name="confirm"
    title="確認"
    :buttons="[
      {
        label: 'キャンセル',
        color: 'grey',
        action: () => {
          $dialog().hide('confirm');
        },
      },
      {
        label,
        color,
        icon,
        iconRight,
        action: onEvent.proceed,
      },
    ]"
  >
    <p class="q-pa-md" style="word-break: break-all">
      {{ message }}
    </p>
  </Dialog>
</template>
