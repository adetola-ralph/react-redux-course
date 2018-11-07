import { SORT } from '../../actions/actionTypes';
import sortReducer from '../sortReducer';

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

// TODO: test that the right sortOrder is given

describe('Sort Reducer', () => {
  it('should return initial state', () => {
    const state = sortReducer(undefined, { type: '' });

    expect(state).toEqual(intialState);
  });

  describe('author list', () => {
    it('should sort asc on first sort', () => {
      const state = sortReducer(intialState, { type: SORT, sortBy: 'random', list: 'author' });

      expect(state.author).toEqual({
        sortOrder: 'asc',
        sortBy: 'random',
      });
    });

    it('should sort desc', () => {
      const newIntialState = { ...intialState, author: { sortOrder: 'asc', sortBy: 'random' } };
      const state = sortReducer(newIntialState, {
        type: SORT, sortBy: 'random', list: 'author', sortOrder: 'desc',
      });

      expect(state.author).toEqual({
        sortOrder: 'desc',
        sortBy: 'random',
      });
    });

    it('should sort desc', () => {
      const newIntialState = { ...intialState, author: { sortOrder: 'desc', sortBy: 'random' } };
      const state = sortReducer(newIntialState, {
        type: SORT, sortBy: 'definite', list: 'author', sortOrder: 'asc',
      });

      expect(state.author).toEqual({
        sortOrder: 'asc',
        sortBy: 'definite',
      });
    });
  });
});
