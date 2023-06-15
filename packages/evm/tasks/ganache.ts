import { constants } from "@constants";
import { execSync } from "child_process";

const { config, chain, accounts } = constants.evm;

execSync(
  `npx ganache-cli --host 127.0.0.1 --account="0x${accounts.admin.secret},100000000000000000000000000" --account="0x${accounts.user.secret},10000000000000000000000" --account="0x${accounts.user2.secret},10000000000000000000000" --fork=${config[chain].rpc.baseUrl}/${config[chain].rpc.key}`,
  { stdio: "inherit" }
);
