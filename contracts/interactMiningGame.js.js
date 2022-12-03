const path = require("path");
const fs = require("fs");
const { utils } = require("ethers");
const abiPath = path.resolve(__dirname, `artifacts/contracts/MiningGame.sol/MiningGame.json`);
console.log('abiPath :::', abiPath);
const jsonABI = JSON.parse(fs.readFileSync(abiPath).toString());
const abi = jsonABI['abi'];
const { addresses, rpcProviderUrl } = require('./rpc/deployInfo');
const { varNameToString, sendTransaction } = require('./rpc/utils/transactionSender');
const ethers = require('ethers');

const provider = new ethers.providers.JsonRpcProvider(rpcProviderUrl);
const address = addresses.MiningGame;
const privateKey = process.env.DEPLOY_PRIVATE_KEY; // Deployer's private key
const wallet = new ethers.Wallet(privateKey, provider);
const contract = new ethers.Contract(address, abi, wallet);

/**
 * Contract methods promise
*/

// ========== Getters ==========

// const getPlayerPickaxe = contract.getPlayerPickaxe("0xDe264e2133963c9f40e07f290E1D852f7e4e4c7c"); // player address
const stake = contract.stake(1, { gasLimit: 1500000 });

// ========== Setters ==========




/**
 * Send method call transactions
*/

// sendTransaction(getPlayerPickaxe, varNameToString({ getPlayerPickaxe }));
sendTransaction(stake, varNameToString({ stake }));
