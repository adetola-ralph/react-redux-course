import { LOAD_AUTHORS_SUCCESS } from '../actions/actionTypes';

const authorReducer = (state = [], action) => {
  const { type } = action;
  switch (type) {
    case LOAD_AUTHORS_SUCCESS:
      return action.authors;
    default:
      return state;
  }
};

export default authorReducer;
