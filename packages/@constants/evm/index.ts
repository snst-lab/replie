import * as dotenv from "dotenv";
import * as path from "path";
import config from "./config";
import chainIds from "./chainIds";
import hosts from "./hosts";
import number from "./number";
import { ethers } from "ethers";

dotenv.config({
  path: path.join(__dirname, "../../../.env"),
});

export default {
  config,
  host: hosts[(process.env.EVM_HOST as keyof typeof hosts) ?? "local"],
  provider: new ethers.providers.JsonRpcProvider(
    hosts[(process.env.EVM_HOST as keyof typeof hosts) ?? "local"].public
  ),
  chainIds,
  chain: process.env.CHAIN as keyof typeof config,
  accounts: {
    admin: {
      address: process.env.EVM_ADMIN_ADDRESS,
      secret: process.env.EVM_ADMIN_SECRET,
    },
    user: {
      address: process.env.EVM_USER_ADDRESS,
      secret: process.env.EVM_USER_SECRET,
    },
    user2: {
      address: process.env.EVM_USER2_ADDRESS,
      secret: process.env.EVM_USER2_SECRET,
    },
  },
  ipfs: {
    nftStorage: {
      key: process.env.NFT_STORAGE_APIKEY,
    },
  },
  number,
};
