export enum DEPOSIT_MODE {
  MAIN = 'main',
  NODE_OPERATOR = 'node_operator',
  STAKING = 'staking',
  FEES_MEV = 'fees_mev'
}

export enum WITHDRAW_MODE {
  NODE_OPERATOR = 'node_operator',
  STAKING = 'staking',
  FEES_MEV = 'fees'
}

export enum VALIDATOR_STATUS {
  LEAKING,
  ACTIVE,
  WAITING_FOR_ETH,
  READY,
  MINT_AVAILABLE,
  STAKING
}

export const MIN_AMOUNT = 0.001
export const MAX_GAS_FEE = 0.02
export const API_ENDPOINT = 'https://fq31s5p6ij.execute-api.eu-central-1.amazonaws.com/goerli'
