import React from 'react';
import PropTypes from 'prop-types';

import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';

const CourseForm = ({
  course,
  allAuthors,
  onSave,
  onChange,
  saving,
  errors,
}) => (
  <form onSubmit={onSave}>
    <h1>Manage Course</h1>
    <TextInput
      name="title"
      label="Title"
      value={course.title}
      onChange={onChange}
      errors={errors.title}
    />

    <SelectInput
      name="authorId"
      label="Author"
      value={course.authorId}
      defaultValue="Select Author"
      options={allAuthors}
      onChange={onChange}
      errors={errors.authorId}
    />

    <TextInput
      name="category"
      label="Category"
      value={course.category}
      onChange={onChange}
      errors={errors.category}
    />

    <TextInput
      name="length"
      label="Length"
      value={course.length}
      onChange={onChange}
      errors={errors.length}
    />

    <input type="submit" value={saving ? 'Saving...' : 'Save'} disabled={saving} className="btn btn-primary" />
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
  saving: PropTypes.bool,
  errors: PropTypes.shape({
    title: PropTypes.arrayOf(PropTypes.string),
    category: PropTypes.arrayOf(PropTypes.string),
    length: PropTypes.arrayOf(PropTypes.string),
    authorId: PropTypes.arrayOf(PropTypes.string),
  }),
};

CourseForm.defaultProps = {
  allAuthors: [],
  saving: false,
  errors: {},
};

export default CourseForm;
