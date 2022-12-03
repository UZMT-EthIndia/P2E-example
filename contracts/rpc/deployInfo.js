// [key: contractName], [value: contractAddress]

const addressObject = {
    // GameItemNFT: "0x0F1B9398d84947d9DB804c92fe8A2F86Ba72E13E", // mumbai
    GameItemNFT: "0xF162A6993eBc4DDC7941294f4a1D7b1406751CCD", // cronos

    // MiningGame: "0xeC0628c77C9f0f8eC82F4De6F43b927C170C4b83", // mumbai
    MiningGame: "0x11211Eb9B6754b5148BdF10c5f971FA81e233fA9", // cronos
};

exports.addresses = addressObject;
// exports.rpcProviderUrl = "https://matic-mumbai.chainstacklabs.com";  // mumbai testnet
exports.rpcProviderUrl = "https://evm-t3.cronos.org";  // cronos testnet
