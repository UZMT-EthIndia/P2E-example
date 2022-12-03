// [key: contractName], [value: contractAddress]

const addressObject = {
    // GameItemNFT: "0x083bB0FC2142590Cc10958a561a30e0ACa55fE55" // mumbai
    GameItemNFT: "0x5527a3F2b7000AC5F73Bcf70F01C5bE79a772B47" // cronos
};

exports.addresses = addressObject;
// exports.rpcProviderUrl = "https://matic-mumbai.chainstacklabs.com";  // mumbai testnet
exports.rpcProviderUrl = "https://evm-t3.cronos.org";  // cronos testnet
