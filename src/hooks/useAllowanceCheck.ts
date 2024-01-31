import { BigNumber, constants, ethers } from 'ethers'
import { useCallback, useEffect, useState } from 'react'
import { useSigner } from 'wagmi'

import { config } from '@/constants/environment'
import { getERCToken, notifyHash } from '@/utils/global'

import { useCustomAccount } from './useCustomAccount'

export const useAllowanceCheck = (tokenAddress: string | undefined, sender: string) => {
  const [allowance, setAllowance] = useState<BigNumber>()
  const [isApproving, setApproving] = useState(false)

  const { data: signer } = useSigner()
  const { account, isGnosis } = useCustomAccount()

  const fetchAllowance = useCallback(async () => {
    if (signer && account && tokenAddress) {
      if (
        tokenAddress.toLowerCase().trim() ===
        '0x0000000000000000000000000000000000000000'.toLowerCase()
      ) {
        // Set infinite allowance for ETH (120M)
        setAllowance(ethers.BigNumber.from('120000000000000000000000000'))
        return
      }

      const tokenContract = getERCToken(signer, tokenAddress)

      if (tokenContract) {
        try {
          const allowance = await tokenContract.allowance(account.address, sender)
          setAllowance(allowance)
        } catch (err) {
          console.log('fetchAllowance error: ', err)
        }
      }
    }
  }, [tokenAddress, sender, signer, account])

  useEffect(() => {
    fetchAllowance()
  }, [fetchAllowance])

  const handleApproveToken = async () => {
    if (signer && tokenAddress) {
      const tokenContract = getERCToken(signer, tokenAddress)

      if (tokenContract) {
        setApproving(true)
        try {
          const tx = await tokenContract.approve(sender, constants.MaxUint256)
          if (!isGnosis) notifyHash(tx.hash)
          await tx.wait()
          await fetchAllowance()
        } catch (err) {
          console.log('handleApproveToken error: ', err)
        }
        setApproving(false)
      }
    }
  }

  return { allowance, isApproving, handleApproveToken }
}
