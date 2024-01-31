import { goerli, mainnet } from 'wagmi'

export const supportedChains =
  process.env.REACT_APP_NETWORK_ID === `${goerli.id}` ? [goerli] : [mainnet]

export const rpcUrls: {
  [key: number]: string
} = {
  [mainnet.id]: `${process.env.REACT_APP_MAINNET_RPC}`,
  [goerli.id]: `${process.env.REACT_APP_GOERLI_RPC}`
}

export const explorerUrls: {
  [key: number]: string
} = {
  [mainnet.id]: `https://etherscan.io`,
  [goerli.id]: `https://goerli.etherscan.io`
}

export const beaconUrls: {
  [key: number]: string
} = {
  [mainnet.id]: `https://beaconcha.in`,
  [goerli.id]: `https://prater.beaconcha.in`
}

export const BEACON_NODE_URL = 'https://info-goerli.joinstakehouse.com/'
