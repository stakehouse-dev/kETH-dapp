import { ChangeEvent, useContext, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button, CompletedTxView, LoadingModal, ModalDialog, TextInput } from '@/components/shared'
import { BSN } from '@/constants/tokens'
import { ContractContext } from '@/context/ContractContext'
import {
  useClaim,
  useCustomAccount,
  useMakeRealTxHash,
  useNetworkBasedLinkFactories
} from '@/hooks'
import { bigToNum, numToBig } from '@/utils/global'

import styles from '../Farming/CardFarmingManage/styles.module.scss'

export const CardClaimBSN = () => {
  const navigate = useNavigate()
  const { bsnFarmingContract } = useContext(ContractContext)
  const { account } = useCustomAccount()
  const { isClaiming, txResult, onClaim, onClear } = useClaim()
  const { hash } = useMakeRealTxHash(txResult?.hash)
  const { makeEtherscanLink } = useNetworkBasedLinkFactories()

  const [maxAmount, setMaxAmount] = useState(0)

  useEffect(() => {
    const fetchClaimAmount = async () => {
      if (bsnFarmingContract) {
        const bsnEarning = await bsnFarmingContract.pendingBsn(numToBig(0), account.address)
        setMaxAmount(bigToNum(bsnEarning))
      }
    }

    fetchClaimAmount()
  }, [bsnFarmingContract])

  const handleClaim = async () => {
    await onClaim()
  }

  const handleGoToHome = () => {
    navigate('/')
  }

  const isValidAmount = useMemo(() => {
    if (maxAmount && Number(maxAmount) > 0) return true

    return false
  }, [maxAmount])

  return (
    <div className="flex-1 md:flex-5 rounded-2xl bg-background300 border border-borderColor p-5">
      <div className="px-2 py-4 flex flex-col gap-4">
        <div className="relative">
          <TextInput
            label="Claimable Amount"
            type="text"
            className={styles.input}
            pattern="(\.\d{0,1}|\d*\.\d{0,2})"
            disabled
            value={maxAmount}
          />
          <div className="absolute top-8 right-2 flex gap-3 items-center">
            <div className="rounded-full p-1 pr-2 bg-background400 flex items-center gap-2 cursor-pointer">
              <img src={BSN.icon} alt="token_icon" className="w-6" />
              <p className="text-textBase text-xl font-medium leading-5">{BSN.symbol}</p>
            </div>
          </div>
        </div>
        <div className="py-4 flex flex-col gap-4">
          {/* <Slider value={Number(claimPercent)} onChange={handleChangeSlider} /> */}
          <Button disabled={isClaiming || !isValidAmount} onClick={handleClaim}>
            {isClaiming ? 'Claiming' : 'Claim'}
          </Button>
        </div>
      </div>
      <LoadingModal open={isClaiming} title="Confirmation Pending" onClose={() => {}} />
      <ModalDialog open={!!txResult} onClose={onClear}>
        <CompletedTxView
          goToContent="Home"
          title="Success"
          txLink={makeEtherscanLink(hash)}
          onGoToClick={handleGoToHome}
          message={
            <span className="text-sm text-grey300">{`You’ve successfully claimed BSN.`}</span>
          }
        />
      </ModalDialog>
    </div>
  )
}
