import { ethers } from 'ethers'
import { useCallback, useContext, useEffect, useState } from 'react'

import { FarmingModeT } from '@/constants/farmingModes'
import { ContractContext } from '@/context/ContractContext'
import { balanceOf, shareToAmount, userInfo } from '@/utils/contractFunctions'
import { bigToNum } from '@/utils/global'

import { useCustomAccount } from './useCustomAccount'

export const useWithdrawableAmount = (selectedMode: FarmingModeT) => {
  const { dETHVaultContract, kETHVaultContract, bsnFarmingContract } = useContext(ContractContext)
  const { account } = useCustomAccount()

  const [withdrawableAmount, setWithdrawableAmount] = useState('')

  const fetchWithdrawableAmount = useCallback(async () => {
    if (dETHVaultContract && kETHVaultContract && bsnFarmingContract && account) {
      if (selectedMode.lp === 'ETH') {
        const balance = await balanceOf(dETHVaultContract, account.address)

        if (balance) {
          const withdrawableAmount = await shareToAmount(dETHVaultContract, balance)
          setWithdrawableAmount(withdrawableAmount)
        }
      } else if (selectedMode.lp === 'kETH') {
        const balance = await balanceOf(kETHVaultContract, account.address)

        if (balance) {
          setWithdrawableAmount(ethers.utils.formatEther(balance))
        }
      } else if (selectedMode.lp === 'BSN') {
        const balance = await userInfo(bsnFarmingContract, 0, account.address)

        if (balance) {
          setWithdrawableAmount(ethers.utils.formatEther(balance))
        }
      }
    }
  }, [dETHVaultContract, kETHVaultContract, account])

  useEffect(() => {
    fetchWithdrawableAmount()
  }, [fetchWithdrawableAmount])

  return { withdrawableAmount, fetchWithdrawableAmount }
}
