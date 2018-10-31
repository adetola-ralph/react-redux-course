import { combineReducers } from 'redux';

// Reducers
import sort from './sortReducer';
import courses from './courseReducer';
import authors from './authorReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
  sort,
  courses,
  authors,
  ajaxCallsInProgress,
});

export default rootReducer;
