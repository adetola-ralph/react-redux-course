import { CREATE_COURSE } from '../actions/actionTypes';

const courseReducer = (state = [], action) => {
  const { type } = action;
  switch (type) {
    case CREATE_COURSE:
      return [...state, Object.assign({}, action.course)];
    default:
      return state;
  }
};

export default courseReducer;
