// [key: contractName], [value: contractAddress]

const addressObject = {
    // GameItemNFT: "0xf165029bfc1a40a93E5EC3F4d0148066ABA542fd" // mumbai
    GameItemNFT: "0x8bcE2Db97cEeb7F6080d05466bc09Cd87D0182a9" // cronos
};

exports.addresses = addressObject;
// exports.rpcProviderUrl = "https://matic-mumbai.chainstacklabs.com";  // mumbai testnet
exports.rpcProviderUrl = "https://evm-t3.cronos.org";  // cronos testnet
