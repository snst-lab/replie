export * from "hardhat/types";
import { Contract as EthersContract, ContractInterface } from "ethers";
import { constants } from "../@constants";

declare global {
  type valueof<T> = T[keyof T];

  namespace Evm {
    type WalletType = "" | "metamask" | "trustwallet";
    type UserType = "admin" | "user" | "user2";
    type Type = "abi" | "contract" | "token";
    type Chain = valueof<typeof constants.evm.config>;
    type ChainId = keyof typeof constants.evm.chainIds;
    type Contract = {
      address: string;
      symbol: string;
      decimals: number;
      abi: EthersContract;
    };
  }
}
