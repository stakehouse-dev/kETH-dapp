import { ChangeEvent, Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import ArrowChevronDownIcon from '@/assets/images/icon-chevron-down.svg'
import {
  Button,
  CompletedTxView,
  ErrorModal,
  LoadingModal,
  ModalDialog,
  Slider,
  TextInput
} from '@/components/shared'
import { FarmingModeT } from '@/constants/farmingModes'
import {
  BSN_WITHDRAW_TOKENS,
  DETH_WITHDRAW_TOKENS,
  KETH_WITHDRAW_TOKENS,
  TokenT
} from '@/constants/tokens'
import {
  useAllowanceCheck,
  useMakeRealTxHash,
  useNetworkBasedLinkFactories,
  useRemainedLockUp,
  useWithdraw,
  useWithdrawableAmount
} from '@/hooks'
import { convertDateToString } from '@/utils/global'

import { ModalTokens } from '../../Modals'
import { TAB } from './index'
import styles from './styles.module.scss'

interface WithdrawSectionProps {
  selectedMode: FarmingModeT
  setActiveTab: Dispatch<SetStateAction<TAB>>
}

export const WithdrawSection = ({ selectedMode, setActiveTab }: WithdrawSectionProps) => {
  const [withdrawAmount, setWithdrawAmount] = useState('')
  const [withdrawPercent, setWithdrawPercent] = useState(0)
  const [selectedToken, setSelectedToken] = useState<TokenT>(KETH_WITHDRAW_TOKENS[0])
  const [selectedTokenList, setSelectedTokenList] = useState<TokenT[]>(KETH_WITHDRAW_TOKENS)
  const [openTokenModal, setOpenTokenModal] = useState(false)
  const [withdrawable, setWithdrawable] = useState(false)
  const [failedWithdrawETH, setFailedWithdrawETH] = useState(false)

  const navigate = useNavigate()
  const { remainedLockUp } = useRemainedLockUp(selectedMode)
  const { withdrawableAmount, fetchWithdrawableAmount } = useWithdrawableAmount(selectedMode)
  const { onWithdraw, isWithdrawing, txResult, onClear } = useWithdraw(selectedMode, selectedToken)
  const { hash } = useMakeRealTxHash(txResult?.hash)
  const { makeEtherscanLink } = useNetworkBasedLinkFactories()

  useEffect(() => {
    switch (selectedMode.route) {
      case 'kETH': {
        setSelectedToken(KETH_WITHDRAW_TOKENS[0])
        setSelectedTokenList(KETH_WITHDRAW_TOKENS)
        break
      }
      case 'dETH': {
        setSelectedToken(DETH_WITHDRAW_TOKENS[0])
        setSelectedTokenList(DETH_WITHDRAW_TOKENS)
        break
      }
      case 'bsn': {
        setSelectedToken(BSN_WITHDRAW_TOKENS[0])
        setSelectedTokenList(BSN_WITHDRAW_TOKENS)
        break
      }
      default:
        break
    }
  }, [selectedMode])

  useEffect(() => {
    if (remainedLockUp > 0) {
      setWithdrawable(false)
    } else {
      setWithdrawable(true)
    }
  }, [remainedLockUp])

  const handleChangeWithdrawAmount = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (!value) setWithdrawPercent(0)

    if (!isNaN(Number(value)) && Number(value) <= Number(withdrawableAmount)) {
      setWithdrawAmount(value)
      setWithdrawPercent((Number(value) / Number(withdrawableAmount)) * 100)
    }
  }

  const handleOpenTokenModal = () => {
    if (selectedTokenList.length > 1) setOpenTokenModal(true)
  }
  const handleCloseTokenModal = () => setOpenTokenModal(false)
  const handleSelectToken = (token: TokenT) => {
    setSelectedToken(token)
    handleCloseTokenModal()
  }

  const handleWithdraw = async () => {
    const wasSucceed = await onWithdraw(withdrawAmount)

    if (!wasSucceed && selectedToken.symbol === 'ETH') setFailedWithdrawETH(true)
    setWithdrawAmount('')
    setWithdrawPercent(0)
    fetchWithdrawableAmount()
  }

  const handleCloseSuccessModal = () => {
    onClear()
  }
  const handleGoToHome = () => {
    navigate('/')
  }
  const handleGoStakePage = () => {
    setActiveTab(TAB.DEPOSIT)
    navigate('/farming/bsn')
  }

  const handleChangeSlider = (value: number) => {
    setWithdrawPercent(value)
    if (value < 100) {
      setWithdrawAmount(`${Number(withdrawableAmount) * (value / 100)}`)
    } else {
      setWithdrawAmount(withdrawableAmount)
    }
  }

  const isValidAmount = useMemo(() => {
    if (withdrawAmount && Number(withdrawAmount) > 0) return true

    return false
  }, [withdrawAmount])

  return (
    <div className="px-2 py-4 flex flex-col gap-4">
      <div className="relative">
        <TextInput
          label="Withdraw Amount"
          type="text"
          placeholder="0.00"
          className={styles.input}
          value={withdrawAmount}
          onChange={handleChangeWithdrawAmount}
        />
        <div className="absolute top-8 right-2 flex gap-3 items-center">
          <div
            className="rounded-full p-1 pr-2 bg-background400 flex items-center gap-2 cursor-pointer"
            onClick={handleOpenTokenModal}>
            <img src={selectedToken.icon} alt="token_icon" className="w-6" />
            <p className="text-textBase text-xl font-medium leading-5">{selectedToken.symbol}</p>
            {selectedTokenList.length > 1 && (
              <img src={ArrowChevronDownIcon} alt="down_icon" className="w-3 mr-1" />
            )}
          </div>
        </div>
      </div>
      {withdrawable ? (
        <div className="py-4 flex flex-col gap-4">
          <Slider value={Number(withdrawPercent)} onChange={handleChangeSlider} />
          <Button disabled={isWithdrawing || !isValidAmount} onClick={handleWithdraw}>
            {isWithdrawing ? 'Withdrawing' : 'Confirm'}
          </Button>
        </div>
      ) : selectedMode && selectedMode.route == 'kETH' ? (
        <div className="rounded-2xl bg-primary100 px-6 py-4 flex flex-col gap-4">
          <div>
            <p className="text-primary500 text-center">
              kETH is locked for {convertDateToString(remainedLockUp)}.
            </p>
            <p className="text-primary500 text-center">Want to earn while waiting?</p>
          </div>
          <p className="text-white">Deposit kETH into the kETH Pool to start earning BSN.</p>
          <Button onClick={handleGoStakePage}>Earn More</Button>
          {/* <a
            className="text-sm text-grey700 text-center underline cursor-pointer"
            onClick={handleAllowWithdrawable}>
            Simulate {convertDateToString(remainedLockUp)} have passed
          </a> */}
        </div>
      ) : (
        <div className="rounded-2xl bg-primary100 px-6 py-4 flex flex-col gap-4">
          <div>
            <p className="text-primary500 text-center">
              kwETH is locked for {convertDateToString(remainedLockUp)}.
            </p>
          </div>
        </div>
      )}
      <ModalTokens
        open={openTokenModal}
        onClose={handleCloseTokenModal}
        onSelect={handleSelectToken}
        tokens={selectedTokenList}
      />
      <LoadingModal open={isWithdrawing} title="Confirmation Pending" onClose={() => {}} />
      <ErrorModal
        open={!!failedWithdrawETH}
        onClose={() => setFailedWithdrawETH(false)}
        title="Ooops!"
        message={'The vault does not have enough ETH.'}
        actionButtonContent="Try Again"
        onAction={() => setFailedWithdrawETH(false)}
      />
      <ModalDialog open={!!txResult} onClose={handleCloseSuccessModal}>
        <CompletedTxView
          goToContent="Home"
          title="Success"
          txLink={makeEtherscanLink(hash)}
          onGoToClick={handleGoToHome}
          message={
            <span className="text-sm text-grey300">{`You've successfully withdrawn ETH.`}</span>
          }
        />
      </ModalDialog>
    </div>
  )
}
