import { SORT } from '../actions/actionTypes';

const intialState = {
  author: {
    sortOrder: 'desc',
    sortBy: 'id',
  },
  course: {
    sortOrder: 'desc',
    sortBy: 'id',
  },
};

const sortReducer = (state = intialState, action) => {
  let { sortOrder } = action;
  const { sortBy, list } = action;

  if (action.type === SORT) {
    if (state[list].sortBy !== sortBy) {
      sortOrder = 'asc';
    }

    return {
      ...state,
      [list]: {
        sortOrder,
        sortBy,
      },
    };
  }

  return state;
};

export default sortReducer;
