import '../styles.scss'

import { FC, useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAccount } from 'wagmi'
import { useDisconnect } from 'wagmi'

import { ReactComponent as LogoutIcon } from '@/assets/images/icon-logout.svg'
import { ReactComponent as MyActivityIcon } from '@/assets/images/icon-my-activity.svg'
import { ReactComponent as ThemeDarkIcon } from '@/assets/images/icon-theme-dark.svg'
import { ReactComponent as ThemeLightIcon } from '@/assets/images/icon-theme-light.svg'
import { ModalAccount } from '@/components/app'
import { Button } from '@/components/shared'
import { Dropdown } from '@/components/shared'
import { ThemeContext } from '@/context/ThemeContext'
import { useCustomAccount } from '@/hooks'
import { TMenu } from '@/types'

import { ChainAlert } from './ChainAlert'
import NavItem from './NavItem'

const Topbar: FC = () => {
  const { account } = useCustomAccount()
  const { isConnected } = useAccount()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const { theme, toggleTheme } = useContext(ThemeContext)
  const { disconnect } = useDisconnect()
  const [openAccountModal, setOpenAccountModal] = useState(false)

  const handleDisconnect = () => {
    setOpenAccountModal(false)
    disconnect()
  }

  const options: TMenu[] = [
    {
      id: 0,
      label: 'My Activity',
      icon: <MyActivityIcon />,
      onClick: () => handleOpenActivity()
    },
    {
      id: 1,
      label: 'Log Out',
      icon: <LogoutIcon />,
      onClick: () => setOpenAccountModal(true)
    }
  ]

  const handleChangeTheme = () => {
    if (theme === 'dark') {
      toggleTheme('light')
    } else {
      toggleTheme('dark')
    }
  }

  const handleOpenActivity = () => {
    navigate('/activity')
  }

  return (
    <>
      <div className="topbar">
        <a></a>

        <div className="topbar__navMenu">
          <Link to={'/home'}>
            <NavItem active>Home</NavItem>
          </Link>
          <a
            href={'https://docs.joinstakehouse.com/kETH/LST_Optimizer_dApp'}
            target="_blank"
            rel="noreferrer">
            <NavItem active={pathname.includes('more')}>More</NavItem>
          </a>
        </div>

        <div className="flex items-center gap-3">
          {isConnected && account && (
            <>
              <Dropdown options={options}>
                <div className="topbar__menu-btn">
                  <div className="connect-wallet--secondary flex items-center gap-1 -mx-2">
                    <div className="bg-primary p-1 rounded-full"></div>{' '}
                    {`${account.address!.slice(0, 4)}...${account.address!.slice(-2)}`}
                  </div>
                </div>
              </Dropdown>
              <ModalAccount
                open={openAccountModal}
                onClose={() => setOpenAccountModal(false)}
                accountAddress={account.address!}
                onDisconnect={handleDisconnect}
              />
            </>
          )}
          <Button variant="secondary" onClick={handleChangeTheme} shape="rounded">
            {theme === 'dark' ? (
              <ThemeLightIcon className="-mx-1" />
            ) : (
              <ThemeDarkIcon className="-mx-1" />
            )}
          </Button>
        </div>
      </div>
      <ChainAlert />
    </>
  )
}

export default Topbar
