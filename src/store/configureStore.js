import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger'
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';

// Reducers
import rootReducer from '../reducers';

const configureStore = initialState => createStore(
  rootReducer,
  initialState,
  applyMiddleware(reduxImmutableStateInvariant(), logger),
);

export default configureStore;
