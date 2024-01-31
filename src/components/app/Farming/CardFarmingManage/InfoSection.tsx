import { useMemo } from 'react'
import { useNetwork } from 'wagmi'

import ArrowTopRightIcon from '@/assets/images/icon-arrow-up-right.svg'
import { Button } from '@/components/shared'
import { supportedChains } from '@/constants/chains'
import { explorerUrls } from '@/constants/chains'
import { config } from '@/constants/environment'
import { FarmingModeT } from '@/constants/farmingModes'

interface InfoSectionProps {
  selectedMode: FarmingModeT
}

export const InfoSection = ({ selectedMode }: InfoSectionProps) => {
  const { chain: activeChain } = useNetwork()

  const etherscanLink = useMemo(() => {
    const chainId = activeChain?.id || supportedChains[0].id
    let link = explorerUrls[chainId]
    switch (selectedMode.lp) {
      case 'ETH':
        link = link + `/address/${config.dETHVaultContractAddress}`
        break
      case 'kETH':
        link = link + `/address/${config.kETHVaultContractAddress}`
        break
      case 'BSN':
        link = link + `/address/${config.bsnFarmingContractAddress}`
        break
      default:
        break
    }

    return link
  }, [selectedMode, activeChain])

  return (
    <div className="px-2 py-4">
      <p className="text-textBase font-semibold mb-1">About this strategy</p>
      {selectedMode.lp === 'kETH' && (
        <p className="text-textLabel mb-4">
          Deposit Ethereum LSTs to receive kETH. Your kETH will automatically be sent to your wallet
          after you complete your deposit.
          <br />
          <br />
          kETH is a staked ETH unit giving a target rate. As long as you hold kETH you will earn
          rewards.
          <br />
          <br />
          kETH is redeemable for ETH or dETH.
        </p>
      )}
      {selectedMode.lp === 'BSN' && (
        <p className="text-textLabel mb-4">
          Deposit kETH to earn BSN.
          <br />
          <br />
          BSN is a critical component across the Blockswap ecosystem and is necessary to interact
          with Blockswap Cloud.
        </p>
      )}
      {selectedMode.lp === 'ETH' && (
        <p className="text-textLabel mb-4">
          Depositing dETH will allow you to recieve ETH 1:1 after the lockup period has ended.
        </p>
      )}
      <div className="flex gap-3">
        <div className="py-2.5 px-4 bg-background500 rounded-lg border-borderColor border">
          <a
            href={'https://docs-ipfs.joinstakehouse.com/kETH/kETH_kwETH'}
            target="_blank"
            rel="noreferrer"
            className="flex gap-2">
            Learn More
            <img src={ArrowTopRightIcon} alt="top-right" />
          </a>
        </div>
        <div className="py-2.5 px-4 bg-background500 rounded-lg border-borderColor border">
          <a href={etherscanLink} target="_blank" rel="noreferrer" className="flex gap-2">
            Etherscan
            <img src={ArrowTopRightIcon} alt="top-right" />
          </a>
        </div>
      </div>
    </div>
  )
}
