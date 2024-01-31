import { KETH_LP_TOKENS_FOR_ACTIVITY, TokenT } from '@/constants/tokens'

export const getKETHLpTokenByAddress = (address: string) => {
  for (let token of KETH_LP_TOKENS_FOR_ACTIVITY) {
    if (token.address?.toLowerCase() === address.toLowerCase()) {
      return token
    }
  }
  return null
}

interface CustomEthereum {
  request(args: { method: 'wallet_watchAsset'; params: any }): Promise<boolean>
}

export const addTokenToMetaMask = async (token: TokenT) => {
  const customEthereum = window.ethereum as CustomEthereum

  const wasAdded = await customEthereum.request({
    method: 'wallet_watchAsset',
    params: {
      type: 'ERC20',
      options: {
        address: token.address ? token.address : '',
        symbol: token.symbol,
        decimals: 18,
        image: token.icon
      }
    }
  })

  if (wasAdded) {
    console.log('Token was added to Metamask!')
  } else {
    console.log('Token was NOT added to Metamask.')
  }
}
