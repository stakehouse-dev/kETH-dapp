import gql from 'graphql-tag'

export const LSDNetworksQuery = gql`
  query getLSDNetworks($liquidStakingManager: Bytes!) {
    liquidStakingNetworks(where: { liquidStakingManager: $liquidStakingManager }) {
      id
      feesAndMevPool
      savETHPool
      feeRecipientAndSyndicate
    }
  }
`

export const AllLSDNetworksQuery = gql`
  query getAllLSDNetworks {
    liquidStakingNetworks(first: 1000) {
      id
      lsdIndex
      ticker
      commission
      feeRecipientAndSyndicate
    }
  }
`
