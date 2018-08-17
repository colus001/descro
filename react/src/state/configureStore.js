import { createStore } from 'redux'

const configureStore = (state) => {
  const store = createStore(
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    state,
  )

  return store
}

export default configureStore
