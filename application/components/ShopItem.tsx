import {
  MediaRenderer,
  ThirdwebNftMedia,
  useActiveClaimCondition,
  useAddress,
  Web3Button,
} from "@thirdweb-dev/react";
import { EditionDrop, NFT } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { PICKAXE_EDITION_ADDRESS } from "../const/contractAddresses";
import styles from "../styles/Home.module.css";
import convertIpfsUrlToGatewayUrl from "../utils/convertIpfsUrlToGatewayUrl";
import {SmartContract} from "@thirdweb-dev/sdk";
type Props = {
  pickaxeContract: any;
  item: any;
};

export default function ShopItem({ item, pickaxeContract }: Props) {
  const [claimCondition, setClaimCondition] = useState(false);
  let address:any;

  if (typeof window !== 'undefined') {
    address = localStorage && localStorage.getItem('ownerAddress');
  }

  useEffect(() => {
    
    const isOwner = pickaxeContract.ownerOf(item.tokenId) === address;
    console.log('isOwner', isOwner);

    const isUser = pickaxeContract.userOf(item.tokenId) === address;
    console.log('isUser', isUser);
    
    setClaimCondition(!isOwner && !isUser);
  }, [pickaxeContract, address, item.tokenId]);

  return (
    <div className={styles.nftBox} key={item.tokenId.toString()}>
      <MediaRenderer 
        src={convertIpfsUrlToGatewayUrl(item.image)}
        className={`${styles.nftMedia} ${styles.spacerTop}`}
        height={"64"}
      />
      <h3>{item.name}</h3>
      <p>
        Price:{" "}
        <b>
          {claimCondition && ethers.utils.formatUnits(item.tokenId * 100000)}{" "}
          GEM
        </b>
      </p>
    </div>
  );
}
