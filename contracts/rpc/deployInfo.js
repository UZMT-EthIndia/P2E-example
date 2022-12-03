// [key: contractName], [value: contractAddress]

const addressObject = {
    GameItemNFT: "0x5Fab840eFdc7cf2A694E4185175d7DE1b3313753", // mumbai
    // GameItemNFT: "0xFeCB8802EaAe5c96D8E7d2a5ec05E9EA9ef8590B", // cronos

    MiningGame: "0x40421a5DFa326cDda1f0b71086351E3328d190D8", // mumbai
    // MiningGame: "0x0CBCFc78ddad31B44F7d0f398C60387E3Ff082B0", // cronos
};

exports.addresses = addressObject;
exports.rpcProviderUrl = "https://matic-mumbai.chainstacklabs.com";  // mumbai testnet
// exports.rpcProviderUrl = "https://evm-t3.cronos.org";  // cronos testnet
