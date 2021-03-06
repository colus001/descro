import { SET_WALLET_ADDRESS, SET_BALANCE, CLEAR_WALLET } from '../actions/wallet'

const initialState = {
  address: null,
  balance: null,
}

const walletReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_WALLET_ADDRESS:
      return {
        ...state,
        address: action.payload.address,
      }
    case SET_BALANCE:
      return {
        ...state,
        balance: action.payload.balance,
      }
    case CLEAR_WALLET:
      return {
        ...initialState,
      }
    default:
      return state
  }
}

export default walletReducer
