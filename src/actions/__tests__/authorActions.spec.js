import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import { createAuthorSuccess, loadAuthorsSuccess, loadAuthor } from '../authorActions';
import { LOAD_AUTHORS_SUCCESS, CREATE_AUTHOR_SUCCESS, UPDATE_AUTHOR_SUCCESS } from '../actionTypes';

import { BEGIN_AJAX_CALL, AJAX_CALL_ERROR } from '../actionTypes';
import { beginAjaxCall, ajaxCallError } from '../ajaxStatusActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore({ authors: [], ajaxCallsInProgress: 0 });

jest.mock('../../api/mockAuthorApi');
import authorApi from '../../api/mockAuthorApi';

// AuthorApi.mockImplementation(() => {
//   return {

//   };
// });

console.log(authorApi.getAllAuthors.toString())



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
