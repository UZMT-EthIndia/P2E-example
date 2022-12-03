import {
  ConnectWallet,
  useAddress,
  useContract,
  useMetamask,
  useWalletConnect,
} from "@thirdweb-dev/react";
import React from "react";
import CurrentGear from "../components/CurrentGear";
import LoadingSection from "../components/LoadingSection";
import OwnedGear from "../components/OwnedGear";
import Rewards from "../components/Rewards";
import Shop from "../components/Shop";
import {
  CHARACTER_EDITION_ADDRESS,
  GOLD_GEMS_ADDRESS,
  MINING_CONTRACT_ADDRESS,
  PICKAXE_EDITION_ADDRESS,
} from "../const/contractAddresses";
import styles from "../styles/Home.module.css";

// import abi json
import CharacterEditionAbi from "../abi/CharacterEditionAbi.json";
import GoldGemAbi from "../abi/GoldGemAbi.json";
import MiningContractAbi from "../abi/MiningContractAbi.json";
import PickaxeEditionAbi from "../abi/PickaxeEditionAbi.json";
import { PROVIDER_URL } from "../const/providerURL";

import { ethers } from "ethers";
import Navbar from "../components/Navbar";

export default function Play() {
  let address:string|null = '0x17512B018D4C524fAfE8dec685e9809549f3aE91';
  let signer;

  if (typeof window !== 'undefined') {
    address = localStorage && localStorage.getItem('ownerAddress');
    // const provider = new ethers.providers.JsonRpcProvider(PROVIDER_URL)
    signer = new ethers.providers.Web3Provider((window as any).ethereum).getSigner();
    
  }

  
  const miningContract = new ethers.Contract(MINING_CONTRACT_ADDRESS, MiningContractAbi, signer);

  // const characterContract = new ethers.Contract(CHARACTER_EDITION_ADDRESS, CharacterEditionAbi, signer);

  const pickaxeContract = new ethers.Contract(
    PICKAXE_EDITION_ADDRESS,
    PickaxeEditionAbi,
    signer
  );
  const tokenContract = new ethers.Contract(GOLD_GEMS_ADDRESS, GoldGemAbi, signer);
  
  console.log('start')

  return (
    <div className={styles.container}>
      <Navbar/>

      {miningContract &&
      // characterContract &&
      tokenContract &&
      pickaxeContract ? (
        <div className={styles.mainSection}>
          <CurrentGear
            miningContract={miningContract}
            // characterContract={characterContract}
            pickaxeContract={pickaxeContract}
          />
          {/* <Rewards
            miningContract={miningContract}
            tokenContract={tokenContract}
          /> */}
        </div>
      ) : (
        <LoadingSection />
      )}

    <hr className={`${styles.divider} ${styles.bigSpacerTop}`} />

    {pickaxeContract && miningContract ? (
      <>
        <h2 className={`${styles.noGapTop} ${styles.noGapBottom}`}>
          Your Owned Pickaxes
        </h2>
        <div
          style={{
            width: "100%",
            minHeight: "10rem",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 8,
          }}
        >
          <OwnedGear
            pickaxeContract={pickaxeContract}
            miningContract={miningContract}
          />
        </div>
      </>
    ) : (
      <LoadingSection />
    )}

    <hr className={`${styles.divider} ${styles.bigSpacerTop}`} />

    {/* {pickaxeContract && tokenContract ? (
      <>
        <h2 className={`${styles.noGapTop} ${styles.noGapBottom}`}>Shop</h2>
        <div
          style={{
            width: "100%",
            minHeight: "10rem",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 8,
          }}
        >
          <Shop pickaxeContract={pickaxeContract} />
        </div>
      </>
    ) : (
      <LoadingSection />
    )
    } */}

    </div>
  );
}
