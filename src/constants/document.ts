import { WITHDRAW_MODE } from '.'

const documentByMode = (mode: WITHDRAW_MODE, account: string, validatorId?: string) => {
  switch (mode) {
    case WITHDRAW_MODE.STAKING:
      return `{
            protectedBatches
            (where:{
              liquidityProviders_:{
                lpAddress: "${account}"
              }
              vaultLPToken_:{
                lifecycleStatus: "MINTED_DERIVATIVES"
              }
            }) 
            {
              id
              lsdValidator {
                id
                currentIndex
              }
              vaultLPToken {
                id
                issuer
              }
              liquidityProviders
              (where:{
                lpAddress: "${account}"
              }) 
              {
                amount
                withdrawn
              }
            }
          }
        `
    case WITHDRAW_MODE.FEES_MEV:
      return `{
        feesAndMevBatches(
          where: {
            liquidityProviders_: {
              lpAddress: "${account}"
            }
            vaultLPToken_: { lifecycleStatus: "MINTED_DERIVATIVES" }
          }
        ) {
          id
          blsPublicKey
          vaultLPToken {
            id
            issuer
          }
          liquidityProviders(
            where: { lpAddress: "${account}" }
          ) {
            amount
            withdrawn
          }
        }
      }
      `
    default:
      return `{
            nodeRunners(where: {
              id: "${account}"
              validators_: {
                status: "MINTED_DERIVATIVES"
              }
            }) {
              id
              name
              liquidStakingNetworks {
                id
                ticker
                commission
                feeRecipientAndSyndicate
              }
              validators(where: {
                status: "MINTED_DERIVATIVES"
              }) {
                id
                currentIndex
                status
              }
            }
          }
          `
  }
}

export default documentByMode
