export const SET_WALLET_ADDRESS = 'SET_WALLET_ADDRESS'
export const SET_BALANCE = 'SET_BALANCE'
export const CLEAR_WALLET = 'CLEAR_WALLET'

export const setWalletAddress = (address) => ({
  type: SET_WALLET_ADDRESS,
  payload: {
    address,
  }
})

export const setBalance = (balance) => ({
  type: SET_BALANCE,
  payload: {
    balance,
  }
})

export const clearWallet = () => ({
  type: CLEAR_WALLET,
})
