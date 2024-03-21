import { FC } from 'react'

import ButtonAddTokenToMetamask from '@/components/app/Buttons/ButtonAddTokenToMetamask'
import { ACTIVITY_TYPE } from '@/constants/activity'
import { BSN, DETH, GETH, KETH, kwETH } from '@/constants/tokens'
import { useCustomAccount, useNetworkBasedLinkFactories } from '@/hooks'
import { humanReadableAddress, humanReadableAmount } from '@/utils/global'
import { getKETHLpTokenByAddress } from '@/utils/tokens'

const Description: FC<{ activity: any }> = ({ activity }) => {
  const { makeEtherscanLink } = useNetworkBasedLinkFactories()
  const { account } = useCustomAccount()
  let interactAddress = ''

  switch (activity.type) {
    case ACTIVITY_TYPE.KETHDeposit:
      return (
        <span className="description">
          Deposited {humanReadableAmount(activity.values[2])}{' '}
          <a
            href={makeEtherscanLink(activity.values[1], false, true)}
            target="_blank"
            rel="noreferrer"
            className={'text-yellow'}>
            {getKETHLpTokenByAddress(activity.values[1])?.symbol}
          </a>{' '}
          <ButtonAddTokenToMetamask token={getKETHLpTokenByAddress(activity.values[1])} /> and
          minted {humanReadableAmount(activity.values[3])}{' '}
          <a
            href={makeEtherscanLink(KETH.address!, false, true)}
            target="_blank"
            rel="noreferrer"
            className={'text-yellow'}>
            {KETH.symbol}
          </a>{' '}
          <ButtonAddTokenToMetamask token={KETH} />{' '}
          <a
            href={makeEtherscanLink(activity.tx)}
            target="_blank"
            rel="noreferrer"
            className={'text-primary'}>
            (check TX here)
          </a>
        </span>
      )
    case ACTIVITY_TYPE.KETHTransfer:
      interactAddress =
        activity.values[0] == account.address.toLowerCase()
          ? activity.values[1]
          : activity.values[0]
      return (
        <span className="description">
          {activity.values[0] == account.address.toLowerCase() ? 'Sent' : 'Received'}{' '}
          {humanReadableAmount(activity.values[3])}{' '}
          <a
            href={makeEtherscanLink(KETH.address!, false, true)}
            target="_blank"
            rel="noreferrer"
            className={'text-yellow'}>
            {KETH.symbol}
          </a>{' '}
          {activity.values[0] == account.address.toLowerCase() ? 'to' : 'from'}{' '}
          <a
            href={makeEtherscanLink(interactAddress!, false, true)}
            target="_blank"
            rel="noreferrer"
            className={'text-yellow'}>
            {humanReadableAddress(interactAddress, 4)}
          </a>{' '}
          <a
            href={makeEtherscanLink(activity.tx)}
            target="_blank"
            rel="noreferrer"
            className={'text-primary'}>
            (check TX here)
          </a>
        </span>
      )
    case ACTIVITY_TYPE.KETHWithdraw:
      return (
        <span className="description">
          Burned {humanReadableAmount(activity.values[1])}{' '}
          <a
            href={makeEtherscanLink(KETH.address!, false, true)}
            target="_blank"
            rel="noreferrer"
            className={'text-yellow'}>
            {KETH.symbol}
          </a>{' '}
          <ButtonAddTokenToMetamask token={KETH} /> and withdrew{' '}
          {activity.values[2] !== '0' ? <>{humanReadableAmount(activity.values[2])} ETH,</> : ''} {}{' '}
          {activity.values[3] !== '0' ? (
            <>
              <a
                href={makeEtherscanLink(DETH.address!, false, true)}
                target="_blank"
                rel="noreferrer"
                className={'text-yellow'}>
                {DETH.symbol}
              </a>{' '}
              <ButtonAddTokenToMetamask token={DETH} />
            </>
          ) : (
            ''
          )}{' '}
          {activity.values[4] !== '0' ? (
            <>
              and {humanReadableAmount(activity.values[4])}{' '}
              <a
                href={makeEtherscanLink(GETH.address!, false, true)}
                target="_blank"
                rel="noreferrer"
                className={'text-yellow'}>
                {GETH.symbol}
              </a>{' '}
              <ButtonAddTokenToMetamask token={GETH} />{' '}
            </>
          ) : (
            ''
          )}{' '}
          <a
            href={makeEtherscanLink(activity.tx)}
            target="_blank"
            rel="noreferrer"
            className={'text-primary'}>
            (check TX here)
          </a>
        </span>
      )
    case ACTIVITY_TYPE.DETHDeposit:
      return (
        <span className="description">
          Deposited {humanReadableAmount(activity.values[1])}{' '}
          <a
            href={makeEtherscanLink(DETH.address!, false, true)}
            target="_blank"
            rel="noreferrer"
            className={'text-yellow'}>
            {DETH.symbol}
          </a>{' '}
          <ButtonAddTokenToMetamask token={DETH} /> and minted{' '}
          {humanReadableAmount(activity.values[2])}{' '}
          <a
            href={makeEtherscanLink(kwETH.address!, false, true)}
            target="_blank"
            rel="noreferrer"
            className={'text-yellow'}>
            {kwETH.symbol}
          </a>{' '}
          <ButtonAddTokenToMetamask token={kwETH} />{' '}
          <a
            href={makeEtherscanLink(activity.tx)}
            target="_blank"
            rel="noreferrer"
            className={'text-primary'}>
            (check TX here)
          </a>
        </span>
      )
    case ACTIVITY_TYPE.DETHWithdrawToETH:
      return (
        <span className="description">
          Burned {humanReadableAmount(activity.values[2])}{' '}
          <a
            href={makeEtherscanLink(kwETH.address!, false, true)}
            target="_blank"
            rel="noreferrer"
            className={'text-yellow'}>
            {kwETH.symbol}
          </a>{' '}
          <ButtonAddTokenToMetamask token={kwETH} /> and withdrew{' '}
          {humanReadableAmount(activity.values[1])} ETH{' '}
          <a
            href={makeEtherscanLink(activity.tx)}
            target="_blank"
            rel="noreferrer"
            className={'text-primary'}>
            (check TX here)
          </a>
        </span>
      )
    case ACTIVITY_TYPE.DETHWithdrawToDETH:
      return (
        <span className="description">
          Burned {humanReadableAmount(activity.values[2])}{' '}
          <a
            href={makeEtherscanLink(kwETH.address!, false, true)}
            target="_blank"
            rel="noreferrer"
            className={'text-yellow'}>
            {kwETH.symbol}
          </a>{' '}
          <ButtonAddTokenToMetamask token={kwETH} /> and withdrew{' '}
          {humanReadableAmount(activity.values[1])}{' '}
          <a
            href={makeEtherscanLink(DETH.address!, false, true)}
            target="_blank"
            rel="noreferrer"
            className={'text-yellow'}>
            {DETH.symbol}
          </a>{' '}
          <ButtonAddTokenToMetamask token={DETH} />{' '}
          <a
            href={makeEtherscanLink(activity.tx)}
            target="_blank"
            rel="noreferrer"
            className={'text-primary'}>
            (check TX here)
          </a>
        </span>
      )
    case ACTIVITY_TYPE.DETHSwapETHToDETH:
      return (
        <span className="description">
          Swapped {humanReadableAmount(activity.values[1])} ETH to{' '}
          {humanReadableAmount(activity.values[2])}{' '}
          <a
            href={makeEtherscanLink(DETH.address!, false, true)}
            target="_blank"
            rel="noreferrer"
            className={'text-yellow'}>
            {DETH.symbol}
          </a>{' '}
          <ButtonAddTokenToMetamask token={DETH} />{' '}
          <a
            href={makeEtherscanLink(activity.tx)}
            target="_blank"
            rel="noreferrer"
            className={'text-primary'}>
            (check TX here)
          </a>
        </span>
      )
    case ACTIVITY_TYPE.BSNFarmingDeposit:
      return (
        <span className="description">
          Deposited {humanReadableAmount(activity.values[2])}{' '}
          <a
            href={makeEtherscanLink(KETH.address!, false, true)}
            target="_blank"
            rel="noreferrer"
            className={'text-yellow'}>
            {KETH.symbol}
          </a>{' '}
          <ButtonAddTokenToMetamask token={KETH} /> into Farming Pool (id: {activity.values[1]}){' '}
          <a
            href={makeEtherscanLink(activity.tx)}
            target="_blank"
            rel="noreferrer"
            className={'text-primary'}>
            (check TX here)
          </a>
        </span>
      )
    case ACTIVITY_TYPE.BSNFarmingWithdraw:
      return (
        <span className="description">
          Withdrew {humanReadableAmount(activity.values[2])}{' '}
          <a
            href={makeEtherscanLink(KETH.address!, false, true)}
            target="_blank"
            rel="noreferrer"
            className={'text-yellow'}>
            {KETH.symbol}
          </a>{' '}
          <ButtonAddTokenToMetamask token={KETH} /> from Farming Pool (id: {activity.values[1]}){' '}
          <a
            href={makeEtherscanLink(activity.tx)}
            target="_blank"
            rel="noreferrer"
            className={'text-primary'}>
            (check TX here)
          </a>
        </span>
      )
    case ACTIVITY_TYPE.BSNFarmingClaim:
      return (
        <span className="description">
          Claimed {humanReadableAmount(activity.values[2])}{' '}
          <a
            href={makeEtherscanLink(BSN.address!, false, true)}
            target="_blank"
            rel="noreferrer"
            className={'text-yellow'}>
            {BSN.symbol}
          </a>{' '}
          <ButtonAddTokenToMetamask token={BSN} /> from Farming Pool (id: {activity.values[1]})
          <a
            href={makeEtherscanLink(activity.tx)}
            target="_blank"
            rel="noreferrer"
            className={'text-primary'}>
            (check TX here)
          </a>
        </span>
      )
    default:
      return <></>
  }
}

export default Description
