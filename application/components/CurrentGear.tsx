import { ThirdwebNftMedia, useAddress, useNFT } from "@thirdweb-dev/react";
import { EditionDrop, NFT, SmartContract } from "@thirdweb-dev/sdk";
import React, { useEffect, useState } from "react";
import ContractMappingResponse from "../types/ContractMappingResponse";
import GameplayAnimation from "./GameplayAnimation";
import styles from "../styles/Home.module.css";
import { Contract } from "ethers";
import { MediaRenderer } from "@thirdweb-dev/react";
import axios from "axios";
import convertIpfsUrlToGatewayUrl from "../utils/convertIpfsUrlToGatewayUrl";

type Props = {
  miningContract: Contract;
  // characterContract: Contract;
  pickaxeContract: Contract;
};

/**
 * This component shows the:
 * - Currently equipped miner character (right now there is just one (token ID 0))
 * - Currently equipped character's pickaxe
 */
export default function CurrentGear({
  miningContract,
  // characterContract,
  pickaxeContract,
}: Props) {
  console.log('here');
  let address:any;

  if (typeof window !== 'undefined') {
    address = localStorage && localStorage.getItem('ownerAddress');
  }
  
  const [pickaxe, setPickaxe] = useState<any>();
  const [playerNft, setPlayerNft] = useState<any>();

  useEffect(() => {
    console.log('characterContract useEffect called');
    (async() => {
      const sampleURI = 'ipfs://Qmf9csTfndWRgH2z35WUBm9jTuQKfSv1dJC9YKW6iTZkDP/0';
      // const playerNftURI = convertIpfsUrlToGatewayUrl(await characterContract.uri(0))
      const playerNftURI = convertIpfsUrlToGatewayUrl(sampleURI)

      console.log('playerNftURI 원본', sampleURI)
      console.log("playerNftURI", playerNftURI);
      axios.get(playerNftURI).then((res) => {
        console.log("playerNftSet", res.data);
        setPlayerNft(res.data);
      });
    })();
  }, []);

  useEffect(() => {
    console.log('useEffect!!!');
    (async () => {
      console.log('address', address);

      if (!address) return;
      
      const p = await miningContract.getPlayerPickaxe(
        address
      );
      console.log('p', p);
      // Now we have the tokenId of the equipped pickaxe, if there is one, fetch the metadata for it
      if (p.isData) {
        const pickaxeTokenURI = convertIpfsUrlToGatewayUrl(await pickaxeContract.tokenURI(p.value));
        console.log('pickaxeTokenURI', pickaxeTokenURI);
        const pickaxeMetadata = await axios.get(pickaxeTokenURI);
        console.log('pickaxeMetadata', pickaxeMetadata);
        setPickaxe(pickaxeMetadata);
      }
    })();
  }, [address, miningContract, pickaxeContract]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h2 className={`${styles.noGapTop} `}>Equipped Items</h2>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {/* Currently equipped player */}
        <div style={{ outline: "1px solid grey", borderRadius: 16 }}>
          {playerNft && (
            <MediaRenderer src={convertIpfsUrlToGatewayUrl(playerNft.image)} height={"64"} />
          )}
        </div>
        {/* Currently equipped pickaxe */}
        <div
          style={{ outline: "1px solid grey", borderRadius: 16, marginLeft: 8 }}
        >
          {/* // todo : 잘 되는지 확인해보기 */}
          {pickaxe && (
            // @ts-ignore
            <MediaRenderer src={convertIpfsUrlToGatewayUrl(pickaxe.image)} height={"64"} />
          )}
        </div>
      </div>

      {/* Gameplay Animation */}

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 24,
        }}
      >
        <img src="./mine.gif" height={64} width={64} alt="character-mining" />
        <GameplayAnimation pickaxe={pickaxe} />
      </div>
    </div>
  );
}
