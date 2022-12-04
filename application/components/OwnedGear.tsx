import {
  MediaRenderer,
  useAddress,
  useContract,
  Web3Button,
} from "@thirdweb-dev/react";
import React, { useEffect, useState } from "react";
import LoadingSection from "./LoadingSection";
import styles from "../styles/Home.module.css";
import { MINING_CONTRACT_ADDRESS, PICKAXE_EDITION_ADDRESS } from "../const/contractAddresses";
import { Contract, ethers } from "ethers";
import convertIpfsUrlToGatewayUrl from "../utils/convertIpfsUrlToGatewayUrl";
import {getOwnerOrUser} from "../utils/getOwnerOrUser";
import axios from "axios";
import { PROVIDER_URL } from "../const/providerURL";
import { useContractWrite } from "@thirdweb-dev/react";

type Props = {
  pickaxeContract: Contract;
  miningContract: Contract;
};

/**
 * This component shows the:
 * - Pickaxes the connected wallet has
 * - A stake button underneath each of them to equip it
 */
export default function OwnedGear({ pickaxeContract, miningContract }: Props) {
  let address:string|null = '0x17512B018D4C524fAfE8dec685e9809549f3aE91';

  if (typeof window !== 'undefined') {
    address = localStorage && localStorage.getItem('ownerAddress');
  }

  async function equip(id: number) {
    if (!address) return;
    console.log('pickaxeContract', pickaxeContract);
    console.log('address', typeof(address), address);

    // The contract requires approval to be able to transfer the pickaxe
    const hasApproval = await pickaxeContract.isApprovedForAll(
      address,
      MINING_CONTRACT_ADDRESS
    );
    console.log("hasApproval", hasApproval);
    
    // const provider = new ethers.providers.JsonRpcProvider(PROVIDER_URL);
    // const signer = provider.getSigner();
    // console.log('signer', signer);
    if (!hasApproval) {
      const approveResult = await pickaxeContract.approve(MINING_CONTRACT_ADDRESS, id, { gasLimit: 1000000 });
      console.log('approveResult', approveResult);
    }
    console.log('bbbb');
    const stakeResult = await miningContract.stake(id, { gasLimit: 1000000 });
    console.log('stakeResult', stakeResult);

    // Refresh the page
    // window.location.reload();
  }

  const [ownedPickaxes, setOwnedPickaxes] = useState<any>(undefined);

  useEffect(() => { (async () => {
    const pickaxeList = [];
    for (let i=11; i<=15 ; i++) {
      console.log('address', address)
      if (await getOwnerOrUser(pickaxeContract, i, address)) {
        const pickaxeTokenURI = convertIpfsUrlToGatewayUrl(await pickaxeContract.tokenURI(i));
        console.log('pickaxeTokenURI', pickaxeTokenURI);
        const pickaxeMetadata = (await axios.get(pickaxeTokenURI)).data;
        pickaxeList.push(pickaxeMetadata);
      }
    }

    console.log('pickaxeList', pickaxeList);
    setOwnedPickaxes(pickaxeList);
    })();
  }, [pickaxeContract, address]);
    
  // log owned pickaxes using useeffect
  useEffect(() => {
    console.log('ownedPickaxes', ownedPickaxes);
  }, [ownedPickaxes]);

  return (
    <>
      {
        (ownedPickaxes!==undefined)
          ?
            <div className={styles.nftBoxGrid}>
              {ownedPickaxes?.map((p:any) => (
                <div className={styles.nftBox} key={p.tokenId.toString()}>
                  <MediaRenderer 
                    src={convertIpfsUrlToGatewayUrl(p.image)}
                    className={`${styles.nftMedia} ${styles.spacerTop}`}
                    height={"64"}
                  />

                  <h3>{p.name}</h3>

                  <div className={styles.smallMargin}>
                    {/* <Button
                      colorMode="dark"
                      contractAddress={MINING_CONTRACT_ADDRESS}
                      action={() => equip(p.tokenId.toString())}
                    >
                      Equip
                    </Web3Button> */}
                    {/* Button */}
                    <button onClick= {()=>equip(p.tokenId.toString())}>
                      Equip
                    </button>
                    
                  </div>
                </div>
              ))}
            </div>
          : 
            <LoadingSection />
        }
    </>
  );
}
