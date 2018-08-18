import { combineReducers } from 'redux'

import contract from './contract'
import wallet from './wallet'
import escrows from './escrows'

const rootReducer = combineReducers({
  contract,
  wallet,
  escrows,
})

export default rootReducer
