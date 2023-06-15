import {
  ethers,
  BigNumber,
  Wallet,
  Contract,
  ContractInterface,
  BytesLike,
} from "ethers";
import { isAddress } from "ethers/lib/utils";
import { readFileSync, writeFileSync } from "fs";
import { constants } from "../@constants";

const { config, provider, chain, accounts } = constants.evm;

function useWallet(userType?: Evm.UserType): Wallet {
  userType = userType || "user";
  return new ethers.Wallet(accounts[userType].secret as BytesLike, provider);
}

function useWalletBySecret(secret?: string): Wallet {
  return new ethers.Wallet(secret as BytesLike, provider);
}

function useContract(
  name: string,
  type?: Evm.Type
): (userType?: Evm.UserType | string) => Evm.Contract | null {
  type = type || "contract";
  const evm = JSON.parse(
    readFileSync(`../evm/@abi/${chain}/${type}/${name}.json`).toString()
  );

  return (userType?: Evm.UserType | string) => {
    try {
      let signer;
      if (isAddress(userType)) {
        signer = provider.getSigner(userType) ?? null;
      } else {
        userType = userType || "user";
        signer = provider.getSigner(accounts[userType].address) ?? null;
      }
      if (!signer) {
        throw new Error();
      }
      const contract: Contract = new ethers.Contract(
        evm.address,
        evm.abi,
        signer ?? provider
      );
      if (type === "token") {
        return {
          address: evm.address,
          abi: contract,
          symbol: evm.symbol ?? "TOKEN",
          decimals: evm.decimals ?? 18,
        } as Evm.Contract;
      } else {
        return {
          address: evm.address,
          abi: contract,
        } as Evm.Contract;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };
}

export class ToolsEvm {
  provider = provider;

  useWallet(userType?: Evm.UserType): Wallet {
    return useWallet(userType);
  }

  useWalletBySecret(secret): Wallet {
    return useWalletBySecret(secret);
  }

  useContract(
    name: string,
    type?: Evm.Type
  ): (userType?: Evm.UserType | string) => Evm.Contract | null {
    return useContract(name, type);
  }

  useToken(
    name: string
  ): (userType?: Evm.UserType | string) => Evm.Contract | null {
    return useContract(name, "token");
  }

  fromWei(x: BigNumber, u = 18) {
    return ethers.utils.formatUnits(x, u);
  }

  toNumber(x: BigNumber): number {
    return Number(x.toString());
  }

  async mineBlock(timestamp: number) {
    return await provider.send("evm_mine", [timestamp]);
  }

  async increaseTimestamp(secsToIncrease: number) {
    const blockNumber = await provider.getBlockNumber();
    const { timestamp: currentTimestamp } = await provider.getBlock(
      blockNumber
    );
    const newTime = Number(currentTimestamp) + Number(secsToIncrease);
    return await this.mineBlock(newTime);
  }

  saveContractAbi(args: {
    type?: Evm.Type;
    name: string;
    address: string;
    abi: ContractInterface;
  }) {
    let { type, name, address, abi } = args;
    type = type || "contract";

    if (type == "token") {
      let { symbol, decimals } =
        require(`../evm/contracts/constructor/${name}.ts`).default;
      symbol = symbol || "WEB3";
      decimals = decimals || 18;
      writeFileSync(
        `../evm/@abi/${chain}/${type}/${name}.json`,
        JSON.stringify({
          address,
          symbol,
          decimals,
          abi,
        })
      );
    } else {
      writeFileSync(
        `../evm/@abi/${chain}/${type}/${name}.json`,
        JSON.stringify({
          address,
          abi,
        })
      );
    }
  }

  async watchContractEvent(
    contractGetter: (userType?: Evm.UserType) => Evm.Contract,
    eventName: string,
    callback: (...args: Array<any>) => void
  ) {
    const contract = await contractGetter("admin");
    const filters = contract.abi.filters[eventName];
    if (filters !== undefined) {
      await contract.abi.on(filters(), (...args) => {
        const unwraped = args.map((e) => e.toString());
        callback(...unwraped);
      });
    }
  }

  async showBalance(
    userType: Evm.UserType,
    tokenGetter?: (userType?: Evm.UserType) => Evm.Contract
  ): Promise<number> {
    userType = userType || "user";
    const wallet = useWallet(userType);
    let balance = 0;
    if (typeof tokenGetter !== "undefined") {
      const token = await tokenGetter();
      const rawBalance = await token.abi.balanceOf(wallet.address);
      balance = Number(rawBalance.toString()) / 10 ** token.decimals;
      console.log(`${token.symbol} balance of ${userType} =`, balance);
    } else {
      const rawBalance = await wallet.getBalance();
      balance = Number(rawBalance.toString());
      console.log(
        `${config[chain].nativeCurrency.name} balance of ${userType} =`,
        balance
      );
    }
    return balance;
  }

  async getBalance(
    userType: Evm.UserType,
    tokenGetter?: (userType?: Evm.UserType) => Evm.Contract
  ): Promise<ethers.BigNumber> {
    const wallet = useWallet(userType);
    let balance = BigNumber.from(0);
    if (typeof tokenGetter !== "undefined") {
      const token = await tokenGetter();
      balance = await token.abi.balanceOf(wallet.address);
    } else {
      balance = await wallet.getBalance();
    }
    return balance;
  }

  async showContractBalance(
    contractGetter: (userType?: Evm.UserType) => Evm.Contract,
    tokenGetter: (userType?: Evm.UserType) => Evm.Contract
  ): Promise<number> {
    const contract = await contractGetter("admin");
    const token = await tokenGetter();
    const rawBalance = await token.abi.balanceOf(contract.address);
    const balance = Number(rawBalance.toString()) / 10 ** token.decimals;
    console.log(
      `${token.symbol} balance of ${contract.address} =`,
      balance.toString()
    );
    return Number(balance.toString());
  }

  async getContractBalance(
    contractGetter: (userType?: Evm.UserType) => Evm.Contract,
    tokenGetter: (userType?: Evm.UserType) => Evm.Contract
  ): Promise<ethers.BigNumber> {
    const contract = await contractGetter("admin");
    const token = await tokenGetter();
    const balance = await token.abi.balanceOf(contract.address);
    return balance;
  }
}
