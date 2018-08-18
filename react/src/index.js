import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import Root from './Root'
import registerServiceWorker from './registerServiceWorker'
import configureStore from './state/configureStore'
import rootReducer from './state/reducers'

import './index.css'

export const store = configureStore(rootReducer)

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
