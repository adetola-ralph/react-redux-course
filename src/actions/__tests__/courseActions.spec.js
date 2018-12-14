import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import {
  LOAD_COURSES_SUCCESS,
  UPDATE_COURSE_SUCCESS,
  CREATE_COURSE_SUCCESS,
  DELETE_COURSE_SUCCESS,
} from '../actionTypes';
import {
  createCourseSuccess,
  loadCoursesSuccess,
  updateCourseSuccess,
  deleteCourseSuccess,
  loadCourses,
  saveCourse,
  deleteCourse,
} from '../courseActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore({ courses: [], ajaxCallsInProgress: 0 });

import { CourseApi } from '../../api/mockCourseApi';

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

describe('Course async actions', () => {
  describe('loadCourses action', () => {
    beforeEach(() => {
      CourseApi.getAllCourses = jest.fn(() => Promise.resolve([
        { id: 3, name: 'Starting Javascript' },
        { id: 2, name: 'HTML for noobs' },
      ]));
    });

    afterEach(() => {
      store.clearActions();
    });

    it('should create LOAD_COURSES_SUCCESS & BEGIN_AJAX_CALL', async () => {
      await store.dispatch(loadCourses())
      expect(store.getActions()).toEqual([
        {
          type: 'BEGIN_AJAX_CALL'
        },
        {
          courses: [
            { id: 3, name: 'Starting Javascript' },
            { id: 2, name: 'HTML for noobs' },
          ],
          type: 'LOAD_COURSES_SUCCESS'
        }
      ]);
    });

    it('should handle failed request', async () => {
      CourseApi.getAllCourses = jest.fn(() => Promise.reject());
      try {
        await store.dispatch(loadCourses());
      } catch (err) {
        expect(store.getActions()).toEqual([
          {type: 'BEGIN_AJAX_CALL'},
          {type: 'AJAX_CALL_ERROR'},
        ]);
      }
    });
  });

  describe('saveCourse action', () => {
    beforeEach(() => {
      CourseApi.saveCourse = jest.fn((course) => {
        if (course.id) {
          return Promise.resolve({ ...course });
        } else {
          // give an arbitrary id
          return Promise.resolve({ id: 6, ...course });
        }
      });
    });

    afterEach(() => {
      store.clearActions();
    });

    it('should create CREATE_COURSE_SUCCESS & BEGIN_AJAX_CALL if id doesn\'t exist', async () => {
      await store.dispatch(saveCourse({ name: 'JS Like Dan Abramov' }));
      expect(store.getActions()).toEqual([
        { type: 'BEGIN_AJAX_CALL' },
        { course: { id: 6, name: 'JS Like Dan Abramov' }, type: 'CREATE_COURSE_SUCCESS' },
      ]);
    });

    it('should create UPDATE_COURSE_SUCCESS & BEGIN_AJAX_CALL if id exist', async () => {
      await store.dispatch(saveCourse({ id: 55, name: 'Becoming a CSS Ninja' }));
      expect(store.getActions()).toEqual([
        { type: 'BEGIN_AJAX_CALL' },
        { course: { id: 55, name: 'Becoming a CSS Ninja' }, type: 'UPDATE_COURSE_SUCCESS' }
      ]);
    });

    it('should handle failed request', async () => {
      CourseApi.saveCourse = jest.fn(() => Promise.reject());
      try {
        await store.dispatch(saveCourse());
      } catch (err) {
        expect(store.getActions()).toEqual([
          {type: 'BEGIN_AJAX_CALL'},
          {type: 'AJAX_CALL_ERROR'},
        ]);
      }
    });
  });

  describe('deleteCourse action', () => {
    beforeEach(() => {
      CourseApi.deleteCourse = jest.fn((courseId) => Promise.resolve());
    });

    afterEach(() => {
      store.clearActions();
    });

    it('should create DELETE_COURSE_SUCCESS & BEGIN_AJAX_CALL if id doesn\'t exist', async () => {
      await store.dispatch(deleteCourse({ id: 3, name: 'Test like Kent C. Dodds (Shallow rendering is eveil)' }));
      expect(store.getActions()).toEqual([
        { type: 'BEGIN_AJAX_CALL' },
        {
          course: {
            id: 3,
            name: 'Test like Kent C. Dodds (Shallow rendering is eveil)'
          },
          type: 'DELETE_COURSE_SUCCESS'
        }
      ]);
    });

    it('should handle failed request', async () => {
      CourseApi.deleteCourse = jest.fn((courseId) => Promise.reject('Error'));
      try {
        await store.dispatch(deleteCourse({ id: 3 }));
      } catch (err) {
        expect(store.getActions()).toEqual([
          {type: 'BEGIN_AJAX_CALL'},
          {type: 'AJAX_CALL_ERROR'},
        ]);
      }
    });
  });
});
