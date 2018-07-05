import { createStore } from 'redux'

const configureStore = () => {
  const store = createStore(
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )

  return store
}

return configureStore
