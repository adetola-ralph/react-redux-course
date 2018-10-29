import { LOAD_AUTHORS_SUCCESS, CREATE_AUTHOR_SUCCESS, UPDATE_AUTHOR_SUCCESS } from '../actions/actionTypes';

const authorReducer = (state = [], action) => {
  const { type } = action;
  switch (type) {
    case LOAD_AUTHORS_SUCCESS:
      return action.authors;
    case CREATE_AUTHOR_SUCCESS:
      return [...state, { ...action.author }];
    case UPDATE_AUTHOR_SUCCESS:
      return state.map((author) => {
        if (author.id === action.author.id) {
          return { ...action.author };
        }

        return author;
      });
    default:
      return state;
  }
};

export default authorReducer;
