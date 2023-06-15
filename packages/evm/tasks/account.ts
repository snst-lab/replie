import { task } from "hardhat/config";
import { constants } from "@constants";

const { provider } = constants.evm;

task("account", null).setAction(async (args, hre) => {
  const { run, ethers, artifacts } = hre;

  const accounts = await ethers.getSigners();

  const array: Array<any> = [];

  for await (const e of accounts) {
    const balance = (await provider.getBalance(e.address)).div(1e9);
    array.push({
      address: e.address,
      balance,
    });
  }
  console.log(array);
});
