import './index.scss'

import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { ReactComponent as ArrowLeftIcon } from '@/assets/images/icon-arrow-left.svg'
import { ReactComponent as ArrowLeftDarkIcon } from '@/assets/images/icon-arrow-left-dark.svg'
import { CardClaimBSN, CardClaimBSNInfo } from '@/components/app'
import { ThemeContext } from '@/context/ThemeContext'

export const ClaimBSN = () => {
  const navigation = useNavigate()

  const { theme } = useContext(ThemeContext)

  const handleGoBack = () => navigation('/home')

  return (
    <div className="farming">
      <div className="content">
        <div className="flex items-center gap-4 mt-6 mb-18">
          <a onClick={handleGoBack} className="cursor-pointer">
            {theme === 'dark' ? <ArrowLeftIcon /> : <ArrowLeftDarkIcon />}
          </a>
          <h1 className="text-4xl text-textBase font-semibold">Claim BSN</h1>
        </div>
        {/* <p className="text-grey600 mb-18">{selectedMode.address || ''}</p> */}
        <div className="w-full rounded-2xl border border-innerBorder py-10 px-8 flex flex-col md:flex-row gap-6">
          <CardClaimBSN />
          <CardClaimBSNInfo />
        </div>
      </div>
    </div>
  )
}
