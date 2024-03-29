export type TStakehouseSDK = {
  reportBalance: (...args: any) => any
  reportBalanceIncrease: (...args: any) => any
  registerValidatorInitials: (...args: any) => any
  registerValidator: (...args: any) => any
  createStakehouse: (...args: any) => any
  joinStakehouse: (...args: any) => any
  addKnotToOpenIndexAndWithdraw: (...args: any) => any
  batchAddKnotToOpenIndexAndWithdraw: (...args: any) => any
  batchTransferKnotsToSingleIndex: (...args: any) => any
  BLSAuthentication: (...args: any) => any
  rageQuitKnot: (...args: any) => any
  rageQuit: (...args: any) => any
  depositIntoSavETHRegistry: (...args: any) => any
  depositAndIsolateKnotIntoIndex: (...args: any) => any
  slash: (...args: any) => any
  slashAndTopUpSlot: (...args: any) => any
  createIndex: (...args: any) => any
  approveTransferOfIndexOwnership: (...args: any) => any
  transferIndexOwnership: (...args: any) => any
  transferKnotToAnotherIndex: (...args: any) => any
  approveSpendingOfKnotInIndex: (...args: any) => any
  joinStakeHouseAndCreateBrand: (...args: any) => any
  balanceReport: {
    getFinalisedEpochReport: (...args: any) => any
    authenticateReport: (...args: any) => any
  }
  utils: {
    checkKeystorePass: (...args: any) => any
    add0x: (...args: any) => any
    remove0x: (...args: any) => any
    getDepositDataFromKeystore: (...args: any) => any
    getPersonalSignInitials: (...args: any) => any
    getPersonalSignInitialsByPrivateKey: (...args: any) => any
    generateCredentials: (...args: any) => any
    getValidatorLifecycleStatus: (...args: any) => any
    formDepositDataRoot: (...args: any) => any
    getLastDepositIndex: (...args: any) => any
    getDETHBalanceInIndex: (...args: any) => any
    getSLOTBalanceInVault: (...args: any) => any
    getsETHAddress: (...args: any) => any
    getsETHBalance: (...args: any) => any
    getGenericERC20WalletBalance: (...args: any) => any
    currentSlashedAmountOfSLOTForKnot: (...args: any) => any
    calculateExitFee: (...args: any) => any
    getNumberOfCollateralisedSlotOwnersForKnot: (...args: any) => any
    getStakehouseRedemptionRate: (...args: any) => any
    getStakehouseExchangeRate: (...args: any) => any
    getStakehouseSETHRedemptionThreshold: (...args: any) => any
    getTotalUserCollateralisedSETHBalanceInHouse: (...args: any) => any
    totalFundsInKNOTQueue: (...args: any) => any
    associatedIndexIdForKnot: (...args: any) => any
    rageQuitChecks: (...args: any) => any
    indexIdToOwner: (...args: any) => any
    isBalanceLower: (...args: any) => any
    dETHToSavETH: (...args: any) => any
    savETHToDETH: (...args: any) => any
    dETHRewardsMintedForKNOT: (...args: any) => any
    dETHRequiredForIsolation: (...args: any) => any
    savETHRequiredForIsolation: (...args: any) => any
    getKNOTNonce: (...args: any) => any
    getLastKnownReportForKNOT: (...args: any) => any
    updateSavETHIndexName: (...args: any) => any
    topUpSlashedSlot: (...args: any) => any
    topUpSlashedSlotWithOneEth: (...args: any) => any
    topUpKNOT: (...args: any) => any
    topUpKNOTWithOneEth: (...args: any) => any
    dETHMetadata: (...args: any) => any
    getStakehouse: (...args: any) => any
  }
  subgraph: {
    getAllIndexesOwnedByAUser: (...args: any) => any
    getPersonalIndex: (...args: any) => any
    knotToStakehouse: (...args: any) => any
    getAllEventsForAKnot: (...args: any) => any
  }
  cip: {
    generateAESCredentials: (...args: any) => any
    formAESKeystore: (...args: any) => any
    validateBLSKeystore: (...args: any) => any
    unlockAESPrivateKey: (...args: any) => any
    unlockBLSKeystore: (...args: any) => any
    formCIPCiphertext: (...args: any) => any
    isReEncryptionCompleted: (...args: any) => any
    reEncrypt: (...args: any) => any
    applyForDecryption: (...args: any) => any
    getRequestAvailabilityBlock: (...args: any) => any
    getParitalDecryptionPieces: (...args: any) => any
    getAllGuardians: (...args: any) => any
    getThreshold: (...args: any) => any
    getAESPublicKeyfromPrivateKey: (...args: any) => any
    aggregateSharedPrivateKeys: (...args: any) => any
    formBLSKeystore: (...args: any) => any
    getDecryptionState: (...args: any) => any
    decryptionEligibilityChecks: (...args: any) => any
  }
  wizard: {
    depositETHForProtectedStaking: (...args: any) => any
    depositETHForFeesAndMEV: (...args: any) => any
    getListOfLSDNetworks: (...args: any) => any
    setNodeRunnerLabel: (...args: any) => any
    getLSDNForBLSPublicKey: (...args: any) => any
    depositETHByNodeRunner: (...args: any) => any
    availableToStake: (...args: any) => any
    isBLSPublicKeyBanned: (...args: any) => any
    fundNodeOperatorFromGiantSavETHPool: (...args: any) => any
    isLabelAlreadyTaken: (...args: any) => any
    fundNodeOperatorFromGiantFeesAndMevPool: (...args: any) => any
    calculateFundsRequiredForStaking: (...args: any) => any
    stake: (...args: any) => any
    getAllBLSPublicKeysForANodeRunnerInAnLSDNetwork: (...args: any) => any
    getUserGiantFeesAndMevLPBalance: (...args: any) => any
    getGiantPoolDETHBalance: (...args: any) => any
    getMinimum: (...args: any) => any
    getUserGiantProtectedStakingLPBalance: (...args: any) => any
    previewNodeOperatorRewards: (...args: any) => any
    claimProtectedStakingRewards: (...args: any) => any
    claimFeesAndMevRewards: (...args: any) => any
    getValidatorsToBeRotated: (...args: any) => any
    rotateFundsBackToGiantProtectedStakingPool: (...args: any) => any
    rotateFundsBackToGiantFeesAndMevPool: (...args: any) => any
    isETHAvailableInProtectedStakingOfSomeLSDN: (...args: any) => any
    isETHAvailableInFeesAndMevOfSomeLSDN: (...args: any) => any
    getLpTokensDataForClaimRewards: (...args: any) => any
    previewFeesAndMevRewards: (...args: any) => any
    getLastInteractedTimestamp: (...args: any) => any
    isEligibleToInteractWithGiantLPToken: (...args: any) => any
    getProtectedBatchesForDepositor: (...args: any) => any
    previewClaimableProtectedStakingLP: (...args: any) => any
    batchCalculateFundsRequiredForStaking: (...args: any) => any
    batchMintDerivatives: (...args: any) => any
    batchFundNodeOperatorFromGiantSavETHPool: (...args: any) => any
    batchFundNodeOperatorFromGiantFeesAndMevPool: (...args: any) => any
    getBatchDepositDataFromKeystores: (...args: any) => any
    batchStake: (...args: any) => any
    batchDepositNodeOperators: (...args: any) => any
  }
  constants: Promise<{
    stakehouseAddresses: any
    stakehouseUrls: any
    customErrors: any
    signatureEnum: any
  }>
  contractInstance: Promise<any>
}

export type TStakehouseWizard = {
  deployer: {
    deployNewLiquidStakingDerivativeNetwork: (...args: any) => any
  }
  utils: {
    add0x: (...args: any) => any
    remove0x: (...args: any) => any
    getDAOAddress: (...args: any) => any
    getSavETHVaultAddress: (...args: any) => any
    getFeesAndMEVPoolAddress: (...args: any) => any
    getStakehouseTicker: (...args: any) => any
    isWhitelistingEnabled: (...args: any) => any
    isNodeRunnerWhitelisted: (...args: any) => any
    getSmartWalletRepresentative: (...args: any) => any
    getSmartWalletOfKnot: (...args: any) => any
    getSmartWalletOfNodeRunner: (...args: any) => any
    getNodeRunnerOfSmartWallet: (...args: any) => any
    getStakedKnotsOfSmartWallet: (...args: any) => any
    getSmartWalletDormantRepresentative: (...args: any) => any
    isNodeRunnerBanned: (...args: any) => any
    getNumberOfKnots: (...args: any) => any
    getDaoCommissionPercentage: (...args: any) => any
    isBLSPublicKeyBanned: (...args: any) => any
    executeAsSmartWallet: (...args: any) => any
    deRegisterKnotsFromSyndicate: (...args: any) => any
    restoreFreeFloatingSharesToSmartWalletForRageQuit: (...args: any) => any
    updateDaoAddress: (...args: any) => any
    updateDaoRevenueCommission: (...args: any) => any
    updateStakehouseTicker: (...args: any) => any
    updateWhitelisting: (...args: any) => any
    updateNodeRunnerWhitelistStatus: (...args: any) => any
    rotateEOARepresentative: (...args: any) => any
    rotateEOARepresentativeOfNodeRunner: (...args: any) => any
    withdrawETHForKnot: (...args: any) => any
    rotateNodeRunnerOfSmartWallet: (...args: any) => any
    claimRewardsAsNodeRunner: (...args: any) => any
    registerBLSPublicKeys: (...args: any) => any
    isKnotDeregistered: (...args: any) => any
    stake: (...args: any) => any
    mintDerivatives: (...args: any) => any
    getNetworkFeeRecipient: (...args: any) => any
  }
  savETHPool: {
    getIndexOwnedByTheVault: (...args: any) => any
    batchDepositETHForStaking: (...args: any) => any
    depositETHForStaking: (...args: any) => any
    burnLPTokensByBLS: (...args: any) => any
    burnLPTokens: (...args: any) => any
    burnLPToken: (...args: any) => any
    isDETHReadyForWithdrawal: (...args: any) => any
  }
  feesAndMevPool: {
    totalShares: (...args: any) => any
    updateAccumulatedETHPerLP: (...args: any) => any
    batchDepositETHForStaking: (...args: any) => any
    depositETHForStaking: (...args: any) => any
    burnLPTokensForETHByBLS: (...args: any) => any
    burnLPTokensForETH: (...args: any) => any
    burnLPTokenForETH: (...args: any) => any
    claimRewards: (...args: any) => any
    batchPreviewAccumulatedETHByBLSKeys: (...args: any) => any
    batchPreviewAccumulatedETH: (...args: any) => any
    previewAccumulatedETH: (...args: any) => any
    claimFundsFromSyndicateForDistribution: (...args: any) => any
  }
  giantSavETHPool: {
    batchDepositETHForStaking: (...args: any) => any
    withdrawDETH: (...args: any) => any
    batchRotateLPTokens: (...args: any) => any
    bringUnusedETHBackIntoGiantPool: (...args: any) => any
    depositETH: (...args: any) => any
    getIdleETH: (...args: any) => any
    withdrawETH: (...args: any) => any
  }
  giantFeesAndMevPool: {
    batchDepositETHForStaking: (...args: any) => any
    claimRewards: (...args: any) => any
    previewAccumulatedETH: (...args: any) => any
    batchRotateLPTokens: (...args: any) => any
    bringUnusedETHBackIntoGiantPool: (...args: any) => any
    updateAccumulatedETHPerLP: (...args: any) => any
    depositETH: (...args: any) => any
    getIdleETH: (...args: any) => any
    withdrawETH: (...args: any) => any
  }
  contractInstance: {}
  constants: {}
}
