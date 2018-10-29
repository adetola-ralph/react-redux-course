import {
  LOAD_COURSES_SUCCESS, UPDATE_COURSE_SUCCESS, CREATE_COURSE_SUCCESS, DELETE_COURSE_SUCCESS,
} from './actionTypes';
import courseApi from '../api/mockCourseApi';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';

export const loadCoursesSuccess = courses => ({
  type: LOAD_COURSES_SUCCESS,
  courses,
});

export const updateCourseSuccess = course => ({
  type: UPDATE_COURSE_SUCCESS,
  course,
});

export const createCourseSuccess = course => ({
  type: CREATE_COURSE_SUCCESS,
  course,
});

export const deleteCourseSuccess = course => ({
  type: DELETE_COURSE_SUCCESS,
  course,
});

export const loadCourses = () => (dispatch) => {
  dispatch(beginAjaxCall());
  courseApi.getAllCourses().then((courses) => {
    dispatch(loadCoursesSuccess(courses));
  }).catch((error) => {
    throw error;
  });
};

export const saveCourse = course => (dispatch) => {
  dispatch(beginAjaxCall());
  return courseApi.saveCourse(course).then((savedCourse) => {
    if (course.id) {
      dispatch(updateCourseSuccess(savedCourse));
    } else {
      dispatch(createCourseSuccess(savedCourse));
    }
  }).catch((error) => {
    dispatch(ajaxCallError());
    throw error;
  });
};

export const deleteCourse = course => (dispatch) => {
  dispatch(beginAjaxCall());
  return courseApi.deleteCourse(course.id).then(() => {
    dispatch(deleteCourseSuccess(course));
  }).catch((error) => {
    dispatch(ajaxCallError());
    throw error;
  });
};
