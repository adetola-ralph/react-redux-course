import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import { AuthorApi } from '../../api/mockAuthorApi';
import { LOAD_AUTHORS_SUCCESS, CREATE_AUTHOR_SUCCESS } from '../actionTypes';
import {
  createAuthorSuccess, loadAuthorsSuccess, loadAuthor, saveAuthor,
} from '../authorActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore({ authors: [], ajaxCallsInProgress: 0 });


describe('Author action creation', () => {
  it('should create action for load author success', () => {
    expect(loadAuthorsSuccess([{ id: 3, name: 'Oreofe Olutola' }])).toEqual({
      type: LOAD_AUTHORS_SUCCESS,
      authors: [{ id: 3, name: 'Oreofe Olutola' }],
    });
  });

  it('should create action for create author success', () => {
    expect(createAuthorSuccess({ id: 3, name: 'Oreofe Olutola' })).toEqual({
      type: CREATE_AUTHOR_SUCCESS,
      author: { id: 3, name: 'Oreofe Olutola' },
    });
  });
});

describe('Author async actions', () => {
  describe('loadAuthor action', () => {
    beforeEach(() => {
      AuthorApi.getAllAuthors = jest.fn(() => Promise.resolve([{ id: 3, name: 'Oreofe Olutola' }]));
    });

    afterEach(() => {
      store.clearActions();
    });

    it('should create LOAD_AUTHORS_SUCCESS & BEGIN_AJAX_CALL', async () => {
      await store.dispatch(loadAuthor());
      expect(store.getActions()).toEqual([
        {
          type: 'BEGIN_AJAX_CALL',
        },
        {
          authors: [
            {
              id: 3,
              name: 'Oreofe Olutola',
            },
          ],
          type: 'LOAD_AUTHORS_SUCCESS',
        },
      ]);
    });

    it('should handle failed request', async () => {
      AuthorApi.getAllAuthors = jest.fn(() => Promise.reject());
      try {
        await store.dispatch(loadAuthor());
      } catch (err) {
        expect(store.getActions()).toEqual([
          { type: 'BEGIN_AJAX_CALL' },
          { type: 'AJAX_CALL_ERROR' },
        ]);
      }
    });
  });

  describe('saveAuthor action', () => {
    beforeEach(() => {
      AuthorApi.saveAuthor = jest.fn((author) => {
        if (author.id) {
          return Promise.resolve({ ...author });
        }
        return Promise.resolve({ id: 3, ...author });
      });
    });

    afterEach(() => {
      store.clearActions();
    });

    it('should create CREATE_AUTHOR_SUCCESS & BEGIN_AJAX_CALL if id doesn\'t exist', async () => {
      await store.dispatch(saveAuthor({ name: 'Oreofe Olutola' }));
      expect(store.getActions()).toEqual([
        {
          type: 'BEGIN_AJAX_CALL',
        },
        {
          author: {
            id: 3,
            name: 'Oreofe Olutola',
          },
          type: 'CREATE_AUTHOR_SUCCESS',
        },
      ]);
    });

    it('should create UPDATE_AUTHOR_SUCCESS & BEGIN_AJAX_CALL if id exist', async () => {
      await store.dispatch(saveAuthor({ id: 5, name: 'Oreofe Olutola' }));
      expect(store.getActions()).toEqual([
        {
          type: 'BEGIN_AJAX_CALL',
        },
        {
          author: {
            id: 5,
            name: 'Oreofe Olutola',
          },
          type: 'UPDATE_AUTHOR_SUCCESS',
        },
      ]);
    });

    it('should handle failed request', async () => {
      AuthorApi.saveAuthor = jest.fn(() => Promise.reject());
      try {
        await store.dispatch(saveAuthor());
      } catch (err) {
        expect(store.getActions()).toEqual([
          { type: 'BEGIN_AJAX_CALL' },
          { type: 'AJAX_CALL_ERROR' },
        ]);
      }
    });
  });
});
