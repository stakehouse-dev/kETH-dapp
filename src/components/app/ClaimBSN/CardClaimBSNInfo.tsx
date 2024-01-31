import { Tooltip } from '@/components/shared'
import { FARMING_MODES } from '@/constants/farmingModes'
import { useSummaryValues } from '@/hooks'

export const CardClaimBSNInfo = () => {
  const { result } = useSummaryValues()

  return (
    <div className="flex-1 md:flex-6 items-stretch rounded-2xl bg-background100 border border-borderColor overflow-hidden">
      <div className="w-full h-28 overflow-hidden">
        <img src={FARMING_MODES[2].bg} alt="card-bg" className="w-full h-full object-fill" />
      </div>
      <div className="w-full p-4 flex flex-col gap-4">
        <div className="w-full -mt-12 flex flex-col">
          <div className="relative h-18 mb-2.5">
            {FARMING_MODES[2].icons.map((icon, idx) => (
              <div key={idx} className="absolute top-0" style={{ left: 48 * idx }}>
                {<img src={icon} alt="icon" />}
              </div>
            ))}
          </div>
          <p className="text-2xl text-textBase font-semibold mb-1">Claim BSN</p>
          <p className="text-textLabel">Claim your BSN earned through kETH or dETH farming</p>
        </div>
        <div className="w-full bg-grey600" style={{ height: 1 }}></div>
        <div className="w-full pt-2 flex gap-4">
          <div className="flex-1 h-22 rounded-2xl bg-background200 py-2 px-4">
            <div className="flex gap-2 items-center text-textLabel text-sm mb-3">
              BSN Rewards to Claim <Tooltip message="BSN earned from staking your kETH." />
            </div>
            <p className="text-3xl text-primary font-bold">{result?.bsnEarning || 0}</p>
          </div>
          {/* <div className="flex-1 h-22 rounded-2xl bg-background200 py-2 px-4">
            <div className="flex gap-2 items-center text-textLabel text-sm mb-3">
              Total BSN Rewards Claimed
              <Tooltip message="This APR is calculated by considering 2 APIs. One by holding the Token and one from the BSN Emission " />
            </div>
            <p className="text-3xl text-primary font-bold">$</p>
          </div> */}
          {/* <div className="flex-1 h-22 rounded-2xl bg-grey950 py-2 px-4">
            <p className="text-grey600 text-sm mb-3">APR</p>
            <p className="text-3xl text-primary font-bold">18%</p>
          </div> */}
        </div>
      </div>
    </div>
  )
}
