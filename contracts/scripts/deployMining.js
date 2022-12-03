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
        // "0x083bB0FC2142590Cc10958a561a30e0ACa55fE55", // NFT | mumbai
        // "0x2AA7545f0EB6435f0d892EAA5f8279EF17B25605", // ERC20 | mumbai
        "0x5527a3F2b7000AC5F73Bcf70F01C5bE79a772B47", // NFT | cronos
        "0xd78D79F3447744e76e8F661ea3D11371Cbe534Cc" // ERC20 | cronos

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
