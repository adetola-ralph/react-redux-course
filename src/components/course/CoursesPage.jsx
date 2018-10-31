import React from 'react';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Components
import CourseList from './CourseList';
import EmptyList from '../common/EmptyList';

// Actions
import sortList from '../../actions/sortActions';
import { deleteCourse as deleteCourseAction } from '../../actions/courseActions';

const CoursesPage = ({
  courses, history, deleteCourse, sortCourse, sortOrder, sortBy,
}) => {
  const redirectToCourseAddPage = () => {
    history.push('/course');
  };

  const deleteCourseMethod = (course) => {
    deleteCourse(course).then(() => toastr.success('Course deleted'));
  };

  const sort = (field) => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    sortCourse(field, newSortOrder);
  };

  return (
    <div>
      <h1>Courses</h1>
      <button className="btn btn-primary" type="button" onClick={redirectToCourseAddPage}>Add Course</button>
      {
        courses.length > 0
          ? (
            <CourseList
              courses={courses}
              deleteCourse={deleteCourseMethod}
              sort={sort}
              sortOrder={sortOrder}
              sortBy={sortBy}
            />
          )
          : (
            <EmptyList
              message="Nothing to see here, Add a new course"
              buttonAction={redirectToCourseAddPage}
              buttonMessage="Add a new Course"
            />
          )
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
  sortCourse: PropTypes.func.isRequired,
  sortOrder: PropTypes.string.isRequired,
  sortBy: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  // Had to do this because the system complained i was mutating redux state
  // So I am creating a copy here rather that using destructuring
  const courses = [...state.courses];
  const { sort } = state;
  return {
    courses: courses.sort((a, b) => {
      // TODO: have to find a better way of dealing with this (code duplication, fragile code)
      const { sortBy, sortOrder } = sort.course;
      if (sortOrder === 'desc') {
        return b[sortBy].localeCompare(a[sortBy]);
      }

      if (sortOrder === 'asc') {
        return a[sortBy].localeCompare(b[sortBy]);
      }

      return 0;
    }),
    sortOrder: sort.course.sortOrder,
    sortBy: sort.course.sortBy,
  };
};

const mapDispatchToProps = dispatch => ({
  deleteCourse: course => dispatch(deleteCourseAction(course)),
  sortCourse: (sortBy, sortOrder) => dispatch(sortList(sortBy, sortOrder, 'course')),
});

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
