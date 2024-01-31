import gql from 'graphql-tag'

export const NodeRunnersQuery = gql`
  query NodeRunners($account: String!) {
    nodeRunners(where: { id: $account }) {
      id
      validators(where: { withdrawn: false }) {
        id
        status
      }
      liquidStakingNetworks {
        liquidStakingManager
      }
    }
  }
`

export const ValidatorsQuery = gql`
  query NodeRunners($account: String!) {
    nodeRunners(where: { id: $account }) {
      validators(where: { status_in: ["WAITING_FOR_ETH", "READY_TO_STAKE"] }) {
        id
        smartWallet {
          liquidStakingNetwork {
            ticker
            id
          }
        }
      }
    }
  }
`
export const StakedValidatorsQuery = gql`
  query NodeRunners($account: String!) {
    nodeRunners(where: { id: $account }) {
      validators(where: { status_in: ["STAKED", "MINTED_DERIVATIVES"] }) {
        id
      }
    }
  }
`
export const CommonValidatorsQuery = gql`
  query NodeRunners($account: String!, $status_in: [String]!) {
    nodeRunners(where: { id: $account }) {
      validators(where: { status_in: $status_in }) {
        id
      }
    }
  }
`

export const ValidatorsByNetworkQuery = gql`
  query NodeRunners($account: String!, $network: Bytes!) {
    nodeRunners(
      where: {
        id: $account
        liquidStakingNetworks_: { liquidStakingManager: $network }
        validators_: { status_in: ["WAITING_FOR_ETH"] }
      }
    ) {
      id
      validators(where: { status_in: ["WAITING_FOR_ETH"], liquidStakingManager: $network }) {
        id
        status
      }
    }
  }
`

export const SmartWalletQuery = gql`
  query NodeRunners($account: String!, $network: Bytes!) {
    nodeRunners(
      where: { id: $account, liquidStakingNetworks_: { liquidStakingManager: $network } }
    ) {
      id
      smartWallets(where: { liquidStakingNetwork_: { liquidStakingManager: $network } }) {
        id
      }
    }
  }
`

export const MintedValidators = gql`
  query MintedValidators($account: String!, $network: Bytes!) {
    nodeRunners(
      where: {
        id: $account
        liquidStakingNetworks_: { liquidStakingManager: $network }
        validators_: { status: "MINTED_DERIVATIVES" }
      }
    ) {
      id
      validators(where: { status: "MINTED_DERIVATIVES", liquidStakingManager: $network }) {
        id
        status
      }
    }
  }
`
