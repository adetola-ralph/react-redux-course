import { combineReducers } from 'redux';

// Reducers
import courses from './courseReducer';
import authors from './authorReducer';

const rootReducer = combineReducers({
  courses,
  authors,
});

export default rootReducer;
