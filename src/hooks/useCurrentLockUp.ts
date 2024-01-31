import { useCallback, useContext, useEffect, useState } from 'react'

import { FarmingModeT } from '../constants/farmingModes'
import { ContractContext } from '../context/ContractContext'
import { getCurrentLockUpForPool, getCurrentLockUpForUser } from '../utils/contractFunctions'

export const useCurrentLockUp = (type: 'USER' | 'POOL', mode: FarmingModeT) => {
  const { dETHVaultContract, kETHVaultContract } = useContext(ContractContext)

  const [currentLockUp, setCurrentLockUp] = useState(0)

  const fetchCurrentLockUp = useCallback(async () => {
    if (!dETHVaultContract || !kETHVaultContract) return

    try {
      switch (mode.lp) {
        case 'ETH': {
          const currentLockUp =
            type === 'USER'
              ? await getCurrentLockUpForUser(dETHVaultContract)
              : await getCurrentLockUpForPool(dETHVaultContract)
          setCurrentLockUp(currentLockUp)
          break
        }
        case 'kETH': {
          const currentLockUp =
            type === 'USER'
              ? await getCurrentLockUpForUser(kETHVaultContract)
              : await getCurrentLockUpForPool(kETHVaultContract)
          setCurrentLockUp(currentLockUp)
          break
        }
        default:
          break
      }
    } catch (err) {
      console.log('fetchCurrentLockUp error: ', err)
    }
  }, [dETHVaultContract, type, mode])

  useEffect(() => {
    fetchCurrentLockUp()
  }, [fetchCurrentLockUp])

  return { currentLockUp }
}
