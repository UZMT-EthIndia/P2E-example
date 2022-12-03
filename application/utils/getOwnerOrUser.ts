import { Contract } from "ethers";

export default async function getOwnerOrUser(pickaxeContract:Contract, tokenId:number, address:any) {
  if (address === undefined) {
    return false;
  }
  console.log('address inside', address);
  const user = await pickaxeContract.userOf(tokenId);
  const owner = await pickaxeContract.ownerOf(tokenId);

  const isOwner = (owner.toUpperCase() == address.toUpperCase());
  const isUser = (user.toUpperCase() == address.toUpperCase());
  console.log('tokenId', typeof(tokenId), tokenId, 'owner', owner, 'user', user, 'address', address, 'isOwner', isOwner, 'isUser', isUser);
  return isOwner||isUser;
}
