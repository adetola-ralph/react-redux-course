import React from 'react';
import PropTypes from 'prop-types';

const SelectInput = ({
  name, label, value, onChange, error, defaultValue, options,
}) => (
  <div className="form-group">
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
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  </div>
);

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
  error: PropTypes.string,
};

SelectInput.defaultProps = {
  value: '',
  defaultValue: '',
  options: [],
  error: '',
};

export default SelectInput;
