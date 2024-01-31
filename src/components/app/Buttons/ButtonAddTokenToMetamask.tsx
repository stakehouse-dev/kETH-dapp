import { FC } from 'react'

import MetamaskIcon from '@/assets/images/metamask.svg'
import { TokenT } from '@/constants/tokens'
import { addTokenToMetaMask } from '@/utils/tokens'

interface IProps {
  token: TokenT | null
}

const ButtonAddTokenToMetamask: FC<IProps> = ({ token }) => {
  if (window.ethereum && token) {
    return (
      <button
        onClick={() => {
          addTokenToMetaMask(token)
        }}>
        <img src={MetamaskIcon} alt={token.label} />
      </button>
    )
  }

  return <></>
}

export default ButtonAddTokenToMetamask
