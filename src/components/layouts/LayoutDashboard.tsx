import './styles.scss'

import { FC, useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useAccount } from 'wagmi'

import { useFlaggedWallet } from '@/hooks'

import { ModalWalletConnect } from '../app'
import TransactionRejectedModal from '../app/Modals/TransactionRejectedModal'
import { Bottombar, NotSupportedMobile, Topbar } from './components'

const DashboardLayout: FC = () => {
  const isFlagged = useFlaggedWallet()
  const { isConnected } = useAccount()
  const navigate = useNavigate()
  const [openRejectedModal, setRejectedModal] = useState(false)
  const [openWalletModal, setOpenWalletModal] = useState(false)

  useEffect(() => {
    if (isConnected && isFlagged) {
      setRejectedModal(true)
      return
    }
    if (!isConnected) {
      setOpenWalletModal(true)
    }
  }, [isFlagged, isConnected])

  if (isMobile) {
    return (
      <div className="layout pt-22">
        <NotSupportedMobile />
      </div>
    )
  }

  return (
    <div className="layout">
      <Topbar />
      <Outlet />
      <ModalWalletConnect open={openWalletModal} onClose={() => setOpenWalletModal(false)} />
      <TransactionRejectedModal open={openRejectedModal} onClose={() => setRejectedModal(false)} />
    </div>
  )
}

export default DashboardLayout
