import BgGradient1 from '@/assets/images/bg-gradient-1.png'
import BgGradient2 from '@/assets/images/bg-gradient-2.png'
import BgGradient3 from '@/assets/images/bg-gradient-3.png'
import BlueETHIcon from '@/assets/images/icon-blue-eth.svg'
import CircleLogoIcon from '@/assets/images/icon-circle-logo.svg'
import GreenETHIcon from '@/assets/images/icon-green-eth.svg'
import YelloETHIcon from '@/assets/images/icon-yellow-eth.svg'

import { config } from './environment'

export type FarmingModeT = {
  id: number
  icons: string[]
  bg: string
  route: string
  address: string | undefined
  lp: string
  title: string
  description: string
  tvl: number
  apr: number
}

export const FARMING_MODES: FarmingModeT[] = [
  {
    id: 0,
    icons: [BlueETHIcon, YelloETHIcon, GreenETHIcon],
    bg: BgGradient1,
    route: 'kETH',
    address: config.kETHVaultContractAddress,
    lp: 'kETH',
    title: 'Deposit LSTs',
    description: 'Deposit LSTs to receive kETH',
    tvl: 500,
    apr: 18
  },
  {
    id: 1,
    icons: [GreenETHIcon],
    bg: BgGradient2,
    route: 'dETH',
    address: config.dETHVaultContractAddress,
    lp: 'ETH',
    title: 'Deposit dETH',
    description: 'Deposit dETH to receive ETH',
    tvl: 500,
    apr: 18
  },
  {
    id: 2,
    icons: [CircleLogoIcon],
    bg: BgGradient3,
    route: 'bsn',
    address: config.bsnFarmingContractAddress,
    lp: 'BSN',
    title: 'Stake kETH',
    description: 'Deposit kETH to earn BSN',
    tvl: 500,
    apr: 18
  }
]
