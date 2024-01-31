import { formatEther } from 'ethers/lib/utils'

export const calcBalance = (batches: any) => {
  let amount = 0,
    withdrawn = 0
  batches.map((item: any) => {
    amount += Number(formatEther(item.liquidityProviders[0].amount))
    withdrawn += Number(formatEther(item.liquidityProviders[0].withdrawn))
  })

  return amount - withdrawn
}
