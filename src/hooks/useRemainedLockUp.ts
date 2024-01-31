import { useCallback, useContext, useEffect, useState } from 'react'

import { FarmingModeT } from '@/constants/farmingModes'
import { ContractContext } from '@/context/ContractContext'
import { getStartTimeKETH, getUserLastInteractedTimeKETH } from '@/utils/contractFunctions'

import { useCurrentLockUp } from './useCurrentLockUp'
import { useCustomAccount } from './useCustomAccount'

export const useRemainedLockUp = (selectMode: FarmingModeT) => {
  const { currentLockUp } = useCurrentLockUp('POOL', selectMode)
  const { currentLockUp: currentLockUpForUser } = useCurrentLockUp('USER', selectMode)
  const [remainedLockUp, setRemainedLockUp] = useState(0)

  const { kETHVaultContract, dETHVaultContract } = useContext(ContractContext)
  const { account } = useCustomAccount()

  const calculateRemainedLockUp = useCallback(async () => {
    if (selectMode.lp === 'kETH' && kETHVaultContract && account) {
      const startTime = await getStartTimeKETH(kETHVaultContract)
      const requiredTime = startTime + currentLockUp
      const remainedLockUp = requiredTime - Math.floor(new Date().getTime() / 1000)

      const lastInteractedTimestamp = await getUserLastInteractedTimeKETH(
        kETHVaultContract,
        account.address
      )
      const userRequiredTime = lastInteractedTimestamp + currentLockUpForUser
      const remainedUserLockUp = userRequiredTime - Math.floor(new Date().getTime() / 1000)

      if (remainedLockUp < 0 && remainedUserLockUp < 0) setRemainedLockUp(0)
      else
        setRemainedLockUp(remainedLockUp > remainedUserLockUp ? remainedLockUp : remainedUserLockUp)
    } else if (selectMode.lp === 'ETH' && dETHVaultContract && account) {
      const startTime = await getStartTimeKETH(dETHVaultContract)
      const requiredTime = startTime + currentLockUp
      const remainedLockUp = requiredTime - Math.floor(new Date().getTime() / 1000)

      const lastInteractedTimestamp = await getUserLastInteractedTimeKETH(
        dETHVaultContract,
        account.address
      )
      const userRequiredTime = lastInteractedTimestamp + currentLockUpForUser
      const remainedUserLockUp = userRequiredTime - Math.floor(new Date().getTime() / 1000)

      if (remainedLockUp < 0 && remainedUserLockUp < 0) setRemainedLockUp(0)
      else
        setRemainedLockUp(remainedLockUp > remainedUserLockUp ? remainedLockUp : remainedUserLockUp)
    } else {
      setRemainedLockUp(0)
    }
  }, [selectMode, kETHVaultContract, dETHVaultContract, currentLockUp, currentLockUpForUser])

  useEffect(() => {
    calculateRemainedLockUp()
  }, [calculateRemainedLockUp])

  return { remainedLockUp }
}
