import { BEGIN_AJAX_CALL, AJAX_CALL_ERROR } from '../actionTypes';
import { beginAjaxCall, ajaxCallError } from '../ajaxStatusActions';

describe('Ajax status action creators', () => {
  it('should create action for begin action call', () => {
    expect(beginAjaxCall()).toEqual({
      type: BEGIN_AJAX_CALL,
    });
  });

  it('should create action for ajax call error', () => {
    expect(ajaxCallError()).toEqual({
      type: AJAX_CALL_ERROR,
    });
  });
});
