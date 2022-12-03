export default function convertIpfsUrlToGatewayUrl(ipfsUrl: string) {
  if(ipfsUrl === undefined) return '';
  return `https://ipfs.io/ipfs/${ipfsUrl.split("//").pop()}`;
}