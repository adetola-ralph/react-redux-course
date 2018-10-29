import React from 'react';
import PropTypes from 'prop-types';

// Components
import CourseListRow from './CourseListRow';

const CourseList = ({ courses, deleteCourse }) => (
  <table className="table">
    <thead>
      <tr>
        <th>&nbsp;</th>
        <th>Title</th>
        <th>Author</th>
        <th>Category</th>
        <th>Length</th>
        <th />
      </tr>
    </thead>
    <tbody>
      {
        courses.map(course => (
          <CourseListRow
            key={course.id}
            course={course}
            deleteCourse={deleteCourse}
          />
        ))
      }
    </tbody>
  </table>
);

CourseList.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      watchHref: PropTypes.string.isRequired,
      authorId: PropTypes.string.isRequired,
      length: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
    }),
  ).isRequired,
  deleteCourse: PropTypes.func.isRequired,
};

export default CourseList;
