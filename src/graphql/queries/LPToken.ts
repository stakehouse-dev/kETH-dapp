import gql from 'graphql-tag'

export const LPTokenQuery = gql`
  query lptokens($liquidStakingManager: Bytes!, $type: String!) {
    lptokens(
      where: {
        tokenType: $type
        giantPoolBalance_gt: 0
        liquidStakingNetwork_: { id: $liquidStakingManager }
      }
    ) {
      id
      tokenType
      giantPoolBalance
    }
  }
`

export const GiantLPTokensQuery = gql`
  {
    giantSavETHPools {
      giantLPToken
    }
    giantFeesAndMevPools {
      giantLPToken
    }
  }
`

export const GetLPTokensQuery = gql`
  query getLpTokens($address: String!, $status_in: [String]!, $tokenType: String!) {
    lptokens(
      where: {
        liquidityProviders_: { lpAddress_contains_nocase: $address }
        lifecycleStatus_in: $status_in
        tokenType: $tokenType
      }
    ) {
      tokenType
      lifecycleStatus
      liquidityProviders(where: { lpAddress_contains_nocase: $address }) {
        amount
      }
    }
  }
`
