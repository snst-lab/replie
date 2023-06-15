<script setup lang="ts">
import { $dialog } from "@stores";
</script>

<template>
  <Dialog
    name="action"
    :title="$dialog().args.action?.title"
    :buttons="$dialog().args.action?.buttons"
  >
    <p class="q-pa-md" style="word-break: break-all">
      {{ $dialog().args.action?.message }}
    </p>
  </Dialog>
</template>
