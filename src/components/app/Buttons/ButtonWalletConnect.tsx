import './styles.scss'

import { FC, useEffect, useState } from 'react'
import { useDisconnect } from 'wagmi'

import { ModalAccount } from '@/components/app'
import { Button } from '@/components/shared'
import { useCustomAccount } from '@/hooks'

const ButtonWalletConnect: FC = () => {
  const { account } = useCustomAccount()
  const { disconnect } = useDisconnect()
  const [openAccountModal, setOpenAccountModal] = useState(false)

  const handleDisconnect = () => {
    setOpenAccountModal(false)
    disconnect()
  }

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on!('accountsChanged', (accounts: any) => {
        disconnect()
      })
    }
  }, [])

  if (account) {
    // account.address = '0xCA981009ECac4B4439E8C249753b0647D90e72a0'
    return (
      <>
        <Button variant="secondary" onClick={() => setOpenAccountModal(true)}>
          <div className="connect-wallet--secondary flex items-center gap-1 -mx-2">
            <div className="bg-primary p-1 rounded-full"></div>{' '}
            {`${account.address!.slice(0, 4)}...${account.address!.slice(-2)}`}
          </div>
        </Button>
        <ModalAccount
          open={openAccountModal}
          onClose={() => setOpenAccountModal(false)}
          accountAddress={account.address!}
          onDisconnect={handleDisconnect}
        />
      </>
    )
  }

  return <></>
}

export default ButtonWalletConnect
