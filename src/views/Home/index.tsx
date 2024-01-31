import './index.scss'

import { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAccount } from 'wagmi'

import { ReactComponent as TopRightIcon } from '@/assets/images/icon-arrow-top-right.svg'
import { CardDeposit, HeaderSummary } from '@/components/app'
import { Button } from '@/components/shared'
import { FARMING_MODES } from '@/constants/farmingModes'
import { ContractContext } from '@/context/ContractContext'

export const Home = () => {
  // states
  const params = useParams()
  const navigate = useNavigate()
  const { tvlValues, kETHApr, kETHTargetApr, refetchTvls } = useContext(ContractContext)

  // wagmi hooks
  const { isConnected } = useAccount()

  useEffect(() => {
    refetchTvls()
  }, [refetchTvls])

  const handleGoFarming = (route: string) => {
    navigate(`/farming/${route}`)
  }

  const handleOpenActivity = () => {
    navigate('/activity')
  }

  return (
    <div className="home">
      <div className="content">
        <h1 className="text-5xl font-semibold my-6 text-textBase">Ethereum LST Optimizer</h1>
        <p className="text-xl mb-10 text-textLabel">Staked ETH built for DeFi.</p>
        <div className="flex items-center gap-1 text-base mb-22 bg-black border border-grey500 rounded-lg px-7 py-4">
          <a
            href={'https://help.joinstakehouse.com/en/collections/4676203-lst-optimizer-keth'}
            target="_blank"
            rel="noreferrer"
            className="flex gap-2 items-center">
            User guides <TopRightIcon />
          </a>
        </div>
        {isConnected ? (
          <HeaderSummary />
        ) : (
          <div className="w-full rounded-md p-4 bg-grey950 text-center mb-10">
            Connect your wallet to see deposits and earning
          </div>
        )}
        <div className="w-full flex flex-col lg:flex-row gap-4">
          {FARMING_MODES.map((card) => (
            <CardDeposit
              key={card.id}
              index={card.id}
              title={card.title}
              description={card.description}
              apr={card.id === 0 ? kETHApr : 0}
              targetApr={card.id === 0 ? kETHTargetApr : 0}
              bg={card.bg}
              icons={card.icons}
              tvl={tvlValues[card.id] || 0}
              onClick={() => handleGoFarming(card.route)}
            />
          ))}
        </div>
        <div className="flex items-center gap-1 text-base mt-14 bg-black border border-grey500 rounded-lg px-4 py-2">
          <a onClick={handleOpenActivity} className="flex gap-2 items-center activity-link">
            My Activity <TopRightIcon />
          </a>
        </div>
      </div>
    </div>
  )
}
