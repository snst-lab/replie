<script setup lang="ts">
import {
  $config,
  $dialog,
  $loading,
  $notification,
  $auth,
  $wallet,
} from "@stores";

const props = defineProps<{
  callback: () => void;
}>();

const onEvent = {
  clickWallet: async (walletType: Evm.WalletType) => {
    await $wallet().connect(walletType);
    // $wallet().switchAddress();
    if (props.callback) {
      await props.callback();
    }
  },
  click: async () => {
    if ($wallet().chainId === 56) {
      await $wallet().switchChain("polygon");
    } else {
      await $wallet().switchChain("bsc");
    }
    if (props.callback) {
      await props.callback();
    }
  },
};
</script>

<template>
  <ul class="c-list-wallet">
    <li @click="onEvent.clickWallet('metamask')">
      <p>Metamask</p>
      <img src="~/assets/icons/wallet/metamask.svg" alt="" />
    </li>
    <!-- <li @click="onEvent.clickWallet('trustwallet')">
      <p>Trust Wallet</p>
      <img src="~/assets/icons/wallet/trust.svg" alt="" />
    </li> -->
  </ul>
</template>

<style lang="scss" scoped>
@import "assets/css";
.c-list-wallet {
  padding: 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid $grey-4;
    cursor: pointer;
    border-radius: 20px;
    height: 64px;
    max-width: 360px;
    width: 100%;
    padding: 0 20px 0 10px;
    margin-bottom: 20px;
    transition: 0.2s;
    .body--light {
      background-color: white;
    }
    .body--light &:hover {
      background-color: $primary;
      color: white;
    }
    .body--dark &:hover {
      background-color: $primary;
      color: white;
    }
  }
  img {
    display: block;
    width: 40px;
  }
  p {
    font-size: 16px;
    width: 100%;
    margin-left: 20px;
  }
}
</style>
