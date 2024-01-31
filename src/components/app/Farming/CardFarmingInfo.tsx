import { useContext } from 'react'

import { FarmingModeT } from '@/constants/farmingModes'
import { ContractContext } from '@/context/ContractContext'
import { UserContext } from '@/context/UserContext'
import { readablePrice } from '@/utils/global'

interface CardFarmingInfoProps {
  selectedMode: FarmingModeT
}

export const CardFarmingInfo = ({ selectedMode }: CardFarmingInfoProps) => {
  const { tvlValues } = useContext(ContractContext)
  const { ethPrice } = useContext(UserContext)

  return (
    <div className="flex-1 md:flex-6 items-stretch rounded-2xl bg-background100 border border-borderColor overflow-hidden">
      <div className="w-full h-28 overflow-hidden">
        <img src={selectedMode.bg} alt="card-bg" className="w-full h-full object-fill" />
      </div>
      <div className="w-full p-4 flex flex-col gap-4">
        <div className="w-full -mt-12 flex flex-col">
          <div className="relative h-18 mb-2.5">
            {selectedMode.icons.map((icon, idx) => (
              <div key={idx} className="absolute top-0" style={{ left: 48 * idx }}>
                {<img src={icon} alt="icon" />}
              </div>
            ))}
          </div>
          <p className="text-2xl text-textBase font-semibold mb-1">{selectedMode.title}</p>
          <p className="text-textLabel">{selectedMode.description}</p>
        </div>
        <div className="w-full bg-grey600" style={{ height: 1 }}></div>
        <div className="w-full pt-2 flex gap-4">
          <div className="flex-1 h-22 rounded-2xl bg-background200 py-2 px-4">
            <p className="text-textLabel text-sm mb-3">TVL</p>
            <p className="text-3xl text-primary font-bold">
              ${readablePrice((tvlValues[selectedMode.id] || 0) * ethPrice)}
            </p>
          </div>
          {/* <div className="flex-1 h-22 rounded-2xl bg-grey950 py-2 px-4">
            <p className="text-grey600 text-sm mb-3">APR</p>
            <p className="text-3xl text-primary font-bold">18%</p>
          </div> */}
        </div>
      </div>
    </div>
  )
}
