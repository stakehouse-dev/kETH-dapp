import gql from 'graphql-tag'

export const ActivityQuery = gql`
  query Activity($account: String!) {
    events(
      first: 100
      skip: 0
      where: { from: $account }
      orderBy: blockNumber
      orderDirection: desc
    ) {
      tx
      type
      keys
      values
      blockTimestamp
      blockNumber
    }
  }
`
