import { useCallback, useContext, useState } from 'react'

import { FarmingModeT } from '@/constants/farmingModes'
import { TokenT } from '@/constants/tokens'
import { ContractContext } from '@/context/ContractContext'
import { withdrawBSN, withdrawDETH, withdrawKETH } from '@/utils/contractFunctions'
import { notifyHash } from '@/utils/global'

import { useCustomAccount } from './useCustomAccount'

export const useWithdraw = (selectedMode: FarmingModeT, token: TokenT) => {
  const { dETHVaultContract, kETHVaultContract, bsnFarmingContract } = useContext(ContractContext)
  const { account, isGnosis } = useCustomAccount()

  const [txResult, setTxResult] = useState<any>()
  const [isWithdrawing, setIsWithdrawing] = useState(false)

  const onWithdraw = async (amount: string) => {
    if (!dETHVaultContract || !kETHVaultContract || !bsnFarmingContract || !account) return

    setIsWithdrawing(true)
    let tx: any
    switch (selectedMode.lp) {
      case 'ETH': {
        tx = await withdrawDETH(dETHVaultContract, token, amount, account.address)
        break
      }
      case 'kETH': {
        tx = await withdrawKETH(kETHVaultContract, amount, account.address)
        break
      }
      case 'BSN': {
        tx = await withdrawBSN(bsnFarmingContract, amount, 0)
        break
      }
      default:
        break
    }

    if (tx) {
      if (!isGnosis) notifyHash(tx.hash)
      await tx.wait()
      setTxResult(tx)
      setIsWithdrawing(false)
      return true
    } else {
      setIsWithdrawing(false)
      return false
    }
  }

  const onClear = () => setTxResult(undefined)

  return { onWithdraw, onClear, isWithdrawing, txResult }
}
