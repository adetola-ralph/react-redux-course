import { LOAD_COURSES_SUCCESS } from './actionTypes';
import courseApi from '../api/mockCourseApi';

export const loadCoursesSuccess = courses => ({
  type: LOAD_COURSES_SUCCESS,
  courses,
});

export const loadCourses = () => dispatch => courseApi.getAllCourses().then((courses) => {
  dispatch(loadCoursesSuccess(courses));
}).catch((error) => {
  throw (error);
});
