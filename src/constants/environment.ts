import { goerli, mainnet } from 'wagmi'

type EnvConfig = {
  networkId: number
  dETHTokenAddress: string | undefined
  rETHTokenAddress: string | undefined
  stETHTokenAddress: string | undefined
  wstETHTokenAddress: string | undefined
  savETHTokenAddress: string | undefined
  kETHTokenAddress: string | undefined
  kwETHTokenAddress: string | undefined
  bsnTokenAddress: string | undefined
  gETHTokenAddress: string | undefined
  yETHTokenAddress: string | undefined
  GRAPHQL_URL: string | undefined
  LSD_GRAPHQL_URL: string | undefined
  kETHStrategyContractAddress: string | undefined
  dETHVaultContractAddress: string | undefined
  bsnFarmingContractAddress: string | undefined
  kETHVaultContractAddress: string | undefined
}

const envConfigs: { [key: number]: EnvConfig } = {
  [mainnet.id]: {
    networkId: mainnet.id,
    dETHTokenAddress: process.env.REACT_APP_MAINNET_DETH_TOKEN_ADDRESS,
    rETHTokenAddress: process.env.REACT_APP_MAINNET_RETH_TOKEN_ADDRESS,
    stETHTokenAddress: process.env.REACT_APP_MAINNET_STETH_TOKEN_ADDRESS,
    wstETHTokenAddress: process.env.REACT_APP_MAINNET_WSTETH_TOKEN_ADDRESS,
    savETHTokenAddress: process.env.REACT_APP_MAINNET_SAVETH_TOKEN_ADDRESS,
    kETHTokenAddress: process.env.REACT_APP_MAINNET_KETH_TOKEN_ADDRESS,
    kwETHTokenAddress: process.env.REACT_APP_MAINNET_KWETH_TOKEN_ADDRESS,
    bsnTokenAddress: process.env.REACT_APP_MAINNET_BSN_TOKEN_ADDRESS,
    gETHTokenAddress: process.env.REACT_APP_MAINNET_GETH_TOKEN_ADDRESS,
    yETHTokenAddress: process.env.REACT_APP_MAINNET_YETH_TOKEN_ADDRESS,
    GRAPHQL_URL: process.env.REACT_APP_MAINNET_GRAPHQL_URL,
    LSD_GRAPHQL_URL: process.env.REACT_APP_LSD_GRAPHQL_URL,
    /////////////////
    kETHStrategyContractAddress: process.env.REACT_APP_MAINNET_KETH_STRATEGY_ADDRESS,
    dETHVaultContractAddress: process.env.REACT_APP_MAINNET_DETH_VAULT_ADDRESS,
    bsnFarmingContractAddress: process.env.REACT_APP_MAINNET_BSN_FARMING_ADDRESS,
    kETHVaultContractAddress: process.env.REACT_APP_MAINNET_KETH_VAULT_ADDRESS
  },
  [goerli.id]: {
    networkId: goerli.id,
    dETHTokenAddress: process.env.REACT_APP_GOERLI_DETH_TOKEN_ADDRESS,
    rETHTokenAddress: process.env.REACT_APP_GOERLI_RETH_TOKEN_ADDRESS,
    stETHTokenAddress: process.env.REACT_APP_GOERLI_STETH_TOKEN_ADDRESS,
    wstETHTokenAddress: process.env.REACT_APP_GOERLI_WSTETH_TOKEN_ADDRESS,
    savETHTokenAddress: process.env.REACT_APP_GOERLI_SAVETH_TOKEN_ADDRESS,
    kETHTokenAddress: process.env.REACT_APP_GOERLI_KETH_TOKEN_ADDRESS,
    kwETHTokenAddress: process.env.REACT_APP_GOERLI_KWETH_TOKEN_ADDRESS,
    bsnTokenAddress: process.env.REACT_APP_GOERLI_BSN_FARMING_ADDRESS,
    gETHTokenAddress: process.env.REACT_APP_GOERLI_GETH_TOKEN_ADDRESS,
    yETHTokenAddress: process.env.REACT_APP_GOERLI_YETH_TOKEN_ADDRESS,
    GRAPHQL_URL: process.env.REACT_APP_GOERLI_GRAPHQL_URL,
    LSD_GRAPHQL_URL: process.env.REACT_APP_LSD_GRAPHQL_URL,
    /////////////////
    kETHStrategyContractAddress: process.env.REACT_APP_GOERLI_KETH_STRATEGY_ADDRESS,
    dETHVaultContractAddress: process.env.REACT_APP_GOERLI_DETH_VAULT_ADDRESS,
    bsnFarmingContractAddress: process.env.REACT_APP_GOERLI_BSN_FARMING_ADDRESS,
    kETHVaultContractAddress: process.env.REACT_APP_GOERLI_KETH_VAULT_ADDRESS
  }
}

export const config = envConfigs[Number(process.env.REACT_APP_NETWORK_ID!)]
