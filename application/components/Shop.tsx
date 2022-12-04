import { useNFTs } from "@thirdweb-dev/react";
import { EditionDrop } from "@thirdweb-dev/sdk";
import axios from "axios";
import { Contract } from "ethers";
import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import convertIpfsUrlToGatewayUrl from "../utils/convertIpfsUrlToGatewayUrl";
import {getOwner} from "../utils/getOwnerOrUser";
import ShopItem from "./ShopItem";

type Props = {
  pickaxeContract: Contract;
};

/**
 * This component shows the:
 * - All of the available pickaxes from the edition drop and their price.
 */
export default function Shop({ pickaxeContract }: Props) {
  let address:string|null = '0x17512B018D4C524fAfE8dec685e9809549f3aE91';

  if (typeof window !== 'undefined') {
    address = localStorage && localStorage.getItem('ownerAddress');
  }
  
  useEffect(() => { (async () => {
    const pickaxeList = [];
    for (let i=11; i<=15 ; i++) {
      console.log('address', address)
      if (!await getOwner(pickaxeContract, i, address)) {
        const pickaxeTokenURI = convertIpfsUrlToGatewayUrl(await pickaxeContract.tokenURI(i));
        console.log('pickaxeTokenURI', pickaxeTokenURI);
        const pickaxeMetadata = (await axios.get(pickaxeTokenURI)).data;
        pickaxeList.push(pickaxeMetadata);
      }
    }

    console.log('pickaxeList', pickaxeList);
    setAvailablePickaxes(pickaxeList);
    })();
  }, [pickaxeContract, address]);

  const [availablePickaxes, setAvailablePickaxes] = useState<any>(undefined);

  return (
    <>
      <div className={styles.nftBoxGrid}>
        {availablePickaxes?.map((p:any) => (
          <ShopItem
            pickaxeContract={pickaxeContract}
            item={p}
            key={p.tokenId.toString()}
          />
        ))}
      </div>
    </>
  );
}
