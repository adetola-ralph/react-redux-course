import { LOAD_COURSES_SUCCESS, UPDATE_COURSE_SUCCESS, CREATE_COURSE_SUCCESS } from './actionTypes';
import courseApi from '../api/mockCourseApi';

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

export const loadCourses = () => dispatch => courseApi.getAllCourses().then((courses) => {
  dispatch(loadCoursesSuccess(courses));
}).catch((error) => {
  throw (error);
});

export const saveCourse = course => dispatch => courseApi.saveCourse(course).then((savedCourse) => {
  if (course.id) {
    dispatch(updateCourseSuccess(savedCourse));
  } else {
    dispatch(createCourseSuccess(savedCourse));
  }
}).catch((error) => {
  throw error;
});
