import { createStore } from 'redux'

const configureStore = (preloadedState) => {
  let store = createStore(
    rootReducer,
    preloadedState
  );

  return store;
}

export default configureStore;