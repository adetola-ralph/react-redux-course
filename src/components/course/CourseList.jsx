import React from 'react';
import PropTypes from 'prop-types';

// Components
import CourseListRow from './CourseListRow';

const CourseList = ({
  courses, deleteCourse, sort, sortOrder, sortBy,
}) => {
  const sortArrowDisplay = (field) => {
    if (sortBy === field) {
      return sortOrder === 'desc'
        ? <i className="glyphicon glyphicon-arrow-up" />
        : <i className="glyphicon glyphicon-arrow-down" />;
    }

    return '';
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th>&nbsp;</th>
          <th onClick={() => sort('title')}>
          Title
            {sortArrowDisplay('title')}
          </th>
          <th onClick={() => sort('authorId')}>
          Author
            {sortArrowDisplay('authorId')}
          </th>
          <th onClick={() => sort('category')}>
          Category
            {sortArrowDisplay('category')}
          </th>
          <th onClick={() => sort('length')}>
          Length
            {sortArrowDisplay('length')}
          </th>
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
};

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
  sort: PropTypes.func,
  sortOrder: PropTypes.string.isRequired,
  sortBy: PropTypes.string.isRequired,
};

CourseList.defaultProps = {
  sort: (() => {}),
};

export default CourseList;
