import { useNFTs } from "@thirdweb-dev/react";
import { EditionDrop } from "@thirdweb-dev/sdk";
import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import ShopItem from "./ShopItem";

type Props = {
  pickaxeContract: SmartContract<any>;
};

/**
 * This component shows the:
 * - All of the available pickaxes from the edition drop and their price.
 */
export default function Shop({ pickaxeContract }: Props) {
  useEffect(() => {
    // const response = pickaxeContract.getPickaxes(address);
    const response = [
      {
        "name": "Pick Axe #0001",
        "tokenId": "1",
        "description": "Your miner use this axe to gather reward tokens!",
        "image": "ipfs://QmXA1W3gYbcTcyYdx74vzx3JcN8SS4JPi2Httj7v1XbbLz/0.png",
        "revenue_share_ratio": "30", // (%)
        "external_url": "", "background_color": ""
      }
    ]
    console.log('response', response);
    setAvailablePickaxes(response);
  }, [pickaxeContract])

  const [availablePickaxes, setAvailablePickaxes] = useState<any>(undefined);

  return (
    <>
      <div className={styles.nftBoxGrid}>
        {availablePickaxes?.map((p) => (
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
