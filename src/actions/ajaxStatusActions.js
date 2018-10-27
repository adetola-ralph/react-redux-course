import { BEGIN_AJAX_CALL, AJAX_CALL_ERROR } from './actionTypes';

const beginAjaxCall = () => ({
  type: BEGIN_AJAX_CALL,
});

const ajaxCallError = () => ({
  type: AJAX_CALL_ERROR,
});

export { beginAjaxCall, ajaxCallError };
