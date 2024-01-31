import axios from 'axios'
import { BigNumber, Contract } from 'ethers'
import { createContext, ReactNode, useCallback, useEffect, useState } from 'react'
import { useNetwork, useSigner } from 'wagmi'

import { config } from '@/constants/environment'
import { getTotalAssets, getTotalSupply } from '@/utils/contractFunctions'
import {
  bigToNum,
  getBsnFarmingContract,
  getDEthVaultContract,
  getERCToken,
  getKETHStrategyContract,
  getKETHVaultContract,
  getRETHTokenContract,
  getWstETHTokenContract
} from '@/utils/global'

const queryStETHApr = async (): Promise<number> => {
  try {
    const stETHResult = (await axios.get('https://eth-api.lido.fi/v1/protocol/steth/apr/last')).data
    const stETH = Number(stETHResult.data.apr) * 0.9
    return stETH
  } catch (e) {
    console.log(e)
  }

  return 0
}

const queryRETHApr = async (): Promise<number> => {
  try {
    const rETHResult = (await axios.get('https://rocketpool.net/api/mainnet/payload')).data
    const rETH = Number(rETHResult.rethAPR) * 0.9
    return rETH
  } catch (e) {
    console.log(e)
  }

  return 0
}

const queryDETHApr = async (): Promise<number> => {
  try {
    const rETHResult = (await axios.get('https://beaconcha.in/api/v1/ethstore/latest')).data
    const beaconChainApr = Number(rETHResult.data.avgapr7d) * 100
    const dETH = (beaconChainApr * 32) / 24
    return dETH
  } catch (e) {
    console.log(e)
  }

  return 0
}

interface Props {
  children: ReactNode
}

export const ContractContext = createContext<{
  kETHStrategyContract: Contract | undefined
  dETHVaultContract: Contract | undefined
  bsnFarmingContract: Contract | undefined
  kETHVaultContract: Contract | undefined
  rETHTokenContract: Contract | undefined
  savETHTokenContract: Contract | undefined
  wstETHContract: Contract | undefined
  tvlValues: any
  kETHApr: number
  kETHTargetApr: number
  refetchTvls: () => void
}>({
  kETHStrategyContract: undefined,
  dETHVaultContract: undefined,
  bsnFarmingContract: undefined,
  kETHVaultContract: undefined,
  rETHTokenContract: undefined,
  savETHTokenContract: undefined,
  wstETHContract: undefined,
  tvlValues: { 0: 0, 1: 0, 2: 0 },
  kETHApr: 0,
  kETHTargetApr: 0,
  refetchTvls: () => {}
})

export const ContractProvider = ({ children }: Props) => {
  const { chain: activeChain } = useNetwork()
  const { data: signer } = useSigner()
  const [kETHStrategyContract, setKETHStrategyContract] = useState<Contract>()
  const [dETHVaultContract, setDETHVaultContract] = useState<Contract>()
  const [bsnFarmingContract, setBsnFarmingContract] = useState<Contract>()
  const [kETHVaultContract, setKETHVaultContract] = useState<Contract>()
  const [rETHTokenContract, setRETHTokenContract] = useState<Contract>()
  const [savETHTokenContract, setSavETHTokenContract] = useState<Contract>()
  const [wstETHContract, setWstETHContract] = useState<Contract>()
  const [tvlValues, setTvlValues] = useState<any>({ 0: 0, 1: 0, 2: 0 })
  const [kETHApr, setKETApr] = useState<any>(0)
  const [kETHTargetApr, setKETHTargetApr] = useState<any>(0)

  useEffect(() => {
    async function loadContracts() {
      if (signer) {
        const contract = getKETHStrategyContract(signer, config.kETHStrategyContractAddress!)
        setKETHStrategyContract(contract)

        const dEthVaultContract = getDEthVaultContract(signer, config.dETHVaultContractAddress!)
        setDETHVaultContract(dEthVaultContract)

        const bsnFarmingContract = getBsnFarmingContract(signer, config.bsnFarmingContractAddress!)
        setBsnFarmingContract(bsnFarmingContract)

        const kETHVaultContract = getKETHVaultContract(signer, config.kETHVaultContractAddress!)
        setKETHVaultContract(kETHVaultContract)

        const savETHContract = getERCToken(signer, config.savETHTokenAddress!)
        setSavETHTokenContract(savETHContract)

        const wstETHContract = getWstETHTokenContract(signer, config.wstETHTokenAddress!)
        setWstETHContract(wstETHContract)

        const rETHContract = getRETHTokenContract(signer, config.rETHTokenAddress!)
        setRETHTokenContract(rETHContract)
      }
    }

    loadContracts()
  }, [activeChain, signer])

  const refetchTvls = useCallback(async () => {
    if (kETHVaultContract && kETHStrategyContract && dETHVaultContract && bsnFarmingContract) {
      const kETHTvl = await getTotalAssets(kETHStrategyContract)
      const kETHTotalSupply = bigToNum(await kETHVaultContract.totalSupply())
      const dETHTvl = await getTotalAssets(dETHVaultContract)
      const bsnTotalSupply = await getTotalSupply(bsnFarmingContract)
      const bsnTvl = (bsnTotalSupply * kETHTvl) / kETHTotalSupply // need to convert kETH to ETH value
      setTvlValues((tvl: any) => ({ ...tvl, 0: kETHTvl, 1: dETHTvl, 2: bsnTvl }))

      const kETHAssets = await kETHStrategyContract.assetsRatio()
      const stETHValue = bigToNum(
        kETHAssets.find(
          (item: { token: string }) =>
            item.token.toLowerCase() === config.wstETHTokenAddress?.toLowerCase()
        )?.valueInETH || BigNumber.from('0')
      )
      const rETHValue = bigToNum(
        kETHAssets.find(
          (item: { token: string }) =>
            item.token.toLowerCase() === config.rETHTokenAddress?.toLowerCase()
        )?.valueInETH || BigNumber.from('0')
      )
      const dETHValue = bigToNum(
        (
          kETHAssets.find(
            (item: { token: string }) =>
              item.token.toLowerCase() === config.dETHTokenAddress?.toLowerCase()
          )?.valueInETH || BigNumber.from('0')
        )
          .add(
            kETHAssets.find(
              (item: { token: string }) =>
                item.token.toLowerCase() === config.savETHTokenAddress?.toLowerCase()
            )?.valueInETH || BigNumber.from('0')
          )
          .add(
            kETHAssets.find(
              (item: { token: string }) =>
                item.token.toLowerCase() === config.gETHTokenAddress?.toLowerCase()
            )?.valueInETH || BigNumber.from('0')
          )
      )
      const ethValue = kETHTvl - stETHValue - rETHValue - dETHValue

      let total = ethValue
      if (stETHValue > 0) {
        total += stETHValue * (await queryStETHApr())
      }
      if (rETHValue > 0) {
        total += rETHValue * (await queryRETHApr())
      }
      if (dETHValue > 0) {
        total += dETHValue * (await queryDETHApr())
      }

      const kETHApr = total / kETHTvl
      setKETApr(kETHApr)
      setKETHTargetApr(Number(await kETHStrategyContract.targetRate()) / 100)
    }
  }, [kETHVaultContract, kETHStrategyContract, dETHVaultContract, bsnFarmingContract])

  useEffect(() => {
    refetchTvls()
  }, [refetchTvls])

  return (
    <ContractContext.Provider
      value={{
        kETHStrategyContract,
        dETHVaultContract,
        bsnFarmingContract,
        kETHVaultContract,
        rETHTokenContract,
        savETHTokenContract,
        wstETHContract,
        tvlValues,
        kETHApr,
        kETHTargetApr,
        refetchTvls
      }}>
      {children}
    </ContractContext.Provider>
  )
}
