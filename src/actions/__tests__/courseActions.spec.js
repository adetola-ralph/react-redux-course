import {
  LOAD_COURSES_SUCCESS, UPDATE_COURSE_SUCCESS, CREATE_COURSE_SUCCESS, DELETE_COURSE_SUCCESS,
} from '../actionTypes';
import { createCourseSuccess, loadCoursesSuccess, updateCourseSuccess, deleteCourseSuccess } from '../courseActions';

describe('Course action creator', () => {
  it('should create action for load course success', () => {
    expect(loadCoursesSuccess([{ id: 4, name: 'Mathematics' }])).toEqual({
      type: LOAD_COURSES_SUCCESS,
      courses: [{ id: 4, name: 'Mathematics' }],
    });
  });

  it('should create action for create action success', () => {
    expect(createCourseSuccess({ id: 5, name: 'Mathematics' })).toEqual({
      type: CREATE_COURSE_SUCCESS,
      course: { id: 5, name: 'Mathematics' },
    });
  });

  it('should create action for update action success', () => {
    expect(updateCourseSuccess({ id: 5, name: 'Mathematics' })).toEqual({
      type: UPDATE_COURSE_SUCCESS,
      course: { id: 5, name: 'Mathematics' },
    });
  });

  it('should create action for update action success', () => {
    expect(deleteCourseSuccess({ id: 5, name: 'Mathematics' })).toEqual({
      type: DELETE_COURSE_SUCCESS,
      course: { id: 5, name: 'Mathematics' },
    });
  });
});
