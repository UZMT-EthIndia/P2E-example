export type walletIdType = 'metamask' | 'kaikas';

export const isLogout = () => {
  return (
    localStorage.getItem('ownerAddress') === '' ||
    localStorage.getItem('ownerAddress') === undefined
  );
};

export const communicateWithWallet = async (
  walletId: walletIdType,
): Promise<string | undefined> => {
  console.log('walletId', walletId);

  if (walletId === 'metamask') {
    const address = await getMetamaskAddress();

    return address;
  }
};

export const getMetamaskAddress = async () => {
  try {
    const { ethereum } = window;

    if (!ethereum) {
      alert('Get MetaMask!');

      return;
    }

    const accounts = (await ethereum.request({ method: 'eth_requestAccounts' })) as Array<string>;
    const account = accounts[0];
    console.log('Connected', account);
    localStorage.setItem('ownerAddress', account);

    return account;
  } catch (error) {
    console.log(error);
  }
};