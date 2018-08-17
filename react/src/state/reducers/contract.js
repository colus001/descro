import { SET_CONTRACT } from '../actions/contract'

const initialState = null

const descroReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_CONTRACT:
      return action.payload.contract
    default:
      return state
  }
}

export default descroReducer
