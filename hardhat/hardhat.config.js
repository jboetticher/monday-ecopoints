require("@nomicfoundation/hardhat-toolbox");
const secrets = require("./secrets.json");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    matic: {
      url: "https://poly-mainnet.gateway.pokt.network/v1/lb/62b7cee8123e6f003985201b",
      accounts: [secrets.private_key],
      chainId: 137
    },
    hardhat: {
      forking: {
        // eslint-disable-next-line
        enabled: true,
        url: `https://polygon-rpc.com`,
      }
    }
  }
}
