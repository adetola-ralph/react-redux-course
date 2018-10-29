import React from 'react';
import PropTypes from 'prop-types';

// Components
import TextInput from '../common/TextInput';

const AuthorForm = ({
  author, onSave, onChange, saving, errors,
}) => (
  <form onSubmit={onSave}>
    <h1>Manage Author</h1>
    <TextInput
      name="firstName"
      label="First Name"
      value={author.firstName}
      onChange={onChange}
      error={errors.firstname}
    />

    <TextInput
      name="lastName"
      label="Last Name"
      value={author.lastName}
      onChange={onChange}
      error={errors.lastname}
    />

    <input type="submit" value={saving ? 'Saving...' : 'Save'} disabled={saving} className="btn btn-primary" />
  </form>
);

AuthorForm.propTypes = {
  author: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
  errors: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  }),
};

AuthorForm.defaultProps = {
  saving: false,
  errors: {},
};

export default AuthorForm;
