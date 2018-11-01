import React from 'react';
import PropTypes from 'prop-types';

const FormError = ({ errors }) => (
  errors.length > 0
    ? (
      errors.map(error => (
        <div key={error} className="error-message">
          {error}
        </div>
      ))
    ) : ''
);

FormError.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string),
};

FormError.defaultProps = {
  errors: [],
};

export default FormError;
