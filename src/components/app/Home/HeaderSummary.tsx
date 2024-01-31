import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import BSNToken from '@/assets/images/icon-bsn.svg'
import GreenETHIcon from '@/assets/images/icon-deth.svg'
import KETHETHIcon from '@/assets/images/icon-keth-sm.svg'
import YelloETHIcon from '@/assets/images/icon-yellow-eth.svg'
import { Button, Tooltip } from '@/components/shared'
import { UserContext } from '@/context/UserContext'
import { useSummaryValues } from '@/hooks'
import { readablePrice, roundNumber } from '@/utils/global'

export const HeaderSummary = () => {
  const { ethPrice } = useContext(UserContext)
  const { result } = useSummaryValues()
  const navigate = useNavigate()

  const handleGoClaimBSN = () => {
    navigate('/claim')
  }

  return (
    <div className="flex gap-4 w-full mb-10">
      <div className="flex-1 p-4 bg-background100 border border-borderColor rounded-2xl">
        <p className="text-textLabel pb-1.5">Your Deposit</p>
        <div className="flex justify-between items-center">
          <p className="text-textBase text-5xl font-semibold">
            ${readablePrice((result?.totalETH || 0) * ethPrice)}
          </p>
          <div className="flex flex-col gap-2">
            {/* <div className="min-w-32 flex items-center justify-between">
              <div className="flex gap-1 items-center">
                <img src={BlueETHIcon} alt="stETH" className="w-4" />
                <p className="text-sm text-textBase">stETH</p>
              </div>
              <div className="flex gap-1 items-center">
                <p className="text-sm text-textLabel">{roundNumber(result?.stETH || 0, 3)}</p>
              </div>
            </div> */}
            <div className="min-w-32 flex items-center justify-between">
              <div className="flex gap-1 items-center">
                <img src={GreenETHIcon} alt="stETH" className="w-4" />
                <p className="text-sm text-textBase">kETH</p>
              </div>
              <div className="flex gap-1 items-center">
                <p className="text-sm text-textLabel">
                  {roundNumber(result?.kETHVaultBalance || 0, 3)}
                </p>
              </div>
            </div>
            <div className="min-w-32 flex items-center justify-between">
              <div className="flex gap-1 items-center">
                <img src={KETHETHIcon} alt="rETH" className="w-5 -ml-0.5" />
                <div className="text-sm text-textBase flex gap-1 items-center">dETH</div>
              </div>
              <div className="flex gap-1 items-center">
                <p className="text-sm text-textLabel">
                  {roundNumber(result?.dETHVaultBalance || 0, 3)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 p-4 flex flex-col  bg-background100 border border-borderColor rounded-2xl">
        <p className="text-textLabel pb-1.5">Your Earnings</p>
        <div className="flex justify-between items-center flex-1">
          <div className="flex items-center gap-6">
            <p className="text-textBase text-5xl font-semibold">
              {/* ${readablePrice((result?.bsnEarning || 0) * ethPrice)} */}
            </p>
            {result?.bsnEarning && (
              <Button size="lg" onClick={handleGoClaimBSN} className="w-32">
                Claim
              </Button>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <div className="min-w-32 flex items-center justify-between">
              <div className="flex gap-1 items-center">
                <img src={BSNToken} alt="bsn" className="w-4" />
                <p className="text-sm text-textBase">BSN</p>
              </div>
              <div className="flex gap-1 items-center">
                <p className="text-sm text-textLabel">{roundNumber(result?.bsnEarning || 0, 2)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
