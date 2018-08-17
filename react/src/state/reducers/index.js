import { combineReducers } from 'redux'

import contract from './contract'
import wallet from './wallet'

const rootReducer = combineReducers({
  contract,
  wallet,
})

export default rootReducer
