export const SET_WALLET_ADDRESS = 'SET_WALLET_ADDRESS'

export const setWalletAddress = (address) => ({
  type: SET_WALLET_ADDRESS,
  payload: {
    address,
  }
})
