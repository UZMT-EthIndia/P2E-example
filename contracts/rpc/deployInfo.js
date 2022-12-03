// [key: contractName], [value: contractAddress]

const addressObject = {
    GameItemNFT: "0x6C6034dcb78891874133CB0FdB243D0e3cA7e767", // mumbai
    // GameItemNFT: "0xe088b366ee6f76f807cD05E95DE686130b56A461", // cronos

    MiningGame: "0x27Ab481a528dAC6bB2a09a79D4d41E3F19479aaA", // mumbai
    // MiningGame: "0xC1721ffBa6740BbFcda835b0A2379e5B43Abe006", // cronos
};

exports.addresses = addressObject;
exports.rpcProviderUrl = "https://matic-mumbai.chainstacklabs.com";  // mumbai testnet
// exports.rpcProviderUrl = "https://evm-t3.cronos.org";  // cronos testnet
