import gql from 'graphql-tag'

export const LsdValidatorsQuery = gql`
  query Validators($blsPublicKey: String!) {
    stakehouseAccounts(
      where: { id: $blsPublicKey }
      orderBy: registerValidatorBlockNumber
      orderDirection: asc
    ) {
      id
      depositTxHash
      lifecycleStatus
      totalDETHMinted
      totalCollateralizedSLOTInVaultFormatted
      totalSLOT
      sETHMinted
      mintFromBlockNumber
      stakeHouseMetadata {
        id
        sETH
        sETHTicker
        sETHExchangeRate
        sETHPayoffRateFormatted
      }
      knotMetadata {
        isPartOfIndex
        savETHIndexId
      }
    }
  }
`

export const getLSDValidatorsCount = gql`
  query getLSDValidatorsCount {
    lsdvalidators(where: { status: "WAITING_FOR_ETH" }, first: 1000) {
      id
    }
  }
`
