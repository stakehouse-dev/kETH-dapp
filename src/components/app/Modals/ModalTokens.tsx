import { Dialog } from '@headlessui/react'
import { useContext, useEffect, useState } from 'react'

import { ReactComponent as CloseCircleIcon } from '@/assets/images/close-circle.svg'
import { ReactComponent as CloseCircleDarkIcon } from '@/assets/images/close-circle-dark.svg'
import { Modal } from '@/components/shared'
import { TokenT } from '@/constants/tokens'
import { ThemeContext } from '@/context/ThemeContext'

import styles from './styles.module.scss'

interface ModalTokensProps {
  open: boolean
  tokens: TokenT[]
  onSelect: (token: TokenT) => void
  onClose: () => void
}

export const ModalTokens = ({ open, tokens, onSelect, onClose }: ModalTokensProps) => {
  const { theme } = useContext(ThemeContext)
  // const [tokenBlanaces, SetTokenBalances] = useState([])

  // useEffect(async () => {
  //   if (tokens && tokens.length > 0) {

  //   }
  // }, [tokens])

  return (
    <Modal open={open} onClose={onClose}>
      <Dialog.Panel className={styles.modalLayoutSMPadding}>
        <div className="absolute top-3 right-3 cursor-pointer" onClick={onClose}>
          {theme === 'dark' ? <CloseCircleIcon /> : <CloseCircleDarkIcon />}
        </div>
        <div className="w-full">
          <div className="w-full pb-3 border-b border-innerBorder flex flex-start">
            <span className="text-textBase font-semibold">Select A Token</span>
          </div>
          <div className="py-3 flex flex-col gap-2">
            {tokens.map((token) => (
              <div
                key={token.id}
                onClick={() => onSelect(token)}
                className="flex w-full justify-between items-center cursor-pointer rounded-md hover:bg-grey800">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 flex justify-center items-center rounded-full bg-grey950">
                    <img src={token.icon} alt="token_icon" />
                  </div>
                  <div className="flex flex-col items-start">
                    <p className="text-textBase text-xl font-medium">{token.symbol}</p>
                    <span className="text-textLabel text-xs">{token.label}</span>
                  </div>
                </div>
                {/* <p className="text-textBase">-</p> */}
              </div>
            ))}
          </div>
        </div>
      </Dialog.Panel>
    </Modal>
  )
}
