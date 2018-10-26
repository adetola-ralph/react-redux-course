import { LOAD_AUTHORS_SUCCESS } from './actionTypes';
import authorApi from '../api/mockAuthorApi';

export const loadAuthorsSuccess = authors => ({
  type: LOAD_AUTHORS_SUCCESS,
  authors,
});

export const loadAuthor = () => dispatch => authorApi.getAllAuthors().then((authors) => {
  dispatch(loadAuthorsSuccess(authors));
}).catch((error) => {
  throw (error);
});
