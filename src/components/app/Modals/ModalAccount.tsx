import { Dialog } from '@headlessui/react'
import { FC, useContext } from 'react'

import { ReactComponent as CloseCircleIcon } from '@/assets/images/close-circle.svg'
import { ReactComponent as CloseCircleDarkIcon } from '@/assets/images/close-circle-dark.svg'
import LogoutIcon from '@/assets/images/logout.svg'
import LogoutDarkIcon from '@/assets/images/logout-dark.svg'
import { Button, Modal } from '@/components/shared'
import { ThemeContext } from '@/context/ThemeContext'

import styles from './styles.module.scss'

interface IProps {
  open: boolean
  accountAddress: string
  onDisconnect: () => void
  onClose: () => void
}

const ModalAccount: FC<IProps> = ({ open, accountAddress, onDisconnect, onClose }) => {
  const { theme } = useContext(ThemeContext)

  return (
    <Modal open={open} onClose={onClose}>
      <Dialog.Panel className={styles.modalLayout}>
        <div className="absolute top-3 right-3 cursor-pointer" onClick={onClose}>
          {theme === 'dark' ? <CloseCircleIcon /> : <CloseCircleDarkIcon />}
        </div>
        <div className={styles.walletModalAccount}>
          <div className="w-2 h-2 rounded-full bg-primary" />
          {`${accountAddress.slice(0, 8)}...${accountAddress.slice(-4)}`}
        </div>

        <div className="mt-8">
          <Button variant="secondary" onClick={onDisconnect}>
            <div className="flex items-center px-4 py-2 gap-2 text-textBase">
              <img src={theme === 'dark' ? LogoutIcon : LogoutDarkIcon} alt="logout" />
              Sign out
            </div>
          </Button>
        </div>
      </Dialog.Panel>
    </Modal>
  )
}

export default ModalAccount
