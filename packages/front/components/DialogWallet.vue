<script setup lang="ts">
import { $dialog } from "@stores";

const onEvent = {
  callback: () => {
    $dialog().hide("wallet");
  },
};
</script>

<template>
  <Dialog name="wallet" title="Walletに接続">
    <div class="c-dialog-wallet">
      <ListWallet :callback="onEvent.callback" />
    </div>
  </Dialog>
</template>

<style lang="scss" scoped>
@import "assets/css";
.c-dialog-wallet {
  background-color: $grey-1;
  padding: 10px 2vw;
  .body--dark & {
    background-color: $grey-10;
  }
  &__list {
    li {
      max-width: 360px;
      width: 70vw;
    }
  }
}
</style>
