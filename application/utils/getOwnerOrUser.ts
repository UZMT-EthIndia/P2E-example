import { Contract } from "ethers";

export async function getOwnerOrUser(pickaxeContract:Contract, tokenId:number, address:any) {
  if (!address) {
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

export async function getOwner(pickaxeContract:Contract, tokenId:number, address:any) {
  if (!address) {
    return false;
  }
  console.log('address inside', address);
  const owner = await pickaxeContract.ownerOf(tokenId);

  const isOwner = (owner.toUpperCase() == address.toUpperCase());
  return isOwner;
}
