import { SET_WALLET_ADDRESS } from '../actions/wallet'

const initialState = {
  address: null,
}

const walletReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_WALLET_ADDRESS:
      return {
        ...state,
        address: action.payload.address,
      }
    default:
      return state
  }
}

export default walletReducer
