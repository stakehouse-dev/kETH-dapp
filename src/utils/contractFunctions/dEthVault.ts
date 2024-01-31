import { BigNumber, Contract, ethers } from 'ethers'

import { bigToNum, handleErr, noty, numToBig } from '@/utils/global'

import { DETH_WITHDRAW_TOKENS, TokenT } from '../../constants/tokens'

export const getMinDepositAmount = async (contract: Contract) => {
  try {
    const minDepositAmount = await contract.minDepositAmount()
    return bigToNum(minDepositAmount)
  } catch (err) {
    console.log('getMinDepositAmount err: ', err)
    return 0
  }
}

export const getEstimatedETHReceived = async (contract: Contract, depositAmount: number) => {
  try {
    const estimatedETHReceived = await contract.amountToShare(numToBig(depositAmount))
    return bigToNum(estimatedETHReceived)
  } catch (err) {
    console.log('getEstimatedETHReceived error: ', err)
    return 0
  }
}

export const getCurrentLockUpForUser = async (contract: Contract) => {
  try {
    const currentLockUpForUser = await contract.minLockUpPeriodForUser()
    return BigNumber.from(currentLockUpForUser).toNumber()
  } catch (err) {
    console.log('getCurrentLockUpForUser error: ', err)
    noty(handleErr(err, 'Something went wrong. Cannot get lockup period of user.'))
    return 0
  }
}

export const getCurrentLockUpForPool = async (contract: Contract) => {
  try {
    const currentLockUpForPool = await contract.minLockUpPeriodForPool()
    return BigNumber.from(currentLockUpForPool).toNumber()
  } catch (err) {
    console.log('getCurrentLockUpForPool error: ', err)
    noty(handleErr(err, 'Something went wrong. Cannot get lockup period of pool.'))
    return 0
  }
}

export const depositToken = async (contract: Contract, amount: number, address: string) => {
  try {
    const tx = await contract.deposit(ethers.utils.parseEther(`${amount}`), address)
    return tx
  } catch (err) {
    console.log('depositToken error: ', err)
    noty(handleErr(err, 'Something went wrong. Depositing token failed.'))
    return undefined
  }
}

export const shareToAmount = async (contract: Contract, amount: BigNumber) => {
  try {
    const withdrawableAmount = await contract.shareToAmount(amount)
    return ethers.utils.formatEther(withdrawableAmount)
  } catch (err) {
    console.log('shareToAmount error: ', err)
    noty(handleErr(err, 'Something went wrong. Cannot get withdrawable amount.'))
    return '0'
  }
}

export const amountToShare = async (contract: Contract, amount: BigNumber) => {
  try {
    return await contract.amountToShare(amount)
  } catch (err) {
    console.log('amountToShare error: ', err)
    noty(handleErr(err, 'Something went wrong. Cannot get share amount.'))
    return 0
  }
}

export const balanceOf = async (contract: Contract, address: string) => {
  try {
    const balance: BigNumber = await contract.balanceOf(address)
    return balance
  } catch (err) {
    console.log('balanceOf error: ', err)
    noty(handleErr(err, 'Something went wrong. Cannot get the balance of DETH.'))
    return undefined
  }
}

export const withdrawDETH = async (
  contract: Contract,
  withdrawTo: TokenT,
  amount: string,
  address: string
) => {
  try {
    const weiAmount = ethers.utils.parseEther(amount)
    const shareAmount = await amountToShare(contract, weiAmount)
    const tx =
      withdrawTo.symbol === DETH_WITHDRAW_TOKENS[0].symbol
        ? await contract.withdrawToETH(shareAmount, address)
        : await contract.withdrawToDETH(shareAmount, address)
    return tx
  } catch (err) {
    console.log('withdrawDETH error: ', err)
    noty(handleErr(err, 'Something went wrong. Withdraw transaction failed.'))
    return undefined
  }
}
