import { LOAD_COURSES_SUCCESS, CREATE_COURSE_SUCCESS, UPDATE_COURSE_SUCCESS } from '../actions/actionTypes';

const courseReducer = (state = [], action) => {
  const { type } = action;
  switch (type) {
    case LOAD_COURSES_SUCCESS:
      return action.courses;
    case CREATE_COURSE_SUCCESS:
      return [...state, { ...action.course }];
    case UPDATE_COURSE_SUCCESS:
      return state.map((course) => {
        if (course.id === action.course.id) {
          return { ...action.course };
        }

        return course;
      });
    default:
      return state;
  }
};

export default courseReducer;
