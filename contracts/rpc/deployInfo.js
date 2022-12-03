// [key: contractName], [value: contractAddress]

const addressObject = {
    GameItemNFT: "0xCfD60534C5C46F527674629817C5Ea9BFdEe5ED1", // mumbai
    // GameItemNFT: "", // cronos

    MiningGame: "0xBE9Ab06d53C328344230e94FeFC28b995BB39bB0", // mumbai
    // MiningGame: "", // cronos
};

exports.addresses = addressObject;
exports.rpcProviderUrl = "https://matic-mumbai.chainstacklabs.com";  // mumbai testnet
// exports.rpcProviderUrl = "https://evm-t3.cronos.org";  // cronos testnet
