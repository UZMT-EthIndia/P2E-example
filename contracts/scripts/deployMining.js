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
        "0x5Fab840eFdc7cf2A694E4185175d7DE1b3313753", // NFT | mumbai
        "0xf05c7390cCfd50c81dB946Bb03cDC502DBF6d8ff", // ERC20 | mumbai
        // "0xFeCB8802EaAe5c96D8E7d2a5ec05E9EA9ef8590B", // NFT | cronos
        // "0x4bAECdBa45727Ce60ee126f871D36D8e74BB36eE" // ERC20 | cronos

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
