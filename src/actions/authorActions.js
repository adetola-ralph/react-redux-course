import { LOAD_AUTHORS_SUCCESS } from './actionTypes';
import authorApi from '../api/mockAuthorApi';
import { beginAjaxCall } from './ajaxStatusActions';

export const loadAuthorsSuccess = authors => ({
  type: LOAD_AUTHORS_SUCCESS,
  authors,
});

export const loadAuthor = () => (dispatch) => {
  dispatch(beginAjaxCall());
  return authorApi.getAllAuthors().then((authors) => {
    dispatch(loadAuthorsSuccess(authors));
  }).catch((error) => {
    throw (error);
  });
};
