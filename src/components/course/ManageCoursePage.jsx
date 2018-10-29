import toastr from 'toastr';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
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
      saving: false,
    };
    this.updateCourseState = this.updateCourseState.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.course.id !== state.course.id) {
      return { course: props.course };
    }

    return null;
  }

  updateCourseState(event) {
    // debugger;
    const field = event.target.name;
    let { course } = this.state;
    // debugger;
    course = { ...course, [field]: event.target.value };
    return this.setState({ course });
  }

  saveCourse(event) {
    event.preventDefault();
    this.setState({ saving: true });
    const { actions, history } = this.props;
    const { course } = this.state;
    actions.saveCourse(course).then(() => {
      this.setState({ saving: false });
      toastr.success('Course saved');
      history.push('/courses');
    }).catch((error) => {
      this.setState({ saving: false });
      toastr.error(error);
    });
  }

  render() {
    const { errors, course, saving } = this.state;
    const { allAuthors } = this.props;
    const { updateCourseState, saveCourse } = this;

    return (
      <CourseForm
        onChange={updateCourseState}
        onSave={saveCourse}
        allAuthors={allAuthors}
        course={course}
        errors={errors}
        saving={saving}
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
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

ManageCoursePage.defaultProps = {
  course: {},
};


const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(courseActions, dispatch),
  // saveCourse: course => dispatch(courseActions.saveCourse(course)),
});

const mapStateToProps = (state, ownProps) => {
  const courseId = ownProps.match.params.id;
  let course = {
    id: '', watchHref: '', title: '', authorId: '', length: '', category: '',
  };

  if (courseId) {
    course = state.courses.find(_course => _course.id === courseId);
  }

  const authorsFormattedForDropdown = state.authors.map(author => ({
    value: author.id,
    text: `${author.firstName} ${author.lastName}`,
  }));

  return { course, allAuthors: authorsFormattedForDropdown };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
