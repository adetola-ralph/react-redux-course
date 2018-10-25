export const createCourse = course => ({
  type: 'CREATE_COURSE',
  course,
});

export const deleteCourse = course => ({
  type: 'DELETE_COURSE',
  course,
});
