import { ethers } from 'ethers'
import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBalance } from 'wagmi'

import ArrowChevronDownIcon from '@/assets/images/icon-chevron-down.svg'
import EthIcon from '@/assets/images/icon-eth.svg'
import {
  Button,
  CompletedTxView,
  LoadingModal,
  ModalDialog,
  TextInput,
  Tooltip
} from '@/components/shared'
import { MAX_GAS_FEE } from '@/constants'
import { config } from '@/constants/environment'
import { FARMING_MODES, FarmingModeT } from '@/constants/farmingModes'
import { BSN_LP_TOKENS, DETH_LP_TOKENS, KETH_LP_TOKENS, TokenT } from '@/constants/tokens'
import {
  useAllowanceCheck,
  useCustomAccount,
  useDeposit,
  useEstimatedETHReceived,
  useMakeRealTxHash,
  useMinimumDepositAmount,
  useNetworkBasedLinkFactories
} from '@/hooks'
import { convertDateToString, roundNumber } from '@/utils/global'

import { ModalTokens } from '../../Modals'
import styles from './styles.module.scss'

interface DepositSectionProps {
  selectedMode: FarmingModeT
}

export const DepositSection = ({ selectedMode }: DepositSectionProps) => {
  const [depositAmount, setDepositAmount] = useState('')
  const [selectedToken, setSelectedToken] = useState<TokenT>(KETH_LP_TOKENS[0])
  const [selectedTokenList, setSelectedTokenList] = useState<TokenT[]>(KETH_LP_TOKENS)
  const [openTokenModal, setOpenTokenModal] = useState(false)

  const navigate = useNavigate()
  const { account } = useCustomAccount()
  const { minDepositAmount } = useMinimumDepositAmount(selectedMode, selectedToken)
  const { estimatedETHReceived } = useEstimatedETHReceived(
    selectedMode,
    Number(depositAmount),
    selectedToken
  )
  const { onDeposit, isDepositing, txResult, onClear } = useDeposit(selectedMode, selectedToken)
  const { hash } = useMakeRealTxHash(txResult?.hash)
  const { makeEtherscanLink } = useNetworkBasedLinkFactories()
  const { allowance, isApproving, handleApproveToken } = useAllowanceCheck(
    selectedToken.address,
    selectedMode.address!
  )

  let tokenAddress: `0x${string}` = '0x0'

  if (selectedToken.address?.startsWith('0x')) {
    tokenAddress = selectedToken.address as `0x${string}`
  } else {
    throw new Error('Invalid token address')
  }

  let MAX_AMOUNT: string | undefined
  if (selectedToken.address?.indexOf('0x0000000000000000000000000000000000000000') === -1) {
    const { data: { formatted } = {} } = useBalance({
      address: account?.address,
      formatUnits: 'ether',
      token: tokenAddress,
      chainId: config.networkId
    })

    MAX_AMOUNT = formatted
  } else {
    const { data: { formatted } = {} } = useBalance({
      address: account?.address,
      formatUnits: 'ether',
      chainId: config.networkId
    })

    MAX_AMOUNT = formatted
  }

  useEffect(() => {
    switch (selectedMode.route) {
      case 'kETH': {
        setSelectedToken(KETH_LP_TOKENS[0])
        setSelectedTokenList(KETH_LP_TOKENS)
        break
      }
      case 'dETH': {
        setSelectedToken(DETH_LP_TOKENS[0])
        setSelectedTokenList(DETH_LP_TOKENS)
        break
      }
      case 'bsn': {
        setSelectedToken(BSN_LP_TOKENS[0])
        setSelectedTokenList(BSN_LP_TOKENS)
        break
      }
      default:
        break
    }
  }, [selectedMode])

  const handleChangeDepositAmount = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (!value) setDepositAmount('')

    if (value === '.' || !isNaN(Number(value))) {
      setDepositAmount(value)
    }
  }

  const handleSetMaxAmount = () => {
    if (Number(MAX_AMOUNT) > MAX_GAS_FEE) {
      setDepositAmount(MAX_AMOUNT ? `${roundNumber(Number(MAX_AMOUNT) - MAX_GAS_FEE, 3)}` : '')
    } else {
      setDepositAmount('0')
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

  const handleCloseSuccessModal = () => {
    onClear()
  }
  const handleGoToHome = () => {
    navigate('/')
  }

  const handleDeposit = async () => {
    if (!allowance || allowance.lt(ethers.utils.parseEther(`${depositAmount}`))) {
      await handleApproveToken()
    }

    await onDeposit(Number(depositAmount))
    setDepositAmount('')
  }

  const isValidAmount = useMemo(() => {
    if (depositAmount && Number(depositAmount) >= minDepositAmount) return true

    return false
  }, [depositAmount, minDepositAmount])

  const fundEligibility = useMemo(() => {
    if (depositAmount && Number(depositAmount) < Number(MAX_AMOUNT)) return true

    return false
  }, [depositAmount, minDepositAmount])

  return (
    <div className="px-2 py-4 flex flex-col gap-4">
      <div className="relative">
        <TextInput
          label="Deposit Amount"
          type="text"
          className={styles.input}
          pattern="(\.\d{0,1}|\d*\.\d{0,2})"
          value={depositAmount}
          onChange={handleChangeDepositAmount}
        />
        {depositAmount && Number(depositAmount) < minDepositAmount ? (
          <p className="text-sm text-error">
            Deposit amount must be greater than {minDepositAmount}
          </p>
        ) : depositAmount && Number(depositAmount) > Number(MAX_AMOUNT) ? (
          <p className="text-sm text-error">Insufficient funds.</p>
        ) : (
          <></>
        )}
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
          {roundNumber(Number(MAX_AMOUNT) - MAX_GAS_FEE, 3) !==
            roundNumber(Number(depositAmount), 3) && (
            <button
              className="bg-primary50 outline-none p-2 rounded-lg"
              onClick={handleSetMaxAmount}>
              <p className="text-xs font-medium text-primary700">MAX</p>
            </button>
          )}
        </div>
      </div>
      <Button
        disabled={isApproving || isDepositing || !isValidAmount || !fundEligibility}
        onClick={handleDeposit}>
        {isApproving ? 'Approving' : isDepositing ? 'Depositing' : 'Confirm'}
      </Button>
      <div className="pt-4 gap-2 flex flex-col">
        {selectedMode !== FARMING_MODES[2] && (
          <>
            <div className="w-full flex justify-between items-center">
              <div className="flex items-center gap-2">
                <img src={EthIcon} alt="eth-icon" />
                <p className="text-textBase font-medium text-sm flex items-center gap-2">
                  Estimated {selectedMode.lp} received{' '}
                  {selectedMode.route == 'kETH' ? (
                    <Tooltip message="The amount of kETH you receive will depend on the current value of your LST tokens and current weightings in the protocol." />
                  ) : (
                    <Tooltip message="You will receive kwETH at a 1:1 ratio with your dETH deposit." />
                  )}
                </p>
              </div>
              <p className="text-sm text-textLabel font-medium">
                {estimatedETHReceived} {selectedMode.lp}
              </p>
            </div>
          </>
        )}
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src={EthIcon} alt="eth-icon" />
            <p className="text-textBase font-medium text-sm flex items-center gap-2">
              Fee
              <Tooltip message="The LST Optimizer is free to use" />
            </p>
          </div>
          <p className="text-sm text-textLabel font-medium">Free</p>
        </div>
      </div>
      <ModalTokens
        open={openTokenModal}
        onClose={handleCloseTokenModal}
        onSelect={handleSelectToken}
        tokens={selectedTokenList}
      />
      <LoadingModal
        open={isApproving || isDepositing}
        title="Confirmation Pending"
        onClose={() => {}}
      />
      <ModalDialog open={!!txResult} onClose={handleCloseSuccessModal}>
        <CompletedTxView
          goToContent="Home"
          title="Success"
          txLink={makeEtherscanLink(hash)}
          onGoToClick={handleGoToHome}
          message={
            <span className="text-sm text-grey300">{`You've successfully made a deposit.`}</span>
          }
        />
      </ModalDialog>
    </div>
  )
}
