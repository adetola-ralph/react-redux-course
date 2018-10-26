import React from 'react';
import PropTypes from 'prop-types';

import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';

const CourseForm = ({
  course,
  allAuthors,
  onSave,
  onChange,
  loading,
  errors,
}) => (
  <form onSubmit={onSave}>
    <h1>Manage Course</h1>
    <TextInput
      name="title"
      label="Title"
      value={course.title}
      onChange={onChange}
      error={errors.title}
    />

    <SelectInput
      name="authorId"
      label="Author"
      value={course.authorId}
      defaultValue="Select Author"
      options={allAuthors}
      onChange={onChange}
      error={errors.authorId}
    />

    <TextInput
      name="category"
      label="Category"
      value={course.category}
      onChange={onChange}
      error={errors.category}
    />

    <TextInput
      name="length"
      label="Length"
      value={course.length}
      onChange={onChange}
      error={errors.length}
    />

    <input type="submit" value={loading ? 'Saving...' : 'Save'} disabled={loading} className="btn btn-primary" />
  </form>
);

CourseForm.propTypes = {
  course: PropTypes.shape({
    title: PropTypes.string,
    watchHref: PropTypes.string,
    authorId: PropTypes.string,
    length: PropTypes.string,
    category: PropTypes.string,
  }).isRequired,
  allAuthors: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    text: PropTypes.string,
  })),
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  errors: PropTypes.shape({
    title: PropTypes.string,
    category: PropTypes.string,
    length: PropTypes.string,
    authorId: PropTypes.string,
  }),
};

CourseForm.defaultProps = {
  allAuthors: [],
  loading: false,
  errors: {},
};

export default CourseForm;
