import { BigNumber, Contract, ethers } from 'ethers'

import { TokenT } from '@/constants/tokens'
import { bigToNum, handleErr, noty, numToBig } from '@/utils/global'

export const getTotalAssets = async (contract: Contract) => {
  try {
    const totalAssets = await contract.totalAssets()
    return bigToNum(totalAssets)
  } catch (err) {
    console.log('err: ', err)
    return 0
  }
}

export const getMinDepositAmountKETH = async (contract: Contract, tokenAddress: string) => {
  try {
    const minDepositAmount = await contract.minDepositAmount(tokenAddress)
    return bigToNum(minDepositAmount)
  } catch (err) {
    console.log('getMinDepositAmount err: ', err)
    noty(handleErr(err, 'Something went wrong.'))
    return 0
  }
}

export const getEstimatedETHReceivedKETH = async (
  contract: Contract,
  stragyContract: Contract,
  token: TokenT,
  depositAmount: number
) => {
  try {
    const assetValue = await stragyContract.assetValue(token.address, numToBig(depositAmount))
    const estimatedETHReceived = await contract.amountToShare(assetValue)
    return bigToNum(estimatedETHReceived)
  } catch (err) {
    console.log('getEstimatedETHReceived error: ', err)
    noty(handleErr(err, 'Something went wrong.'))
    return 0
  }
}

export const depositTokenKETH = async (
  contract: Contract,
  token: TokenT,
  amount: number,
  address: string
) => {
  try {
    let tx

    if (token.symbol.toLowerCase() !== 'eth') {
      tx = await contract.deposit(
        token.address,
        ethers.utils.parseEther(`${amount}`),
        address,
        false
      )
    } else {
      tx = await contract.deposit(
        token.address,
        ethers.utils.parseEther(`${amount}`),
        address,
        false,
        { value: ethers.utils.parseEther(`${amount}`) }
      )
    }

    return tx
  } catch (err) {
    console.log('depositTokenKETH error: ', err)
    noty(handleErr(err, 'Something went wrong. Depositing kETH failed.'))
    return undefined
  }
}

export const getStartTimeKETH = async (contract: Contract) => {
  try {
    const startTime = await contract.startTime()
    return BigNumber.from(startTime).toNumber()
  } catch (err) {
    console.log('getStartTimeKETH error: ', err)
    noty(handleErr(err, 'Something went wrong. Cannot get start time of kETH.'))
    return 0
  }
}

export const getUserLastInteractedTimeKETH = async (contract: Contract, address: string) => {
  try {
    const lastInteractedTimestamp = await contract.userLastInteractedTimestamp(address)
    return BigNumber.from(lastInteractedTimestamp).toNumber()
  } catch (err) {
    console.log('getUserLastInteractedTimeKETH error: ', err)
    noty(handleErr(err, 'Something went wrong. Cannot get last interacted time of kETH'))
    return 0
  }
}

export const withdrawKETH = async (contract: Contract, amount: string, address: string) => {
  try {
    const weiAmount = ethers.utils.parseEther(amount)
    const tx = await contract.withdraw(weiAmount, address)
    return tx
  } catch (err) {
    console.log('withdrawDETH error: ', err)
    noty(handleErr(err, 'Something went wrong. Withdraw transaction failed.'))
    return undefined
  }
}
