import React from 'react';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Components
import CourseList from './CourseList';
import EmptyList from '../common/EmptyList';

// Actions
import { deleteCourse as deleteCourseAction } from '../../actions/courseActions';

const CoursesPage = ({ courses, history, deleteCourse }) => {
  const redirectToCourseAddPage = () => {
    history.push('/course');
  };

  const deleteCourseMethod = (course) => {
    deleteCourse(course).then(() => toastr.success('Course deleted'));
  };

  return (
    <div>
      <h1>Courses</h1>
      <button className="btn btn-primary" type="button" onClick={redirectToCourseAddPage}>Add Course</button>
      {
        courses.length > 0
          ? <CourseList courses={courses} deleteCourse={deleteCourseMethod} />
          : <EmptyList message="Nothing to see here, Add a new course" buttonAction={redirectToCourseAddPage} buttonMessage="Add a new Course" />
      }
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
