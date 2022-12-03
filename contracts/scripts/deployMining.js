// This is a script for deploying your contracts. You can adapt it to deploy
// yours, or create new ones.


async function main() {
    // This is just a convenience check
    // if (network.name === "hardhat") {
    //   console.warn(
    //     "You are trying to deploy a contract to the Hardhat Network, which" +
    //       "gets automatically created and destroyed every time. Use the Hardhat" +
    //       " option '--network localhost'"
    //   );
    // }

    // ethers is available in the global scope
    const [deployer] = await ethers.getSigners();
    // console.log('>>>>> Signers list: ', await ethers.getSigners());
    console.log(
        "Deploying the contracts with the account:",
        await deployer.getAddress()
    );

    console.log("Account balance:", (await deployer.getBalance()).toString());

    // Mining Game Contract
    const MiningContract = await ethers.getContractFactory("MiningGame");

    // Mining Game instance
    const Mining = await MiningContract.deploy(
        // "0xf165029bfc1a40a93E5EC3F4d0148066ABA542fd", // NFT | mumbai
        // "0xDa280bA8e5382CE631e79E7585267716a67b0835", // ERC20 | mumbai
        "0x8bcE2Db97cEeb7F6080d05466bc09Cd87D0182a9", // NFT | cronos
        "0x6FaF9F51f2F5459B607373C303e542Ee27b10361" // ERC20 | cronos

    );
    console.log('>>> Deployment in progress...')
    await Mining.deployed();

    console.log("Deployed Mining contract address:", Mining.address);

    // We also save the contract's artifacts and address in the frontend directory
    // saveFrontendFiles(token);
}

// function saveFrontendFiles(token) {
//   const fs = require("fs");
//   const contractsDir = path.join(__dirname, "..", "frontend", "src", "contracts");

//   if (!fs.existsSync(contractsDir)) {
//     fs.mkdirSync(contractsDir);
//   }

//   fs.writeFileSync(
//     path.join(contractsDir, "contract-address.json"),
//     JSON.stringify({ Token: token.address }, undefined, 2)
//   );

//   const TokenArtifact = artifacts.readArtifactSync("TelescopeToken");

//   fs.writeFileSync(
//     path.join(contractsDir, "Token.json"),
//     JSON.stringify(TokenArtifact, null, 2)
//   );
// }

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });