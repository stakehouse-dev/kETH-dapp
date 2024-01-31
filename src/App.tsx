import './App.css'

import { ApolloProvider } from '@apollo/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { IntercomProvider } from 'react-use-intercom'
import { configureChains, createClient, goerli, mainnet, WagmiConfig } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { SafeConnector } from 'wagmi/connectors/safe'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'

import GraphqlPlayground from '@/components/GraphqlPlayground'
import { LayoutDashboard } from '@/components/layouts'
import { rpcUrls, supportedChains } from '@/constants/chains'
import BlockswapSDKProvider from '@/context/BlockswapSDKContext'
import GraphqlProvider from '@/context/GraphqlContext'
import ThemeProvider from '@/context/ThemeContext'
import UserProvider from '@/context/UserContext'
import GraphqlClient from '@/graphql/client'
import { Activity, ClaimBSN, Farming, Home } from '@/views'

import { ContractProvider } from './context/ContractContext'

if (!window.Buffer) {
  window.Buffer = Buffer
}

const { chains, provider } = configureChains(
  [goerli, mainnet],
  [
    jsonRpcProvider({
      rpc: (chain) => {
        return { http: rpcUrls[chain.id] }
      }
    })
  ]
)

const client = createClient({
  autoConnect: false,
  connectors: [
    new InjectedConnector({ chains }),
    new WalletConnectConnector({
      chains,
      options: {
        showQrModal: true,
        projectId: `${process.env.REACT_APP_WALLET_CONNECT_PROJECT_ID}`
      }
    }),
    new SafeConnector({
      chains: supportedChains
    })
  ],
  provider
})

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

function App() {
  return (
    <Router>
      <IntercomProvider appId="xg5qffph" apiBase="https://api-iam.intercom.io" autoBoot>
        <WagmiConfig client={client}>
          <QueryClientProvider client={queryClient}>
            <ApolloProvider client={GraphqlClient}>
              <ThemeProvider>
                <BlockswapSDKProvider>
                  <ContractProvider>
                    <UserProvider>
                      <GraphqlProvider>
                        <Routes>
                          <Route path="/" element={<LayoutDashboard />}>
                            <Route index element={<Home />} />
                            <Route path="home" element={<Home />} />
                            <Route path="farming/:mode" element={<Farming />} />
                            <Route path="claim" element={<ClaimBSN />} />
                            <Route path="activity" element={<Activity />} />
                            <Route path="*" element={<Home />} />
                          </Route>
                          <Route
                            path="/graphql-playground/:mode/:account"
                            element={<GraphqlPlayground />}
                          />
                        </Routes>
                      </GraphqlProvider>
                    </UserProvider>
                  </ContractProvider>
                </BlockswapSDKProvider>
              </ThemeProvider>
            </ApolloProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </WagmiConfig>
      </IntercomProvider>
    </Router>
  )
}

export default App
