import toastr from 'toastr';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Prompt } from 'react-router';
import { validate } from 'validate.js';
import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';

// Components
import CourseForm from './CourseForm';

// Actions
import * as courseActions from '../../actions/courseActions';

const courseValidationConstraint = {
  title: {
    presence: {
      allowEmpty: false,
    },
    length: {
      minimum: 5,
    },
  },
  authorId: {
    presence: {
      allowEmpty: false,
    },
  },
  length: {
    presence: {
      allowEmpty: false,
    },
    format: {
      pattern: /\d{1,2}:\d{2}/,
      message: 'Invalid value for length, length must be in the format ##:## with # being a digit',
    },
  },
  category: {
    presence: {
      allowEmpty: false,
    },
  },
};

class ManageCoursePage extends Component {
  constructor(props) {
    super(props);
    const { course } = props;

    this.state = {
      course: { ...course },
      errors: {},
      saving: false,
      isModified: false,
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
    const field = event.target.name;
    let { course, errors } = this.state;
    course = { ...course, [field]: event.target.value };
    errors = { ...errors, [field]: [] };
    return this.setState({ course, isModified: true, errors });
  }

  saveCourse(event) {
    event.preventDefault();
    const { actions, history } = this.props;
    const { course } = this.state;
    const validators = validate(course, courseValidationConstraint);
    if (validators) {
      const keys = Object.keys(validators);
      const errors = {};
      for (const key of keys) { // eslint-disable-line
        errors[key] = validators[key];
      }
      this.setState({
        errors,
      });
      return;
    }
    this.setState({ saving: true });
    actions.saveCourse(course).then(() => {
      this.setState({ saving: false, isModified: false });
      toastr.success('Course saved');
      history.push('/courses');
    }).catch((error) => {
      this.setState({ saving: false });
      toastr.error(error);
    });
  }

  render() {
    const {
      errors, course, saving, isModified,
    } = this.state;
    const { allAuthors } = this.props;
    const { updateCourseState, saveCourse } = this;

    return (
      <Fragment>
        <Prompt
          when={isModified}
          message={() => 'You have unsaved changes, are you sure you want to leave?'}
        />
        <CourseForm
          onChange={updateCourseState}
          onSave={saveCourse}
          allAuthors={allAuthors}
          course={course}
          errors={errors}
          saving={saving}
        />
      </Fragment>
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
