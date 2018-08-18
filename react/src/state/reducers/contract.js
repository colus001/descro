import { SET_CONTRACT } from '../actions/contract'

const initialState = null

const descroReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_CONTRACT:
      if (process.env.NODE_ENV !== 'production') {
        window.contract = action.payload.contract
      }

      return action.payload.contract
    default:
      return state
  }
}

export default descroReducer
