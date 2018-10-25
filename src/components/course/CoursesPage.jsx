import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components
import CourseList from './CourseList';

class CoursesPage extends Component {
  render() {
    const { courses } = this.props;
    return (
      <div>
        <h1>Courses</h1>
        <CourseList courses={courses} />
      </div>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

const mapStateToProps = state => ({
  courses: state.courses,
});

export default connect(mapStateToProps)(CoursesPage);
