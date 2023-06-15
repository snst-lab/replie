import { $wallet } from "@stores";
import { Contract, ethers } from "ethers";

export async function useContract(
  name: string,
  type?: Evm.Type
): Promise<(userType?: Evm.UserType | string) => Evm.Contract> {
  const { public: constants } = useRuntimeConfig();
  const chainName =
    constants.evm.chainIds[
      $wallet().chainId as keyof typeof constants.evm.chainIds
    ] || constants.evm.chain;
  type = type || "contract";
  const evm = await import(
    `../../evm/@abi/${String(chainName)}/${type}/${name}.json`
  );

  return (userType?: Evm.UserType | string) => {
    try {
      userType = userType || "user";
      if (!$wallet().type) {
        $wallet().connect();
      }
      const signer = $wallet().type ? $wallet().getSigner() : null;
      if (!signer) {
        throw new Error();
      }
      const contract: Contract = new ethers.Contract(
        evm.address,
        evm.abi,
        signer
      );
      if (type === "token") {
        return {
          address: evm.address,
          abi: contract,
          symbol: evm.symbol ?? "",
          decimals: evm.decimals ?? 18,
        } as Evm.Contract;
      } else {
        return {
          address: evm.address,
          abi: contract,
        } as Evm.Contract;
      }
    } catch (error) {
      warn(`useContract[${type}/${name}]: ${error}`);
      return {
        address: "",
        abi: {},
      } as Evm.Contract;
    }
  };
}

export async function useToken(
  name: string
): Promise<(userType?: Evm.UserType | string) => Evm.Contract> {
  return useContract(name, "token");
}

export async function watchContractEvent(
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
