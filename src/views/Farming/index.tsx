import './index.scss'

import { useContext, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { ReactComponent as ArrowLeftIcon } from '@/assets/images/icon-arrow-left.svg'
import { ReactComponent as ArrowLeftDarkIcon } from '@/assets/images/icon-arrow-left-dark.svg'
import { CardFarmingInfo, CardFarmingManage } from '@/components/app'
import { FARMING_MODES } from '@/constants/farmingModes'
import { ThemeContext } from '@/context/ThemeContext'

export const Farming = () => {
  const { mode } = useParams()
  const navigation = useNavigate()

  const { theme } = useContext(ThemeContext)

  const selectedMode = useMemo(() => {
    return FARMING_MODES.find((farmingMode) => farmingMode.route === mode)
  }, [mode])

  const handleGoBack = () => navigation('/home')

  if (!selectedMode) return <></>

  return (
    <div className="farming">
      <div className="content">
        <div className="flex items-center gap-4 mt-6 mb-18">
          <a onClick={handleGoBack} className="cursor-pointer">
            {theme === 'dark' ? <ArrowLeftIcon /> : <ArrowLeftDarkIcon />}
          </a>
          <h1 className="text-4xl text-textBase font-semibold">{selectedMode?.title}</h1>
        </div>
        {/* <p className="text-grey600 mb-18">{selectedMode.address || ''}</p> */}
        <div className="w-full rounded-2xl border border-innerBorder py-10 px-8 flex flex-col md:flex-row gap-6">
          <CardFarmingManage selectedMode={selectedMode} />
          <CardFarmingInfo selectedMode={selectedMode} />
        </div>
      </div>
    </div>
  )
}
