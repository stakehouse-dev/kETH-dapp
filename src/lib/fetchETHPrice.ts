const API_URL = 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'

export const fetchETHPrice = async () => {
  try {
    const response = await fetch(`${API_URL}`)
    const data = await response.json()
    return data.ethereum.usd
  } catch (err) {
    console.log('fetchEthPrice error: ', err)
    return 0
  }
}
