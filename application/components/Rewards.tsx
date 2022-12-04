import React from "react";
import {
  MediaRenderer,
  ThirdwebNftMedia,
  useAddress,
  useContractRead,
  useMetadata,
  useTokenBalance,
  Web3Button,
} from "@thirdweb-dev/react";
import { SmartContract, Token } from "@thirdweb-dev/sdk";
import { BigNumber, Contract, ethers } from "ethers";

import styles from "../styles/Home.module.css";
import ApproxRewards from "./ApproxRewards";
import { MINING_CONTRACT_ADDRESS } from "../const/contractAddresses";

type Props = {
  miningContract: Contract;
  pickaxeContract: Contract;
  tokenContract: Contract;
};

/**
 * This component shows the:
 * - Metadata of the token itself (mainly care about image)
 * - The amount this wallet holds of this wallet
 * - The amount this user can claim from the mining contract
 */
export default function Rewards({ miningContract, pickaxeContract, tokenContract }: Props) {
  let address:any;

  if (typeof window !== 'undefined') {
    address = localStorage && localStorage.getItem('ownerAddress');
  }

  let currentBalance;
  let unclaimedAmount;
  (async() => {
    currentBalance = await tokenContract.balanceOf(address);
    console.log('currentBalance', ethers.utils.formatUnits(currentBalance));
    unclaimedAmount = await miningContract.calculateRewards(address);
    console.log('unclaimedAmount', ethers.utils.formatUnits(unclaimedAmount));
  })();

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <p>
        Your <b>Gold Gems</b>
      </p>
        <MediaRenderer 
          src={'https://gateway.ipfscdn.io/ipfs/QmRiQvP9uBRLkth71zfJyURKddbTFU28pmyZTrbRqmgSuZ/0.png'}
          height={"48"}
        />

      <ApproxRewards miningContract={miningContract} />

      <div className={styles.smallMargin}>
        <button
          onClick={() => {
            (async() => {
              unclaimedAmount = await miningContract.calculateRewards(address);
              const p = await miningContract.getPlayerPickaxe(
                address
              );
              console.log('unclaimedAmount', unclaimedAmount); // ethers.utils.formatUnits(unclaimedAmount));
              console.log('p.value', p.value);
              await miningContract.withdraw();
              const re = await pickaxeContract.distributeRevenue( p.value, unclaimedAmount, { gasLimit: 1000000 });
              console.log('re', re);
            })();
            }}
        >
          Claim
        </button>
      </div>
    </div>
  );
}
