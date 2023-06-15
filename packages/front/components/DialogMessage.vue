<script setup lang="ts">
import { $dialog } from "@stores";
</script>

<template>
  <Dialog
    name="message"
    :title="$dialog().args.message?.title ?? false"
    :buttons="[
      {
        label: '閉じる',
        color: 'grey',
        action: () => {
          $dialog().hide('message');
          $dialog().args.message.action?.();
        },
      },
    ]"
  >
    <p class="q-pa-md" style="word-break: break-all">
      {{ $dialog().args.message?.message }}
    </p>
  </Dialog>
</template>
