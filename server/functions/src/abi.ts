const OffsetHelperABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "who",
        "type": "address",
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "poolToken",
        "type": "address",
      },
      {
        "indexed": false,
        "internalType": "address[]",
        "name": "tco2s",
        "type": "address[]",
      },
      {
        "indexed": false,
        "internalType": "uint256[]",
        "name": "amounts",
        "type": "uint256[]",
      },
    ],
    "name": "Redeemed",
    "type": "event",
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_poolToken",
        "type": "address",
      },
      {
        "internalType": "uint256",
        "name": "_amountToOffset",
        "type": "uint256",
      },
    ],
    "name": "autoOffsetUsingETH",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "tco2s",
        "type": "address[]",
      },
      {
        "internalType": "uint256[]",
        "name": "amounts",
        "type": "uint256[]",
      },
    ],
    "stateMutability": "payable",
    "type": "function",
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_poolToken",
        "type": "address",
      },
      {
        "internalType": "uint256",
        "name": "_amountToOffset",
        "type": "uint256",
      },
    ],
    "name": "autoOffsetUsingPoolToken",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "tco2s",
        "type": "address[]",
      },
      {
        "internalType": "uint256[]",
        "name": "amounts",
        "type": "uint256[]",
      },
    ],
    "stateMutability": "nonpayable",
    "type": "function",
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_depositedToken",
        "type": "address",
      },
      {
        "internalType": "address",
        "name": "_poolToken",
        "type": "address",
      },
      {
        "internalType": "uint256",
        "name": "_amountToOffset",
        "type": "uint256",
      },
    ],
    "name": "autoOffsetUsingToken",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "tco2s",
        "type": "address[]",
      },
      {
        "internalType": "uint256[]",
        "name": "amounts",
        "type": "uint256[]",
      },
    ],
    "stateMutability": "nonpayable",
    "type": "function",
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_fromToken",
        "type": "address",
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256",
      },
    ],
    "name": "autoRedeem",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "tco2s",
        "type": "address[]",
      },
      {
        "internalType": "uint256[]",
        "name": "amounts",
        "type": "uint256[]",
      },
    ],
    "stateMutability": "nonpayable",
    "type": "function",
  },
  {
    "inputs": [
      {
        "internalType": "address[]",
        "name": "_tco2s",
        "type": "address[]",
      },
      {
        "internalType": "uint256[]",
        "name": "_amounts",
        "type": "uint256[]",
      },
    ],
    "name": "autoRetire",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function",
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_fromToken",
        "type": "address",
      },
      {
        "internalType": "address",
        "name": "_toToken",
        "type": "address",
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256",
      },
    ],
    "name": "calculateNeededTokenAmount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256",
      },
    ],
    "stateMutability": "view",
    "type": "function",
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_tokenSymbol",
        "type": "string",
      },
    ],
    "name": "deleteEligibleTokenAddress",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function",
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_erc20Addr",
        "type": "address",
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256",
      },
    ],
    "name": "deposit",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function",
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_tokenSymbol",
        "type": "string",
      },
      {
        "internalType": "address",
        "name": "_address",
        "type": "address",
      },
    ],
    "name": "setEligibleTokenAddress",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function",
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_address",
        "type": "address",
      },
    ],
    "name": "setToucanContractRegistry",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function",
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_fromToken",
        "type": "address",
      },
      {
        "internalType": "address",
        "name": "_toToken",
        "type": "address",
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256",
      },
    ],
    "name": "swap",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function",
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_erc20Addr",
        "type": "address",
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256",
      },
    ],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function",
  },
];

const AbridgedOffsetABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "who",
        "type": "address",
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "poolToken",
        "type": "address",
      },
      {
        "indexed": false,
        "internalType": "address[]",
        "name": "tco2s",
        "type": "address[]",
      },
      {
        "indexed": false,
        "internalType": "uint256[]",
        "name": "amounts",
        "type": "uint256[]",
      },
    ],
    "name": "Redeemed",
    "type": "event",
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_amountToOffset",
        "type": "uint256",
      },
    ],
    "name": "autoOffsetUsingPoolToken",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "tco2s",
        "type": "address[]",
      },
      {
        "internalType": "uint256[]",
        "name": "amounts",
        "type": "uint256[]",
      },
    ],
    "stateMutability": "nonpayable",
    "type": "function",
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256",
      },
    ],
    "name": "autoRedeem",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "tco2s",
        "type": "address[]",
      },
      {
        "internalType": "uint256[]",
        "name": "amounts",
        "type": "uint256[]",
      },
    ],
    "stateMutability": "nonpayable",
    "type": "function",
  },
  {
    "inputs": [
      {
        "internalType": "address[]",
        "name": "_tco2s",
        "type": "address[]",
      },
      {
        "internalType": "uint256[]",
        "name": "_amounts",
        "type": "uint256[]",
      },
    ],
    "name": "autoRetire",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function",
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address",
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address",
      },
    ],
    "name": "balances",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256",
      },
    ],
    "stateMutability": "view",
    "type": "function",
  },
  {
    "inputs": [],
    "name": "contractRegistryAddress",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address",
      },
    ],
    "stateMutability": "view",
    "type": "function",
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256",
      },
    ],
    "name": "deposit",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function",
  },
  {
    "inputs": [],
    "name": "sushiRouterAddress",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address",
      },
    ],
    "stateMutability": "view",
    "type": "function",
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256",
      },
    ],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function",
  },
];

export {OffsetHelperABI, AbridgedOffsetABI};
