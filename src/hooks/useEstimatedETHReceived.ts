import { useCallback, useContext, useEffect, useState } from 'react'

import { FarmingModeT } from '@/constants/farmingModes'
import { ContractContext } from '@/context/ContractContext'
import { getEstimatedETHReceived, getEstimatedETHReceivedKETH } from '@/utils/contractFunctions'

import { TokenT } from '../constants/tokens'

export const useEstimatedETHReceived = (
  mode: FarmingModeT,
  depositAmount: number,
  token?: TokenT
) => {
  const { dETHVaultContract, kETHVaultContract, kETHStrategyContract } = useContext(ContractContext)

  const [estimatedETHReceived, setEstimatedETHReceived] = useState(0)

  const fetchEstmiatedETHReceived = useCallback(async () => {
    if (!dETHVaultContract || !kETHVaultContract || !depositAmount || !kETHStrategyContract) return

    try {
      switch (mode.lp) {
        case 'ETH': {
          const estimatedETHReceived = await getEstimatedETHReceived(
            dETHVaultContract,
            depositAmount
          )
          setEstimatedETHReceived(estimatedETHReceived)
          break
        }
        case 'kETH': {
          if (token && token.address) {
            const estimatedETHReceived = await getEstimatedETHReceivedKETH(
              kETHVaultContract,
              kETHStrategyContract,
              token,
              depositAmount
            )
            setEstimatedETHReceived(estimatedETHReceived)
          } else {
            setEstimatedETHReceived(0)
          }
          break
        }
        default:
          break
      }
    } catch (err) {
      console.log('fetchEstmiatedETHReceived error: ', err)
    }
  }, [dETHVaultContract, kETHVaultContract, kETHStrategyContract, mode, depositAmount, token])

  useEffect(() => {
    fetchEstmiatedETHReceived()
  }, [fetchEstmiatedETHReceived])

  return { estimatedETHReceived }
}
