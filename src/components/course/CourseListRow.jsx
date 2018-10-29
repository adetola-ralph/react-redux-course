import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CourseListRow = ({ course, deleteCourse }) => {
  const onDelete = () => {
    deleteCourse(course);
  };

  return (
    <tr>
      <td><a href={course.watchHref} target="_blank" rel="noreferrer noopener">Watch</a></td>
      <td><Link to={`/course/${course.id}`}>{course.title}</Link></td>
      <td>{course.authorId}</td>
      <td>{course.category}</td>
      <td>{course.length}</td>
      <td>
        <button type="button" className="btn btn-xs btn-danger" onClick={onDelete}>
          <i className="glyphicon glyphicon-trash" />
        </button>
      </td>
    </tr>
  );
};

CourseListRow.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    watchHref: PropTypes.string.isRequired,
    authorId: PropTypes.string.isRequired,
    length: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  }).isRequired,
  deleteCourse: PropTypes.func.isRequired,
};

export default CourseListRow;
