import "@nomiclabs/hardhat-ethers";
import "tsconfig-paths/register";
import "./tasks";
import { constants } from "@constants";

const { config, chain, host } = constants.evm;

// Go to https://hardhat.org/config/ to learn more
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
export default {
  defaultNetwork: "ganache",
  networks: {
    hardhat: {
      forking: {
        url: `${config[chain].rpc.baseUrl}/${config[chain].rpc.key}`,
      },
      saveDeployments: false,
    },
    ganache: {
      url: host.private,
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.5.16",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.8.19",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./build",
  },
  mocha: {
    timeout: 100000,
  },
};
