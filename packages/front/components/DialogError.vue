<script setup lang="ts">
import { $dialog } from "@stores";

const onHide =
  $dialog().args.error?.onHide ??
  (() => {
    $dialog().args.error = {};
  });
</script>

<template>
  <Dialog
    name="error"
    title="エラー"
    :buttons="[
      {
        label: '閉じる',
        color: 'grey',
        action: () => {
          $dialog().hide('error');
        },
      },
    ]"
    :onHide="onHide"
  >
    <p class="q-pa-md" style="word-break: break-all">
      {{ $dialog().args.error?.message }}
    </p>
  </Dialog>
</template>
