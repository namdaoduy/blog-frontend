import { createStore, applyMiddleware, compose } from 'redux';

import rootReducer from '../reducers';
import clientMiddleware from './clientMiddleware';

const configureStore = (preloadedState) => {
  const middleware = [clientMiddleware];

  const store = createStore(
    rootReducer,
    preloadedState,
    compose(applyMiddleware(...middleware)),
  );

  return store;
};

export default configureStore;