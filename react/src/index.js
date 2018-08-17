import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import Root from './Root'
import registerServiceWorker from './registerServiceWorker'
import configureStore from './state/configureStore'
import rootReducer from './state/reducers'

import './index.css'

ReactDOM.render(
  <Provider store={configureStore(rootReducer)}>
    <Root />
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
