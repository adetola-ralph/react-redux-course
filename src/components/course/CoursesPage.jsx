import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';

// Components
import CourseList from './CourseList';

// Actions
import { deleteCourse as deleteCourseAction } from '../../actions/courseActions';

const CoursesPage = ({ courses, history, deleteCourse }) => {
  const redirectToCourseAddPage = () => {
    history.push('/course');
  };

  const deleteCourseMethod = course => deleteCourse(course);

  return (
    <div>
      <h1>Courses</h1>
      <button className="btn btn-primary" type="button" onClick={redirectToCourseAddPage}>Add Course</button>
      <CourseList courses={courses} deleteCourse={deleteCourseMethod} />
    </div>
  );
};

CoursesPage.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
    }),
  ).isRequired,
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  deleteCourse: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  courses: state.courses,
});

const mapDispatchToProps = dispatch => ({
  deleteCourse: course => dispatch(deleteCourseAction(course)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
