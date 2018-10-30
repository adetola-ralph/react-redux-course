import React from 'react';
import PropTypes from 'prop-types';

const TextInput = ({
  name, label, value, onChange, errors, placeholder,
}) => {
  let wrapperClass = 'form-group';
  if (errors && errors.length > 0) {
    wrapperClass += ' has-error';
  }

  return (
    <div className={wrapperClass}>
      <label htmlFor={name}>{label}</label>
      <div className="field">
        <input
          type="text"
          name={name}
          className="form-control"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {
          errors.length > 0
          && (
            errors.map(error => (
              <div key={error} className="error-message">
                {error}
              </div>
            ))
          )
        }
      </div>
    </div>
  );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.arrayOf(PropTypes.string),
};

TextInput.defaultProps = {
  value: '',
  placeholder: '',
  errors: [],
};

export default TextInput;
