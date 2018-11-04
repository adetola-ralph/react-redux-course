import React from 'react';
import PropTypes from 'prop-types';

const EmptyList = ({ message, buttonMessage, buttonAction }) => {
  const onButtonCLick = () => buttonAction();
  return (
    <div>
      <div style={{ width: 'fit-content' }} className="center-block">
        <svg height="200" width="200">
          <circle cx="100" cy="100" r="70" fill="transparent" stroke="#efefef" strokeWidth="5px" />
          <path d="M50 50 L150 150" fill="transparent" stroke="#efefef" strokeWidth="5px" />
        </svg>
      </div>
      <h3 className="text-center message">
        {message}
      </h3>
      <button className="btn btn-primary center-block" onClick={onButtonCLick} type="button">{buttonMessage}</button>
    </div>
  );
};

EmptyList.propTypes = {
  message: PropTypes.string,
  buttonMessage: PropTypes.string.isRequired,
  buttonAction: PropTypes.func.isRequired,
};

EmptyList.defaultProps = {
  message: 'Nothing to see here, please move along',
};

export default EmptyList;
