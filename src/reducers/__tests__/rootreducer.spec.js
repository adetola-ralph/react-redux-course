import { createStore } from 'redux';

import rootReducer from '..';

const store = createStore(rootReducer);
let state;

describe('Root reducer', () => {
  beforeAll(() => {
    state = store.getState();
  });

  it('should get default states', () => {
    const {
      sort, courses, authors, ajaxCallsInProgress,
    } = state;

    expect(sort).toEqual({
      author: {
        sortOrder: 'desc',
        sortBy: 'id',
      },
      course: {
        sortOrder: 'desc',
        sortBy: 'id',
      },
    });

    expect(courses).toEqual([]);
    expect(authors).toEqual([]);
    expect(ajaxCallsInProgress).toEqual(0);
  });
});
