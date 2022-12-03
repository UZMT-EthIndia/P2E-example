import { ThirdwebNftMedia, useAddress, useNFT } from "@thirdweb-dev/react";
import { EditionDrop, NFT, SmartContract } from "@thirdweb-dev/sdk";
import React, { useEffect, useState } from "react";
import ContractMappingResponse from "../types/ContractMappingResponse";
import GameplayAnimation from "./GameplayAnimation";
import styles from "../styles/Home.module.css";
import { Contract } from "ethers";
import { MediaRenderer } from "@thirdweb-dev/react";
import axios from "axios";

type Props = {
  miningContract: Contract;
  characterContract: Contract;
  pickaxeContract: Contract;
};

function convertIpfsUrlToGatewayUrl(ipfsUrl: string) {
  return `https://ipfs.io/ipfs/${ipfsUrl.split("//").pop()}`;
}

/**
 * This component shows the:
 * - Currently equipped miner character (right now there is just one (token ID 0))
 * - Currently equipped character's pickaxe
 */
export default function CurrentGear({
  miningContract,
  characterContract,
  pickaxeContract,
}: Props) {
  console.log('here');
  // const address = useAddress();
  const address = "0x17512B018D4C524fAfE8dec685e9809549f3aE91";
  
  const [pickaxe, setPickaxe] = useState<any>();
  const [playerNft, setPlayerNft] = useState<any>();

  useEffect(() => {
    console.log('characterContract useEffect called');
    (async() => {
      const playerNftURI = convertIpfsUrlToGatewayUrl(await characterContract.uri(0))
      console.log('playerNftURI 원본', await characterContract.uri(0))
      console.log("playerNftURI", playerNftURI);
      axios.get(playerNftURI).then((res) => {
        console.log("playerNftSet", res.data);
        setPlayerNft(res.data);
      });
      // setPlayerNft( playerNftTemp );
    })();
  }, [characterContract]);

  useEffect(() => {
    console.log('useEffect!!!');
    (async () => {
      console.log('address', address);

      if (!address) return;

      const p = await miningContract.getPlayerPickaxe(
        address
      );
      
      // Now we have the tokenId of the equipped pickaxe, if there is one, fetch the metadata for it
      if (p.isData) {
        const pickaxeMetadata = await pickaxeContract.tokenURI(p.value);
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
          {/* {pickaxe && (
            // @ts-ignore
            <ThirdwebNftMedia metadata={pickaxe.metadata} height={"64"} />
          )} */}
          {pickaxe}
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
