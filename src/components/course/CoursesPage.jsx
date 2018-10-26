import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';

// Components
import CourseList from './CourseList';

const CoursesPage = ({ courses, history }) => {
  const redirectToCourseAddPage = () => {
    history.push('/course');
  };

  return (
    <div>
      <h1>Courses</h1>
      <button className="btn btn-primary" type="button" onClick={redirectToCourseAddPage}>Add Course</button>
      <CourseList courses={courses} />
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
};

const mapStateToProps = state => ({
  courses: state.courses,
});

export default connect(mapStateToProps)(CoursesPage);
