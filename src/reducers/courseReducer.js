import { LOAD_COURSES_SUCCESS } from '../actions/actionTypes';

const courseReducer = (state = [], action) => {
  const { type } = action;
  switch (type) {
    case LOAD_COURSES_SUCCESS:
      return action.courses;
    default:
      return state;
  }
};

export default courseReducer;
