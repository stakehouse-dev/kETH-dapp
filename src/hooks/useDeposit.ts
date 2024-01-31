import { useContext, useState } from 'react'

import { FarmingModeT } from '@/constants/farmingModes'
import { BSN_LP_TOKENS, TokenT } from '@/constants/tokens'
import { ContractContext } from '@/context/ContractContext'
import { depositBSN, depositToken, depositTokenKETH } from '@/utils/contractFunctions'
import { handleErr, notifyHash, noty } from '@/utils/global'

import { useCustomAccount } from './useCustomAccount'

export const useDeposit = (selectMode: FarmingModeT, token: TokenT) => {
  const { dETHVaultContract, kETHVaultContract, bsnFarmingContract } = useContext(ContractContext)
  const { account, isGnosis } = useCustomAccount()

  const [txResult, setTxResult] = useState<any>()
  const [isDepositing, setIsDepositing] = useState(false)

  const onDeposit = async (amount: number) => {
    if (!dETHVaultContract || !kETHVaultContract || !bsnFarmingContract || !account) return

    setIsDepositing(true)
    let tx: any
    switch (selectMode.lp) {
      case 'ETH': {
        tx = await depositToken(dETHVaultContract, amount, account.address)
        break
      }
      case 'kETH': {
        tx = await depositTokenKETH(kETHVaultContract, token, amount, account.address)
        break
      }
      case 'BSN': {
        tx = await depositBSN(bsnFarmingContract, amount, 0)
      }
    }

    if (tx) {
      if (!isGnosis) notifyHash(tx.hash)
      await tx.wait()
      setTxResult(tx)
    }
    setIsDepositing(false)
  }

  const onClear = () => {
    setTxResult(undefined)
  }

  return { onDeposit, onClear, isDepositing, txResult }
}
