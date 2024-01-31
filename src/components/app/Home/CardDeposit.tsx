import { useContext, useState } from 'react'

import { readablePrice } from '@/utils/global'

import { UserContext } from '../../../context/UserContext'
import { Tooltip } from '../../shared'

interface CardDepositProps {
  index: number
  bg: string
  icons: string[]
  title: string
  description: string
  tvl: number
  apr: number
  targetApr: number
  onClick: () => void
}

export const CardDeposit = ({
  index,
  bg,
  icons,
  title,
  description,
  tvl,
  apr,
  targetApr,
  onClick
}: CardDepositProps) => {
  const { ethPrice } = useContext(UserContext)
  const [isTargetAprShow, setTargetAprShow] = useState(false)

  return (
    <div
      className="flex-1 items-stretch rounded-2xl bg-background100 overflow-hidden cursor-pointer"
      onClick={onClick}>
      <div className="w-full h-28 overflow-hidden">
        <img src={bg} alt="card-bg" className="w-full h-full object-fill" />
      </div>
      <div className="w-full p-4 flex flex-col gap-4">
        <div className="w-full -mt-12 flex flex-col">
          <div className="relative h-18 mb-2.5">
            {icons.map((icon, idx) => (
              <div key={idx} className="absolute top-0" style={{ left: 48 * idx }}>
                {<img src={icon} alt="icon" />}
              </div>
            ))}
          </div>
          <p className="text-2xl text-textBase font-semibold mb-1">{title}</p>
          <p className="text-textLabel">{description}</p>
        </div>
        <div className="w-full bg-grey600" style={{ height: 1 }}></div>
        <div className="w-full py-2 flex gap-4" onClick={(e) => e.stopPropagation()}>
          <div className="flex-1 h-22 rounded-2xl bg-background200 py-2 px-4">
            <p className="text-textLabel text-sm mb-3">TVL</p>
            <p className="text-3xl text-primary font-bold">${readablePrice(tvl * ethPrice)}</p>
          </div>
          {index === 0 ? (
            <>
              {isTargetAprShow === false && (
                <div className="flex-1 h-22 rounded-2xl bg-grey950 py-2 px-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center mb-3">
                      <p className="text-grey600 text-sm mr-2">APR</p>
                      <Tooltip message="Current rate of KETH strategy" className="ml-2" />
                    </div>
                    <div
                      className="mb-3"
                      style={{
                        width: '25px',
                        height: '14px',
                        borderRadius: '14px',
                        background: 'grey',
                        padding: '1px'
                      }}
                      onClick={(e) => {
                        setTargetAprShow(true)
                        e.stopPropagation()
                      }}>
                      <div
                        style={{
                          borderRadius: '100%',
                          width: '12px',
                          height: '12px',
                          background: 'white'
                        }}></div>
                    </div>
                  </div>
                  <p className="text-3xl text-primary font-bold">
                    {apr > 0 ? `${apr.toFixed(2)}%` : '-'}
                  </p>
                </div>
              )}
              {isTargetAprShow === true && (
                <div className="flex-1 h-22 rounded-2xl bg-grey950 py-2 px-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center mb-3">
                      <p className="text-grey600 text-sm mr-2">Target APR</p>
                      <Tooltip message="Target rate of KETH strategy" className="ml-2" />
                    </div>
                    <div
                      className="mb-3"
                      style={{
                        width: '25px',
                        height: '14px',
                        borderRadius: '14px',
                        background: 'var(--color-primary)',
                        padding: '1px'
                      }}
                      onClick={(e) => {
                        setTargetAprShow(false)
                        e.stopPropagation()
                      }}>
                      <div
                        style={{
                          marginLeft: 'auto',
                          borderRadius: '100%',
                          width: '12px',
                          height: '12px',
                          background: 'black'
                        }}></div>
                    </div>
                  </div>
                  <p className="text-3xl text-primary font-bold">
                    {targetApr > 0 ? `${targetApr.toFixed(2)}%` : '-'}
                  </p>
                </div>
              )}
            </>
          ) : (
            <>
              {apr > 0 && (
                <div className="flex-1 h-22 rounded-2xl bg-grey950 py-2 px-4">
                  <p className="text-grey600 text-sm mb-3">APR</p>
                  <p className="text-3xl text-primary font-bold">{apr.toFixed(2)}%</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
