import { useContext, useState } from 'react'

import { ContractContext } from '@/context/ContractContext'
import { claimBSN } from '@/utils/contractFunctions'
import { notifyHash } from '@/utils/global'

import { useCustomAccount } from './useCustomAccount'

export const useClaim = () => {
  const { dETHVaultContract, kETHVaultContract, bsnFarmingContract } = useContext(ContractContext)
  const { account, isGnosis } = useCustomAccount()

  const [txResult, setTxResult] = useState<any>()
  const [isClaiming, setIsClaiming] = useState(false)

  const onClaim = async () => {
    if (!dETHVaultContract || !kETHVaultContract || !bsnFarmingContract || !account) return

    setIsClaiming(true)
    let tx = await claimBSN(bsnFarmingContract, 0)

    if (tx) {
      if (!isGnosis) notifyHash(tx.hash)
      await tx.wait()
      setTxResult(tx)
      setIsClaiming(false)
      return true
    } else {
      setIsClaiming(false)
      return false
    }
  }

  const onClear = () => setTxResult(undefined)

  return { onClaim, onClear, isClaiming, txResult }
}
