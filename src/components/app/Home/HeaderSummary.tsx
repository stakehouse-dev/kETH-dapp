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

  const bsnPrice = 0 // will be set on mainnet

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
              $
              {readablePrice(
                (result?.kETHEarning || 0) * ethPrice + (result?.bsnEarning || 0) * bsnPrice
              )}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center">
              <div className="flex gap-1 items-center w-16">
                <img src={BSNToken} alt="bsn" className="w-4" />
                <p className="text-sm text-textBase">BSN</p>
              </div>
              <div className="flex gap-1 items-center">
                <p className="text-sm text-textLabel">{roundNumber(result?.bsnEarning || 0, 2)}</p>
              </div>
              {result?.bsnEarning ? (
                <Button className="ml-3 !py-1" onClick={handleGoClaimBSN}>
                  Claim BSN
                </Button>
              ) : (
                <></>
              )}
            </div>

            <div className="flex items-center">
              <div className="flex gap-1 items-center w-16">
                <img src={GreenETHIcon} alt="bsn" className="w-4" />
                <p className="text-sm text-textBase">kETH</p>
              </div>
              <div className="flex gap-1 items-center">
                <p className="text-sm text-textLabel flex items-center gap-2">
                  {roundNumber(result?.kETHEarning || 0, 3)}
                  <Tooltip
                    message={`USD value of kETH Amount : $${readablePrice(
                      (result?.kETHEarning || 0) * ethPrice
                    )}`}
                  />
                </p>
              </div>
              {/* {result?.kETHEarning ? <Button onClick={handleGoClaimBSN}>Claim kETH</Button> : <></>} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
