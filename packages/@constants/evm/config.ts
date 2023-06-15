import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({
  path: path.join(__dirname, "../../../.env"),
});

export default {
  ethereum: {
    title: "Ethereum Mainnet",
    name: "ethereum",
    chainId: 1,
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    rpc: {
      baseUrl: "https://eth-mainnet.g.alchemy.com/v2",
      key: process.env.RPC_KEY_ethereum,
      // basURL 'https://mainnet.infura.io/v3/',
    },
    explorer: {
      baseUrl: "https://api.etherscan.io/api",
      key: process.env.EXPLORER_KEY_ethereum,
      query: {
        gasReporter: {
          endpoint: "/",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "X-Requested-With": "XMLHttpRequest",
          },
          data: {
            module: "gastracker",
            action: "gasoracle",
            apikey: process.env.EXPLORER_KEY_ethereum,
          },
        },
        price: {
          endpoint: "/",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "X-Requested-With": "XMLHttpRequest",
          },
          data: {
            module: "stats",
            action: "ethprice",
            apikey: process.env.EXPLORER_KEY_ethereum,
          },
        },
      },
    },
  },
  polygon: {
    title: "Polygon Mainnet",
    name: "polygon",
    chainId: 137,
    nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
    rpc: {
      baseUrl: "https://polygon-mainnet.g.alchemy.com/v2",
      key: process.env.RPC_KEY_polygon,
      // basURL 'https://mainnet.infura.io/v3/',
    },
    explorer: {
      baseUrl: "https://api.polygonscan.com/api",
      key: process.env.EXPLORER_KEY_polygon,
      query: {
        gasReporter: {
          endpoint: "/",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "X-Requested-With": "XMLHttpRequest",
          },
          data: {
            module: "gastracker",
            action: "gasoracle",
            apikey: process.env.EXPLORER_KEY_polygon,
          },
        },
        price: {
          endpoint: "/",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "X-Requested-With": "XMLHttpRequest",
          },
          data: {
            module: "stats",
            action: "ethprice",
            apikey: process.env.EXPLORER_KEY_polygon,
          },
        },
      },
    },
  },
  bsc: {
    title: "Binance Smart Chain Mainnet",
    name: "bsc",
    chainId: 56,
    nativeCurrency: {
      name: "Binance Chain Native Token",
      symbol: "BNB",
      decimals: 18,
    },
    rpc: {
      baseUrl: "https://speedy-nodes-nyc.moralis.io",
      key: process.env.RPC_KEY_bsc + "/bsc/mainnet",
    },
    explorer: {
      baseUrl: "https://api.bscscan.com/api",
      key: process.env.EXPLORER_KEY_bsc,
      query: {
        gasReporter: {
          endpoint: "/",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "X-Requested-With": "XMLHttpRequest",
          },
          data: {
            module: "gastracker",
            action: "gasoracle",
            apikey: process.env.EXPLORER_KEY_bsc,
          },
        },
        price: {
          endpoint: "/",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "X-Requested-With": "XMLHttpRequest",
          },
          data: {
            module: "stats",
            action: "bnbprice",
            apikey: process.env.EXPLORER_KEY_bsc,
          },
        },
      },
    },
  },
  astar: {
    title: "Astar Mainnet",
    name: "astar",
    chainId: 592,
    nativeCurrency: {
      name: "Astar",
      symbol: "ASTR",
      decimals: 18,
    },
    rpc: {
      baseUrl: "https://astar-mainnet.g.alchemy.com/v2",
      key: process.env.RPC_KEY_astar,
      // baseUrl: "https://astar.api.onfinality.io/public",
      // baseUrl: "https://evm.astar.network",
      // baseUrl: "https://rpc.astar.network:8545",
      // key: "",
    },
    explorer: {
      baseUrl: "https://api.etherscan.io/api",
      key: process.env.EXPLORER_KEY_ethereum,
      query: {
        gasReporter: {
          endpoint: "/",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "X-Requested-With": "XMLHttpRequest",
          },
          data: {
            module: "gastracker",
            action: "gasoracle",
            apikey: process.env.EXPLORER_KEY_ethereum,
          },
        },
        price: {
          endpoint: "/",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "X-Requested-With": "XMLHttpRequest",
          },
          data: {
            module: "stats",
            action: "ethprice",
            apikey: process.env.EXPLORER_KEY_ethereum,
          },
        },
      },
    },
  },
};
