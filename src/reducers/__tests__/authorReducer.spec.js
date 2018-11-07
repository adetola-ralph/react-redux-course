import { LOAD_AUTHORS_SUCCESS, CREATE_AUTHOR_SUCCESS, UPDATE_AUTHOR_SUCCESS } from '../../actions/actionTypes';
import authorReducer from '../authorReducer';

describe('Author Reducer', () => {
  it('should return initial state', () => {
    const state = authorReducer(undefined, { type: '' });

    expect(state).toEqual([]);
  });

  it('should handle LOAD_AUTHORS_SUCCESS', () => {
    const authorsAction = { type: LOAD_AUTHORS_SUCCESS, authors: [{ id: 42, comment: 'comment 42' }, { id: 43, comment: 'comment 43' }] };
    const state = authorReducer([], authorsAction);

    expect(state).toEqual(authorsAction.authors);
  });

  it('should handle CREATE_AUTHOR_SUCCESS', () => {
    const authorsAction = { type: CREATE_AUTHOR_SUCCESS, author: { id: 43, comment: 'comment 43' } };
    const initialState = [{ id: 42, comment: 'comment 42' }];
    const state = authorReducer(initialState, authorsAction);

    expect(state).toContainEqual({ id: 43, comment: 'comment 43' });
    expect(initialState).not.toEqual(state);
  });

  it('should handle UPDATE_AUTHOR_SUCCESS', () => {
    const authorsAction = { type: UPDATE_AUTHOR_SUCCESS, author: { id: 43, comment: 'comment 44' } };
    const initialState = [{ id: 42, comment: 'comment 42' }, { id: 43, comment: 'comment 43' }];
    const state = authorReducer(initialState, authorsAction);

    expect(state).toContainEqual({ id: 43, comment: 'comment 44' });
    expect(state).not.toContainEqual({ id: 43, comment: 'comment 43' });
    expect(initialState).not.toEqual(state);
  });
});
