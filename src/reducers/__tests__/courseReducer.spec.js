import {
  LOAD_COURSES_SUCCESS, CREATE_COURSE_SUCCESS, UPDATE_COURSE_SUCCESS, DELETE_COURSE_SUCCESS,
} from '../../actions/actionTypes';
import courseReducer from '../courseReducer';

describe('Course Reducer', () => {
  it('should return initial state', () => {
    const state = courseReducer(undefined, { type: '' });

    expect(state).toEqual([]);
  });

  it('should handle LOAD_COURSES_SUCCESS', () => {
    const courseAction = { type: LOAD_COURSES_SUCCESS, coruses: [{ id: 42, comment: 'comment 42' }, { id: 43, comment: 'comment 43' }] };
    const state = courseReducer([], courseAction);

    expect(state).toEqual(courseAction.courses);
  });

  it('should handle CREATE_COURSE_SUCCESS', () => {
    const courseAction = { type: CREATE_COURSE_SUCCESS, course: { id: 43, comment: 'comment 43' } };
    const initialState = [{ id: 42, comment: 'comment 42' }];
    const state = courseReducer(initialState, courseAction);

    expect(state).toContainEqual({ id: 43, comment: 'comment 43' });
    expect(initialState).not.toEqual(state);
  });

  it('should handle UPDATE_COURSE_SUCCESS', () => {
    const courseAction = { type: UPDATE_COURSE_SUCCESS, course: { id: 43, comment: 'comment 44' } };
    const initialState = [{ id: 42, comment: 'comment 42' }, { id: 43, comment: 'comment 43' }];
    const state = courseReducer(initialState, courseAction);

    expect(state).toContainEqual({ id: 43, comment: 'comment 44' });
    expect(state).not.toContainEqual({ id: 43, comment: 'comment 43' });
    expect(initialState).not.toEqual(state);
  });

  it('should handle DELETE_COURSE_SUCCESS', () => {
    const courseAction = { type: DELETE_COURSE_SUCCESS, course: { id: 43 } };
    const initialState = [{ id: 42, comment: 'comment 42' }, { id: 43, comment: 'comment 43' }];
    const state = courseReducer(initialState, courseAction);

    expect(state).not.toContainEqual({ id: 43, comment: 'comment 43' });
    expect(initialState).not.toEqual(state);
  });
});
