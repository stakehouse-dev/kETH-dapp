import { BigNumber, ethers } from 'ethers'
import { useCallback, useContext, useEffect, useState } from 'react'

import { ContractContext } from '@/context/ContractContext'

import { bigToNum, numToBig } from '../utils/global'
import { useCustomAccount } from './useCustomAccount'

export type SummaryValueT = {
  totalETH: number
  dETHVaultBalance: number
  kETHVaultBalance: number
  bsnEarning: number
}

export const useSummaryValues = () => {
  const { account } = useCustomAccount()
  const { kETHStrategyContract, bsnFarmingContract, dETHVaultContract, kETHVaultContract } =
    useContext(ContractContext)

  const [result, setResult] = useState<SummaryValueT>()

  const fetchData = useCallback(async () => {
    if (
      kETHStrategyContract &&
      bsnFarmingContract &&
      dETHVaultContract &&
      kETHVaultContract &&
      account
    ) {
      let totalETHAvailable
      try {
        totalETHAvailable = await kETHStrategyContract.reserves(ethers.constants.AddressZero)
      } catch (err) {
        console.log('totalETHAvailable error: ', err)
        totalETHAvailable = BigNumber.from(0)
      }

      try {
        const kETHTotalAssets: BigNumber = await kETHVaultContract.totalAssets()
        const dETHTotalAssets: BigNumber = await dETHVaultContract.totalAssets()

        // User Deposit balances
        const kETHVaultTotalSupply = await kETHVaultContract.totalSupply()
        const dETHVaultTotalSupply = await dETHVaultContract.totalSupply()
        const kETHVaultBalance = await kETHVaultContract.balanceOf(account.address)
        const dETHVaultBalance = await dETHVaultContract.balanceOf(account.address)

        // Your earning for bsn
        const bsnEarning = await bsnFarmingContract.pendingBsn(numToBig(0), account.address)
        const stakedKETHBalance = (await bsnFarmingContract.userInfo(numToBig(0), account.address))
          .amount
        const kETHBalance = bigToNum(kETHVaultBalance) + bigToNum(stakedKETHBalance)

        const userDETHBalanceOfDETHVault =
          (bigToNum(dETHTotalAssets) * bigToNum(dETHVaultBalance)) / bigToNum(dETHVaultTotalSupply)

        const userTotalETHBalance =
          (bigToNum(kETHTotalAssets) * kETHBalance) / bigToNum(kETHVaultTotalSupply) +
          userDETHBalanceOfDETHVault

        setResult({
          totalETH: userTotalETHBalance,
          dETHVaultBalance: userDETHBalanceOfDETHVault,
          kETHVaultBalance: kETHBalance,
          bsnEarning: bigToNum(bsnEarning)
        })
      } catch (err) {
        console.log('allassetsratio err: ', err)
      }
    }
  }, [kETHStrategyContract, bsnFarmingContract, kETHVaultContract, account])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { result }
}
