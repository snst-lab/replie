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

const onEvent = {
  proceed: async () => {
    await $dialog().args.confirm?.action();
    await $dialog().hide("confirm");
  },
};
</script>

<template>
  <Dialog
    name="confirm"
    :key="label"
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
        color: 'info',
        action: onEvent.proceed,
      },
    ]"
  >
    <p class="q-pa-md" style="word-break: break-all">
      {{ message }}
    </p>
  </Dialog>
</template>
