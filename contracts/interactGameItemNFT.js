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
// sendTransaction(getName, varNameToString({ getName }));

const getSymbol = contract.symbol();
// sendTransaction(getSymbol, varNameToString({ getSymbol }));

// const getTokenURI = contract.tokenURI(1);
// sendTransaction(getTokenURI, varNameToString({ getTokenURI }));

// const getOwner = contract.ownerOf(2);
// sendTransaction(getOwner, varNameToString({ getOwner }));

// const getUser = contract.userOf(1);
// sendTransaction(getUser, varNameToString({ getUser }));

// const getShareRatio = contract.getShareRatio(1);
// sendTransaction(getShareRatio, varNameToString({ getShareRatio }));


// ========== Setters ==========

// step 1. mint GameItem NFT with Metadata IPFS URI
// const safeMint = contract.safeMint(wallet.address, 1, "some-ipfs-uri" { gasLimit: 100000 });
// sendTransaction(safeMint, varNameToString({ safeMint }));

// step 2. set revenue share ratio
// const setShareRatio = contract.setShareRatio(1, 7000);
// sendTransaction(setShareRatio, varNameToString({ setShareRatio }));

// step 3. set User
// const setUser = contract.setUser(1, "0x17512B018D4C524fAfE8dec685e9809549f3aE91", 1672495467, { gasLimit: 100000 });
// sendTransaction(setUser, varNameToString({ setUser }));

///// Note: send Reward token to the Mining Contract before distributing the Revenue shares.

// step 4. distribute revenue shares => not required now
// const distributeRevenue = contract.distributeRevenue(1, utils.parseEther("300"), { gasLimit: 100000 });
// sendTransaction(distributeRevenue, varNameToString({ distributeRevenue }));



