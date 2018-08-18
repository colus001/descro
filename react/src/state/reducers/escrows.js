import { SET_ESCROWS } from '../actions/escrows'

const initialState = {
  asBuyer: [],
  asSeller: [],
}

const escrowsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ESCROWS:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}

export default escrowsReducer
