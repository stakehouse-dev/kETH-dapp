import { ethers } from 'ethers'

import BlueETHIcon from '@/assets/images/icon-blue-eth.svg'
import BSNToken from '@/assets/images/icon-bsn.svg'
import GreenETHIcon from '@/assets/images/icon-deth.svg'
import DETHLPIcon from '@/assets/images/icon-deth-lp.svg'
import ETHIcon from '@/assets/images/icon-eth.svg'
import KETHIcon from '@/assets/images/icon-keth.svg'
import YelloETHIcon from '@/assets/images/icon-yellow-eth.svg'

import { config } from './environment'

export type TokenT = {
  id: number
  symbol: string
  label: string
  icon: string
  address?: string
}

const STETH: TokenT = {
  id: 0,
  symbol: 'stETH',
  label: 'Lido ETH',
  icon: BlueETHIcon,
  address: config.stETHTokenAddress
}

const WSTETH: TokenT = {
  id: 0,
  symbol: 'wstETH',
  label: 'Wrapped Lido ETH',
  icon: BlueETHIcon,
  address: config.wstETHTokenAddress
}

const RETH: TokenT = {
  id: 1,
  symbol: 'rETH',
  label: 'Rocket Pool ETH',
  icon: YelloETHIcon,
  address: config.rETHTokenAddress
}

export const DETH: TokenT = {
  id: 2,
  symbol: 'dETH',
  label: 'Stakehouse ETH',
  icon: GreenETHIcon,
  address: config.dETHTokenAddress
}

export const KETH: TokenT = {
  id: 3,
  symbol: 'kETH',
  label: 'Staked ETH Unit',
  icon: KETHIcon,
  address: config.kETHTokenAddress
}

export const kwETH: TokenT = {
  id: 3,
  symbol: 'kwETH',
  label: 'Staked ETH Unit',
  icon: KETHIcon,
  address: config.kwETHTokenAddress
}
const dETHLP: TokenT = {
  id: 4,
  symbol: 'dETH LP Token',
  label: 'Derivative Ethereum',
  icon: DETHLPIcon,
  address: config.kwETHTokenAddress
}

const ETH: TokenT = {
  id: 5,
  symbol: 'ETH',
  label: 'Ethereum',
  icon: ETHIcon,
  address: ethers.constants.AddressZero
}

export const BSN: TokenT = {
  id: 6,
  symbol: 'BSN',
  label: 'Blockswap Network Token',
  icon: BSNToken,
  address: config.bsnTokenAddress
}

export const GETH: TokenT = {
  id: 7,
  symbol: 'gETH',
  label: 'GiantETHLP',
  icon: KETHIcon,
  address: config.gETHTokenAddress
}

export const KETH_LP_TOKENS: TokenT[] = [STETH, RETH, ETH]
export const KETH_LP_TOKENS_FOR_ACTIVITY: TokenT[] = [STETH, WSTETH, RETH, DETH, ETH]

export const DETH_LP_TOKENS: TokenT[] = [DETH]

export const BSN_LP_TOKENS: TokenT[] = [KETH]

export const DETH_WITHDRAW_TOKENS: TokenT[] = [ETH, DETH]
export const KETH_WITHDRAW_TOKENS: TokenT[] = [KETH]
export const BSN_WITHDRAW_TOKENS: TokenT[] = [KETH]
