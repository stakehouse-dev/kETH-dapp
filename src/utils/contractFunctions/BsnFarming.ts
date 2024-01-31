import { Contract, ethers } from 'ethers'

import { bigToNum, handleErr, noty, numToBig } from '@/utils/global'

export const getTotalSupply = async (contract: Contract) => {
  try {
    const totalSupply = await contract.totalSupply(0)
    return bigToNum(totalSupply)
  } catch (err) {
    console.log('err: ', err)
    noty(handleErr(err, 'Something went wrong.'))
    return 0
  }
}

export const depositBSN = async (contract: Contract, amount: number, pid: number) => {
  try {
    const tx = await contract.deposit(numToBig(pid), numToBig(amount))
    return tx
  } catch (err) {
    console.log('depositBSN error: ', err)
    noty(handleErr(err, 'Something went wrong. Deposit BSN failed.'))
    return undefined
  }
}

export const withdrawBSN = async (contract: Contract, amount: string, pid: number) => {
  try {
    const tx = await contract.withdraw(numToBig(pid), ethers.utils.parseEther(amount))
    return tx
  } catch (err) {
    console.log('withdrawBSN error: ', err)
    noty(handleErr(err, 'Something went wrong. Withdraw transaction failed.'))
    return undefined
  }
}

export const claimBSN = async (contract: Contract, pid: number) => {
  try {
    const tx = await contract.claim(numToBig(pid))
    return tx
  } catch (err) {
    console.log('withdrawBSN error: ', err)
    noty(handleErr(err, 'Something went wrong. Withdraw transaction failed.'))
    return undefined
  }
}

export const userInfo = async (contract: Contract, pid: number, address: string) => {
  try {
    const amount = await contract.userInfo(numToBig(pid), address)
    return amount[0]
  } catch (err) {
    console.log('userInfo error: ', err)
    noty(handleErr(err, 'Something went wrong.'))
    return undefined
  }
}
