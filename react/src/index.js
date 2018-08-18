import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import storage from 'redux-persist/lib/storage'

import Root from './Root'
import Loading from './components/Loading'

import registerServiceWorker from './registerServiceWorker'
import configureStore from './state/configureStore'
import rootReducer from './state/reducers'

import './index.css'

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['contract']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore(persistedReducer)
const persistor = persistStore(store)

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<Loading />} persistor={persistor}>
      <Root />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
