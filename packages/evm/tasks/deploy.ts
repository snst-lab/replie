import { task } from "hardhat/config";
import { getGasPrice, getAssetPrice } from "@modules";
import { constants } from "@constants";
import { runtimeTools } from "@tools/runtime";

const { config, chain, provider, accounts } = constants.evm;
const { saveContractAbi } = runtimeTools.evm;

task("deploy", null)
  .addParam("name", "Contract name")
  .addOptionalParam("type", "Contract type")
  .setAction(async (args, hre) => {
    const { run, ethers, artifacts } = hre;
    try {
      if (args.name === null) {
        throw "Target contract is not specified.";
      }
      args.type = args.type || "contract";
      /**
       * fetch gas price
       */
      console.log("Fetching gas price...");
      const gasPrice = +(await getGasPrice).data.result.FastGasPrice;
      const etherPrice = +(await getAssetPrice).data.result.ethusd;
      /**
       * Compile
       */
      console.log("Now Compiling...");
      await run("compile");
      /**
       * deploy contract
       */
      console.log("Deploying contract...");

      const signer = await provider.getSigner(accounts.admin.address);
      const factory = await ethers.getContractFactory(args.name, signer);
      const options = Object.values(
        (await import(`../contracts/constructor/${args.name}.ts`)).default
      );
      const contract = await factory.deploy(...options);
      await contract.deployed();
      /**
       * output transactin info
       */
      const transaction = contract.deployTransaction;
      const block = await provider.getBlock(transaction.blockNumber);
      const gasUsed = block.gasUsed.toNumber();
      console.log("Contract deployed successfully.");
      console.log("Signer:", accounts.admin.address);
      console.log("Contract:", contract.address);
      console.log("Gas Price(GWei): ", gasPrice);
      console.log("Gas Used: ", gasUsed);
      console.log(
        `Gas Used(${config[chain].nativeCurrency.symbol}): `,
        gasUsed * gasPrice * 1e-9
      );
      console.log("Gas Used(USD): ", gasUsed * gasPrice * 1e-9 * etherPrice);
      /**
       * save contract info
       */
      const art = await artifacts.readArtifact(args.name);
      saveContractAbi({
        type: args.type,
        name: args.name,
        address: contract.address,
        abi: art.abi,
      });
      process.exit(0);
    } catch (err: unknown) {
      process.exit(1);
    }
  });
