import { BEGIN_AJAX_CALL, AJAX_CALL_ERROR } from '../../actions/actionTypes';
import ajaxStatusReducer from '../ajaxStatusReducer';

describe('Ajax status reducer', () => {
  it('should return initial state', () => {
    const state = ajaxStatusReducer(undefined, { type: '' });

    expect(state).toEqual(0);
  });

  it('should handle BEGIN_AJAX_CALL', () => {
    const state = ajaxStatusReducer(0, { type: BEGIN_AJAX_CALL });

    expect(state).toEqual(1);
  });

  it('should handle AJAX_CALL_ERROR', () => {
    const state = ajaxStatusReducer(1, { type: AJAX_CALL_ERROR });

    expect(state).toEqual(0);
  });

  it('should handle _SUCCESS action types', () => {
    const state = ajaxStatusReducer(1, { type: 'AJAX_CALL_SUCCESS' });

    expect(state).toEqual(0);
  });

  it.skip('should not go below 0 if state is 0', () => {

  });
});
