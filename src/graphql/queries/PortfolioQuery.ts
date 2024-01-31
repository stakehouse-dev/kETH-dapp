import gql from 'graphql-tag'

export const ProtectedStakingQuery = gql`
  query ProtectedBatches($account: String!) {
    protectedBatches(
      where: {
        liquidityProviders_: { lpAddress: $account }
        vaultLPToken_: { lifecycleStatus: "MINTED_DERIVATIVES" }
      }
    ) {
      id
      lsdValidator {
        id
        currentIndex
      }
      vaultLPToken {
        id
        issuer
      }
      liquidityProviders(where: { lpAddress: $account }) {
        amount
        withdrawn
      }
    }
  }
`

export const FeesMevQuery = gql`
  query feesAndMevBatches($account: String!) {
    feesAndMevBatches(
      where: {
        liquidityProviders_: { lpAddress: $account }
        vaultLPToken_: { lifecycleStatus: "MINTED_DERIVATIVES" }
      }
    ) {
      id
      blsPublicKey
      vaultLPToken {
        id
        issuer
      }
      lsdValidator {
        id
        currentIndex
      }
      liquidityProviders(where: { lpAddress: $account }) {
        amount
        withdrawn
      }
    }
  }
`
