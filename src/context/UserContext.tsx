import { createContext, FC, PropsWithChildren, useEffect, useState } from 'react'
import { useAccount, useConnect, useSigner } from 'wagmi'

import { useQueryString } from '@/hooks/useQueryString'
import { fetchETHPrice } from '@/lib/fetchETHPrice'

export interface UserContextProps {
  account: any
  isGnosis: boolean
  ethPrice: number
}

export const UserContext = createContext<UserContextProps>({
  account: undefined,
  isGnosis: false,
  ethPrice: 0
})

const UserProvider: FC<PropsWithChildren> = ({ children }) => {
  const { connector: activeConnector } = useAccount()
  const account = useAccount()
  const { data: signer } = useSigner()
  const [customAccount, setCustomAccount] = useState<any>()
  const [isGnosis, setIsGnosis] = useState<boolean>(false)
  const [ethPrice, setEthPrice] = useState<number>(0)
  const [spoofedAddress, setSpoofedAddress] = useState<string>('')
  const queryString = useQueryString()
  const spoofedAddressFromQuery = queryString.get('address') ?? ''

  useEffect(() => {
    setSpoofedAddress(spoofedAddressFromQuery)
  }, [])

  useEffect(() => {
    const fetchAccount = async () => {
      if (activeConnector) {
        if (activeConnector.id === 'safe') {
          setIsGnosis(true)
          setCustomAccount(account)
        } else if (activeConnector.id !== 'safe') {
          if (spoofedAddress && process.env.REACT_APP_DEBUG === 'true') {
            setCustomAccount({ address: spoofedAddress })
          } else {
            setCustomAccount(account)
          }
          setIsGnosis(false)
        }
      }
    }

    fetchAccount()
  }, [activeConnector])

  useEffect(() => {
    const fetchPrice = async () => {
      const price = await fetchETHPrice()
      setEthPrice(price)
    }

    fetchPrice()
  }, [])

  return (
    <UserContext.Provider value={{ account: customAccount, isGnosis, ethPrice }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
