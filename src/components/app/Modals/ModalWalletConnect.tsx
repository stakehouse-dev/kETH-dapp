import { Dialog } from '@headlessui/react'
import { FC, useContext } from 'react'
import { Connector, useConnect } from 'wagmi'

import { ReactComponent as CloseCircleIcon } from '@/assets/images/close-circle.svg'
import { ReactComponent as CloseCircleDarkIcon } from '@/assets/images/close-circle-dark.svg'
import Metamask from '@/assets/images/metamask.svg'
import WalletConnectIcon from '@/assets/images/walletconnect.svg'
import { Modal } from '@/components/shared'
import { ThemeContext } from '@/context/ThemeContext'

import { ButtonWallet } from '../Buttons'
import styles from './styles.module.scss'

interface IModalWalletConnectProps {
  open: boolean
  onClose: () => void
}

const ModalWalletConnect: FC<IModalWalletConnectProps> = ({ open, onClose }) => {
  const { theme } = useContext(ThemeContext)
  const { connectAsync, connectors } = useConnect({
    onSuccess() {
      onClose()
    }
  })

  const getConnectorIcon = (connector: Connector) => {
    switch (connector.name) {
      case 'MetaMask':
        return Metamask
      case 'WalletConnect':
        return WalletConnectIcon
      default:
        return ''
    }
  }

  const getConnectorLabel = (connector: Connector) => {
    return connector.name
  }

  const handleConnect = async (connector: Connector) => {
    try {
      await connectAsync({ connector })
    } catch (err) {
      console.error('connect wallet error: ', err)
    }
  }

  return (
    <Modal open={open} onClose={() => {}}>
      <Dialog.Panel className={styles.modalLayoutBig}>
        <div className="absolute top-3 right-3 cursor-pointer" onClick={onClose}>
          {theme === 'dark' ? <CloseCircleIcon /> : <CloseCircleDarkIcon />}
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-2xl text-textBase font-semibold">Connect a Wallet</p>
          {connectors.map((connector) => {
            if (!connector.ready) return null
            return (
              <ButtonWallet
                key={connector.name}
                icon={getConnectorIcon(connector)}
                label={getConnectorLabel(connector)}
                onClick={() => handleConnect(connector)}
              />
            )
          })}
          <p className="text-xs text-textLabel text-left">
            {`By connecting a wallet, you agree to Blockswap Labs'`}{' '}
            <a
              className="text-primary underline"
              href="https://blockswap.network/terms/"
              target="_blank"
              rel="noreferrer">
              Terms of Service
            </a>{' '}
            and acknowledge that you have read and understand the{' '}
            <a
              className="text-primary underline"
              href="https://dapp.joinstakehouse.com/kethdisclaimer/"
              target="_blank"
              rel="noreferrer">
              Protocol Risk Disclaimer
            </a>
            .
          </p>
        </div>
      </Dialog.Panel>
    </Modal>
  )
}

export default ModalWalletConnect
