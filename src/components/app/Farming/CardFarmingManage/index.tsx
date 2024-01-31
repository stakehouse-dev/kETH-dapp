import { useContext, useState } from 'react'
import tw, { styled } from 'twin.macro'

import { FarmingModeT } from '@/constants/farmingModes'

import { DepositSection } from './DepositSection'
import { InfoSection } from './InfoSection'
import { WithdrawSection } from './WithdrawSection'

export enum TAB {
  DEPOSIT = 'DEPOSIT',
  WITHDRAW = 'WITHDRAW',
  INFO = 'INFO'
}

const TABS = [
  {
    label: 'Deposit',
    tab: TAB.DEPOSIT
  },
  {
    label: 'Withdraw',
    tab: TAB.WITHDRAW
  },
  {
    label: 'Info',
    tab: TAB.INFO
  }
]

interface CardFarmingManageProps {
  selectedMode: FarmingModeT
}

export const CardFarmingManage = ({ selectedMode }: CardFarmingManageProps) => {
  const [activeTab, setActiveTab] = useState(TAB.DEPOSIT)

  return (
    <div className="flex-1 md:flex-5 rounded-2xl bg-background300 border border-borderColor p-5">
      <div className="flex items-center p-1 gap-2 border border-borderColor bg-background100 rounded-lg">
        {TABS.map((item, index) => (
          <TabItem
            isActive={activeTab === item.tab}
            key={index}
            onClick={() => {
              setActiveTab(item.tab)
            }}>
            {item.label}
          </TabItem>
        ))}
      </div>
      {activeTab === TAB.DEPOSIT && <DepositSection selectedMode={selectedMode} />}
      {activeTab === TAB.INFO && <InfoSection selectedMode={selectedMode} />}
      {activeTab === TAB.WITHDRAW && (
        <WithdrawSection selectedMode={selectedMode} setActiveTab={setActiveTab} />
      )}{' '}
    </div>
  )
}

const TabItem = styled.div<{ isActive: boolean }>`
  ${tw`flex-1 py-2.5 rounded-lg text-sm text-center text-textBase font-medium hover:bg-navItemHover cursor-pointer`}
  ${(props) => props.isActive && tw`bg-navItem text-primary500`}
`
