import { $wallet } from "@stores";

type Provider = {
  provider: {
    chainId: string;
    selectedAddress: string;
  };
};

export default defineNuxtRouteMiddleware(async (to, from) => {
  // const signer = await $wallet().getSigner();
  // if (!signer) {
  //   $wallet().type = "";
  //   $wallet().chainId = 0;
  //   $wallet().address = "";
  //   return;
  // }
  // const provider = signer.provider as unknown as Provider;
  // $wallet().chainId = parseInt(provider?.provider?.chainId ?? "0x0", 16);
  // $wallet().address = provider?.provider?.selectedAddress ?? "";
});
