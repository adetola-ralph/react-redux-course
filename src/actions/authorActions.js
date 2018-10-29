import { LOAD_AUTHORS_SUCCESS, CREATE_AUTHOR_SUCCESS, UPDATE_AUTHOR_SUCCESS } from './actionTypes';
import authorApi from '../api/mockAuthorApi';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';

export const loadAuthorsSuccess = authors => ({
  type: LOAD_AUTHORS_SUCCESS,
  authors,
});

export const createAuthorSuccess = author => ({
  type: CREATE_AUTHOR_SUCCESS,
  author,
});

export const updateAuthorSuccess = author => ({
  type: UPDATE_AUTHOR_SUCCESS,
  author,
});

export const loadAuthor = () => (dispatch) => {
  dispatch(beginAjaxCall());
  return authorApi.getAllAuthors().then((authors) => {
    dispatch(loadAuthorsSuccess(authors));
  }).catch((error) => {
    throw (error);
  });
};

export const saveAuthor = author => (dispatch) => {
  dispatch(beginAjaxCall());
  return authorApi.saveAuthor(author).then((savedAuthor) => {
    if (author.id) {
      dispatch(updateAuthorSuccess(savedAuthor));
    } else {
      dispatch(createAuthorSuccess(savedAuthor));
    }
  }).catch((error) => {
    dispatch(ajaxCallError());
    throw error;
  });
};
