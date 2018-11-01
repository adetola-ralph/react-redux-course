import React from 'react';
import PropTypes from 'prop-types';

// Components
import FormError from './FormError';

const SelectInput = ({
  name, label, value, onChange, errors, defaultValue, options,
}) => {
  let wrapperClass = 'form-group';
  if (errors && errors.length > 0) {
    wrapperClass += ' has-error';
  }
  return (
    <div className={wrapperClass}>
      <label htmlFor={name}>{label}</label>
      <div className="field">
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="form-control"
        >
          <option value="">{defaultValue}</option>
          {
            options.map(option => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>))
          }
        </select>
        <FormError errors={errors} />
      </div>
    </div>
  );
};

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    text: PropTypes.string,
  })),
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.arrayOf(PropTypes.string),
};

SelectInput.defaultProps = {
  value: '',
  defaultValue: '',
  options: [],
  errors: [],
};

export default SelectInput;
