import { ethers } from "ethers";
import { JsonRpcSigner } from "@ethersproject/providers/src.ts/json-rpc-provider";
import { $wallet, WalletStore } from ".";

export function useMetamask(): WalletStore {
  interface MetaMask extends Window {
    ethereum: any;
  }
  const { ethereum } = window as MetaMask & typeof globalThis;

  if (typeof ethereum !== "undefined") {
    ethereum.on("accountsChanged", async (accounts: string[]) => {
      $wallet().address = accounts[0];
    });
    ethereum.on("chainChanged", (chainId: string) => {
      window.location.reload();
    });
  }

  function checkInstalled() {
    if (Boolean(ethereum && ethereum.isMetaMask)) {
      return true;
    } else {
      window.open(
        `https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn`,
        "_blank"
      );
      return false;
    }
  }

  function getSigner(): JsonRpcSigner {
    try {
      const provider = new ethers.providers.Web3Provider(ethereum);
      provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      signer.getAddress().then((data) => {
        $wallet().address = data;
      });
      return signer;
    } catch (error) {
      warn(`getSigner:`, error);
      return {} as JsonRpcSigner;
    }
  }

  function connect(): JsonRpcSigner {
    try {
      if (!checkInstalled()) {
        return {} as JsonRpcSigner;
      }
      ethereum.request({
        method: "wallet_requestPermissions",
        params: [{ eth_accounts: {} }],
      });
      const provider = new ethers.providers.Web3Provider(ethereum);
      provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      signer.getAddress().then((data) => {
        $wallet().address = data;
      });
      return signer;
    } catch (error) {
      warn(`connect:`, error);
      return {} as JsonRpcSigner;
    }
  }

  async function switchChain(chainName: string): Promise<Evm.Chain | false> {
    const { public: constants } = useRuntimeConfig();
    const chain =
      constants.evm.config[chainName as keyof typeof constants.evm.config];
    try {
      if (!checkInstalled()) {
        return false;
      }
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x" + chain.chainId.toString(16) }],
      });
      return chain;
    } catch (error) {
      if ((error as { code: number }).code === 4902) {
        await addChain(chain);
      }
      warn(`switchChain[${chainName}]:`, error);
      return false;
    }
  }

  async function addChain(chain: Evm.Chain): Promise<Evm.Chain | false> {
    try {
      if (!checkInstalled()) {
        return false;
      }
      await ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x" + chain.chainId.toString(16),
            chainName: chain.title,
            nativeCurrency: chain.nativeCurrency,
            rpcUrls: [chain.rpc.baseUrl],
            blockExplorerUrls: [chain.explorer.baseUrl],
          },
        ],
      });
      return chain;
    } catch (error) {
      warn(`addChain[${chain.title}]:`, error);
      return false;
    }
  }

  async function switchAddress() {
    try {
      if (!checkInstalled()) {
        return "";
      }
      await ethereum.request({
        method: "wallet_requestPermissions",
        params: [{ eth_accounts: {} }],
      });
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      if (!accounts || accounts.length < 1) {
        throw new Error();
      }
      return accounts[0];
    } catch (error) {
      warn(`switchAddress:`, error);
    }
  }

  return {
    connect,
    getSigner,
    switchAddress,
    addChain,
    switchChain,
  };
}
