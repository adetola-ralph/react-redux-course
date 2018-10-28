import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';

// Reducers
import rootReducer from '../reducers';

const middlewares = () => {
  const middleware = [
    thunk,
    logger,
  ];

  if (process.env.NODE_ENV !== 'production') {
    middleware.push(reduxImmutableStateInvariant());
  }

  return middleware;
};

const configureStore = initialState => createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middlewares()),
);

export default configureStore;
