import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client'

import { KETH_SUBGRAPH } from '@/constants/dappQueries'
import { config } from '@/constants/environment'

const client = new ApolloClient({
  link: split(
    ({ operationName }) => {
      return KETH_SUBGRAPH.includes(operationName)
    },
    new HttpLink({ uri: config.GRAPHQL_URL }),
    new HttpLink({ uri: config.LSD_GRAPHQL_URL })
  ),
  cache: new InMemoryCache()
})

export default client
