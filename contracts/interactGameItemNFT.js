const path = require("path");
const fs = require("fs");
const { utils } = require("ethers");
const abiPath = path.resolve(__dirname, `artifacts/contracts/GameItemNFT.sol/GameItemNFT.json`);
console.log('abiPath :::', abiPath);
const jsonABI = JSON.parse(fs.readFileSync(abiPath).toString());
const abi = jsonABI['abi'];
const { addresses, rpcProviderUrl } = require('./rpc/deployInfo');
const { varNameToString, sendTransaction } = require('./rpc/utils/transactionSender');
const ethers = require('ethers');

const provider = new ethers.providers.JsonRpcProvider(rpcProviderUrl);
const address = addresses.GameItemNFT;
const privateKey = process.env.DEPLOY_PRIVATE_KEY; // Deployer's private key
const wallet = new ethers.Wallet(privateKey, provider);
const contract = new ethers.Contract(address, abi, wallet);

/**
 * Contract methods promise
*/

// ========== Getters ==========

const getName = contract.name();
const getSymbol = contract.symbol();
// const getTokenURI = contract.tokenURI(1);
// const getOwner = contract.ownerOf(2);
// const getUser = contract.userOf(1);
// const getShareRatio = contract.getShareRatio(1);

// ========== Setters ==========

// const safeMint = contract.safeMint(wallet.address, 1, { gasLimit: 100000 });
// const setShareRatio = contract.setShareRatio(1, 7000);
// const setUser = contract.setUser(1, "0x17512B018D4C524fAfE8dec685e9809549f3aE91", 1672495467, { gasLimit: 100000 });
// Note: send Reward token to the Mining Contract before distributing the Revenue shares.
const distributeRevenue = contract.distributeRevenue(1, utils.parseEther("300"), { gasLimit: 100000 });



/**
 * Send method call transactions
*/

// sendTransaction(getName, varNameToString({ getName }));
// sendTransaction(getSymbol, varNameToString({ getSymbol }));
// sendTransaction(getTokenURI, varNameToString({ getTokenURI }));
// sendTransaction(getOwner, varNameToString({ getOwner }));
// sendTransaction(getUser, varNameToString({ getUser }));
// sendTransaction(getShareRatio, varNameToString({ getShareRatio }));


// sendTransaction(safeMint, varNameToString({ safeMint }));
// sendTransaction(setShareRatio, varNameToString({ setShareRatio }));
// sendTransaction(setUser, varNameToString({ setUser }));
sendTransaction(distributeRevenue, varNameToString({ distributeRevenue }));
