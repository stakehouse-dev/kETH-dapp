import axios from 'axios'
import { BigNumber, Contract, ethers } from 'ethers'
import { formatEther } from 'ethers/lib/utils.js'
import { useCallback, useContext, useEffect, useState } from 'react'

import { ContractContext } from '@/context/ContractContext'

import { config } from '../constants/environment'
import { bigToNum, numToBig } from '../utils/global'
import { useCustomAccount } from './useCustomAccount'

export type SummaryValueT = {
  totalETH: number
  dETHVaultBalance: number
  kETHVaultBalance: number
  bsnEarning: number
  kETHEarning: number
}

export const useSummaryValues = () => {
  const { account, ethPrice } = useCustomAccount()
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

        const kETHEarning = await getEarnings(account.address, kETHVaultContract)
        // const kETHEarning = '0'

        setResult({
          totalETH: userTotalETHBalance,
          dETHVaultBalance: userDETHBalanceOfDETHVault,
          kETHVaultBalance: kETHBalance,
          bsnEarning: bigToNum(bsnEarning),
          kETHEarning: Number(formatEther(kETHEarning))
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
const getEarnings = async (user: string, kETHVault: Contract) => {
  const userEvents = []
  const count = 1000
  let skip = 0

  // eslint-disable-next-line no-constant-condition
  while (1) {
    let query = `
      {
          events(
              first: ${count}
              skip: ${skip}
              orderBy: blockNumber
              orderDirection: asc
              where: {
                values_contains: [
                  "${user.toLowerCase()}"
                ]
                type_in: [
                  "KETH.Transfer",
                ]
              }
          ) {
              id
              tx
              from
              blockNumber
              blockTimestamp
              type
              keys
              values
          }
      }
      `

    const data = (
      await axios.post(config.GRAPHQL_URL || '', {
        query
      })
    ).data

    const { data: { events: events = [] } = {} } = data

    userEvents.push(...events)

    if (events.length < count) {
      break
    }
    skip += count
  }

  let userDepositValue = BigNumber.from('0')
  let userBalance = BigNumber.from('0')

  for (let i = 0; i < userEvents.length; i++) {
    const event = userEvents[i]
    const [from, to, shares, value] = event.values

    if (to.toLowerCase() == user.toLowerCase()) {
      userDepositValue = userDepositValue.add(value)
      userBalance = userBalance.add(shares)
    } else if (from.toLowerCase() == user.toLowerCase()) {
      userDepositValue = userDepositValue.mul(userBalance.sub(shares)).div(userBalance)
      userBalance = userBalance.sub(shares)
    }
  }
  // console.log('userDepositValue =', Number(userDepositValue) / 1e18)

  const currentValue = await kETHVault.shareToAmount(userBalance)
  // console.log('currentValue =', Number(currentValue) / 1e18)

  const earning = currentValue.sub(userDepositValue)
  // console.log('earning =', Number(earning) / 1e18)

  return earning
}
