import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

// Components
import CourseForm from './CourseForm';

// Actions
import * as courseActions from '../../actions/courseActions';

class ManageCoursePage extends Component {
  constructor(props) {
    super(props);
    const { course } = props;

    this.state = {
      course: { ...course },
      errors: {},
    };
    this.updateCourseState = this.updateCourseState.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
  }

  updateCourseState(event) {
    const field = event.target.name;
    let { course } = this.state;
    course = { ...course, [field]: event.target.value };
    return this.setState({ course });
  }

  saveCourse(event) {
    event.preventDefault();
    const { actions } = this.props;
    const { course } = this.state;
    actions.saveCourse(course);
  }

  render() {
    const { course, errors } = this.state;
    const { allAuthors } = this.props;
    const { updateCourseState, saveCourse } = this;

    return (
      <CourseForm
        onChange={updateCourseState}
        onSave={saveCourse}
        allAuthors={allAuthors}
        course={course}
        errors={errors}
      />
    );
  }
}

ManageCoursePage.propTypes = {
  course: PropTypes.shape({
    title: PropTypes.string,
    watchHref: PropTypes.string,
    authorId: PropTypes.string,
    length: PropTypes.string,
    category: PropTypes.string,
  }),
  allAuthors: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    text: PropTypes.string,
  })).isRequired,
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
};

ManageCoursePage.defaultProps = {
  course: {},
};


const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(courseActions, dispatch),
  // saveCourse: course => dispatch(courseActions.saveCourse(course)),
});

const mapStateToProps = (state) => {
  const authorsFormattedForDropdown = state.authors.map(author => ({
    value: author.id,
    text: `${author.firstName} ${author.lastName}`,
  }));

  return { course: state.course, allAuthors: authorsFormattedForDropdown };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
