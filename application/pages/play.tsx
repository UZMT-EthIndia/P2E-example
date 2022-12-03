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

import { ethers } from "ethers";

export default function Play() {
  const address = useAddress();

  const PROVIDER_URL = 'https://rpc.ankr.com/polygon_mumbai'
  const provider = new ethers.providers.JsonRpcProvider(PROVIDER_URL)

  const miningContract = new ethers.Contract(MINING_CONTRACT_ADDRESS, MiningContractAbi, provider);

  const characterContract = new ethers.Contract(CHARACTER_EDITION_ADDRESS, CharacterEditionAbi, provider);

  const pickaxeContract = new ethers.Contract(
    PICKAXE_EDITION_ADDRESS,
    PickaxeEditionAbi,
    provider
  );

  const tokenContract = new ethers.Contract(GOLD_GEMS_ADDRESS, GoldGemAbi, provider);
  
  console.log('start')

  if (!address) {
    return (
      <div className={styles.container}>
        <ConnectWallet colorMode="dark" />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {miningContract &&
      characterContract &&
      tokenContract &&
      pickaxeContract ? (
        <div className={styles.mainSection}>
          <CurrentGear
            miningContract={miningContract}
            characterContract={characterContract}
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

    </div>

    // 아직 테스트 안 해본 애들
    // <div className={styles.container}>

      

    //   <hr className={`${styles.divider} ${styles.bigSpacerTop}`} />

    //   {pickaxeContract && tokenContract ? (
    //     <>
    //       <h2 className={`${styles.noGapTop} ${styles.noGapBottom}`}>Shop</h2>
    //       <div
    //         style={{
    //           width: "100%",
    //           minHeight: "10rem",
    //           display: "flex",
    //           flexDirection: "row",
    //           justifyContent: "center",
    //           alignItems: "center",
    //           marginTop: 8,
    //         }}
    //       >
    //         <Shop pickaxeContract={pickaxeContract} />
    //       </div>
    //     </>
    //   ) : (
    //     <LoadingSection />
    //   )
    // </div> 
  );
}
