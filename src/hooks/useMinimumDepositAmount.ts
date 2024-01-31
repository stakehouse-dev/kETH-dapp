import { useCallback, useContext, useEffect, useState } from 'react'

import { config } from '@/constants/environment'
import { FarmingModeT } from '@/constants/farmingModes'
import { TokenT } from '@/constants/tokens'
import { ContractContext } from '@/context/ContractContext'
import { getMinDepositAmount, getMinDepositAmountKETH } from '@/utils/contractFunctions'

export const useMinimumDepositAmount = (mode: FarmingModeT, token?: TokenT) => {
  const { dETHVaultContract, kETHStrategyContract } = useContext(ContractContext)

  const [minDepositAmount, setMinDepositAmount] = useState(0)

  const fetchMinDepositAmount = useCallback(async () => {
    if (!dETHVaultContract || !kETHStrategyContract) return

    try {
      switch (mode.lp) {
        case 'ETH': {
          const minDepositAmount = await getMinDepositAmount(dETHVaultContract)
          setMinDepositAmount(minDepositAmount)
          break
        }
        case 'kETH': {
          if (token && token.address) {
            if (token.symbol === 'stETH') {
              const minDepositAmount = await getMinDepositAmountKETH(
                kETHStrategyContract,
                config.wstETHTokenAddress!
              )
              setMinDepositAmount(minDepositAmount)
            } else {
              const minDepositAmount = await getMinDepositAmountKETH(
                kETHStrategyContract,
                token.address
              )
              setMinDepositAmount(minDepositAmount)
            }
          } else {
            setMinDepositAmount(0)
          }
          break
        }
        default:
          break
      }
    } catch (err) {
      console.log('fetchMinDepositAmount error: ', err)
    }
  }, [mode, token, dETHVaultContract, kETHStrategyContract])

  useEffect(() => {
    fetchMinDepositAmount()
  }, [fetchMinDepositAmount])

  return { minDepositAmount }
}
