import { BigNumber } from "ethers";

export default {
  gasLimit: 1000000,
  maxUint256: BigNumber.from("2").pow("256").sub("1"),
  zero: BigNumber.from("0"),
};
