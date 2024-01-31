import gql from 'graphql-tag'

export const ProtectedWithdrawBalanceQuery = gql`
  query WithdrawBalance($account: String!) {
    protectedBatches(where: { liquidityProviders_: { lpAddress: $account } }) {
      vaultLPToken {
        lifecycleStatus
      }
      liquidityProviders(where: { lpAddress: $account }) {
        lpAddress
        amount
        withdrawn
      }
    }
  }
`

export const FeesMevWithdrawBalanceQuery = gql`
  query WithdrawBalance($account: String!) {
    feesAndMevBatches(where: { liquidityProviders_: { lpAddress: $account } }) {
      vaultLPToken {
        lifecycleStatus
      }
      liquidityProviders(where: { lpAddress: $account }) {
        lpAddress
        amount
        withdrawn
      }
    }
  }
`
