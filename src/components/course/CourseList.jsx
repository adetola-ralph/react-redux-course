import React from 'react';
import PropTypes from 'prop-types';

// Components
import CourseListRow from './CourseListRow';
import SortArrow from '../common/SortArrowComponent';

const CourseList = ({
  courses, deleteCourse, sort, sortOrder, sortBy,
}) => (
  <table className="table">
    <thead>
      <tr>
        <th>&nbsp;</th>
        <th onClick={() => sort('title')}>
          Title
          {<SortArrow display={sortBy === 'title'} order={sortOrder} />}
        </th>
        <th onClick={() => sort('authorId')}>
          Author
          {<SortArrow display={sortBy === 'authorId'} order={sortOrder} />}
        </th>
        <th onClick={() => sort('category')}>
          Category
          {<SortArrow display={sortBy === 'category'} order={sortOrder} />}
        </th>
        <th onClick={() => sort('length')}>
          Length
          {<SortArrow display={sortBy === 'length'} order={sortOrder} />}
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
