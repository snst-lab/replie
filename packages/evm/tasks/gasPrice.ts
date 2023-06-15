import { task } from "hardhat/config";
import { getGasPrice, getAssetPrice } from "@modules";
import { constants } from "@constants";

const { config, chain } = constants.evm;

task("gasPrice", null).setAction(async (args, hre) => {
  try {
    /**
     * fetch gas price
     */
    console.log("Fetching gas price...");
    const gasPrice = +(await getGasPrice).data.result.FastGasPrice;
    const etherPrice = +(await getAssetPrice).data.result.ethusd;
    console.log(
      `${config[chain].nativeCurrency.symbol} Price(USD): `,
      etherPrice
    );
    console.log("Gas Price(GWei): ", gasPrice);
    console.log("Gas Price(USD): ", gasPrice * gasPrice * 1e-9);
    process.exit(0);
  } catch (err: unknown) {
    process.exit(1);
  }
});
